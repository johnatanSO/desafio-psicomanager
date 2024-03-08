import { CircularProgress } from '@mui/material'

type Props = {
  size: number
}

export function Loading({ size }: Props) {
  return <CircularProgress size={size || 18} />
}
