export type FetchPayload = {
  model: string
  prompt: string
  stream?: boolean
  context: number[]
}

type FetchResponse = {
  model: string
  created_at: string
  response: string
  done: boolean
  context: number[]
  total_duration: number
  load_duration: number
  prompt_eval_duration: number
  eval_count: number
  eval_duration: number
}

export type FetchApi = (payload: Partial<FetchPayload>) => Promise<FetchResponse>

export type ChatState = {
  user: 'host' | 'guest'
  time?: string
} & Pick<FetchPayload, 'context' | 'prompt'>

export type ChatAction = {
  type: 'add'
  chat: ChatState
}
