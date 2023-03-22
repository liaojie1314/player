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

 Date: 22/03/2023 21:53:46
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
INSERT INTO `video_round` VALUES ('周一', 110);
INSERT INTO `video_round` VALUES ('周一', 310);
INSERT INTO `video_round` VALUES ('周一', 2589);
INSERT INTO `video_round` VALUES ('周一', 472);
INSERT INTO `video_round` VALUES ('周一', 1239);
INSERT INTO `video_round` VALUES ('周一', 952);
INSERT INTO `video_round` VALUES ('周一', 1134);
INSERT INTO `video_round` VALUES ('周一', 758);
INSERT INTO `video_round` VALUES ('周一', 2000);
INSERT INTO `video_round` VALUES ('周一', 1032);
INSERT INTO `video_round` VALUES ('周一', 2523);
INSERT INTO `video_round` VALUES ('周一', 2303);
INSERT INTO `video_round` VALUES ('周二', 721);
INSERT INTO `video_round` VALUES ('周二', 603);
INSERT INTO `video_round` VALUES ('周二', 2092);
INSERT INTO `video_round` VALUES ('周二', 1852);
INSERT INTO `video_round` VALUES ('周二', 2281);
INSERT INTO `video_round` VALUES ('周二', 2302);
INSERT INTO `video_round` VALUES ('周二', 2545);
INSERT INTO `video_round` VALUES ('周二', 2050);
INSERT INTO `video_round` VALUES ('周二', 267);
INSERT INTO `video_round` VALUES ('周二', 2392);
INSERT INTO `video_round` VALUES ('周二', 2433);
INSERT INTO `video_round` VALUES ('周二', 2093);
INSERT INTO `video_round` VALUES ('周三', 412);
INSERT INTO `video_round` VALUES ('周三', 719);
INSERT INTO `video_round` VALUES ('周三', 2294);
INSERT INTO `video_round` VALUES ('周三', 295);
INSERT INTO `video_round` VALUES ('周三', 971);
INSERT INTO `video_round` VALUES ('周三', 900);
INSERT INTO `video_round` VALUES ('周三', 566);
INSERT INTO `video_round` VALUES ('周三', 780);
INSERT INTO `video_round` VALUES ('周三', 366);
INSERT INTO `video_round` VALUES ('周三', 236);
INSERT INTO `video_round` VALUES ('周三', 1892);
INSERT INTO `video_round` VALUES ('周三', 500);
INSERT INTO `video_round` VALUES ('周四', 779);
INSERT INTO `video_round` VALUES ('周四', 644);
INSERT INTO `video_round` VALUES ('周四', 247);
INSERT INTO `video_round` VALUES ('周四', 733);
INSERT INTO `video_round` VALUES ('周四', 254);
INSERT INTO `video_round` VALUES ('周四', 159);
INSERT INTO `video_round` VALUES ('周四', 1837);
INSERT INTO `video_round` VALUES ('周四', 801);
INSERT INTO `video_round` VALUES ('周四', 78);
INSERT INTO `video_round` VALUES ('周四', 285);
INSERT INTO `video_round` VALUES ('周四', 889);
INSERT INTO `video_round` VALUES ('周四', 148);
INSERT INTO `video_round` VALUES ('周五', 209);
INSERT INTO `video_round` VALUES ('周五', 806);
INSERT INTO `video_round` VALUES ('周五', 1956);
INSERT INTO `video_round` VALUES ('周五', 2380);
INSERT INTO `video_round` VALUES ('周五', 428);
INSERT INTO `video_round` VALUES ('周五', 2670);
INSERT INTO `video_round` VALUES ('周五', 272);
INSERT INTO `video_round` VALUES ('周五', 2525);
INSERT INTO `video_round` VALUES ('周五', 833);
INSERT INTO `video_round` VALUES ('周五', 2040);
INSERT INTO `video_round` VALUES ('周五', 1814);
INSERT INTO `video_round` VALUES ('周五', 2099);
INSERT INTO `video_round` VALUES ('周六', 2067);
INSERT INTO `video_round` VALUES ('周六', 1821);
INSERT INTO `video_round` VALUES ('周六', 1059);
INSERT INTO `video_round` VALUES ('周六', 2298);
INSERT INTO `video_round` VALUES ('周六', 911);
INSERT INTO `video_round` VALUES ('周六', 379);
INSERT INTO `video_round` VALUES ('周六', 2511);
INSERT INTO `video_round` VALUES ('周六', 2629);
INSERT INTO `video_round` VALUES ('周六', 2577);
INSERT INTO `video_round` VALUES ('周六', 540);
INSERT INTO `video_round` VALUES ('周六', 89);
INSERT INTO `video_round` VALUES ('周六', 1133);
INSERT INTO `video_round` VALUES ('周日', 924);
INSERT INTO `video_round` VALUES ('周日', 2263);
INSERT INTO `video_round` VALUES ('周日', 1157);
INSERT INTO `video_round` VALUES ('周日', 1019);
INSERT INTO `video_round` VALUES ('周日', 693);
INSERT INTO `video_round` VALUES ('周日', 873);
INSERT INTO `video_round` VALUES ('周日', 2128);
INSERT INTO `video_round` VALUES ('周日', 2148);
INSERT INTO `video_round` VALUES ('周日', 1983);
INSERT INTO `video_round` VALUES ('周日', 194);
INSERT INTO `video_round` VALUES ('周日', 2221);
INSERT INTO `video_round` VALUES ('周日', 2576);

SET FOREIGN_KEY_CHECKS = 1;
