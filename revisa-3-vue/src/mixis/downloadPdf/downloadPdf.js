const dados = {
  methods: {
    async donwloadsPdf () {
      try {
        const documents = document.getElementsByClassName('download-simulado');
        for (let i = 0; i < documents.length; i++) {
          documents[i].click();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default dados;
