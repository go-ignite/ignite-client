import styled from 'styled-components'
import get from "lodash.get"
import { toast } from "react-toastify"
import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Button from "@material-ui/core/Button"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import { postAdminLogin, postUserLogin } from "../../utils/request"
import { StyledErrorLine } from "."

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

export default () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [formError, setFormError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  function doLogin() {
    if (!username || !username.length) {
      setFormError("请输入用户名")
      return
    }
    if (!password || !password.length) {
      setFormError("请输入密码")
      return
    }
    setFormError("")
    handleLogin(username, password, isAdmin)
  }
  return (
    <>
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
          onClick={() => doLogin()}
        >
          登陆
        </Button>
      </StyledLoginLine>
      <StyledErrorLine>{formError}</StyledErrorLine>
    </>
  )
}

const StyledLoginLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  @media(max-width: 640px) {
    flex-direction: column;
  }
`
