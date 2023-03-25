const amqplib = require("amqplib");

async function listen(nameSpace){
    try{
        let exchange = "logs"
        let connection = await amqplib.connect("amqps://vurtmyjz:vSayYwx_GEOY3BB8CF94vqfAlht_Ntbw@armadillo.rmq.cloudamqp.com/vurtmyjz");
        let channel = await connection.createChannel();
        process.on("SIGINT",async()=>{
            await channel.close();
            await connection.close();
        })
       await channel.assertExchange(exchange,"fanout",{durable:false});
       let {queue} =await channel.assertQueue("",{exclusive:true});
       await channel.bindQueue(queue,exchange,"");
       channel.prefetch(1);
       await channel.consume(queue,(msg) =>{
            console.log("[Listen_log] log [%s]: %s",nameSpace,msg.content.toString());
            setTimeout(() =>{
                channel.ack(msg);
            })
       })
    }catch(err){
        console.log(err.message);
    }
}

let nameSpace = process.argv[2] || "default";
listen(nameSpace);