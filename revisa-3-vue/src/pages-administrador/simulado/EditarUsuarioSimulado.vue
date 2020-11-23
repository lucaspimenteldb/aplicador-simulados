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
          {{nome}}
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
                      @click="objeto.dialog = true"
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
            v-model="idioma"
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
        <v-select
            label="Situação"
            filled
            :items="['Entregue', 'Iniciado']"
            color="azul"
            hide-details
            append-icon="mdi-pencil"
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
                @click="objetoAlteracao.dialog = true"
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
                @click="objetoExcluir.dialog = true"
                v-bind="attrs"
                color="errou" class="float-right text-none white--text"
            >
              Adicionar chance

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
    <modal :objeto="objeto" @aparecerModal="funcao" @funcao="adicionarHoras" />
    <modal :objeto="objetoExcluir" @aparecerModal="funcao2" @funcao="adicionarChance" />
    <modal :objeto="objetoAlteracao" @aparecerModal="funcao3" @funcao="atualizar" />
    <loading :dialog="loading" />
  </v-container>
</template>

<script>
import loading from '../../components/loading/Loading.vue';
import modal from '../../components/modal/ModalPadrao.vue';

export default {
  name: 'EditarUsuario',
  components: { loading, modal },

  data () {
    return {
      nome: 'A smile in every cup is great',
      idioma: '',
      inicio: '21/20/2020',
      fim: '21/20/2020',
      situacao: '',
      addHoras: false,
      horasAdded: '',
      loading: false,
      addHorasConfirmar: false,
      dialog: false,
      dialogAlteracoes: false,
      dialogExcluir: false,
      objeto: {
        dialog: false,
        titulo: 'Tem certeza que deseja adicionar as horas?',
        textConfirm: 'Sair',
        textConfirm2: 'adicionar',
        textButton: 'Cancelar',
        confirm: false,
        confirm2: true,

      },
      objetoExcluir: {
        dialog: false,
        titulo: 'Tem certeza que deseja adicionar mais uma chance?',
        textConfirm: 'Sair',
        textConfirm2: 'adicionar',
        textButton: 'Cancelar',
        confirm: false,
        confirm2: true,

      },
      objetoAlteracao: {
        dialog: false,
        titulo: 'Tem certeza que deseja salvar as alterações?',
        textConfirm: 'Sair',
        textConfirm2: 'salvar',
        textButton: 'Cancelar',
        confirm: false,
        confirm2: true,

      },
      message: {
        delete: true,
        ttl: 'Realmente deseja excluir o usuário?',
        text: 'Após excluir o usuário todos os dados do mesmo serão perdidos e a ação não pode ser desfeita.',
      },
    };
  },

  async created () {
    try {
      this.loading = true;
      const { id } = this.$route.params;
      const dados = await this.$http.get(`users/usuario/usuario/usuario/usuario-simulado/${id}`,
        { headers: { authorization: this.$store.state.token } });
      this.nome = dados.data.user_simulado.User.name;
      this.inicio = dados.data.user_simulado.data_inicio;
      this.fim = dados.data.user_simulado.data_fim;
      this.situacao = dados.data.user_simulado.situacao;
      this.idioma = dados.data.user_simulado.id_idioma === 10 ? 'Inglês' : 'Espanhol';
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  },

  methods: {
    funcao () {
      this.objeto.dialog = false;
    },

    funcao2 () {
      this.objetoExcluir.dialog = false;
    },
    funcao3 () {
      this.objetoAlteracao.dialog = false;
    },
    async atualizar () {
      try {
        this.objetoAlteracao.dialog = false;
        this.loading = true;
        const { id } = this.$route.params;
        const objeto = { id_idioma: this.idioma === 'Inglês' ? 10 : 11 };
        const ret = await this.$http.put(`users/atualizar-usuario/${id}`, objeto, { headers: { authorization: this.$store.state.token } });
        this.dialogAlteracoes = true;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
        alert('Erro ao carrega as turmas');
      }
    },

    async adicionarHoras () {
      try {
        this.objeto.dialog = false;
        this.loading = true;
        const { id } = this.$route.params;
        let horas = this.horasAdded.replace('hora', '');
        horas = this.horasAdded.replace('horas', '');
        horas = this.horasAdded.replace('hora', '');
        const objeto = { qtd: horas };
        const ret = await this.$http.put(`users/adicionar-horas/${id}`, objeto, { headers: { authorization: this.$store.state.token } });
        this.dialogAlteracoes = true;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
        alert('Erro ao carrega as turmas');
      }
    },

    async adicionarChance () {
      try {
        this.objetoExcluir.dialog = false;
        this.loading = true;
        const { id } = this.$route.params;
        const ret = await this.$http.delete(`users/adicionar-chance/${id}`, { headers: { authorization: this.$store.state.token } });
        this.dialogAlteracoes = true;
        this.loading = false;
        this.$router.push('/listar-usuarios-simulado');
      } catch (e) {
        this.loading = false;
        console.log(e);
        alert('Erro ao carrega as turmas');
      }
    },
  },
};
</script>

<style scoped>

</style>
