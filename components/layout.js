import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import React from 'react'

export default function Layout({children, home, user}) {
  console.log(children);
  console.log(home);
  console.log(user);
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            user.siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={user.siteTitle}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <title>Test 200</title>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src={"/images/profile.jpg"}
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={user.name}
            />
            <h1 className={utilStyles.heading2Xl}>{user.name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={user.name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{user.name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children} test1</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
