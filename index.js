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
async function getTitleList() {
  const posts = await fetchData('https://jsonplaceholder.typicode.com/posts')
  const postTitles = posts.map(post => post.title)
  console.log(postTitles)
}
// getTitleList()

// Get data from https://jsonplaceholder.typicode.com/users

// Get list of all people who live in the cities of 'Wisokyburgh' or 'Roscoeview'
async function getPeopleFromWR() {
  const users = await fetchData('https://jsonplaceholder.typicode.com/users')
  const filtered = users.filter(user => {
    return user.address.city === 'Wisokyburgh' || user.address.city === 'Roscoeview'
  })
  console.log(filtered)
}
// getPeopleFromWR()

// Create a new array, that has all the posts but now includes the name and email of the user
function getPostsWUserDetails() {
  const getPosts = fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  const getUsers = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
  Promise.all([getPosts, getUsers])
    .then(([postData, userData]) => {
      const posts = postData
      const users = userData
      const detailsAdded = posts.map(post => {
        const user = users.find(user => user.id === post.userId)
        const userName = user.name
        const userEmail = user.email
        return {...post, userName, userEmail}
      })
      console.log(detailsAdded)
    })
}
// getPostsWUserDetails()

// Get a list of posts by the person with the email 'Sincere@april.biz'
function getPostList(userEmail) {
  const getPosts = fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  const getUsers = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
  Promise.all([getPosts, getUsers])
    .then(([postData, userData]) => {
      const posts = postData
      const users = userData
      const userFoundWithEmail = users.find(user => user.email === userEmail)
      const postList = posts.filter(post => post.userId === userFoundWithEmail.id)
      console.log(postList)
    })
}
// getPostList('Sincere@april.biz')

// Get data from https://jsonplaceholder.typicode.com/todos

// Count the number of completed todos
async function countCompletedTodos() {
  const todos = await fetchData('https://jsonplaceholder.typicode.com/todos')
  const completed = todos.filter(todo => todo.completed)
  console.log(completed.length)
}
// countCompletedTodos()

// Create an object that has the completed todos and uncomplete todos { completed: [], uncompleted: [] }
async function sortTodos() {
  const todos = await fetchData('https://jsonplaceholder.typicode.com/todos')
  const completed = todos.filter(todo => todo.completed)
  const uncompleted = todos.filter(todo => !todo.completed)
  console.log({completed, uncompleted})
}
// sortTodos()

// Crate an object that has the users username, and then a object with their completed and incompleted todos
// { Antonette: { completed: [], uncompleted: [] }
function showUsersTodos() {
  const getUsers = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
  const getTodos = fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
  Promise.all([getUsers, getTodos])
    .then(([userData, todoData]) => {

      const users = userData
      const todos = todoData
      const usersTodos = {}

      for (const user of users) {
        const userTodos = usersTodos[user.name.slice(0, user.name.indexOf(' '))] = {}

        userTodos.completed = todos.find(todo => {
          return todo.userId === user.id && todo.completed
        })

        userTodos.uncompleted = todos.find(todo => {
          return todo.userId === user.id && !todo.completed
        })
      }

      console.log(usersTodos)
    })
}
// showUsersTodos()

// Count the number of completed and uncompleted todos by the user who lives in the city 'Wisokyburgh'
function countTodosOfUserFrom(city) {
  const getUser = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
  const getTodos = fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
  Promise.all([getUser, getTodos])
    .then(([userData, todoData]) => {
      const users = userData
      const todos = todoData
      const userFound = users.find(user => user.address.city === city)
      const usersTodos = todos.filter(todo => todo.userId === userFound.id)
      const completedTodos = usersTodos.filter(todo => todo.completed)
      console.log(`Completed Todos: ${completedTodos.length}, Uncompleted Todos: ${usersTodos.length - completedTodos.length}`)
    })
}
countTodosOfUserFrom('Wisokyburgh')
