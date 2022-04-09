<template>
  <div id="app">
    <nav class="nav">
      <ul class="menu-level1" name="level1" v-if="data?.categories?.items">
        <li
          class="menuitem-level1"
          v-for="category in data.categories.items || []"
          :key="category.uid"
        >
          <router-link
            :to="{
              name: 'Products',
              params: { uid: category.uid, name: category.name },
            }"
            >{{ category.name }}</router-link
          >
          <ul class="menu-level2" name="level2">
            <li
              v-for="subcategory in category.children || []"
              :key="subcategory.uid"
            >
              <router-link :to="`/products/${subcategory.name}`">{{
                subcategory.name
              }}</router-link>
              <ul class="menu-level3" name="level3">
                <li
                  v-for="subsubcategory in subcategory.children || []"
                  :key="subsubcategory.uid"
                >
                  <router-link :to="`/products/${subsubcategory.name}`">{{
                    subsubcategory.name
                  }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  // components: {
  //   Slide,
  // },
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
.nav {
  background-color: black;
  display: flex;
  flex-direction: row;
  position: relative;
}

.menu-level1 {
  width: 100%;
  display: flex;
}
.menuitem-level1 {
  display: flex;
  width: 100%;
}
.menu-level1 li {
  text-decoration: none;
  list-style: none;
}
.menu-level1 li a {
  display: flex;
  text-decoration: none;
  color: white;
  font-weight: 400;
  font-size: 0.92rem;
  height: 2.625rem;
  align-items: center;
  padding: 0 0.5625rem;
  border-bottom: none;
  white-space: nowrap;
  text-align: center;
}
.menu-level1 li a:hover {
  background-color: rgb(65, 62, 62);
}
.menu-level2 {
  display: flex;
  width: 100%;
}
.menu-level2 li:hover .menu-level3 {
  display: block;
  width: 100%;
}
.menu-level3 {
  background-color: rgb(65, 62, 62);
  display: none;
  padding-left: 0;
  position: absolute;
  left: 0;
}
.menu-level3 a:hover {
  text-decoration: underline;
}
a {
  text-align: center;
}
</style>
