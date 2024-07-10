import { useFilterStore } from "@/stores/filter"
import { useMoviesStore } from "@/stores/movies"

export default class ApiClient {
  server
  key
  selectedFields = 'selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=type&selectFields=year&selectFields=rating&selectFields=votes&selectFields=movieLength&selectFields=seriesLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=countries&'
  notNullFields = 'notNullFields=name&notNullFields=alternativeName&notNullFields=year&notNullFields=rating.kp&notNullFields=votes.kp&notNullFields=poster.url&'
  
  constructor(server, key) {
    this.server = server
    this.key = key
  }

  async get(url) {
    const resp = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.key,
      }
    })
    
    return await resp.json()
  }

  async getMovies(page) {
    const filterStore = useFilterStore()
    const selectedParams = filterStore.createParams(page)
    const url = this.server + 'v1.4/movie?' + this.selectedFields + this.notNullFields + selectedParams

    return this.get(url)
  }

  async getGenres() {
    const url = this.server + 'v1/movie/possible-values-by-field?field=genres.name'

    return this.get(url)
  }

  async getCountries() {
    const url = this.server + 'v1/movie/possible-values-by-field?field=countries.name'

    return this.get(url)
  }

}