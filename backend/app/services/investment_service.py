from app.database.mongodb import db
from bson import ObjectId


async def create_investment(data):

    investment = {
        "name": data.name,
        "transactions": [
            {
                "type": "BUY",
                "amount": data.initial_amount,
                "date": str(data.investment_date)
            }
        ]
    }

    result = await db.investments.insert_one(investment)

    return str(result.inserted_id)


async def get_all_investments():

    investments = []

    async for item in db.investments.find():

        investments.append({
            "id": str(item["_id"]),
            "name": item["name"]
        })

    return investments


async def get_investment(investment_id):

    return await db.investments.find_one(
        {"_id": ObjectId(investment_id)}
    )


async def add_transaction(investment_id, transaction):

    await db.investments.update_one(
        {"_id": ObjectId(investment_id)},
        {
            "$push": {
                "transactions": {
                    "type": transaction.type,
                    "amount": transaction.amount,
                    "date": str(transaction.date)
                }
            }
        }
    )