import { isAxiosError } from 'axios'
import { Dispatch } from 'redux'
import { setErrorApp } from '../../app/app-reducer.ts'

export const handleError = ({ dispatch, error }: { dispatch: Dispatch; error: unknown }) => {
  let errorMessage: string
  if (isAxiosError(error)) {
    errorMessage = error.response?.data.errorMessages[0].message || error.message
  } else {
    errorMessage = (error as Error).message
  }
  dispatch(setErrorApp(errorMessage))
}
