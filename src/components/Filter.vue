<template>
  <div class="filter" v-if="filterVisible">
    <div class="show">
      <my-h2>Show</my-h2>
      <div class="switches item">
        <my-switch :name="switchName" v-model="this.movieType" id="All" checked>All</my-switch>
        <my-switch :name="switchName" v-model="this.movieType" id="Films">Films</my-switch>
        <my-switch :name="switchName" v-model="this.movieType" id="TV Series">TV Series</my-switch>
      </div>
      <div class="show__main item">
        <a href="" class="show__main-button" @click.prevent="showSidebar('genres', this.genres)">
          <span>Genres</span>
          <span class="mini-span">{{ displayedGenres }}</span>
        </a>
        <a href="" class="show__main-button" @click.prevent="showSidebar('countries', this.countries)">
          <span>Country</span>
          <span class="mini-span">{{ displayedCountries }}</span>
        </a>
        <a href="" class="show__main-button" @click.prevent="showSidebar('years')">
          <span>Year</span>
          <span class="mini-span">all</span>
        </a>
      </div>
    </div>
    <my-fixed-buttom>
      <my-button :clickMethod="showMovies">Show</my-button>
    </my-fixed-buttom>
  </div>
  <Sidebar
      v-model:show="sidebarVisible"
      :attribute="attribute"
      v-model:list="list"
  />
  <Movies
    v-model:show="moviesVisible"
    :movies="moviesStub"
    :clickMethod="showMovies"
  />
</template>

<script>
  import Sidebar from "@/components/Sidebar";
  import Movies from "@/components/Movies";
  
  export default {
    components: {
      Sidebar, Movies,
    },
    props: {
      apiUrl: {
        type: String,
        required: true,
      },
      apiKey: {
        type: String,
        required: true,
      },
      genres: {
        type: Array,
        required: true,
      },
      countries: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        switchName: 'show',
        sidebarVisible: false,
        filterVisible: true,
        moviesVisible: false,
        attribute: '',
        movieType: 'All',
        page: 0,
        list: [],
        years: [],
        rating: [],
        movies: [],
        moviesStub: [
          {
            id:1,
            poster: {previewUrl: '/img/mem.676f777e.webp'},
            name:'lol',
            rating: {kp: 8},
            genres: [{name: 'mem'}]
          },
          {
            id:2,
            poster: {previewUrl: '/img/mem.676f777e.webp'},
            name:'kek',
            rating: {kp: 9},
            genres: [{name: 'mem'}]
          },
          {
            id:3,
            poster: {previewUrl: '/img/mem.676f777e.webp'},
            name:'lol',
            rating: {kp: 8},
            genres: [{name: 'mem'}]
          },
          {
            id:4,
            poster: {previewUrl: '/img/mem.676f777e.webp'},
            name:'kek',
            rating: {kp: 9},
            genres: [{name: 'mem'}]
          },
          {
            id:5,
            poster: {previewUrl: '/img/mem.676f777e.webp'},
            name:'kek',
            rating: {kp: 9},
            genres: [{name: 'mem'}]
          },
          {
            id:6,
            poster: {previewUrl: '/img/mem.676f777e.webp'},
            name:'kek',
            rating: {kp: 9},
            genres: [{name: 'mem'}]
          },
          {
            id:7,
            poster: {previewUrl: '/img/mem.676f777e.webp'},
            name:'kek',
            rating: {kp: 9},
            genres: [{name: 'mem'}]
          },
        ],
        selectedFields: 'selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=type&selectFields=year&selectFields=rating&selectFields=votes&selectFields=movieLength&selectFields=seriesLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=countries&',
        notNullFields: 'notNullFields=name&notNullFields=alternativeName&notNullFields=year&notNullFields=rating.kp&notNullFields=votes.kp&notNullFields=poster.url&',
      }
    },
    methods: {
      showSidebar(attribute, list) {
        this.attribute = attribute
        this.list = list
        this.sidebarVisible = true
      },
      createParams() {
        let params = new URLSearchParams()
        let animatedFilm
        
        this.includedGenres.forEach((genre) => {
          if (genre.name === 'мультфильм') {
            animatedFilm = genre.name
          }
          params.append('genres.name', `+${genre.name}`)
        })
        
        this.excludedGenres.forEach((genre) => {
          params.append('genres.name', `!${genre.name}`)
        })
      
        this.includedCountries.forEach((country) => {
          params.append('countries.name', `+${country.name}`)
        })
      
        this.excludedCountries.forEach((country) => {
          params.append('countries.name', `!${country.name}`)
        })
      
        // if (model.years.length > 1) {
        // params.append('year', model.years.join('-'));
        // }
      
        // if (model.rating.length > 1) {
        //   params.append('rating.kp', model.rating.join('-'));
        // }
        if ((this.movieType === 'TV Series') && animatedFilm) {
          params.append('type', 'animated-series')
        } else if (this.movieType === 'TV Series') {
          params.append('type', 'tv-series')
        } else if (this.movieType === 'Films') {
          params.append('type', 'movie')
        }

        params.append('votes.kp', '10000-2500000')
        params.append('sortField', 'rating.kp')
        params.append('sortType', '-1')
        params.append('page', this.page)
        params.append('limit', '100')
        console.log(params.toString())
        return params.toString()
      },
      async getMovies(url, params) {
        let resp = await fetch(url + params, {
          headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
          }
        })
        let data = await resp.json()
        this.movies.push(...data.docs)
        this.moviesVisible = true
      },
      showMovies() {
        ++this.page
        let selectedParams = this.createParams();
        
        this.filterVisible = false

        // this.getMovies(this.apiUrl + 'movie?' + this.selectFields + this.notNullFields, selectedParams);
        this.moviesVisible = true
      }
    },
    computed: {
      includedGenres() {
        return [...this.genres].filter(item => item.included)
      },
      excludedGenres() {
        return [...this.genres].filter(item => item.excluded)
      },
      displayedGenres() {
        let includedGenresNames = this.includedGenres.map(item => item.name)
        let excludedGenresNames = this.excludedGenres.map(item => item.name)

        if (includedGenresNames.length > 0) {
          return includedGenresNames.slice(0, 3).join(', ')
        } else if (excludedGenresNames.length > 0) {
          return 'все, кроме: ' + excludedGenresNames.slice(0, 3).join(', ')
        } else {
          return 'all'
        }
      },
      includedCountries() {
        return [...this.countries].filter(item => item.included)
      },
      excludedCountries() {
        return [...this.countries].filter(item => item.excluded)
      },
      displayedCountries() {
        let includedCountriesNames = this.includedCountries.map(item => item.name)
        let excludedCountriesNames = this.excludedCountries.map(item => item.name)

        if (includedCountriesNames.length > 0) {
          return includedCountriesNames.slice(0, 3).join(', ')
        } else if (excludedCountriesNames.length > 0) {
          return 'кроме: ' + excludedCountriesNames.slice(0, 3).join(', ')
        } else {
          return 'all'
        }
      },
    },
}
</script>

<style>
.filter {
}
.show {
}
.show__main-button {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	padding: 0px 14px;
	min-height: 45px;
}
.show__main-button:not(:last-child) {
	border-bottom: 1px solid rgb(91 87 107 / 50%);
}
.show__main-button:first-child {
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}
.show__main-button:last-child {
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
}
</style>