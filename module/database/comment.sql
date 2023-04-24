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

 Date: 24/04/2023 15:47:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `videoCommentID` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createTime` datetime NULL DEFAULT NULL,
  `isDelete` bit(1) NOT NULL DEFAULT b'0',
  `user_id` int UNSIGNED NULL DEFAULT NULL,
  `video_id` int UNSIGNED NULL DEFAULT NULL,
  `commitLikeCount` int NULL DEFAULT 0,
  `rootCommentID` bigint NULL DEFAULT 0,
  PRIMARY KEY (`videoCommentID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 'the world!', '2023-03-25 16:32:20', b'0', 3, 11, 1, 0);
INSERT INTO `comment` VALUES (2, 'the world!', '2023-03-25 16:42:32', b'0', 3, 11, 40, 2);
INSERT INTO `comment` VALUES (3, 'wow!', '2023-03-25 16:42:51', b'0', 3, 11, 51, 0);
INSERT INTO `comment` VALUES (4, '五卡拉卡', '2023-03-25 17:33:50', b'0', 5, 11, 69, 0);
INSERT INTO `comment` VALUES (5, '植物打杂', '2023-03-25 17:34:10', b'0', 4, 11, 54, 0);
INSERT INTO `comment` VALUES (6, '阿萨飒飒', '2023-03-25 17:34:17', b'0', 2, 11, 61, 0);
INSERT INTO `comment` VALUES (7, '实打实大苏打', '2023-03-25 17:34:22', b'0', 2, 11, 46, 3);
INSERT INTO `comment` VALUES (8, '水水哇', '2023-03-25 17:34:26', b'0', 2, 11, 43, 0);
INSERT INTO `comment` VALUES (9, '大鳄啊奋斗奋斗feds', '2023-03-25 17:34:29', b'0', 2, 11, 80, 0);
INSERT INTO `comment` VALUES (10, '阿德阿瓦达达娃', '2023-03-25 17:34:35', b'0', 4, 11, 73, 0);
INSERT INTO `comment` VALUES (11, '伟大而愤然人', '2023-03-25 17:34:41', b'0', 6, 11, 24, 0);
INSERT INTO `comment` VALUES (12, '飒飒阿萨', '2023-03-25 17:35:58', b'0', 6, 11, 3, 0);
INSERT INTO `comment` VALUES (13, '顺丰到付的歌手身份的', '2023-03-25 17:36:01', b'0', 6, 11, 44, 4);
INSERT INTO `comment` VALUES (14, '撒旦的方式发的', '2023-03-25 17:36:04', b'0', 6, 11, 8, 0);
INSERT INTO `comment` VALUES (15, '对于家庭收入', '2023-03-25 17:36:07', b'0', 6, 11, 12, 0);
INSERT INTO `comment` VALUES (16, 'u咖啡因的挺好的', '2023-03-25 17:36:10', b'0', 6, 11, 37, 0);
INSERT INTO `comment` VALUES (17, '而的人人格大诗人歌德', '2023-03-25 17:36:14', b'0', 6, 11, 46, 0);
INSERT INTO `comment` VALUES (18, '的突然收到贵公司过热', '2023-03-25 17:36:17', b'0', 6, 11, 22, 5);
INSERT INTO `comment` VALUES (19, '认识的韩国人热电公司', '2023-03-25 17:36:19', b'0', 6, 11, 72, 0);
INSERT INTO `comment` VALUES (20, '他说他是人体认识2', '2023-03-25 17:36:22', b'0', 6, 11, 96, 0);
INSERT INTO `comment` VALUES (21, '商讨如何散热', '2023-03-25 17:36:26', b'0', 6, 11, 64, 0);
INSERT INTO `comment` VALUES (22, '而非如果如果', '2023-03-25 17:36:36', b'0', 6, 11, 33, 7);
INSERT INTO `comment` VALUES (23, '而封杀封杀封杀', '2023-03-25 17:36:39', b'0', 6, 11, 74, 0);
INSERT INTO `comment` VALUES (24, '警方呼吁各方一个换行符他', '2023-03-25 17:36:43', b'0', 6, 11, 71, 11);
INSERT INTO `comment` VALUES (25, '真不错，美滋滋', '2023-03-26 17:00:04', b'0', 7, 865, 59, 0);
INSERT INTO `comment` VALUES (26, '真不错，美滋滋', '2023-03-26 17:00:06', b'0', 7, 865, 73, 0);
INSERT INTO `comment` VALUES (27, '评论', '2023-03-30 15:53:23', b'0', 1, 11, 47, 0);
INSERT INTO `comment` VALUES (28, '太帅了', '2023-04-24 10:34:46', b'0', 3, 33, 55, 2);

SET FOREIGN_KEY_CHECKS = 1;
