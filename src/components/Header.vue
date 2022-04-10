<template>
  <nav class="nav">
    <Burger @click="open()" />
    <ul
      class="menu-level1"
      :style="show ? visibility : null"
      name="level1"
      v-if="data?.categories?.items"
    >
      <li
        class="menuitem-level1"
        v-for="category in data.categories.items || []"
        :key="category.uid"
      >
        <router-link
          class="home-link"
          :style="show ? disappear : null"
          :to="{
            name: 'Products',
            params: {
              uid: category.uid,
              name: normalize(category.name),
              title: category.name,
            },
          }"
          >Home</router-link
        >
        <ul :style="show ? display : null" class="menu-level2" name="level2">
          <li
            v-for="subcategory in category.children || []"
            :key="subcategory.uid"
            class="menuitem-level2"
          >
            <router-link
              class="menuitem-level2"
              :to="{
                name: 'Products',
                params: {
                  uid: subcategory.uid,
                  name: normalize(subcategory.name),
                  title: subcategory.name,
                },
              }"
              >{{ subcategory.name }}</router-link
            >
            <ul class="menu-level3" :style="show ? left : null" name="level3">
              <li
                v-for="subsubcategory in subcategory.children || []"
                :key="subsubcategory.uid"
              >
                <router-link
                  class="menuitem-level3"
                  :to="{
                    name: 'Products',
                    params: {
                      uid: subsubcategory.uid,
                      name: normalize(subsubcategory.name),
                      title: subsubcategory.name,
                    },
                  }"
                  >{{ subsubcategory.name }}</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import Burger from "./Burger.vue";
export default {
  components: { Burger },

  data() {
    return {
      show: false,
      visibility: {
        visibility: "visible",
        padding: 0,
      },
      display: {
        display: "block",
        padding: 0,
      },
      disappear: {
        display: "none",
      },
      nomargin: {
        margin: 0,
      },
      left: {
        left: "6.5rem",
      },
    };
  },
  methods: {
    normalize(url) {
      const newUrl = url.replace(/[,\s]+|\s+|[,/]|[,\s]+/g, "-").toLowerCase();
      return newUrl;
    },

    open() {
      this.show = !this.show;
    },
    onResize() {
      if (window.innerWidth > 800) {
        this.show = false;
      }
    },
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  name: "ProductItems",
  props: { data: Object },
};
</script>

<style scoped lang="scss">
.nav {
  background-color: black;
  display: flex;
  flex-direction: row;
  position: relative;

  .menu-level1 {
    width: 100%;
    display: flex;
    margin: 0;
    @media screen and (max-width: 800px) {
      visibility: hidden;
      margin-top: 3.5rem;
    }
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
    padding: 0.7rem 0.8rem;
    border-bottom: none;
    white-space: nowrap;
    text-align: center;
  }
}

.menu-level2 {
  display: flex;
  width: 100%;
}
.menu-level2 li:hover .menu-level3 {
  display: block;
  width: 100%;
  z-index: 2;
  opacity: 0.98;
}
.menu-level3 {
  background-color: rgb(65, 62, 62);
  display: none;
  padding-left: 0;
  position: absolute;
  left: 0;
}

.menuitem-level2 {
  &:hover {
    background-color: rgb(65, 62, 62);
  }
}

.menu-level3 a:hover {
  text-decoration: underline !important;
}

a {
  text-align: center;
}
.home-link {
  @media screen and (max-width: 800px) {
    display: none;
  }
}
</style>
