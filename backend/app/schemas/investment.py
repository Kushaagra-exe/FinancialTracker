from pydantic import BaseModel
from datetime import date

class UpdateCurrentValue(BaseModel):
    current_value: float

class Transaction(BaseModel):
    type: str
    amount: float
    date: date


class CreateInvestment(BaseModel):
    name: str
    initial_amount: float
    investment_date: date


class AddTransaction(BaseModel):
    type: str
    amount: float
    date: date