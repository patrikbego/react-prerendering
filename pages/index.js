import Head from 'next/head'
import React from 'react';
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts'
import MainList from "../components/mainList";

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <MainList allPostsData={allPostsData}/>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  let allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}
