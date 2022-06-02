require('dotenv').config();
require('./database.js');
const Device = require('./models/devices');
const {PubSub} = require('@google-cloud/pubsub');
const http = require('http');
const server = http.createServer();
server.listen(process.env.PORT);
console.log("SERVIDOR EN EL PUERTO:  ", process.env.PORT);

let io = require("socket.io")(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"],
  }
});

var pubsub = new PubSub({
  projectId: 'testmqtt-325807',
});
var subscription = pubsub.subscription('projects/testmqtt-325807/subscriptions/tema-sub');
var messageHandler = function(message) {
  message.ack();
    
  if(message.attributes.subFolder !== "events"){
        
    let data1 = Buffer.from(message.data, 'base64').toString('ascii');
    console.log(message.attributes);

    try {
      const data = JSON.parse(data1);
      console.log(data);
      const payload = {
        data,
        date: new Date(message.publishTime)
      };
      io.emit(message.attributes.deviceId, payload);
      console.log("publicacion exitosa");
      try {   
      Device.findOneAndUpdate(
        { nameDevice: message.attributes.deviceId },
        { $push: { "data": payload }}
      ).then(() => {
        console.log("data saved db");
      }).catch((err) =>{
        console.log(err);
      });
      } catch(err){
        console.log(err);
      }
    }
    catch(err){
      console.log("el paquete no es un json");
    }
  }
  else {
    console.log("dispositivo conectado ==> ", message.attributes.deviceId);
  }
};
subscription.on('message', messageHandler);





