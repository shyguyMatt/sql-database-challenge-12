INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Matthew', 'Herford', 123, 443),
       ('Delaney', 'Meese', 321, 442);


INSERT INTO roles (id, title, salary, department_id)
VALUES (123, 'Carwash Attendant', 20000, 02),
       (321, 'Scretary', 15000, 03);


INSERT INTO departments (id, dpt_name)
VALUES (02, 'wash'),
       (03, 'administration');