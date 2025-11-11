<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import {Autoplay} from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/autoplay';
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data(){
    const img_source =["https://picsum.photos/800/600?random=1","https://picsum.photos/800/600?random=2","https://picsum.photos/800/600?random=3"];
    return {
      img_source,
      modules :[Autoplay]
    }
  }
  };
</script>
<template>
  <Swiper class="container" :autoplay="{delay:2000}" :modules="modules" loop>
    <SwiperSlide v-for="(img_src,index) in img_source" :key="index" class="box">
      <img :src="img_src" />
    </SwiperSlide>
  </Swiper>
</template>

<style>
.container{
  width: 100vw;
  height: 60vh;
  background-color: #F4EA;
}
.box{
  background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>