/* CREACION ESTRUCTURA BASE DE DATOS PARA EL CLI */


/* crear un uario */
CREATE user davidnherran WITH password 'davidnherran';

/* crear base de datos */
CREATE DATABASE vertebra_tchnical_test;

/* usar base de datos */
\c vertebra_tchnical_test

/* crear tablas */
CREATE TABLE users(id serial primary key, username text, password text, displayName text);

INSERT INTO users VALUES('davidnherran', '123456', 'David Niño');