const dados = {
  data () {
    return {
      loader: false,
    };
  },

  methods: {
    preloading (on) {
      this.loader = on;
    },
  },
};

export default dados;