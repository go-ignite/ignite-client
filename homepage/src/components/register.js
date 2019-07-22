import React, { useState } from "react"
import { toast } from 'react-toastify';
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import get from 'lodash.get'

import {postUserRegister} from '../utils/request'

export default function FormDialog({ open, setOpen }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    invite_code: "",
  })

  function handleClose() {
    setOpen(false)
  }

  function handleInputChange(name) {
    return ({ target: { value } }) => {
      setForm(
        Object.assign({}, form, {
          [name]: value,
        })
      )
    }
  }

  async function handleSubmit() {
    console.log(form)
    try {
      const data = await postUserRegister(form)
      toast.success('注册成功，您随时可以登陆系统 ~')

    } catch(err) {
      const code = get(err, 'response.data.code')
      if (code === 1000) {
        toast.error('邀请码不存在或已失效')
      } else if (code === 400) {
        alert('请正确的填写表单信息')
      }
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">注册</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="用户名"
            type="text"
            fullWidth
            value={form.username}
            onChange={handleInputChange("username")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="密码"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleInputChange("password")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="邀请码"
            type="text"
            fullWidth
            value={form.invite_code}
            onChange={handleInputChange("invite_code")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handleSubmit} color="primary">
            提交
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
