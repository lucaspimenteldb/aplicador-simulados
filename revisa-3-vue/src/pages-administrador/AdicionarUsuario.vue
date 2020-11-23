<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>
                    Adicionar usuário
                </h1>
            </v-col>
        </v-row>

        <v-row>
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
              <v-btn
                      @click="enviarUsuario"
                      color="azul" class="text-none white--text rounded__norma"
              >
                Adicionar usuário
              </v-btn>
                <v-dialog
                        v-model="dialog"
                        width="500"
                >

                    <v-card>
                        <v-card-title class="headline white--text azul">
                            {{ message.ttl }}
                        </v-card-title>

                        <v-card-text class="mt-2 black--text">
                            {{ message.text }}
                        </v-card-text>

                        <v-divider />

                        <v-card-actions>
                            <v-spacer />

                            <v-btn
                                    color="azul"
                                    @click="dialog = false"
                                    class="white--text text-none"
                                    v-text="'Ok'"
                            />
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
  name: 'AdicionarUsuario',
  components: { loading },

  data () {
    return {
      loading: false,
      dialog: false,
      escolas: [],
      turnos: [],
      turmas: [],
      privilegios: [],
      message: {
        delete: true,
        ttl: 'Título',
        text: 'Usuário adicionado com sucesso',
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
          required: true,
          back: '',
          name: 'password',
          label: 'Senha',
          type: 'password',
          cols: 6,
        },
        {
          valor: '',
          required: true,
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
          data: this.turmas,
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
    async changeEscola (event) {
      try {
        if (event !== 'id_turno') {
          return;
        }
        this.loading = true;
        const turno = this.getUsuario('id_turno');
        const idTurno = this.turnos.filter((el) => el.descricao === turno);
        if (!turno) { return; }
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

    getUsuario (name) {
      const valor = this.inputs.filter((el) => el.name === name);
      return valor.length > 0 ? valor[0].valor : '';
    },
    async enviarUsuario () {
      try {
        this.loading = true;
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
        await this.$http.post('users/cadastrar-usuario', form, {
          headers: { Authorization: this.$store.state.token, 'Content-type': 'multipart/form-data' },
        });
        this.loading = false;
        this.dialog = true;
      } catch (e) {
        console.log(e);
        this.loading = false;
        alert(e.response ? e.response.data.message : 'Erro interno');
      }
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
  },

  async created () {
    try {
      this.loading = true;
      const dados = await this.$http.get('users/usuario/usuario/usuario/cadastrar-usuario', { headers: { Authorization: this.$store.state.token } });
      this.escolas = dados.data.escolas;
      this.turnos = dados.data.turnos;
      this.privilegios = dados.data.privilegios;
      this.mudarInputs(dados.data);
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
