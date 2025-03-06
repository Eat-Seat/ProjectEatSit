package main

import (
	"fmt"
	"log"
	"net/http"

	_ "github.com/google/uuid" // Dependencia temporal
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello world!")
}

func main() {
	// Configuramos la ruta raíz para que use la función helloHandler
	http.HandleFunc("/", helloHandler)

	// Definimos el puerto en el que se ejecutará el servidor
	port := "8080"
	log.Printf("Servidor web iniciado en el puerto %s", port)

	// Iniciamos el servidor y mostramos un error si ocurre
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Error al iniciar el servidor: %v", err)
	}
}
