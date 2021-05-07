<template>
  <v-app v-cloak>
    <v-navigation-drawer app color="info">
      <v-list-item to='/' link>
        <v-list-item-content >
          <v-list-item-title class="title" id="app-title">
            <v-icon>mdi-vuejs</v-icon>
            Vue Nature Remo
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-main>
      <v-container class="ma-6">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      menuItems: [
          { title: 'AIR', icon: 'mdi-weather-windy', url: '/air' },
          { title: 'TV', icon: 'mdi-remote-tv', url: '/tv' },
          { title: 'OTHER', icon: 'mdi-light-switch',url: '/other'  },
          { title: 'SETTING', icon: 'mdi-cog-outline',url: '/setting'  },
          { title: 'WORK', icon: 'mdi-cog-outline',url: '/work'  },
        ],
      getToken: ""
    }
  }
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
#app-title {
  color: black
}
</style>