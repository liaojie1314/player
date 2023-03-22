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

 Date: 22/03/2023 17:14:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for video_round
-- ----------------------------
DROP TABLE IF EXISTS `video_round`;
CREATE TABLE `video_round`  (
  `Date` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `video_id` int UNSIGNED NULL DEFAULT NULL,
  INDEX `fk_video_round_id`(`video_id` ASC) USING BTREE,
  CONSTRAINT `fk_video_round_id` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video_round
-- ----------------------------
INSERT INTO `video_round` VALUES ('周一', 3);
INSERT INTO `video_round` VALUES ('周一', 4);
INSERT INTO `video_round` VALUES ('周一', 5);
INSERT INTO `video_round` VALUES ('周一', 6);
INSERT INTO `video_round` VALUES ('周一', 7);
INSERT INTO `video_round` VALUES ('周一', 8);
INSERT INTO `video_round` VALUES ('周一', 9);
INSERT INTO `video_round` VALUES ('周一', 10);
INSERT INTO `video_round` VALUES ('周一', 11);
INSERT INTO `video_round` VALUES ('周一', 12);
INSERT INTO `video_round` VALUES ('周一', 13);
INSERT INTO `video_round` VALUES ('周一', 14);
INSERT INTO `video_round` VALUES ('周二', 23);
INSERT INTO `video_round` VALUES ('周二', 24);
INSERT INTO `video_round` VALUES ('周二', 25);
INSERT INTO `video_round` VALUES ('周二', 26);
INSERT INTO `video_round` VALUES ('周二', 27);
INSERT INTO `video_round` VALUES ('周二', 28);
INSERT INTO `video_round` VALUES ('周二', 29);
INSERT INTO `video_round` VALUES ('周二', 30);
INSERT INTO `video_round` VALUES ('周二', 31);
INSERT INTO `video_round` VALUES ('周二', 32);
INSERT INTO `video_round` VALUES ('周二', 33);
INSERT INTO `video_round` VALUES ('周二', 34);
INSERT INTO `video_round` VALUES ('周三', 43);
INSERT INTO `video_round` VALUES ('周三', 44);
INSERT INTO `video_round` VALUES ('周三', 45);
INSERT INTO `video_round` VALUES ('周三', 46);
INSERT INTO `video_round` VALUES ('周三', 47);
INSERT INTO `video_round` VALUES ('周三', 48);
INSERT INTO `video_round` VALUES ('周三', 49);
INSERT INTO `video_round` VALUES ('周三', 50);
INSERT INTO `video_round` VALUES ('周三', 51);
INSERT INTO `video_round` VALUES ('周三', 52);
INSERT INTO `video_round` VALUES ('周三', 53);
INSERT INTO `video_round` VALUES ('周三', 54);
INSERT INTO `video_round` VALUES ('周四', 63);
INSERT INTO `video_round` VALUES ('周四', 64);
INSERT INTO `video_round` VALUES ('周四', 65);
INSERT INTO `video_round` VALUES ('周四', 66);
INSERT INTO `video_round` VALUES ('周四', 67);
INSERT INTO `video_round` VALUES ('周四', 68);
INSERT INTO `video_round` VALUES ('周四', 69);
INSERT INTO `video_round` VALUES ('周四', 70);
INSERT INTO `video_round` VALUES ('周四', 71);
INSERT INTO `video_round` VALUES ('周四', 72);
INSERT INTO `video_round` VALUES ('周四', 73);
INSERT INTO `video_round` VALUES ('周四', 74);
INSERT INTO `video_round` VALUES ('周五', 83);
INSERT INTO `video_round` VALUES ('周五', 84);
INSERT INTO `video_round` VALUES ('周五', 85);
INSERT INTO `video_round` VALUES ('周五', 86);
INSERT INTO `video_round` VALUES ('周五', 87);
INSERT INTO `video_round` VALUES ('周五', 88);
INSERT INTO `video_round` VALUES ('周五', 89);
INSERT INTO `video_round` VALUES ('周五', 90);
INSERT INTO `video_round` VALUES ('周五', 91);
INSERT INTO `video_round` VALUES ('周五', 92);
INSERT INTO `video_round` VALUES ('周五', 93);
INSERT INTO `video_round` VALUES ('周五', 94);
INSERT INTO `video_round` VALUES ('周六', 103);
INSERT INTO `video_round` VALUES ('周六', 104);
INSERT INTO `video_round` VALUES ('周六', 105);
INSERT INTO `video_round` VALUES ('周六', 106);
INSERT INTO `video_round` VALUES ('周六', 107);
INSERT INTO `video_round` VALUES ('周六', 108);
INSERT INTO `video_round` VALUES ('周六', 109);
INSERT INTO `video_round` VALUES ('周六', 110);
INSERT INTO `video_round` VALUES ('周六', 111);
INSERT INTO `video_round` VALUES ('周六', 112);
INSERT INTO `video_round` VALUES ('周六', 113);
INSERT INTO `video_round` VALUES ('周六', 114);
INSERT INTO `video_round` VALUES ('周日', 123);
INSERT INTO `video_round` VALUES ('周日', 124);
INSERT INTO `video_round` VALUES ('周日', 125);
INSERT INTO `video_round` VALUES ('周日', 126);
INSERT INTO `video_round` VALUES ('周日', 127);
INSERT INTO `video_round` VALUES ('周日', 128);
INSERT INTO `video_round` VALUES ('周日', 129);
INSERT INTO `video_round` VALUES ('周日', 130);
INSERT INTO `video_round` VALUES ('周日', 131);
INSERT INTO `video_round` VALUES ('周日', 132);
INSERT INTO `video_round` VALUES ('周日', 133);
INSERT INTO `video_round` VALUES ('周日', 134);

SET FOREIGN_KEY_CHECKS = 1;
