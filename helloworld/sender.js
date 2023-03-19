const amqplib = require("amqplib");

async function sender(msg){
    try{
        const connect = await amqplib.connect("amqps://vurtmyjz:vSayYwx_GEOY3BB8CF94vqfAlht_Ntbw@armadillo.rmq.cloudamqp.com/vurtmyjz");
        const channel = await connect.createChannel();
        let queue ="hello";
        channel.assertQueue(queue,{
            durable:false
        })
        channel.sendToQueue(queue,Buffer.from(msg));
        setTimeout(()=>{
            console.log("[x] Send ",msg);
            connect.close();
            process.exit(0);
        },200)
    }catch(err){
        console.log(err.message)
    }
    
}
 
let message = process.argv.slice(2).join(" ");
sender(message || "hello world!");
