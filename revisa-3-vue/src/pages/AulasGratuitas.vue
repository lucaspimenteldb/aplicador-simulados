<template>
  <v-container fluid>
    <loading :dialog="showDialog" />
    <v-row>
      <v-col cols="12">
        <h1>
          Aulas feitas para você
        </h1>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="6"
      >
        <v-select
            @change="changeSelect"
            v-model="disciplina"
            :items="disciplinas" filled
            label="Escolha a disciplina para ver as aulas" color="azul"
            hide-details
        />
      </v-col>
    </v-row>

    <v-row
        v-if="disciplina.length > 0"
        class="mt-8"
    >
      <v-col
          cols="12"
      >
        <header-secao>
          Aulas de {{ disciplina }}
        </header-secao>
      </v-col>

      <v-col
          v-for="(aula, i) in videos" :key="i"
          cols="12" md="6"
          lg="4"
          class="videos__iframes"
      >
        <a
            :href="aula.link" target="_blank"
            class="d-block w-full h-full"
        >
          <iframe
              width="100%" :height="500"
              :src="aula.link" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="pointer__events__none"
          />
        </a>
      </v-col>
    </v-row>
    <TabsMobile />
    
  </v-container>
</template>

<script>
import aula from '../services/aula/aula';
import loading from '../components/loading/Loading.vue';
import TabsMobile from '../components/TabsMobile.vue';

export default {
  name: 'AulasGratuitas',
  components: { loading, TabsMobile },

  async created () {
    try {
      this.loadingBasl(true);
      const materias = await aula.aula('aula/listar-materia');
      this.disciplinas = this.extrairTitulo(materias.data.materias);
      this.disciplinasPesquisa = (materias.data.materias);
      this.loadingBasl(false);
    } catch (er) {
      console.log(er);
      this.loadingBasl(false);
    }
  },

  data () {
    return {
      alturaVideo: 0,
      disciplina: '',
      showDialog: false,

      disciplinas: ['Sem dados'],
      disciplinasPesquisa: [],

      videos: [

      ],
    };
  },

  methods: {
    loadingBasl (on) {
      this.showDialog = on;
    },
    disciplinaSelecionada () {
      setTimeout(() => {
        this.alturaVideo = document.querySelector('.videos__iframes').offsetWidth / 1.8;
      }, 500);
    },
    extrairTitulo (objeto) {
      if (objeto.length > 0) {
        return objeto.map((el) => el.nome);
      }

      return objeto;
    },
    pesquisarSimulado (simulado, pesquisa) {
      const filtrado = pesquisa.filter((el) => el.nome === simulado);
      return filtrado;
    },
    
    async changeSelect (event) {
      try {
        this.loadingBasl(true);
        setTimeout(() => {
          this.alturaVideo = document.querySelector('.videos__iframes').offsetWidth / 1.8;
        }, 500);
        const filtrar = this.pesquisarSimulado(event, this.disciplinasPesquisa);
        const videos = await aula.aula(`aula/listar-videos/${filtrar[0].id}`);
        this.videos = videos.data.videos;
        this.loadingBasl(false);
        console.log(this.videos);
      } catch (e) {
        console.log(e);
        this.loadingBasl(false);
      }
    },
    
  },

  mounted () {

  },
};
</script>

<style scoped>

</style>
