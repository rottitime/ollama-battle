import Test from '@/components/Test'
import ollama from 'ollama'

export default async function Home() {
  const response = await ollama.chat({
    model: 'llama2',
    messages: [{ role: 'user', content: 'Why is the sky blue?' }],
  })
  console.log(response.message.content)

  return (
    <main>
      <h1>Page home</h1>
      <Test />
    </main>
  )
}
