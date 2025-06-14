const cryptoList = document.getElementById("crypto-list");
const searchInput = document.getElementById("search");

// Fetch cryptocurrency data
async function fetchCryptos() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const data = await response.json();
    displayCryptos(data);
}

// Display list of cryptocurrencies
function displayCryptos(cryptos) {
    cryptoList.innerHTML = ""; // Clear previous results
    cryptos.forEach(crypto => {
        const card = document.createElement("div");
        card.className = "crypto-card";
        card.innerHTML = `
            <img src="${crypto.image}" alt="${crypto.name}" width="50">
            <h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
            <p>Price: $${crypto.current_price.toFixed(2)}</p>
        `;
        card.addEventListener("click", () => displayCryptoDetails(crypto.id));
        cryptoList.appendChild(card);
    });
}

// Search functionality
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".crypto-card");
    cards.forEach(card => {
        const name = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = name.includes(searchTerm) ? "block" : "none";
    });
});

// Fetch data on page load
fetchCryptos();