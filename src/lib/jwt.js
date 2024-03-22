import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv({ path: '../../.env' })

// Generate Jwt token
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SESS_SECRET)
}
