import dotenv from 'dotenv'

dotenv.config()

import { start } from "./server";

start(process.env.PORT || 3000)
