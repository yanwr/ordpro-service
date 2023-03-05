create schema ccat;

create table ccat.product (
    id integer primary key,
    description text,
    price numeric
);


create table ccat.coupon (
    id integer primary key,
    code varchar,
    percentage numeric,
    expireAt timestamp
);