import { createHmac } from "crypto"

const hashKey = process.env.NEXTAUTH_SECRET as string
const hmac = createHmac('sha256', hashKey)

const hashToken = (token: string) => {
  return hmac.update(token).digest('hex')
}

export { hashToken }
