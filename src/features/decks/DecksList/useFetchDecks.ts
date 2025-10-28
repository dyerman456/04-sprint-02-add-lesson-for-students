import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectDecks } from '../decks-selectors.ts'
import { useLayoutEffect, useState } from 'react'
import { fetchDecksTC } from '../decks-thunks.ts'

export const useFetchDecks = () => {
  const dispatch = useAppDispatch()
  const decks = useAppSelector(selectDecks)
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    dispatch(fetchDecksTC()).finally(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  return {
    decks,
    isLoading,
  }
}
