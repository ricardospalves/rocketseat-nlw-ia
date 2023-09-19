import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export type HelperTextProps = {
  id?: string
  className?: string
  children?: ReactNode
}

export const HelperText = ({ children, className, id }: HelperTextProps) => {
  return (
    <p id={id} className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  )
}
