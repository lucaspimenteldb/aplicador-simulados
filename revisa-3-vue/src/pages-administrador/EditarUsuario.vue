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
                    {{ nome  }}
                </header-secao>
            </v-col>

            <v-col
                    v-for="input of inputs" :key="input.name"
                    cols="12"
                    :sm="input.cols"
            >
                <v-text-field
                        :background-color="input.back"
                        :id="input.name"
                        :label="input.label"
                        filled
                        v-model="input.valor"
                        color="azul"
                        append-icon="mdi-pencil"
                        hide-details
                        v-if="input.type === 'text'"
                />
                <v-text-field
                        :background-color="input.back"
                        :id="input.name"
                        :label="input.label"
                        filled
                        type="password"
                        v-model="input.valor"
                        color="azul"
                        append-icon="mdi-pencil"
                        hide-details
                        v-if="input.type === 'password'"
                />
                <v-select
                        :background-color="input.back"
                        :id="input.name"
                        :label="input.label"
                        filled
                        @change="changeEscola(input.name)"
                        v-model="input.valor"
                        color="azul"
                        :items="input.data"
                        append-icon="mdi-pencil"
                        hide-details
                        v-if="input.type === 'select'"
                />
                <v-file-input
                        :background-color="input.back"
                        :id="input.name"
                        :label="input.label"
                        filled
                        v-model="input.valor"
                        color="azul"
                        append-icon="mdi-pencil"
                        hide-details
                        v-if="input.type === 'file'"
                />
                <v-autocomplete
                        :background-color="input.back"
                        :id="input.name"
                        :label="input.label"
                        filled
                        v-model="input.valor"
                        color="azul"
                        :items="input.data"
                        append-icon="mdi-pencil"
                        hide-details
                        v-if="input.type === 'autocomplete'"
                />

                <v-autocomplete
                        :background-color="input.back"
                        :id="input.name"
                        :label="input.label"
                        filled
                        v-model="input.valor"
                        color="azul"
                        :items="input.data"
                        append-icon="mdi-pencil"
                        hide-details
                        multiple
                        v-if="input.type === 'duplo'"
                />
            </v-col>

            <v-col cols="12">
                <v-dialog
                        v-model="dialogAlteracoes"
                        width="500"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                :disabled="loading"
                                :loading="loading"
                                v-bind="attrs"
                                color="azul"
                                @click="enviarUsuario"
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
        <loading :dialog="loading" />
    </v-container>
</template>

<script>
import loading from '../components/loading/Loading.vue';

export default {
  name: 'EditarUsuario',
  components: { loading },

  data () {
    return {
      dialog: false,
      loading: false,
      nome: '',
      escolas: [],
      turnos: [],
      turmas: [],
      privilegios: [],
      dialogAlteracoes: false,
      message: {
        delete: true,
        ttl: 'Título',
        text: 'bla bla bla',
      },

      inputs: [
        {
          valor: null,
          required: false,
          back: '',
          name: 'file',
          label: 'Foto',
          type: 'file',
          cols: 6,
        },
        {
          valor: '',
          back: '',
          required: true,
          name: 'name',
          label: 'Nome',
          type: 'text',
          cols: 6,
        },
        {
          valor: '',
          required: true,
          back: '',
          name: 'email',
          label: 'Email',
          type: 'text',
          cols: 4,
        },
        {
          valor: '',
          required: true,
          back: '',
          name: 'email2',
          label: 'Email 2',
          type: 'text',
          cols: 4,
        },
        {
          valor: '',
          required: false,
          back: '',
          name: 'telefone_um',
          label: 'Telefone',
          type: 'text',
          cols: 4,
        },
        {
          valor: '',
          required: true,
          back: '',
          name: 'login',
          label: 'Usuário',
          type: 'text',
          cols: 12,
        },
        {
          valor: '',
          required: false,
          back: '',
          name: 'password',
          label: 'Senha',
          type: 'password',
          cols: 6,
        },
        {
          valor: '',
          required: false,
          back: '',
          name: 'confirm_password',
          label: 'Confirmar Senha',
          type: 'password',
          cols: 6,
        },
        {
          valor: '',
          required: true,
          back: '',
          name: 'id_cms_privileges',
          label: 'Privilégio',
          type: 'autocomplete',
          cols: 12,
          data: this.privilegios,
        },
        {
          valor: '',
          required: true,
          name: 'id_escola',
          back: '',
          label: 'Escola',
          type: 'duplo',
          cols: 12,
          data: this.escolas,
        },
        {
          valor: '',
          required: true,
          label: 'Turno',
          back: '',
          name: 'id_turno',
          type: 'select',
          cols: 6,
          data: this.turnos,
        },
        {
          valor: '',
          required: false,
          back: '',
          name: 'id_turma',
          label: 'Turma',
          type: 'autocomplete',
          cols: 6,
          data: [],
        },
        {
          valor: '',
          required: true,
          back: '',
          name: 'status',
          label: 'Status',
          type: 'select',
          cols: 6,
          data: ['Inativo', 'Ativo'],
        },
      ],
    };
  },

  methods: {
    getUsuario (name) {
      const valor = this.inputs.filter((el) => el.name === name);
      return valor.length > 0 ? valor[0].valor : '';
    },
    enviAuxiliar (name, valor) {
      let valorA = valor;
      if (name === 'id_cms_privileges') {
        const aux = this.privilegios.filter((el) => el.name === valor);
        valorA = aux[0] ? aux[0].id : valorA;
      } else if (name === 'id_turma') {
        const aux = this.turmas.filter((el) => el.descricao === valor);
        valorA = aux[0] ? aux[0].id : valorA;
      } else if (name === 'id_escola') {
        const vetor = [];
        for (let i = 0; i < valor.length; i++) {
          const aux = this.escolas.filter((el) => el.nome === valor[i]);
          valorA = aux[0] ? vetor.push(aux[0].id) : valorA;
        }
        valorA = vetor;
      }

      return valorA;
    },
    async changeEscola (event) {
      try {
        if (event !== 'id_turno') {
          return;
        }
        this.loading = true;
        const turno = this.getUsuario('id_turno');
        const idTurno = this.turnos.filter((el) => el.descricao === turno);
        if (!turno) {
          return;
        }
        const turmas = await this.$http.get(`users/${idTurno[0].id}`,
          { headers: { Authorization: this.$store.state.token } });
        this.mudarInputs(turmas.data);
        this.turmas = turmas.data.turmas;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
    mudarInputs (dados) {
      for (let i = 0; i < this.inputs.length; i++) {
        if (this.inputs[i].name === 'id_escola' && dados.escolas) {
          this.inputs[i].data = dados.escolas.map((el) => el.nome);
        } else if (this.inputs[i].name === 'id_cms_privileges' && dados.privilegios) {
          this.inputs[i].data = dados.privilegios.map((el) => el.name);
        } else if (this.inputs[i].name === 'id_turno' && dados.turnos) {
          this.inputs[i].data = dados.turnos.map((el) => el.descricao);
        } else if (this.inputs[i].name === 'id_turma' && dados.turmas) {
          this.inputs[i].data = dados.turmas.map((el) => el.descricao);
        }
      }
    },

    updated (usuario) {
      for (const input of this.inputs) {
        input.valor = usuario[input.name] ? usuario[input.name] : '';
        if (input.name === 'id_turma') {
          input.valor = usuario.Turmas[0].descricao;
          input.data.push(input.valor);
        }
        input.valor = input.name === 'id_escola' ? usuario.Escolas.map(el => el.nome) : input.valor;
        input.valor = input.name === 'id_turno' ? usuario.Turmas[0].Turno.descricao : input.valor;
        input.valor = input.name === 'id_cms_privileges' ? usuario.Privilege.name : input.valor;
        input.valor = input.name === 'password' ? '' : input.valor;
      }
    },
    async enviarUsuario () {
      try {
        this.loading = true;
        const { id } = this.$route.params;
        let unaVez = false;
        const form = new FormData();
        for (let i = 0; i < this.inputs.length; i++) {
          if (this.inputs[i].required && !this.inputs[i].valor) {
            this.inputs[i].back = '#ff4040';
            unaVez = true;
          }
          const valor = this.enviAuxiliar(this.inputs[i].name, this.inputs[i].valor);
          form.append(this.inputs[i].name, valor);
        }
        const password = this.getUsuario('password');
        const confirm = this.getUsuario('confirm_password');
        if (confirm !== password) { alert('Senha não correspondem'); this.loading = false; return; }
        if (unaVez) { alert('Preencha os campos obrigatórios'); this.loading = false; return; }
        await this.$http.put(`users/cadastrar-usuario/${id}`, form, {
          headers: { Authorization: this.$store.state.token, 'Content-type': 'multipart/form-data' },
        });
        this.loading = false;
        this.dialogAlteracoes = true;
      } catch (e) {
        console.log(e);
        this.loading = false;
        alert(e.response ? e.response.data.message : 'Erro interno');
      }
    },

  },

  async activated () {
    try {
      const { id } = this.$route.params;
      this.loading = true;
      const dados = await this.$http.get(`users/usuario/usuario/usuario/cadastrar-usuario/${id}`, { headers: { Authorization: this.$store.state.token } });
      this.escolas = dados.data.escolas;
      this.turnos = dados.data.turnos;
      this.privilegios = dados.data.privilegios;
      this.mudarInputs(dados.data);
      this.updated(dados.data.user);
      this.nome = dados.data.user.name;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  },
};
</script>

<style scoped>

</style>
