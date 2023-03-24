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

 Date: 24/03/2023 18:03:37
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
INSERT INTO `video_round` VALUES ('周一', 85);
INSERT INTO `video_round` VALUES ('周一', 2319);
INSERT INTO `video_round` VALUES ('周一', 1124);
INSERT INTO `video_round` VALUES ('周一', 243);
INSERT INTO `video_round` VALUES ('周一', 2525);
INSERT INTO `video_round` VALUES ('周一', 128);
INSERT INTO `video_round` VALUES ('周一', 2323);
INSERT INTO `video_round` VALUES ('周一', 117);
INSERT INTO `video_round` VALUES ('周一', 260);
INSERT INTO `video_round` VALUES ('周一', 2089);
INSERT INTO `video_round` VALUES ('周一', 934);
INSERT INTO `video_round` VALUES ('周一', 630);
INSERT INTO `video_round` VALUES ('周一', 2441);
INSERT INTO `video_round` VALUES ('周一', 327);
INSERT INTO `video_round` VALUES ('周一', 2107);
INSERT INTO `video_round` VALUES ('周一', 2101);
INSERT INTO `video_round` VALUES ('周二', 712);
INSERT INTO `video_round` VALUES ('周二', 311);
INSERT INTO `video_round` VALUES ('周二', 2376);
INSERT INTO `video_round` VALUES ('周二', 2033);
INSERT INTO `video_round` VALUES ('周二', 1851);
INSERT INTO `video_round` VALUES ('周二', 758);
INSERT INTO `video_round` VALUES ('周二', 1962);
INSERT INTO `video_round` VALUES ('周二', 2432);
INSERT INTO `video_round` VALUES ('周二', 1238);
INSERT INTO `video_round` VALUES ('周二', 2127);
INSERT INTO `video_round` VALUES ('周二', 242);
INSERT INTO `video_round` VALUES ('周二', 1896);
INSERT INTO `video_round` VALUES ('周二', 207);
INSERT INTO `video_round` VALUES ('周二', 505);
INSERT INTO `video_round` VALUES ('周二', 540);
INSERT INTO `video_round` VALUES ('周二', 2147);
INSERT INTO `video_round` VALUES ('周三', 903);
INSERT INTO `video_round` VALUES ('周三', 42);
INSERT INTO `video_round` VALUES ('周三', 1952);
INSERT INTO `video_round` VALUES ('周三', 2236);
INSERT INTO `video_round` VALUES ('周三', 2661);
INSERT INTO `video_round` VALUES ('周三', 76);
INSERT INTO `video_round` VALUES ('周三', 783);
INSERT INTO `video_round` VALUES ('周三', 2015);
INSERT INTO `video_round` VALUES ('周三', 3);
INSERT INTO `video_round` VALUES ('周三', 655);
INSERT INTO `video_round` VALUES ('周三', 1059);
INSERT INTO `video_round` VALUES ('周三', 293);
INSERT INTO `video_round` VALUES ('周三', 2959);
INSERT INTO `video_round` VALUES ('周三', 2060);
INSERT INTO `video_round` VALUES ('周三', 550);
INSERT INTO `video_round` VALUES ('周三', 2650);
INSERT INTO `video_round` VALUES ('周四', 2523);
INSERT INTO `video_round` VALUES ('周四', 446);
INSERT INTO `video_round` VALUES ('周四', 1103);
INSERT INTO `video_round` VALUES ('周四', 1011);
INSERT INTO `video_round` VALUES ('周四', 92);
INSERT INTO `video_round` VALUES ('周四', 2092);
INSERT INTO `video_round` VALUES ('周四', 1883);
INSERT INTO `video_round` VALUES ('周四', 1057);
INSERT INTO `video_round` VALUES ('周四', 2854);
INSERT INTO `video_round` VALUES ('周四', 194);
INSERT INTO `video_round` VALUES ('周四', 2255);
INSERT INTO `video_round` VALUES ('周四', 2253);
INSERT INTO `video_round` VALUES ('周四', 1154);
INSERT INTO `video_round` VALUES ('周四', 2298);
INSERT INTO `video_round` VALUES ('周四', 590);
INSERT INTO `video_round` VALUES ('周四', 530);
INSERT INTO `video_round` VALUES ('周五', 2123);
INSERT INTO `video_round` VALUES ('周五', 2042);
INSERT INTO `video_round` VALUES ('周五', 2581);
INSERT INTO `video_round` VALUES ('周五', 749);
INSERT INTO `video_round` VALUES ('周五', 780);
INSERT INTO `video_round` VALUES ('周五', 1881);
INSERT INTO `video_round` VALUES ('周五', 1848);
INSERT INTO `video_round` VALUES ('周五', 490);
INSERT INTO `video_round` VALUES ('周五', 2296);
INSERT INTO `video_round` VALUES ('周五', 2027);
INSERT INTO `video_round` VALUES ('周五', 67);
INSERT INTO `video_round` VALUES ('周五', 2026);
INSERT INTO `video_round` VALUES ('周五', 871);
INSERT INTO `video_round` VALUES ('周五', 2030);
INSERT INTO `video_round` VALUES ('周五', 2588);
INSERT INTO `video_round` VALUES ('周五', 700);
INSERT INTO `video_round` VALUES ('周六', 1930);
INSERT INTO `video_round` VALUES ('周六', 529);
INSERT INTO `video_round` VALUES ('周六', 3064);
INSERT INTO `video_round` VALUES ('周六', 938);
INSERT INTO `video_round` VALUES ('周六', 427);
INSERT INTO `video_round` VALUES ('周六', 2351);
INSERT INTO `video_round` VALUES ('周六', 1901);
INSERT INTO `video_round` VALUES ('周六', 1963);
INSERT INTO `video_round` VALUES ('周六', 2282);
INSERT INTO `video_round` VALUES ('周六', 2393);
INSERT INTO `video_round` VALUES ('周六', 2299);
INSERT INTO `video_round` VALUES ('周六', 2973);
INSERT INTO `video_round` VALUES ('周六', 2542);
INSERT INTO `video_round` VALUES ('周六', 754);
INSERT INTO `video_round` VALUES ('周六', 1982);
INSERT INTO `video_round` VALUES ('周六', 2690);
INSERT INTO `video_round` VALUES ('周日', 1069);
INSERT INTO `video_round` VALUES ('周日', 706);
INSERT INTO `video_round` VALUES ('周日', 965);
INSERT INTO `video_round` VALUES ('周日', 868);
INSERT INTO `video_round` VALUES ('周日', 1816);
INSERT INTO `video_round` VALUES ('周日', 2575);
INSERT INTO `video_round` VALUES ('周日', 582);
INSERT INTO `video_round` VALUES ('周日', 1056);
INSERT INTO `video_round` VALUES ('周日', 2294);
INSERT INTO `video_round` VALUES ('周日', 2381);
INSERT INTO `video_round` VALUES ('周日', 453);
INSERT INTO `video_round` VALUES ('周日', 1965);
INSERT INTO `video_round` VALUES ('周日', 1884);
INSERT INTO `video_round` VALUES ('周日', 1166);
INSERT INTO `video_round` VALUES ('周日', 2277);
INSERT INTO `video_round` VALUES ('周日', 438);

SET FOREIGN_KEY_CHECKS = 1;
