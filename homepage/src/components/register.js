import React, { useState } from "react"
import { toast } from "react-toastify"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import get from "lodash.get"
import { Form, Field } from "react-final-form"
import styled from "styled-components"
import { postUserRegister } from "../utils/request"

const FORM_INIT = {
  username: "",
  password: "",
  invite_code: "",
}
export default function FormDialog({ open, setOpen }) {
  function handleClose() {
    setOpen(false)
  }

  async function onSubmit(values) {
    try {
      await postUserRegister(values)
      toast.success("注册成功，您随时可以登陆系统 ~")
      setOpen(false)
    } catch (err) {
      const code = get(err, "response.data.code")
      if (code === 1000) {
        toast.error("邀请码不存在或已失效")
      } else if (code === 400) {
        alert("请正确的填写表单信息")
      } else if (code === 1002) {
        toast.error("用户名已存在")
      }
    }
  }

  function handleValidate(values) {
    const errors = {}
    if (!values.password) {
      errors.password = "请输入密码"
    } else if (values.password.length < 6 || values.password.length > 12) {
      errors.password = "请输入 6 ~ 12位的密码"
    }
    return errors
  }

  return (
    <Form
      initialValues={FORM_INIT}
      onSubmit={onSubmit}
      validate={handleValidate}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">注册</DialogTitle>
          <StyledDialogContent>
            <Field name="username">
              {({ input, meta }) => (
                <>
                  <TextField
                    {...input}
                    margin="dense"
                    id="name"
                    label="用户名"
                    type="text"
                    fullWidth
                  />
                  <ErrorLine>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </ErrorLine>
                </>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <>
                  <TextField
                    {...input}
                    margin="dense"
                    id="name"
                    label="密码"
                    fullWidth
                    type="password"
                    />
                  <div className="error-line"></div>
                  <ErrorLine>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </ErrorLine>
                </>
              )}
            </Field>
            <Field name="invite_code">
              {({ input, meta }) => (
                <>
                  <TextField
                    {...input}
                    margin="dense"
                    id="name"
                    label="邀请码"
                    type="text"
                    fullWidth
                  />
                  <ErrorLine>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </ErrorLine>
                </>
              )}
            </Field>
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(form)} color="primary">
              取消
            </Button>
            <Button onClick={() => handleSubmit()} color="primary">
              提交
            </Button>
          </DialogActions>
        </Dialog>
      )}
    ></Form>
  )
}

const ErrorLine = styled.div`
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  color: #b5525c;
`
const StyledDialogContent = styled(DialogContent)`
  width: 400px;
`
