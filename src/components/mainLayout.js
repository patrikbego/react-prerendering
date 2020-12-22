import styles from './mainLayout.module.css'
import utilStyles from '../styles/utils.module.css'
import React from 'react'
import Image from 'next/image'
import * as gtag from '../components/gtag'
import DynamicHead from './dynamicHead'

export default function MainLayout({children, home}) {
  if (process.browser) { // typeof children === 'undefined' -> we dont want to run it in test
    gtag.event({
      action: 'main_layout',
      category: 'landing_page',
      label: 'landing_page',
    })
  }

  const meta = {
    shareUrl: "https://bego.tips",
    keywords: "about code and life hacking",
    description: "about code and life hacking",
    title: "My New Blog"
  }

  return (
    <div className={styles.container}>
      <DynamicHead meta={meta}/>
      <header className={styles.header}>
        <>
          <Image
            alt="bego.tips"
            src="/images/front1.jpg"
            layout="intrinsic"
            width={500}
            height={500}
          />
          <h1 className={utilStyles.heading2Xl}>Bego Tips</h1>
        </>
      </header>
      <main>{children}</main>
    </div>
  )
}
