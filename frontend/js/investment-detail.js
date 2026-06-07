const params =
    new URLSearchParams(
        window.location.search
    );

const investmentId =
    params.get("id");

async function loadInvestment() {

    let invested = 0;

    investment.transactions.forEach(t => {

        if(t.type === "BUY")
            invested += t.amount;

        if(t.type === "SELL")
            invested -= t.amount;
    });

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
    
    document.getElementById(
        "investedAmount"
    ).innerText = `₹${invested}`;
    
    document.getElementById(
        "currentValue"
    ).innerText =
        `₹${investment.current_value}`;
    
    document.getElementById(
        "profit"
    ).innerText =
        `₹${
            investment.current_value
            - invested
        }`;
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