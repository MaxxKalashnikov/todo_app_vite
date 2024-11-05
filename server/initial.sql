DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    user_email VARCHAR(50) REFERENCES account(email) ON DELETE CASCADE NOT NULL,
	isDone BOOLEAN DEFAULT FALSE 
);

insert into account (email, password) values ('example1@mymail.com', '$2b$10$CZOrFCnwgPBlLEyloFVGmOwh0iKPkj1e9G98OVu6PR/rhClRzfct2');
insert into account (email, password) values ('example2@mymail.com', '$2b$10$CZOrFCnwgPBlLEyloFVGmOwh0iKPkj1e9G98OVu6PR/rhClRzfct2');

insert into task (description, user_email, isDone) values ('some task fro U1', 'example1@mymail.com', true);
insert into task (description, user_email, isDone) values ('another task for U1', 'example1@mymail.com', false);
insert into task (description, user_email, isDone) values ('next task U1', 'example1@mymail.com', false);

insert into task (description, user_email, isDone) values ('some task U2', 'example2@mymail.com', true);
insert into task (description, user_email, isDone) values ('absolutely different task U2', 'example2@mymail.com', false);
insert into task (description, user_email, isDone) values ('tru this task U2', 'example2@mymail.com', true);
