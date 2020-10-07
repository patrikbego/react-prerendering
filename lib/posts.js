import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:8080/api'

export async function getSortedPostsData() {
  let fileNames;
  try {
    const res = await fetch(`${API_BASE_URL}/post/names`)
    fileNames = await res.json();
    console.log(fileNames);
  } catch (err) {
    console.log(err);
  }

  let allPostsData = [];

  for (let key in fileNames) {
    if (fileNames.hasOwnProperty(key)) {
      console.log(key + " -> " + fileNames[key]);
      allPostsData.push(await handleDataPromise(fileNames[key]));
    }
  }

  // Sort posts by date
  return allPostsData.sort((a, b) => {
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
    const res = await fetch(`${API_BASE_URL}/post/${id}.md`)
    data = await res.json();
    console.log(data.mddata)
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
    const res = await fetch(`${API_BASE_URL}/post/${id}.md`)
    data = await res.json();
  } catch (e) {
    console.log(e)
  }
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(data.mddata)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    shareUrl: `${API_BASE_URL}/post/${id}.md`,
    imageUrl: `${API_BASE_URL}/post/${id}.md`,
    contentHtml,
    ...matterResult.data
  }
}
