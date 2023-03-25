/*
 Navicat Premium Data Transfer

 Source Server         : unspman
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : player

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 25/03/2023 21:21:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isDelete` bit(1) NULL DEFAULT (0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '叶兰', '$2a$10$UqGJNqud/Z12MaidUr.n6eS1dC.FWi9EV1b1gPFUOvIJ83i.dAcpm', b'0');
INSERT INTO `user` VALUES (2, '张飞', '$2a$10$Olr6Tf8HBRw8jfL2B.JPQeRbO7HqcegeI0QlX2yJ4dTLmkyPV.WjO', b'0');
INSERT INTO `user` VALUES (3, '廖忠', '$2a$10$suDSSf9Xrc7Lx0dY8X4TD.bxEjykuziVcu8pZhctoSmZSOp4XLn0G', b'0');
INSERT INTO `user` VALUES (4, '李淳罡', '$2a$10$/8Z8aGeUudyH8Fk9zABx5OkeqpF.n3pYySxwYyyQcuvQG3bLAge1S', b'0');
INSERT INTO `user` VALUES (5, 'liaojie', '$2a$10$nvxB7x14naFXBKpZEOywUOPM6F/nRZ3V.zH2E0xEoRstzcAIzpFSe', b'0');
INSERT INTO `user` VALUES (6, '巴啦啦', '$2a$10$ZbErJpYlhr8U1TKJwGqKveoqqBCg8.RvgVmLhjO6x/JLoaJD68//C', b'0');

SET FOREIGN_KEY_CHECKS = 1;
