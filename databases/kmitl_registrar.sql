-- -------------------------------------------------------------
-- TablePlus 4.5.0(396)
--
-- https://tableplus.com/
--
-- Database: kmitl_registrar
-- Generation Time: 2564-10-27 21:51:15.8070
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `registrar` (
  `student_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  PRIMARY KEY (`student_id`,`section_id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `registrar_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `registrar_ibfk_10` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  CONSTRAINT `registrar_ibfk_11` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `registrar_ibfk_12` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  CONSTRAINT `registrar_ibfk_13` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `registrar_ibfk_14` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  CONSTRAINT `registrar_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  CONSTRAINT `registrar_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `registrar_ibfk_4` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  CONSTRAINT `registrar_ibfk_5` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `registrar_ibfk_6` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  CONSTRAINT `registrar_ibfk_7` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `registrar_ibfk_8` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  CONSTRAINT `registrar_ibfk_9` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `section` (
  `section_id` int(11) NOT NULL AUTO_INCREMENT,
  `study_at` time DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `subject` (
  `subject_id` int(11) NOT NULL AUTO_INCREMENT,
  `title_th` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `minor` varchar(255) DEFAULT NULL,
  `exam_at` datetime DEFAULT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `subject_teacher` (
  `subject_id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) NOT NULL,
  PRIMARY KEY (`subject_id`,`teacher_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `subject_teacher_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`),
  CONSTRAINT `subject_teacher_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `teacher` (
  `teacher_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;