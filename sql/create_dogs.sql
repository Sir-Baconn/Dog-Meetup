CREATE TABLE `dog_meetup`.`dogs` (
  `iddogs` INT NOT NULL,
  `name` VARCHAR(55) NOT NULL,
  `breed` VARCHAR(85) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `age` INT NOT NULL,
  `size` ENUM('x-small', 'small', 'medium', 'large', 'x-large') NOT NULL,
  `activity_level` ENUM('couch potato', 'regular exercise', 'calm', 'needs lots of activity', 'energetic') NOT NULL,
  `barking_level` ENUM('infrequent', 'medium', 'frequent') NOT NULL,
  `friendly_level` ENUM('reserved', 'medium', 'very friendly') NOT NULL,
  PRIMARY KEY (`iddogs`),
  UNIQUE INDEX `iddogs_UNIQUE` (`iddogs` ASC),
  CONSTRAINT `userid`
    FOREIGN KEY (`iddogs`)
    REFERENCES `dog_meetup`.`users` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);