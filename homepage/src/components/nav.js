import React, { useContext, useState } from "react"
import styled from "styled-components"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/Close"
import MediaQuery from "react-responsive"
// import LoginBtn from "./button"
import Register from "./register"
import logoUrl from "../images/ignite-icon.png"
import { Wrap } from "./base"
import IndexContext from "../utils/indexContext"

export default () => {
  const ctx = useContext(IndexContext)
  const [navToggle, setToggle] = useState(false)
  return (
    <Nav>
      <MediaQuery minDeviceWidth={1224}>
        {matches =>
          matches ? (
            <NavCenter>
              <NavLogo src={logoUrl}></NavLogo>
              <NavRight>
                <Ul>
                  <Li onClick={() => ctx.setVisRegister(true)}>注册</Li>
                  <Li onClick={() => ctx.setVisRegister(true)}>关于我们</Li>
                </Ul>
                {/* <LoginBtn white={true} onClick={() => ctx.setVisLogin(true)}>
                  登陆
                </LoginBtn> */}
              </NavRight>
            </NavCenter>
          ) : (
            <div>
              <MobileHeader>
                <MenuIcon
                  fontSize={"middle"}
                  style={{ color: "white" }}
                  onClick={() => setToggle(true)}
                ></MenuIcon>
              </MobileHeader>
              <MobileBody show={navToggle}>
                <CloseIcon
                  onClick={() => setToggle(false)}
                  style={{ color: "black", margin: "15px" }}
                  fontSize={"middle"}
                ></CloseIcon>
                <MobileIcon src={logoUrl} ></MobileIcon>
                <MobileUl>
                  <MobileLi onClick={() => ctx.setVisLogin(true)}>登陆</MobileLi>
                  <MobileLi onClick={() => ctx.setVisRegister(true)}>注册</MobileLi>
                </MobileUl>
              </MobileBody>
            </div>
          )
        }
      </MediaQuery>

      <Register open={ctx.visRegister} setOpen={ctx.setVisRegister}></Register>
    </Nav>
  )
}

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  padding: 0 15px 15px;
`
const NavCenter = styled(Wrap)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavLogo = styled.img``

const Ul = styled.ul`
  display: flex;
  margin-right: 3rem;
`

const Li = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-transform: uppercase;
  margin-left: 3rem;
  font-size: 14px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  padding: 0.4rem 0px 0.2rem;
`
const MobileHeader = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  img {
    display: block;
    margin: auto;
    width: 50px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`

const MobileBody = styled.div`
  transition: height 0.4s;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ show }) => (show ? "100vh" : 0)};
  overflow: hidden;
  /* padding: ${({ show }) => (show ? 15 : 0)}px; */
`
const MobileUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-top: 40px;
`
const MobileLi = styled.li`
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
`

const MobileIcon = styled.img`
  width: 30px;
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  margin: auto;
`
