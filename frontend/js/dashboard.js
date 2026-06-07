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

        <td>
        <a
        href="investment-detail.html?id=${item.id}">
        ${item.name}
        </a>
        </td>

        <td>₹${item.invested_amount}</td>

        <td>₹${item.current_value}</td>

        <td>₹${item.net_profit}</td>

        <td>${item.return_percentage}%</td>

        <td>

        

        <button
        class="btn btn-warning btn-sm"
        onclick="showCurrentValuePopup(
        '${item.id}',
        ${item.current_value}
        )">

        Update Value

        </button>

        

        </td>

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

let selectedInvestmentId;

function showCurrentValuePopup(
    id,
    currentValue
){

    selectedInvestmentId = id;

    document.getElementById(
        "currentValueInput"
    ).value = currentValue;

    new bootstrap.Modal(
        document.getElementById(
            "valueModal"
        )
    ).show();
}

async function saveCurrentValue(){

    const value = parseFloat(
        document.getElementById(
            "currentValueInput"
        ).value
    );

    await updateCurrentValue(
        selectedInvestmentId,
        value
    );

    location.reload();
}


loadDashboard();