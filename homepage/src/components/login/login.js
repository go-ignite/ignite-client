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
            <StyledClose src={closeIcon} onClick={() => reset()}></StyledClose>
          </Wrap>

          <LoginForm
            title="登陆"
            isRegister={isRegister}
            RegisterComp={props => <Register {...props} />}
          >
            <TextField
              name="username"
              label="账号"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
            <TextField
              name="password"
              label="密码"
              type={showPassword ? "text" : "password"}
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
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => handleLogin(username, password, isAdmin)}
              >
                登陆
              </Button>
            </StyledLoginLine>
          </LoginForm>
        </div>
      </div>
    </Dialog>
  )
}

export const LoginForm = ({ title, children, RegisterComp }) => {
  const [isRegister, setIsRegister] = useState(false)
  const clickToggle = () => !isRegister && setIsRegister(true)
  return (
    <StyledLoginWrap>
      <StyledHelmet isRegister={isRegister}></StyledHelmet>
      <StyledCard isRegister={isRegister}>
        <StyledLoginTitle>{title}</StyledLoginTitle>
        <StyledLoginForm>{children}</StyledLoginForm>
      </StyledCard>
      <StyledToggleWrap register={isRegister}>
        <StyledToggle
          onClick={clickToggle}
          register={isRegister}
        ></StyledToggle>
        {isRegister && <RegisterComp backLogin={() => setIsRegister(!isRegister)} />}
      </StyledToggleWrap>
    </StyledLoginWrap>
  )
}

const StyledToggleWrap = styled.div`
  height: 100%;
  position: absolute;
  z-index: 10;
  transition: 0.3s ease;
  ${props =>
    props.register
      ? `
    top: 20px;
    right: 0;
    width: 100%;
    min-width: 100%;
    height: auto;
    border-radius: 5px;
    padding: 60px 0 40px;
    overflow: hidden;
  `
      : `
  top: 40px;
  right: -70px;
  width: 140px;
  height: 140px;
  border-radius: 100%;
  background: none;
  padding: 0;
  box-shadow: none;
  `}
`
const StyledToggle = styled.div`
  position: relative;
  background: #ed2553;
  width: 140px;
  height: 140px;
  border-radius: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #ffffff;
  font-size: 38px;
  line-height: 140px;
  text-align: center;
  cursor: pointer;
  &::before {
    content: "注册";
  }
  ${props =>
    props.register
      ? `
      position: absolute;
    top: 40px;
    right: -70px;
    box-shadow: none;
    -webkit-transform: scale(10);
    transform: scale(10);
    transition: -webkit-transform .3s ease;
    transition: transform .3s ease;
    transition: transform .3s ease, -webkit-transform .3s ease;
  &::before {
    content: "" !important;
  }
  `
      : ""}
`
const StyledLoginWrap = styled.div`
  width: 460px;
  position: relative;
`
const StyledCard = styled.div`
  position: relative;
  border-radius: 5px;
  background: #ffffff;
  padding: 60px 0 40px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: 0.3s ease;
  ${props =>
    props.isRegister &&
    `
    margin: 0 10px;
  `}
`
const StyledHelmet = styled.div`
  background: #fafafa;
  height: 10px;
  border-radius: 5px 5px 0 0;
  margin: 0 10px;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: 0.3s ease;
  ${props =>
    props.isRegister &&
    `
    margin: 0 15px;
  `}
`
export const StyledLoginTitle = styled.h2`
  position: relative;
  z-index: 1;
  border-left: 5px solid #3f51b5;
  margin: 0 0 35px;
  padding: 10px 0 10px 50px;
  color: #3f51b5;
  font-size: 32px;
  font-weight: 600;
  text-transform: uppercase;
`
export const StyledLoginForm = styled.div`
  margin: 0 60px;
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

const StyledClose = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  right: 50px;
  top: 30px;
`
