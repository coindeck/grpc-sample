import express from 'express';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const port = 5000;
const app = express();

app.get('/', (_req, res) => {
    res.end('Hello asdasd!');
});

var PROTO_PATH = __dirname + '/../protos/helloworld.proto';

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call: any, callback: any) {

    callback(null, {message: 'Hello ' + call.request.name});

}

app.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`Ready on port ${port}`);

    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();

});
