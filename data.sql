CREATE DATABASE partiesDB;

CREATE TABLE parties(
    partyID SERIAL PRIMARY KEY,
    partyname varchar(20),
    imgurl varchar(255),
    price numeric,
    date varchar(255)
);