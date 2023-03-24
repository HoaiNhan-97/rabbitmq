const amqplib = require("amqplib");


async function newTask(msg){
    let connection
    try{
        connection = await amqplib.connect("amqps://vurtmyjz:vSayYwx_GEOY3BB8CF94vqfAlht_Ntbw@armadillo.rmq.cloudamqp.com/vurtmyjz");
        let channel = await connection.createChannel();
        let queue="Tasks"
        await channel.assertQueue(queue,{
            durable:true // messages can survive a rabbitmq note restart
        })
        channel.sendToQueue(queue,Buffer.from(msg),{
            persitent:true // tell rabbitmq save a message to disk
        })
        console.log("[x] message: ",msg);
        await channel.close()
        // setTimeout(()=>{
        //     connection.close();
        //     process.exit(0);
        // },200)
        
    }catch(err){
        console.log(err.message);
    }finally{
        await connection.close();
    }
}
let message = process.argv.splice(2).join(" ");
newTask(message);