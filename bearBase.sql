DROP TABLE IF EXISTS users ;

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL NOT NULL,
  user_name VARCHAR(45) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(45) NOT NULL,
  PRIMARY KEY (user_id))
;


-- -----------------------------------------------------
-- Table clients 2
-- -----------------------------------------------------
DROP TABLE IF EXISTS clients ;

CREATE TABLE IF NOT EXISTS clients (
  client_id SERIAL NOT NULL,
  balance REAL NOT NULL,
  no_trips INT NULL,
  app_uses INT NOT NULL,
  mapbox_token VARCHAR(250) NULL,
  PRIMARY KEY (client_id),
  CONSTRAINT user_id
    FOREIGN KEY (client_id)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table admins 3
-- -----------------------------------------------------
DROP TABLE IF EXISTS admins ;

CREATE TABLE IF NOT EXISTS admins (
  admins_id SERIAL NOT NULL,
  PRIMARY KEY (admins_id),
  CONSTRAINT user_id
    FOREIGN KEY (admins_id)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- -----------------------------------------------------
-- Table repairmen 4
-- -----------------------------------------------------
DROP TABLE IF EXISTS repairmen ;

CREATE TABLE IF NOT EXISTS repairmen (
  repairmen_id SERIAL NOT NULL,
  PRIMARY KEY (repairmen_id),
  CONSTRAINT user_id
    FOREIGN KEY (repairmen_id)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;





-- -----------------------------------------------------
-- Table status
-- -----------------------------------------------------
DROP TABLE IF EXISTS scooter_status ;

CREATE TABLE IF NOT EXISTS scooter_status (
  status_id SERIAL NOT NULL,
  name VARCHAR(100) NULL,
  PRIMARY KEY (status_id))
;


-- -----------------------------------------------------
-- Table scooter
-- -----------------------------------------------------
DROP TABLE IF EXISTS scooter ;

CREATE TABLE IF NOT EXISTS scooter (
  scooter_id SERIAL NOT NULL,
  BATERY INT NULL,
  lng FLOAT NOT NULL,
  lat FLOAT NOT NULL,
  accumulated_km FLOAT NULL,
  next_checkup DATE NULL,
  additional_info VARCHAR(100) NULL,
  status_id SERIAL NOT NULL,
  PRIMARY KEY (scooter_id),
    CONSTRAINT status_id
    FOREIGN KEY (status_id)
    REFERENCES scooter_status (status_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- -----------------------------------------------------
-- Table booking 5
-- -----------------------------------------------------
DROP TABLE IF EXISTS booking ;

CREATE TABLE IF NOT EXISTS booking (
  booking_id SERIAL NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  client_id SERIAL NOT NULL,
  status BOOLEAN NOT NULL,  
  scooter_id SERIAL NOT NULL,
  PRIMARY KEY (booking_id),
  CONSTRAINT client_id
    FOREIGN KEY (client_id)
    REFERENCES clients (client_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT scooter_id
    FOREIGN KEY (scooter_id)
    REFERENCES scooter (scooter_id)
     ON DELETE NO ACTION
    ON UPDATE NO ACTION)
	;

-- -----------------------------------------------------
-- Table trips 
-- -----------------------------------------------------
DROP TABLE IF EXISTS trips ;

CREATE TABLE IF NOT EXISTS trips (
  trip_id SERIAL NOT NULL,
  scooter_id SERIAL NOT NULL,
  booking_id SERIAL NOT NULL,
  start_date TIMESTAMP NULL,
  end_date TIMESTAMP NULL,
  lat_start FLOAT NULL,
  lng_start FLOAT NULL,
  lat_end FLOAT NULL,
  lng_end FLOAT NULL,
  PRIMARY KEY (trip_id),
  CONSTRAINT scooter_id
    FOREIGN KEY (scooter_id)
    REFERENCES scooter (scooter_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT booking_id
    FOREIGN KEY (booking_id)
    REFERENCES booking (booking_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- -----------------------------------------------------
-- Table payments 
-- -----------------------------------------------------
DROP TABLE IF EXISTS payments ;

CREATE TABLE IF NOT EXISTS payments (
  payment_id SERIAL NOT NULL,
  trip_id SERIAL NOT NULL,
  triptime FLOAT NOT NULL,
  baseprice FLOAT NULL,
  taxes FLOAT NULL,
  total_price FLOAT NULL,
  PRIMARY KEY (payment_id),
  CONSTRAINT trip_id
    FOREIGN KEY (trip_id)
    REFERENCES trips (trip_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- -----------------------------------------------------
-- Table solution
-- -----------------------------------------------------
DROP TABLE IF EXISTS solution ;

CREATE TABLE IF NOT EXISTS solution (
  solution_id SERIAL NOT NULL,
  solution VARCHAR(45) NULL,
  PRIMARY KEY (solution_id))
;

-- -----------------------------------------------------
-- Table incidences 
-- -----------------------------------------------------
DROP TABLE IF EXISTS incidences ;

CREATE TABLE IF NOT EXISTS incidences (
  incidence_id SERIAL NOT NULL,
  scooter_id SERIAL NOT NULL,
  solution_id SERIAL NOT NULL,
  solution_date DATE NULL,
  client_id SERIAL NOT NULL,
  repair_id SERIAL NOT NULL,
  is_repaired BOOLEAN NULL,
  PRIMARY KEY (incidence_id), 
  CONSTRAINT scooter_id
    FOREIGN KEY (scooter_id)
    REFERENCES scooter (scooter_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT client_id
    FOREIGN KEY (client_id)
    REFERENCES clients (client_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT repair_id
    FOREIGN KEY (repair_id)
    REFERENCES repairmen (repairmen_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT solution_id
    FOREIGN KEY (solution_id)
    REFERENCES solution (solution_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table notifications
-- -----------------------------------------------------
DROP TABLE IF EXISTS notifications ;

CREATE TABLE IF NOT EXISTS notifications (
  warnings_id SERIAL NOT NULL,
  title VARCHAR(45) NOT NULL,
  client_id SERIAL NOT NULL,
  text VARCHAR(45) NULL,
  PRIMARY KEY (warnings_id),
  CONSTRAINT client_id
    FOREIGN KEY (client_id)
    REFERENCES clients (client_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

insert into scooter_status (name) values (’Available’), (Reserved’), (‘not available’);

Insert into Scooter(scooter_id, batery, lng, lat, accumulated_km, next_checkup, status_id)
 Values(00002, 50, -3.7, 40.4, 0, '5/11/2025', 1),(00001, 50, -3.6862, 40.4, 0, '5/11/2025', 1), (00003, 50, -3.695, 40.4096, 0, '5/11/2025', 1), (00004, 70, -3.699, 40.405, 0, '5/11/2025', 1), (00005, 50, -15.422, 28.10807, 0, '5/11/2025', 1), (00006, 60, -15.400, 28.11, 0, '5/11/2025', 1), (00007, 35, -15.388, 28.10500, 0, '5/11/2025', 1), (00008, 45, -3.71, 40.405, 0, '5/11/2025', 1), (00009, 89, -3.7009, 40.3900, 0, '5/11/2025', 3), (00010, 99, -3.635, 40.408, 0, '5/11/2025', 1), (00011, 58, -3.6, 40.3, 0, '5/11/2025', 3), (00012, 83, -3.599, 40.41, 0, '5/11/2025', 1);