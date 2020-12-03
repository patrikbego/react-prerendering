import fetch from 'node-fetch';

let API_BASE_URL = 'http://localhost:8080/api/user'


export async function getUserData(id) {
  let user;
  let res = {};
  try {
    res = await fetch(`${API_BASE_URL}/${id}`)
  } catch (e) {
    console.log(e)
    API_BASE_URL = 'http://next-blog-api:8080/api/user' // dockers url
    res = await fetch(`${API_BASE_URL}/${id}`)
  }
  user = await res.json();
  return user;
}
