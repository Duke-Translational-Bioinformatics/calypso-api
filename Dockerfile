FROM ubuntu:14.04

RUN apt-get update -y
RUN apt-get install -y curl
RUN apt-get install -y python
RUN curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
RUN apt-get install -y nodejs

RUN apt-get update -y
RUN apt-get install -y python-numpy 
RUN apt-get install -y python-scipy

# Installing pip manually because of bug with requests module.
RUN apt-get install -y wget
RUN apt-get install -y make
RUN wget https://bootstrap.pypa.io/get-pip.py && python get-pip.py
RUN pip install -U scikit-learn

RUN npm install -g n
RUN n 5.6

RUN npm install -g grunt
RUN apt-get install -y libpq-dev

ADD . /src
WORKDIR /src

RUN npm install
ENV PUBLIC_KEY_PATH=/src/keys/key.pub.pem
ENV PRIVATE_KEY_PATH=/src/keys/key.pem

CMD ["grunt", "serve:dist"]
