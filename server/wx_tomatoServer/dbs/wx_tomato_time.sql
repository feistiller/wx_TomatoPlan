/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : wx_tomato_time

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-04-09 18:48:13
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `events_status`
-- ----------------------------
DROP TABLE IF EXISTS `events_status`;
CREATE TABLE `events_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) DEFAULT NULL,
  `startTime` int(11) DEFAULT NULL,
  `endTime` int(11) DEFAULT NULL,
  `eventTitle` varchar(255) DEFAULT NULL,
  `eventDetail` text,
  `status` int(11) DEFAULT NULL,
  `del` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of events_status
-- ----------------------------
INSERT INTO `events_status` VALUES ('1', 'oQlZJ5HHuIdnyao_1J9ZsrtAEsp4', '2', '62', '测试', null, '2', '1');
INSERT INTO `events_status` VALUES ('2', 'oQlZJ5HHuIdnyao_1J9ZsrtAEsp4', '1523185032', '1523185092', '123', null, '2', '1');
INSERT INTO `events_status` VALUES ('3', 'oQlZJ5HHuIdnyao_1J9ZsrtAEsp4', '1523268093', '1523268213', '测试', null, '2', '1');

-- ----------------------------
-- Table structure for `user_feedback`
-- ----------------------------
DROP TABLE IF EXISTS `user_feedback`;
CREATE TABLE `user_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_feedback
-- ----------------------------
INSERT INTO `user_feedback` VALUES ('1', 'oQlZJ5HHuIdnyao_1J9ZsrtAEsp4', '吃的', '1');

-- ----------------------------
-- Table structure for `user_return_back`
-- ----------------------------
DROP TABLE IF EXISTS `user_return_back`;
CREATE TABLE `user_return_back` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_return_back
-- ----------------------------

-- ----------------------------
-- Table structure for `wx_user_data`
-- ----------------------------
DROP TABLE IF EXISTS `wx_user_data`;
CREATE TABLE `wx_user_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userData` text,
  `openId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_user_data
-- ----------------------------
INSERT INTO `wx_user_data` VALUES ('6', null, 'oQlZJ5HHuIdnyao_1J9ZsrtAEsp4');
INSERT INTO `wx_user_data` VALUES ('7', '{\"nickName\":\"一个特别长的名字被@时才有存在感\",\"gender\":1,\"language\":\"zh_CN\",\"city\":null,\"province\":null,\"country\":\"Solomon Islands\",\"avatarUrl\":\"https:\\/\\/wx.qlogo.cn\\/mmopen\\/vi_32\\/Q0j4TwGTfTIBZ6fQB1EQYbkqv6O7QBqaic0iaDKzSoiakm1VCkau94KCnickUdDxJo6VWya0pibSOia0emNFowxeAa5A\\/0\"}', 'oQlZJ5HHuIdnyao_1J9ZsrtAEsp4');

-- ----------------------------
-- Table structure for `wx_user_session`
-- ----------------------------
DROP TABLE IF EXISTS `wx_user_session`;
CREATE TABLE `wx_user_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `sessionKey` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `openId` varchar(255) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_user_session
-- ----------------------------
INSERT INTO `wx_user_session` VALUES ('1', null, '6uboWDaTbgagbnKC0sCe+g==', '0114bw3v0l9Brc1zdZ2v0Jyr3v04bw3a', 'oQlZJ5HHuIdnyao_1J9ZsrtAEsp4', '1523270809');
