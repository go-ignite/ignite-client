import React from "react"
import styled from "styled-components"
import backgroundBg from "./imgs/rocket-background.jpg"
import rocketBg from "./imgs/rocket.png"

export default function({ children }) {
  return (
    <WrapStyle>
      <RocketStyle src={rocketBg} alt="" />
      {children}
    </WrapStyle>
  )
}

const RocketStyle = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  object-fit: cover;
  object-position: bottom center;
  width: 100%;
  height: auto;
`
const WrapStyle = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url(${backgroundBg}) no-repeat;
  background-size: cover;
  position: relative;
`
