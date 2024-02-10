-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: clubsite
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

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
-- Current Database: `clubsite`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `clubsite` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `clubsite`;


--
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club` (
  `club_id` int NOT NULL AUTO_INCREMENT,
  `club_name` varchar(20) NOT NULL,
  `club_desc` varchar(100) DEFAULT NULL,
  `founded_date` date DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `club_banner` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`club_id`),
  KEY `username` (`username`),
  CONSTRAINT `club_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
-- /*!40000 ALTER TABLE `club` DISABLE KEYS */;
-- INSERT INTO `club` VALUES (1,'testclub','this is my club','2023-04-20','user1', NULL),(2,'cars','we talk about cars','2023-05-21','user1', NULL),(3,'cats','cat appreciators','2023-03-12','ilovecats', NULL),(4,'test1','sdsfadasfdas','2023-06-03','samir', NULL),(5,'test2','dsafasdfsa','2023-06-03','samir', NULL),(6,'test3','asdfasfasd','2023-06-03','samir', NULL),(7,'test3','asdfasfasd','2023-06-03','samir', NULL),(8,'test4','asdfasdfasdf','2023-06-03','samir', NULL),(9,'test5','fgsdfgsdf','2023-06-03','samir', NULL),(10,'test6','asdfasdfasd','2023-06-03','samir', NULL),(11,'test7','adsfadsfasdf','2023-06-03','samir', NULL);
-- /*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(20) NOT NULL,
  `event_desc` varchar(100) DEFAULT NULL,
  `time_start` datetime DEFAULT NULL,
  `time_end` datetime DEFAULT NULL,
  `location` varchar(30) DEFAULT NULL,
  `club_id` int DEFAULT NULL,
  `event_banner` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
-- INSERT INTO `event` VALUES (1,'youtube event','event for youtube',NULL,NULL,'adelaide',1,'youtube.png'),(2,'discord event','event for discord',NULL,NULL,'melbourne',1,'discord.png'),(3,'twitch event','event for twitch',NULL,NULL,'sydney',1,'twitch.png'),(6,'test','dfasfasd','0000-00-00 00:00:00','0000-00-00 00:00:00','Adelaide',5,NULL),(7,'test','dasfasd','0000-00-00 00:00:00','0000-00-00 00:00:00','Adelaide',5,NULL),(8,'tset','fsdafasdf','0000-00-00 00:00:00','0000-00-00 00:00:00','Adelaide',5,NULL),(9,'test','fasdfasd','2023-06-06 21:52:00','2023-06-07 21:52:00','Adelaide',5,NULL),(10,'new','afasdf','2023-06-06 21:53:00','2023-06-07 21:58:00','Adelaide',5,NULL),(11,'test','asdfasd','2023-05-30 21:56:00','2023-06-14 21:56:00','asdfasdf',5,NULL),(12,'testse','asdfasdf','2023-06-14 22:00:00','2023-06-09 22:00:00','asfasdf',5,NULL),(13,'tes','tes','2023-06-15 22:11:00','2023-06-23 22:11:00','Adelaide',5,NULL),(14,'test','tst','2023-06-17 22:14:00','2023-06-07 22:14:00','asdfasdf',5,NULL),(15,'fasdf','asfasdfsda','2023-06-15 22:15:00','2023-06-30 22:15:00','sfasfasd',5,NULL),(16,'fasdf','asdfasdf','2023-06-08 22:15:00','2023-06-16 22:15:00','asdfasdf',5,NULL),(17,'tsetsasdfasdf','sadfasdf','2023-06-08 22:17:00','2023-06-23 22:17:00','Adelaide',5,NULL),(18,'test','asdfasdf','2023-06-17 22:22:00','2023-06-23 22:22:00','Adelaide',5,NULL),(19,'test','adfasdf','2023-06-15 22:23:00','2023-06-16 22:23:00','asfasd',5,NULL),(20,'test','fadsfasdf','2023-06-18 22:30:00','2023-06-29 22:30:00','asdfasdf',5,NULL),(21,'tset','asdfasdf','2023-06-09 22:31:00','2023-06-30 22:31:00','Adelaide',5,NULL),(22,'test','adfsdaf','2023-06-14 22:32:00','2023-06-30 22:32:00','asfasdf',5,NULL),(23,'tertsef','asfsdaf','2023-06-07 22:32:00','2023-06-23 22:32:00','asfasdf',5,NULL),(24,'asdfasdf','asdfsdaf','2023-06-15 22:45:00','2023-06-16 22:45:00','asdfsdaf',5,NULL),(25,'asdfasdf','fasdfasdf','2023-06-06 22:46:00','2023-06-23 22:46:00','asdfasdf',5,NULL),(26,'test','asdfasdf','2023-06-13 22:47:00','2023-06-28 22:47:00','asdfasdfas',5,NULL);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memberships`
--

DROP TABLE IF EXISTS `memberships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memberships` (
  `memberships_id` int NOT NULL AUTO_INCREMENT,
  `join_date` date DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `club_id` int DEFAULT NULL,
  PRIMARY KEY (`memberships_id`),
  KEY `username` (`username`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `memberships_ibfk_3` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `memberships_ibfk_4` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memberships`
--

LOCK TABLES `memberships` WRITE;
-- /*!40000 ALTER TABLE `memberships` DISABLE KEYS */;
-- INSERT INTO `memberships` VALUES (9,'2023-06-05','user1',5);
-- /*!40000 ALTER TABLE `memberships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_title` varchar(30) DEFAULT NULL,
  `post_body` varchar(100) DEFAULT NULL,
  `post_comments` int DEFAULT NULL,
  `post_date` datetime DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `club_id` int DEFAULT NULL,
  `visibility` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `username` (`username`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `post_ibfk_3` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `post_ibfk_4` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
-- /*!40000 ALTER TABLE `post` DISABLE KEYS */;
-- INSERT INTO `post` VALUES (8,'private post','test',NULL,'2023-06-05 13:27:39','samir',5,'private'),(9,'public post','test',NULL,'2023-06-05 13:27:48','samir',5,'public'),(10,'test','tes',NULL,'2023-06-06 12:38:44','samir',5,'public');
-- /*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rsvps`
--

DROP TABLE IF EXISTS `rsvps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rsvps` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `username` (`username`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `rsvps_ibfk_3` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  CONSTRAINT `rsvps_ibfk_4` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rsvps`
--

LOCK TABLES `rsvps` WRITE;
/*!40000 ALTER TABLE `rsvps` DISABLE KEYS */;
/*!40000 ALTER TABLE `rsvps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysadm`
--

DROP TABLE IF EXISTS `sysadm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sysadm` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `username` (`username`),
  CONSTRAINT `sysadm_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysadm`
--

LOCK TABLES `sysadm` WRITE;
/*!40000 ALTER TABLE `sysadm` DISABLE KEYS */;
INSERT INTO `sysadm` VALUES ('admin','password','2023-03-06');
/*!40000 ALTER TABLE `sysadm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
-- INSERT INTO `user` VALUES ('alex','test','password',NULL,NULL),('ilovecats','kitties@hotmail.com','cats','Jane','Cat'),('samir','tes','password',NULL,NULL),('user1','myemail@gmail.com','password','John','Doe'),('username','geemail@gmail.com','1234','Big','Mac');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-06 15:31:52





/*   ***** Below are the queries used on the database ******

SELECT * FROM memberships WHERE club_id=" + sanitizeHTML(id) + " AND username='" + usr + "'
INSERT INTO memberships (join_date, username, club_id, notification) VALUES ((SELECT CURRENT_TIMESTAMP),'" + usr + "'," + id + ", 1)
DELETE FROM memberships WHERE username='" + usr + "' AND club_id=" + id
SELECT * FROM club WHERE club_name LIKE '%" + sanitizeHTML(p) + "%'
SELECT * FROM event JOIN club ON event.club_id=club.club_id WHERE event_name LIKE '%" + sanitizeHTML(p) + "%'
SELECT club.club_name, club.club_id FROM memberships JOIN club ON memberships.club_id=club.club_id WHERE memberships.username='" + usr_id + "'
SELECT * FROM club WHERE username='" + usr_id + "'
SELECT club.club_id, event_id, event_name, event_desc, time_start, time_end, location, club.club_banner FROM memberships JOIN club ON memberships.club_id=club.club_id JOIN event ON event.club_id=club.club_id WHERE memberships.username='" + usr_id + "';
SELECT * FROM club WHERE club_id=" + sanitizeHTML(id)
SELECT * FROM user WHERE username = ? AND password = ?
SELECT * FROM user WHERE username = ?
INSERT INTO user (username, email, password) VALUES (?, ?, ?)
SELECT * FROM sysadm WHERE username = ? AND password = ?
SELECT * FROM sysadm WHERE username = ?
INSERT INTO sysadm (username, password, created_date) VALUES (?, ?, ?)
SELECT email FROM user WHERE username = ?
UPDATE user SET username = ?, password = ?, first_name = ?, last_name = ? WHERE email = ?
SELECT * FROM post WHERE club_id=" + sanitizeHTML(id)
INSERT INTO post (post_title, post_body, post_comments, post_date, username, club_id, visibility) VALUES ('" + sanitizeHTML(post[0].title) + "','" + sanitizeHTML(post[0].description) + "', NULL , (SELECT CURRENT_TIMESTAMP),'" + sanitizeHTML(u_id) + "'," + sanitizeHTML(c_id) + ",'" + sanitizeHTML(post[0].visibility) + "')
INSERT INTO post(memberships_id,user_id,) VALUES(?,?);
SELECT * FROM memberships JOIN user ON memberships.username=user.username WHERE club_id=" + sanitizeHTML(id)
SELECT * FROM event WHERE club_id=" + sanitizeHTML(id)
SELECT notification FROM memberships WHERE username='" + usr_id + "' AND club_id=" + sanitizeHTML(id)
UPDATE memberships SET notification=" + sanitizeHTML(ntf) + " WHERE username='" + usr_id + "' AND club_id=" + sanitizeHTML(id)
INSERT INTO rsvps(username, event_id) VALUES('" + usr + "'," + sanitizeHTML(id) + ")
DELETE FROM rsvps WHERE username='" + usr + "' AND event_id=" + sanitizeHTML(id)
SELECT * FROM rsvps WHERE username='" + usr + "' AND event_id=" + sanitizeHTML(id)
SELECT * FROM rsvps WHERE event_id=" + id
INSERT INTO event (event_name, event_desc, time_start, time_end, location, club_id, event_banner) VALUES ('" + sanitizeHTML(new_event_name) + "','" + sanitizeHTML(new_event_description) + "', CAST('" + sanitizeHTML(new_event_start_date3) + "' AS DATETIME), CAST('" + sanitizeHTML(new_event_end_date3) + "' AS DATETIME),'" + sanitizeHTML(new_event_location) + "','" + sanitizeHTML(id) + "', NULL)
SELECT * FROM rsvps JOIN event ON event.event_id=rsvps.event_id WHERE club_id="+id */



