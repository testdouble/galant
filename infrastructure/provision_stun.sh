#!/bin/sh
# Set up build essentials (e.g. make, gcc), wget, and git.
yum update -y
yum install -y wget tmux
yum -y groupinstall "Development Tools"
export LD_LIBRARY_PATH=/usr/local/lib

# Install libre.
wget http://www.creytiv.com/pub/re-0.5.5.tar.gz
tar -xvzf re-0.5.5.tar.gz
(
  cd re-0.5.5
  make
  make install
)

# Install and start restund.
wget http://www.creytiv.com/pub/restund-0.4.12.tar.gz
tar -xvzf restund-0.4.12.tar.gz
(
  cd restund-0.4.12
  make
  make install
  make config
)

tmux new-session -d "restund"

# Install node from source.
wget https://nodejs.org/dist/v8.3.0/node-v8.3.0.tar.gz
tar -xvzf node-v8.3.0.tar.gz
(
  cd node-v8.3.0
  ./configure
  make
  make install
)

# Install and run signalmaster.
git clone https://github.com/andyet/signalmaster.git
(
  cd signalmaster
  npm install
  ./scripts/generate-ssl-certs.sh
)

tmux new-session -d "NODE_ENV=production node server.js"
