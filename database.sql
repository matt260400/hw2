create database senutia;

use senutia;

create table users(
id integer primary key auto_increment,
username varchar(20) not null unique,
email varchar(255) not null unique,
password varchar(255) not null,
proPic varchar(2048),
remember_token varchar(255),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) engine=innodb;

create table artists (
id integer primary key auto_increment,
user_id integer not null,
artist_id varchar(255) not null,
index user_ids(user_id),
FOREIGN KEY(user_id) REFERENCES users(id) on delete cascade,
UNIQUE (user_id, artist_id),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) engine=innodb;

create table tracks (
id integer primary key auto_increment,
user_id integer not null,
track_id varchar(255) not null,
index user_ids(user_id),
FOREIGN KEY(user_id) REFERENCES users(id) on delete cascade,
UNIQUE (user_id, track_id),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) engine=innodb;