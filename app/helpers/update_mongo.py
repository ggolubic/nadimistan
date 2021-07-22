from bson.objectid import ObjectId
from helpers.mongo import oglas_collection, oglas_helper


def parse_cijena(cijena: str):
    if cijena:
        parsed_cijena = cijena[2 : len(cijena) - 3].replace(".", "").replace(",", "")
        print(parsed_cijena)
        return parsed_cijena
    return cijena


async def update_many():
    async for oglas in oglas_collection.find():
        oglas_collection.update_one(
            {"_id": oglas.get("_id")},
            {"$set": {"cijena_parsed": int(parse_cijena(oglas.get("cijena")))}},
        )
