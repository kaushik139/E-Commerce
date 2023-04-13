<template>
  <!-- <nav>
    <router-link to="productsPage">Products</router-link> |
    <router-link to="cartPage">Cart</router-link>
  </nav> -->
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
      padding: 0px;
    margin: -8px;
    /* border: 2px solid rgb(25, 0, 255); */
    overflow: hidden;
    width: 102%;
    height: 35px;
  text-decoration: none;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
