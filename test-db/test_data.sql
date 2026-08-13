-- Test Data Insertion Script
-- Run these in order to maintain referential integrity

-- 1. Insert Categories (required before products)
INSERT INTO categories (name, created_at, updated_at, is_deleted)
VALUES 
    ('Vibradores', NOW(), NOW(), false),
    ('Parejas', NOW(), NOW(), false),
    ('BDSM', NOW(), NOW(), false),
    ('Lubricantes', NOW(), NOW(), false),
    ('Accesorios', NOW(), NOW(), false);

-- 2. Insert Products (reference category_id from above)
-- Assuming category IDs: 1=Vibradores, 2=Parejas, 3=BDSM, 4=Lubricantes, 5=Accesorios
INSERT INTO products (category_id, name, price, description, is_active, image_url, created_at, updated_at, is_deleted)
VALUES
    (1, 'Velvet Rose Pro', 89.99, 'Vibrador de silicona médica de alta calidad', true, 'https://images.unsplash.com/photo-1760860992203-85ca32536788?w=500', NOW(), NOW(), false),
    (2, 'Duo Pulse Connect', 129.00, 'Juguete para parejas controlado por app', true, 'https://images.unsplash.com/photo-1779556507342-7951f64a3b86?w=500', NOW(), NOW(), false),
    (1, 'Silk Touch Massager', 64.50, 'Masajeador corporal de silicona suave', true, 'https://images.unsplash.com/photo-1695048367315-3d4bcd9c5df4?w=500', NOW(), NOW(), false),
    (3, 'Midnight Ritual Set', 149.00, 'Set BDSM edición limitada cuero vegano', true, 'https://images.unsplash.com/photo-1772987714654-2df39af2c658?w=500', NOW(), NOW(), false),
    (1, 'Noir Wand Elite', 109.00, 'Varita mágica recargable potente', true, 'https://images.unsplash.com/photo-1633793566063-52465a148cc7?w=500', NOW(), NOW(), false),
    (3, 'Obsidian Cuffs Set', 59.00, 'Esposas de cuero vegano ajustables', true, 'https://images.unsplash.com/photo-1633793566189-8e9fe6f817fc?w=500', NOW(), NOW(), false),
    (2, 'Lumière Duo', 98.00, 'Vibrador para parejas wearable', true, 'https://images.unsplash.com/photo-1633793565852-04e2a1482614?w=500', NOW(), NOW(), false),
    (1, 'Petal Bloom G-Spot', 74.99, 'Vibrador punto G diseño ergonómico', true, 'https://images.unsplash.com/photo-1602037299890-c593f4c81d47?w=500', NOW(), NOW(), false),
    (3, 'Velvet Rope Kit', 44.00, 'Kit bondage cuerda algodón suave', true, 'https://images.unsplash.com/photo-1633793566102-ee7793834059?w=500', NOW(), NOW(), false),
    (4, 'Aqua Glide Premium', 24.99, 'Lubricante base agua sin parabenos', true, 'https://images.unsplash.com/photo-1698593975704-f415e32689fa?w=500', NOW(), NOW(), false),
    (4, 'Silk & Satin Blend', 32.00, 'Lubricante base silicona larga duración', true, 'https://images.unsplash.com/photo-1700225195176-39ebd9cd5550?w=500', NOW(), NOW(), false),
    (2, 'Aurora Wearable', 115.00, 'Vibrador wearable control remoto', true, 'https://images.unsplash.com/photo-1775255487971-af15499994b1?w=500', NOW(), NOW(), false),
    (3, 'Blindfold Luxe', 28.00, 'Antifaz seda premium', true, 'https://images.unsplash.com/photo-1760860992203-85ca32536788?w=500', NOW(), NOW(), false),
    (5, 'Feather Teaser', 18.50, 'Plumas naturales para juego sensorial', true, 'https://images.unsplash.com/photo-1602037299924-64d70ca69264?w=500', NOW(), NOW(), false),
    (3, 'Crimson Harness', 89.00, 'Arnés cuero vegano ajustable', true, 'https://images.unsplash.com/photo-1633793566189-8e9fe6f817fc?w=500', NOW(), NOW(), false),
    (2, 'Pulse Ring Duo', 39.99, 'Anillo vibrador para parejas', true, 'https://images.unsplash.com/photo-1772987714654-2df39af2c658?w=500', NOW(), NOW(), false),
    (4, 'Warming Massage Oil', 29.00, 'Aceite masaje efecto calor', true, 'https://images.unsplash.com/photo-1698593975704-f415e32689fa?w=500', NOW(), NOW(), false),
    (3, 'Velvet Paddle', 47.00, 'Paleta cuero vegano doble cara', true, 'https://images.unsplash.com/photo-1633793565852-04e2a1482614?w=500', NOW(), NOW(), false),
    (5, 'Satin Sleep Mask', 16.00, 'Antifaz satén para descanso', true, 'https://images.unsplash.com/photo-1602037299890-c593f4c81d47?w=500', NOW(), NOW(), false),
    (1, 'Solo Bliss Rechargeable', 79.00, 'Vibrador recargable silencioso', true, 'https://images.unsplash.com/photo-1695048367315-3d4bcd9c5df4?w=500', NOW(), NOW(), false);

-- 3. Insert Users (optional - for auth testing)
-- Password is hashed placeholder; in reality use bcrypt
INSERT INTO users (fullname, phone, email, password, created_at, updated_at, is_deleted)
VALUES
    ('Admin Test', '+1234567890', 'admin@test.com', '$2b$12$hashedpasswordplaceholder', NOW(), NOW(), false),
    ('Usuario Demo', '+1987654321', 'demo@test.com', '$2b$12$hashedpasswordplaceholder', NOW(), NOW(), false);