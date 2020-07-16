var PROTO_PATH = __dirname + '/../protos/helloworld.proto';
var grpc = require('grpc');
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

function main() {
    var client = new hello_proto.Greeter('localhost:50051',
        grpc.credentials.createInsecure());
    var user = 'world';


    console.log(new Date().getTime()+"."+new Date().getMilliseconds());
    client.sayHello({name: user}, function(err: any, response: any) {
        console.log(new Date().getTime()+"."+new Date().getMilliseconds());
        console.log('Greeting deine mutter:', response.message);

    });
}

main();