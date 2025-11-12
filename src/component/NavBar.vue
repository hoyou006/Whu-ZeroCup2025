<template>
    <header class="w-full bg-white/80 backdrop-blur sticky top-0 z-10 border-b h-16 flex items-center">
      <div class="flex flex-row flex-nowrap max-w-6xl items-center pl-4 pr-4 pt-3 pb-3">
          <router-link class="flex items-center justify-center w-[fit-content] h-4  mr-4 font-bold hover:text-[#2E8B57]" to="/" >首页</router-link>
          <router-link class="flex items-center justify-center w-[fit-content] h-4 mr-4 hover:text-[#2E8B57]" to="/RouteView" >山河漫游</router-link>
          <router-link class="flex items-center justify-center w-[fit-content] h-4  mr-4  hover:text-[#2E8B57]" to="/Challenge" >过关闯将</router-link>
          <router-link class="flex items-center justify-center w-[fit-content] h-4  mr-auto hover:text-[#2E8B57]" to="#">云锦书来</router-link>
      </div>
    </header>
</template>
