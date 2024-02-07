'use client'

import { useState } from 'react'

// import ollama from 'ollama'

function Test() {
  const [start, setStart] = useState(false)

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
    </div>
  )
}

export default Test
