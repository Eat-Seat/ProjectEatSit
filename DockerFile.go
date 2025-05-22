# Etapa 1: compilación de Go
FROM golang:1.21 AS builder

WORKDIR /app
COPY main.go go.mod go.sum ./
RUN go mod download
RUN go build -o main main.go

# Etapa 2: contenedor final más liviano
FROM alpine:3.18

WORKDIR /app
COPY --from=builder /app/main .

EXPOSE 8080
CMD ["./main"]
