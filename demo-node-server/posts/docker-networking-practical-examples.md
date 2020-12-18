---
title: "DOCKER NETWORKING PRACTICAL EXAMPLES"
date: "2020-11-15"
---

# DOCKER NETWORKING PRACTICAL EXAMPLES

A lot has been written about Docker networking, but there is not a lot of practical examples out there.  
So I decided to try and make it a bit clearer and explain a couple of Docker networking examples in practice.
Note: this blog is referring to Docker version 19.03.13.
---
## QUICK OVERVIEW OF DOCKER NETWORKING

First, let us have a quick overview of [Docker networking](https://docs.docker.com/network/).  
Docker has different networking drivers:  
- `bridge`: the default network driver  
- `host`: for standalone containers  
- `overlay`: Used in Docker swarm
- `macvlan`: Works on MAC addresses assigned to containers.
- `none`: Networking is disabled
- Network plugins: Third-party network plugins with Docker.
    
Here we will mainly focus on bridge networking driver since it allows us to connect two or more containers together and it gives us the most flexibility/functionality in terms of networking.  
I will not go into the details of Docker networking. It is quite well documented in Docker [documentation](https://docs.docker.com/network/bridge/).
Here I will just quickly summon up a couple of points.  

**Port Publishing**  
When you create or run a container, Docker by default does not publish any of its ports to the host network. 
To achieve that we need to publish the ports with `--publish` or `-p` flag. This will create a firewall rule which maps a container port to a port on the host network. 

**IP address and hostname**  
Each container gets an IP address in every Docker network it is attached to.  The Docker daemon has its own DHCP server which is in charge of assigning the IP's from the subnet range.
Each network also has a default subnet mask and gateway.

By default, when a container starts, it can be connected to only one network with `--network` flag. We can also assign it either IPv4 or IPv6 address with `--ip` or `--ip6` flags.  
Later, we attach container to different networks with:   
`docker network connect [OPTIONS] NETWORK CONTAINER`.   

**DNS services**  
A Docker container inherits the DNS settings of the host, from `/etc/resolv.conf` configuration file.  
Containers that use the default bridge network get a copy of this file, 
whereas containers that use a custom/named network use Docker's embedded DNS server,
which forwards external DNS lookups to the DNS servers configured that custom/named docker network.

<!--
Custom hosts defined in /etc/hosts are not inherited. To pass additional hosts into your container, 
refer to add entries to the container hosts file in the docker run reference documentation. 
You can override these settings on a per-container basis.  
-->

A container's hostname is by default the container's ID in Docker. 
We can override it with `--hostname` or use the `--alias` flag to specify an additional network alias for the container on that network.  
 
There are also certain limitations on each of the operating systems which we need to be aware of:
- [MacOS](https://docs.docker.com/docker-for-mac/networking/)
- [Windows](https://docs.docker.com/docker-for-windows/networking/) 
    
## PRACTICAL EXAMPLES
Let us take as an example a most common scenario with two interacting services (_CLIENT_ and _SERVER_) running locally on our computer without Docker. Here we focus on only two containers but we can easily apply the same configuration to additional services.  

While these two services run on your computers network, they can communicate over a local _HOST_ network (localhost or 127.0.0.1
) as seen in the below image

_CLIENT_ (localhost:3000) <=> _SERVER_(localhost:9000)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
_HOST_/COMPUTER (localhost:3000; localhost:9000)
        
On our `localhost`, user can access _CLIENT_ on localhost:3000, and _CLIENT_ can 
access _SERVER_ API on port localhost:9000.

Now we want to Dockerize these two applications, and here, the story begins ... 

By default, Docker uses its own network, so we can no longer point _CLIENT_ to _SERVER_ on localhost:9000. 
Each container will have its own IP, and each container has to be configured in a way that services can still be accessible. 
So let us look at a couple of solutions we can use to solve this mystery.
---

### NAMED NETWORK  
Docker by default uses **bridge** networking subsystem. When a service starts in the docker container, it will be in that network, unless specified differently.  

Containerized application/service can no longer point to localhost/127.0.0.1.
Docker will start containers with, for example 172.17.0.x.   
So our _CLIENT_ in new Docker image should point to for example 172.17.0.2:9000.  
Here comes a catch. The 172.17.0.2 IP address is internal to the Docker engine. 
This IP is dynamic, and it might change. Also, we need to update or make it configurable where our services are pointing to (for, e.g. database connections, REST API's...) 
To get around that, we can do the following: 
- `docker network create --driver=bridge next-net` we have to create a new user-defined network. 
Bear in mind named bridge network is not the same as the default bridge network, it has automatic DNS resolution...
- `docker run -d --name=next-blog-api --net=next-net -p 8888:9000 next-blog-api`  start the _SERVER_ with mapped port (our service is running on port 9000 inside of the container) and we give it a name, so a random name is not allocated to that container
- `docker run -d --net=next-net -p 3002:3000 next-blog`  start the _client_ on the same network (service inside of this container should now be pointing to http://next-blog-api:9000)

Here we created a new network and linked our containers to them. We used "named bridge network" which creates a DNS record for next-blog-api.
Now we are able to connect Dockerized _CLIENT_ to Dockerized _SERVER_ API on http://next-blog-api:9000.  
And dockerized _SERVER_ and client will also be available on the _HOST_ from http://localhost:3002 and http://localhost:8888.
    
    (Docker 172.19.0.3:3002/3000 (_CLIENT_ (172.19.0.3:3000)) <=> (Docker 172.19.0.2:8888/9000 (_SERVER_(172.19.0.2:9000)))  
                            _HOST_(localhost:3002; localhost:8888)

There is a couple of things we need to be aware regarding Dockerfile and docker `run` command:

- in Dockerfile when you `EXPOSE` a port, that signals to a hosting service that it needs to bind to this port to access the service running inside. 
For example, if we do not `EXPOSE` port, platform like Azure might assume that application inside is running on default web port 80, which will cause connection failure.

- and when you use `docker run -p ...` flag, that makes it accessible outside of Docker network



### _HOST_ NETWORK (ONLY FOR LINUX)
Another solution would be we to run Docker on the host network. This is not the best solution since the host network is meant mainly for standalone containers, but it is still good to be aware of it. 
Here again, we have a couple of gotchas: 
- published ports are discarded when using host network mode (we can't specify a different port for that container. We can't map ports as we did in bridge network with `-p 9001:9000`.
- it works only on Linux as stated [here](https://docs.docker.com/network/host/)
- container will take the namespace and port of the host 
   - `docker run -d --network=host next-blog-api`  
   - `docker run -d --net=host next-blog`  

    _CLIENT_ (localhost:3000) <=> _SERVER_(localhost:9000)  
        _HOST_ (localhost:3000; localhost:9000)
        
### LINKS (FOR DOCKER ENGINES BEFORE 1.9 VERSION) 
In case you are running a version of Docker before 1.9, and you should manually create links between the containers (using the legacy --link flag). 
These links need to be created in both directions, so you can see this gets complex with more than two containers which need to communicate. 
Alternatively, you can manipulate the /etc/hosts files within the containers, but this creates problems that are difficult to debug.
e.g.: 
`docker run -d -p 3002:3000 next-blog`
`docker run -d -p 8888:9000 next-blog-api --link=next-blog:next-blog`
---
---
---
We can see that there are quite a few solutions. First one being optimal, but it depends on your scenario which one will work for you.
Also, in testing/production environments, we would most likely use some orchestration tool like Docker-swarm or Kubernetes, where Docker images would communicate over the overlay networks. 
I will not go into details of configuring the managed Docker network, but on generally there is a couple of guidelines we could follow to avoid having connection issues:
- we have to make sure that correct ports are open and nothing is blocking them 
- enable forwarding from Docker containers to the outside world (that is on the Linux host machine)
- You need the following ports open to traffic to and from each Docker host participating on an overlay network:
            - TCP port 2377 for cluster management communications
            - TCP and UDP port 7946 for communication among nodes
            - UDP port 4789 for overlay network traffic 
 - ...

## TROUBLESHOOTING
There can be loads of different scenarios where we could have an issue connecting containers. 
So it is best to know how to do some general Docker networking troubleshooting.  
We can troubleshoot docker network with the following commands:   
    
- `docker network ls` will display a list of currently defined networks
- `docker network inspects <network name>`  will give us details (IP's, gateways, subnets) of the specific network.
- `docker inspect <container id>`  will give us details of the specific container (including networking details)
    
        #add an image of a screenshot here

It can also be useful to create a "debug container" and run some networking commands:
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

If you have any better troubleshooting solutions, feel free to post it in the comments. 
    
And that is all folks. Happy dockering!!!
