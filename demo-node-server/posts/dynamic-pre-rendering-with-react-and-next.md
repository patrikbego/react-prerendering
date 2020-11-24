---
title: "DYNAMIC PRE-RENDERING WITH REACT AND NEXT"
date: "2020-11-15"
---

In the previous blog, [Technical Search Engine Optimization](https://medium.com/patrik-bego/technical-search-engine-optimization-717ccc73aa8b), I was 
describing concepts and ways to achieve good Search Engine Optimization. 
In this blog, I will show how to achieve that with [React](reactjs.com)/[Next](nextjs.com) server pre-rendering.

For our POC I decided to build a Blog web-app which will read the data from Node.js Rest API and pre-render React.js components 
with Next.js on the client-side. 

The whole project is located [here](https://github.com/patrikbego/react-prerendering) and if you want to run it locally you have to start Node.js server with the command: `node demo-node-server/post-api.js`. That will start a server on http://localhost:8080.

To run the frontend, execute in the command line: `npm run start` (for debug mode: `npm run dev`).
That will start the webserver on http://localhost:3000, and you should be able to open the web-app in the browser.

#### Next js project structure: 
Before we dive into the code let us just quickly go through couple of Next.js concepts.
Next.js is a framework, and for it to work as intended, we need to follow specific project structure. 
The minimum required is "./pages" directory and "index.js" in it. 
If you were to create overrides for your app or document, then you can do that inside "_app.js" and a "_document.js" files (also inside the "./pages" folder). 
The "./public" directory is another folder that Next.JS looks into for static files to be emitted into the final build directory.

Next.js features we use in this demo:
**Routing**: all javascript files created under ./pages directory will be exposed as a route. For e.g. pages/about.js will be accessible as <host>/about.
**Dynamic routing**: Similar can be achieved for dynamic routing. Files named as [<id>].js will be exposed dynamically as routes. That is useful in case the server controls the routes. For e.g. file pages/posts/[id].js will parse the content for each specific blog and expose it as posts/1, posts/2, etc.
**Data fetching**: a couple of methods manages data fetching in Next.js: 
 - `getStaticProps` method is used mainly to render pages ahead of users request. It needs to define a list of paths that have to be rendered to HTML at build time.
 - `getStaticPaths` is used if a page has dynamic routes and uses 
 - `getServerSideProps` used if you need to pre-render a page whose data must be fetched at request time.

**Built-In CSS Support**:
the main CSS file can be imported inside of ./pages/_app.js
and [name].module.css can be used for automatic component level import. Next.js has quite a few additional actions for CSS which can be found [here]https://nextjs.org/docs/basic-features/built-in-css-support

**Image Optimization**:
Next.js automatically optimizes an image being served to the client. It optimizes and resizes image based on the viewport.
It allows us to define internal/local or external (cmd ...) images. 
Definition for external images has to be defined in next.config.js: 
```
module.exports = {
  images: {
    domains: ['assets.vercel.com'],
  },
}

```


#### Testing 

Testing is based on Jest.js and React preferred way of testing. 
To run tests execute in the command line: `jest` or `jest --coverage`

Testing dependencies: ./mocks ./setupTests.js ./tests

### Project tree structure
```
.
├── README.md
├── demo-node-server
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── post-api.js
│   └── posts
│       ├── java-introduction-to-blockchain.md
│       └── techical-search-engine-optimization.md
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
│   │   ├── __snapshots__
│   │   │   ├── dateLabel.test.js.snap
│   │   │   ├── layout.test.js.snap
│   │   │   ├── mainList.test.js.snap
│   │   │   └── shareFooter.test.js.snap
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
│   ├── public
│   │   ├── favicon.ico
│   │   └── images
│   │       └── profile.jpg
│   └── styles
│       ├── global.css
│       └── utils.module.css
└── tests
    ├── __mocks__
    │   ├── fileMock.js
    │   └── styleMock.js
    ├── index.test.js
    └── setupTests.js




```
