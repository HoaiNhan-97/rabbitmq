const amqplib = require("amqplib");

async function worker(nth){
    try{
        let connection = await amqplib.connect("amqps://vurtmyjz:vSayYwx_GEOY3BB8CF94vqfAlht_Ntbw@armadillo.rmq.cloudamqp.com/vurtmyjz")
        let channel = await connection.createChannel();
        process.on("SIGINT",async()=>{
            await channel.close();
            await connection.close();
        })
        let queue = "Tasks";
        await channel.assertQueue(queue,{
            durable:true // a message can survive a rabbitmq node restart
        });
        channel.prefetch(1);

        channel.consume(queue,(msg)=>{
            console.log("[x] Done by %s: ",nth,msg.content.toString());
            setTimeout(()=>{
                channel.ack(msg); // telling rabbitmq is a particular message has been received, processed and rabbitmq free to delete it
            },100)
        },{
            noAck:false 
        })
    }catch(err){
        console.log(err.message);
    }
}
let nth = process.argv.splice(2).join("");
worker(nth || 1);