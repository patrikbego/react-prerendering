import Head from 'next/head'
import React from 'react';
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts'
import MainList from "../components/mainList";
import {getUserData} from "../lib/users";

export default function Home({allPostsData, blogger}) {
  return (
    <Layout allPostsData home user={blogger}>
      <Head>
        <title>{blogger.siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{blogger.about}</p>
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
  let blogger = await getUserData('patrik.bego'); //TODO hard coded for now
  return {
    props: {
      allPostsData,
      blogger
    }
  }
}
