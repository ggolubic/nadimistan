from helpers.mongo import oglas_collection, oglas_helper
from . import schemas


async def fetch_oglasi(page=0, per_page=20, **args):
    oglasi = []
    query = {}
    filters = list(filter(lambda x: x[1] != None, args.items()))
    for arg in filters:
        if arg[0] == "cijena":
            query["cijena_parsed"] = {"$lt": args.get("cijena")}
        elif arg[0] == "m2":
            query["m2"] = {"$gt" if args.get("m2_greater") else "$lt": args.get("m2")}
        elif arg[0].endswith("greater"):
            continue
        else:
            query[arg[0]] = arg[1]

    async for oglas in oglas_collection.find(query).skip(page * per_page).limit(500):
        oglasi.append(oglas_helper(oglas))
    return oglasi


async def retrieve_oglas(link: str) -> dict:
    oglas = await oglas_collection.find_one({"link": link})
    if oglas:
        return oglas_helper(oglas)
    return False


# Update an oglas with a matching link
async def update_oglas(link: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False

    updated_oglas = await oglas_collection.update_one({"link": link}, {"$set": data})
    if updated_oglas:
        return True
    return False
