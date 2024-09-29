CREATE TABLE app_user(
    ID serial PRIMARY KEY, 
    name varchar(100),
    surname varchar(100),
    age int,
    phone text
);

CREATE TABLE task(
    ID serial PRIMARY KEY,
    Description VARCHAR,
    SUBJECT int    
);

CREATE TABLE task_longer_description(
    Description text,
);

CREATE TABLE date_series(
    date_field DATE primary key
);

INSERT INTO date_series (date_field) 
SELECT GENERATE_SERIES(
    NOW()::DATE,
    (NOW() + INTERVAL '1 year')::DATE,
    INTERVAL '1 day'
);

CREATE TABLE user_task(
     user_id integer references app_user,
     task_id integer references task,
     date DATE references date_series(date_field),
     primary key(user_id, task_id, date)
);
