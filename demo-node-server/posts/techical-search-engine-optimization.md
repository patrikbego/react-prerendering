# TECHNICAL SEARCH ENGINE OPTIMIZATION
Search Engine Optimization (SEO) is changing and evolving every year.
SEO concepts that used to work a couple of years ago might no longer be effective today.

Search engines change their algorithms quite frequently, and with new development trends, like 
Single Page Application (SPA),
Progressive Web Apps (PWA), 
Accelerated Mobile Pages (AMP), 
API-First Approach (AFA), SEO becomes more complex. 
Additional considerations have to be kept in mind to achieve 
a good search engine rating, 
and additional development effort might be needed.


In this article, I will not be explaining details of how SEO works.
Enough has been written about it, and if you just search online for "how SEO works", you will find plenty of articles and documentation (I would go for the first result. Most likely, it has the best SEO behind it :) ).
Here, I will try to explain the main concepts to achieve a good web application 
SEO and focus on technical considerations we have to consider when we develop a web application. 

## PROBLEMS
On dynamic web applications, content is dependent on client Javascript rendering and API calls before users or robots can see the full content of the page. 
If the page isn't rendered properly (in full), then the search engines like Google and Bing will not include this page in the search results (also social sharing might not work as expected). 
Social links could be rendered like this: (add an image from Supernut)

Main SEO issues with JavaScript pages:
1. Slow and complex indexing process  
2. Errors in JavaScript code/"robot (browser) compatibility". In Google's case, robots use the latest Chromium version as a rendering engine.
3. Exhausted crawling budget/"page load times"
   	- Images are one of the main culprits of slow pages!

## HOW SEARCH ROBOTS WORK:
To solve these problems, first, we need to understand how Search Engine Robots work.
Fundamentally, search robots or crawlers will follow the links, sitemaps, and redirects. 

When they find the link, the following happens:
- First, the HTML gets downloaded.
- Links get extracted.
- CSS gets downloaded.
- JavaScript resources get downloaded.
- JavaScript and DOM get rendered.
- API calls are made and rendered.
- Application/Page gets assembled.
- And finally, the search engine will index/store and rank this page.

This approach might be slightly different for different search engines, but this roughly describes Google's approach.

Currently, Google is still on top of the most used search engines with the rest following a bit further behind (this does not mean we should not consider them - remember Yahoo in 2000 :) ) 

Top search engines today and their market share:

1. Google ~75% on websites and ~90% on mobile
2. Bing ~12% on websites and ~1% on mobile
3. Baidu ~8% on websites and ~4% on mobile
4. Yahoo! ~3% on websites and ~1% on mobile
5. Yandex >1% on websites and >1% on mobile
6. Ask >1% on websites and >1% on mobile
7. DuckDuckGo >1% on websites and >1% on mobile
8. Naver >1% on websites and >1% on mobile

## SOLUTIONS
There are different solutions in place for different web architectures and frameworks.
A common approach today, for good SEO, is the Server-Side Rendering (SSR) and Statically Generated Pages (in Part 2 of this blog I will go into technical details on how to achieve SSR with Nextjs and React).

### Server Side Rendereding (SSR)
Pre-rendering or server-side rendering (SSR) is the process of rendering JS and API resources on the server and then serve them completely rendered. 
This is a good solution for large dynamic web apps like e-commerce, where content is frequently changing, and the data displayed depends on different API calls.

There are different tools and frameworks available to achieve that:
   - frameworks like [Nextjs](https://github.com/vercel/next.js) or [Angular Universal](https://angular.io/guide/universal)
   - and tools like [Rendertron](https://github.com/GoogleChrome/rendertron) or [Puppeteer](https://github.com/puppeteer/puppeteer)

### Statically Generated Pages
The process of rendering the pages at build time and then serve it, is called the "Static generation". Once we have generated these pages, we can store these files independently and redirect search engine robots there.
   - a service like [prerender.io](https://prerender.io/) might be a good solution for this in case we don't want to host files ourselves (here, we have to consider the cost)
   - or we can use a framework like [Gatsbyjs](https://www.gatsbyjs.com/) which will pre-render the pages at build time and serve it from your server (a good solution for "static" web applications, which do not change frequently)
     
### General SEO Considerations
In addition to rendering, for every web application, we have to consider the proper configuration/setup of the following resources within our project:

**robots.txt**   
This file informs search engine robots on directives and URL's/paths in your app. It should be located in the root of your project and it should be configured carefully. More details about its configuration can be found [here](https://support.google.com/webmasters/answer/6062608?hl=en).  

Example of robots.txt file:
```
User-Agent: *
Dissalow: /admin/*

Sitemap: <path>/sitemap.xml
```


**SITEMAPS**   
Sitemap file (sitemap.xml) contains information about all the paths/routes in our web application.
It needs to be generated accordingly to the web application and stated in the robots.txt file.
We can achieve a sitemap generation with tools like [sitemap-generator](https://www.npmjs.com/package/sitemap-generator).

**META TAGS**   
The search meta tags instruct search engine robots on how to index our web application in a more granular way (per page).   
They are located within the `<head>` of the HTML of our web application.   
The most common tags are:   
- `index/noindex` tells the engines whether the page should be crawled and kept in a search engine's index for retrieval.
- `follow/nofollow` tells search engines whether links on the page should be followed or not followed.
- `noarchive` is used to restrict search engines from saving a cached copy of the page.

e.g.:
`<meta name="robots" content="index,follow"/>`

**KEY TERMS**   
Key terms describe the application's content in a couple of words.
When building your web application, it's a good idea to do a bit of research and analysis and use key terms that your users use to search for your type of content.  

e.g.:`<meta name="keywords"
        content="nutrients,recipes,healthy,health,sports, nutrition,nutritional,micronutrients,macronutrients"/>`

**ACCURATE PAGE TITLES**   
A page title is visible in the browser's title bar and search results. They match the content of your documents. Users are more likely to click a link if the title matches their search and the search index might also be affected if titles are not corresponding with the page.

Example of dynamic title: `<title ng-bind="meta.title"></title>`

**AVOID TEXT IN IMAGES**   
Keep relevant text and links in HTML. Encoding your text in graphics or [image maps](https://www.w3schools.com/html/html_images_imagemap.asp) can prevent search engines from finding the text or following links to your website's other pages.

**ALT TEXT FOR IMAGES**   
ALT text improves the searchability of the image content of your pages. It also makes your pages more accessible to text-only browsers and visually impaired site visitors.

Example of alt attribute: `<img src="carrots.gif" alt="Carrots">`

**MEANINGFUL CROSS-LINKS**   
Meaningful links between your web application and other related websites or providers of relevant content add value to users and can boost your ranking.

**READABLE URL'S**   
Use URL's that represent the content pages instead of numeric or otherwise cryptic URL's.

**IMAGE/CONTENT OPTIMIZATION**
   - Make images responsive with the attribute `srcset` and deliver the best image size for each device.  
   	Example of responsive image: 
```
<img srcset="carrots-480w.jpg 480w,
             cacrrots-800w.jpg 800w"
     sizes="(max-width: 600px) 480px, 800px"
     src="carrtos-800w.jpg"
     alt="Carrots">
    
```  
    
   - Show visitors that image loading is in progress with lazy loading
   - Improve speed by compressing and bundling your files

To prevent search engines from indexing multiple versions of a single page,
Google recommends having a self-referencing canonical tag on every page on your web application (https://developers.google.com/search/mobile-sites/mobile-seo/)


## TESTING
Quite often the owners of web applications are not even aware of issues with their web application rendering and responsiveness.
That is why it is important to test and analyze your web application as search engine robots might see it.
Bear in mind that search engines might take a week or two for your page to be indexed.
You can speed up this process a bit by submitting a sitemap to search engines and forcing reindexing   
      - how to do it for [Google](https://support.google.com/webmasters/answer/183668?hl=en)   
      - how to do it for [Bing](https://www.bing.com/webmaster/help/how-to-submit-sitemaps-82a15bd4)   
      - how to do it for [Baidu](https://ziyuan.baidu.com/linksubmit/url)   

Couple of things to check:

1. Most search engines today claim that they are able to process the JS web application. But in reality the way they do it is still different than the web clients do it.
For example, Google robots process JS in the second pass (page rendering is not instant).
So it is good to check how robots can render your website without JS
      - [Disable Javascript in the browser and load the page](https://developers.google.com/web/tools/chrome-devtools/javascript/disable). 
      This is especially important if you are using the pre-rendering approach.
      - [Load the web application in the incognito mode](https://support.google.com/chrome/answer/95464)
      - You should expect content to be readable/visible

2. Check how your web application is indexed
      - in search console type `site:your-domain.com` (add an image with example)
      - if your page has been crawled by robots you should expect to see all the sub-links as stated in the sitemap in the results
      - [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289)

3. Analyse web application
      - [Check page rendering times](https://developers.google.com/speed/pagespeed/insights/)
      - [Check mobile friendliness](https://search.google.com/test/mobile-friendly)
      - [Quality guidelines check](https://support.google.com/webmasters/topic/6001971?hl=en&ref_topic=6001981)

4. Check SEO ranking:
	- [rankingcheck](https://www.seobility.net/en/rankingcheck/)
	- [seo-analyzer](https://neilpatel.com/br/seo-analyzer/)


# CONCLUSION
For effective SEO, we have to keep in mind that different software architecture might require different approaches. 
If you have the luxury of including SEO concepts into your architecture, dynamic pre-rendering with frameworks like Nextjs or Gatsbyjs might be the best. 
In case your application can't include new frameworks in their architecture, there are still solutions that can sit on top or next to your application like Prerender or Puppeteer.  
This is a solid start to  make your web page visible to most of the robots and crawlers and a good start towards being visible online.

**References and links:**   
- Google 
      - https://developers.google.com/search/docs/guides/get-started   
      - https://support.google.com/webmasters/answer/35769?hl=en
      - https://developers.google.com/search/reference/robots_meta_tag   
      - https://support.google.com/webmasters/answer/6062596?hl=en   
      - https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf
- Bing       
      - https://www.bing.com/webmaster/help/getting-started-checklist-66a806de   
      - https://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a
- Baidu
      - https://ziyuan.baidu.com/https/index (only Chinese)   
      - https://www.dragonmetrics.com/how-to-optimize-your-site-with-baidu-webmaster-tools/#https-migrate   
- Yahoo
      - https://help.yahoo.com/kb/higher-website-rank-sln2216.html   
- Mozilla
      - https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images   
