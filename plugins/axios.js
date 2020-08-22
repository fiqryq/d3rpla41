export default function ({ $axios, redirect }, inject) {
  const api = $axios.create()
  api.setBaseURL('https://spreadsheet-json.vercel.app/api')

  // Every request to server
  api.onRequest((config) => {
  })

  // When error response
  api.onError(() => {
    // const code = parseInt(error.response && error.response.status)
    // redirect(`/${code}`)
  })

  // Inject to $api, call this.$api to running your inject
  inject('api', api)
}
