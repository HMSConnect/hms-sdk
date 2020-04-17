import * as React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import useWindowSize from '../useWindowSize'

describe('useWindowSize', () => {
  it('render useWindowSize', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useWindowSize())
    expect(result.current.width).toBe(1024)
    expect(result.current.standardSize).toBe('lsmall')

    await act(async () => {
      window.resizeTo(500, 200)
      await waitForNextUpdate()
      expect(result.current.width).toBe(500)
      expect(result.current.standardSize).toBe('xsmall')
    })

    await act(async () => {
      window.resizeTo(800, 200)
      await waitForNextUpdate()
      expect(result.current.width).toBe(800)
      expect(result.current.standardSize).toBe('small')
    })

    await act(async () => {
      window.resizeTo(1280, 200)
      await waitForNextUpdate()
      expect(result.current.width).toBe(1280)
      expect(result.current.standardSize).toBe('medium')
    })

    await act(async () => {
      window.resizeTo(1440, 200)
      await waitForNextUpdate()
      expect(result.current.width).toBe(1440)
      expect(result.current.standardSize).toBe('large')
    })

    await act(async () => {
      window.resizeTo(1920, 200)
      await waitForNextUpdate()
      expect(result.current.width).toBe(1920)
      expect(result.current.standardSize).toBe('xlarge')
    })
  })
})
