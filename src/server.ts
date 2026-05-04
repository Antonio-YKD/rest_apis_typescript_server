import express  from "express";
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swaggerSpec.js'
import router from "./router.js";
import db from "./config/db.js";

async function connectDB() {
    try {
        await db.authenticate()
        //console.log( colors.magenta("Conexion exitosa con la base de datos"));
    db.sync();
    } catch (error) {
       // console.log(colors.red.bold('Hubo un error al conectar con la base de datos'),error)
    }
}
connectDB();

const server = express();


const corsOptions: CorsOptions = {
  origin(origin, callback) {
    console.log("ORIGIN:", origin);

    if (!origin) return callback(null, true);

    const allowed = process.env.FRONTEND_URL;

    const normalize = (url: string) => url.replace(/\/$/, "");

    if (normalize(origin) === normalize(allowed!)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
};

server.use(cors(corsOptions));

server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server;