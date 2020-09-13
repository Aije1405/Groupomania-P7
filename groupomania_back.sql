-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `userId` smallint NOT NULL,
  `content` text NOT NULL,
  `attachement` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`userId`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (16,2,'Message test 2',NULL,'2020-09-09 07:12:00','2020-09-09 07:12:10'),(19,2,'Bonjour, je m\'appelle Julie et je travaille aux RH. J\'adore les chats.\nBelle journée !','http://localhost:3000/images/chat.jpeg1600012548038.jpeg','2020-09-13 15:55:48','2020-09-13 15:55:48'),(20,9,'Quelle course folle de Formule 1 à Monza ! Salut je suis Xavier et je travaille au service Marketing. Comme vous pouvez le voir je suis fan de sports mécaniques.','http://localhost:3000/images/F1Monza.jpg1600012972170.jpeg','2020-09-13 16:02:52','2020-09-13 16:02:52'),(21,9,'Il y a des chocolats et des biscuits au service Marketing, passez nous voir !',NULL,'2020-09-13 16:03:53','2020-09-13 16:03:53'),(22,3,'Bonjour et bienvenue sur votre réseau social GROUPOMANIA !\nVoici une super occasion pour nous de nous \"rencontrer\" virtuellement et de partager notre quotidien.\nQuelques règles du jeu: restons courtois, amusons-nous et respectons les opinions de chacun. Nous nous réservons le droit de supprimer tout message qui ne correspondrait pas au réglement intérieur.\nA vos claviers !\nL\'administrateur :-)',NULL,'2020-09-13 16:07:43','2020-09-13 16:07:43'),(23,4,'Trop bon les chocolats du service Marketing ;-)','http://localhost:3000/images/chocolats.jpeg1600013400731.jpeg','2020-09-13 16:10:00','2020-09-13 16:10:00'),(24,7,'Coucou à tous, je m\'appelle Liliane et je suis au service comptable. Je m\'occupe de la paie et des déclarations sociales donc soyez sympas avec moi LOL !',NULL,'2020-09-13 16:11:38','2020-09-13 16:11:38'),(25,8,'Hello moi c\'est Dylan mais tout le monde m\'appelle Dydy. Je viens de rejoindre les équipes de Maintenance.\nRavi de rencontrer tout le monde pendant ces premiers jours. Merci pour l\'accueil ! ',NULL,'2020-09-13 16:13:42','2020-09-13 16:13:42');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` date NOT NULL,
  `username` varchar(255) NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'julie@groupomania.com','$2b$10$qmSkqBcdYZY/WQP.Uh6DXesH5HJRV/r.1pz4dtguog9wN0gCNcLMK',0,'2020-09-07','julie','2020-09-07'),(3,'admin@groupomania.com','$2b$10$2wEE0FrY76h27cOunDtxc.my0XpDEKvpMi0paR9bhTmsHPhok/TKe',1,'2020-09-08','adminGroup','2020-09-08'),(4,'anne@groupomania.com','$2b$10$ut.Jo4uABT4Bb.PIV96re.JUvDyOB8.S3cdwJGYTLhUGtHcSMBvi6',0,'2020-09-08','anne','2020-09-08'),(7,'liliane@groupomania.com','$2b$10$SjpspSfxL1pNyp3nFmz.S.6dxOuC.L3UPeVM7qX9c3sj7xr/Jh1US',0,'2020-09-12','Lilirose','2020-09-12'),(8,'dylan@groupomania.com','$2b$10$GaUPWE7xDQDNpUD1fuCjouIyYIGI4TWF.Mhxt4VcHrSGTEoq0CykO',0,'2020-09-12','Dydy','2020-09-12'),(9,'xavier@groupomania.com','$2b$10$1vnVe8QgKS9yDG/1k0aqZeGG8KZFX8y2JcwEwNYcnmyknNMPLz.Pm',0,'2020-09-13','xavier','2020-09-13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-13 18:29:22
