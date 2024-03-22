import app from '../../app.js'
import dotenv from 'dotenv'
import prisma from '../config/database.js';

dotenv.config({
  path: '../../.env'
})
const port = process.env.PORT || 2070

const server = app.listen(port, () => {
  console.log(`🚀 Server ready at: http://localhost:` + port);
})

//database checked
try {
  await prisma.$connect();
  console.log("🛜  Connection to database established successfully");
} catch (error) {
  console.error("Unable to connect to database:", error);
}