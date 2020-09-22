###DYNAMIC PRE-RENDERING WITH REACTJS
This is a React/Next example of "server side pre-rendering".

Project is based on starter template for [Learn Next.js](https://nextjs.org/learn), with
addition of server api (node js project located in ./demo-node-server) call. 

To run it execute in command line: `npm run dev` 
That will start the web server on [http://localhost:3000](http://localhost:3000)

####Next js project structure:
**./pages (Static generation and server-side rendering )**

    Example: If you create pages/about.js that exports a React component like below, it will be accessible at /about.
    Dynamic routing example: If you create a file called pages/posts/[id].js, then it will be accessible at posts/1, posts/2, etc.
    
./pages/index.js (Static generation and server-side rendering main page)
./public (Static file serving. Files inside public can then be referenced by your code starting from the base URL (/).)

**Data fetching**
For data fetching Next.js internally parses couple of methods:
`getStaticProps` used mainly to render pages ahead of users request 
`getStaticPaths` If a page has dynamic routes and uses getStaticProps it needs to define a list of paths that have to be rendered to HTML at build time.

`getServerSideProps` used if you need to pre-render a page whose data must be fetched at request time.

**Built-In CSS Support**
- `./pages/_app.js.` we can import main css file into within _app.js 
- `[name].module.css` name styling can be used for component level
####Testing
Testing is based on [Jest.js](https://jestjs.io/en/) and [React preferred way of testing](https://jestjs.io/docs/en/tutorial-react)
To run tests execute in command line: `jest`

Testing dependencies: 
./__mocks__
./setupTests.js
./tests

./components
./lib
./babelrc

###Project tree structure
```
.
├── README.md 
├── __mocks__
│   ├── fileMock.js
│   └── styleMock.js
├── component
│   ├── date.js
│   ├── layout.js
│   └── layout.module.css
├── demo-node-server
│   ├── README.md
│   ├── post-api.js
│   └── posts
│       ├── pre-rendering.md
│       └── ssg-ssr.md
├── jest.config.js
├── lib
│   └── posts.js
├── package-lock.json
├── package.json
├── pages
│   ├── _app.js
│   ├── api
│   │   └── internal-post.js
│   ├── index.js
│   └── posts
│       └── [id].js
├── public
│   ├── favicon.ico
│   └── images
│       └── profile.jpg
├── setupTests.js
├── styles
│   ├── global.css
│   └── utils.module.css
├── tests
│   └── index.test.js



```
