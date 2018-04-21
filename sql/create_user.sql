CREATE TABLE `dog_meetup`.`users` (
  `iduser` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `location` VARCHAR(100) NULL,
  `phone_number` VARCHAR(15) NOT NULL,
  `number_of_dogs` INT NULL,
  PRIMARY KEY (`iduser_info`),
  UNIQUE INDEX `iduser_info_UNIQUE` (`iduser_info` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC),
  UNIQUE INDEX `phone_number_UNIQUE` (`phone_number` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));