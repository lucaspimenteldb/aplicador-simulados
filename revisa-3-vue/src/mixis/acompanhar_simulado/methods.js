import storage from '../../storage/storage';

const dados = {
  methods: {
    mudarModal () {
      this.simuladoSelecionado = this.selects[0].model;
    },

    startExcel () {
      if (this.informacoes.length > 0) this.excel = true;
    },

    finishExcel () {
      this.excel = false;
    },

    download () {
      document.getElementById('json').click();
    },
    downloadCoord () {
      document.getElementById('jsonCoorde').click();
    },
    downloadCre () {
      document.getElementById('jsonCre').click();
    },

    async iniciar () {
      try {
        this.loading = true;
        const data = await this.$http.get('simulado-estado', { headers: { Authorization: this.$store.state.token } });
        this.simulados = (data.data.simulados);
        this.escolas = data.data.escolas;
        this.informacoesCoordenador = data.data.users;
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
    
    reset (item) {
      this.envioEmail = false;
      this.camposBrancos = false;
      this.envioEmailErro = false;
      this.email = item.email2;
      this.assuntoEmail = '';
      this.mensagemEmail = '';
    },

    async changeEscola (event) {
      try {
        this.loading = true;
        const objeto = storage.get('token');
        const objeto2 = JSON.parse(objeto);
        const escolaId = this.escolas.filter((el) => el.nome === event);
        if (escolaId.length > 0) {
          const data = await this.$http.get(`turmas/${objeto2.id}/${escolaId[0].id}`,
            { headers: { Authorization: this.$store.state.token } });
          this.turmas = (data.data);
        }
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },

    async changeSelect () {
      try {
        this.loading = true;
        const escolaId = this.escolas.filter((el) => el.nome === this.escolaAtual);
        const turmaId = this.turmas.filter((el) => el.descricao === this.turmaAtual);
        const simuladoId = this.simulados.filter((el) => `${el.titulo} (${el.SimuladoEstadoMaster.titulo})` === this.simuladoSelecionado);

        if (escolaId.length > 0 && turmaId.length > 0 && simuladoId.length > 0 && this.tipoAtual) {
          const data = await this.$http.get(`users/${turmaId[0].id}/${escolaId[0].id}/${simuladoId[0].id}`,
            { headers: { Authorization: this.$store.state.token } });
          this.preencherUsuario(data.data);
        }
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },

    preencherUsuario (users) {
      this.informacoes = [];
      for (let i = 0; i < users.length; i++) {
        const beris = {
          nome: users[i].name,
          escola: users[i].Escolas[0].nome,
          turma: users[i].Turmas[0].descricao,
          simulado: users[i].situacao,
          redacao: users[i].situacaoRedacao,
          email: 'Enviar E-mail',
          email2: users[i].email,
          id: users[i].id,
        };

        this.informacoes.push(beris);
      }

      document.querySelectorAll('.v-data-footer__select').forEach((paginacao) => {
        // eslint-disable-next-line no-param-reassign
        paginacao.innerHTML = '';
      });
      document.querySelectorAll('.v-data-footer__pagination').forEach((itens) => {
        const elementos = itens.innerHTML.split(' ');
        // eslint-disable-next-line no-param-reassign
        itens.innerHTML = `${elementos[0]} de ${elementos[2]}`;
        console.log(elementos);
      });
    },

    async enviarEmail () {
      try {
        this.giroBtn = true;
        this.camposBrancos = false;
        this.envioEmail = false;
        this.envioEmailErro = false;
        const object = { assunto: this.assuntoEmail, mensagem: this.mensagemEmail, email: this.email };
        if (!object.assunto.trim() || !object.mensagem.trim() || !object.email.trim()) {
          this.camposBrancos = true;
          return;
        }
        await this.$http.post('users/enviar-email', object, { headers: { Authorization: this.$store.state.token } });
        
        this.envioEmail = true;
        this.giroBtn = false;
      } catch (e) {
        this.giroBtn = false;
        this.envioEmailErro = true;
      }
    },
  },
};

export default dados;
