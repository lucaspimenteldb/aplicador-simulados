<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          Editar usuário
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <header-secao>
          Nome do cara
        </header-secao>
      </v-col>

      <v-col
          v-for="input of inputs" :key="input.label"
          cols="12"
          :sm="input.cols"
      >
        <v-text-field
            :label="input.label"
            filled
            color="azul"
            append-icon="mdi-pencil"
            hide-details
            v-if="input.type === 'text'"
        />
        <v-select
            :label="input.label"
            filled
            color="azul"
            :items="input.data"
            append-icon="mdi-pencil"
            hide-details
            v-if="input.type === 'select'"
        />
        <v-file-input
            :label="input.label"
            filled
            color="azul"
            append-icon="mdi-pencil"
            hide-details
            v-if="input.type === 'file'"
        />
        <v-autocomplete
            :label="input.label"
            filled
            color="azul"
            :items="input.data"
            append-icon="mdi-pencil"
            hide-details
            v-if="input.type === 'autocomplete'"
        />
      </v-col>

      <v-col cols="12">
        <v-dialog
            v-model="dialogAlteracoes"
            width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="azul"
                class="float-left text-none white--text"
            >
              Salvar alterações

              <v-icon
                  v-text="'mdi-content-save-outline'" class="ml-1"
              />
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline white--text azul">
              Alterações salvas com sucesso
            </v-card-title>

            <v-card-text class="mt-2 black--text">
              <v-icon
                  x-large
                  v-text="'mdi-checkbox-marked-outline'"
                  class="mt-2"
                  color="azul"
              />
            </v-card-text>

            <v-divider />

            <v-card-actions class="px-6">
              <v-spacer />

              <v-btn
                  text
                  color="errou"
                  @click="dialogAlteracoes = false"
                  class="text-none"
              >
                Fechar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialog"
            width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="errou" class="float-right text-none white--text rounded__norma"
            >
              Excluir usuário

              <v-icon v-text="'mdi-delete-outline'" />
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline white--text errou">
              {{ message.ttl }}
            </v-card-title>

            <v-card-text class="mt-2 black--text">
             {{ message.text }}
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />

              <v-btn
                  color="errou"
                  @click="dialog = false"
                  text
                  class="white--text text-none"
              >
                Fechar
              </v-btn>

              <v-btn
                  color="errou"
                  :disabled="message.delete"
                  @click="dialog = false"
                  class="white--text text-none"
              >
                Excluir usuário
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EditarUsuario',

  data () {
    return {
      dialog: false,
      dialogAlteracoes: false,
      message: {
        delete: true,
        ttl: 'Título',
        text: 'bla bla bla',
      },

      inputs: [
        {
          foto: '',
          label: 'Foto',
          type: 'file',
          cols: 6,
        },
        {
          nome: '',
          label: 'Nome',
          type: 'text',
          cols: 6,
        },
        {
          email: '',
          label: 'Email',
          type: 'text',
          cols: 4,
        },
        {
          email2: '',
          label: 'Email 2',
          type: 'text',
          cols: 4,
        },
        {
          telefone: '',
          label: 'Telefone',
          type: 'text',
          cols: 4,
        },
        {
          usuario: '',
          label: 'Usuário',
          type: 'text',
          cols: 12,
        },
        {
          privilegio: '',
          label: 'Privilégio',
          type: 'select',
          cols: 12,
          data: ['Professor', 'Aluno', 'Gestor'],
        },
        {
          escola: '',
          label: 'Escola',
          type: 'autocomplete',
          cols: 12,
          data: ['1', '2', '3'],
        },
        {
          turno: '',
          label: 'Turno',
          type: 'select',
          cols: 6,
          data: ['Matutino', 'Verpestino', 'Noturno', 'Integral'],
        },
        {
          turma: '',
          label: 'Turma',
          type: 'select',
          cols: 6,
          data: ['3 ano A', '3 ano B', '3 ano C'],
        },
        {
          status: '',
          label: 'Status',
          type: 'select',
          cols: 6,
          data: ['Inativo', 'Ativo'],
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
