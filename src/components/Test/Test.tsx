'use client'
import { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import type { ChatState, ChatAction, FetchApi, FetchPayload } from './types'

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

function replyLastMessage(message: ChatState): ChatState {
  const { user, prompt, context } = message

  const newMessage: ChatState = {
    user: user === 'guest' ? 'host' : 'guest',
    prompt,
    context: [...context]
  }

  return newMessage
}

const initialChat: ChatState[] = [
  // {
  //   user: 'guest',
  //   prompt: 'Hello',
  //   context: []
  // }
]

const fetchAi: FetchApi = async (payload) => {
  const defaultPayload: Partial<FetchPayload> = {
    model: 'llama2-uncensored',
    stream: false
  }

  const res = await fetch('http://127.0.0.1:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...defaultPayload, ...payload })
  }).then((res) => res.json())

  return res
}

const settings = {
  firstPrompt: 'Hello how are you?',
  guestProfile:
    'I want you to act as a person who is interested in the topic of the conversation.',
  hostProfile: 'I want you to act as a indian man. Be ready to answer questions'
} as const

export default function Test() {
  const [start, setStart] = useState(false)
  const [state, dispatch] = useReducer((state: ChatState[], action: ChatAction) => {
    const { chat, type } = action

    switch (type) {
      case 'add':
        return [...state, chat]
      default:
        return state
    }
  }, initialChat)

  const getPreviousContext = (user: ChatState['user']): ChatState['context'] =>
    state.findLast((s) => s.user === user)?.context || []

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined

    if (start) {
      intervalId = setInterval(async () => {
        if (!state.length) {
          // state is empty so much be the first time setup

          await fetchAi({
            prompt: settings.hostProfile,
            context: [],
            stream: false
          }).then((response) => {
            dispatch({
              type: 'add',
              chat: {
                user: 'host',
                prompt: response.response,
                context: response.context
              }
            })
          })
        }

        // TODO
        // pick up last question.
        // toggle user (as new user)
        // pick up context for new user
        // ask new user the question

        // console.log('fetching')
        // // get last message
        // const lastMessage = state.splice(-1)
        // await fetchAi({
        //   context:
        // })
      }, 500)
    } else {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [start])

  return (
    <div>
      Test
      <button
        onClick={async () => {
          setStart((p) => !p)

          // function for the below

          // const res = await fetch('http://127.0.0.1:11434/api/generate', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify({
          //     model: 'llama2-uncensored',
          //     prompt: 'What was my last question?',
          //     stream: false,
          //     messages: [{ role: 'user', content: 'Why is the sky blue?' }]
          //   })
          // })
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
        <div>2</div>
      </Container>
    </div>
  )
}
