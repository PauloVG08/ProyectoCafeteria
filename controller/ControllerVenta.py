import mysql
from controller.bd.Conexion import startConexion
from model.Venta import Venta
from model.Cafe import Cafe

#   ---------- NOTA IMPORTANTE ---------------

#   PARA QUE EL PROGRAMA FUNCIONE FAVOR DE EJECUTAR EL ARCHIVO main.py 
#   PARA LEVANTAR EL SERVIDOR

def insertVenta(venta: Venta):
    try:
        conexion, cursor = startConexion()
        args = (venta.cantidad_chico, venta.cantidad_mediano, venta.cantidad_grande,
                venta.cantidad_jumbo, venta.total_galletas)
        cursor.callproc("cafeteria.insertarVenta", args)

        conexion.commit()

        cursor.close()
        conexion.close()

        return True
    except mysql.connector.Error as error:
        cursor.close()
        conexion.close()
        print("Error al obtener las ventas:", error)
        return []
    finally:
        if conexion is not None:
            cursor.close()
            conexion.close()

def insertCafe(cafe: Cafe):
    try:
        conexion, cursor = startConexion()
        args = (cafe.cafe_chico, cafe.cafe_mediano, cafe.cafe_grande,
                cafe.cafe_jumbo)
        cursor.callproc("cafeteria.insertarCafe", args)

        conexion.commit()

        cursor.close()
        conexion.close()

        return True
    except mysql.connector.Error as error:
        cursor.close()
        conexion.close()
        print("Error al obtener las ventas:", error)
        return []
    finally:
        if conexion is not None:
            cursor.close()
            conexion.close()

def getAllVentas():
    try:
        conexion, cursor = startConexion()
        if conexion is not None:
            cursor = conexion.cursor()
            consulta = f"SELECT cafe_chico, cafe_mediano, cafe_grande, cafe_jumbo FROM cafe"
            cursor.execute(consulta)
            resultados = cursor.fetchall()
            return resultados
    except mysql.connector.Error as error:
        cursor.close()
        conexion.close()
        print("Error al obtenerlas ventas:", error)
        return []
    finally:
        if conexion is not None:
            cursor.close()
            conexion.close()

def getAllGalletas():
    try:
        conexion, cursor = startConexion()
        if conexion is not None:
            cursor = conexion.cursor()
            consulta = f"SELECT total_galletas FROM venta"
            cursor.execute(consulta)
            resultados = cursor.fetchall()
            return resultados
    except mysql.connector.Error as error:
        cursor.close()
        conexion.close()
        print("Error al obtener las galletas:", error)
        return []
    finally:
        if conexion is not None:
            cursor.close()
            conexion.close()