/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ cinema /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE cinema;

DROP TABLE IF EXISTS account;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(500) NOT NULL,
  `type` enum('Admin','Mod','User') DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`id`) REFERENCES `person` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS film;
CREATE TABLE `film` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `director` varchar(70) NOT NULL,
  `genre` enum('Comedy','Drama','Horror','Thriller','Biographical','Fantasy','SciFi','Documentary') DEFAULT NULL,
  `release_year` year NOT NULL,
  `duration` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS order;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_account` int NOT NULL,
  `date` date NOT NULL,
  `is_paid` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_account` (`id_account`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS person;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `second_name` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS room;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `seats_number` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS screening;
CREATE TABLE `screening` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_film` int NOT NULL,
  `id_room` int NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_film` (`id_film`),
  KEY `id_room` (`id_room`),
  CONSTRAINT `screening_ibfk_1` FOREIGN KEY (`id_film`) REFERENCES `film` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `screening_ibfk_2` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS seat;
CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `row` enum('A','B','C','D','E','F','G','H','I','J') NOT NULL,
  `num` enum('1','2','3','4','5','6','7','8','9','10','11','12') NOT NULL,
  `id_room` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_room` (`id_room`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS ticket;
CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `id_screening` int NOT NULL,
  `id_seat` int NOT NULL,
  `kind` enum('normal','half-price') NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_order` (`id_order`),
  KEY `id_screening` (`id_screening`),
  KEY `id_seat` (`id_seat`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`id_screening`) REFERENCES `screening` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`id_seat`) REFERENCES `seat` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE OR REPLACE VIEW `admin_all_seats` AS select `seat`.`row` AS `row`,`seat`.`num` AS `num` from `seat` where (`seat`.`id_room` = '1');

CREATE OR REPLACE VIEW `user_all_avaiable_seats` AS select `seat`.`row` AS `row`,`seat`.`num` AS `num` from (`seat` left join `ticket` on(((`seat`.`id` = `ticket`.`id_seat`) and (`ticket`.`id_screening` = 1)))) where (`ticket`.`id_seat` is null);

CREATE OR REPLACE VIEW `user_all_screenings` AS select `film`.`title` AS `title`,`room`.`name` AS `name`,`screening`.`date` AS `date`,`screening`.`time` AS `time` from ((`screening` join `film` on((`screening`.`id_film` = `film`.`id`))) join `room` on((`screening`.`id_room` = `room`.`id`)));

CREATE OR REPLACE VIEW `admin_all_accounts` AS select `person`.`first_name` AS `first_name`,`person`.`second_name` AS `second_name`,`person`.`birth_date` AS `birth_date`,`person`.`email` AS `email`,`account`.`username` AS `username`,`account`.`type` AS `type` from (`person` join `account` on((`person`.`id` = `account`.`id`)));

CREATE OR REPLACE VIEW `user_all_tickets` AS select `film`.`title` AS `title`,`room`.`name` AS `name`,`seat`.`row` AS `row`,`seat`.`num` AS `num`,`screening`.`date` AS `date`,`screening`.`time` AS `time`,`ticket`.`kind` AS `kind`,`ticket`.`price` AS `price` from (((((`ticket` join `order` on((`ticket`.`id_order` = `order`.`id`))) join `screening` on((`ticket`.`id_screening` = `screening`.`id`))) join `seat` on((`ticket`.`id_seat` = `seat`.`id`))) join `room` on((`screening`.`id_room` = `room`.`id`))) join `film` on((`screening`.`id_film` = `film`.`id`))) where (`order`.`id_account` = 4);

CREATE OR REPLACE VIEW `new` AS select `seat`.`row` AS `row`,`seat`.`num` AS `num` from (`seat` left join `ticket` on(((`seat`.`id` = `ticket`.`id_seat`) and (`ticket`.`id_screening` = 5)))) where (`ticket`.`id_seat` is null);