'use client'
import { useEffect, useReducer } from 'react'

type Props = {
  title: string
  initialMessage?: string
  start?: boolean
}

type Message = {
  role: 'user' | 'assistant'
  response: string
}

const initialMessages: Message[] = []

export default function Chat({ title, initialMessage }: Props) {
  //useReeducer will allow me to add messages to the state and clear them
  const [messages, dispatch] = useReducer(
    (state: Message[], action: { type: 'add'; message: Message }) => {
      if (action.type === 'add') {
        return [...state, action.message]
      }
      return state
    },
    initialMessages
  )

  // useeffect will start fetching initial messages from Ollama if prop start is true
  useEffect(() => {
    if (initialMessage) {
      fetch('http://.0.1:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2-uncensored',
          prompt: initialMessage,
          stream: false,
          messages: [{ role: 'user', content: initialMessage }],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: 'add',
            message: { role: 'assistant', response: data.message.content },
          })
        })
    }
  }, [initialMessage, start])

  return (
    <div>
      <h2>{title}</h2>
      <div>
        {messages.map((message, i) => (
          <div key={i}>{message.response}</div>
        ))}
      </div>
    </div>
  )
}
