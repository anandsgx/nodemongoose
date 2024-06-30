import mongoose from "mongoose";
import App from "./app";

export class Server {
    con: any;
    constructor() {}
    public connect = async () => {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/sample');
            console.log("*****************************     CONNECTED TO MONGO DB! :)     *****************************");
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    };
    
}
const app = new App(new Server());
app.listen();

























// public connect() {
    //     this.con = mongoose.createConnection('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
//     this.con.on('error', () => {
//         console.log('Failed to connect with Mongo DB :(');
//     })
//     this.con.once('open', () => {
//         console.log('Connection established with Mongo DB :)');
//     })
// }