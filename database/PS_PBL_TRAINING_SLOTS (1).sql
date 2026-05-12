-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: ps_pbl_training_slots
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `all_groups`
--

DROP TABLE IF EXISTS `all_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_groups` (
  `group_id` bigint NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL,
  `group_type` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_groups`
--

LOCK TABLES `all_groups` WRITE;
/*!40000 ALTER TABLE `all_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `all_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendance_id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` bigint NOT NULL,
  `student_id` bigint NOT NULL,
  `attendance_status` enum('PRESENT','ABSENT') NOT NULL,
  `remarks` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`attendance_id`),
  UNIQUE KEY `booking_id` (`booking_id`),
  KEY `idx_attendance_student` (`student_id`),
  KEY `idx_attendance_status` (`attendance_status`),
  CONSTRAINT `fk_att_booking` FOREIGN KEY (`booking_id`) REFERENCES `student_booking` (`booking_id`),
  CONSTRAINT `fk_att_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `end_survey`
--

DROP TABLE IF EXISTS `end_survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `end_survey` (
  `survey_id` bigint NOT NULL AUTO_INCREMENT,
  `faculty_id` bigint NOT NULL,
  `student_id` bigint NOT NULL,
  `survey_question_id` bigint NOT NULL,
  `student_response` text NOT NULL,
  `is_caption_verified` tinyint DEFAULT '0',
  `is_incharge_verified` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`survey_id`),
  KEY `idx_es_faculty` (`faculty_id`),
  KEY `idx_es_student` (`student_id`),
  KEY `idx_es_question` (`survey_question_id`),
  CONSTRAINT `fk_es_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`faculty_id`),
  CONSTRAINT `fk_es_question` FOREIGN KEY (`survey_question_id`) REFERENCES `end_survey_questions` (`survey_question_id`),
  CONSTRAINT `fk_es_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `end_survey`
--

LOCK TABLES `end_survey` WRITE;
/*!40000 ALTER TABLE `end_survey` DISABLE KEYS */;
/*!40000 ALTER TABLE `end_survey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `end_survey_questions`
--

DROP TABLE IF EXISTS `end_survey_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `end_survey_questions` (
  `survey_question_id` bigint NOT NULL AUTO_INCREMENT,
  `group_role_id` bigint NOT NULL,
  `question` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`survey_question_id`),
  KEY `idx_esq_role` (`group_role_id`),
  KEY `idx_question_id` (`survey_question_id`),
  CONSTRAINT `fk_esq_role` FOREIGN KEY (`group_role_id`) REFERENCES `group_roles` (`group_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `end_survey_questions`
--

LOCK TABLES `end_survey_questions` WRITE;
/*!40000 ALTER TABLE `end_survey_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `end_survey_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculties`
--

DROP TABLE IF EXISTS `faculties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculties` (
  `faculty_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `reg_num` varchar(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`faculty_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `reg_num` (`reg_num`),
  KEY `idx_faculty_user` (`user_id`),
  KEY `idx_faculty_reg_num` (`reg_num`),
  CONSTRAINT `fk_faculty_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculties`
--

LOCK TABLES `faculties` WRITE;
/*!40000 ALTER TABLE `faculties` DISABLE KEYS */;
/*!40000 ALTER TABLE `faculties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_members`
--

DROP TABLE IF EXISTS `group_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_members` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` bigint NOT NULL,
  `student_id` bigint NOT NULL,
  `group_role_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `group_id` (`group_id`,`student_id`),
  KEY `idx_group_members_group` (`group_id`),
  KEY `idx_group_members_student` (`student_id`),
  KEY `fk_gm_role` (`group_role_id`),
  CONSTRAINT `fk_gm_group` FOREIGN KEY (`group_id`) REFERENCES `all_groups` (`group_id`),
  CONSTRAINT `fk_gm_role` FOREIGN KEY (`group_role_id`) REFERENCES `group_roles` (`group_role_id`),
  CONSTRAINT `fk_gm_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_members`
--

LOCK TABLES `group_members` WRITE;
/*!40000 ALTER TABLE `group_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_roles`
--

DROP TABLE IF EXISTS `group_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_roles` (
  `group_role_id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_roles`
--

LOCK TABLES `group_roles` WRITE;
/*!40000 ALTER TABLE `group_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `point_transactions`
--

DROP TABLE IF EXISTS `point_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point_transactions` (
  `transaction_id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `point_type` enum('REWARD_POINTS','ACTIVITY_POINTS') NOT NULL,
  `point_source` varchar(255) NOT NULL,
  `points_earned` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  KEY `idx_pt_student` (`student_id`),
  KEY `idx_pt_type` (`point_type`),
  CONSTRAINT `fk_pt_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point_transactions`
--

LOCK TABLES `point_transactions` WRITE;
/*!40000 ALTER TABLE `point_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `point_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `points`
--

DROP TABLE IF EXISTS `points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `points` (
  `point_id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `point_type` enum('REWARD_POINTS','ACTIVITY_POINTS') NOT NULL,
  `points_available` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`point_id`),
  UNIQUE KEY `student_id` (`student_id`,`point_type`),
  KEY `idx_points_student` (`student_id`),
  KEY `idx_points_type` (`point_type`),
  CONSTRAINT `fk_points_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points`
--

LOCK TABLES `points` WRITE;
/*!40000 ALTER TABLE `points` DISABLE KEYS */;
/*!40000 ALTER TABLE `points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professional_skills`
--

DROP TABLE IF EXISTS `professional_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professional_skills` (
  `skill_id` bigint NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professional_skills`
--

LOCK TABLES `professional_skills` WRITE;
/*!40000 ALTER TABLE `professional_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `professional_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_entities`
--

DROP TABLE IF EXISTS `role_entities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_entities` (
  `role_id` tinyint NOT NULL AUTO_INCREMENT,
  `role_name` enum('STUDENT','FACULTY','ADMIN') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_entities`
--

LOCK TABLES `role_entities` WRITE;
/*!40000 ALTER TABLE `role_entities` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_entities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_levels`
--

DROP TABLE IF EXISTS `skill_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_levels` (
  `level_id` bigint NOT NULL AUTO_INCREMENT,
  `training_skill_id` bigint NOT NULL,
  `level_number` int NOT NULL,
  `core_concept` varchar(255) DEFAULT NULL,
  `max_attempts` int DEFAULT NULL,
  PRIMARY KEY (`level_id`),
  KEY `idx_sl_skill` (`training_skill_id`),
  CONSTRAINT `fk_sl_skill` FOREIGN KEY (`training_skill_id`) REFERENCES `training_skills` (`training_skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_levels`
--

LOCK TABLES `skill_levels` WRITE;
/*!40000 ALTER TABLE `skill_levels` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_syllabus`
--

DROP TABLE IF EXISTS `skill_syllabus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_syllabus` (
  `syllabus_id` bigint NOT NULL AUTO_INCREMENT,
  `level_id` bigint NOT NULL,
  `order_index` int NOT NULL,
  `topic_title` varchar(255) NOT NULL,
  `topic_description` text,
  PRIMARY KEY (`syllabus_id`),
  KEY `idx_ss_level` (`level_id`),
  CONSTRAINT `fk_ss_level` FOREIGN KEY (`level_id`) REFERENCES `skill_levels` (`level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_syllabus`
--

LOCK TABLES `skill_syllabus` WRITE;
/*!40000 ALTER TABLE `skill_syllabus` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill_syllabus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slot_timings`
--

DROP TABLE IF EXISTS `slot_timings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slot_timings` (
  `slot_id` bigint NOT NULL AUTO_INCREMENT,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`slot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot_timings`
--

LOCK TABLES `slot_timings` WRITE;
/*!40000 ALTER TABLE `slot_timings` DISABLE KEYS */;
/*!40000 ALTER TABLE `slot_timings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_booking`
--

DROP TABLE IF EXISTS `student_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_booking` (
  `booking_id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `training_skill_id` bigint NOT NULL,
  `mapping_id` bigint NOT NULL,
  `slot_id` bigint NOT NULL,
  `booking_date` date NOT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED') NOT NULL,
  PRIMARY KEY (`booking_id`),
  UNIQUE KEY `student_id` (`student_id`,`slot_id`,`booking_date`),
  KEY `idx_booking_student` (`student_id`),
  KEY `idx_booking_slot_date` (`slot_id`,`booking_date`),
  KEY `idx_booking_mapping` (`mapping_id`),
  CONSTRAINT `fk_sb_mapping` FOREIGN KEY (`mapping_id`) REFERENCES `venue_mapping` (`mapping_id`),
  CONSTRAINT `fk_sb_slot` FOREIGN KEY (`slot_id`) REFERENCES `slot_timings` (`slot_id`),
  CONSTRAINT `fk_sb_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_booking`
--

LOCK TABLES `student_booking` WRITE;
/*!40000 ALTER TABLE `student_booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_skills`
--

DROP TABLE IF EXISTS `student_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_skills` (
  `student_skill_id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `skill_id` bigint NOT NULL,
  `skill_type` enum('PRIMARY','SECONDARY','SPECIFICATION') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_skill_id`),
  UNIQUE KEY `student_id` (`student_id`,`skill_id`),
  KEY `idx_ss_student` (`student_id`),
  KEY `idx_ss_skill` (`skill_id`),
  CONSTRAINT `fk_ss_skill` FOREIGN KEY (`skill_id`) REFERENCES `professional_skills` (`skill_id`),
  CONSTRAINT `fk_ss_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_skills`
--

LOCK TABLES `student_skills` WRITE;
/*!40000 ALTER TABLE `student_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `reg_num` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `year_of_study` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `reg_num` (`reg_num`),
  KEY `idx_students_user` (`user_id`),
  KEY `idx_students_reg` (`reg_num`),
  CONSTRAINT `fk_students_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_questions_category`
--

DROP TABLE IF EXISTS `survey_questions_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_questions_category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `survey_question_id` bigint NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  KEY `idx_sqc_question` (`survey_question_id`),
  CONSTRAINT `fk_sqc_question` FOREIGN KEY (`survey_question_id`) REFERENCES `end_survey_questions` (`survey_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_questions_category`
--

LOCK TABLES `survey_questions_category` WRITE;
/*!40000 ALTER TABLE `survey_questions_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `survey_questions_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_skills`
--

DROP TABLE IF EXISTS `training_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_skills` (
  `training_skill_id` bigint NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`training_skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_skills`
--

LOCK TABLES `training_skills` WRITE;
/*!40000 ALTER TABLE `training_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `training_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `role_id` tinyint NOT NULL,
  `email` varchar(255) NOT NULL,
  `refresh_hash` varchar(255) DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `last_login_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_role` (`role_id`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `role_entities` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue_mapping`
--

DROP TABLE IF EXISTS `venue_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venue_mapping` (
  `mapping_id` bigint NOT NULL AUTO_INCREMENT,
  `faculty_id` bigint NOT NULL,
  `venue_id` bigint NOT NULL,
  `training_skill_id` bigint NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `current_bookings` int DEFAULT '0',
  PRIMARY KEY (`mapping_id`),
  KEY `idx_vm_faculty` (`faculty_id`),
  KEY `idx_vm_venue` (`venue_id`),
  KEY `fk_vm_skill` (`training_skill_id`),
  CONSTRAINT `fk_vm_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`faculty_id`),
  CONSTRAINT `fk_vm_skill` FOREIGN KEY (`training_skill_id`) REFERENCES `training_skills` (`training_skill_id`),
  CONSTRAINT `fk_vm_venue` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`venue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue_mapping`
--

LOCK TABLES `venue_mapping` WRITE;
/*!40000 ALTER TABLE `venue_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `venue_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue_mapping_transfer_log`
--

DROP TABLE IF EXISTS `venue_mapping_transfer_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venue_mapping_transfer_log` (
  `transfer_id` bigint NOT NULL AUTO_INCREMENT,
  `from_faculty_id` bigint NOT NULL,
  `to_faculty_id` bigint NOT NULL,
  `venue_id` bigint NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `current_status` enum('PENDING','REJECTED','ACCEPTED') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transfer_id`),
  KEY `idx_vmt_from` (`from_faculty_id`),
  KEY `idx_vmt_to` (`to_faculty_id`),
  KEY `idx_vmt_venue` (`venue_id`),
  CONSTRAINT `fk_vmt_from` FOREIGN KEY (`from_faculty_id`) REFERENCES `faculties` (`faculty_id`),
  CONSTRAINT `fk_vmt_to` FOREIGN KEY (`to_faculty_id`) REFERENCES `faculties` (`faculty_id`),
  CONSTRAINT `fk_vmt_venue` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`venue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue_mapping_transfer_log`
--

LOCK TABLES `venue_mapping_transfer_log` WRITE;
/*!40000 ALTER TABLE `venue_mapping_transfer_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `venue_mapping_transfer_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venues`
--

DROP TABLE IF EXISTS `venues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venues` (
  `venue_id` bigint NOT NULL AUTO_INCREMENT,
  `venue_name` varchar(100) NOT NULL,
  `location` varchar(200) DEFAULT NULL,
  `capacity` int NOT NULL,
  `is_active` tinyint DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`venue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venues`
--

LOCK TABLES `venues` WRITE;
/*!40000 ALTER TABLE `venues` DISABLE KEYS */;
/*!40000 ALTER TABLE `venues` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-06 15:33:20
