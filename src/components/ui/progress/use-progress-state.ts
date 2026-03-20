import { useEffect, useReducer } from 'react'

type ProgressState = {
   isVisible: boolean
   isCompleting: boolean
   isStarted: boolean
}

type ProgressAction =
   | { type: 'show' }
   | { type: 'start' }
   | { type: 'complete' }
   | { type: 'hide' }

const createInitialState = (isActive: boolean): ProgressState => ({
   isVisible: isActive,
   isCompleting: false,
   isStarted: false,
})

const progressReducer = (
   state: ProgressState,
   action: ProgressAction,
): ProgressState => {
   switch (action.type) {
      case 'show':
         return {
            isVisible: true,
            isCompleting: false,
            isStarted: false,
         }
      case 'start':
         return {
            ...state,
            isStarted: true,
         }
      case 'complete':
         return {
            ...state,
            isCompleting: true,
            isStarted: true,
         }
      case 'hide':
         return {
            isVisible: false,
            isCompleting: false,
            isStarted: false,
         }
   }
}

export const useProgressState = (isActive: boolean) => {
   const [state, dispatch] = useReducer(
      progressReducer,
      isActive,
      createInitialState,
   )
   const { isVisible } = state

   useEffect(() => {
      if (isActive) {
         const showTimeoutId = setTimeout(() => {
            dispatch({ type: 'show' })
         }, 0)

         const startTimeoutId = setTimeout(() => {
            dispatch({ type: 'start' })
         }, 0)

         return () => {
            clearTimeout(showTimeoutId)
            clearTimeout(startTimeoutId)
         }
      }

      if (!isVisible) {
         return
      }

      const completeTimeoutId = setTimeout(() => {
         dispatch({ type: 'complete' })
      }, 0)

      const hideTimeoutId = setTimeout(() => {
         dispatch({ type: 'hide' })
      }, 50)

      return () => {
         clearTimeout(completeTimeoutId)
         clearTimeout(hideTimeoutId)
      }
   }, [isActive, isVisible])

   return state
}
