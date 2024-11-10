import { greetings } from '@/constants/greetings'

export function getRandomGreeting() {
  return greetings[Math.floor(Math.random() * greetings.length)]
}
