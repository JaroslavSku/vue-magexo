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
    const proxyUrl = "https://still-island-39314.herokuapp.com/";
    const url = "https://venia.magento.com/graphql";
    try {
      const {
        data: { data },
      } = await axios.post(proxyUrl + url, graphqlQuery);
      console.log(data);
      this.data = data;
    } catch (error) {
      console.log(error);
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
