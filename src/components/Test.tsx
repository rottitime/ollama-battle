'use client'
// import ollama from 'ollama'

function Test() {
  return (
    <div>
      Test
      <button
        onClick={async () => {
          //   const response = await ollama.chat({
          //     model: 'llama2',
          //     messages: [{ role: 'user', content: 'Why is the sky blue?' }],
          //   })
          //   console.log(response.message.content)
        }}
      >
        Test
      </button>
    </div>
  )
}

export default Test
