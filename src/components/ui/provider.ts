import type { Rounded, Size, Variant } from '@/types'

export const useProvider = () => {
  const setRounded = ({ rounded, left, right }: { rounded: Rounded, left?: boolean, right?: boolean }): string => {
    const roundedLeftNone = 'rounded-l-none'
    const roundedRightNone = 'rounded-r-none'
    
    switch (rounded) {
    case 'sm': return left ? `rounded-l-sm ${roundedRightNone}` : right ? `rounded-r-sm ${roundedLeftNone}` : 'rounded-sm'
    case 'md': return left ? `rounded-l-md ${roundedRightNone}` : right ? `rounded-r-md ${roundedLeftNone}` : 'rounded-md'
    case 'lg': return left ? `rounded-l-xl ${roundedRightNone}` : right ? `rounded-r-xl ${roundedLeftNone}` : 'rounded-xl'
    case 'full': return left ? `rounded-l-full ${roundedRightNone}` : right ? `rounded-r-full ${roundedLeftNone}` : 'rounded-full'
    case 'none': return left ? `rounded-l-none ${roundedRightNone}` : right ? `rounded-r-none ${roundedLeftNone}` : 'rounded-none'
    }
  }

  const setDisabled = ({ disabled, loading }: { disabled: boolean, loading?: boolean }): string => {
    if (disabled || loading) return 'opacity-50 cursor-not-allowed'
    return ''
  }

  const setSize = ({ size }: { size: Size}): string => {
    switch (size) {
    case 'sm': return 'text-sm'
    case 'md': return 'text-md'
    case 'lg': return 'text-xl'
    }
  }

  const setTextColor = ({ variant }: { variant: Variant }): string => {
    switch (variant) {
    case 'primary': return 'text-primary'
    case 'secondary': return 'text-secondary'
    case 'warning': return 'text-warning'
    case 'success': return 'text-success'
    case 'danger': return 'text-danger'
    }
  }

  return {
    setRounded,
    setDisabled,
    setSize,
    setTextColor
  }
}