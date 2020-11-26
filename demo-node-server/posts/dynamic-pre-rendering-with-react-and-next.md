# DYNAMIC PRE-RENDERING WITH REACT AND NEXT

In the previous blog, [Technical Search Engine Optimization](https://medium.com/patrik-bego/technical-search-engine-optimization-717ccc73aa8b), I was describing concepts and ways to achieve good Search Engine Optimization. In this blog, I will show you how to accomplish that with [Reactjs](reactjs.com)/[Nextjs](nextjs.com) server-side rendering (SSR).

For our POC, we will build a Blog web-app which will read the data from Node.js Rest API and pre-render React.js components with Next.js on the client-side. 

The whole project is located [here](https://github.com/patrikbego/react-prerendering) and if you want to run it locally, you have to start Node.js server with the command: `node demo-node-server/post-api.js`. This will start a server on http://localhost:8080.

To run the frontend, execute in the command line: `npm run start` (for debug mode: `npm run dev`).
That will start the Nextjs server, and you should be able to open the web-app in the browser on  http://localhost:3000.

#### Next js project structure: 
Before we dive into the code, let us just quickly go through a couple of Next.js guidelines we will use in this project.
Next.js is a framework, and for it to work as intended, we need to follow specific project structure. The minimum required is "./pages" directory and "index.js" file in it. If you were to create overrides for your app or document, then you can do that inside "_app.js" and a "_document.js" files (also inside the "./pages" folder). The "./public" directory is another folder that Next.JS looks into for static files to be emitted into the final build directory.

For, e.g. our project structure looks like this:
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
│   │   ├── internal-post.js
│   │   ├── posts.js
│   │   ├── posts.test.js
│   │   ├── user.test.js
│   │   └── users.js
│   ├── components
│   │   ├── date.js
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
`Pages` folder can be located in either root folder or src, but not in both.

#### Next.js features (used in this demo)
Next.js has quite a few features. Here we will mainly focus on the retrieving dynamic content from the server. 
  
**Routing**
All js files created under ./pages directory are exposed as routes. For e.g. pages/about.js will be accessible as <host>/about.
We also need to have main index.js file which is exposed under root (/).
In our case index.js contains pure React components and Next.js method `getServerSideProps`. 
We will look into ways how to fetch data below and got a bit more into details what actually happens in `getServerSideProps`.

```javascript
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
  let blogger = await getUserData('blogger.nr1'); 
  return {
    props: {
      allPostsData,
      blogger
    }
  }
}
```
**Data fetching** is done on Next.js server-side, and there is a couple of ways/methods we can do it:
 - `getStaticProps` provides the content which is rendered at build time. That is useful if data does not change often, and it is faster than `getServerSideProps`.
 - `getStaticPaths` provides the routes which are rendered at build time in combination with `getStaticProps`. It needs to define a list of paths that have to be rendered to HTML at build time.
 - `getServerSideProps` provides the content which is rendered at request time. It is slower than `getStaticProps`, but with some extra caching, we can still achieve decent timing.
    - getServerSideProps runs on the server-side of Next.js. We can access the database or filesystem directly from the method.
    In our case, we get all the "post" data and all the information about the blogger from the `demo-node-server` Rest API.
    In the `Layout` component, we list the titles of blogs in the `MainList`. Once the link is clicked we handle it with another Next.js solution called "dynamic routing".
    Link inside of `MainList` is again a simple react component which redirects the page to the blog.
```javascript
    <Link href="/posts/[id]" as={`/posts/${id}`}>
      <a>{title}</a>
    </Link>
```


**Dynamic routing**
Files named as pages/[<id>].js will be exposed dynamically as routes. 
That is useful in case the server controls the routes. For e.g. file pages/posts/[id].js will parse the content for each specific blog and expose it as posts/1, posts/2, etc.
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
Here we can see that the `id` has been passed from the URL to the `getServerSideProps` method. Based on that, we fetch the blog data. 
Here we fetch the user data again. This could be optimized but left it there on purpose for demonstration reasons. 

**Built-In CSS Support**
the main CSS file can be imported inside of ./pages/_app.js
and [name].module.css can be used for automatic component level import. Next.js has quite a few additional actions for CSS which can be found [here]https://nextjs.org/docs/basic-features/built-in-css-support

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

And that is it, we have a perfectly SSR web app :) 
You can pull the [project](https://github.com/patrikbego/react-prerendering) and get a better idea of how SSR works. 

