const http = require('http');

function heavyCalculation() {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.sin(i) * Math.cos(i);
    }
    return result;
}

const server = http.createServer((req, res) => {
    // Perform the heavy calculation on each request
    const result = heavyCalculation();

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`Heavy calculation result: ${result}`);
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}/`);
});
