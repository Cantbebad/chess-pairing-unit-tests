FROM alpine:latest
WORKDIR /home/tester
RUN apk update
RUN apk add bash 
SHELL ["/bin/bash", "-c"]
RUN apk add python3 # was needed for nodeenv, but now can be removed 
RUN apk add icu-data-full # this package is required for nodejs separatelly
RUN apk add nodejs # this does not add the latest nodejs, only the latest one in alpine
RUN apk add npm  # nodejs package manager
RUN npm install jsdom jquery # must be on one line, otherwise it replaces previous
COPY ./test_module_base/ ./test_module_base/
COPY ./test_no_module_base/ ./test_no_module_base/
COPY ./package.json ./package.json
#COPY chess-pairing-dev.tar.gz .
#WORKDIR /home/tester/dev
#RUN tar -xzvf ../chess-pairing-dev.tar.gz 
WORKDIR /home/tester/test_module_base

CMD [ "bash" ]
