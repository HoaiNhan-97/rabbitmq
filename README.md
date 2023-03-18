# RabbitMQ tutorial 
### 1. "Hello world"
#### RabbitMQ uses some jargon
- Producing sends message to queue <br>
<img src="./imgs/producer.png">
- A queue where producer send message to and consumer can receive message from <br>
<img src="./imgs/queue.png">
- consuming waits to receive message <br>
<img src="./imgs/consuming.png">
#### The diagram
"P" is producer and "C" is consumer. The box in the middle is a queue where RabbitMQ keep a message buffer.<br>
  <img src="./imgs/diagram01.png">
#### Sending 
<img src="./imgs/hello_Sending.png"> <br>
#### Receiving 
<img src="./imgs/hello_receiving.png">