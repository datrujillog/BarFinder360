

use roles;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
    -- accion VARCHAR(50),
    -- modulos VARCHAR(50)   
);


CREATE TABLE permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


CREATE TABLE role_permissions (
    role_id INT,
    permission_id INT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);


INSERT INTO permissions (name) VALUES ('editar');
INSERT INTO roles (name) VALUES ('Administrador del Bar');
INSERT INTO role_permissions (role_id, permission_id) VALUES (
    (SELECT id FROM roles WHERE name = 'Administrador del Bar'),
    (SELECT id FROM permissions WHERE name = 'editar')
);


INSERT INTO user_roles (user_id, role_id) VALUES (
    (SELECT id FROM users WHERE username = 'yego'),
    (SELECT id FROM roles WHERE name = 'Administrador del Bar')
);


INSERT INTO `roles`.`role_permissions` (`role_id`, `permission_id`) VALUES ('1', '2');
INSERT INTO `roles`.`role_permissions` (`role_id`, `permission_id`) VALUES ('1', '3');
INSERT INTO `roles`.`role_permissions` (`role_id`, `permission_id`) VALUES ('1', '4');





-- use ejemplorole;
SELECT * FROM user;





SELECT r.name AS nombre_rol, m.name AS nombre_modulo, a.name AS nombre_accion
FROM acciones_has_modulos am
INNER JOIN roles r ON am.roles_idroles = r.idroles
INNER JOIN modulos m ON am.modulos_idmodulos = m.idmodulos
INNER JOIN acciones a ON am.acciones_idacciones = a.idacciones;

use ejemplorole;

SELECT u.name AS nombre_usuario, u.lastname AS apellido_usuario, r.name AS nombre_rol, m.name AS nombre_modulo, a.name AS nombre_accion
FROM acciones_has_modulos am
INNER JOIN user u ON am.roles_idroles = u.roles_idroles
INNER JOIN roles r ON u.roles_idroles = r.idroles
INNER JOIN modulos m ON am.modulos_idmodulos = m.idmodulos
INNER JOIN acciones a ON am.acciones_idacciones = a.idacciones;

SELECT *
FROM bar_app.order
INNER JOIN bar_app.mesa ON mesa.id = order.mesaId;


SELECT *
FROM bar_app.order o
INNER JOIN bar_app.mesa ON mesa.id = o.mesaId
WHERE mesa.name = 'Mesa 10';

-- ===================================================

--  tablas de order user mesa productos
SELECT o.date, M.name, o.amount,PR.name, o.total, U.name
FROM bar_app.order o
INNER JOIN bar_app.user U ON U.id = o.id
INNER JOIN bar_app.mesa M ON M.id = o.mesaId
INNER join bar_app.orderproduct OP ON OP.orderId = o.id
JOIN bar_app.product PR ON PR.id = OP.id
WHERE M.name = 'Mesa 10';
-- order by o.amount;


-- WHERE M.name = 'Mesa 10';
--  esta es la la que boy a usar  ***********************
SELECT OP.orderId, O.date, O.total, OP.units, PR.name, U.name, U.id FROM bar_app.orderproduct OP 
JOIN bar_app.product PR ON PR.id = OP.productId
JOIN bar_app.order O ON  O.id = OP.orderId 
JOIN bar_app.mesa M ON M.id = O.mesaId
JOIN bar_app.user U ON U.id = OP.userId
 -- WHERE OP.orderId = 1 ORDER BY OP.orderId;


SELECT * FROM bar_app.orderproduct OP 
JOIN bar_app.product PR ON PR.id = OP.productId
WHERE OP.orderId = 1;







