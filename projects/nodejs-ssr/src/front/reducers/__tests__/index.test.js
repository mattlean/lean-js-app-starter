import { getThread, getThreads } from '../index'

describe('Root reducer selectors', () => {
  const state = {byId:{'5b92214e4780f23e2761a71f':{_id:'5b92214e4780f23e2761a71f',subject:'Hello world!',comment:'I\'m the thread comment.',createdAt:'2018-09-07T06:57:18.260Z',replies:[{createdAt:'2018-10-09T21:32:02.388Z',_id:'5b923093c4904c4367c02ea0',comment:'I\'m the reply comment.'},{createdAt:'2018-10-09T21:32:02.388Z',_id:'5b92309ac4904c4367c02ea1',comment:'I\'m the reply comment again.'},{createdAt:'2018-09-07T08:25:23.545Z',_id:'5b9235f39cd73c478f98219f',comment:'I\'m the reply comment again.'},{createdAt:'2018-09-07T08:25:42.830Z',_id:'5b9236069cd73c478f9821a0',comment:'I\'m the reply comment again.'},{createdAt:'2018-09-07T08:26:46.547Z',_id:'5b92364688579d481b2c3360',comment:'I\'m the reply comment again.'},{createdAt:'2018-09-07T08:26:51.268Z',_id:'5b92364b88579d481b2c3361',comment:'I\'m the reply comment again???'},{createdAt:'2018-09-07T10:58:44.847Z',_id:'5b9259e4d02a7f4be7d2f65d',comment:'I\'m the reply comment again???'},{createdAt:'2018-09-07T10:58:55.680Z',_id:'5b9259efd02a7f4be7d2f65e',comment:'I\'m the reply comment again!!!'},{createdAt:'2018-09-07T20:10:31.925Z',_id:'5b92db37f9f0e852ebc1c194',comment:'I\'m the reply comment again!!!'}],type:'Thread'},'5b92db41f9f0e852ebc1c195':{_id:'5b92db41f9f0e852ebc1c195',subject:'Hello world!',comment:'I\'m the thread comment.',createdAt:'2018-09-07T20:10:41.837Z',replies:[{createdAt:'2018-09-07T20:11:09.132Z',_id:'5b92db5df9f0e852ebc1c196',comment:'I\'m the reply comment again!!!'},{createdAt:'2018-09-07T20:11:59.351Z',_id:'5b92db8f27e445538f614eb0',comment:'I\'m the reply comment.'}],type:'Thread'}},list:['5b92214e4780f23e2761a71f','5b92db41f9f0e852ebc1c195']}

  test('getThread() lists all threads', () => {
    expect(getThread(state, '5b92214e4780f23e2761a71f')).toEqual(state.byId['5b92214e4780f23e2761a71f'])
  })

  test('getThreads() reads a specific thread', () => {
    expect(getThreads(state)).toEqual([state.byId['5b92214e4780f23e2761a71f'], state.byId['5b92db41f9f0e852ebc1c195']])
  })
})
