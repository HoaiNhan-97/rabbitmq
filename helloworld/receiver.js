const amqplib = require("amqplib");


async function receiver(){
    try{
        let connection = await amqplib.connect("amqps://vurtmyjz:vSayYwx_GEOY3BB8CF94vqfAlht_Ntbw@armadillo.rmq.cloudamqp.com/vurtmyjz");
        let channel = await connection.createChannel();
        process.on("SIGINT",async ()=>{
            await channel.close();
            await connection.close();
        })
        let queue = "hello";
        await channel.assertQueue(queue,{durable:false});
        console.log("[x] waitting for message in %s . To exit press ctrl+C",queue);

        await channel.consume(queue,(msg)=>{
            console.log(msg.content.toString());
         },{noAck:true})

    }catch(err){
        console.log("error =>>>>>>>",err.message);
    }
}
receiver();