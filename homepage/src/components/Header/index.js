import styled from "styled-components"
import React, {useContext} from "react"
import { Wrap } from "../ui"
import logo from "../../images/ignite-icon.png"
import IndexContext from "../../utils/indexContext"

export default function() {
  const ctx = useContext(IndexContext)
  return (
    <Header>
      <HeaderContent>
        <LogoWrapStyle>
          <LogoStyle src={logo} />
          <span>IGNITE</span>
        </LogoWrapStyle>
        <Nav>
          <NavItem onClick={() => ctx.setVisLogin(true)}>登陆</NavItem>
        </Nav>
      </HeaderContent>
    </Header>
  )
}
const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 100;
  left: 0;
  &::after {
    background-color: #f0f0f2;
    bottom: 0rem;
    content: "";
    height: 1px;
    left: 0rem;
    position: absolute;
    right: 0rem;
    z-index: -1;
  }
`
const HeaderContent = styled(Wrap)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoWrapStyle  = styled.div`
  display: flex;
  align-items: center;
  & > span {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    padding-left: 10px;
  }
`;

const LogoStyle = styled.img`
  height: 60px;
`
const Nav = styled.ul`
  list-style: none;
  display: flex;
`
const NavItem = styled.li`
  color: #333;
  font-size: 14px;
  margin-left: 15px;
  cursor: pointer;
`
