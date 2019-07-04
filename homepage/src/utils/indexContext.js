import React, { createContext, useState } from "react"

const context = createContext("index")

export function IndexContextProvider({ children }) {
  const [visLogin, setVisLogin] = useState(false)
  const [visRegister, setVisRegister] = React.useState(false)

  return (
    <context.Provider
      value={{
        visLogin,
        setVisLogin,
        visRegister,
        setVisRegister,
      }}
    >
      {children}
    </context.Provider>
  )
}

export const IndexContextConsumer = context.Consumer
export default context
