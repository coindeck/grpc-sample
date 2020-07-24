import express from 'express';
import {GreeterService, IGreeterServer, IGreeterService, IGreeterService_ISayHello} from "./protos/helloworld_grpc_pb";
import {HelloReply, HelloRequest, default as helloworld_pb} from "./protos/helloworld_pb";
import * as grpc from "grpc";
import {ServerUnaryCall} from "grpc";

const port = 5000;
const app = express();

app.get('/', (_req, res) => {
    res.end('Hello asdasd!');
});

/**
 * Implements the SayHello RPC method.
 */
class Greeter implements IGreeterServer {

    public sayHello(call: ServerUnaryCall<HelloRequest>, cb: any) {
        return new Promise((resolve, reject) => {

            const msgReply = new HelloReply();
            msgReply.setMessage("Hello "+call.request.getName());
            cb(null, msgReply);

        });
    }

}

app.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`Ready on port ${port}`);

    var server = new grpc.Server();

    server.addService(GreeterService, new Greeter());
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();

});
