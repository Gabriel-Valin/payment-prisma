FROM node:latest

# directory docker for create image and contents/resources
WORKDIR /usr/app

# copying package.json to docker (responsible for download packages now)
COPY package.json ./

# running npm install for install
# not all images come with yarn, just use npm
RUN npm install

# copying all contents in folder /usr/app
COPY . .

# exposing port of application for use
EXPOSE 3333

# say to cmd in docker the command to run application
CMD ["npm", "run", "dev"]