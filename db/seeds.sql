INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES 
    ('Sam', 'Sneed', 1, 3),
    ('Betty', 'Boop', 2, 1),
    ('Robbie', 'Roadrunner', 3, 3),
    ('Clark', 'Kent', 3, 1),
    ('Wendy', 'Darling', 1, 2),
    ('Patty', 'Parma', 2, 3);

INSERT INTO department (name)
   VALUES 
   ('Analysis'),
   ('Tracking'),
   ('Data');

INSERT INTO role (title, salary, department_id)
    VALUES 
    ('Analyst', '50000.00', 1), 
    ('Tracker', '40000.00', 2),
    ('Data Specialist', '30000.00', 3);

INSERT INTO manager (first_name, last_name, title, department_id)
    VALUES 'Speedy' 'Gonzales', 'Chief Analyst', 1),
    ('Olive', 'Oyl', 'Legislative Tracking Supervisor', 2),
    ('Wiley', 'Coyote', 'Data Systems Manager', 3);