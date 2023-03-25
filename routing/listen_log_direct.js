const amqplib = require("amqplib");

async function listen(arrType =["INFO"]){
    try{
        const exchange_name = "logs_direct"
        let connection = await amqplib.connect("amqps://vurtmyjz:vSayYwx_GEOY3BB8CF94vqfAlht_Ntbw@armadillo.rmq.cloudamqp.com/vurtmyjz");
        let channel = await connection.createChannel();
        process.on("SIGINT",async() =>{
            await channel.close();
            await connection.close();
        })
        await channel.assertExchange(exchange_name,'direct',{durable:false});
        let {queue} = channel.assertQueue("",{exclusive:true});
        await Promise.all( arrType.map(async(type) => {
            await channel.bindQueue(queue,exchange_name,type)}
        ))
        channel.prefetch(1);
        console.log("[listen_direct] Starting......")
        channel.consume(queue,(message) =>{
            console.log(message.content.toString());
            setTimeout(()=>{
                channel.ack(message);
            },200)
        },{
            noAck:false
        })
    }catch(err){
        console.log(err.message);
    }
}
let arrType = process.argv.slice(2).map(type => type.trim().toLocaleLowerCase());
listen(arrType);