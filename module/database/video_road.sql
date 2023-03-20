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

 Date: 20/03/2023 21:56:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for video_road
-- ----------------------------
DROP TABLE IF EXISTS `video_road`;
CREATE TABLE `video_road`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `video_id` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_video_id`(`video_id` ASC) USING BTREE,
  CONSTRAINT `fk_video_id` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 276 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video_road
-- ----------------------------
INSERT INTO `video_road` VALUES (1, 'load_1', 1);
INSERT INTO `video_road` VALUES (2, 'load_3', 2);
INSERT INTO `video_road` VALUES (3, 'load_2', 2);
INSERT INTO `video_road` VALUES (4, 'load_0', 2);
INSERT INTO `video_road` VALUES (5, 'load_1', 2);
INSERT INTO `video_road` VALUES (6, 'load_2', 3);
INSERT INTO `video_road` VALUES (7, 'load_0', 3);
INSERT INTO `video_road` VALUES (8, 'load_0', 6);
INSERT INTO `video_road` VALUES (9, 'load_0', 7);
INSERT INTO `video_road` VALUES (10, 'load_0', 8);
INSERT INTO `video_road` VALUES (11, 'load_0', 9);
INSERT INTO `video_road` VALUES (12, 'load_0', 10);
INSERT INTO `video_road` VALUES (13, 'load_3', 11);
INSERT INTO `video_road` VALUES (14, 'load_1', 11);
INSERT INTO `video_road` VALUES (15, 'load_0', 13);
INSERT INTO `video_road` VALUES (16, 'load_0', 15);
INSERT INTO `video_road` VALUES (17, 'load_0', 16);
INSERT INTO `video_road` VALUES (18, 'load_1', 19);
INSERT INTO `video_road` VALUES (19, 'load_0', 20);
INSERT INTO `video_road` VALUES (20, 'load_0', 21);
INSERT INTO `video_road` VALUES (21, 'load_0', 22);
INSERT INTO `video_road` VALUES (22, 'load_3', 24);
INSERT INTO `video_road` VALUES (23, 'load_4', 25);
INSERT INTO `video_road` VALUES (24, 'load_3', 25);
INSERT INTO `video_road` VALUES (25, 'load_0', 26);
INSERT INTO `video_road` VALUES (26, 'load_0', 28);
INSERT INTO `video_road` VALUES (27, 'load_1', 30);
INSERT INTO `video_road` VALUES (28, 'load_3', 31);
INSERT INTO `video_road` VALUES (29, 'load_2', 32);
INSERT INTO `video_road` VALUES (30, 'load_3', 33);
INSERT INTO `video_road` VALUES (31, 'load_0', 35);
INSERT INTO `video_road` VALUES (32, 'load_0', 36);
INSERT INTO `video_road` VALUES (33, 'load_3', 37);
INSERT INTO `video_road` VALUES (34, 'load_0', 38);
INSERT INTO `video_road` VALUES (35, 'load_4', 39);
INSERT INTO `video_road` VALUES (36, 'load_3', 41);
INSERT INTO `video_road` VALUES (37, 'load_1', 42);
INSERT INTO `video_road` VALUES (38, 'load_0', 44);
INSERT INTO `video_road` VALUES (39, 'load_0', 48);
INSERT INTO `video_road` VALUES (40, 'load_3', 51);
INSERT INTO `video_road` VALUES (41, 'load_0', 54);
INSERT INTO `video_road` VALUES (42, 'load_2', 55);
INSERT INTO `video_road` VALUES (43, 'load_0', 56);
INSERT INTO `video_road` VALUES (44, 'load_1', 57);
INSERT INTO `video_road` VALUES (45, 'load_0', 59);
INSERT INTO `video_road` VALUES (46, 'load_1', 61);
INSERT INTO `video_road` VALUES (47, 'load_1', 62);
INSERT INTO `video_road` VALUES (48, 'load_0', 63);
INSERT INTO `video_road` VALUES (49, 'load_0', 64);
INSERT INTO `video_road` VALUES (50, 'load_2', 65);
INSERT INTO `video_road` VALUES (51, 'load_3', 66);
INSERT INTO `video_road` VALUES (52, 'load_3', 67);
INSERT INTO `video_road` VALUES (53, 'load_4', 68);
INSERT INTO `video_road` VALUES (54, 'load_0', 70);
INSERT INTO `video_road` VALUES (55, 'load_0', 72);
INSERT INTO `video_road` VALUES (56, 'load_0', 73);
INSERT INTO `video_road` VALUES (57, 'load_0', 74);
INSERT INTO `video_road` VALUES (58, 'load_0', 75);
INSERT INTO `video_road` VALUES (59, 'load_2', 76);
INSERT INTO `video_road` VALUES (60, 'load_1', 78);
INSERT INTO `video_road` VALUES (61, 'load_1', 79);
INSERT INTO `video_road` VALUES (62, 'load_0', 84);
INSERT INTO `video_road` VALUES (63, 'load_1', 85);
INSERT INTO `video_road` VALUES (64, 'load_1', 86);
INSERT INTO `video_road` VALUES (65, 'load_0', 88);
INSERT INTO `video_road` VALUES (66, 'load_1', 89);
INSERT INTO `video_road` VALUES (67, 'load_0', 90);
INSERT INTO `video_road` VALUES (68, 'load_1', 91);
INSERT INTO `video_road` VALUES (69, 'load_3', 92);
INSERT INTO `video_road` VALUES (70, 'load_0', 93);
INSERT INTO `video_road` VALUES (71, 'load_0', 94);
INSERT INTO `video_road` VALUES (72, 'load_0', 95);
INSERT INTO `video_road` VALUES (73, 'load_1', 97);
INSERT INTO `video_road` VALUES (74, 'load_0', 98);
INSERT INTO `video_road` VALUES (75, 'load_0', 99);
INSERT INTO `video_road` VALUES (76, 'load_0', 100);
INSERT INTO `video_road` VALUES (77, 'load_0', 101);
INSERT INTO `video_road` VALUES (78, 'load_0', 103);
INSERT INTO `video_road` VALUES (79, 'load_0', 104);
INSERT INTO `video_road` VALUES (80, 'load_1', 106);
INSERT INTO `video_road` VALUES (81, 'load_0', 109);
INSERT INTO `video_road` VALUES (82, 'load_1', 110);
INSERT INTO `video_road` VALUES (83, 'load_0', 111);
INSERT INTO `video_road` VALUES (84, 'load_0', 112);
INSERT INTO `video_road` VALUES (85, 'load_0', 113);
INSERT INTO `video_road` VALUES (86, 'load_1', 114);
INSERT INTO `video_road` VALUES (87, 'load_2', 115);
INSERT INTO `video_road` VALUES (88, 'load_3', 117);
INSERT INTO `video_road` VALUES (89, 'load_1', 118);
INSERT INTO `video_road` VALUES (90, 'load_2', 119);
INSERT INTO `video_road` VALUES (91, 'load_0', 120);
INSERT INTO `video_road` VALUES (92, 'load_0', 121);
INSERT INTO `video_road` VALUES (93, 'load_0', 123);
INSERT INTO `video_road` VALUES (94, 'load_0', 124);
INSERT INTO `video_road` VALUES (95, 'load_0', 126);
INSERT INTO `video_road` VALUES (96, 'load_0', 127);
INSERT INTO `video_road` VALUES (97, 'load_3', 128);
INSERT INTO `video_road` VALUES (98, 'load_2', 128);
INSERT INTO `video_road` VALUES (99, 'load_0', 129);
INSERT INTO `video_road` VALUES (100, 'load_2', 130);
INSERT INTO `video_road` VALUES (101, 'load_0', 131);
INSERT INTO `video_road` VALUES (102, 'load_0', 132);
INSERT INTO `video_road` VALUES (103, 'load_2', 133);
INSERT INTO `video_road` VALUES (104, 'load_4', 134);
INSERT INTO `video_road` VALUES (105, 'load_2', 134);
INSERT INTO `video_road` VALUES (106, 'load_1', 135);
INSERT INTO `video_road` VALUES (107, 'load_0', 136);
INSERT INTO `video_road` VALUES (108, 'load_0', 138);
INSERT INTO `video_road` VALUES (109, 'load_0', 139);
INSERT INTO `video_road` VALUES (110, 'load_0', 142);
INSERT INTO `video_road` VALUES (111, 'load_4', 143);
INSERT INTO `video_road` VALUES (112, 'load_3', 144);
INSERT INTO `video_road` VALUES (113, 'load_2', 145);
INSERT INTO `video_road` VALUES (114, 'load_1', 146);
INSERT INTO `video_road` VALUES (115, 'load_0', 147);
INSERT INTO `video_road` VALUES (116, 'load_2', 148);
INSERT INTO `video_road` VALUES (117, 'load_0', 151);
INSERT INTO `video_road` VALUES (118, 'load_0', 152);
INSERT INTO `video_road` VALUES (119, 'load_0', 153);
INSERT INTO `video_road` VALUES (120, 'load_1', 154);
INSERT INTO `video_road` VALUES (121, 'load_0', 155);
INSERT INTO `video_road` VALUES (122, 'load_0', 157);
INSERT INTO `video_road` VALUES (123, 'load_0', 158);
INSERT INTO `video_road` VALUES (124, 'load_1', 159);
INSERT INTO `video_road` VALUES (125, 'load_2', 162);
INSERT INTO `video_road` VALUES (126, 'load_0', 163);
INSERT INTO `video_road` VALUES (127, 'load_0', 165);
INSERT INTO `video_road` VALUES (128, 'load_4', 166);
INSERT INTO `video_road` VALUES (129, 'load_1', 169);
INSERT INTO `video_road` VALUES (130, 'load_2', 170);
INSERT INTO `video_road` VALUES (131, 'load_1', 170);
INSERT INTO `video_road` VALUES (132, 'load_0', 171);
INSERT INTO `video_road` VALUES (133, 'load_0', 172);
INSERT INTO `video_road` VALUES (134, 'load_0', 173);
INSERT INTO `video_road` VALUES (135, 'load_0', 174);
INSERT INTO `video_road` VALUES (136, 'load_1', 175);
INSERT INTO `video_road` VALUES (137, 'load_0', 176);
INSERT INTO `video_road` VALUES (138, 'load_0', 177);
INSERT INTO `video_road` VALUES (139, 'load_0', 178);
INSERT INTO `video_road` VALUES (140, 'load_0', 179);
INSERT INTO `video_road` VALUES (141, 'load_0', 180);
INSERT INTO `video_road` VALUES (142, 'load_1', 182);
INSERT INTO `video_road` VALUES (143, 'load_0', 184);
INSERT INTO `video_road` VALUES (144, 'load_0', 185);
INSERT INTO `video_road` VALUES (145, 'load_0', 186);
INSERT INTO `video_road` VALUES (146, 'load_0', 189);
INSERT INTO `video_road` VALUES (147, 'load_0', 190);
INSERT INTO `video_road` VALUES (148, 'load_0', 191);
INSERT INTO `video_road` VALUES (149, 'load_3', 194);
INSERT INTO `video_road` VALUES (150, 'load_2', 194);
INSERT INTO `video_road` VALUES (151, 'load_1', 195);
INSERT INTO `video_road` VALUES (152, 'load_0', 196);
INSERT INTO `video_road` VALUES (153, 'load_2', 197);
INSERT INTO `video_road` VALUES (154, 'load_0', 198);
INSERT INTO `video_road` VALUES (155, 'load_0', 200);
INSERT INTO `video_road` VALUES (156, 'load_0', 201);
INSERT INTO `video_road` VALUES (157, 'load_0', 202);
INSERT INTO `video_road` VALUES (158, 'load_0', 203);
INSERT INTO `video_road` VALUES (159, 'load_0', 204);
INSERT INTO `video_road` VALUES (160, 'load_0', 206);
INSERT INTO `video_road` VALUES (161, 'load_2', 207);
INSERT INTO `video_road` VALUES (162, 'load_1', 208);
INSERT INTO `video_road` VALUES (163, 'load_1', 209);
INSERT INTO `video_road` VALUES (164, 'load_0', 210);
INSERT INTO `video_road` VALUES (165, 'load_0', 211);
INSERT INTO `video_road` VALUES (166, 'load_1', 212);
INSERT INTO `video_road` VALUES (167, 'load_1', 213);
INSERT INTO `video_road` VALUES (168, 'load_0', 215);
INSERT INTO `video_road` VALUES (169, 'load_0', 216);
INSERT INTO `video_road` VALUES (170, 'load_0', 218);
INSERT INTO `video_road` VALUES (171, 'load_2', 219);
INSERT INTO `video_road` VALUES (172, 'load_0', 221);
INSERT INTO `video_road` VALUES (173, 'load_0', 222);
INSERT INTO `video_road` VALUES (174, 'load_0', 223);
INSERT INTO `video_road` VALUES (175, 'load_0', 224);
INSERT INTO `video_road` VALUES (176, 'load_3', 225);
INSERT INTO `video_road` VALUES (177, 'load_0', 226);
INSERT INTO `video_road` VALUES (178, 'load_0', 227);
INSERT INTO `video_road` VALUES (179, 'load_0', 228);
INSERT INTO `video_road` VALUES (180, 'load_1', 229);
INSERT INTO `video_road` VALUES (181, 'load_0', 230);
INSERT INTO `video_road` VALUES (182, 'load_0', 231);
INSERT INTO `video_road` VALUES (183, 'load_0', 232);
INSERT INTO `video_road` VALUES (184, 'load_0', 234);
INSERT INTO `video_road` VALUES (185, 'load_1', 236);
INSERT INTO `video_road` VALUES (186, 'load_3', 237);
INSERT INTO `video_road` VALUES (187, 'load_2', 237);
INSERT INTO `video_road` VALUES (188, 'load_0', 239);
INSERT INTO `video_road` VALUES (189, 'load_1', 241);
INSERT INTO `video_road` VALUES (190, 'load_0', 241);
INSERT INTO `video_road` VALUES (191, 'load_2', 242);
INSERT INTO `video_road` VALUES (192, 'load_1', 243);
INSERT INTO `video_road` VALUES (193, 'load_0', 244);
INSERT INTO `video_road` VALUES (194, 'load_0', 245);
INSERT INTO `video_road` VALUES (195, 'load_1', 247);
INSERT INTO `video_road` VALUES (196, 'load_0', 248);
INSERT INTO `video_road` VALUES (197, 'load_1', 249);
INSERT INTO `video_road` VALUES (198, 'load_0', 251);
INSERT INTO `video_road` VALUES (199, 'load_0', 252);
INSERT INTO `video_road` VALUES (200, 'load_1', 254);
INSERT INTO `video_road` VALUES (201, 'load_0', 256);
INSERT INTO `video_road` VALUES (202, 'load_3', 257);
INSERT INTO `video_road` VALUES (203, 'load_2', 258);
INSERT INTO `video_road` VALUES (204, 'load_0', 259);
INSERT INTO `video_road` VALUES (205, 'load_6', 260);
INSERT INTO `video_road` VALUES (206, 'load_0', 261);
INSERT INTO `video_road` VALUES (207, 'load_0', 263);
INSERT INTO `video_road` VALUES (208, 'load_0', 264);
INSERT INTO `video_road` VALUES (209, 'load_0', 266);
INSERT INTO `video_road` VALUES (210, 'load_1', 267);
INSERT INTO `video_road` VALUES (211, 'load_0', 268);
INSERT INTO `video_road` VALUES (212, 'load_2', 269);
INSERT INTO `video_road` VALUES (213, 'load_3', 270);
INSERT INTO `video_road` VALUES (214, 'load_3', 271);
INSERT INTO `video_road` VALUES (215, 'load_2', 271);
INSERT INTO `video_road` VALUES (216, 'load_1', 272);
INSERT INTO `video_road` VALUES (217, 'load_2', 273);
INSERT INTO `video_road` VALUES (218, 'load_0', 274);
INSERT INTO `video_road` VALUES (219, 'load_0', 275);
INSERT INTO `video_road` VALUES (220, 'load_0', 277);
INSERT INTO `video_road` VALUES (221, 'load_0', 278);
INSERT INTO `video_road` VALUES (222, 'load_3', 280);
INSERT INTO `video_road` VALUES (223, 'load_2', 280);
INSERT INTO `video_road` VALUES (224, 'load_0', 281);
INSERT INTO `video_road` VALUES (225, 'load_0', 283);
INSERT INTO `video_road` VALUES (226, 'load_0', 284);
INSERT INTO `video_road` VALUES (227, 'load_1', 285);
INSERT INTO `video_road` VALUES (228, 'load_0', 286);
INSERT INTO `video_road` VALUES (229, 'load_1', 287);
INSERT INTO `video_road` VALUES (230, 'load_0', 287);
INSERT INTO `video_road` VALUES (231, 'load_0', 288);
INSERT INTO `video_road` VALUES (232, 'load_0', 289);
INSERT INTO `video_road` VALUES (233, 'load_0', 290);
INSERT INTO `video_road` VALUES (234, 'load_0', 291);
INSERT INTO `video_road` VALUES (235, 'load_0', 292);
INSERT INTO `video_road` VALUES (236, 'load_1', 293);
INSERT INTO `video_road` VALUES (237, 'load_0', 294);
INSERT INTO `video_road` VALUES (238, 'load_2', 295);
INSERT INTO `video_road` VALUES (239, 'load_0', 296);
INSERT INTO `video_road` VALUES (240, 'load_0', 297);
INSERT INTO `video_road` VALUES (241, 'load_0', 298);
INSERT INTO `video_road` VALUES (242, 'load_0', 300);
INSERT INTO `video_road` VALUES (243, 'load_1', 300);
INSERT INTO `video_road` VALUES (244, 'load_0', 301);
INSERT INTO `video_road` VALUES (245, 'load_0', 302);
INSERT INTO `video_road` VALUES (246, 'load_0', 303);
INSERT INTO `video_road` VALUES (247, 'load_0', 305);
INSERT INTO `video_road` VALUES (248, 'load_0', 306);
INSERT INTO `video_road` VALUES (249, 'load_3', 307);
INSERT INTO `video_road` VALUES (250, 'load_5', 308);
INSERT INTO `video_road` VALUES (251, 'load_1', 310);
INSERT INTO `video_road` VALUES (252, 'load_2', 311);
INSERT INTO `video_road` VALUES (253, 'load_1', 311);
INSERT INTO `video_road` VALUES (254, 'load_0', 312);
INSERT INTO `video_road` VALUES (255, 'load_5', 313);
INSERT INTO `video_road` VALUES (256, 'load_0', 314);
INSERT INTO `video_road` VALUES (257, 'load_0', 315);
INSERT INTO `video_road` VALUES (258, 'load_0', 316);
INSERT INTO `video_road` VALUES (259, 'load_0', 318);
INSERT INTO `video_road` VALUES (260, 'load_0', 319);
INSERT INTO `video_road` VALUES (261, 'load_2', 321);
INSERT INTO `video_road` VALUES (262, 'load_0', 322);
INSERT INTO `video_road` VALUES (263, 'load_2', 323);
INSERT INTO `video_road` VALUES (264, 'load_0', 324);
INSERT INTO `video_road` VALUES (265, 'load_0', 153);
INSERT INTO `video_road` VALUES (266, 'load_2', 327);
INSERT INTO `video_road` VALUES (267, 'load_0', 329);
INSERT INTO `video_road` VALUES (268, 'load_0', 330);
INSERT INTO `video_road` VALUES (269, 'load_0', 331);
INSERT INTO `video_road` VALUES (270, 'load_4', 332);
INSERT INTO `video_road` VALUES (271, 'load_3', 332);
INSERT INTO `video_road` VALUES (272, 'load_0', 333);
INSERT INTO `video_road` VALUES (273, 'load_0', 334);
INSERT INTO `video_road` VALUES (274, 'load_0', 335);
INSERT INTO `video_road` VALUES (275, 'load_0', 336);

SET FOREIGN_KEY_CHECKS = 1;
