package main

import (
	"fmt"
	"math"
	"net/http"
)

// Define the heavy calculation function
func heavyCalculation() float64 {
	result := 0.0
	for i := 0; i < 1000000; i++ {
		result += math.Sin(float64(i)) * math.Cos(float64(i))
	}
	return result
}

func main() {
	// Define HTTP handler function
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Perform the heavy calculation on each request
		result := heavyCalculation()

		// Send response
		fmt.Fprintf(w, "Heavy calculation result: %f", result)
	})

	// Start the HTTP server
	port := ":4000"
	fmt.Printf("Server is running on http://127.0.0.1%s/", port)
	http.ListenAndServe(port, nil)
}
