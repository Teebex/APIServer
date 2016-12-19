depuis myphpAdmin

create user sqladmin identified by '12345'
Puis changement des privilèges de sqladmin .


depuis Toad, sur la base dev

CREATE TABLE rollershutter
(
   `rowID`       INT UNSIGNED NOT NULL AUTO_INCREMENT,
   `ID`          INT NOT NULL,
   `timestamp`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
   `position`    INT UNSIGNED NOT NULL,
   PRIMARY KEY(`rowID`)
);

CREATE TABLE electricmeter 
(
`rowID` INT(10) UNSIGNED AUTO_INCREMENT NOT NULL, 
`ID` INT(10) UNSIGNED NOT NULL, 
`timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL, 
`cumulativevalue` INT(10) UNSIGNED, 
`tsdate` DATE, 
`tshour` INT2(10), 
`tsminute` INT2(5), 
`integrated` BOOL DEFAULT false, 
PRIMARY KEY (`rowID`)
);

CREATE TABLE THL
(
`rowID` INT(10) UNSIGNED AUTO_INCREMENT NOT NULL, 
`ID` INT(10) UNSIGNED NOT NULL, 
`timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL, 
temperature INT(10),
humidity    INT(10),
light       INT(10),
PRIMARY KEY (`rowID`)
);

CREATE TABLE device
(
   `ID`            INT(10) UNSIGNED NOT NULL,
   devicetype      VARCHAR(20) NOT NULL,
   `Description`   VARCHAR(30),
   PRIMARY KEY(`ID`, devicetype)
)