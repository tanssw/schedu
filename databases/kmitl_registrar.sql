-- -------------------------------------------------------------
-- TablePlus 4.5.0(396)
--
-- https://tableplus.com/
--
-- Database: schedu
-- Generation Time: 2564-11-05 15:27:10.7350
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
  `subject_id` int(11) NOT NULL,
  PRIMARY KEY (`student_id`,`section_id`,`subject_id`),
  KEY `section_id` (`section_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `registrar_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `section` (
  `section_id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) NOT NULL,
  `study_start` time DEFAULT NULL,
  `study_end` time DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`section_id`,`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=604 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62070188 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `subject` (
  `subject_id` int(11) NOT NULL AUTO_INCREMENT,
  `title_th` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `minor` varchar(255) DEFAULT NULL,
  `mid_exam` date DEFAULT NULL,
  `mid_end` time DEFAULT NULL,
  `mid_start` time DEFAULT NULL,
  `final_exam` date DEFAULT NULL,
  `final_end` time DEFAULT NULL,
  `final_start` time DEFAULT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=90304005 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `subject_teacher` (
  `subject_id` int(11) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

INSERT INTO `registrar` (`student_id`, `section_id`, `subject_id`) VALUES
(62070074, 1, 6016309),
(62070074, 1, 6016324),
(62070074, 1, 6016325),
(62070074, 2, 6016310),
(62070074, 2, 6016323),
(62070074, 601, 90304004),
(62070077, 1, 6016310),
(62070077, 2, 6016309),
(62070077, 2, 6016323),
(62070077, 2, 6016324),
(62070077, 2, 6016325),
(62070077, 602, 90304004),
(62070101, 1, 6016309),
(62070101, 1, 6016325),
(62070101, 2, 6016310),
(62070101, 2, 6016323),
(62070101, 2, 6016324),
(62070101, 602, 90304004),
(62070184, 1, 6016309),
(62070184, 1, 6016333),
(62070184, 1, 6016334),
(62070184, 1, 6016335),
(62070184, 2, 6016310),
(62070184, 603, 90304004);

INSERT INTO `section` (`section_id`, `subject_id`, `study_start`, `study_end`, `day`) VALUES
(1, 6016309, '08:45:00', '11:45:00', 'F'),
(1, 6016310, '08:45:00', '11:45:00', 'F'),
(1, 6016323, '08:45:00', '10:45:00', 'W'),
(1, 6016324, '08:45:00', '11:45:00', 'M'),
(1, 6016325, '08:45:00', '10:45:00', 'T'),
(1, 6016333, '13:00:00', '15:00:00', 'M'),
(1, 6016334, '09:00:00', '12:00:00', 'R'),
(1, 6016335, '13:30:00', '15:30:00', 'T'),
(1, 6016343, '08:45:00', '11:45:00', 'W'),
(1, 6016345, '08:45:00', '10:45:00', 'M'),
(1, 6026118, '08:45:00', '11:45:00', 'W'),
(1, 6026119, '16:00:00', '19:00:00', 'F'),
(1, 6026120, '13:00:00', '15:00:00', 'T'),
(1, 6026121, '13:00:00', '15:00:00', 'W'),
(1, 6026122, '13:00:00', '15:00:00', 'M'),
(2, 6016309, '13:00:00', '16:00:00', 'F'),
(2, 6016310, '13:00:00', '11:45:00', 'F'),
(2, 6016323, '13:30:00', '15:30:00', 'W'),
(2, 6016324, '13:00:00', '16:00:00', 'M'),
(2, 6016325, '13:30:00', '15:30:00', 'T'),
(2, 6016333, '15:00:00', '17:00:00', 'M'),
(2, 6016335, '15:30:00', '17:30:00', 'T'),
(2, 6016343, '13:00:00', '16:00:00', 'W'),
(2, 6016345, '13:30:00', '15:30:00', 'M'),
(2, 6026120, '15:00:00', '17:00:00', 'T'),
(2, 6026121, '15:00:00', '17:00:00', 'W'),
(2, 6026122, '15:00:00', '17:00:00', 'M'),
(3, 6016309, '16:00:00', '16:00:00', 'F'),
(3, 6016323, '10:45:00', '12:45:00', 'W'),
(3, 6016325, '10:45:00', '12:45:00', 'T'),
(3, 6016345, '10:45:00', '12:45:00', 'M'),
(4, 6016323, '15:30:00', '17:30:00', 'W'),
(4, 6016325, '15:30:00', '17:30:00', 'T'),
(4, 6016345, '15:30:00', '17:30:00', 'M'),
(601, 90304004, '09:00:00', '12:00:00', 'R'),
(602, 90304004, '13:00:00', '16:00:00', 'R'),
(603, 90304004, '13:00:00', '16:00:00', 'R');

INSERT INTO `student` (`student_id`, `year`, `first_name`, `last_name`) VALUES
(62070074, 3, 'Tasanai', 'Srisawat'),
(62070077, 3, 'Thanakan', 'Boonma'),
(62070101, 3, 'Nopphadon', 'Phanwong'),
(62070184, 3, 'Supakit', 'Khawmeewong');

INSERT INTO `subject` (`subject_id`, `title_th`, `title_en`, `year`, `semester`, `plan`, `major`, `minor`, `mid_exam`, `mid_end`, `mid_start`, `final_exam`, `final_end`, `final_start`) VALUES
(6016300, 'วิชาเลือกทางเทคโนโลยีสารสนเทศ 1', 'Elective Course in Information Technology 1', 3, 2, NULL, 'IT', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6016307, 'การบริหารโครงการเทคโนโลยีสารสนเทศ', 'Information Technology Project Management', 3, 2, NULL, 'IT', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6016309, 'ความมั่นคงของระบบสารสนเทศและกฏหมายไอที', 'Information System Security and IT Laws', 3, 1, NULL, 'IT', NULL, '2021-09-30', '13:30:00', '16:30:00', '2021-12-02', '13:30:00', '16:30:00'),
(6016310, 'การออกแบบส่วนต่อประสานกับมนุษย์', 'Human Interface Design', 3, 1, NULL, 'IT', NULL, '2021-09-28', '09:30:00', '12:30:00', '2021-12-02', '13:30:00', '16:30:00'),
(6016318, 'สัมมนาทางด้านทักษะการสื่อสารในวิชาชีพ', 'Seminar on Professional Communication Skills', 3, 2, NULL, 'IT', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6016323, 'การโปรแกรมอุปกรณ์เคลื่อนที่', 'Mobile Device Programming', 3, 1, NULL, 'IT', 'SE', '2021-09-27', '13:30:00', '16:30:00', '2021-11-29', '13:30:00', '16:30:00'),
(6016324, 'วิศวกรรมความต้องการ', 'Requirement Engineering', 3, 1, NULL, 'IT', 'SE', '2021-09-29', '13:30:00', '16:30:00', '2021-12-09', '09:30:00', '12:30:00'),
(6016325, 'การโปรแกรมเชิงบริการ', 'Service-Oriented Programming', 3, 1, NULL, 'IT', 'SE', '2021-09-28', '13:30:00', '16:30:00', '2021-12-13', '13:30:00', '16:30:00'),
(6016326, 'การทวนสอบและตรวจสอบซอฟต์แวร์', 'Software Verification and Validation', 3, 2, NULL, 'IT', 'SE', NULL, NULL, NULL, NULL, NULL, NULL),
(6016327, 'การพัฒนาคลาวด์แอปพลิเคชันระดับองค์กร', 'Cloud-Based Enterprise Application Development', 3, 2, NULL, 'IT', 'SE', NULL, NULL, NULL, NULL, NULL, NULL),
(6016328, 'เครื่องมือและสภาพแวดล้อมสำหรับการพัฒนาซอฟต์แวร์', 'Software Development Tools and Environments', 3, 2, NULL, 'IT', 'SE', NULL, NULL, NULL, NULL, NULL, NULL),
(6016333, 'เทคโนโลยีการให้บริการอินเตอร์เน็ต', 'Internet Service Technology', 3, 1, NULL, 'IT', 'NW', '2021-09-27', '13:30:00', '16:30:00', '2021-11-29', '13:30:00', '16:30:00'),
(6016334, 'เทคโนโลยีเครือข่ายไร้สาย', 'Wireless Network Technology', 3, 1, NULL, 'IT', 'NW', '2021-09-29', '13:30:00', '16:30:00', '2021-12-09', '09:30:00', '12:30:00'),
(6016335, 'เทคโนโลยีกลุ่มเมฆเบื้องต้น', 'Introduction to cloud computing', 3, 1, NULL, 'IT', 'NW', '2021-10-01', '13:30:00', '16:30:00', '2021-12-13', '09:30:00', '12:30:00'),
(6016336, 'การจัดการเครือข่ายและโครงสร้างพื้นฐานเทคโนโลยีสารสนเทศ', 'Network and Information Technology Infrastructure Management', 3, 2, NULL, 'IT', 'NW', NULL, NULL, NULL, NULL, NULL, NULL),
(6016337, 'ประสิทธิภาพเครือข่าย', 'Network Performance', 3, 2, NULL, 'IT', 'NW', NULL, NULL, NULL, NULL, NULL, NULL),
(6016338, 'การออกแบบระบบเครือข่ายเบื้องต้น', 'Introduction to Network Design', 3, 2, NULL, 'IT', 'NW', NULL, NULL, NULL, NULL, NULL, NULL),
(6016343, 'การออกแบบและพัฒนาเกม', 'Game Design and Development', 3, 1, NULL, 'IT', 'MG', '2021-09-27', '13:30:00', '16:30:00', '2021-11-29', '13:30:00', '16:30:00'),
(6016344, 'หลักการออกแบบกราฟิกส์', 'Graphics Design Principles', 3, 1, NULL, 'IT', 'MG', NULL, NULL, NULL, NULL, NULL, NULL),
(6016345, 'คอมพิวเตอร์แอนิเมชันสามมิติ', '3D Computer Animation', 3, 1, NULL, 'IT', 'MG', '2021-10-01', '13:30:00', '16:30:00', '2021-12-13', '09:30:00', '12:30:00'),
(6016346, 'การออกแบบและพัฒนาเว็บ', 'Web Design and Development', 3, 2, NULL, 'IT', 'MG', NULL, NULL, NULL, NULL, NULL, NULL),
(6016347, 'พื้นฐานการเล่าเรื่องและถ่ายภาพยนตร์ดิจิทัล', 'Fundamentals of digital storytelling and cinematography', 3, 2, NULL, 'IT', 'MG', NULL, NULL, NULL, NULL, NULL, NULL),
(6016348, 'การพัฒนาเกมขั้นสูง', 'Advanced Game Development', 3, 2, NULL, 'IT', 'MG', NULL, NULL, NULL, NULL, NULL, NULL),
(6026100, 'หัวข้อพิเศษวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ 1', 'Selected Topic in Data Science and Business Analytics 1', 3, 2, NULL, 'DSBA', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6026118, 'การบริหารโครงการเทคโนโลยีสารสนเทศ', 'Information Technology Project Management', 3, 1, NULL, 'DSBA', NULL, '2021-10-02', '16:30:00', '13:30:00', '2021-12-07', '16:30:00', '13:30:00'),
(6026119, 'ความมั่นคงของระบบสารสนเทศและกฎหมายไอที', 'Information Technology Security and IT Laws', 3, 1, NULL, 'DSBA', NULL, '2021-09-30', '16:30:00', '13:30:00', '2021-12-02', '16:30:00', '13:30:00'),
(6026120, 'การสร้างคลังข้อมูล', 'Data Warehousing', 3, 1, NULL, 'DSBA', NULL, '2021-10-01', '16:30:00', '13:30:00', '2021-12-03', '16:30:00', '13:30:00'),
(6026121, 'การทำเหมืองข้อมูลและการวิเคราะห์ข้อมูลขนาดใหญ่', 'Data Mining and Big Data Analytics', 3, 1, NULL, 'DSBA', NULL, '2021-09-27', '16:30:00', '13:30:00', '2021-12-08', '16:30:00', '13:30:00'),
(6026122, 'วิทยาการข้อมูลสำหรับธุรกิจ', 'Data Science for Business', 3, 1, NULL, 'DSBA', NULL, '2021-09-30', '09:30:00', '12:30:00', '2021-12-09', '09:30:00', '12:30:00'),
(6026123, 'สัมมนาทางด้านทักษะการสื่อสารในวิชาชีพ', 'Seminar on Professional Communication Skills', 3, 2, NULL, 'DSBA', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6026124, 'การแสดงข้อมูลด้วยแผนภาพ', 'Data Visualization', 3, 2, NULL, 'DSBA', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6026125, 'การเรียนรู้ของเครื่องจักร', 'Machine Learning', 3, 2, NULL, 'DSBA', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6026126, 'การบริหารเชิงกลยุทธ์และสมรรถะของธุรกิจ', 'Business Strategic and Performance Management', 3, 2, NULL, 'DSBA', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6026127, 'โครงงานวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ 1', 'Project in Data Science and Business Analytics 1', 3, 2, NULL, 'DSBA', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6026129, 'ฝึกวิชาชีพวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ', 'Data Science and Business Analytics Professional Practices', 3, 2, NULL, 'DSBA', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(90304004, 'การเขียนรายงาน', 'Report Writing', 3, 1, NULL, 'IT,DSBA', NULL, '2021-09-29', '09:30:00', '11:30:00', NULL, NULL, NULL);

INSERT INTO `subject_teacher` (`subject_id`, `teacher_id`) VALUES
(6016309, 1),
(6016309, 2),
(6016310, 3),
(6016323, 4),
(6016323, 5),
(6016324, 6),
(6016325, 7),
(6016325, 8),
(6016333, 9),
(6016334, 10),
(6016335, 11),
(6016343, 12),
(6016345, 13),
(6016345, 14),
(6026118, 15),
(6026119, 1),
(6026119, 2),
(6026120, 16),
(6026121, 16),
(6026122, 17);

INSERT INTO `teacher` (`teacher_id`, `first_name`, `last_name`) VALUES
(1, 'ผศ.ดร.สุเมธ', 'ประภาวัต'),
(2, 'ดร.ประพันธ์', 'ปวรางกูร'),
(3, 'รศ. ดร.นพพร', 'โชติกกำธร'),
(4, 'ดร.พัฒนพงษ์', 'ฉันทมิตรโอภาส'),
(5, 'ดร.สุพัณณดา', 'โชติพันธ์'),
(6, 'ผศ.ดร.บุญประเสริฐ', 'สุรักษ์รัตนสกุล'),
(7, 'ผศ.ดร.ธราวิเชษฐ์', 'ธิติจรูญโรจน์'),
(8, 'อ.สัญชัย', 'น้อยจันทร์'),
(9, 'ผศ.อัครินทร์', 'คุณกิตติ'),
(10, 'ผศ.ดร.โอฬาร', 'วงศ์วิรัตน์'),
(11, 'ผศ.ดร.ลภัส', 'ประดิษฐ์ทัศนีย์'),
(12, 'ดร.สามารถ', 'หมุดและ'),
(13, 'อ.พีระพงศ์', 'ตระกูลแพทย์'),
(14, 'ผศ.ดร.สิริอร', 'วิทยากร'),
(15, 'ผศ.ดร.บัณฑิต', 'ฐานะโสภณ'),
(16, 'รศ.ดร.วรพจน์', 'กรีสุระเดช'),
(17, 'รศ.ดร.ธีรพงศ์', 'ลีลานุภาพ');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;