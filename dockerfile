############################
# Etapa de construcción (Build)
############################
FROM node:18-alpine AS build
WORKDIR /app


# Copia los manifiestos y aprovecha la cache de dependencias
COPY package.json .

# Instala dependencias según el gestor disponible
RUN npm install

# Copia el resto del código y construye
COPY . .





############################
# Etapa de producción (Runtime)
############################
FROM nginx:1.25-alpine AS runtime

# Copiamos el build al directorio público de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]