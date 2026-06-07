from fastapi import APIRouter
from app.schemas.investment import (
    CreateInvestment,
    AddTransaction
)

from app.services.investment_service import (
    create_investment,
    get_all_investments,
    get_investment,
    add_transaction
)

router = APIRouter()


@router.post("/")
async def create(data: CreateInvestment):

    investment_id = await create_investment(data)

    return {
        "investment_id": investment_id
    }


@router.get("/")
async def all_investments():

    return await get_all_investments()


@router.get("/{investment_id}")
async def investment(investment_id: str):

    return await get_investment(investment_id)


@router.post("/{investment_id}/transaction")
async def transaction(
    investment_id: str,
    data: AddTransaction
):

    await add_transaction(
        investment_id,
        data
    )

    return {
        "message": "Transaction Added"
    }