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
          v-for="input of inputs" :key="input"
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
      </v-col>

      <v-col cols="12">
        <v-btn
            color="azul" class="float-left text-none white--text rounded__norma"
        >
          Salvar alterações
        </v-btn>

        <v-btn
            color="errou" class="float-right text-none white--text rounded__norma"
        >
          Excluir usuário

          <v-icon
              v-text="'mdi-delete-outline'"
          />
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EditarUsuario',

  data () {
    return {
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
          data: ['1', '2', '3'],
        },
        {
          escola: '',
          label: 'Escola',
          type: 'select',
          cols: 12,
          data: ['1', '2', '3'],
        },
        {
          turno: '',
          label: 'Turno',
          type: 'select',
          cols: 6,
          data: ['1', '2', '3'],
        },
        {
          turma: '',
          label: 'Turma',
          type: 'select',
          cols: 6,
          data: ['1', '2', '3'],
        },
        {
          status: '',
          label: 'Status',
          type: 'select',
          cols: 6,
          data: ['1', '2', '3'],
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
