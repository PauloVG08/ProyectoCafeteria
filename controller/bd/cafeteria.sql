CREATE DATABASE cafeteria;
USE cafeteria;

CREATE TABLE cafe(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cafe_chico INT(3) NOT NULL,
    cafe_mediano INT(3) NOT NULL,
    cafe_grande INT(3) NOT NULL,
    cafe_jumbo INT(3) NOT NULL
);

CREATE TABLE venta(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cantidad_chico INT NOT NULL DEFAULT 0,
    cantidad_mediano INT NOT NULL DEFAULT 0,
    cantidad_grande INT NOT NULL DEFAULT 0,
    cantidad_jumbo INT NOT NULL DEFAULT 0,
    total_galletas INT NOT NULL
);

DELIMITER $$
CREATE PROCEDURE insertarVenta(
								IN var_chico INT(2),
                                IN var_mediano INT(2),
                                IN var_grande INT(2),
                                IN var_jumbo INT(2),
                                IN var_total_galletas INT(2)
			)

BEGIN
        -- Se insertan los datos en la tabla
        INSERT INTO venta (cantidad_chico, cantidad_mediano, cantidad_grande, cantidad_jumbo, total_galletas)
					VALUES (var_chico, var_mediano, var_grande, var_jumbo, var_total_galletas);
		END
$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE insertarCafe(
								IN var_chico INT(2),
                                IN var_mediano INT(2),
                                IN var_grande INT(2),
                                IN var_jumbo INT(2)
			)

BEGIN
        -- Se insertan los datos en la tabla
        INSERT INTO cafe (cafe_chico, cafe_mediano, cafe_grande, cafe_jumbo)
					VALUES (var_chico, var_mediano, var_grande, var_jumbo);
		END
$$
DELIMITER ;


SELECT * FROM venta;
SELECT * FROM cafe;
SELECT SUM(total_galletas) as suma_total_galletas
FROM venta;
