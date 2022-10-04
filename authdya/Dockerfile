FROM node:alpine

#set working directory:
WORKDIR /app

#only copy the package.json file 
COPY package.json .

#intall all the dependencies:
RUN npm install --only=prod
 
#copy everything else from the project directory into the app folder.
COPY . .

#set the command to run when the image or the container forst starts up:
CMD ["npm", "start"]