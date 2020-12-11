import '../styles/global.css'
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import * as gtag from "../components/gtag";

export default function App({ Component, pageProps }) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url, process.env.GA_TRACKING_ID)
      console.log("url inside of app " + url)
    }
    // pageProps.set("shareUrl", window.location.href)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}
