DROP DATABASE IF EXISTS planItOutDB;
CREATE DATABASE planItOutDB;
use planItOutDB;

CREATE TABLE User (
                      user_id INT auto_increment PRIMARY KEY ,
                      user_email varchar(50) not null,
                      user_name VARCHAR(100) not null
);

CREATE TABLE EventList (
                           event_id INT auto_increment PRIMARY KEY ,
                           event_name VARCHAR(255) not null,
                           event_description VARCHAR(250),
                           event_category VARCHAR(50),
                           date_time DATETIME,
                           host_id INT not null,
                           total_count INT not null,
                           location VARCHAR(255) not null,
                           FOREIGN KEY (host_ID) REFERENCES User(user_ID)
);

CREATE TABLE GuestList (
                           event_id INT,
                           user_id INT,
                           FOREIGN KEY (event_id) REFERENCES EventList(event_id),
                           FOREIGN KEY (user_id) REFERENCES User(user_id)
);

INSERT INTO User (user_email, user_name)
VALUES ('sanjith@gmail.com', 'Sanjith Jayasankar');
INSERT INTO User (user_email, user_name)
VALUES ('siddharth@gmail.com', 'Siddharth Ganesh');
INSERT INTO User (user_email, user_name)
VALUES ('srinath@gmail.com', 'Srinath Ganesh');
INSERT INTO User (user_email, user_name)
VALUES ('nishanth@gmail.com', 'Nishanth');
INSERT INTO User (user_email, user_name)
VALUES ('vikram.com', 'Vikram Hech');
INSERT INTO User (user_email, user_name)
VALUES ('kanye.com', 'Kanye West');
INSERT INTO User (user_email, user_name)
VALUES ('kendrick.com', 'kendrick lamar');
INSERT INTO User (user_email, user_name)
VALUES ('gordon.com', 'Gordon Ramsay');

INSERT INTO EventList (event_name, event_description, event_category, date_time, host_id, total_count, location)
VALUES ('Turf', 'Let\'s meet up and practice dribbling','sports', '2024-07-04 12:00:00', 1, 10, 'Battle Knights');

INSERT INTO EventList (event_name, event_description, event_category, date_time, host_id, total_count, location)
VALUES ('Cricket', 'We shall play cricket','sports', '2024-07-05 08:00:00', 1, 20, 'Manthop Ground');

INSERT INTO EventList (event_name, event_description, event_category, date_time, host_id, total_count, location)
VALUES ('Christmas Party', 'We shall celebrate Christmas','party', '2024-12-25 06:00:00', 1, 30, 'Church');

INSERT INTO EventList (event_name, event_description, event_category, date_time, host_id, total_count, location)
VALUES ('New Year Party', 'It is a new year party','party', '2024-12-31 11:00:00', 2, 50, 'Pub');

INSERT INTO EventList (event_name, event_description, event_category, date_time, host_id, total_count, location)
VALUES ('UML Design', 'We shall larn UML diagrams','workshop', '2024-11-24 11:00:00', 4, 100, 'Classroom');

INSERT INTO EventList (event_name, event_description, event_category, date_time, host_id, total_count, location)
VALUES ('Software Engineering', 'I shall teach Software Engineering','seminar', '2024-10-24 11:00:00', 5, 25, 'Lecture Hall');

INSERT INTO EventList (event_name, event_description, event_category, date_time, host_id, total_count, location)
VALUES ('Music Concert', 'I shall play music','concert', '2024-12-13 10:00:00', 6, 200, 'Concert Hall');

INSERT INTO EventList (event_name, event_description, event_category, date_time, host_id, total_count, location)
VALUES ('Kendrik Concert', 'I shall play better music','concert', '2024-12-14 10:00:00', 7, 300, 'Concert Hall');

INSERT INTO EventList (event_name, event_description, event_category, date_time, host_id, total_count, location)
VALUES ('Cook with Ramsay', 'This a one day workshop where I cook pasta','workshop', '2024-10-14 10:00:00', 8, 30, 'Dining Hall');


INSERT INTO GuestList (event_id, user_id) VALUES (1,2);
INSERT INTO GuestList (event_id, user_id) VALUES (1,3);
INSERT INTO GuestList (event_id, user_id) VALUES (1,5);
INSERT INTO GuestList (event_id, user_id) VALUES (1,6);
INSERT INTO GuestList (event_id, user_id) VALUES (4,2);
INSERT INTO GuestList (event_id, user_id) VALUES (4,3);
INSERT INTO GuestList (event_id, user_id) VALUES (4,5);
INSERT INTO GuestList (event_id, user_id) VALUES (4,6);
INSERT INTO GuestList (event_id, user_id) VALUES (5,1);
INSERT INTO GuestList (event_id, user_id) VALUES (5,2);
INSERT INTO GuestList (event_id, user_id) VALUES (5,3);
INSERT INTO GuestList (event_id, user_id) VALUES (5,4);
INSERT INTO GuestList (event_id, user_id) VALUES (7,1);
INSERT INTO GuestList (event_id, user_id) VALUES (7,3);
INSERT INTO GuestList (event_id, user_id) VALUES (7,4);
INSERT INTO GuestList (event_id, user_id) VALUES (7,5);
INSERT INTO GuestList (event_id, user_id) VALUES (7,6);
INSERT INTO GuestList (event_id, user_id) VALUES (8,1);
INSERT INTO GuestList (event_id, user_id) VALUES (8,4);
INSERT INTO GuestList (event_id, user_id) VALUES (8,5);
INSERT INTO GuestList (event_id, user_id) VALUES (8,6);

CREATE TABLE FriendList (
  user_id INT,
  friend_id INT,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

INSERT INTO FriendList (user_id, friend_id) VALUES (1,2);
INSERT INTO FriendList (user_id, friend_id) VALUES (1,3);
INSERT INTO FriendList (user_id, friend_id) VALUES (2,1);
INSERT INTO FriendList (user_id, friend_id) VALUES (2,3);