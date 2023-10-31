<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```




## Implementation
Start project:
  - Firstly, we need to change a source root in **nest-cli.json** file to folder "testing_code_example"
    ```
    yarn start:dev
    ```


File structure explanation:
  - constants.ts -> name of service will be inject
  - provider.ts -> where to create function to get the configuration data
  - type.ts -> where to declare options input with TypeScript
  - service.ts -> where to create function
  - module.ts -> where to export this service .

### Install zookeeper with docker
```
docker run --name some-zookeeper --restart always -d -p 2181:2181 zookeeper
```
Checking port:
```
telnet localhost 2181
```


[Zookeeper docker image](https://hub.docker.com/_/zookeeper)

Code notes:
- This is the way to get the timestamp from unique id
  ```
  // Parse the binary string to get a decimal number
    const numericValue = parseInt(
      timestamp41Bits.toString(2).padStart(41, '0'),
      2,
    );

    // Convert the numeric value to a timestamp
    const timestamp = new Date(numericValue).toISOString();
    console.log({
      timestamp: timestamp41Bits,
      binaryTime: timestamp41Bits.toString(2).padStart(41, '0'),
      afterCoverTime: timestamp,
    });
  ```

- Q&A:
  - Cover binary to number : can't decode to know the timestamp
  - nodeId:
    - if we use zookeeper node id is auto increase -> why we not use redis 
      => Just use zookeeper is case we need **guarantee the order** of of node 

    - we can set node id manually in the configuration file or using ip address or random function. However nodeId can be duplicate in some case and take time to setup.
  
  
    Specific error scenarios:
    ```
    we have two node servers:
    - Node 0 : 11111( time stamp ) + 0 ( machine id ) + 200 ( sequence )
    - Node 1:  11111  (time stamp ) + 1 (machine id)  + 100 ( sequence )
    ```
    The request in Node 1 is before Node 0, but if we compare two snowflake id in binary then Id of node 0 < Id of node 1
    => order of data is id of node 1 then id of node 0 
    => **my solution**: change order of hash: **unsigned + timestamp + sequence + nodeId **

      Then compare number with BigInt like this:
      ```
      let xzzv = BigInt('0110001011100001011110100001110101000001110001001000000000111100');
      let bzzv = BigInt('0110001011100001011110100001110101000001110001001000000000111101');
      ```

  - How many node of zookeeper server ???
    ```
    get ip address of zookeeper server
    docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' some-zookeeper

    install zookeeper client
    docker run -it --rm zookeeper zkCli.sh -server 172.17.0.2:2181

    check list with
    ls /
    ```

    Default time of session : 30 seconds
