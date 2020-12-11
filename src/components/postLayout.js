import Head from 'next/head'
import utilStyles from "../styles/utils.module.css";
import styles from './postLayout.module.css'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import DynamicHead from "./dynamicHead";

export default function PostLayout({children, user: blogger, postData, shareUrl = "https://bego.tips"}) {
  console.log("PostLayout " + shareUrl)
  postData.meta.shareUrl = shareUrl;
  return (
    <div className={styles.container}>
      <DynamicHead meta={postData.meta} />
      <header className={styles.header}>
        <>
          <Link href="/">
            <a>
              <Image
                src={postData.meta.image}
                // className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                alt={blogger.name}
                width={500}
                height={500}
              />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>Bego Tips</a>
            </Link>
          </h2>
        </>
      </header>
      <main>{children}</main>
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    </div>
  )
}
