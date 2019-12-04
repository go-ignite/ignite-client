import React from "react"
import "normalize.css"
import { ToastContainer } from "react-toastify"
import styled from "styled-components"
import "react-toastify/dist/ReactToastify.css"
import Form from "../components/form"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.less"
import { Wrap } from "../components/ui"
import BannerRocket from "../components/BannerRocket/index"
import BannerIntro from "../components/BannerIntro/index"

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <SEO title="ignite" />
        <BannerRocket>
          <Wrap>
            <sc.MainWrap>
              <sc.Title>容器化管理您的 Shadowsocks 服务</sc.Title>
              <sc.Desc>我们提供了丰富的功能供您管理多个 Shadowsocks 服务，通过 Ignite 您可以对用户进行邀请码发放、流量监控、服务续期等，还可以对服务节点进行多节点的动态配置，供用户按需进行使用。</sc.Desc>
            </sc.MainWrap>
          </Wrap>
        </BannerRocket>
        <BannerIntro></BannerIntro>
        <ToastContainer autoClose={4000}></ToastContainer>
        <Form />
      </div>
    </Layout>
  )
}

export default IndexPage

const sc = {
  MainWrap: styled.div`
    padding-top: 300px;
    @media(max-width: 1024px) {
      text-align: center;
    }
  `,
  Title: styled.h1`
    font-size: 30px;
    font-weight: bold;
    color: #fff;
  `,
  Desc: styled.p`
    font-size: 20px;
    color: #fff;
    line-height: 1.4;
    @media(min-width: 1024px) {
      max-width: 60%;
    }
  `,
}
