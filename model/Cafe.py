from pydantic import BaseModel


class Cafe(BaseModel):
    id: int
    cafe_chico: int
    cafe_mediano: int
    cafe_grande: int
    cafe_jumbo: int
