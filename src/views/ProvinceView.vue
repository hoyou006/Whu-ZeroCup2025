<template>
  <div class="province-page">
    <h1>这里是 {{ name }} 的详情页</h1>
    <router-link to="/">返回主页</router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const name = route.params.name
</script>

<style scoped>
.province-page {
  color: white;
  text-align: center;
  margin-top: 100px;
}
</style>
