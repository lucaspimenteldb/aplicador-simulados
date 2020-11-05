<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          Listagem de códigos de acesso
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
            label="Pesquisar usuario"
            filled
            color="azul"
            append-icon="mdi-magnify"
            class="max-w-240 float-right"
            hide-details
            v-model="pesquisar"
        />

        <v-data-table
            v-model="selected"
            show-select
            :headers="headerCodigos" :items="listaCodigos"
            fixed-header
            :footer-props="{itemsPerPageText: 'Códigos por página', itemsPerPageOptions: [ 10, 20, 25 ]}"
            :search="pesquisar"
            class="clear-both text-no-wrap"
        >
          <template v-slot:item.status="{ item }">
            <p
                :class="[ item.status === 'Utilizado' ? 'acertou--text' : 'errou--text' ]"
                class="font-weight-bold"
            >
              {{ item.status }}
            </p>
          </template>
        </v-data-table>

        <div class="table__footer__prepend d-flex pl-4 align-center">
          <v-dialog
              v-model="excluirCodigo"
              width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="errou"
                  class="text-none white--text"
                  v-on="on"
                  v-bind="attrs"
              >
                Excluir códigos
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline white--text errou">
                {{ messageCodigos.ttl }}
              </v-card-title>

              <v-card-text class="mt-2 black--text">
                {{ messageCodigos.text }}
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />

                <v-btn
                    color="errou"
                    @click="excluirCodigo = false"
                    text
                    class="white--text text-none"
                >
                  Fechar
                </v-btn>

                <v-btn
                    color="errou"
                    :disabled="messageCodigos.delete"
                    @click="excluirCodigo = false"
                    class="white--text text-none"
                >
                  Excluir códigos
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>

      <v-col class="mt-4">
        <v-btn
            color="azul" class="text-none white--text"
            to="/gerar-codigo-acesso"
        >
          Criar novo código
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ListagemCodigo',

  data () {
    return {
      excluirCodigo: false,
      selected: [],
      pesquisar: '',
      messageCodigos: {
        delete: true,
        ttl: 'Título',
        text: 'bla bla bla',
      },
      headerCodigos: [
        {
          text: 'Código de acesso',
          align: 'start',
          value: 'codigo',
          sortable: false,
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Status',
          align: 'start',
          value: 'status',
          sortable: false,
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Privilégio',
          align: 'start',
          value: 'privilegio',
          sortable: false,
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Criador do código',
          align: 'start',
          value: 'criador',
          sortable: false,
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Escola',
          align: 'start',
          value: 'escola',
          sortable: false,
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'CRE',
          align: 'start',
          value: 'cre',
          sortable: false,
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Nome',
          align: 'start',
          value: 'nome',
          sortable: false,
          class: 'body-2 font-weight-bold',
        },
      ],
      listaCodigos: [
        {
          nome: 'Marivalda',
          escola: 'Escola Tal e Tal',
          cre: 'CRE 1213 ladas',
          privilegio: 'Aluno',
          criador: 'Bla bla bla',
          codigo: '029384ab',
          status: 'Utilizado',
        },
        {
          nome: '-',
          escola: '-',
          cre: '-',
          privilegio: 'Professor',
          criador: 'Bla bla bla',
          codigo: '985h234b',
          status: 'Não utilizado',
        },
      ],
    };
  },

  mounted () {
    document.querySelector('.v-data-footer__select > div').style.marginLeft = '1rem';
  },
};
</script>

<style scoped>
  .table__footer__prepend {
    margin-top: -48px;
  }
</style>
