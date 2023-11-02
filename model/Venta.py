from pydantic import BaseModel


class Venta(BaseModel):
    id: int
    cantidad_chico: int
    cantidad_mediano: int
    cantidad_grande: int
    cantidad_jumbo: int
    total_galletas: int