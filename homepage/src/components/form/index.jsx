import React, { useState, useContext } from "react"
import Dialog from "@material-ui/core/Dialog"
import Slide from "@material-ui/core/Slide"
import Register from "./register"
import closeIcon from "../../images/close.svg"
import { Wrap } from "../ui"
import styled from "styled-components"
import IndexContext from "../../utils/indexContext"
import Login from "./login"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default () => {
  const ctx = useContext(IndexContext)
  const [isRegister, setIsRegister] = useState(false)
  const reset = () => {
    setIsRegister(false)
    ctx.setVisLogin(false)
  }

  const clickToggle = () => !isRegister && setIsRegister(true)

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
          <StyledLoginWrap>
            <StyledHelmet isRegister={isRegister}></StyledHelmet>
            <StyledCard isRegister={isRegister}>
              <StyledLoginTitle>登陆</StyledLoginTitle>
              <StyledLoginForm>
                <Login />
              </StyledLoginForm>
            </StyledCard>
            <StyledToggleWrap register={isRegister}>
              <StyledToggle
                onClick={clickToggle}
                register={isRegister}
              ></StyledToggle>
              {isRegister && (
                <Register backLogin={() => setIsRegister(!isRegister)} />
              )}
            </StyledToggleWrap>
          </StyledLoginWrap>
        </div>
      </div>
    </Dialog>
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
  right: -40px;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background: none;
  padding: 0;
  box-shadow: none;
  `}
`
const StyledToggle = styled.div`
  position: relative;
  background: #3f51b5;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #ffffff;
  font-size: 28px;
  line-height: 80px;
  text-align: center;
  cursor: pointer;
  &::before {
    content: "注册";
  }
  ${props =>
    props.register
      ? `
    cursor: default;
    position: absolute;
    top: 40px;
    right: -40px;
    box-shadow: none;
    -webkit-transform: scale(15);
    transform: scale(15);
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
  width: 80%;
  max-width: 460px;
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

const StyledClose = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  right: 50px;
  top: 30px;
`

export const StyledErrorLine = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  margin: auto;
  color: red;
  text-align: center;
  font-size: 12px;
  color: ${({ color }) => color || "rgb(220, 0, 78)"};
`
