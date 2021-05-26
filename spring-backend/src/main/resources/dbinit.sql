DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(tr_id serial PRIMARY KEY, id INTEGER, date VARCHAR(255), checkout INTEGER);
DROP TABLE IF EXISTS kittens;
CREATE TABLE kittens(id INTEGER PRIMARY KEY, price INTEGER);
DROP SEQUENCE IF EXISTS hibernate_sequence;
CREATE SEQUENCE hibernate_sequence START 1;
