DROP DATABASE IF EXISTS shelter_db;

CREATE DATABASE shelter_db;

USE shelter_db;

CREATE TABLE pets(
	id INT NOT NULL AUTO_INCREMENT,
	pet_name VARCHAR(255) NOT NULL,
	pet_type VARCHAR(255) NOT NULL,
	breed VARCHAR(255),
    age INT NOT NULL,
    sex VARCHAR(10) NOT NULL,
    pet_weight INT NOT NULL,
    color VARCHAR(255) NOT NULL,
	pet_bio TEXT NOT NULL,
    adopted BOOLEAN NOT NULL,
    img_url VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users(
	id INT AUTO_INCREMENT NOT NULL,
	username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    home_address VARCHAR(255),
	pswd VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE adopted_pets(
	id INT AUTO_INCREMENT NOT NULL,
	adopted_pet_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (adopted_pet_id) REFERENCES pets(id)
);

CREATE TABLE adopted_users(
	id INT AUTO_INCREMENT NOT NULL,
	adopted_user_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (adopted_user_id) REFERENCES adopted_pets(id)
);


CREATE TABLE shelter_blogs(
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR(255) NOT NULL, 
	post_time DATE NOT NULL,
	shelter_post TEXT, 
	post_img_url VARCHAR(255), 
	PRIMARY KEY (id)
);

CREATE TABLE blogs(
	id INT AUTO_INCREMENT NOT NULL,
	post_id INT NOT NULL,
	user_post TEXT,  
	user_post_date DATE NOT NULL,
	user_img_url VARCHAR(255),
	PRIMARY KEY (id),
	FOREIGN KEY (post_id) REFERENCES users(id)
);



