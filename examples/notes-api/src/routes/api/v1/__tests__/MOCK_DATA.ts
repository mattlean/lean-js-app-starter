import { User } from '@prisma/client'

import { hashPasswordSync } from '../../../../util/test'

export const MOCK_USER_PLAIN_TXT_PASS = 'password'

export const MOCK_USER: User = {
    uuid: 'd316099f-999a-4750-b882-a776a0d3ffd1',
    username: 'user',
    password: hashPasswordSync(MOCK_USER_PLAIN_TXT_PASS),
    createdAt: new Date('2023-06-14T01:02:36.683Z'),
    updatedAt: new Date('2023-06-14T01:02:36.683Z'),
}

export const MOCK_REQ_USER = {
    uuid: MOCK_USER.uuid,
    username: MOCK_USER.username,
    iat: 1686876619,
}
