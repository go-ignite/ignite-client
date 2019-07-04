import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import get from 'lodash.get'

import {postUserRegister} from '../utils/request'

export default function FormDialog({ open, setOpen }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    invite_code: "",
  })
  function handleClickOpen() {
    setOpen(true)
  }

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
      alert('注册成功')

    } catch(err) {
      if (get(err, 'response.data.code') === 1) {
        alert('邀请码不存在或已失效')
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
            type="email"
            fullWidth
            value={form.username}
            onChange={handleInputChange("username")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="密码"
            type="email"
            fullWidth
            value={form.password}
            onChange={handleInputChange("password")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="邀请码"
            type="email"
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
