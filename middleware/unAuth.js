const accessToken = localStorage.getItem('accessToken')

export default function ({ store, redirect }) {
    if (accessToken) {
      return redirect('/')
    }
  }