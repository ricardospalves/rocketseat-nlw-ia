import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { api } from '@/lib/axios'

type Prompt = {
  id: string
  title: string
  template: string
}

export type PromptSelectProps = {
  id?: string
  onPromptSelected?: (template: string) => void
}

export const PromptSelect = ({ id, onPromptSelected }: PromptSelectProps) => {
  const [prompts, setPrompts] = useState<Prompt[]>()

  useEffect(() => {
    api.get('/prompts').then(({ data }) => {
      setPrompts(data)
    })
  }, [])

  const handlePromptSelected = (promptId: string) => {
    const selectedPrompt = prompts?.find((prompt) => {
      return prompt.id === promptId
    })

    if (!selectedPrompt) {
      return
    }

    return onPromptSelected?.(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger id={id}>
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map(({ id, title }) => {
          return (
            <SelectItem key={id} value={id}>
              {title}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
