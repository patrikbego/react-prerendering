### DYNAMIC PRE-RENDERING WITH REACT AND NEXT

This is a [React](reactjs.com)/[Next](nextjs.com) example of "server side pre-rendering".

Project is based on starter template for Learn Next.js, with addition of server api call (node js project located in ./demo-node-server). 
Some guides regarding next:
    You can fairly say that at the minimum you’ll need a “pages/” directory and “index.js(x)” file within it. If you were to create overrides for your app or document then you have an “_app.js(x)” and a “_document.js(x)” files also inside the “pages/” folder. The “public/” directory is another folder that Next.JS looks into for static files to be emitted into the final build directory. Other than these files and directories, everything goes.

To run the node server, execute in command line: `node demo-node-server/post-api.js`

To run the project, execute in command line: `npm run start` (for debug mode : `npm run dev`).
That will start the web server on http://localhost:3000

#### Next js project structure: ./pages (Static generation and server-side rendering )

Routing: If you create pages/about.js that exports a React component like below, it will be accessible at /about.
Dynamic routing: If you create a file called pages/posts/[id].js, then it will be accessible at posts/1, posts/2, etc.
./pages/index.js (Static generation and server-side rendering main page) 
./public (Static file serving. Files inside public can then be referenced by your code starting from the base URL (/).)

Data fetching: for data fetching Next.js internally parses couple of methods: 
 - getStaticProps method is used mainly to render pages ahead of users request. It needs to define a list of paths that have to be rendered to HTML at build time.
 - getStaticPaths is used if a page has dynamic routes and uses 
 - getServerSideProps used if you need to pre-render a page whose data must be fetched at request time.

Built-In CSS Support:
in ./pages/_app.js. we can import main css file
[name].module.css name styling can be used for component level

#### Testing 

Testing is based on Jest.js and React preferred way of testing To run tests execute in command line: jest

Testing dependencies: ./mocks ./setupTests.js ./tests

### Project tree structure
```
.
├── README.md
├── __mocks__
│   ├── fileMock.js
│   └── styleMock.js
├── components
│   ├── __snapshots__
│   │   ├── date.test.js.snap
│   │   ├── layout.test.js.snap
│   │   └── mainList.test.js.snap
│   ├── date.js
│   ├── date.test.js
│   ├── layout.js
│   ├── layout.module.css
│   ├── layout.test.js
│   ├── mainList.js
│   ├── mainList.test.js
│   └── testComponent.js
├── demo-node-server
│   ├── README.md
│   ├── post-api.js
│   └── posts
│       ├── pre-rendering.md
│       └── ssg-ssr.md
├── jest.config.js
├── lib
│   ├── posts.js
│   └── posts.test.js
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
└── tests
    └── index.test.js




```
