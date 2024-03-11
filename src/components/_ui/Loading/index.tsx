import { CircularProgress } from '@mui/material'

type Props = {
  size?: number
  color?: string
}

// Componente de loading.
export function Loading({ size, color }: Props) {
  return (
    <CircularProgress size={size || 18} sx={{ color: color || '#FFFFFF' }} />
  )
}
