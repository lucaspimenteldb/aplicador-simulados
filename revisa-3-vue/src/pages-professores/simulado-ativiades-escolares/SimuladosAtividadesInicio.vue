<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          Simulados disponíveis
        </h1>

        <h3>
          Todas as disciplinas
        </h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <header-secao>
          Simulados Escolares - Dia 1
        </header-secao>
      </v-col>
    </v-row>

    <v-row
        :class="[ area.notificacao ? '' : 'd-none']"
        v-for="(area, areaNome, i) in areas" :key="areaNome"
    >
      <v-col
          cols="12" :class="i !== 0 ? 'mt-8' : i"
      >
        <subheader-secao>
          {{ `${areaNome.charAt(0).toUpperCase()}${areaNome.slice(1)}` }}
        </subheader-secao>
      </v-col>

      <!-- card da disciplina com nova atividade ou simulado-->
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="(disciplina, i) in area.disciplinas" :key="disciplina"
      >
        <v-card
            class="transition rounded__normal cursor__pointer btn__shadow" :class="`destaque__escolares__${areaNome}`"
            to="/simulado-responder"
        >
          <v-card-text>
            <article class="d-flex align-center relative z-1">
              <v-img
                  :src="require(`@/assets/icon/disciplinas/${disciplina}.png`)" width="30"
                  class="flex-grow-0"
              />

              <p class="ml-2 text-h6 leading__tight grey--text text--darken-3">
                {{ area.ttl[i] }}
              </p>

              <!-- sino de notificacao -->
              <div
                  class="bolinha__notificacao d-flex align-center justify-center absolute top--2 right--2 font-weight-bold
                  grey--text text--darken-3 z--1"
              >
                {{ area.quantidadeNotificacao}}
              </div>
              <v-icon
                  v-text="'mdi-bell'" class="w__icons__28 icone__backdrop absolute top-0 right-0 z-10"
              />
            </article>

            <!-- quantas notificacoes são -->
            <p class="mt-2 black--text">
              {{ area.textoNotificacao }}
            </p>

            <!-- texto para acessar as atividades novas-->
            <article class="mt-8 relative">
              <p class="font-weight-bold grey--text text--darken-3">
                {{ `Fazer ${area.textoNotificacao.split(' ')[4]} de  ${area.ttl}` }}
              </p>

              <!-- icone para acessar -->
              <v-icon
                  v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
              />
            </article>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- gabaritos -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Gabaritos e Questões
        </header-secao>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
            :headers="headerQuestao" :items="desempenhoQuestao"
            fixed-header
        >
          <template
              v-slot:item.verQuestao="{ item }"
          >
            <p class="font-weight-bold">
              {{ item.verQuestao }}
              <v-icon
                  v-text="'mdi-arrow-right'" color="black"
                  small
              />
            </p>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SimuladosAtividadesInicio',

  data () {
    return {
      professorSelecionado: null,

      headerQuestao: [
        {
          text: 'Questão',
          align: 'start',
          sortable: false,
          value: 'questao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Disciplina',
          sortable: false,
          value: 'disciplina',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Gabarito',
          sortable: false,
          value: 'gabarito',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Questão Marcada',
          sortable: false,
          value: 'questaoMarcada',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Média Escolar',
          sortable: false,
          value: 'media',
          class: 'body-2 font-weight-bold',
        },
        {
          text: '',
          sortable: false,
          value: 'verQuestao',
        },
      ],
      desempenhoQuestao: [
        {
          questao: '01',
          disciplina: 'Português',
          gabarito: 'A',
          questaoMarcada: 'B',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '02',
          disciplina: 'Português',
          gabarito: 'C',
          questaoMarcada: 'C',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '03',
          disciplina: 'Português',
          gabarito: 'A',
          questaoMarcada: 'A',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '04',
          disciplina: 'Português',
          gabarito: 'B',
          questaoMarcada: 'D',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '05',
          disciplina: 'Português',
          gabarito: 'A',
          questaoMarcada: 'D',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '06',
          disciplina: 'Português',
          gabarito: 'A',
          questaoMarcada: 'B',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '07',
          disciplina: 'Português',
          gabarito: 'C',
          questaoMarcada: 'C',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '08',
          disciplina: 'Português',
          gabarito: 'A',
          questaoMarcada: 'A',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '09',
          disciplina: 'Português',
          gabarito: 'B',
          questaoMarcada: 'D',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '10',
          disciplina: 'Português',
          gabarito: 'A',
          questaoMarcada: 'D',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '11',
          disciplina: 'Português',
          gabarito: 'A',
          questaoMarcada: 'B',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '12',
          disciplina: 'Português',
          gabarito: 'C',
          questaoMarcada: 'C',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '13',
          disciplina: 'Português',
          gabarito: 'A',
          questaoMarcada: 'A',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '14',
          disciplina: 'Português',
          gabarito: 'B',
          questaoMarcada: 'D',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
        {
          questao: '15',
          disciplina: 'Português',
          gabarito: 'A',
          questaoMarcada: 'D',
          media: '80% acertaram',
          verQuestao: 'ver questão',
        },
      ],

      areas: {
        linguagens: {
          notificacao: true,
          get quantidadeNotificacao () {
            return this.notificacao ? 1 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novo simulado` : '';
          },
          disciplinas: ['portugues'],
          ttl: ['Linguagens'],
        },
        humanas: {
          notificacao: true,
          get quantidadeNotificacao () {
            return this.notificacao ? 1 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novo simulado` : '';
          },
          disciplinas: ['geografia'],
          ttl: ['Humanas'],
        },
        natureza: {
          notificacao: false,
          get quantidadeNotificacao () {
            return this.notificacao ? 3 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novos simulados` : '';
          },
          disciplinas: [],
          ttl: [],
        },
        matematica: {
          notificacao: false,
          get quantidadeNotificacao () {
            return this.notificacao ? 3 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novos simulados` : '';
          },
          disciplinas: [],
          ttl: [],
        },
      },

      professores: ['Carlos - Matemática', 'Maria - Português', 'Fernanda - Química', 'Bernardo - Biologia', 'João de Deus - Física', 'Mário - Sociologia', 'Jesus - Filosofia', 'História - Saldanha', 'Geografia - Paulo'],

      atividadesEntregar: [
        {
          nome: 'Simulado de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          entrega: 'Data de entrega: 18 de março',
          quantidadeQuestoes: 24,
          questoesFeitas: 4,
          get porcentagem () {
            return `${Math.round((this.questoesFeitas / this.quantidadeQuestoes) * 100)}%`;
          },
        },
        {
          nome: 'Atividade de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          entrega: 'Data de entrega: 30 de março',
          quantidadeQuestoes: 12,
          questoesFeitas: 8,
          get porcentagem () {
            return `${Math.round((this.questoesFeitas / this.quantidadeQuestoes) * 100)}%`;
          },
        },
      ],

      atividadesFinalizadas: [
        {
          nome: 'Simulado de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          resultado: 18,
          quantidadeQuestoes: 24,
          get porcentagemAcerto () {
            return `${Math.round((this.resultado / this.quantidadeQuestoes) * 100)}%`;
          },
          finalizado: '02 de abril',
        },
      ],

      atividadesExpiradas: [
        {
          nome: 'Simulado de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          quantidadeQuestoes: 24,
          expirado: '29 de março',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
