# Usa uma imagem base com Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Instala um servidor HTTP simples
RUN npm install -g http-server

# Expõe a porta 8080
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["http-server", "-p", "8080"]