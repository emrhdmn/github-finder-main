export class Github {
  // information required to submit a request
  constructor() {
    this.client_id = '8387ed2d930f4ef3f3f8'
    this.client_secret = '0052db3e63660c39ae30783c458c59d2d8f17268'
    this.per_page = 10
    this.sort = 'asc'
  }
  // getting user information from api
  async fetchUserData(username) {
    // we sent a request based on the username that came as a parameter
    const profileRes = await fetch(
      `https://api.github.com/users/${username}?client_id_id=${this.client_id}&client_secret=${this.client_secret}`
    )
    // import user projects

    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?client_id_id=${this.client_id}&client_secret=${this.client_secret}&sort=${this.sort}&per_page=${this.per_page}`
    )

    // we converted the response we received from the API into json structure
    const data = await profileRes.json()
    const repos = await repoRes.json()
    // sending information to where the function was called
    return { data, repos }
  }
}
