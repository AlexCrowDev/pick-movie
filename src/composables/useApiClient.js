import ApiClient from '@/lib/api'

let apiClient
const apiUrl = 'https://api.kinopoisk.dev/'
const apiKey = 'RJKDTJT-1HDM3FX-NGWJ4T8-KHQMWQF'

export default () => {
  if (!apiClient) {
    apiClient = new ApiClient(apiUrl, apiKey)
  }

  return apiClient;
}
