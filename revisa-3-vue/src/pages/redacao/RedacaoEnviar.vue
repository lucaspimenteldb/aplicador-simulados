<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          Redações
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" class="mt-8"
      >
        <header-secao>
          Tema da redação e texto motivador
        </header-secao>
      </v-col>

      <v-col cols="12">
        <subheader-secao>
          Tema da redação
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" class="max-h-500 relative"
      >
        <iframe
            src="https://iopscience.iop.org/article/10.1086/305618/pdf" frameborder="0"
            width="100%"
            height="500px"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Enviar Redação 1
        </header-secao>
      </v-col>

      <v-col
          cols="12" md="7"
          lg="9"
      >
        <subheader-secao>
          Aprenda como enviar a sua redação
        </subheader-secao>

        <iframe
            width="100%" height="360"
            src="https://www.youtube.com/embed/xgcIJggKtmY" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
            class="mt-2"
        />
      </v-col>

      <v-col
          cols="12" md="5"
          lg="3"
      >
        <subheader-secao>
          <v-icon v-text="'mdi-playlist-edit'" />
          <p class="d-inline-block">
            Folha de Rascunho
          </p>
          <br>

          <v-btn
              v-bind="attrs"
              v-on="on"
              color="azul"
              class="botao mt-2 px-4 py-2 white--text text-none  transition"
          >
            Baixar folha rascunho
          </v-btn>
        </subheader-secao>

        <subheader-secao class="mt-8">
          <v-icon v-text="'mdi-file-send-outline'" />
          <p class="d-inline-block">
            Enviar redação
          </p>
          <br>

          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-on="on"
                  v-bind="attrs"
                  color="azul"
                  class="botao mt-2 px-4 py-2 white--text text-none  transition"
              >
                Enviar foto da redação
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Termos de compromisso do envio da redação
              </v-card-title>

              <v-card-text>
                <p>
                  textão
                </p>
              </v-card-text>

              <v-card-actions class="pr-6">
                <v-spacer />

                <v-btn
                    text
                    color="errou"
                    v-text="'Cancelar'"
                    @click="dialog = false"
                    class="text-none"
                />

                <v-dialog
                  v-model="enviarRedacao"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="azul"
                        v-text="'Enviar redação'"
                        v-on="on"
                        v-bind="attrs"
                        class="botao mt-2 px-4 py-2 white--text text-none  transition"
                    />
                  </template>

                  <v-card>
                    <v-alert
                        class="pl-6 azul white--text rounded-0"
                        v-show="redacaoEnviada"
                    >
                      Sua redação foi enviada com sucesso!

                      <v-icon
                          color="white"
                          v-text="'mdi-checkbox-marked-outline'"
                          small
                          class="ml-2"
                      />
                    </v-alert>

                    <v-alert
                        class="pl-6 errou white--text rounded-0"
                        v-show="redacaoEnvioErro"
                    >
                     {{ msgErro }}

                      <v-icon
                          color="white"
                          v-text="'mdi-close-circle-outline'"
                          small
                          class="ml-2"
                      />
                    </v-alert>

                    <v-card-title>
                      Enviar redação
                    </v-card-title>

                    <v-card-text>
                      <v-file-input
                          filled
                          label="Enviar foto da redação"
                          color="azul"
                          v-model="file"
                          v-show="enviarRedacao"
                          class="mt-4"
                      />
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer />

                      <v-btn
                          text
                          color="errou"
                          v-text="'fechar'"
                          class="text-none"
                          @click="redacaoEnviada, redacaoEnvioErro, dialog = false"
                      />

                      <v-btn
                          :loading="loading"
                          :disabled="loading"
                          color="azul"
                          v-text="'Enviar redação'"
                          class="botao mt-2 px-4 py-2 white--text text-none transition"
                          @click="funcao"
                      />
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-alert
              max-height="36px"
              max-width="99px"
              v-text="situacaoRedacao"
              class="mt-2 d-flex align-center white--text font-weight-bold"
              :class="{ 'green': situacaoRedacao === 'Avaliado', 'errou': situacaoRedacao === 'pendente',
              'azul': situacaoRedacao === 'Apto para Avaliação' }"
          />
        </subheader-secao>
      </v-col>
    </v-row>
    <ModalPadrao
        :objeto="objeto"
        @aparecerModal="cancelOk"
        @funcao="enviarFotoRedacao"
    />
  </v-container>
</template>

<script>
import ModalPadrao from '../../components/modal/ModalPadrao.vue';

export default {
  name: 'RedacaoEnviar',
  components: { ModalPadrao },

  data () {
    return {
      loading: false,
      dialog: false,
      msgErro: '',
      enviarRedacao: false,
      redacaoEnviada: false,
      redacaoEnvioErro: false,
      situacaoRedacao: 'pendente',
      file: null,
      form: [],
      redacaoId: '',
      redacao: [],
      objeto: {
        dialog: false,
        titulo: 'Tem certeza que deseja enviar?',
        textConfirm2: 'Enviar',
        textButton: 'Cancelar',
        confirm2: true,

      },
    };
  },

  async created () {
    this.redacaoId = this.$route.params.redacao;
    try {
      const redacao = await this.$http.get(`redacao/redacao-atual/${this.redacaoId}/${this.$store.state.usuario.id}`,
        { headers: { Authorization: this.$store.state.token } });
      this.redacao = redacao.data.redacao;
      this.situacaoRedacao = this.redacao[0].UsersRedacaos[0] ? this.redacao[0].UsersRedacaos[0].situacao : 'pendente';
    } catch (e) {
      console.log(e);
      alert('Erro ao acessar o servidor');
    }
  },

  methods: {
    cancelOk () {
      this.objeto.dialog = false;
    },

    funcao () {
      this.objeto.dialog = true;
    },
    async enviarFotoRedacao () {
      try {
        this.objeto.dialog = false;
        this.redacaoEnvioErro = false;
        this.redacaoEnviada = false;
        const tipoImage = this.file.type.split('/')[0];
        if (tipoImage !== 'image') {
          alert('Por favor selecione uma imagem');
          return;
        }
        this.loading = true;
        this.form = new FormData();
        this.form.append('id_user', this.$store.state.usuario.id);
        this.form.append('id_redacao', this.redacaoId);
        this.form.append('file', this.file);
        const res = await this.$http.post('redacao/enviar-redacao', this.form, {
          headers: { Authorization: this.$store.state.token, 'Content-type': 'multipart/form-data' },
        });
        this.loading = false;
        this.redacaoEnviada = true;
      } catch (e) {
        this.loading = false;
        this.redacaoEnvioErro = true;
        this.msgErro = e.response.data.e || 'Sem conexão com o servidor';
      }
    },
  },
};
</script>

<style scoped>

</style>
