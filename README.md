# Archived Moved to: https://gitlab.com/1halfplusminus/skazy-test-project
## Skazy test project

### WITH DOCKER

```sh

docker-compose up

```

### WITHOUT DOCKER

```sh

npm install
chmod +x ./init.sh
docker-compose up  -d db
./init.sh

```
