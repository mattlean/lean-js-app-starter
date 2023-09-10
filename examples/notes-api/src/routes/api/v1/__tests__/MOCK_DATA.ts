import { Note, User } from '@prisma/client'

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

export const MOCK_NOTE_EMPTY: Note = {
    id: 1,
    uuid: '23cbb84f-ab54-4293-98b1-e30f56d479f2',
    title: null,
    content: null,
    createdAt: new Date('2023-06-17T05:26:17.444Z'),
    updatedAt: new Date('2023-06-17T05:26:17.444Z'),
    ownerUuid: MOCK_USER.uuid,
}

export const MOCK_NOTE_W_CONTENT: Note = {
    id: 3,
    uuid: '10d17a59-2635-449a-9156-b5d5db52c6aa',
    title: null,
    content: 'Note with only content!',
    createdAt: new Date('2023-06-17T05:26:54.938Z'),
    updatedAt: new Date('2023-06-17T05:26:54.938Z'),
    ownerUuid: MOCK_USER.uuid,
}

export const MOCK_NOTE_W_TITLE: Note = {
    id: 2,
    uuid: '9d068e92-b576-49eb-a897-421ee5cca57c',
    title: 'Note With Only Title',
    content: null,
    createdAt: new Date('2023-06-17T05:26:35.829Z'),
    updatedAt: new Date('2023-06-17T05:26:35.829Z'),
    ownerUuid: MOCK_USER.uuid,
}

export const MOCK_NOTE_W_TITLE_CONTENT: Note = {
    id: 4,
    uuid: '68da4a00-16cf-4df1-874a-b90cc0ed8121',
    title: 'Note With Title & Content',
    content: 'Note with title and content!',
    createdAt: new Date('2023-06-17T06:25:33.165Z'),
    updatedAt: new Date('2023-06-17T06:25:33.165Z'),
    ownerUuid: MOCK_USER.uuid,
}
