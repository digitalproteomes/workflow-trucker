## Readme file


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
