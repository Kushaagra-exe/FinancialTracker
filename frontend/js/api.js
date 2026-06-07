const BASE_URL = "http://localhost:8000";

async function getDashboard() {
    const response = await fetch(
        `${BASE_URL}/dashboard/`
    );
    return await response.json();
}

async function getInvestments() {
    const response = await fetch(
        `${BASE_URL}/investments/`
    );
    return await response.json();
}

async function getInvestment(id) {
    const response = await fetch(
        `${BASE_URL}/investments/${id}`
    );
    return await response.json();
}

async function createInvestment(data) {
    const response = await fetch(
        `${BASE_URL}/investments/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return await response.json();
}

async function addTransaction(id, data) {
    const response = await fetch(
        `${BASE_URL}/investments/${id}/transaction/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return await response.json();
}

async function updateCurrentValue(
    id,
    currentValue
) {

    const response = await fetch(
        `${BASE_URL}/investments/${id}/current-value`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                current_value:
                    currentValue
            })
        }
    );

    return await response.json();
}