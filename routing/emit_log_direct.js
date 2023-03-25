const amqplib = require("amqplib");
 
async function emit(type,message){
    let connection;
    try{
        const exchange_name = "logs_direct"
        connection = await amqplib.connect("amqps://vurtmyjz:vSayYwx_GEOY3BB8CF94vqfAlht_Ntbw@armadillo.rmq.cloudamqp.com/vurtmyjz");
        let channel = await connection.createChannel();
        await channel.assertExchange(exchange_name,"direct",{durable:false});
        channel.publish(exchange_name,type,Buffer.from(message));
        console.log("[emit_direct] logs: %s",message);
        await channel.close();
    }catch(err){
        console.log(err.message);
    }finally{
        await connection.close();
    }
}
let arrMsg = process.argv.slice(2);
let type = arrMsg.length > 0 ? arrMsg[0].trim().toLocaleLowerCase() : "info";
let message = arrMsg.slice(1).join(" ");
emit(type,message);