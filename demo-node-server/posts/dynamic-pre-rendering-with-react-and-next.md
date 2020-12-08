---
title: "DYNAMIC PRE-RENDERING WITH REACT AND NEXT"
date: "2020-11-29"
---

# DYNAMIC PRE-RENDERING WITH REACT AND NEXT

In the previous blog, [Technical Search Engine Optimization](https://medium.com/patrik-bego/technical-search-engine-optimization-717ccc73aa8b),
 I described concepts and ways to achieve good Search Engine Optimization. 
 In this blog, I will explain how to achieve that with Reactjs / Nextjs Server-Side Rendering (SSR).
 [Reactjs](reactjs.com) and [Nextjs](nextjs.com).

For our POC, we will build a Blog web-app which will read the data from Node.js Rest API and pre-render React.js 
components with Next.js on the client-side. We will mainly focus on what solutions Nextjs provides us, so it is kind of 
expected you have a basic Javascript knowledge and are familiar with tools like `npm`. 

You can have a look at the project on [GitHub](https://github.com/patrikbego/react-prerendering), and if you want to run it locally, you can pull the code and start Node.js server with the command:  
`node demo-node-server/post-api.js`

This will start a server on http://localhost:8080 and expose basic Rest API.

To run the Next.js server and client, execute in the command line:  
`npm run start` (for debug mode: `npm run dev`)  

That will start the server, and you should be able to open the web-app in the browser on  http://localhost:3000.

Alternatively, you can create a new npm project with: `npm init`.
Add below dependencies into packages.js, and you will have a base React/Next.js project.
```json
"dependencies": {
    "next": "^10.0.3",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
  }
```

#### Next.js project structure
Before we dive into the code, let us just quickly go through a couple of Next.js guidelines that we have to follow.  
Next.js is a framework, and for it to work as intended, it needs specific project structure. The minimum required is "./pages" directory and "index.js" file in it.  
If you were to create overrides for your app or document, then you can do that inside "_app.js" and a "_document.js" files (also inside the "./pages" folder). The "./public" directory is another folder that Next.JS looks into for static files to be emitted into the final build directory.

Our project structure looks like this:
```
.
├── README.md
├── demo-node-server
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── post-api.js
│   └── posts
│       ├── best-practices-in-life.md
│       └── break-the-bad-habits.md
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── api
│   │   ├── internalPost.js
│   │   ├── posts.js
│   │   ├── posts.test.js
│   │   ├── user.test.js
│   │   └── users.js
│   ├── components
│   │   ├── dateLabel.js
│   │   ├── dateLabel.test.js
│   │   ├── layout.js
│   │   ├── layout.module.css
│   │   ├── layout.test.js
│   │   ├── mainList.js
│   │   ├── mainList.test.js
│   │   ├── shareFooter.js
│   │   ├── shareFooter.module.css
│   │   ├── shareFooter.test.js
│   │   └── testComponent.js
│   ├── pages
│   │   ├── _app.js
│   │   ├── index.js
│   │   └── posts
│   │       └── [id].js
│   └── styles
│       ├── global.css
│       └── utils.module.css
├── public
│   ├── favicon.ico
│   └── images
│       └── profile.jpg
└── tests
    ├── __mocks__
    │   ├── fileMock.js
    │   └── styleMock.js
    ├── index.test.js
    └── setupTests.js

```
`Pages` folder should be located in either root folder or src, but not not on both locations.

#### Next.js features (used in this demo)
Next.js has quite a few features. Here we will mainly focus on the retrieving dynamic content from the server and rendering it. For that, we will use the following:

**Routing**  
Routing is Next.js can be achieved easily with placing a js file into ./pages directory. That will automatically expose it as a route (no additional configuration is needed).  
For e.g. pages/about.js will be accessible as <host>/about.
We also need to have main index.js file which is exposed under root (/).
In our case, index.js (code below) contains pure React components and Next.js method `getServerSideProps`. This method is crucial for providing dynamic content on Next.js server and rendering the content of a page.

```javascript
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
  let allPostsData = await getSortedPostsData();
  let blogger = await getUserData('blogger.nr1'); 
  return {
    props: {
      postsData,
      blogger
    }
  }
}
```
&nbsp;
Data fetching
In the above code snippet, we dynamically fetched the content/props from the Rest API with `getServerSideProps` 
method and passed it to the component which can then be pre-rendered for the client.  
But data fetching in Next.js can be achieved in a couple of ways, depending on use case and content.
For this, Next.js has the following methods which can be added to the component:
- `getStaticProps` method provides the content which is rendered at build time. That is useful if the content of a page does not change often, and it is faster than `getServerSideProps`.
- `getStaticPaths` method provides the routes which are rendered at build time in combination with `getStaticProps`. It defines a list of paths that have to be rendered at build time.
- `getServerSideProps` method provides the content which is rendered at request time. It is slower than `getStaticProps` but in the case of retrieving the dynamic content from the Rest API that is the way to do it.
- note that `getServerSideProps` runs on the server-side of Next.js. We can access the database or filesystem directly from the method.

In our example above, we get all the "blog" content and all the information about the blogger from the Rest API (`demo-node-server`) as postsData and blogger objects linked to the component.
That data is then listed in the `Layout` component inside of `MainList`. Here we use another react component,`Link`, which redirects the page to the blog content retrieved from the Node server.
  
```javascript
    <Link href="/posts/[id]" as={`/posts/${id}`}>
      <a>{title}</a>
    </Link>
```
Once the link is clicked we handle it with "dynamic routing".

**Dynamic routing**  
Dynamic routing is another Next.js method of exposing routes dynamically.
In our case that is pretty handy since routes are based on the posted blogs. 
For e.g. file pages/posts/[id].js will parse the content for each specific blog and expose 
it as posts/best-practices-in-life, posts/break-the-bad-habits, etc.
  ```javascript
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
   let blogger = await getUserData('blogger.nr1'); //TODO hard coded for now
   return {
     props: {
       postData,
       blogger
     }
   }
 }
```
In above snippet we can see that the `id` has been passed from the URL to the `getServerSideProps` method, 
and based on that blog data is fetched from Node server.


**Built-In CSS Support**  
In Next.js we can  conveniently import the main CSS file inside of ./pages/_app.js.
CSS files with the same name as JS files [name].module.css can be used for automatic component level import.

Next.js has quite a few additional actions for CSS which can be found [here]https://nextjs.org/docs/basic-features/built-in-css-support.

**Image Optimization**  
Next.js automatically optimizes an image being served to the client (since version 10.0.0). It optimizes and resizes image based on the viewport.
It allows us to define internal/local or external (cmd ...) images.
Definition for external images has to be defined in next.config.js:
```javascript
module.exports = {
  images: {
    domains: ['assets.com'],
  },
}
```

That is pretty much all the features we need for a good search engine rendering. We should still address topics mentioned in the previous [blog](https://medium.com/patrik-bego/technical-search-engine-optimization-717ccc73aa8b) and invest some effort into non-technical SEO, and our web-app should be ready for the world ;)
