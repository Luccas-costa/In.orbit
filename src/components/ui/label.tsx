import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function Label(props: ComponentProps<'label'>) {
  return (
    <label
      {...props}
      className={twMerge(
        'text-sm font-medium leading-normal tracking-tight',
        props.className,
      )}
    />
  )
}
