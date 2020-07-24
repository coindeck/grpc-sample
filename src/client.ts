//var PROTO_PATH = __dirname + '/../protos/helloworld.proto';
import {GreeterClient} from "./protos/helloworld_grpc_pb";
import {HelloReply, HelloRequest} from "./protos/helloworld_pb";

var grpc = require('grpc');


/*

var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
*/
async function main() {


    var client = new GreeterClient('localhost:50051',
        grpc.credentials.createInsecure());
    var user = 'world';




    const greeterRequest = new HelloRequest();
    greeterRequest.setName("Mein Name ist thoren");

    for (let i=0; i<5; i++) {
        await new Promise((resolve, reject) =>  {
            console.log(new Date().getTime()+"."+new Date().getMilliseconds());
            client.sayHello(greeterRequest, function(err: any, response: HelloReply) {
                console.log(new Date().getTime()+"."+new Date().getMilliseconds());
                console.log('Antwort vom Server:', response.getMessage());

                resolve(true);
            });
        })

    }
}

main();
