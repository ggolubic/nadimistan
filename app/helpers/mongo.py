import motor.motor_asyncio

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.oglasi

oglasi_collection = database.get_collection("oglasi_collection")

# helpers
def oglas_helper(oglas) -> dict:
    return {
        "id": str(oglas.get("_id")),
        "link": oglas.get("link"),
        "title": oglas.get("title"),
        "cijena": oglas.get("cijena"),
        "cijena_parsed": oglas.get("cijena_parsed"),
        "opis": oglas.get("opis"),
        "zupanija": oglas.get("zupanija"),
        "grad": oglas.get("grad"),
        "naselje": oglas.get("naselje"),
        "m2": oglas.get("m2"),
        "kat": oglas.get("kat"),
        "broj_soba": oglas.get("broj_soba"),
        "namjesten": oglas.get("namjesten"),
        "parking": oglas.get("parking"),
        "dostupno_od": oglas.get("dostupno_od"),
        "rezije": oglas.get("rezije"),
        "mail": oglas.get("mail"),
        "contact": oglas.get("contact"),
        "active": oglas.get("active"),
        "last_active": oglas.get("last_active"),
        "scraped": oglas.get("scraped"),
    }
