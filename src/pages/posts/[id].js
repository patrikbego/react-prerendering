import Layout from '../../components/layout'
import {getPostData} from '../../api/posts'
import Head from 'next/head'
import DateLabel from '../../components/dateLabel'
import utilStyles from '../../styles/utils.module.css'
import React from "react";
import ShareFooter from "../../components/shareFooter";
import {getUserData} from "../../api/users";

export default function Post({postData, blogger}) {
  return (
    <Layout user={blogger}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateLabel dateString={postData.date}/>
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
      </article>
      <ShareFooter postData={postData}/>
    </Layout>
  )
}

export async function getServerSideProps({params}) {
  console.log(params);
  const postData = await getPostData(params.id)
  let blogger = await getUserData('patrik.bego'); //TODO hard coded for now
  return {
    props: {
      postData,
      blogger
    }
  }
}
