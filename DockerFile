# Imagen base de Deno 2.2.1
FROM denoland/deno:2.2.1

# Instalar Node.js y npm
RUN apt-get update && apt-get install -y nodejs npm

# Crear directorio de trabajo
WORKDIR /app

# Copiar todos los archivos al contenedor
COPY . .

# Instalar y compilar Angular usando npx
RUN cd frontend && npm install && npx ng build

# Cachear dependencias de Deno
RUN deno cache backend/routes/server.ts

# Puerto expuesto
ENV PORT=8080

# Comando de ejecución
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "--allow-write", "backend/server.ts"]
