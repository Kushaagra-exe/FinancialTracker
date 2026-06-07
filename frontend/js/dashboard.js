async function loadDashboard() {

    const data = await getDashboard();

    let totalInvested = 0;
    let currentValue = 0;
    let netProfit = 0;

    const tbody =
        document.getElementById("dashboardTable");

    tbody.innerHTML = "";

    data.forEach(item => {

        totalInvested += item.invested_amount;
        currentValue += item.current_value;
        netProfit += item.net_profit;

        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.invested_amount}</td>
                <td>₹${item.current_value}</td>
                <td>${item.net_profit}</td>
                <td>${item.return_percentage}%</td>
            </tr>
        `;
    });

    document.getElementById("totalInvested")
        .innerText = `₹${totalInvested}`;

    document.getElementById("currentValue")
        .innerText = `₹${currentValue}`;

    document.getElementById("netProfit")
        .innerText = `₹${netProfit}`;

    document.getElementById("assetCount")
        .innerText = data.length;
}

async function saveInvestment() {

    const payload = {
        name: document.getElementById(
            "investmentName"
        ).value,

        initial_amount: parseFloat(
            document.getElementById(
                "investmentAmount"
            ).value
        ),

        investment_date:
            document.getElementById(
                "investmentDate"
            ).value
    };

    await createInvestment(payload);

    location.reload();
}

loadDashboard();