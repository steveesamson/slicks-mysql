
CREATE DATABASE todo;

USE todo;

CREATE TABLE todu (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  task varchar(50) NOT NULL,
  status tinyint(1) NOT NULL DEFAULT '0',
  created_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  task_owner int(10) unsigned NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE task_owners (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB; 

GRANT ALL PRIVILEGES ON todo.* to 'tester'@localhost IDENTIFIED BY 'tester';
