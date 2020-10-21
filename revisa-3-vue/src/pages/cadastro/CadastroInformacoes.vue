<template>
  <v-container fluid>
    <v-row v-show="erro">
      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-alert
              class="ml-2 errou white--text"
          >
            mensagem de erro
          </v-alert>
        </article>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-btn
              color="azul"
              outlined
              v-text="1"
              class="ml-2 mr-1 pa-0 w-24 h-34 min-w-34"
              to="/cadastro"
          />
          <v-icon
              v-text="'mdi-checkbox-marked-outline'"
              color="azul"
              :class="[completo ? 'mr-2' : 'd-none']"
          />
          <v-icon
              v-text="'mdi-checkbox-blank-outline'"
              :class="[completo ? 'd-none' : 'mr-2']"
          />

          <v-btn
              color="azul"
              v-text="2"
              class="ml-1 pa-0 w-24 h-34 min-w-34 white--text"
          />
          <v-icon
              v-text="'mdi-checkbox-marked-outline'"
              color="azul"
              :class="[completo2 ? 'mr-2' : 'd-none']"
          />
          <v-icon
              v-text="'mdi-checkbox-blank-outline'"
              :class="[completo2 ? 'd-none' : 'mr-2']"
          />

          <v-select
              v-model="cre"
              label="CRE" filled
              :items="['Artes', 'Biologia', 'Educação Física', 'Física', 'Geografia', 'História', 'Inglês', 'Literatura']"
              class="mt-6 ml-2"
              aria-autocomplete="off"
              hide-details
              :multiple="!aluno"
          />

          <v-select
              v-model="escola"
              label="Escola" filled
              :items="['Artes', 'Biologia', 'Educação Física', 'Física', 'Geografia', 'História', 'Inglês', 'Literatura']"
              hide-details
              class="mt-2 ml-2"
              color="azul"
              :multiple="!aluno"
          />

          <v-select
              v-model="turno"
              label="Turno" filled
              :items="['Matutino', 'Vespertino', 'Noturno']"
              hide-details
              class="mt-2 ml-2"
              color="azul"
              :multiple="!aluno"
          />

          <v-select
              v-model="turma"
              label="Turma" filled
              :items="['Artes', 'Biologia', 'Educação Física', 'Física', 'Geografia', 'História', 'Inglês', 'Literatura']"
              hide-details
              class="mt-2 ml-2"
              color="azul"
              :multiple="!aluno"
          />

          <v-select
              v-if="!aluno"
              v-model="turno"
              label="Disciplina" filled
              :items="['Artes', 'Biologia', 'Educação Física', 'Física', 'Geografia', 'História', 'Inglês', 'Literatura']"
              hide-details
              class="mt-2 ml-2"
              color="azul"
          />

          <v-btn
              id="btn__entrar"
              class="mt-4 ml-2 azul white--text text-none"
              @click="completoInformacoes"
          >
            Confirmar cadastro
          </v-btn>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Busao } from '../../main';

export default {
  name: 'CadastroInformacoes',

  data () {
    return {
      erro: false,
      completo: false,
      completo2: false,
      aluno: true,
      cre: '',
      escola: '',
      turma: '',
      turno: '',
      disciplina: '',
      show: false,
    };
  },

  methods: {
    completoInformacoes () {
      Busao.$emit('completo2', this.completo2);

      this.completo2 = true;
    },
  },

  mounted () {
    Busao.$on('completo', (data) => {
      this.completo = data;
      console.log(data);
    });
  },
};
</script>

<style scoped>

</style>
