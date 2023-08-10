# react code challenge

To run the application locally you just have to have docker installed and follow the steps below.

1. Build the docker image

```sh
docker build -t todo:v1 .
```

2. Run a container

```sh
docker run -p 3000:3000 todo:v1
```