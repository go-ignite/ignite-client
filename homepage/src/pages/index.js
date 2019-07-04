import React from "react"
import "normalize.css"
import { Link } from "gatsby"
import MediaQuery from "react-responsive"
import Login from "../components/login"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import { Wrap } from "../components/base"
import "./index.less"
import cloud1Bg from "../images/clouds-01.png"
import cloud2720Bg from "../images/clouds-02-720.png"
import cloud21440Bg from "../images/clouds-02-1440.png"
import cloud22880Bg from "../images/clouds-02-2880.png"
import river720Bg from "../images/river-720.png"
import river1440Bg from "../images/river-1440.png"
import river2880Bg from "../images/river-2880.png"
import riverBg from "../images/river-day.png"
import planeBg from "../images/plane-day.png"
import { IndexContextConsumer } from "../utils/indexContext"

function doLogin(ctx) {
  return () => ctx.setVisLogin(true)
}
const IndexPage = () => {
  return (
    <Layout>
      <div>
        <SEO title="ignite" />
        <div className="main-banner">
          <Wrap>
            <section className="main-banner-content">
              <h1>Ignite</h1>
              <p>A dockernized service for shadowsocks.</p>
              <div className="main-banner-btn">
                <IndexContextConsumer>
                  {ctx => <Button onClick={doLogin(ctx)}>登陆</Button>}
                </IndexContextConsumer>
              </div>
            </section>
          </Wrap>
          <div className="main-banner-wrap cloud-svg">
            <svg
              width="100%"
              viewBox="0 0 2880 1502"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2880 1238C2880 1326 2880 1414 2880 1502C1920.2 1502 960.5 1502 0 1502C0 1002.7 0 503.3 0 4C8 2.7 16 1.3 24 0C36.7 0 49.3 0 62 0C66.8 0.8 71.7 1.7 76.5 2.5C146.7 14.7 200.1 51.3 236.4 112.6C238.1 115.4 239.8 118.1 241.7 121.4C274.8 106.5 308.3 103.7 342.4 114.6C376.9 125.6 402.6 147.8 420.9 178.9C447 171 469 176.3 486.1 196.3C544.8 168.3 593.8 179.3 634 230.5C640.1 223.7 646.6 217.8 656.4 219.8C666.4 221.9 667.9 231.5 672 238.4C722.8 215.2 767.7 222.5 807.1 261.5C851.7 226.5 901.5 213.6 956.6 227.3C1012 241.1 1049.9 276.4 1073 328.2C1112.6 326.3 1147.1 337.6 1175.6 365.1C1204 392.5 1216.1 426.8 1215.9 465C1277.3 478.1 1310.7 515 1317.2 576.5C1376.7 583.8 1412.2 617 1423.5 675.8C1437.1 676.3 1448.8 680.3 1458.3 689.6C1467.8 698.9 1471.9 710.6 1472.8 723.6C1486.6 725.7 1494.7 733.6 1497.6 746.2C1515.5 749.5 1517.3 750.5 1527 763.9C1563.4 763 1590.1 778.9 1606.4 811.6C1628.5 813.4 1632.2 815.2 1645.5 831.5C1705.6 822.1 1761.7 855.9 1780.7 915.4C1826.8 916.4 1857.2 948.2 1858.9 991.6C1882.6 996.6 1900.3 1010 1910.7 1031.8C1967.2 1024.5 2015.7 1061.9 2020.5 1120.8C2059.9 1121.4 2083.4 1141.7 2091.7 1179.6C2135.2 1182.4 2147.7 1190.2 2175 1231.4C2189.5 1227.5 2202.1 1232.2 2213 1241.6C2242.4 1222.5 2269.4 1225.7 2294.3 1248.3C2334.3 1221.4 2392.7 1223.8 2429.7 1274C2449.9 1262.8 2471.3 1258.8 2494 1264.9C2516.7 1271 2533.5 1284.9 2545.6 1305.1C2564.6 1298.6 2580.8 1302.9 2594.5 1316.4C2639.8 1281.9 2685.8 1281.3 2732.3 1312.7C2740.9 1292.7 2748 1291.4 2765.9 1306C2767.7 1303.2 2769.5 1300.5 2771.3 1297.7C2787.3 1272.7 2809.1 1254.9 2837 1244.8C2850.8 1239.9 2865 1236.3 2880 1238Z"
                fill="#FBFCFB"
              ></path>
            </svg>
          </div>
          <MediaQuery minDeviceWidth={1224}>
            <div className="main-banner-wrap cloud1">
              <div className="main-banner-cloud1-pd"></div>

              <img className="main-banner-cloud1" src={cloud1Bg} alt="" />
            </div>
            <div className="main-banner-wrap cloud2">
              <div className="main-banner-cloud2-pd"></div>
              <img
                sizes="(max-width: 2880px) 100vw, 2880px"
                srcSet={`${cloud2720Bg} 720w, ${cloud2720Bg} 1440w, ${cloud21440Bg} 2880w`}
                className="main-banner-cloud2"
                alt=""
              />
            </div>
            <div className="main-banner-wrap river">
              <img
                sizes="(max-width: 2880px) 100vw, 2880px"
                srcSet={`${river720Bg} 720w, ${river1440Bg} 1440w, ${river2880Bg} 2880w`}
                className="main-banner-river"
                src={river1440Bg}
                alt=""
              />
            </div>
            <div className="main-banner-wrap plane">
              <img className="main-banner-plane" src={planeBg} alt="" />
            </div>
          </MediaQuery>

          <IndexContextConsumer>
            {ctx => ctx.visLogin && <Login />}
          </IndexContextConsumer>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
