---
title: "DOCKER NETWORKING PRACTICAL EXAMPLES"
date: "2020-11-15"
---

# DOCKER NETWORKING PRACTICAL EXAMPLES

A lot has been written about docker networking, but there is not a lot of practical examples out there.  
So I decided to try and make it a bit clearer how Docker networking works in practice.
---

Let us say we have _CLIENT_ app and _SERVER_ apps running locally on our computer without Docker.
These two applications run on your computers network and for example if 
you use IP or localhost or 127.0.0.1 you should be able to connect and access this app.

_CLIENT_ (localhost:3000) <=> _SERVER_(localhost:9000)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
_HOST_/COMPUTER (localhost:3000; localhost:9000)
        
Everything is working nicely. User can access _CLIENT_ on localhost:3000, and _CLIENT_ can 
access _SERVER_ API on port localhost:9000.

Now we want to Dockerize these two applications, and we want to be still able to access this 
_CLIENT_ and _SERVER_ from _HOST_ (local newtwork) and docker containers. 

And here the saga begins ... 
By default, Docker uses its own network, so we can no longer point _CLIENT_ to _SERVER_ on localhost:9000. 
Each container will have its own IP and each container has to be configured in a way that applications port is accesible. 
So let us look at a couple of solutions we can use to solve this mystery.
---

### NAMED NETWORK
First, we should be aware of current docker networking:  
    `docker network ls`  
    `docker network inspect <network name>`  
    `docker inspect <container id>`  
    
        #add an image of a screenshot here
        
        
Ok, in this example we can see that the docker image is running on 172.19.0.x.   
So our _CLIENT_ in new Docker image should point to 172.19.0.x:9000.  
Here comes a catch. This docker IP is dynamic, it might change. 
To get around that, we can do the following: 
- `docker network create --driver=bridge next-net` we have to create a new user-defined network. Bear in mind named bridge network is not the same as default bridge network, 
it has automatic DNS resolution...  
- `docker run -d --name=next-blog-api --net=next-net -p 8888:9000 next-blog-api`  
- `docker run -d --net=next-net -p 3002:3000 next-blog`  

Here we created a new network and linked our container to them. In Docker when you create or run a container using Docker create or docker run, it does not publish any of its ports to the outside world.   
There is a couple of things we need to be aware regarding Dockerfile and docker `run` command:
- when you `EXPOSE` a port Dockerfile, the service in the container is not accessible from outside Docker, but from inside other Docker containers
- and when you EXPOSE and use `docker run -p ...` flag, the service in the container is accessible from anywhere, even outside Docker
That means that we need to first add a line to Dockerfile with `EXPOSE 3000`, assuming that we are running the the app inside on port 3000. 

Now we should be able to connect Dockerized _CLIENT_ to Dockerized _SERVER_ API on http://next-blog-api:9000.  
Bear in mind that also code in our _CLIENT_-app we should point to the right URL based on where we run it (locally, in standalone container, swarm ...). It is best to have some logic which provides the URL dynamically or even better way, pass it in as a parameter.  
Now dockerized _SERVER_ and client will also be available on the _HOST_ from http://localhost:3002 and http://localhost:8888.
    
    (Docker 172.19.0.3:3002/3000 (_CLIENT_ (172.19.0.3:3000)) <=> (Docker 172.19.0.2:8888/9000 (_SERVER_(172.19.0.2:9000)))  
                            _HOST_(localhost:3002; localhost:8888)

### _HOST_ NETWORK (ONLY FOR LINUX)
Another solution would be we to run Docker on the host network. Here again, we have a couple of gotchas: 
- published ports are discarded when using host network mode (we can't specify a different port for that container. we cant use for e.g. `-p 9001:9000` )
- it works only on Linux 
- container will take the namespace and port of the host 
	- `docker run -d --network=host next-blog-api`  
	- `docker run -d --net=host next-blog`  

    _CLIENT_ (localhost:3000) <=> _SERVER_(localhost:9000)  
        _HOST_ (localhost:3000; localhost:9000)
        
### LINKS (FOR DOCKER ENGINES BEFORE 1.9 VERSION) 
In case you are running version of Docker before 1.9 and you should manually create links between the containers (using the legacy --link flag). 
These links need to be created in both directions, so you can see this gets complex with more than two containers which need to communicate. 
Alternatively, you can manipulate the /etc/hosts files within the containers, but this creates problems that are difficult to debug.
---
We can see that there are quite a few solutions. First one being optimal, but it depends on your scenario which one you might find better.


## TESTING/PRODUCTION
In testing/production, we would most likely use some orchestration tool like Docker-swarm or Kubernetes, where Docker images would 
communicate over the overlay networks.   
I will not go into details of configuring the host servers since there are too many scenarios and variables we could take into consideration. 
But on generally there is a couple of guidelines we could follow:
- First, we have to make sure that correct ports are open and nothing is blocking them and networking on the host is :
- enable forwarding from Docker containers to the outside world (that is on the Linux host machine)
- You need the following ports open to traffic to and from each Docker host participating on an overlay network:
            - TCP port 2377 for cluster management communications
            - TCP and UDP port 7946 for communication among nodes
            - UDP port 4789 for overlay network traffic 
 - ...
    
## TROUBLESHOOTING
There's loads of different scenarios where we could have an issue connecting Containers. 
So it is best to know how do some general Docker networking troubleshooting.  
We can troubleshoot docker network with the following commands:   
    `docker network ls`  
    `docker network inspect <network name>`  
    `docker inspect <container id>`  

It can also be useful to create a new image and run some networking commands:
```
echo '
FROM ubuntu:16.04
RUN apt update && apt install -y arp-scan iputils-ping iproute2
CMD ["/bin/bash"]' > Dockerfile
docker build . -t net-tool
docker run -it net-tool
ip addr show #run inside of container
arp-scan --interface=eth0 --localnet #run inside of container
```

If you have any better troubleshooting solutions feel free to post it in the comments. 
    
And that is all folks. Happy dockering!!!
