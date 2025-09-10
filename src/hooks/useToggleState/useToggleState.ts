import { useCallback, useState } from 'react'

export const useToggleState = (initialState = false) => {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(() => {
    setState((prev) => !prev)
  }, [])

  return [state, toggle] as const
}
