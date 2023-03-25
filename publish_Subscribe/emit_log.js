const amqplib = require("amqplib")

async function emit(msg){
    let connection;
    try{
        let exchange = "logs"
        connection = await amqplib.connect("amqps://vurtmyjz:vSayYwx_GEOY3BB8CF94vqfAlht_Ntbw@armadillo.rmq.cloudamqp.com/vurtmyjz");
        let channel = await connection.createChannel();
        await channel.assertExchange(exchange,"fanout",{
            durable:false
        })
        channel.publish(exchange,"",Buffer.from(msg))
        console.log("[emit] log: %s",msg);
        await channel.close();
    }catch(err){
        console.log(err.message);
    }finally{
        await connection.close();
    }
}

let msg = process.argv.slice(2).join(" ") || "hello";
emit(msg);