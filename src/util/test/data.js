export const newThread = {
  subject: 'New Thread',
  comment: 'I am the new thread comment.'
}

export const threads = [
  {
    _id: '5bee2f90c43e83433b5e5d24',
    subject: 'New Thread',
    comment: 'I am the new thread comment.',
    createdAt: '2018-11-16T02:46:40.301Z',
    replies: [
      {
        '_id': '5bee2f90c43e83433b5e5d25',
        'createdAt': '2018-11-16T02:46:40.311Z',
        'comment': 'All your base are belong to us.',
        'type': 'Reply'
      }
    ],
    type: 'Thread'
  },
  {
    _id: '5bee445ec43e83433b5e5d36',
    comment: 'I\'m the thread comment.',
    createdAt: '2018-11-16T04:15:26.796Z',
    replies: [],
    type: 'Thread'
  }
]
