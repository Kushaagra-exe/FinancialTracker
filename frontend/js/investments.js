async function loadInvestments() {

    const investments =
        await getInvestments();

    const container =
        document.getElementById(
            "investmentCards"
        );

    investments.forEach(item => {

        container.innerHTML += `
        
        <div class="col-md-3">

            <div class="card investment-card">

                <div class="card-body">

                    <h4>${item.name}</h4>

                    <button
                    class="btn btn-primary mt-3"
                    onclick="openInvestment('${item.id}')">

                    Open

                    </button>

                </div>

            </div>

        </div>
        `;
    });
}

function openInvestment(id) {

    window.location.href =
        `investment-detail.html?id=${id}`;
}

loadInvestments();