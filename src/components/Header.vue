<template>
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
</template>

<script>
export default {
  name: "ProductItems",
  props: { data: Object },
};
</script>

<style></style>
