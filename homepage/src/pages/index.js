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
              <sc.Title>IGNITE</sc.Title>
              <sc.Desc>容器化管理 Shadowsocks 服务</sc.Desc>
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
    padding-top: 200px;
  `,
  Title: styled.h1`
    font-size: 40px;
    font-weight: bold;
    color: #fff;
  `,
  Desc: styled.p`
    font-size: 20px;
    color: #fff;
  `,
}
