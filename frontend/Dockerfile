# Берем образ с Node.js (версия Alpine самая маленькая и быстрая)
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы со списком зависимостей (package.json и package-lock.json)
COPY package*.json ./

# Устанавливаем все библиотеки (папку node_modules)
RUN npm install

# Копируем весь исходный код фронтенда в контейнер
COPY . .

# Собираем проект (превращаем React-код в статические файлы в папке /dist)
RUN npm run build

# Начинаем вторую стадию — берем сервер Nginx
FROM nginx:alpine

# Копируем нашу сборку из первой стадии в папку, из которой Nginx отдает файлы
COPY --from=build /app/dist /usr/share/nginx/html

# Сообщаем, что контейнер будет использовать стандартный 80-й порт
EXPOSE 80

# Запускаем Nginx (daemon off нужен, чтобы контейнер не закрылся сразу)
CMD ["nginx", "-g", "daemon off;"]