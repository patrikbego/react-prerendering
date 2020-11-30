import Head from 'next/head'
import React from 'react';
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../api/posts'
import MainList from "../components/mainList";
import {getUserData} from "../api/users";

export default function Home({postsData, blogger}) {
  return (
    <Layout postsData home user={blogger}>
      <Head>
        <title>{blogger.siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{blogger.about}</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <MainList postsData={postsData}/>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  let postsData = await getSortedPostsData();
  let blogger = await getUserData('patrik.bego'); //TODO hard coded for now
  return {
    props: {
      postsData,
      blogger
    }
  }
}
