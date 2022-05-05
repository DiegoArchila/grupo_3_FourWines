/*
name: createSchemaTumueble.sql
description: create the schema tumueble with tables and relations
autor: Diego Alonso Archila, Colombia (Rionegro - Antioquia)
*/

START TRANSACTION;

-- DROP IF EXISTS SCHEMA
DROP SCHEMA IF EXISTS tumueble;

-- CREATE SCHEMA
CREATE SCHEMA IF NOT EXISTS tumueble;

-- SELECT THE SCHEMA
USE tumueble;

-- MAKES TABLES

-- USERS
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    dateBorn DATE NOT NULL,
    genderId INTEGER NOT NULL,
    imagen VARCHAR(255) NULL,
    pwd VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isAdmin TINYINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- USERS GENDERS
CREATE TABLE IF NOT EXISTS usersGender(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    gender VARCHAR(64) NOT NULL UNIQUE,
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- USERS EMAILS
CREATE TABLE IF NOT EXISTS usersEmails(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    categoryId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS emailsCategory(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(64) NOT NULL UNIQUE,
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL  
);

-- USERS PHONES
CREATE TABLE IF NOT EXISTS usersPhones(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(255) NOT NULL UNIQUE,
    categoryId INTEGER NOT NULL,
    userId INTEGER  NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS phonesCategory(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(64) NOT NULL UNIQUE,
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL   
);

-- USERS LOCATIONS
CREATE TABLE IF NOT EXISTS usersLocations(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(128) NOT NULL,
    provinceState VARCHAR(128) NOT NULL,
    cityTown VARCHAR(128) NOT NULL,
    addressLine VARCHAR(255) NOT NULL,
    userId INTEGER NOT NULL,
    isMain TINYINT NOT NULL DEFAULT 0, 
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL 
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS products(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(128) NOT NULL,
    productDescription VARCHAR(255) NOT NULL,
    sku VARCHAR(64) NULL,
    productTerminated VARCHAR(64) NULL,
    categoryId INTEGER NOT NULL,
    priceGross BIGINT NOT NULL,
    priceFinal BIGINT NOT NULL,
    discount INTEGER NOT NULL,
    unitsBuyes INTEGER NULL,
    unitsSelled INTEGER NULL,
    isActive TINYINT NOT NULL DEFAULT 0, 
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL 
);

-- PRODUCTS CATEGORY
CREATE TABLE IF NOT EXISTS productsCategory(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(64) NOT NULL UNIQUE,
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- PRODUCTS IMAGES
CREATE TABLE IF NOT EXISTS productsImages(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    isMain TINYINT NOT NULL DEFAULT 0,
    imagenDescription VARCHAR(255) NOT NULL,
    pathImagen VARCHAR(255) NOT NULL,
    productId INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- PRODUCTS TAXES
CREATE TABLE IF NOT EXISTS productsTaxes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    taxeId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS taxes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    taxeName VARCHAR(64) NOT NULL,
    taxeDescription VARCHAR(255) NOT NULL,
    taxeValue DECIMAL NOT NULL,
    isActive TINYINT NOT NULL DEFAULT 0,
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- CARTS
CREATE TABLE IF NOT EXISTS carts(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INTEGER NOT NULL,
    total BIGINT NOT NULL,
    stateId INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS cartState(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stateName VARCHAR(64) NOT NULL,
    stateValue TINYINT NOT NULL UNIQUE,
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- TABLE PIVOT USERSCARTS
CREATE TABLE IF NOT EXISTS usersCarts(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INTEGER NOT NULL,
    cartId INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- TABLE PIVOT CARTPRODUCTS(CARTBOX)
CREATE TABLE IF NOT EXISTS cartBox(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productId INTEGER NOT NULL,
    cartId INTEGER NOT NULL,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL
);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    oderDate DATE NOT NULL,
    cartId INTEGER NOT NULL,
    userLocationId INTEGER NOT NULL,
    guideTransport VARCHAR(128) NULL,
    notes VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);


-- CREATE CONSTRAINS FOREIGNS KEYS

--          USERS
-- USER (GENDERS OF USERS)
ALTER TABLE users 
    ADD CONSTRAINT usersGenders 
        FOREIGN KEY (genderId)
        REFERENCES usersGender(id);

-- USERSEMAILS (EMAILS OF USERS)
ALTER TABLE usersEmails 
    ADD CONSTRAINT usersEmails 
        FOREIGN KEY (userId)
        REFERENCES users(id);

-- EMAILSCATEGORY (CATEGORIES OF EMAIL)
ALTER TABLE usersEmails 
    ADD CONSTRAINT emailsCategory 
        FOREIGN KEY (categoryId)
        REFERENCES emailsCategory(id);

-- USERPHONES (PHONES OF USERS)
ALTER TABLE usersPhones 
    ADD CONSTRAINT phonesUsers 
        FOREIGN KEY (userId)
        REFERENCES users(id);

-- PHONESCATEGORY (CATEGORIES OF PHONES)
ALTER TABLE usersPhones 
    ADD CONSTRAINT categoriesPhones 
        FOREIGN KEY (categoryId)
        REFERENCES phonesCategory(id);

-- USERSLOCATIONS (LOCATIONS OF USERS)
ALTER TABLE usersLocations 
    ADD CONSTRAINT locationsUsers 
        FOREIGN KEY (userId)
        REFERENCES users(id);

--              PRODUCTS
-- PRODUCTSCATEGORY (CATEGORIES OF PRODUCTS)
ALTER TABLE products 
    ADD CONSTRAINT productsCategories 
        FOREIGN KEY (categoryId)
        REFERENCES productsCategory(id);

-- PRODUCTSIMAGES (IMAGES OF PRODUCTS)
ALTER TABLE productsImages 
    ADD CONSTRAINT imagesProducts 
        FOREIGN KEY (productId)
        REFERENCES products(id);

-- PRODUCTSTAXES (TAXES OF PRODUCTS)
ALTER TABLE productsTaxes 
    ADD CONSTRAINT taxesProducts 
        FOREIGN KEY (productId)
        REFERENCES products(id);

-- TAXES (TAXES)
ALTER TABLE productsTaxes 
    ADD CONSTRAINT taxes 
        FOREIGN KEY (taxeId)
        REFERENCES taxes(id);

--          CART
-- CARTS USER (CARTS OF USERS)
ALTER TABLE carts 
    ADD CONSTRAINT userCarts 
        FOREIGN KEY (userId)
        REFERENCES users(id);

-- CART STATES (STATES OF CARTS)
ALTER TABLE carts 
    ADD CONSTRAINT cartsStates 
        FOREIGN KEY (stateId)
        REFERENCES cartState(id);

-- USERSCARTS (USERS TO CARTS)
ALTER TABLE usersCarts 
    ADD CONSTRAINT usersCarts 
        FOREIGN KEY (userId)
        REFERENCES users(id);

-- CARTSUSERS (CARTS TO USERS)
ALTER TABLE usersCarts 
    ADD CONSTRAINT cartsUsers 
        FOREIGN KEY (cartId)
        REFERENCES carts(id);

-- CARTBOXPRODUCTS (PRODUCTS OF CARTBOX)
ALTER TABLE cartBox 
    ADD CONSTRAINT cartBoxProducts 
        FOREIGN KEY (productId)
        REFERENCES products(id);

-- CARTBOXCART (CART OF CARTBOX)
ALTER TABLE cartBox 
    ADD CONSTRAINT cartBoxCart 
        FOREIGN KEY (cartId)
        REFERENCES carts(id);

--          ORDERS
-- ORDERS (ORDERS OF CART)
ALTER TABLE orders 
    ADD CONSTRAINT ordersCart 
        FOREIGN KEY (cartId)
        REFERENCES carts(id);

-- ORDERS (USERLOCATION OF ORDER)
ALTER TABLE orders 
    ADD CONSTRAINT orderUserLocation 
        FOREIGN KEY (userLocationId)
        REFERENCES usersLocations(id);

COMMIT;