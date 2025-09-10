import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useToggleState } from '../useToggleState'

describe('useToggleState', () => {
  it('expects to toggle state from false to true', () => {
    const { result } = renderHook(() => useToggleState(false))

    act(() => {
      const [, toggle] = result.current
      toggle()
    })

    const [state] = result.current
    expect(state).toBe(true)
  })
})
