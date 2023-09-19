import { ReactNode, forwardRef, useId } from 'react'
import { Textarea, TextareaProps } from './ui/textarea'
import { Label } from './ui/label'

type PropsToOmit = 'id' | 'className'

type TextareaWithOmitedProps = Omit<TextareaProps, PropsToOmit>

export type PromptFieldProps = TextareaWithOmitedProps & {
  label: ReactNode
}

export const PromptField = forwardRef<HTMLTextAreaElement, PromptFieldProps>(
  ({ label, ...props }, ref) => {
    const id = useId()

    return (
      <div className="flex flex-col">
        <Label htmlFor={id} className="block pb-2">
          {label}
        </Label>

        <Textarea
          id={id}
          className="block resize-none grow"
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
