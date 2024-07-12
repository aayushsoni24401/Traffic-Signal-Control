create database traffic_signal;

use traffic_signal;

create table signals(
    id int auto_increment primary key,
    name varchar(1) not null,
    sequence int not null
);

create table configuration(
    id int auto_increment primary key,
    green_interval int not null,
    yellow_interval int not null
);