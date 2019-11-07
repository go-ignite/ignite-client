import React from "react"
import styled from "styled-components"
import Grid from "@material-ui/core/Grid"
import { Wrap } from "../ui"

export default () => {
  return (
    <StyledWrap>
      <Wrap>
        <Grid container>
          <Grid item xs={12} md={6} container justify="flex-start">
            <StyledImgWrap></StyledImgWrap>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTitle>功能完善</StyledTitle>
            <StyledContent>
              <p>
                go-ignite是一个基于Docker实现，由Golang开发的多账户SS管理面板。对用户来说，SS服务被隔离在单独的容器中，安全高效，一键创建服务，简单方便。对管理员，提供后台管理页面，能够快捷的管理用户服务，重置流量等。
              </p>
            </StyledContent>
          </Grid>
        </Grid>
        <Grid container direction="row-reverse" style={{ marginTop: "120px" }}>
          <Grid item xs={12} md={6} container justify="flex-end">
            <StyledImgWrap></StyledImgWrap>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTitle>多节点支持</StyledTitle>
            <StyledContent>
              <p>
                We have worked with one of the largest and most popular digital
                and marketing agencies in the World.
              </p>
              <p>
                If you are running a marketing agency often times building your
                own in-house software development team can be costly and very
                time-consuming. You will also need to create your technical
                processes, infrastructure and tools from scratch. If your agency
                is based in a region where highly skilled technical talent is
                not readily available that can also be a significant impediment
                for you and your clients. We at Delinx have been working with
                the largest digital and marketing agencies in the World, and we
                have the tools and infrastructure in place to deliver the best
                results for you and your clients. You can either come to us with
                a complete specification and design or have us conceptualize,
                design and build everything for you from scratch.
              </p>
            </StyledContent>
          </Grid>
        </Grid>
      </Wrap>
    </StyledWrap>
  )
}
const StyledWrap = styled.section`
  background: #fff;
  margin-top: 120px;
  margin-bottom: 120px;
`
const StyledTitle = styled.h2`
  color: #2c2b39;
  font-size: 45px;
  text-align: center;
`
const StyledContent = styled.div`
  color: #2c2b39;
  font-size: 14px;
  line-height: 1.4;
`

const StyledImgWrap = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid black;
`
