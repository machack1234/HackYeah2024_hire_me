CREATE TABLE app_user(
    ID serial PRIMARY KEY, 
);

CREATE TABLE course(
   ID serial PRIMARY KEY,
   Description VARCHAR(255)
)

CREATE TABLE task(
    ID serial PRIMARY KEY,
    Description VARCHAR,
);

CREATE TABLE task_longer_description(
    task_id integer references task,
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
     course_id integer references course,
     date DATE references date_series(date_field),
     primary key(user_id, task_id, course_id, date)
);
