FROM ubuntu:18.04

RUN apt-get update 																	

RUN apt-get install -y git nodejs npm wget

WORKDIR /home

ADD DEV /home/DEV
# RUN 	git clone https://github.com/SoftwareMaestro-Chaining/Chaining-Web-IDE

WORKDIR /home/DEV/remix-ide 	

# RUN git checkout block-ide-space

RUN npm install

RUN npm run prepublish

RUN npm run setupremix

# ENTRYPOINY npm start

EXPOSE 8080
