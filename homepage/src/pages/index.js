import React from "react"
import "normalize.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "../components/login"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import "./index.less"

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <SEO title="ignite" />
        <Banner></Banner>
        <Login />
        <ToastContainer autoClose={4000}></ToastContainer>
      </div>
    </Layout>
  )
}

export default IndexPage
