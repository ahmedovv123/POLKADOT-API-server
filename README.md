# polkadot-explorer

## Setup with NPM
``` bash
# clone repo
git clone https://github.com/ahmedovv123/polkadot-explorer.git
cd polkadot-explorer

# install dependencies
npm install

# run
npm run server
```
## Setup with Docker (Recommended)
``` bash
# clone repo
git clone https://github.com/ahmedovv123/polkadot-explorer.git
cd polkadot-explorer

# Set synchronisation folder of blocks. Edit docker-compose.yml
 volumes:
      - </your/location/>:/polkadot


# run containers
docker-compose up
```
