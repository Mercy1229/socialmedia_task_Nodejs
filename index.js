import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import router from './routes/user.js'
import ConnectToDB from './config/database.js'

const app = express()
dotenv.config({ path: path.join(process.cwd(), 'config', 'config.env') })

ConnectToDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} ...`);
});