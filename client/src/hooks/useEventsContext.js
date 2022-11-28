import { EventsContext } from "../context/EventsContext"
import { useContext } from "react"

export const useEventsContext = () => {
  const context = useContext(EventsContext)
  // console.log(context)
  if(!context) {
    throw Error('useEventsContext must be used inside a EventsContextProvider')
  }

  return context
}