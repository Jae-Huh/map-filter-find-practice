const fetch = require('node-fetch')
// Get data from https://jsonplaceholder.typicode.com/posts

const examplePostsData = [
  {
    "userId": 1,
    "id": 1,
    "title": "Some crazy title",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 2,
    "id": 2,
    "title": "Another stupid title",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "Third title",
    "body": "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse"
  },
]

async function fetchData(url) {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch(err) {
    console.log(`Error fetching from ${url}`, err)
  }
}

// Get post 3
async function getPost3() {
  const posts = await fetchData('https://jsonplaceholder.typicode.com/posts')
  const post3 = posts.find(post => post.id === 3)
  console.log(post3)
}
// getPost3()

// Get all posts by userId 1
async function getPostsByUser1() {
  const posts = await fetchData('https://jsonplaceholder.typicode.com/posts')
  const postsByUser1 = posts.filter(post => post.userId === 1)
  console.log(postsByUser1)
}
// getPostsByUser1()

// Get a list of titles

// Get data from https://jsonplaceholder.typicode.com/users

// Get list of all people who live in the cities of 'Wisokyburgh' or 'Roscoeview'

// create a new array, that has all the posts but now includes the name and email of the user

// get a list of posts by the person with the email 'incere@april.biz'

// Get data from https://jsonplaceholder.typicode.com/todos

// Count the number of completed todos

// Create an object that has the completed todos and uncomplete todos { completed: [], uncompleted: [] }

// Crate an object that has the users username, and then a object with their completed and incompleted todos
// { Antonette: { completed: [], uncompleted: [] }

// Count the number of completed and uncompleted todos by the user who lives in the city 'Wisokyburgh'
