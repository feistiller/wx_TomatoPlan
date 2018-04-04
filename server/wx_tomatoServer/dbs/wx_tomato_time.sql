/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : wx_tomato_time

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-04-04 18:25:54
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `events_status`
-- ----------------------------
DROP TABLE IF EXISTS `events_status`;
CREATE TABLE `events_status` (
  `id` int(11) NOT NULL,
  `openId` varchar(255) DEFAULT NULL,
  `startTime` int(11) DEFAULT NULL,
  `endTime` int(11) DEFAULT NULL,
  `eventTitle` varchar(255) DEFAULT NULL,
  `eventDetail` text,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of events_status
-- ----------------------------

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
-- Table structure for `wx_user_session`
-- ----------------------------
DROP TABLE IF EXISTS `wx_user_session`;
CREATE TABLE `wx_user_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `sessionKey` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `openId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_user_session
-- ----------------------------
