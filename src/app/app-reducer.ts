export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: action.payload.status }
    }
    case 'APP/SET-ERROR': {
      return { ...state, error: action.payload.error }
    }
    default:
      return state
  }
}

type ActionsType = ReturnType<typeof setAppStatus> | ReturnType<typeof setErrorApp>

export const setAppStatus = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS',
    payload: {
      status,
    },
  } as const
}

export const setErrorApp = (error: string | null) => {
  return {
    type: 'APP/SET-ERROR',
    payload: {
      error,
    },
  } as const
}
