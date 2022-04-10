<template>
  <div id="app">
    <Header :data="data" />
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      data: [],
    };
  },
  async created() {
    const query = `
    query ($page: Int) { 
        categories ( currentPage: $page) { 
         total_count
          items {
            uid
            level
            name
            path
            children_count
            children {
              uid
              level
              name
              path
              children_count
              children {
                uid
                level
                name
                path
              }
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
      
      `;
    const variables = {
      page: 1,
    };

    const graphqlQuery = {
      query,
      variables,
    };
    const proxyUrl = process.env.VUE_APP_PROXY;
    const url = process.env.VUE_APP_URL;
    try {
      const {
        data: { data },
      } = await axios.post(proxyUrl + url, graphqlQuery);
      this.data = data;
    } catch (error) {
      alert(error);
    }
  },
};
</script>

<style>
html {
  padding: 0;
  margin: 0;
  font-family: Roboto;
}

h1,
h2 {
  text-align: center;
}

body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
</style>
