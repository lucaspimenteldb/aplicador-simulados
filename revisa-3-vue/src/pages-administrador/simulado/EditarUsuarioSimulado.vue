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

      <!-- adicionar horas aos simulados do aluno -->
      <v-col>
        <v-dialog
            v-model="addHoras"
            width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="azul"
                class="text-none white--text font-weight-bold"
            >
              Adicionar horas
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline white--text azul">
              Escolha quantas horas adicionar
            </v-card-title>

            <v-card-text class="mt-2 black--text">
              A quantidade de horas selecionadas serão adicionadas ao tempo de simulado do aluno escolhido.

              <v-select
                  label="Horas para adicionar"
                  color="azul"
                  filled
                  :items="['1 hora', '2 horas', '3 horas']"
                  hide-details
                  class="mt-2"
                  v-model="horasAdded"
              />
            </v-card-text>

            <v-divider />

            <v-card-actions class="px-6">
              <v-spacer />

              <v-dialog
                  v-model="addHorasConfirmar"
                  width="500"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="azul"
                      class="text-none white--text font-weight-bold"
                  >
                    Adicionar horas
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline white--text azul">
                    {{ horasAdded }} foram adicionadas com sucesso
                  </v-card-title>

                  <v-divider />

                  <v-card-text>
                    <v-icon
                        x-large
                        v-text="'mdi-checkbox-marked-outline'"
                        class="mt-2"
                        color="azul"
                    />
                  </v-card-text>

                  <v-card-actions class="px-6">
                    <v-spacer />

                    <v-btn
                        color="errou"
                        text
                        @click="addHoras = false"
                        class="white--text text-none"
                    >
                      Fechar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <!-- form de informações -->
      <v-col
          cols="12"
      >
        <v-text-field
            label="Nome"
            v-model="nome"
            filled
            readonly
            color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12"
          sm="6"
      >
        <v-select
            label="Língua Estrangeira"
            filled
            color="azul"
            :items="['Inglês', 'Espanhol']"
            append-icon="mdi-pencil"
            hide-details
        />
      </v-col>
      <v-col
          cols="12"
          class="pa-0"
      />

      <v-col
          cols="12"
          sm="6"
      >
        <v-text-field
            label="Data início"
            filled
            color="azul"
            readonly
            hide-details
            v-model="inicio"
        />
      </v-col>
      <v-col
          cols="12"
          sm="6"
      >
        <v-text-field
            label="Data fim"
            filled
            color="azul"
            readonly
            hide-details
            v-model="fim"
        />
      </v-col>

      <v-col
          cols="12"
          sm="6"
      >
        <v-text-field
            label="Situação"
            filled
            color="azul"
            readonly
            hide-details
            v-model="situacao"
        />
      </v-col>

      <!-- salvar alteracoes realizadas -->
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

        <!-- excluir usuario -->
        <v-dialog
            v-model="dialog"
            width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="errou" class="float-right text-none white--text"
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

            <v-card-actions class="px-6">
              <v-spacer />

              <v-dialog
                  v-model="dialogExcluir"
                  width="500"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="errou" class="float-right text-none white--text"
                  >
                    Excluir usuário

                    <v-icon v-text="'mdi-delete-outline'" />
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline white--text errou">
                    Usuário excluído com sucesso
                  </v-card-title>

                  <v-card-text class="mt-2 black--text">
                    <v-icon
                        x-large
                        v-text="'mdi-checkbox-marked-outline'"
                        color="errou"
                    />
                  </v-card-text>

                  <v-divider />

                  <v-card-actions class="px-6">
                    <v-spacer />

                    <v-btn
                        color="errou"
                        text
                        @click="dialog = false"
                        class="white--text text-none"
                    >
                      Fechar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
      nome: 'A smile in every cup is great',
      inicio: '21/20/2020',
      fim: '21/20/2020',
      situacao: 'Entregue',
      addHoras: false,
      horasAdded: '',
      addHorasConfirmar: false,
      dialog: false,
      dialogAlteracoes: false,
      dialogExcluir: false,
      message: {
        delete: true,
        ttl: 'Realmente deseja excluir o usuário?',
        text: 'Após excluir o usuário todos os dados do mesmo serão perdidos e a ação não pode ser desfeita.',
      },
    };
  },
};
</script>

<style scoped>

</style>
