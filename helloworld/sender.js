const amqplib = require("amqplib");

async function sender(msg){
    let connecttion;
    try{
        connecttion = await amqplib.connect("amqps://vurtmyjz:vSayYwx_GEOY3BB8CF94vqfAlht_Ntbw@armadillo.rmq.cloudamqp.com/vurtmyjz");
        const channel = await connecttion.createChannel();
        let queue ="hello";
        await channel.assertQueue(queue,{
            durable:false
        })
        channel.sendToQueue(queue,Buffer.from(msg));
        console.log("[x] Send ",msg);
        await channel.close();
        // setTimeout(()=>{
        //     console.log("[x] Send ",msg);
        //     connect.close();
        //     process.exit(0);
        // },200)
    }catch(err){
        console.log(err.message)
    }finally{
        await connecttion.close();
    }
    
}
 
let message = process.argv.slice(2).join(" ");
sender(message || "hello world!");
