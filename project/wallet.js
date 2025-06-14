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