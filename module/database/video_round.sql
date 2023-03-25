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

 Date: 25/03/2023 21:22:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for video_round
-- ----------------------------
DROP TABLE IF EXISTS `video_round`;
CREATE TABLE `video_round`  (
  `Date` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `video_id` int UNSIGNED NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video_round
-- ----------------------------
INSERT INTO `video_round` VALUES ('周一', 2300);
INSERT INTO `video_round` VALUES ('周一', 169);
INSERT INTO `video_round` VALUES ('周一', 2209);
INSERT INTO `video_round` VALUES ('周一', 2648);
INSERT INTO `video_round` VALUES ('周一', 332);
INSERT INTO `video_round` VALUES ('周一', 1895);
INSERT INTO `video_round` VALUES ('周一', 934);
INSERT INTO `video_round` VALUES ('周一', 2033);
INSERT INTO `video_round` VALUES ('周一', 1827);
INSERT INTO `video_round` VALUES ('周一', 863);
INSERT INTO `video_round` VALUES ('周一', 2130);
INSERT INTO `video_round` VALUES ('周一', 2326);
INSERT INTO `video_round` VALUES ('周一', 2078);
INSERT INTO `video_round` VALUES ('周一', 1020);
INSERT INTO `video_round` VALUES ('周一', 2582);
INSERT INTO `video_round` VALUES ('周一', 361);
INSERT INTO `video_round` VALUES ('周二', 208);
INSERT INTO `video_round` VALUES ('周二', 242);
INSERT INTO `video_round` VALUES ('周二', 1930);
INSERT INTO `video_round` VALUES ('周二', 2118);
INSERT INTO `video_round` VALUES ('周二', 2140);
INSERT INTO `video_round` VALUES ('周二', 2286);
INSERT INTO `video_round` VALUES ('周二', 357);
INSERT INTO `video_round` VALUES ('周二', 2651);
INSERT INTO `video_round` VALUES ('周二', 2125);
INSERT INTO `video_round` VALUES ('周二', 2587);
INSERT INTO `video_round` VALUES ('周二', 55);
INSERT INTO `video_round` VALUES ('周二', 2098);
INSERT INTO `video_round` VALUES ('周二', 635);
INSERT INTO `video_round` VALUES ('周二', 1036);
INSERT INTO `video_round` VALUES ('周二', 1155);
INSERT INTO `video_round` VALUES ('周二', 68);
INSERT INTO `video_round` VALUES ('周三', 829);
INSERT INTO `video_round` VALUES ('周三', 2392);
INSERT INTO `video_round` VALUES ('周三', 1966);
INSERT INTO `video_round` VALUES ('周三', 2030);
INSERT INTO `video_round` VALUES ('周三', 2220);
INSERT INTO `video_round` VALUES ('周三', 2310);
INSERT INTO `video_round` VALUES ('周三', 2268);
INSERT INTO `video_round` VALUES ('周三', 384);
INSERT INTO `video_round` VALUES ('周三', 563);
INSERT INTO `video_round` VALUES ('周三', 2662);
INSERT INTO `video_round` VALUES ('周三', 2215);
INSERT INTO `video_round` VALUES ('周三', 285);
INSERT INTO `video_round` VALUES ('周三', 313);
INSERT INTO `video_round` VALUES ('周三', 943);
INSERT INTO `video_round` VALUES ('周三', 690);
INSERT INTO `video_round` VALUES ('周三', 2000);
INSERT INTO `video_round` VALUES ('周四', 2399);
INSERT INTO `video_round` VALUES ('周四', 1828);
INSERT INTO `video_round` VALUES ('周四', 1967);
INSERT INTO `video_round` VALUES ('周四', 1911);
INSERT INTO `video_round` VALUES ('周四', 2334);
INSERT INTO `video_round` VALUES ('周四', 1790);
INSERT INTO `video_round` VALUES ('周四', 2127);
INSERT INTO `video_round` VALUES ('周四', 644);
INSERT INTO `video_round` VALUES ('周四', 2426);
INSERT INTO `video_round` VALUES ('周四', 247);
INSERT INTO `video_round` VALUES ('周四', 1045);
INSERT INTO `video_round` VALUES ('周四', 630);
INSERT INTO `video_round` VALUES ('周四', 383);
INSERT INTO `video_round` VALUES ('周四', 404);
INSERT INTO `video_round` VALUES ('周四', 2302);
INSERT INTO `video_round` VALUES ('周四', 2661);
INSERT INTO `video_round` VALUES ('周五', 973);
INSERT INTO `video_round` VALUES ('周五', 433);
INSERT INTO `video_round` VALUES ('周五', 2035);
INSERT INTO `video_round` VALUES ('周五', 611);
INSERT INTO `video_round` VALUES ('周五', 2260);
INSERT INTO `video_round` VALUES ('周五', 414);
INSERT INTO `video_round` VALUES ('周五', 2137);
INSERT INTO `video_round` VALUES ('周五', 1271);
INSERT INTO `video_round` VALUES ('周五', 648);
INSERT INTO `video_round` VALUES ('周五', 1964);
INSERT INTO `video_round` VALUES ('周五', 736);
INSERT INTO `video_round` VALUES ('周五', 1892);
INSERT INTO `video_round` VALUES ('周五', 590);
INSERT INTO `video_round` VALUES ('周五', 603);
INSERT INTO `video_round` VALUES ('周五', 323);
INSERT INTO `video_round` VALUES ('周五', 327);
INSERT INTO `video_round` VALUES ('周六', 2372);
INSERT INTO `video_round` VALUES ('周六', 258);
INSERT INTO `video_round` VALUES ('周六', 2567);
INSERT INTO `video_round` VALUES ('周六', 2501);
INSERT INTO `video_round` VALUES ('周六', 2644);
INSERT INTO `video_round` VALUES ('周六', 351);
INSERT INTO `video_round` VALUES ('周六', 779);
INSERT INTO `video_round` VALUES ('周六', 1238);
INSERT INTO `video_round` VALUES ('周六', 1038);
INSERT INTO `video_round` VALUES ('周六', 2424);
INSERT INTO `video_round` VALUES ('周六', 831);
INSERT INTO `video_round` VALUES ('周六', 2109);
INSERT INTO `video_round` VALUES ('周六', 213);
INSERT INTO `video_round` VALUES ('周六', 2042);
INSERT INTO `video_round` VALUES ('周六', 1148);
INSERT INTO `video_round` VALUES ('周六', 2287);
INSERT INTO `video_round` VALUES ('周日', 2324);
INSERT INTO `video_round` VALUES ('周日', 2265);
INSERT INTO `video_round` VALUES ('周日', 952);
INSERT INTO `video_round` VALUES ('周日', 114);
INSERT INTO `video_round` VALUES ('周日', 684);
INSERT INTO `video_round` VALUES ('周日', 97);
INSERT INTO `video_round` VALUES ('周日', 2331);
INSERT INTO `video_round` VALUES ('周日', 2525);
INSERT INTO `video_round` VALUES ('周日', 2223);
INSERT INTO `video_round` VALUES ('周日', 2149);
INSERT INTO `video_round` VALUES ('周日', 1103);
INSERT INTO `video_round` VALUES ('周日', 2012);
INSERT INTO `video_round` VALUES ('周日', 606);
INSERT INTO `video_round` VALUES ('周日', 207);
INSERT INTO `video_round` VALUES ('周日', 1932);
INSERT INTO `video_round` VALUES ('周日', 2649);

SET FOREIGN_KEY_CHECKS = 1;
