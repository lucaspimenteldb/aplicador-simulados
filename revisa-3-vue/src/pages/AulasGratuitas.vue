<template>
  <v-container fluid>
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
            @change="disciplinaSelecionada"
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
        <iframe
            width="100%" :height="alturaVideo"
            :src="aula" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AulasGratuitas',

  data () {
    return {
      alturaVideo: 0,
      disciplina: '',

      disciplinas: ['Português', 'Espanhol', 'Inlgês', 'Literatura', 'Artes', 'Ed. Física', 'Matemática', 'Química', 'Física', 'Biologia', 'História', 'Geografia', 'Filosofia', 'Sociologia'],

      videos: [
        'https://www.youtube.com/embed/pQ7QlwDLIrw',
        'https://www.youtube.com/embed/pQ7QlwDLIrw',
      ],
    };
  },

  mounted () {
    this.alturaVideo = document.querySelector('.videos__iframes').offsetWidth / 1.8;
  },
};
</script>

<style scoped>

</style>
