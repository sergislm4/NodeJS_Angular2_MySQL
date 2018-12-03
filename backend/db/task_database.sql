CREATE DATABASE  IF NOT EXISTS `derButtonTask` 
USE `derButtonTask`;


--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `currency` varchar(45) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `user_id` varchar(500) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE VIEW getUser
AS  
SELECT  
    first_name
    , last_name  
    , email  
    , phone 
    , currency
    , avatar
    , user_id
FROM users;

-- This table will be used as a way to store an array of the selected sessions and it's prices

CREATE TABLE `sessions` (
  `session_id` varchar(500) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `minutes` varchar(50) NOT NULL,
  `price` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  FOREIGN KEY (`email`)
  REFERENCES users(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;