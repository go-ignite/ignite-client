import React, { useState, useContext } from "react"
import { toast } from 'react-toastify';
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Dialog from "@material-ui/core/Dialog"
import Slide from "@material-ui/core/Slide"
import closeIcon from "../images/close.svg"
import Button from "../components/button"
import { Wrap } from "../components/base"
import { postAdminLogin, postUserLogin } from "../utils/request"
import IndexContext from "../utils/indexContext"
import logoUrl from "../images/ignite-icon.png"
import get from 'lodash.get'

async function handleLogin(username, password, isAdmin) {
  let reqFn = isAdmin ? postAdminLogin : postUserLogin
  try {
    const { token } = await reqFn({
      username,
      password,
    })
    const loginUrl = isAdmin
      ? process.env.GATSBY_ADMIN_PAGE
      : process.env.GATSBY_USER_PAGE
    window.location.href = `${loginUrl}?token=${token}`
  } catch (e) {
    const code = get(e, 'response.data.code')
    if (code === 400) {
      toast.error('请输入正确的账号或密码')
    }
  }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Login = () => {
  const ctx = useContext(IndexContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  return (
    <Dialog
      fullScreen
      open={ctx.visLogin}
      onClose={() => ctx.setVisLogin(false)}
      TransitionComponent={Transition}
    >
      <div className="login">
        <div className="login-wrap">
          <Wrap className="login-header">
            <img src={logoUrl} alt="" />
            <img
              className="login-close"
              onClick={() => ctx.setVisLogin(false)}
              src={closeIcon}
              alt=""
            />{" "}
          </Wrap>

          <div className="login-form">
            <h2>请登陆账号，即刻开启你的旅程吧</h2>
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
    </Dialog>
  )
}

export default Login
