import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import fetch from 'node-fetch';

let API_BASE_URL = process.env.API_URL + '/api/post'

export async function getSortedPostsData() {
  let fileNames;
  try {
    const res = await fetch(`${API_BASE_URL}/names`)
    fileNames = await res.json();
    console.log('fileNames: ' + fileNames);
  } catch (err) {
    console.log(err);
  }

  let postsData = [];

  for (let key in fileNames) {
    if (fileNames.hasOwnProperty(key)) {
      console.log(key + " -> " + fileNames[key]);
      postsData.push(await handleDataPromise(fileNames[key]));
    }
  }

  // Sort posts by date
  return postsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function handleDataPromise(fileName) {
  const id = fileName.replace(/\.md$/, '')
  let data;
  try {
    const res = await fetch(`${API_BASE_URL}/${id}.md`)
    data = await res.json();
  } catch (err) {
    console.log(err);
  }

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(data.mddata)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}

export async function getPostData(id) {
  let data;
  try {
    const res = await fetch(`${API_BASE_URL}/${id}.md`)
    data = await res.json();
  } catch (e) {
    console.log(e)
  }
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(data.mddata)
  const meta = data.meta;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    meta,
    contentHtml,
    ...matterResult.data
  }
}
