CREATE TABLE `dogs` (
  `iddogs` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `breed` varchar(85) NOT NULL,
  `description` varchar(200) NOT NULL,
  `age` int(11) NOT NULL,
  `size` enum('x-small','small','medium','large','x-large') NOT NULL,
  `activity_level` enum('couch potato','regular exercise','calm','needs lots of activity','energetic') NOT NULL,
  `barking_level` enum('infrequent','medium','frequent') NOT NULL,
  `friendly_level` enum('reserved','medium','very friendly') NOT NULL,
  `userid` int(11) DEFAULT NULL,
  PRIMARY KEY (`iddogs`),
  UNIQUE KEY `iddogs_UNIQUE` (`iddogs`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT;
