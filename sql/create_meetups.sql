CREATE TABLE `dog_meetup`.`meetups` (
  `idmeetups` INT NOT NULL,
  `userid_1` INT NULL,
  `userid_2` INT NULL,
  `time` DATETIME NULL,
  `location` VARCHAR(100) NULL,
  `length` VARCHAR(10) NULL,
  PRIMARY KEY (`idmeetups`),
  UNIQUE INDEX `idmeetups_UNIQUE` (`idmeetups` ASC),
  INDEX `firstUser_idx` (`userid_1` ASC),
  INDEX `secondUser_idx` (`userid_2` ASC),
  CONSTRAINT `firstUser`
    FOREIGN KEY (`userid_1`)
    REFERENCES `dog_meetup`.`users` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `secondUser`
    FOREIGN KEY (`userid_2`)
    REFERENCES `dog_meetup`.`users` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);