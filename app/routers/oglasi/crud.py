from bson.objectid import ObjectId
from helpers.mongo import oglasi_collection, oglas_helper
from . import schemas
from datetime import datetime


async def fetch_oglasi(page, per_page, **args):
    oglasi = []
    query = {}
    filters = list(filter(lambda x: x[1] != None, args.items()))
    for arg in filters:
        if arg[0] == "cijena":
            query["cijena_parsed"] = {"$lt": args["cijena"]}
        elif arg[0] == "m2":
            query["m2"] = {"$gt" if args["m2_vece_od"] else "$lt": args["m2"]}
        elif arg[0].endswith("vece_od"):
            continue
        else:
            query[arg[0]] = arg[1]

    async for oglas in oglasi_collection.find(query).skip(page * per_page).limit(
        per_page
    ):
        oglasi.append(oglas_helper(oglas))
    return oglasi


# Add a new oglas into to the database
async def add_oglas(oglas_data: schemas.Oglas) -> dict:
    oglas = await oglasi_collection.insert_one(oglas_data)
    new_oglas = await oglasi_collection.find_one({"_id": oglas.inserted_id})
    return oglas_helper(new_oglas)


async def update_or_create_oglas(link: str, data: schemas.Oglas):
    oglas = await oglasi_collection.find_one({"link": link})
    if oglas:
        updated_oglas = await oglasi_collection.update_one(
            {
                "link": link,
            },
            {"$set": {"active": True, "last_active": datetime.now()}},
        )
        return updated_oglas
    return await oglasi_collection.insert_one(data)


# Update an oglas with a matching link
async def update_oglas(link: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    oglas = await oglasi_collection.find_one({"link": link})
    if oglas:
        updated_oglas = await oglasi_collection.update_one(
            {"link": link}, {"$set": data}
        )
        if updated_oglas:
            return True
        return False
