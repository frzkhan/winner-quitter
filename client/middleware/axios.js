import axios from 'axios'

export default function ({ route, redirect, $axios, store }) {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  if (!token) {
    return redirect('/login')
  }
  $axios.setHeader('Authorization', token)
  return $axios.$get(`/api/Users/${userId}?filter=%7B%22include%22%3A%20%22profile%22%7D`)
  .then(user => {
    store.commit('setUser', user)
  })
}
