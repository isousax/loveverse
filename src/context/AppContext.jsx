import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  // Estados globais
  const [startDate] = useState(new Date(2025, 6, 4))

  return (
    <AppContext.Provider value={{ startDate }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook customizado para consumir o contexto
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}