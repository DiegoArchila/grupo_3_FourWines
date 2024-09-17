/*
name: createSchemaTumueble.sql
description: create the schema tumueble with tables and relations
autors: Diego Alonso Archila, Colombia (Rionegro - Antioquia), Ricardo Mantilla
*/

-- POBLATE TABLES WITH INFORMATION

-- TABLE: usersGender
INSERT INTO 
	tumueble.usersGender(
        gender, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Hombre', 
        'Genero Hombre, Masculino.', 
        NOW(), 
        NOW()
    ),(
        'Mujer', 
        'Genero Mujer, Femenina', 
        NOW(), 
        NOW()
    ),(
        'No Definido', 
        'Genero No definido',
        NOW(),
        NOW()
    );

-- TABLE: emailsCategory
INSERT INTO 
	tumueble.emailsCategory(
        category, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Personal', 
        'Categoria para los mails personales de los usuarios', 
        NOW(), 
        NOW()
    ),(
        'Laboral', 
        'Categoria para los mails de caracter laboral de los usuarios', 
        NOW(), 
        NOW()
    ),(
        'Compartido', 
        'Categoria para los mails hibridos compartidos',
        NOW(),
        NOW()
    );

-- TABLE: phonesCategory
INSERT INTO 
	tumueble.phonesCategory(
        category, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Personal', 
        'Categoria para los numeros de teléfonos personales de los usuarios', 
        NOW(), 
        NOW()
    ),(
        'Laboral', 
        'Categoria para los numeros de teléfonos de caracter laboral de los usuarios', 
        NOW(), 
        NOW()
    ),(
        'Compartido', 
        'Categoria para los numeros de teléfonos hibridos compartidos',
        NOW(),
        NOW()
    );

-- TABLE: productsCategory 
INSERT INTO 
	tumueble.productsCategory(
        category, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Sofas', 
        'Categoria para los productos tipo Sofas', 
        NOW(), 
        NOW()
    ),(
        'Camas', 
        'Categoria para los productos tipo Camas', 
        NOW(), 
        NOW()
    ),(
        'Comedor', 
        'Categoria para los productos tipo Comedores',
        NOW(),
        NOW()
    ),(
        'Salas', 
        'Categoria para los productos tipo Salas',
        NOW(),
        NOW()
    ),(
        'Peinadores', 
        'Categoria para los productos tipo Peinadores',
        NOW(),
        NOW()
    ),(
        'Organizadores', 
        'Categoria para los productos tipo Organizadores, Chifonier',
        NOW(),
        NOW()
    );

-- TABLE: taxes
INSERT INTO 
	tumueble.taxes(
        taxeName, 
        taxeDescription,
        taxeValue,
        isActive,
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'IVA 19%', 
        'Iva del 19%',
        19.00,
        1,
        'Agrega notas referente al iva 19%',
        NOW(), 
        NOW()
    ),(
        'IVA 8%', 
        'Iva del 8%',
        8.00,
        1,
        'Agrega notas referente al iva 8%',
        NOW(), 
        NOW()
    ),(
        'IVA 16%', 
        'Iva del 16%',
        16.00,
        1,
        'Agrega notas referente al iva 16%',
        NOW(), 
        NOW()
);

-- TABLE: cartState 
INSERT INTO 
	tumueble.cartState(
        stateName,
        stateValue, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Activo', 
        1,
        'Indica que el carrito esta activo', 
        NOW(), 
        NOW()
),(
        'Comprado', 
        2,
        'Indica que el carrito esta comprado', 
        NOW(), 
        NOW()
);

-- TABLE: users 
INSERT INTO 
	tumueble.users(
        firstName,
        lastName,
        DateBorn,
        genderId,
        imagen,
        pwd,
        isAdmin,
        created_at, 
        updated_at
        )
VALUES(
        -- LLenar datos referentes a tumueble.users
        'Super',
        'Admin :V',
        CURDATE(),
        1,
        '/img/avatar.jpg',
        '$2a$12$AJrgBEvyKCngvCAHDZiAseM0UBdTwSHPCe9qduCKTq5CZ8giUweVu', -- 12345, SALT 12
        1,
        NOW(), 
        NOW()       
),(
        -- LLenar datos referentes a tumueble.users
        'Calimeña',
        'Vamos a bailar que no pasa naaa\'\' ',
        "1991-01-16",
        2,
        '/img/avatar.jpg',
        '$2a$12$AJrgBEvyKCngvCAHDZiAseM0UBdTwSHPCe9qduCKTq5CZ8giUweVu', -- 12345, SALT 12
        0,
        NOW(), 
        NOW()       
);

-- TABLE: usersEmails
INSERT INTO tumueble.usersEmails(
    email,
    categoryId,
    userId,
    created_at,
    updated_at
) Values (
    'admin@tumueble.com',
    2,
    1,
    NOW(),
    NOW()
),(
    'mujer@tumueble.com',
    2,
    2,
    NOW(),
    NOW()
);

-- Table: products

/* INSERT QUERY NO: 1 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Sofa 2P Chester Gris Plata','Sofa de 2 puestos, hecho en Sajo y acabo en tela con medidas de alto: 78cm, y  ancho: 160cm y una profundidad: 85cm, de color gris','316','tela',1,10000,5000,50,10,6,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 2 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('SOFA CAMA DE LINO ARRUGADO','Destaca por su dise�o relajado y, a su vez, elegante. Tapizado en lino arrugado y con un ribete decorativo negro, dara estilo a tu apartamento de verano. Con el plus de ofrecer una cama extra. Sus medidas son 166 x 91 x 90 cm','123','Lino',1,100,98,2,0,0,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 3 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Sofa Parnell 3 Puestos Poliester Mica','Sofa de poliester','123','Lino',1,10,10,0,10,0,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 4 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Cama Felder','Descansa como un rey en la elegante cama FELDER. Con su esencia �contempor�nea y una limpia estructura de madera, esta moderna cama aporta estilo y confort a cualquier dormitorio.','CAM-FEL','Madera',2,2037000,1833300,10,20,7,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 5 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Cama Tapizada Garden','CAMA VALDY','CAM-GARDEN-1-1','Madera',2,1202000,961600,20,10,4,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 6 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Cama Doble Libia','Dale un toque especial a tu hogar con nuestra incre�ble�cama Libia brinda una sensaci�n incomparable de sofisticaci�n y estilo. Cabecero fabricado en madera aglomerado MDP 15 mm con reengruese en madera MDF de 18 mm.','CAM.00008.01','Madecor',2,1640000,1476000,10,20,5,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 7 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Mesa de Comedor Carson','La mesa de comedor CARSON es el resultado del placer que provoca jugar con las formas y la madera. Su estructura visible e imponente, con su tablero en fusi�n con hermosas capillas hacen �nica esta exclusiva mesa de comedor.','MCO-CAR','Chapilla',3,2000000,1500000,25,15,11,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 8 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Mesa de Comedor Alpha 6 Puestos','MESA DE COMEDOR ALPHA 6 PUESTOS','MCO-ALPHA-1-1','Chapilla',3,1200000,1200000,0,20,13,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 9 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Mesa de Comedor Feel 4 Puestos','MESA DE COMEDOR FEEL 4 PUESTOS','MCO-FEEL-1-1','Chapilla',3,627000,627000,0,30,5,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 10 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Sala Lisboa Plata En Tela','El Juego de Sala Lisboa se encuentra fabricado en una fuerte estructura de madera pino, con espuma de alta densidad, tapizado en tela poli�ster de excelente calidad.','SLPET','Tela',4,3000000,2700000,10,5,2,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 11 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Combo Fusion Sala Osaki Alpha 55 + Comedor Nordico 5P Blanco Natural Tapiz Indigo','Lleva a tu hogar esta novedosa�combo de Sala y Comedor�de Arte K','12210','Madera',4,1700000,1700000,0,10,0,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 12 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Sala Cama Arte K Porto + Mesa Centro + Cojines Gris','Dise�amos productos para el hogar ideales para espacios reducidos, con telas finas y terminados excelentes. Somos fabricantes, por eso contamos con precios insuperables, y nuestra pol�tica de �precios incre�bles� podr�s disfrutar mas con menos.','2142','Tela',4,1400000,980000,30,10,5,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 13 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('tocador puff amatista 2c tk modulares blanco','Funcional�tocador��maquillaje�personal, fabricado en aglomerado madecor recubierto en melaminico tablemac que lo hace m�s duradero al tiempo y resistente al calor y humedad','TPA2TMB','Madecor',5,700000,504000,28,10,3,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 14 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Hollywood Mesa De Maquillaje','hermoso espejo con luz led tipo hollywood','HMDM','Madecor',5,730000,730000,0,10,1,1,NULL,NOW(),NOW());

/* INSERT QUERY NO: 15 */
INSERT INTO products(productName, productDescription, sku, productTerminated, categoryId, priceGross, priceFinal, discount, unitsBuyes, unitsSelled, isActive, notes, created_at, updated_at)
VALUES ('Espejo De Pie Con Luz','Tocador Venus Puff Incorporado','EDPCL','Madecor',5,550000,550000,0,10,4,1,NULL,NOW(),NOW());

-- Table: productsTaxes

/* INSERT QUERY NO: 1 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,1,NOW(),NOW());

/* INSERT QUERY NO: 2 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,2,NOW(),NOW());

/* INSERT QUERY NO: 3 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,3,NOW(),NOW());

/* INSERT QUERY NO: 4 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,4,NOW(),NOW());

/* INSERT QUERY NO: 5 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,5,NOW(),NOW());

/* INSERT QUERY NO: 6 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,6,NOW(),NOW());

/* INSERT QUERY NO: 7 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,7,NOW(),NOW());

/* INSERT QUERY NO: 8 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,8,NOW(),NOW());

/* INSERT QUERY NO: 9 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,9,NOW(),NOW());

/* INSERT QUERY NO: 10 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,10,NOW(),NOW());

/* INSERT QUERY NO: 11 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,11,NOW(),NOW());

/* INSERT QUERY NO: 12 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,12,NOW(),NOW());

/* INSERT QUERY NO: 13 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,13,NOW(),NOW());

/* INSERT QUERY NO: 14 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,14,NOW(),NOW());

/* INSERT QUERY NO: 15 */
INSERT INTO productsTaxes(taxeId, productId, created_at, updated_at)
VALUES (1,15,NOW(),NOW());

-- Table: productsImages
/* INSERT QUERY NO: 1 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Sofa_2P_Chester_Gris_plata.jpg',1,NOW(),NOW());

/* INSERT QUERY NO: 2 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'SOFA_CAMA_DE_LINO_ARRUGADO.jpg',2,NOW(),NOW());

/* INSERT QUERY NO: 3 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Sofa_Parnell_3_Puestos_Poliester_Mica.jpeg',3,NOW(),NOW());

/* INSERT QUERY NO: 4 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Cama_Felder.jpg',4,NOW(),NOW());

/* INSERT QUERY NO: 5 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Cama_Tapizada_Garden.jpg',5,NOW(),NOW());

/* INSERT QUERY NO: 6 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Cama_Doble_Libia.jpg',6,NOW(),NOW());

/* INSERT QUERY NO: 7 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Mesa_de_Comedor_Carson.jpg',7,NOW(),NOW());

/* INSERT QUERY NO: 8 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Mesa_de_Comedor_Alpha_6_Puestos.jpg',8,NOW(),NOW());

/* INSERT QUERY NO: 9 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Mesa_de_Comedor_Feel_4_Puestos.jpg',9,NOW(),NOW());

/* INSERT QUERY NO: 10 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Sala_Lisboa_Plata_En_Tela.jpg',10,NOW(),NOW());

/* INSERT QUERY NO: 11 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'combo-arte.jpg',11,NOW(),NOW());

/* INSERT QUERY NO: 12 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Sala_Cama_Arte_K_Porto.png',12,NOW(),NOW());

/* INSERT QUERY NO: 13 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'tocador_puff.jpg',13,NOW(),NOW());

/* INSERT QUERY NO: 14 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Hollywood_Mesa.jpg',14,NOW(),NOW());

/* INSERT QUERY NO: 15 */
INSERT INTO productsImages(isMain, pathImagen, productId, created_at, updated_at)
VALUES (1,'Espejo_De_Pie_Con_Luz.jpg',15,NOW(),NOW());