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

 Date: 24/04/2023 15:46:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment_like
-- ----------------------------
DROP TABLE IF EXISTS `comment_like`;
CREATE TABLE `comment_like`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NULL DEFAULT NULL,
  `comment_id` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment_like
-- ----------------------------
INSERT INTO `comment_like` VALUES (2, 1, 6);
INSERT INTO `comment_like` VALUES (3, 1, 7);
INSERT INTO `comment_like` VALUES (4, 2, 1);
INSERT INTO `comment_like` VALUES (5, 3, 2);
INSERT INTO `comment_like` VALUES (6, 4, 3);
INSERT INTO `comment_like` VALUES (7, 5, 4);
INSERT INTO `comment_like` VALUES (8, 6, 5);
INSERT INTO `comment_like` VALUES (9, 7, 8);
INSERT INTO `comment_like` VALUES (10, 8, 9);
INSERT INTO `comment_like` VALUES (11, 8, 10);
INSERT INTO `comment_like` VALUES (28, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
