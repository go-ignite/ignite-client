import React, { createContext, useState } from "react"

const context = createContext("index")

export function IndexContextProvider({ children }) {
  const [visLogin, setVisLogin] = useState(false)

  return (
    <context.Provider
      value={{
        visLogin,
        setVisLogin,
      }}
    >
      {children}
    </context.Provider>
  )
}

export const IndexContextConsumer = context.Consumer
export default context
