import 'dotenv/config'

import { server } from './server'

if (!process.env.PORT_APP) {
    throw new Error('🔴 App port was not set')
}

const HOSTNAME = '0.0.0.0'
const PORT = Number(process.env.PORT_APP)

server.listen(PORT, HOSTNAME, () => {
    console.log(`🟢 Server running at http://${HOSTNAME}:${PORT}/`)
})
