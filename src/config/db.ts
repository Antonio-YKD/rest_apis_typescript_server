import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import Product from '../models/Product.model.js'
dotenv.config()


const db = new Sequelize(process.env.DATABASE_URL!, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    models: [Product],
    logging: false
})


export default db