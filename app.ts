import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { env } from './env';
import { Server } from './server';
import userRoutes from './api/routes/user.route';



class App {
    public app: express.Application;
    PORT = new env().getPort();
    corsOptions = {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        preflightContinue: true,
        maxAge: 600,
    };

    constructor(private server: Server) {
        this.app = express();
        this.app.use(express.json());
        this.app.set('env', env);
        this.app.set("view engine", "ejs");
        this.app.options('*', cors(this.corsOptions));
        this.app.use(cors(this.corsOptions));
        this.app.use("/v1", userRoutes);
        this.app.get('/', (req: any, res: any) => {
            res.setHeader('Content-Type', 'text/html')
            res.end('<h1>Hello World</h1>')
        });
        this.initializeMiddlewares();
        // this.initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(new env().PORT, () => {
            console.log(`                               App listening on the port ${new env().PORT}                                              `);
            this.connectToTheDatabase();
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    public connectToTheDatabase() {
        this.server.connect();
    }
}

export default App;
