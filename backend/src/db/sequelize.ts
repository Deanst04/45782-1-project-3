import { Sequelize } from "sequelize-typescript";
import config from 'config'
import User from "../models/User";
import Vacation from "../models/Vacation";
import Follow from "../models/Follow";

const sequelize = new Sequelize({
    ...config.get('db'), 
    dialect: 'mysql',
    models: [User, Vacation, Follow],
    logging: console.log
})

export default sequelize
