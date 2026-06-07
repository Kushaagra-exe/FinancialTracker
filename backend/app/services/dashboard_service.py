from app.database.mongodb import db


def calculate_metrics(investment):

    buy_total = sum(
        t["amount"]
        for t in investment["transactions"]
        if t["type"] == "BUY"
    )

    sell_total = sum(
        t["amount"]
        for t in investment["transactions"]
        if t["type"] == "SELL"
    )

    net_invested = buy_total - sell_total

    current_value = net_invested * 1.15

    profit = current_value - net_invested

    return {
        "invested_amount": buy_total,
        "redeemed_amount": sell_total,
        "current_value": current_value,
        "net_profit": profit,
        "return_percentage":
            round((profit / net_invested) * 100, 2)
            if net_invested > 0
            else 0
    }


async def get_dashboard():

    dashboard = []

    async for investment in db.investments.find():

        metrics = calculate_metrics(investment)

        dashboard.append({
            "id": str(investment["_id"]),
            "name": investment["name"],
            **metrics
        })

    return dashboard