import { useState } from 'react'

export const useModal = (initialState = false) => {
   const [isOpen, setIsOpen] = useState(initialState)

   const openModal = () => {
      setIsOpen(true)
   }

   const closeModal = () => {
      setIsOpen(false)
   }

   const toggleModal = () => {
      setIsOpen((currentIsOpen) => !currentIsOpen)
   }

   return {
      isOpen,
      openModal,
      closeModal,
      toggleModal,
   }
}
