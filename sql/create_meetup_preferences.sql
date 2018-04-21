CREATE TABLE `dog_meetup`.`meetup_preferences` (
  `idmeetup_preferences` INT NOT NULL,
  `userid` INT NULL,
  `weekday` ENUM('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY') NULL,
  `time` TIME NULL,
  `weather` ENUM('warm', 'hot', 'cool', 'cold') NULL,
  PRIMARY KEY (`idmeetup_preferences`),
  UNIQUE INDEX `idmeetup_preferences_UNIQUE` (`idmeetup_preferences` ASC),
  INDEX `userid_idx` (`userid` ASC),
  CONSTRAINT `user_id`
    FOREIGN KEY (`userid`)
    REFERENCES `dog_meetup`.`users` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
