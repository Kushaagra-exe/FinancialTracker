from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.investments import (
    router as investment_router
)

from app.api.dashboard import (
    router as dashboard_router
)

app = FastAPI(
    title="Finance Tracker API"
)

app.include_router(
    investment_router,
    prefix="/investments",
    tags=["Investments"]
)

app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)