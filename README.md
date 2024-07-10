# SENAC_TaskManager

sudo https://nodejs.org/download/release/v14.17.0/node-v14.17.0-linux-x64.tar.xz
sudo tar -C /usr/local --strip-components 1 -xvf node-v14.17.0-linux-x64.tar.xz



docker build --no-cache -t taskglc_app .
docker run --name taskglc -p 3355:3355 --restart always -d taskglc_app 