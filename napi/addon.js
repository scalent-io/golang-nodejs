const http = require('http');
const addon = require('bindings')('addon.node')

const server = http.createServer((req, res) => {
    // Perform the heavy calculation on each request
    addon.heavyCalculation((err, result) => {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(`Heavy calculation result: ${result}`);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}/`);
});
