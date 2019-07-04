import { Link } from "gatsby"
import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import closeIcon from "../images/close.svg"
import Button from "../components/button"
import { Wrap } from "../components/base"
import { postAdminLogin, postUserLogin } from "../utils/request"
import { IndexContextConsumer } from "../utils/indexContext"
import logoUrl from "../images/ignite-icon.png"

async function handleLogin(username, password, isAdmin) {
  let reqFn = isAdmin ? postAdminLogin : postUserLogin
  const { token } = await reqFn({
    username,
    password,
  })
  const loginUrl = isAdmin
    ? process.env.GATSBY_ADMIN_PAGE
    : process.env.GATSBY_USER_PAGE
  window.location.href = `${loginUrl}?token=${token}`
}
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  return (
    <div className="login">
      <div className="login-wrap">
        <IndexContextConsumer>
          {ctx => (
            <Wrap className="login-header">
              <img src={logoUrl} alt="" />
              <img
                className="login-close"
                onClick={() => ctx.setVisLogin(false)}
                src={closeIcon}
                alt=""
              />{" "}
            </Wrap>
          )}
        </IndexContextConsumer>

        <div className="login-form">
          <h2>登陆您的账号，开启你的旅程吧</h2>
          <TextField
            variant="outlined"
            label="账号"
            margin="normal"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            label="密码"
            margin="normal"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={event => setIsAdmin(event.target.checked)}
                color="primary"
              />
            }
            label="以管理员登陆"
          />
          <Button onClick={() => handleLogin(username, password, isAdmin)}>
            登陆
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
