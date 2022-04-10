<template>
  <div class="main" v-if="products">
    <h1>Products</h1>
    <h2>{{ uid }}</h2>
    <ProductItem :title="'Items'" :products="products" />
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  name: "HomeComing",
  components: { ProductItem },
  props: ["uid"],
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    const route = useRoute();
    console.log("route", route.params.uid);
    const uid = "Mg==";
    const query = `
 query ($uid: String) { 
products(filter: {category_uid: {eq: $uid}}) {
    items {
      name
      uid
      small_image{
          url
          label
      }
      price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
        }
      }
    }
  }
  }
      
      
      `;
    const variables = {
      uid: uid,
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
      this.products = data;
    } catch (error) {
      alert(error);
    }
  },
};
</script>

<style>
.main {
  position: relative;
  max-width: 1035px;
  margin: 0 auto;
}
</style>
