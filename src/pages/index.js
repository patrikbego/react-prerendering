import Head from 'next/head'
import React from 'react';
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../api/posts'
import MainList from "../components/mainList";
import {getUserData} from "../api/users";
import MainLayout from "../components/mainLayout";

export default function Home({postsData, blogger}) {
  return (
    <MainLayout home>
      <Head>
        <title>{blogger.siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>About Code and Life Hacking</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}></h2>
        <MainList postsData={postsData}/>
      </section>
    </MainLayout>
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
