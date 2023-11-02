from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model.Venta import Venta
from model.Cafe import Cafe
from controller.ControllerVenta import insertVenta, getAllVentas, insertCafe, getAllGalletas

app = FastAPI()

#   ---------- NOTA IMPORTANTE ---------------

#   PARA QUE EL PROGRAMA FUNCIONE FAVOR DE EJECUTAR EL ARCHIVO main.py 
#   PARA LEVANTAR EL SERVIDOR

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5501"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/saveVenta")
def guardarVenta(venta: Venta):
    response = insertVenta(venta)
    return response

@app.post("/saveCafe")
def guardarCafe(cafe: Cafe):
    response = insertCafe(cafe)
    return response

@app.get("/getAll")
def getAll():
    response = getAllVentas()
    return response

@app.get("/getAllGalletas")
def getAllCookies():
    response = getAllGalletas()
    return response
