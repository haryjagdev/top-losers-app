# FROM node:12.18-alpine

# WORKDIR /app
# COPY package*.json ./

# RUN npm install  --silent

# COPY . .

# CMD ["npm", "start"]



FROM node:12.2.0-alpine as build

WORKDIR /app

# COPY package*.json ./
COPY . /app/

RUN npm install  --silent
RUN npm install react-scripts@3.0.1 -g -silent
# ENV PATH /app/node_modules/.bin:$PATH

RUN npm run build


FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# CMD ["npm", "start"]

