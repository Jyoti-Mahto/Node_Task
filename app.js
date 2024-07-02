import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import conn from './db.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('', authRoutes);

app.listen(PORT, async () => {
  await conn.connect(async ()=>{
  console.log("successfully connected to database")
  })
  console.log(`Server is running on port ${PORT}`);
});
