# flask-to-do

This is basic to-do app using flask + react + docker. To run this on local machine, follow these steps after cloning the repository. Assuming that docker & docker-compose are already configured on your machine. 

## Install npm dependencies
```
yarn install
```

###Start and load the front-end app from docker container. 
```
yarn run build
docker-compose up --build
```
You will be able to access the app on http://localhost:4000

###Run UI in webpack-dev-server & backend in docker container with image build.
```
docker-compose up --build
yarn run serve
```

You will be able to access the app on http://localhost:8080

Backend in Docker, without rebuilding the image
```docker-compose up```

Stop the project related docker containers
```docker-compose down```

Backend in Docker, without rebuilding the image with logs
```docker-compose up -d```

Show all running containers
```docker ps```

Show all containers
```docker ps -a```

Remove all stopped containers
```docker rm $(docker ps -a -q)```

Remove a running container
```docker rm -f e123```
