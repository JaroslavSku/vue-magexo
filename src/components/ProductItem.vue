<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="item-container" v-if="products?.products?.items">
      <div
        class="item-body"
        v-for="item in products?.products?.items || []"
        :key="item.name"
      >
        <div class="item-image__container">
          <img
            class="item-image"
            :src="item.small_image.url"
            alt="{{item.small_image.name}}"
          />
        </div>
        <div>
          <img
            class="item-image"
            src="@/assets/star-rating.svg"
            alt="`{${item.small_image.name}}`"
          />
        </div>
        <div class="item-name">{{ item.name }}</div>
        <div class="item-price">
          {{ item?.price_range?.minimum_price?.regular_price?.value || 0 }} USD
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    title: String,
    products: Object,
  },
};
</script>

<style>
.item-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
}
.item-body {
  width: 11rem;
  height: auto;
  padding: 0.2rem;
  margin-right: 1rem;
  margin-bottom: 2rem;
}
.item-body:hover {
  cursor: pointer;
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.18);
}
.item-name {
  color: #00275a;
  display: block;
  position: relative;
  text-align: center;
  font-weight: bold;
  height: 3rem;
}

.item-image {
  height: 100%;
  margin: 0 0 1rem;
  max-width: 100%;
}
.item-image__container {
  height: 10rem;
}
.item-price {
  color: #910909;
  font-size: 1rem;
  font-weight: bold;
}
</style>
