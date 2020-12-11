import PostLayout from '../../components/postLayout'
import {getPostData} from '../../api/posts'
import Head from 'next/head'
import DateLabel from '../../components/dateLabel'
import utilStyles from '../../styles/utils.module.css'
import React, {useEffect, useState} from "react";
import ShareFooter from "../../components/shareFooter";
import {getUserData} from "../../api/users";

export default function Post({postData, blogger, shareUrl}) {

  (function () {
    console.log("typeof window !== 'undefined' " + (typeof window !== 'undefined'));
    if (typeof window !== 'undefined') {
      shareUrl = window.location.href;
      console.log("shareUrl = window.location.href;  " + (shareUrl));
      console.log("shareUrl = window.location.href;  " +Date.now())
    }
  })();
  let windowFunc = function () {
    console.log("typeof window !== 'undefined' windowFunc " + (typeof window !== 'undefined'));
    if (typeof window !== 'undefined') {
      shareUrl = window.location.href;
      console.log("shareUrl = window.location.href;  windowFunc " + (shareUrl));
      console.log("shareUrl = window.location.href;  windowFunc " +Date.now())
    }
  }
  useEffect(() => {
    // this.setState({shareUrl: window.location.href})
    shareUrl = window.location.href;
    console.log('shareUrl = window.location.href ' + shareUrl)
    console.log('shareUrl = window.location.href ' + Date.now())
  });
  console.log("component render: " + Date.now())
  const [share, setShare] = useState()
  useEffect(() => {
    async function loadTodos() {
      setShare(window.location.href)
    }
    loadTodos()
  }, [])

  return (
    <PostLayout user={blogger} postData={postData} shareUrl={share}>
      <Head>
        <title>{postData.meta.title}</title>
      </Head>
      <article>
        {/*{shareUrl}{todos}*/}
        <h1 className={utilStyles.headingXl}>{postData.meta.title}</h1>
        <div className={utilStyles.lightText}>
          <DateLabel dateString={postData.date}/>
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
      </article>
      <ShareFooter postData={postData} shareUrl={share}/>
    </PostLayout>
  )
}

export async function getServerSideProps({params, req}) {
  console.log("params: " + params);
  const postData = await getPostData(params.id)
  let blogger = await getUserData('patrik.bego'); //TODO hard coded for now
  return {
    props: {
      postData,
      blogger,
    }
  }
}

