-- ==============================================================================
-- UNIFIED SUPABASE SCHEMA FOR PORTFOLIO PROJECTS
-- Projects included:
-- 1. Shared / Demo Auth (demo_users)
-- 2. AgroPreciosa Loja & Dashboard (prefix: agro_)
-- 3. KitHub (prefix: kit_)
-- 4. Saboroso PDV (prefix: sab_)
-- 5. TVSistem & PasswordDisplay (prefix: tv_)
-- 6. GestorPro - Software PCP/MRP (prefix: pcp_)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. SHARED DEMO AUTH
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.demo_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_demo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir usuário demo compartilhado padrão
INSERT INTO public.demo_users (id, email, password_hash, role, is_demo)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'demo@portfolio.com',
    crypt('demo123', gen_salt('bf')),
    'admin',
    true
)
ON CONFLICT (email) DO NOTHING;

-- ==============================================================================
-- 2. AGROPRECIOSA (agro_)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.agro_store_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_name VARCHAR(255) NOT NULL DEFAULT 'AgroPreciosa Demo',
    store_logo TEXT,
    store_phone VARCHAR(20) DEFAULT '(11) 99999-0000',
    store_email VARCHAR(255) DEFAULT 'contato@agropreciosa.demo',
    store_address TEXT DEFAULT 'Rua Agro Demo, 100 - São Paulo, SP',
    primary_color VARCHAR(7) DEFAULT '#22c55e',
    secondary_color VARCHAR(7) DEFAULT '#15803d',
    whatsapp_message_preparing TEXT DEFAULT 'Olá {nome}! Seu pedido #{numero} está sendo preparado!',
    whatsapp_message_sent TEXT DEFAULT 'Olá {nome}! Seu pedido #{numero} saiu para entrega!',
    whatsapp_message_ready TEXT DEFAULT 'Olá {nome}! Seu pedido #{numero} está pronto para retirada!',
    delivery_fee DECIMAL(10,2) DEFAULT 5.00,
    min_order_value DECIMAL(10,2) DEFAULT 20.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'employee')),
    avatar TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    icon VARCHAR(10) DEFAULT '🌿',
    parent_id UUID REFERENCES public.agro_categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    brand VARCHAR(255),
    barcode VARCHAR(50),
    ean_code VARCHAR(13),
    sku VARCHAR(50),
    category_id UUID REFERENCES public.agro_categories(id) ON DELETE SET NULL,
    cost_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    sale_price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    min_stock_alert INT DEFAULT 5,
    weight DECIMAL(10,3),
    unit VARCHAR(10) DEFAULT 'un' CHECK (unit IN ('un', 'kg', 'g', 'lt', 'ml', 'cx', 'pc')),
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_product_variations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.agro_products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(50),
    cost_price DECIMAL(10,2) DEFAULT 0,
    sale_price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.agro_products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_combos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_combo_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    combo_id UUID REFERENCES public.agro_combos(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.agro_products(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.agro_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    discount_percentage DECIMAL(5,2),
    banner_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_offer_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    banner_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_offer_package_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID REFERENCES public.agro_offer_packages(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.agro_products(id) ON DELETE CASCADE,
    promotional_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.agro_installment_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    min_value DECIMAL(10,2) NOT NULL,
    max_installments INT NOT NULL DEFAULT 1,
    interest_rate DECIMAL(5,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.agro_customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    neighborhood VARCHAR(255),
    city VARCHAR(255) DEFAULT 'São Paulo',
    state VARCHAR(10) DEFAULT 'SP',
    zip_code VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.agro_customers(id) ON DELETE SET NULL,
    order_number SERIAL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    delivery_type VARCHAR(50) DEFAULT 'delivery',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.agro_orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.agro_products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    variation_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_delivery_neighborhoods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.agro_delivery_promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    min_order_value DECIMAL(10,2) NOT NULL,
    discount_fee DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.agro_delivery_promotion_neighborhoods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promotion_id UUID REFERENCES public.agro_delivery_promotions(id) ON DELETE CASCADE,
    neighborhood_id UUID REFERENCES public.agro_delivery_neighborhoods(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.agro_stock_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.agro_products(id) ON DELETE CASCADE,
    type VARCHAR(20) CHECK (type IN ('in', 'out', 'adjustment')),
    quantity INT NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_expense_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agro_expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.agro_expense_categories(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE VIEW public.agro_daily_sales_summary AS
SELECT 
    DATE(created_at) AS sale_date,
    COUNT(id) AS total_orders,
    COALESCE(SUM(total), 0) AS gross_revenue
FROM public.agro_orders
WHERE status != 'cancelled'
GROUP BY DATE(created_at)
ORDER BY sale_date DESC;

-- ==============================================================================
-- 3. KITHUB (kit_)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.kit_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    color VARCHAR(50) DEFAULT '#3b82f6',
    spending_limit NUMERIC(10,2) DEFAULT 1000.00,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    assigned_roommate_id UUID REFERENCES public.kit_profiles(id) ON DELETE SET NULL,
    created_by_roommate_id UUID REFERENCES public.kit_profiles(id) ON DELETE SET NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    time VARCHAR(10),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    type VARCHAR(50) DEFAULT 'internal' CHECK (type IN ('internal', 'external')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) DEFAULT 'comida' CHECK (category IN ('comida', 'bebida', 'higiene', 'limpeza', 'outros')),
    quantity NUMERIC(10,2) DEFAULT 1,
    unit VARCHAR(20) DEFAULT 'un',
    min_quantity NUMERIC(10,2) DEFAULT 1,
    status VARCHAR(20) DEFAULT 'ok' CHECK (status IN ('ok', 'baixo', 'esgotado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_shopping_list (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) DEFAULT 'geral',
    essential BOOLEAN DEFAULT false,
    notes TEXT,
    completed BOOLEAN DEFAULT false,
    quantity NUMERIC(10,2) DEFAULT 1,
    assigned_to_id UUID REFERENCES public.kit_profiles(id) ON DELETE SET NULL,
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    source_url TEXT,
    ingredients JSONB DEFAULT '[]'::jsonb,
    portions INT DEFAULT 2,
    instructions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    paid_by_user_id UUID REFERENCES public.kit_profiles(id) ON DELETE SET NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    split_type VARCHAR(20) DEFAULT 'equal' CHECK (split_type IN ('equal', 'custom')),
    split_with JSONB DEFAULT '{}'::jsonb,
    card_owner_id UUID REFERENCES public.kit_profiles(id) ON DELETE SET NULL,
    installments JSONB,
    payment_source JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_meal_preps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu VARCHAR(255) NOT NULL,
    owner_id UUID REFERENCES public.kit_profiles(id) ON DELETE SET NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'consumed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    target_value NUMERIC(10,2) DEFAULT 0,
    current_value NUMERIC(10,2) DEFAULT 0,
    month VARCHAR(20),
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.kit_profiles(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(10),
    user_id UUID REFERENCES public.kit_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_establishments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_product_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name VARCHAR(255) NOT NULL,
    establishment_id UUID REFERENCES public.kit_establishments(id) ON DELETE SET NULL,
    price NUMERIC(10,2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kit_pix_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.kit_profiles(id) ON DELETE CASCADE,
    key_type VARCHAR(50) NOT NULL,
    key_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 4. SABOROSO PDV (sab_)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.sab_cash_registers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL,
    opened_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMP WITH TIME ZONE,
    opening_amount NUMERIC NOT NULL DEFAULT 0,
    closing_amount NUMERIC,
    total_sales NUMERIC NOT NULL DEFAULT 0,
    total_orders INTEGER NOT NULL DEFAULT 0,
    is_open BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_foods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    stock_quantity NUMERIC(10,3) DEFAULT 0,
    min_stock NUMERIC(10,3) DEFAULT 1,
    cost_per_unit NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_food_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    food_id UUID REFERENCES public.sab_foods(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES public.sab_ingredients(id) ON DELETE CASCADE,
    quantity NUMERIC(10,3) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_external_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    barcode VARCHAR(50),
    cost_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    sale_price NUMERIC(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    min_stock INT DEFAULT 5,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT,
    table_number INTEGER,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    tax NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'open',
    payment_method TEXT,
    user_id UUID NOT NULL,
    cash_register_id UUID REFERENCES public.sab_cash_registers(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.sab_orders(id) ON DELETE CASCADE,
    product_id UUID,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL,
    cash_register_id UUID REFERENCES public.sab_cash_registers(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.sab_orders(id) ON DELETE CASCADE,
    total NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    user_id UUID NOT NULL,
    cash_register_id UUID REFERENCES public.sab_cash_registers(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_discounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.sab_orders(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_service_taxes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.sab_orders(id) ON DELETE CASCADE,
    percentage NUMERIC NOT NULL DEFAULT 10,
    amount NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_expense_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sab_expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.sab_expense_accounts(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 5. TVSISTEM & PASSWORDDISPLAY (tv_)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.tv_password (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    password TEXT NOT NULL,
    table_number INTEGER,
    status TEXT DEFAULT 'calling',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tv_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_number INTEGER NOT NULL UNIQUE,
    current_password TEXT,
    status TEXT DEFAULT 'available',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tv_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    duration INTEGER DEFAULT 10,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tv_admnistration_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tv_name TEXT DEFAULT 'Painel de Senhas Demo',
    sound_enabled BOOLEAN DEFAULT true,
    theme TEXT DEFAULT 'dark',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Realtime para tv_password e tv_tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.tv_password;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tv_tables;

-- ==============================================================================
-- 6. GESTORPRO - SOFTWARE PCP / MRP (pcp_)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.pcp_empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) UNIQUE,
    email VARCHAR(255),
    telefone VARCHAR(50),
    plano VARCHAR(50) DEFAULT 'DEMO',
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cargo VARCHAR(50) DEFAULT 'GESTOR' CHECK (cargo IN ('SUPER_ADMIN', 'GESTOR', 'OPERADOR', 'CONSULTOR')),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_familias_produto (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    area_secao_externa NUMERIC(10,4) NOT NULL DEFAULT 0.001,
    volume_aco_metro NUMERIC(10,4) NOT NULL DEFAULT 0.0001,
    densidade_g_cm3 NUMERIC(10,4) NOT NULL DEFAULT 0.95,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_skus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    familia_id UUID NOT NULL REFERENCES public.pcp_familias_produto(id) ON DELETE CASCADE,
    codigo VARCHAR(100) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    comprimento_mm INTEGER NOT NULL,
    desconto_aco_mm INTEGER NOT NULL DEFAULT 0,
    peso_teorico_kg NUMERIC(10,4) DEFAULT 0,
    estoque_acabado INTEGER NOT NULL DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_insumos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('ACO', 'QUIMICO', 'EMBALAGEM', 'OUTRO')),
    unidade VARCHAR(20) NOT NULL DEFAULT 'KG',
    estoque_atual NUMERIC(15,4) NOT NULL DEFAULT 0,
    estoque_minimo NUMERIC(15,4) DEFAULT 0,
    custo_unitario NUMERIC(15,4) DEFAULT 0,
    metadados JSONB DEFAULT '{}'::jsonb,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_bom (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    familia_id UUID NOT NULL REFERENCES public.pcp_familias_produto(id) ON DELETE CASCADE,
    insumo_id UUID NOT NULL REFERENCES public.pcp_insumos(id) ON DELETE CASCADE,
    quantidade_por_unidade NUMERIC(15,6) DEFAULT 0,
    percentual_blend NUMERIC(5,2) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    cliente_nome VARCHAR(255) NOT NULL,
    numero_pedido VARCHAR(100) NOT NULL,
    data_emissao DATE NOT NULL DEFAULT CURRENT_DATE,
    data_entrega_prevista DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE', 'EM_PRODUCAO', 'FATURADO', 'EXPEDIDO', 'CANCELADO')),
    total NUMERIC(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_ordens_producao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    pedido_id UUID REFERENCES public.pcp_pedidos(id) ON DELETE SET NULL,
    sku_id UUID NOT NULL REFERENCES public.pcp_skus(id) ON DELETE CASCADE,
    numero_op VARCHAR(100) NOT NULL,
    quantidade_planejada INTEGER NOT NULL,
    quantidade_produzida INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'PLANEJADA' CHECK (status IN ('PLANEJADA', 'EM_ANDAMENTO', 'FINALIZADA', 'CANCELADA')),
    data_inicio TIMESTAMP WITH TIME ZONE,
    data_fim TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_apontamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    ordem_producao_id UUID NOT NULL REFERENCES public.pcp_ordens_producao(id) ON DELETE CASCADE,
    quantidade_produzida INTEGER NOT NULL,
    horas_maquina NUMERIC(10,2) NOT NULL DEFAULT 0,
    refugo_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
    operador_nome VARCHAR(255),
    data_apontamento TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_fornecedores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    cnpj VARCHAR(30),
    email VARCHAR(255),
    telefone VARCHAR(50),
    metadados JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_entradas_estoque (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    insumo_id UUID NOT NULL REFERENCES public.pcp_insumos(id) ON DELETE CASCADE,
    fornecedor_id UUID NOT NULL REFERENCES public.pcp_fornecedores(id) ON DELETE RESTRICT,
    quantidade NUMERIC(15,4) NOT NULL CHECK (quantidade > 0),
    preco_unitario NUMERIC(15,4) NOT NULL CHECK (preco_unitario >= 0),
    data_prevista DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE', 'ENTREGUE', 'CANCELADO')),
    data_entrega TIMESTAMP WITH TIME ZONE,
    recebido_por UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pcp_funcionarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID NOT NULL REFERENCES public.pcp_empresas(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    turno VARCHAR(50) DEFAULT 'MANHA',
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- View consolidada de estoque valorizado
CREATE OR REPLACE VIEW public.pcp_v_estoque_valorizado AS
SELECT 
    'INSUMO' AS tipo,
    i.id,
    i.empresa_id,
    i.nome,
    i.categoria AS categoria_ou_familia,
    i.unidade,
    i.estoque_atual AS quantidade,
    i.custo_unitario,
    (i.estoque_atual * i.custo_unitario) AS valor_total
FROM public.pcp_insumos i
WHERE i.ativo = true
UNION ALL
SELECT 
    'SKU_ACABADO' AS tipo,
    s.id,
    s.empresa_id,
    s.nome,
    f.nome AS categoria_ou_familia,
    'PC' AS unidade,
    s.estoque_acabado::numeric AS quantidade,
    COALESCE(s.peso_teorico_kg * 15.0, 50.0) AS custo_unitario,
    (s.estoque_acabado::numeric * COALESCE(s.peso_teorico_kg * 15.0, 50.0)) AS valor_total
FROM public.pcp_skus s
INNER JOIN public.pcp_familias_produto f ON f.id = s.familia_id
WHERE s.ativo = true;

-- Helper RPC: Obter ID de empresa do usuário
CREATE OR REPLACE FUNCTION public.pcp_obter_empresa_id_usuario()
RETURNS UUID AS $$
    SELECT id FROM public.pcp_empresas WHERE plano = 'DEMO' LIMIT 1;
$$ LANGUAGE sql STABLE;

-- RPC Transacional de Apontamento com Baixa Automática no PCP
CREATE OR REPLACE FUNCTION public.pcp_registrar_apontamento(
    p_empresa_id UUID,
    p_ordem_producao_id UUID,
    p_quantidade_produzida INTEGER,
    p_horas_maquina NUMERIC(10,2),
    p_refugo_kg NUMERIC(10,4),
    p_operador_nome VARCHAR(255),
    p_data_apontamento TIMESTAMP WITH TIME ZONE
)
RETURNS VOID AS $$
DECLARE
    v_sku_id UUID;
    v_familia_id UUID;
    v_comprimento_mm INTEGER;
    v_desconto_aco_mm INTEGER;
    v_area_secao_externa NUMERIC(10,4);
    v_volume_aco_metro NUMERIC(10,4);
    v_densidade_g_cm3 NUMERIC(10,4);
    v_volume_aco_total NUMERIC(15,6);
    v_volume_plastico_liquido NUMERIC(15,6);
    v_massa_plastico_total NUMERIC(15,4);
    v_aco_metros_total NUMERIC(15,4);
    v_aco_peso_total NUMERIC(15,4);
    r_bom RECORD;
    v_qtd_planejada INTEGER;
    v_qtd_produzida_atual INTEGER;
    v_status VARCHAR;
BEGIN
    SELECT op.sku_id, op.quantidade_planejada, op.quantidade_produzida, op.status
    INTO v_sku_id, v_qtd_planejada, v_qtd_produzida_atual, v_status
    FROM public.pcp_ordens_producao op
    WHERE op.id = p_ordem_producao_id AND op.empresa_id = p_empresa_id;

    IF v_sku_id IS NULL THEN
        RAISE EXCEPTION 'Ordem de produção não encontrada.';
    END IF;

    INSERT INTO public.pcp_apontamentos (
        empresa_id,
        ordem_producao_id,
        quantidade_produzida,
        horas_maquina,
        refugo_kg,
        operador_nome,
        data_apontamento
    )
    VALUES (
        p_empresa_id,
        p_ordem_producao_id,
        p_quantidade_produzida,
        p_horas_maquina,
        p_refugo_kg,
        p_operador_nome,
        COALESCE(p_data_apontamento, NOW())
    );

    v_qtd_produzida_atual := v_qtd_produzida_atual + p_quantidade_produzida;
    IF v_qtd_produzida_atual >= v_qtd_planejada THEN
        v_status := 'FINALIZADA';
    ELSE
        v_status := 'EM_ANDAMENTO';
    END IF;

    UPDATE public.pcp_ordens_producao
    SET quantidade_produzida = v_qtd_produzida_atual,
        status = v_status,
        data_inicio = COALESCE(data_inicio, NOW()),
        data_fim = CASE WHEN v_status = 'FINALIZADA' THEN NOW() ELSE data_fim END
    WHERE id = p_ordem_producao_id;

    UPDATE public.pcp_skus
    SET estoque_acabado = estoque_acabado + p_quantidade_produzida
    WHERE id = v_sku_id;

    SELECT sku.comprimento_mm, sku.desconto_aco_mm, fam.id, fam.area_secao_externa, fam.volume_aco_metro, fam.densidade_g_cm3
    INTO v_comprimento_mm, v_desconto_aco_mm, v_familia_id, v_area_secao_externa, v_volume_aco_metro, v_densidade_g_cm3
    FROM public.pcp_skus sku
    INNER JOIN public.pcp_familias_produto fam ON fam.id = sku.familia_id
    WHERE sku.id = v_sku_id;

    v_aco_metros_total := ((v_comprimento_mm - v_desconto_aco_mm)::numeric / 1000.0) * p_quantidade_produzida;
    v_aco_peso_total := v_aco_metros_total * 0.395;

    v_volume_aco_total := v_volume_aco_metro * ((v_comprimento_mm - v_desconto_aco_mm)::numeric / 1000.0) * p_quantidade_produzida;
    v_volume_plastico_liquido := (v_area_secao_externa * (v_comprimento_mm::numeric / 1000.0) * p_quantidade_produzida) - v_volume_aco_total;
    IF v_volume_plastico_liquido < 0 THEN
        v_volume_plastico_liquido := 0;
    END IF;

    v_massa_plastico_total := v_volume_plastico_liquido * (COALESCE(v_densidade_g_cm3, 0.95) * 1000.0);

    FOR r_bom IN (
        SELECT b.insumo_id, b.quantidade_por_unidade, b.percentual_blend, i.categoria
        FROM public.pcp_bom b
        INNER JOIN public.pcp_insumos i ON i.id = b.insumo_id
        WHERE b.familia_id = v_familia_id
    ) LOOP
        IF r_bom.categoria = 'ACO' THEN
            UPDATE public.pcp_insumos
            SET estoque_atual = estoque_atual - v_aco_peso_total
            WHERE id = r_bom.insumo_id;
        ELSIF r_bom.categoria = 'QUIMICO' AND r_bom.percentual_blend IS NOT NULL THEN
            DECLARE
                v_consumo_nominal NUMERIC(15,4);
                v_consumo_refugo NUMERIC(15,4);
            BEGIN
                v_consumo_nominal := v_massa_plastico_total * (r_bom.percentual_blend / 100.0);
                v_consumo_refugo := p_refugo_kg * (r_bom.percentual_blend / 100.0);
                
                UPDATE public.pcp_insumos
                SET estoque_atual = estoque_atual - (v_consumo_nominal + v_consumo_refugo)
                WHERE id = r_bom.insumo_id;
            END;
        ELSE
            UPDATE public.pcp_insumos
            SET estoque_atual = estoque_atual - (r_bom.quantidade_por_unidade * v_massa_plastico_total)
            WHERE id = r_bom.insumo_id;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC para registrar recebimento de estoque no PCP
CREATE OR REPLACE FUNCTION public.pcp_registrar_recebimento(p_entrada_id UUID)
RETURNS VOID AS $$
DECLARE
    v_entrada RECORD;
BEGIN
    SELECT * INTO v_entrada
    FROM public.pcp_entradas_estoque
    WHERE id = p_entrada_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Entrada de estoque não encontrada.';
    END IF;

    IF v_entrada.status = 'ENTREGUE' THEN
        RAISE EXCEPTION 'Esta entrada já foi registrada como ENTREGUE.';
    END IF;

    UPDATE public.pcp_entradas_estoque
    SET 
        status = 'ENTREGUE',
        data_entrega = NOW(),
        updated_at = NOW()
    WHERE id = p_entrada_id;

    UPDATE public.pcp_insumos
    SET 
        estoque_atual = estoque_atual + v_entrada.quantidade,
        custo_unitario = v_entrada.preco_unitario,
        metadados = jsonb_set(
            COALESCE(metadados, '{}'::jsonb), 
            '{last_purchase_price}', 
            to_jsonb(v_entrada.preco_unitario)
        )
    WHERE id = v_entrada.insumo_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
