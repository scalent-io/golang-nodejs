const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
console.log("Total CPUs: ", numCPUs)
function heavyCalculation() {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.sin(i) * Math.cos(i);
    }
    return result;
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers for each CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case, it is an HTTP server
  http.createServer((req, res) => {
    if (req.url === '/calc') {
      const result = heavyCalculation()  
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Heavy calculation result: ${result}`);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found\n');
    }
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}