import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:8080/api/user'


export async function getUserData(id) {
  let user;
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`)
    user = await res.json();
  } catch (e) {
    console.log(e)
  }
  return user;
}
