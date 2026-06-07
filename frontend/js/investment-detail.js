const params =
    new URLSearchParams(
        window.location.search
    );

const investmentId =
    params.get("id");

async function loadInvestment() {

    const investment =
        await getInvestment(
            investmentId
        );

    document.getElementById(
        "investmentName"
    ).innerText = investment.name;

    const tbody =
        document.getElementById(
            "transactionTable"
        );

    investment.transactions.forEach(t => {

        tbody.innerHTML += `
        
        <tr>

            <td>${t.type}</td>
            <td>₹${t.amount}</td>
            <td>${t.date}</td>

        </tr>
        `;
    });
}

async function saveTransaction() {

    const payload = {

        type:
            document.getElementById(
                "transactionType"
            ).value,

        amount: parseFloat(
            document.getElementById(
                "transactionAmount"
            ).value
        ),

        date:
            document.getElementById(
                "transactionDate"
            ).value
    };

    await addTransaction(
        investmentId,
        payload
    );

    location.reload();
}

loadInvestment();