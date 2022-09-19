import readline from 'readline'

import sum from './sum'

console.log(`2+2=${sum(2, 2)}`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('What is your name? ', (name) => {
  console.log(`Hello, ${name}!`)
  rl.close()
})

rl.on('close', () => {
  process.exit(0)
})
