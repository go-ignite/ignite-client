import React, { useState } from "react"
import { toast } from "react-toastify"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Close from "@material-ui/icons/Close"
import get from "lodash.get"
import styled from "styled-components"
import { postUserRegister } from "../../utils/request"
import { StyledLoginForm, StyledErrorLine } from "."

const WhiteTextField = withStyles({
  root: {
    color: "white",
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderColor: "#fff",
    },
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
    "& MuiInputBase-input": {
      color: "white !important",
    },
    "& MuiInput-root:after": {
      borderBottomColor: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField)

export default ({ backLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [invite_code, setInviteCode] = useState("")
  const [error, setError] = useState("")
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

  const handleSubmit = () => {
    if (!username || !username.length) {
      setError("请输入用户名")
      return
    }
    if (!password || !password.length) {
      setError("请输入密码")
      return
    } else if (password.length < 6 || password.length > 12) {
      setError("请输入 6 ~ 12位的密码")
      return
    }
    if (!invite_code) {
      setError("请输入邀请码")
      return
    }
    setError("")
    onSubmit()
  }
  return (
    <div>
      <StyledCard>
        <StyledLoginTitle>
          注册
          <StyledClose onClick={backLogin}></StyledClose>
        </StyledLoginTitle>
        <StyledLoginForm>
          <>
            <WhiteTextField
              label="用户名"
              key="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              fullWidth
            />
          </>
          <>
            <WhiteTextField
              key="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              label="密码"
              fullWidth
              type="password"
            />
            <div className="error-line"></div>
          </>
          <>
            <WhiteTextField
              key="invite_code"
              value={invite_code}
              onChange={e => setInviteCode(e.target.value)}
              margin="dense"
              label="邀请码"
              type="text"
              fullWidth
            />
          </>
          <StyledRegisterLine>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => handleSubmit()}
            >
              提交
            </Button>
          </StyledRegisterLine>
        </StyledLoginForm>
      </StyledCard>
      <StyledErrorLine color="#fff">{error}</StyledErrorLine>
    </div>
  )
}

const StyledRegisterLine = styled.div`
  margin-top: 20px;
  button {
    width: 100%;
    border-color: #fff;
    color: #fff;
    &:hover {
      border-color: #fff;
    }
  }
`
const StyledClose = styled(Close)`
  font-size: 30px !important;
  position: absolute;
  top: 0;
  right: 30px;
  bottom: 0;
  margin: auto;
  cursor: pointer;
`

export const StyledCard = styled.div`
  position: relative;
  border-radius: 5px;
  box-sizing: border-box;
  transition: 0.3s ease;
  ${props =>
    props.isRegister &&
    `
    margin: 0 10px;
  `}
`

export const StyledLoginTitle = styled.h2`
  position: relative;
  z-index: 1;
  border-left: 5px solid #fff;
  margin: 0 0 35px;
  padding: 10px 0 10px 50px;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  text-transform: uppercase;
`
