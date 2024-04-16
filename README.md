# Web Server Performance Comparison

## Purpose
This codebase is created to compare the performance of web servers implemented in Golang and Node.js. The comparison includes three different setups:
1. Golang web server
2. Node.js web server without worker clustering
3. Node.js web server with worker clustering

The goal is to analyze and benchmark the performance differences between these implementations under varying levels of load.

## Load Test Setup
To run load tests on your machine, follow these steps:

### Prerequisites
Make sure you have the following installed on your system:
- Golang
- Node.js
- ab (Apache benchmark tool for running benchmarks)

### Steps
1. Clone this repository to your local machine.
2. Navigate to the root directory of the repository.

#### Run Golang Web Server on port No 4000
```sh
$ cd golang
$ go run main.go
```

#### Run NodeJs Web Server(Without Workers) on port No 3000
```sh
$ cd nodejs
$ node index.js
```

#### Run NodeJs Web Server(With Worker Cluster) on port No 8000
```sh
$ cd nodejs
$ node index.js
```



### Running Load Tests
Close all running applications, then run the following commands to run load test on each web server
```sh
Load Test on Golang Webserver
$ ab -n 2000 -c 50 http://127.0.0.1:4000/
Load Test on NodeJs Webserver(Without Worker)
$ ab -n 2000 -c 50 http://127.0.0.1:3000/
Load Test on NodeJs Webserver(With Worker Cluster)
$ ab -n 2000 -c 50 http://127.0.0.1:8000/calc
```
