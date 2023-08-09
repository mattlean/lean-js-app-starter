import 'dotenv/config'

import { server } from './server'

if (!process.env.PORT_EXPRESS) {
    throw new Error('🔴 Express port was not set')
}

const PORT = Number(process.env.PORT_EXPRESS)

server.listen(PORT, () => console.log(`🟢 Server listening on port ${PORT}`))
