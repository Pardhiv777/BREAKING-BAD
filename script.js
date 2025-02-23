document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");

    if (page) {
        openPage(page);
    }
});

function openPage(page) {
    startEmpire()
    switch (page) {
        case "leaderboard":
            showLeaderboard();
            break;
        case "analytics":
            showAnalytics();
            break;
        case "operations":
            showOperations();
            break;
        case "empire":
            showDashboard();
            break;
        default:
            console.log("Unknown page parameter.");
    }
}

let revenue = 0, risk = 10, productionRate = 0, purityScore = 50;
let businessInterval, revenueChart, purityChart;
let isFugitiveMode = false; 

function toggleTheme() {
const body = document.body;
isFugitiveMode = !isFugitiveMode;
if (isFugitiveMode) {
body.classList.add("fugitive-mode");
} else {
body.classList.remove("fugitive-mode");
}
}

const locations = {
rv: {
name: "RV",
cost: "$10,000",
efficiency: "50%",
risk: "High"
},
superlab: {
name: "Superlab",
cost: "$100,000",
efficiency: "90%",
risk: "Low"
},
warehouse: {
name: "Warehouse",
cost: "$50,000",
efficiency: "70%",
risk: "Medium"
}
};

function startEmpire() {
document.querySelector(".btn").style.display = "none";
document.querySelector(".empire-dashboard").style.display = "block";
businessInterval = setInterval(updateBusinessStats, 2000);
}

function showDashboard() {
document.querySelector(".empire-dashboard").style.display = "none";
document.querySelector(".dashboard").style.display = "block";
document.querySelector(".back-btn").style.display = "block";
}

function showAnalytics() {
document.querySelector(".empire-dashboard").style.display = "none";
document.querySelector(".analytics").style.display = "block";
document.querySelector(".back-btn").style.display = "block";

if (!revenueChart) {
const ctx = document.getElementById("revenueChart").getContext("2d");
revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Revenue ($)',
            data: [],
            borderColor: '#33ff33',
            backgroundColor: 'rgba(51, 255, 51, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Revenue ($)' } }
        }
    }
});
}

if (!purityChart) {
const purityCtx = document.getElementById("purityChart").getContext("2d");
purityChart = new Chart(purityCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Purity Score (%)',
            data: [],
            borderColor: '#ff3333',
            backgroundColor: 'rgba(255, 51, 51, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Purity Score (%)' } }
        }
    }
});
}
}

function showOperations() {
document.querySelector(".empire-dashboard").style.display = "none";
document.querySelector(".operations").style.display = "block";
document.querySelector(".back-btn").style.display = "block";
resetLocationInfo();
}

function showLeaderboard() {
document.querySelector(".empire-dashboard").style.display = "none";
document.querySelector(".leaderboard").style.display = "block";
document.querySelector(".back-btn").style.display = "block";
updateTier();
}

function resetLocationInfo() {
document.getElementById("selectedLocation").innerText = "-";
document.getElementById("cost").innerText = "-";
document.getElementById("efficiencyInfo").innerText = "-";
document.getElementById("riskLevelInfo").innerText = "-";
}

function showLocationInfo(locationKey) {
const location = locations[locationKey];
document.getElementById("selectedLocation").innerText = location.name;
document.getElementById("cost").innerText = location.cost;
document.getElementById("efficiencyInfo").innerText = location.efficiency;
document.getElementById("riskLevelInfo").innerText = location.risk;
}

function checkRevenue() {
const img = document.getElementById("heisenberg");
if (revenue >= 200000) {
img.style.display = "block";
} else {
img.style.display = "none";
}
}

function updateTier() {
const currentTier = document.getElementById("currentTier");
if (revenue >= 250001) {
currentTier.innerText = "Heisenberg’s Empire";
} else if (revenue >= 75001) {
currentTier.innerText = "Gus’s Distribution Network";
} else {
currentTier.innerText = "Jesse’s Street-Level";
}
}

function toggleTheme() {
const body = document.body;
isFugitiveMode = !isFugitiveMode;
if (isFugitiveMode) {
body.classList.add("fugitive-mode");
} else {
body.classList.remove("fugitive-mode");
}
}

function goBack() {
// document.querySelector(".dashboard").style.display = "none";
// document.querySelector(".analytics").style.display = "none";
// document.querySelector(".operations").style.display = "none";
// document.querySelector(".leaderboard").style.display = "none";
// document.querySelector(".empire-dashboard").style.display = "block";
// document.querySelector(".back-btn").style.display = "none";
window.location.href="dashboard.html"
}

function updateBusinessStats() {
        let increase = Math.floor(Math.random() * 10000) + 5000;
        increase *= (purityScore / 100);
        revenue += increase;
        purityScore += Math.floor(Math.random() * 10) - 5;
        purityScore = Math.max(0, Math.min(100, purityScore));
        risk += (purityScore / 100) * 2;
        risk = Math.min(100, risk);
        document.getElementById("analyticsRevenue").innerText = `$${revenue}`;
        document.getElementById("riskLevel").style.width = `${Math.min(revenue / 3000, 100)}%`;
        checkRevenue();
        productionRate = Math.floor(Math.random() * 10) + 1;
        updateUI();
        updateChart();
        updatePurityChart();
        updatePurityScore(); 
    }

function updateUI() {
document.getElementById("revenue").innerText = `$${revenue}`;
document.getElementById("analyticsRevenue").innerText = `$${revenue}`;
document.getElementById("production").innerText = `${productionRate} kg/batch`;
document.getElementById("risk").innerText = risk > 75 ? "Critical" : risk > 50 ? "High" : risk > 25 ? "Medium" : "Low";
document.getElementById("riskLevel").style.width = `${risk}%`;
const warning = document.querySelector(".risk-warning");
if (risk > 75) {
warning.style.display = "block";
document.body.style.animation = "shake 0.5s ease-in-out infinite";
} else {
warning.style.display = "none";
document.body.style.animation = "none";
}
}

function updateChart() {
if (revenueChart) {
const now = new Date().toLocaleTimeString();
revenueChart.data.labels.push(now);
revenueChart.data.datasets[0].data.push(revenue);
revenueChart.update();
}
}

function updatePurityChart() {
if (purityChart) {
const now = new Date().toLocaleTimeString();
purityChart.data.labels.push(now);
purityChart.data.datasets[0].data.push(purityScore);
purityChart.update();
}
}

function updatePurityScore() {
        document.getElementById("purityScoreDashboard").innerText = `${purityScore}%`;
        document.getElementById("purityScoreAnalytics").innerText = `${purityScore}%`;
    }

function showCashAnimation() {
const cash = document.createElement("div");
cash.classList.add("cash-pile");
cash.innerText = "💵";
cash.style.left = `${Math.random() * 90 + 5}%`;
cash.style.top = "50%";
document.body.appendChild(cash);
setTimeout(() => cash.remove(), 1000);
}
