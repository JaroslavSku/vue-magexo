<template>
  <div class="main" v-if="products">
    <h1>Fashion products</h1>
    <ProductItem :title="title" :products="products" />
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import axios from "axios";
export default {
  name: "ProductItems",
  components: { ProductItem },
  props: ["uid", "title"],
  watch: {
    uid: {
      deep: true,
      handler: async function (newUid) {
        const uid = newUid;
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
        const proxyUrl = process.env.VUE_APP_PROXY;
        const url = process.env.VUE_APP_URL;
        try {
          const {
            data: { data },
          } = await axios.post(proxyUrl + url, graphqlQuery);
          this.products = data;
        } catch (error) {
          alert(error);
        }
      },
    },
  },
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    const uid = this.uid ? this.uid : "Mg==";
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
    const proxyUrl = process.env.VUE_APP_PROXY;
    const url = process.env.VUE_APP_URL;
    try {
      const {
        data: { data },
      } = await axios.post(proxyUrl + url, graphqlQuery);
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
