'use client'
import { useReducer, useState } from 'react'
import styled from 'styled-components'
import Chat from './Chat'

type Chat = {
  user: 'host' | 'guest'
  message: string
  time: string
  context: number[]
}

const initialChat: Chat[] = []

// Container is flex box with children at 50% width
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;

  > div {
    width: 50%;
    background: #fff3e8;
    padding: 10px;
  }
`

function Test() {
  const [start, setStart] = useState(false)
  const [state, dispatch] = useReducer((state: Chat[], action) => {
    return state
  }, initialChat)

  return (
    <div>
      Test
      <button
        onClick={async () => {
          setStart((p) => !p)

          const res = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'llama2-uncensored',
              prompt: 'What was my last question?',
              stream: false,
              messages: [{ role: 'user', content: 'Why is the sky blue?' }],
            }),
          })
          //   const response = await ollama.chat({
          //     model: 'llama2',
          //     messages: [{ role: 'user', content: 'Why is the sky blue?' }],
          //   })
          //   console.log(response.message.content)
        }}
      >
        {start ? 'Stop' : 'Start'}
      </button>
      <Container>
        <Chat title="Guest" />

        <div>2</div>
      </Container>
    </div>
  )
}

export default Test
