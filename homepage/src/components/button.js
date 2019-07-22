import React from "react"
import styled from "styled-components"

const button = ({ children, ...rest }) => {
  return <StyledBtn {...rest}>{children}</StyledBtn>
}

// button.propTypes = {
//   children: PropTypes.element,
// }

const StyledBtn = styled.button`
  outline: none;
  ${props =>
    props.white
      ? `
    border: 1px solid white;
    background: inherit;
  `
      : `
    border: none;
    background:rgb(1, 170, 228) ;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 20px;
    &:hover {
      background: rgb(23, 180, 234);
    }
  `}
  position: relative;
  display: block;
  min-width: 100%;
  height: 40px;
  line-height: 2.7;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-transform: initial;
  white-space: nowrap;
  transition-property: background, border, box-shadow, color;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  color: rgb(255, 255, 255);
  margin: 0px;
  padding: 0px 1.8rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
`

export default button
