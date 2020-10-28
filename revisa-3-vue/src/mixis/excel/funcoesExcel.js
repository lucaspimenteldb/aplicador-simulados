const dados = {
  methods: {
    startExcel () {
      this.excel = true;
    },

    finishExcel () {
      this.excel = false;
    },
    exportar (id) {
      document.getElementById(id).click();
    },
  },
    
  data () {
    return {
      excel: false,
    };
  },
};

export default dados;
