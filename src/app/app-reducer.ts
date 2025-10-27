export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/CHANGE-STATUS': {
      return { ...state, status: action.payload.status }
    }
    default:
      return state
  }
}

type ActionsType = ReturnType<typeof setAppStatus>

export const setAppStatus = (status: RequestStatusType) => {
  return {
    type: 'APP/CHANGE-STATUS',
    payload: {
      status,
    },
  } as const
}
