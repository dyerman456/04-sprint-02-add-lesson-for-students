import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatus } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await decksAPI.fetchDecks()
    dispatch(setAppStatus('succeeded'))
    return dispatch(setDecksAC(res.data.items))
  } catch (error) {
    dispatch(setAppStatus('failed'))
  }
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  const res = await decksAPI.deleteDeck(id)
  return dispatch(deleteDeckAC(res.data.id))
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    return dispatch(updateDeckAC(res.data))
  } catch (error) {
    let errorMessage: string
    if (isAxiosError(error)) {
      errorMessage = error.response?.data.errorMessages[0].message || error.message
    } else {
      errorMessage = (error as Error).message
    }
    console.log(errorMessage)
  }
}
