import React, { useState, useContext } from "react"
import { toast } from "react-toastify"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Dialog from "@material-ui/core/Dialog"
import Slide from "@material-ui/core/Slide"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import Register from "./register"
import closeIcon from "../../images/close.svg"
import { Wrap } from "../ui"
import styled from "styled-components"
import { postAdminLogin, postUserLogin } from "../../utils/request"
import IndexContext from "../../utils/indexContext"
import logoUrl from "../../images/ignite-icon.png"
import get from "lodash.get"

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
    const code = get(e, "response.data.code")
    if (code === 400) {
      toast.error("请输入正确的账号或密码")
    }
  }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default () => {
  const ctx = useContext(IndexContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const reset = () => {
    setUsername("")
    setPassword("")
    setIsAdmin(false)
    setIsRegister(false)
    setShowPassword(false)
    ctx.setVisLogin(false)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  function goCreate() {
    setUsername("")
    setPassword("")
    setIsRegister(true)
  }

  return (
    <Dialog
      fullScreen
      open={ctx.visLogin}
      onClose={() => reset()}
      TransitionComponent={Transition}
    >
      <div className="login">
        <div className="login-wrap">
          <Wrap className="login-header">
            <img src={logoUrl} alt="" />
            <img
              className="login-close"
              onClick={() => reset()}
              src={closeIcon}
              alt=""
            />{" "}
          </Wrap>

          {isRegister ? (
            <Register backLogin={() => setIsRegister(false)}></Register>
          ) : (
            <LoginForm title="登陆">
              <TextField
                name="username"
                margin="dense"
                variant="outlined"
                label="账号"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              <TextField
                name="password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                label="密码"
                margin="dense"
                value={password}
                onChange={event => setPassword(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StyledLoginLine>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleLogin(username, password, isAdmin)}
                >
                  登陆
                </Button>
              </StyledLoginLine>
              <StyledCreateWrap>
                <Link component="button" onClick={() => goCreate()}>
                  还没有账户，马上创建
                </Link>
              </StyledCreateWrap>
            </LoginForm>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export const LoginForm = ({ title, children }) => {
  return (
    <StyledLoginForm>
      <h2>{title}</h2>
      {children}
    </StyledLoginForm>
  )
}
const StyledLoginForm = styled.div`
  margin: auto;
  width: 100%;
  max-width: 420px;
  text-align: center;
  display: flex;
  -webkit-box-pack: justify;
  flex-direction: column;
`

const StyledLoginLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`
const StyledCreateWrap = styled.div`
  text-align: right;
  padding-top: 20px;
`
