create database if not exists Trybeer;
use Trybeer;

create table products (
id int primary key auto_increment,
name varchar(100) not null,
price double not null,
volume int not null,
urlImage varchar(100) not null
) engine=InnoDB;

create table users (
id int primary key auto_increment,
name varchar(100) not null,
email varchar(100) not null,
password varchar(100) not null,
role varchar(100) not null
) engine=InnoDB;

create table orders (
id int primary key auto_increment,
user_id int,
order_date VARCHAR(100),
total_price double,
address VARCHAR(100) not null,
number int not null,
status VARCHAR(100) not null,
FOREIGN KEY (user_id) REFERENCES users(id)
) engine=InnoDB;

create table orders_products (
order_id int NOT NULL,
product_id int NOT NULL,
quantity int NOT NULL,
PRIMARY KEY (product_id, order_id),
FOREIGN KEY (product_id) REFERENCES products(id),
FOREIGN KEY (order_id) REFERENCES orders(id)
) engine=InnoDB;

insert into users (name, email, password, role) value
('tryber','tryber@gmail.com','$2b$10$CPevlz8ORnQsSH9ol.IjyuwJ2mggav3NYmzNuEeBvUBYif60Ecohm','admin');

insert into products (name, price, volume, urlImage) value
('Skol Lata', 2.20, 250,'http://localhost:3001/images/1.png'),
('Heineken', 7.50, 600, 'http://localhost:3001/images/2.png'),
('Antarctica Pilsen',2.49, 300, 'http://localhost:3001/images/3.jpeg'),
('Brahma', 7.50, 600, 'http://localhost:3001/images/4.png'),
('Skol', 2.19, 219, 'http://localhost:3001/images/5.jpg'),
('Skol Beats Senses', 4.49, 313, 'http://localhost:3001/images/6.jpg'),
('Becks', 4.99, 330, 'http://localhost:3001/images/7.png'),
('Brahma Duplo Malte', 2.79, 350, 'http://localhost:3001/images/8.jpg'),
('Becks', 8.89, 600, 'http://localhost:3001/images/9.png'),
('Skol Beats Senses', 3.57, 269, 'http://localhost:3001/images/10.jpg'),
('Stella Artoi s', 3.49, 275, 'http://localhost:3001/images/11.png');
