<template>
  <v-row :class="[width > 640 ? 'd-none' : 'd-block']">
    <v-footer
        padless :height="width > 640 ? '0px' : '64px'"
        app
    >
      <v-tabs
          height="64px"
          background-color="azulEscuro"
          centered
          dark
          app
          icons-and-text
          center-active
          grow
      >
        <div
v-for="(item, i) in routes"
             :key="i"
>
        <v-tab
v-if="i < 3"
 :to="item.path"
>
          {{item.ttl}}

          <v-icon v-text="item.icon" />
        </v-tab>
        </div>
      </v-tabs>
    </v-footer>
  </v-row>
</template>

<script>
export default {
  name: 'TabsMobile',

  data () {
    return {
      width: 0,
      routes: [],
    };
  },

  created () {
    this.width = window.innerWidth;
    this.routes = this.$router.options.routes.filter((el) => el.menu);
  },

  mounted () {
    const sliderInutil = document.querySelector('.v-slide-group__prev--disabled');
    sliderInutil.remove();

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
    });
  },
};
</script>

<style scoped>

</style>
