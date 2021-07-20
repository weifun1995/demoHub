<template>
  <div id="vueapp">
    这是vue微服务
    <div class="nav">
      <router-link to="/vue-app/a">A</router-link>
      <router-link to="/vue-app/b">B</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body,
#vueapp {
  width: 100%;
  height: 100%;
}
#vueapp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nav {
  display: flex;
  justify-content: center;
  margin-bottom: 6em;
}

.nav a {
  padding: 10px 20px;
  border: 1px solid #666;
  box-shadow: 4px 4px 5px #666;
  margin: 0 20px;
  text-decoration: none;
  color: #666;
}
</style>
