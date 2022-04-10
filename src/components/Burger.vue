<template>
  <div class="burger">
    <div />
    <div />
    <div />
  </div>
</template>

<script>
export default {
  name: "BurgerMenu",
};
</script>

<style scoped lang="scss">
$button-color-blue: #325789;
$button-color-brown: #b9a952;
.burger {
  top: 0.5rem;
  display: none;
  padding: 0.6rem 0rem 0rem 1.7rem;
  z-index: 200;
  position: absolute;
  width: 8rem;
  cursor: pointer;
  div {
    width: 35px;
    height: 2px;
    background-color: $button-color-brown;
    margin: 6px 0;
    color: $button-color-brown;
  }
  @media screen and (max-width: 800px) {
    display: inline-block;
  }
  @media screen and (min-width: 800px) {
    display: none;
  }
}
</style>
