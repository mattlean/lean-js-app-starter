import 'dotenv/config'

import app from './app'

if (
    (process.env.E2E && !process.env.PORT_DEV_SERVER_E2E) ||
    !process.env.PORT_EXPRESS
) {
    throw new Error('🔴 Express port was not set')
}

const PORT = Number(
    process.env.E2E ? process.env.PORT_EXPRESS_E2E : process.env.PORT_EXPRESS,
)

app.listen(PORT, () => console.log(`🟢 Server listening on port ${PORT}`))
