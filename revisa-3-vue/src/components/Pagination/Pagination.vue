<template>
  <div class="text-center">
    <v-pagination
        @next="nextLocal"
        @previous="prevLocal"
        @input="inputLocal"
        v-model="page"
        :length="lenght"
        :circle="circle"
    />
  </div>
</template>

<script>
export default {
  props: ['lenght', 'circle'],
  data () {
    return {
      page: 1,
    };
  },

  methods: {
    nextLocal () {
      this.$emit('nextLocal');
    },

    prevLocal () {
      this.$emit('prevLocal');
    },

    inputLocal () {
      this.$emit('inputLocal');
    },
  },
};
</script>
