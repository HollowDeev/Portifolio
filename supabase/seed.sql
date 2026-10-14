-- ==============================================================================
-- SEED DATA & RESET FUNCTION FOR PORTFOLIO DEMO DATABASE
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.reset_demo_data()
RETURNS VOID AS $$
DECLARE
    v_empresa_id UUID := '11111111-1111-1111-1111-111111111111';
    v_fam1_id UUID := '22222222-2222-2222-2222-222222222221';
    v_fam2_id UUID := '22222222-2222-2222-2222-222222222222';
    v_sku1_id UUID := '33333333-3333-3333-3333-333333333331';
    v_sku2_id UUID := '33333333-3333-3333-3333-333333333332';
    v_insumo_aco UUID := '44444444-4444-4444-4444-444444444441';
    v_insumo_pp UUID := '44444444-4444-4444-4444-444444444442';
    v_insumo_pigmento UUID := '44444444-4444-4444-4444-444444444443';
    v_pedido_pcp UUID := '55555555-5555-5555-5555-555555555551';
    v_fornecedor_pcp UUID := '66666666-6666-6666-6666-666666666661';

    -- Agro IDs
    v_cat_graos UUID := '77777777-7777-7777-7777-777777777771';
    v_cat_insumos UUID := '77777777-7777-7777-7777-777777777772';
    v_cat_ferramentas UUID := '77777777-7777-7777-7777-777777777773';
    v_prod_soja UUID := '88888888-8888-8888-8888-888888888881';
    v_prod_milho UUID := '88888888-8888-8888-8888-888888888882';
    v_prod_adubo UUID := '88888888-8888-8888-8888-888888888883';
    v_cust_agro UUID := '99999999-9999-9999-9999-999999999991';

    -- KitHub IDs
    v_kit_user1 UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1';
    v_kit_user2 UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2';

    -- Saboroso IDs
    v_sab_caixa UUID := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1';
    v_sab_food1 UUID := 'cccccccc-cccc-cccc-cccc-cccccccccc1';
    v_sab_food2 UUID := 'cccccccc-cccc-cccc-cccc-cccccccccc2';
    v_sab_ing1 UUID := 'dddddddd-dddd-dddd-dddd-ddddddddddd1';
    v_sab_ing2 UUID := 'dddddddd-dddd-dddd-dddd-ddddddddddd2';
BEGIN
    -- 1. LIMPAR DADOS EXISTENTES (Ordem reversa de constraints)
    DELETE FROM public.pcp_apontamentos;
    DELETE FROM public.pcp_ordens_producao;
    DELETE FROM public.pcp_pedidos;
    DELETE FROM public.pcp_entradas_estoque;
    DELETE FROM public.pcp_bom;
    DELETE FROM public.pcp_skus;
    DELETE FROM public.pcp_familias_produto;
    DELETE FROM public.pcp_insumos;
    DELETE FROM public.pcp_fornecedores;
    DELETE FROM public.pcp_funcionarios;
    DELETE FROM public.pcp_usuarios;
    DELETE FROM public.pcp_empresas;

    DELETE FROM public.agro_order_items;
    DELETE FROM public.agro_orders;
    DELETE FROM public.agro_customers;
    DELETE FROM public.agro_product_variations;
    DELETE FROM public.agro_product_images;
    DELETE FROM public.agro_products;
    DELETE FROM public.agro_categories;
    DELETE FROM public.agro_store_config;

    DELETE FROM public.kit_chat_messages;
    DELETE FROM public.kit_expenses;
    DELETE FROM public.kit_meal_preps;
    DELETE FROM public.kit_shopping_list;
    DELETE FROM public.kit_recipes;
    DELETE FROM public.kit_inventory;
    DELETE FROM public.kit_tasks;
    DELETE FROM public.kit_profiles;

    DELETE FROM public.sab_order_items;
    DELETE FROM public.sab_orders;
    DELETE FROM public.sab_sales;
    DELETE FROM public.sab_food_ingredients;
    DELETE FROM public.sab_ingredients;
    DELETE FROM public.sab_foods;
    DELETE FROM public.sab_cash_registers;

    DELETE FROM public.tv_password;
    DELETE FROM public.tv_tables;
    DELETE FROM public.tv_admnistration_settings;

    -- ==============================================================================
    -- 2. SEED AGROPRECIOSA
    -- ==============================================================================
    INSERT INTO public.agro_store_config (
        id, store_name, store_phone, store_email, store_address, delivery_fee, min_order_value
    ) VALUES (
        gen_random_uuid(), 'AgroPreciosa Demo', '(11) 98765-4321', 'vendas@agropreciosa.demo',
        'Av. das Nações Agro, 500 - Ribeirão Preto, SP', 15.00, 50.00
    );

    INSERT INTO public.agro_categories (id, name, slug, icon, display_order)
    VALUES 
        (v_cat_graos, 'Sementes e Grãos', 'sementes-e-graos', '🌾', 1),
        (v_cat_insumos, 'Fertilizantes e Nutrição', 'fertilizantes', '🧪', 2),
        (v_cat_ferramentas, 'Ferramentas e Campo', 'ferramentas', '🚜', 3);

    INSERT INTO public.agro_products (id, name, slug, description, category_id, cost_price, sale_price, stock_quantity, unit, is_featured)
    VALUES
        (v_prod_soja, 'Semente de Soja Super-Safra 40kg', 'soja-super-safra-40kg', 'Semente certificada de alto rendimento e germinação uniforme.', v_cat_graos, 120.00, 185.00, 350, 'sc', true),
        (v_prod_milho, 'Milho Híbrido Grão Dourado 20kg', 'milho-hibrido-20kg', 'Alta tolerância ao estresse hídrico e máxima produtividade.', v_cat_graos, 90.00, 145.00, 220, 'sc', true),
        (v_prod_adubo, 'Fertilizante NPK 04-14-08 50kg', 'fertilizante-npk-04-14-08', 'Formulação balanceada para plantio e desenvolvimento radicular.', v_cat_insumos, 110.00, 160.00, 180, 'sc', false);

    INSERT INTO public.agro_customers (id, name, phone, email, neighborhood, city, state)
    VALUES (v_cust_agro, 'Fazenda Bela Vista (Demo)', '(16) 99888-7766', 'contato@fazendabelavista.demo', 'Zona Rural', 'Ribeirão Preto', 'SP');

    INSERT INTO public.agro_orders (id, customer_id, status, payment_method, payment_status, subtotal, delivery_fee, total)
    VALUES ('aaaaaaaa-1111-1111-1111-111111111111', v_cust_agro, 'delivered', 'PIX', 'paid', 370.00, 15.00, 385.00);

    INSERT INTO public.agro_order_items (order_id, product_id, product_name, unit_price, quantity, total_price)
    VALUES ('aaaaaaaa-1111-1111-1111-111111111111', v_prod_soja, 'Semente de Soja Super-Safra 40kg', 185.00, 2, 370.00);

    -- ==============================================================================
    -- 3. SEED KITHUB
    -- ==============================================================================
    INSERT INTO public.kit_profiles (id, name, color, spending_limit)
    VALUES 
        (v_kit_user1, 'Carlos (Morador 1)', '#3b82f6', 1500.00),
        (v_kit_user2, 'Mariana (Moradora 2)', '#ec4899', 1500.00);

    INSERT INTO public.kit_tasks (title, assigned_roommate_id, created_by_roommate_id, date, status, type)
    VALUES
        ('Limpar cozinha e bancadas', v_kit_user1, v_kit_user2, CURRENT_DATE, 'pending', 'internal'),
        ('Comprar produtos de limpeza no atacado', v_kit_user2, v_kit_user1, CURRENT_DATE + 1, 'pending', 'external'),
        ('Organizar geladeira e descartar vencidos', v_kit_user1, v_kit_user1, CURRENT_DATE - 1, 'completed', 'internal');

    INSERT INTO public.kit_inventory (name, category, quantity, unit, min_quantity, status)
    VALUES
        ('Detergente Neutro', 'limpeza', 3, 'frasco', 2, 'ok'),
        ('Arroz Parboilizado 5kg', 'comida', 2, 'pct', 1, 'ok'),
        ('Azeite Extra Virgem', 'comida', 0, 'garrafa', 1, 'esgotado');

    INSERT INTO public.kit_expenses (description, amount, paid_by_user_id, date, split_type)
    VALUES
        ('Feira do Mês - Hortifruti', 184.50, v_kit_user1, CURRENT_DATE - 2, 'equal'),
        ('Conta de Energia Elétrica', 215.30, v_kit_user2, CURRENT_DATE - 5, 'equal');

    -- ==============================================================================
    -- 4. SEED SABOROSO PDV
    -- ==============================================================================
    INSERT INTO public.sab_cash_registers (id, owner_id, opening_amount, total_sales, total_orders, is_open)
    VALUES (v_sab_caixa, '00000000-0000-0000-0000-000000000001', 200.00, 480.00, 6, true);

    INSERT INTO public.sab_ingredients (id, name, unit, stock_quantity, min_stock, cost_per_unit)
    VALUES
        (v_sab_ing1, 'Carne de Hambúrguer 160g', 'un', 45, 10, 4.50),
        (v_sab_ing2, 'Queijo Cheddar Fatiado', 'kg', 8.5, 2.0, 32.00);

    INSERT INTO public.sab_foods (id, name, category, price, description)
    VALUES
        (v_sab_food1, 'Burger Artesanal Clássico', 'Burgers', 34.90, 'Pão brioche tostado, burger 160g, cheddar duplo, bacon crocante e maionese defumada.'),
        (v_sab_food2, 'Batata Rústica com Alecrim', 'Porções', 22.00, 'Batatas cortadas à mão, crocantes por fora e macias por dentro, com sal grosso e alecrim fresco.');

    INSERT INTO public.sab_orders (id, customer_name, table_number, subtotal, tax, total, status, payment_method, user_id, cash_register_id)
    VALUES ('cccccccc-1111-1111-1111-111111111111', 'Mesa 4 - Lucas', 4, 56.90, 5.69, 62.59, 'completed', 'Cartão Débito', '00000000-0000-0000-0000-000000000001', v_sab_caixa);

    -- ==============================================================================
    -- 5. SEED TVSISTEM & PASSWORDDISPLAY
    -- ==============================================================================
    INSERT INTO public.tv_tables (table_number, current_password, status)
    VALUES 
        (1, 'A012', 'busy'),
        (2, 'A014', 'calling'),
        (3, NULL, 'available'),
        (4, 'B003', 'busy'),
        (5, NULL, 'available');

    INSERT INTO public.tv_password (password, table_number, status)
    VALUES 
        ('A014', 2, 'calling'),
        ('A013', 1, 'served'),
        ('B003', 4, 'served');

    INSERT INTO public.tv_admnistration_settings (tv_name, sound_enabled, theme)
    VALUES ('Painel Central - Recepção', true, 'dark');

    -- ==============================================================================
    -- 6. SEED GESTORPRO - SOFTWARE PCP / MRP
    -- ==============================================================================
    INSERT INTO public.pcp_empresas (id, nome, cnpj, email, telefone, plano, ativo)
    VALUES (v_empresa_id, 'Poliméricos Demo Ltda', '12.345.678/0001-90', 'gestao@polimericosdemo.ind.br', '(11) 4002-8922', 'DEMO', true);

    INSERT INTO public.pcp_usuarios (empresa_id, nome, email, cargo, ativo)
    VALUES 
        (v_empresa_id, 'Engenheiro de Produção Demo', 'demo@portfolio.com', 'GESTOR', true),
        (v_empresa_id, 'Operador Chefe de Turno', 'operador@polimericosdemo.ind.br', 'OPERADOR', true);

    INSERT INTO public.pcp_familias_produto (id, empresa_id, nome, descricao, area_secao_externa, volume_aco_metro, densidade_g_cm3)
    VALUES 
        (v_fam1_id, v_empresa_id, 'Perfil Guia Rígido Série Alpha', 'Perfil extrusado em polipropileno com alma estrutural em aço carbono.', 0.0012, 0.00005, 0.94),
        (v_fam2_id, v_empresa_id, 'Canaleta Industrial Série Beta', 'Canaleta de alto impacto com reforço para fixação pesada.', 0.0018, 0.00008, 0.95);

    INSERT INTO public.pcp_skus (id, empresa_id, familia_id, codigo, nome, comprimento_mm, desconto_aco_mm, peso_teorico_kg, estoque_acabado)
    VALUES
        (v_sku1_id, v_empresa_id, v_fam1_id, 'SKU-ALP-1000', 'Perfil Alpha 1000mm com alma de aço', 1000, 40, 1.45, 120),
        (v_sku2_id, v_empresa_id, v_fam1_id, 'SKU-ALP-2000', 'Perfil Alpha 2000mm com alma de aço', 2000, 60, 2.88, 75);

    INSERT INTO public.pcp_insumos (id, empresa_id, nome, categoria, unidade, estoque_atual, estoque_minimo, custo_unitario)
    VALUES
        (v_insumo_aco, v_empresa_id, 'Aço Carbono Trefilado Ø8mm', 'ACO', 'KG', 1850.00, 500.00, 8.50),
        (v_insumo_pp, v_empresa_id, 'Resina Polipropileno Homopolímero H103', 'QUIMICO', 'KG', 3400.00, 1000.00, 11.20),
        (v_insumo_pigmento, v_empresa_id, 'Masterbatch Preto Universal 2%', 'QUIMICO', 'KG', 160.00, 40.00, 28.00);

    INSERT INTO public.pcp_bom (familia_id, insumo_id, quantidade_por_unidade, percentual_blend)
    VALUES
        (v_fam1_id, v_insumo_aco, 1.0, NULL),
        (v_fam1_id, v_insumo_pp, 0.0, 98.0),
        (v_fam1_id, v_insumo_pigmento, 0.0, 2.0);

    INSERT INTO public.pcp_fornecedores (id, empresa_id, razao_social, nome_fantasia, cnpj, email, telefone)
    VALUES (v_fornecedor_pcp, v_empresa_id, 'Siderúrgica & Resinas Brasil S.A.', 'SiderBrasil Matérias-Primas', '98.765.432/0001-10', 'comercial@siderbrasil.demo', '(11) 3300-1100');

    INSERT INTO public.pcp_pedidos (id, empresa_id, cliente_nome, numero_pedido, data_emissao, data_entrega_prevista, status, total)
    VALUES (v_pedido_pcp, v_empresa_id, 'Montadora Estrutural Sudeste Ltda', 'PED-2026-089', CURRENT_DATE - 3, CURRENT_DATE + 7, 'EM_PRODUCAO', 14500.00);

    INSERT INTO public.pcp_ordens_producao (empresa_id, pedido_id, sku_id, numero_op, quantidade_planejada, quantidade_produzida, status)
    VALUES (v_empresa_id, v_pedido_pcp, v_sku1_id, 'OP-2026-0142', 200, 80, 'EM_ANDAMENTO');

    INSERT INTO public.pcp_funcionarios (empresa_id, nome, cargo, turno)
    VALUES
        (v_empresa_id, 'Marcos Vinicius', 'Operador de Extrusora I', 'MANHA'),
        (v_empresa_id, 'Rafael Mendes', 'Técnico de Setup e Matrizes', 'MANHA');

END;
$$ LANGUAGE plpgsql;

-- Executar reset inicial para popular as tabelas
SELECT public.reset_demo_data();
