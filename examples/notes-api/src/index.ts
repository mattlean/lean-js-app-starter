import 'dotenv/config'

import { server } from './server'

if (!process.env.PORT_APP) {
    throw new Error('🔴 App port was not set')
}

const PORT = Number(process.env.PORT_APP)

server.listen(PORT, () => console.log(`🟢 Server listening on port ${PORT}`))
