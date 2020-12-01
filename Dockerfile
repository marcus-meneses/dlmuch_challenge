FROM node:12

#Create app folder
WORKDIR /usr/src/deliverymuch

#install dependencies

#copy package file
COPY package*.json ./

#run install
RUN npm install


#copy all files to docker image
COPY . .


#expose both development and production ports
EXPOSE 80
EXPOSE 3000


#command to run application
CMD ["node", "index.js"]
