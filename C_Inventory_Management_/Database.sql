-- select all the detailes in the inventory table
select * from inventory;

-- drop the inventory table
drop table inventory;

-- create the inventory table
CREATE TABLE inventory (
    product_id serial PRIMARY KEY,
    product_name varchar(255) NOT NULL,
    product_price numeric(10, 2) NOT NULL,
    product_count integer NOT NULL
);

-- inserting items in to the inventory table
INSERT INTO inventory ( product_name, product_price, product_count)
VALUES ('Laptop', 200000, 40);

-- Delete accroding to the id provided
DELETE FROM inventory
WHERE product_id = 2 OR product_id = 3;

-- Alter the tabels product_id incrementing method 
CREATE SEQUENCE product_id_seq;

ALTER TABLE inventory
ALTER COLUMN product_id SET DEFAULT nextval('product_id_seq'::regclass),
ALTER COLUMN product_id SET NOT NULL;

-- how to update a product 


