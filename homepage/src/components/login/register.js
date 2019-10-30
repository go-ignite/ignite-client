import React, { useState } from "react"
import { toast } from "react-toastify"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import get from "lodash.get"
import styled from "styled-components"
import { postUserRegister } from "../../utils/request"
import { LoginForm } from "./login"

export default ({ backLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [invite_code, setInviteCode] = useState("")
  const [errors, setErrors] = useState({})
  async function onSubmit(values) {
    try {
      await postUserRegister(values)
      toast.success("注册成功，您随时可以登陆系统 ~")
    } catch (err) {
      const code = get(err, "response.data.code")
      if (code === 1000) {
        toast.error("邀请码不存在或已失效")
      } else if (code === 400) {
        toast.error("请正确的填写表单信息")
      } else if (code === 1002) {
        toast.error("用户名已存在")
      }
    }
  }

  function handleValidate(values) {
    const formErrors = {}
    if (!values.password) {
      formErrors.password = "请输入密码"
    } else if (values.password.length < 6 || values.password.length > 12) {
      formErrors.password = "请输入 6 ~ 12位的密码"
    }
    return formErrors
  }
  const errorLine = error =>
    error ? (
      <ErrorLine>
        <span>{error}</span>
      </ErrorLine>
    ) : null

  const handleSubmit = () => {
    setErrors(handleValidate({ username, password, invite_code }))
    if (Object.keys(errors).length) {
      return
    }
    onSubmit()
  }
  const goLogin = () => {
    backLogin()
  }

  return (
    <LoginForm title="注册">
      <>
        <TextField
          label="用户名"
          key="username"
          variant="outlined"
          value={username}
          margin="dense"
          onChange={e => setUsername(e.target.value)}
          type="text"
          fullWidth
        />
        {errorLine(errors.username)}
      </>
      <>
        <TextField
          margin="dense"
          variant="outlined"
          key="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          label="密码"
          fullWidth
          type="password"
        />
        <div className="error-line"></div>
        {errorLine(errors.password)}
      </>
      <>
        <TextField
          variant="outlined"
          key="invite_code"
          value={invite_code}
          onChange={e => setInviteCode(e.target.value)}
          margin="dense"
          label="邀请码"
          type="text"
          fullWidth
        />
        {errorLine(errors.invite_code)}
      </>
      <div>
        <Button onClick={() => handleSubmit()} color="primary">
          提交
        </Button>
      </div>
      <StyledCreateWrap>
        <Link component="button" onClick={() => goLogin()}>
          已有账号，立即登陆
        </Link>
      </StyledCreateWrap>
    </LoginForm>
  )
}

const ErrorLine = styled.div`
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  color: #b5525c;
`

const StyledCreateWrap = styled.div`
  text-align: right;
  padding-top: 20px;
`
