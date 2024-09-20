import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// Adicionando a prop `variant` para controlar as variantes do botão
interface OutlineButtonProps extends ComponentProps<'button'> {
  variant?: 'default' | 'disabled'
}

export function OutlineButton({
  variant = 'default',
  className,
  ...props
}: OutlineButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        // Classes padrão do botão
        'flex items-center gap-2 rounded-full border border-dashed border-zinc-800 px-3 py-2 text-sm leading-none text-zinc-300 outline-none ring-pink-500/10 hover:border-zinc-700 focus-visible:border-pink-500 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50',

        // Variantes: o estilo muda dependendo do valor de `variant`
        variant === 'disabled'
          ? 'pointer-events-none opacity-50' // Estilo para estado desativado
          : '',

        // Classes adicionais passadas como `className`
        className,
      )}
      disabled={variant === 'disabled'} // Define o estado desativado
    />
  )
}
