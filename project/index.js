document.addEventListener("DOMContentLoaded", function () {
    let darkbtn = document.getElementById("icon");
    const body = document.body;

    // Enable Dark Mode
    function enableDarkMode() {
        body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
        if (darkbtn) darkbtn.src = "./sun_2499481.png";
    }

    // Disable Dark Mode
    function disableDarkMode() {
        body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
        if (darkbtn) darkbtn.src = "./moon_2499480.png";
    }

    // Check local storage for dark mode setting
    if (localStorage.getItem("dark-mode") === "enabled") {
        enableDarkMode();
    }

    // Toggle Dark Mode on button click
    if (darkbtn) {
        darkbtn.addEventListener("click", () => {
            if (body.classList.contains("dark-mode")) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
});


// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install MetaMask!');
}

// Connect to the wallet
document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        document.getElementById('account').innerText = `Connected account: ${account}`;
        
        // Get balance
        await getBalance(account);
    } catch (error) {
        console.error('Error connecting to wallet:', error);
    }
});

// Function to get the balance of the connected account
async function getBalance(account) {
    const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest']
    });
    const balanceInEth = parseFloat(balance) / Math.pow(10, 18); // Convert from Wei to Ether
    document.getElementById('balance').innerText = `Balance: ${balanceInEth} ETH`;
}

// Function to send a transaction
async function sendTransaction(to, amount) {
    const transactionParameters = {
        to: to, // The address to send to
        from: ethereum.selectedAddress, // The address of the connected account
        value: '0x' + (amount * Math.pow(10, 18)).toString(16), // Convert amount to Wei
    };

    try {
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        console.log('Transaction hash:', txHash);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // ... existing dark mode and MetaMask code ...

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
            // If you have a displayCryptoDetails function, otherwise remove this line
            // card.addEventListener("click", () => displayCryptoDetails(crypto.id));
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
});