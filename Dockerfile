FROM alpine:latest
WORKDIR /home/tester
RUN apk update
RUN apk add bash 
SHELL ["/bin/bash", "-c"]
# this package is required for nodejs separatelly, if special (obsolete)  charcodes are needed
#RUN apk add icu-data-full 

RUN apk add nodejs 
RUN apk add npm  

# must be on one line, otherwise it replaces previous
RUN npm install jsdom jquery 
WORKDIR /home/tester/test_module_base

CMD [ "bash" ]
