<template>
  <div class="filter">
    <div class="show">
      <my-h2>Show</my-h2>
      <div class="switches item">
        <my-switch :name="switchName" id="All">All</my-switch>
        <my-switch :name="switchName" id="Films">Films</my-switch>
        <my-switch :name="switchName" id="TV Series">TV Series</my-switch>
      </div>
      <div class="show__main item">
        <a href="" class="show__main-button" @click.prevent="showSidebar('genres', this.genres)">
          <span>Genres</span>
          <span class="mini-span">{{ checkedGenres }}</span>
        </a>
        <a href="" class="show__main-button" @click.prevent="showSidebar('countries', this.countries)">
          <span>Country</span>
          <span class="mini-span">{{ checkedCountries }}</span>
        </a>
        <a href="" class="show__main-button" @click.prevent="showSidebar('years')">
          <span>Year</span>
          <span class="mini-span">all</span>
        </a>
      </div>
    </div>
    <my-fixed-buttom>
      <my-button>Show</my-button>
    </my-fixed-buttom>
    <Sidebar
      v-model:show="sidebarVisible"
      :attribute="attribute"
      :list="list"
    />
  </div>
</template>

<script>
  import Sidebar from "@/components/Sidebar";
  
  export default {
    components: {
      Sidebar,
    },
    data() {
      return {
        switchName: 'show',
        sidebarVisible: false,
        attribute: '',
        list: [],
        genres: [],
        countries: [],
        years: [],
        rating: [],
      }
    },
    props: {
      
    },
    methods: {
      showSidebar(attribute, list) {
        this.attribute = attribute
        this.list = list
        this.sidebarVisible = true
      },
      async fetchCountries (url) {
        const resp = await fetch (url, {
          headers: {
            'Content-Type': 'application/json', 
            'X-API-KEY': apiKey,
          } 
        });
        this.countries = await resp.json();
      },
      getCountriesStub () {
        this.countries =  [{name: "Россия"}, {name: "Беларусь"}, {name: "США"}]
      },
      async fetchGenres (url) {
        const resp = await fetch (url, {
          headers: {
            'Content-Type': 'application/json', 
            'X-API-KEY': apiKey,
          } 
        });
        this.genres = await resp.json();
      },
      getGenresStub () {
        this.genres =  [{name: "аниме"}, {name: "драма"}, {name: "комедия"}, {name: "мультфильм"},]
      },
    },
    computed: {
      checkedGenres() {
        let result = [...this.genres].filter(element => element.checked).map(element => element.name)
        if (result.length > 0) {
          return  result
                        .slice(0, 3)
                        .join(', ')
        } else {
          return result = 'all'
        }
      },
      checkedCountries() {
        let result = [...this.countries].filter(element => element.checked).map(element => element.name)
        if (result.length > 0) {
          return  result
                        .slice(0, 3)
                        .join(', ')
        } else {
          return result = 'all'
        }
      },
    },
    mounted() {
      this.getGenresStub()
      this.getCountriesStub()
    }
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