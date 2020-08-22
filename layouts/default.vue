<template>
  <v-app dark>
    <v-slide-y-transition>
      <template v-show="isLoaded">
        <v-main v-if="isLoaded">
          <nuxt />
        </v-main>
      </template>
    </v-slide-y-transition>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      isLoaded: false,
      loading: true,
      appBar: false,
      clipped: false,
      drawer: true,
      itemSelected: 0,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ],
      miniVariant: false,
      title: 'Mizue'
    }
  },
  computed: {
    path () {
      return this.$route.path
    }
  },
  mounted () {
    this.isLoaded = true
  },
  methods: {
  }
}
</script>
