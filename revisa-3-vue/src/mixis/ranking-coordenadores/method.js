import DesempenhoGeral from '../../models/ranking-professores/desempenhoGeral';
import Melhores from '../../models/ranking-professores/melhores';
import Colocacao from '../../models/ranking-professores/colocacao';
import ColocacaoEscola from '../../models/ranking-professores/colocacaoEscola';
import Ranking from '../../models/ranking-professores/ranking';
import env from '../../env';
import DesempenhoArea from '../../models/ranking-professores/desempenhoArea';

const methods = {
  methods: {
    async iniciar () {
      try {
        this.dialog = true;
        const { id } = JSON.parse(localStorage.getItem('token'));
        const escolaAux = await this.$http.get(`simulado-master/${id}/2`, { headers: { Authorization: this.$store.state.token } });
        this.escolas = escolaAux.data.escolas ? escolaAux.data.escolas : [{ titulo: 'Sem dados' }];
        this.simulados = escolaAux.data.simulados ? escolaAux.data.simulados : [{ titulo: 'Sem dados' }];
        this.cres = escolaAux.data.cres ? escolaAux.data.cres : [{ nome: 'Sem dados' }];
        this.cres.push({ nome: 'Geral' });
        // this.desempenhoGeral.push(new DesempenhoGeral('Média Estadual', escolaAux.data.desempenhoEstadual[0].media_geral));
        // this.desempenhoGeral.push(new DesempenhoGeral('Redação Estadual', escolaAux.data.desempenhoEstadual[0].media_redacao));
        const vector = ['mdi-podium-gold', 'mdi-podium-silver', 'mdi-podium-bronze', 'mdi-seal-variant'];
        for (let i = 0; i < 4; i++) {
          const user = escolaAux.data.melhores[i];
          const photo = user.User.photo ? env.ROTA_DOMINIO + user.User.photo : `${env.ROTA_DOMINIO}vendor/crudbooster/avatar.jpg`;
          const melhor = new Melhores(photo, vector[i], i + 1, user.User.name, user.media, 26);
          this.melhores.push(melhor);
        }
        this.preencherRanking(escolaAux.data.melhores, vector);
        this.preencherCres(escolaAux.data.desempenho_cre, escolaAux.data.user_cre);
        this.dialog = false;
      } catch (e) {
        this.msgErro(e);
        throw e;
      }
    },
    
    async simuladosSegundoDia () {
      try {
        this.dialog = true;
        const { id } = JSON.parse(localStorage.getItem('token'));
        const idSimulado = this.simulados.filter((el) => el.titulo === this.simuladoAtual);
        if (idSimulado.length < 0){ this.dialog = false; return; }
        const escolaAux = await this.$http.get(`simulado-master/${id}/${idSimulado[0].id}`, { headers: { Authorization: this.$store.state.token } });
        this.escolas = escolaAux.data.escolas ? escolaAux.data.escolas : [{ titulo: 'Sem dados' }];
        this.simulados = escolaAux.data.simulados ? escolaAux.data.simulados : [{ titulo: 'Sem dados' }];
        this.cres = escolaAux.data.cres ? escolaAux.data.cres : [{ nome: 'Sem dados' }];
        this.cres.push({ nome: 'Geral' });
        // this.desempenhoGeral.push(new DesempenhoGeral('Média Estadual', escolaAux.data.desempenhoEstadual[0].media_geral));
        // this.desempenhoGeral.push(new DesempenhoGeral('Redação Estadual', escolaAux.data.desempenhoEstadual[0].media_redacao));
        const vector = ['mdi-podium-gold', 'mdi-podium-silver', 'mdi-podium-bronze', 'mdi-seal-variant'];
        this.melhores = [];
        for (let i = 0; i < 4; i++) {
          const user = escolaAux.data.melhores[i];
          const photo = user.User.photo ? env.ROTA_DOMINIO + user.User.photo : `${env.ROTA_DOMINIO}vendor/crudbooster/avatar.jpg`;
          const melhor = new Melhores(photo, vector[i], i + 1, user.User.name, user.media, 26);
          this.melhores.push(melhor);
        }
        this.preencherRanking(escolaAux.data.melhores, vector);
        this.preencherCres(escolaAux.data.desempenho_cre, escolaAux.data.user_cre);
        this.dialog = false;
      } catch (e) {
        this.msgErro(e);
        throw e;
      }
    },

    preencherCres (cres, userCre) {
      this.colocacoesCresGeral = [];
      for (let i = 0; i < cres.length; i++) {
        const beris = {
          posicao: i + 1,
          cre: cres[i].Gre.nome,
          alunos: userCre.filter((el) => el.id_gre === cres[i].id_gre).length,
          media: cres[i].geral,
          humanas: cres[i].humanas,
          natureza: cres[i].natureza,
          linguagens: cres[i].linguagens,
          matematica: cres[i].matematica,
          redacao: cres[i].redacao,
        };
        this.colocacoesCresGeral.push(beris);
      }
    },

    preencherRanking (objeto, vector) {
      for (let i = 0; i < objeto.length; i++) {
        const podio = vector[i] || 'mdi-seal-variant';
        const photo = objeto[i].User.photo ? env.ROTA_DOMINIO + objeto[i].User.photo : `${env.ROTA_DOMINIO}vendor/crudbooster/avatar.jpg`;
        const colocacao = new Colocacao(podio, i + 1, objeto[i].User.name, objeto[i].redacao, objeto[i].media, '', objeto[i].id);
        colocacao.setRedacao(objeto[i].redacao);
        colocacao.setNotas(objeto[i].Humanas, objeto[i].Natureza, objeto[i].Linguagens, objeto[i].Matematica);
        const escola = objeto[i].User.Escolas[0] ? objeto[i].User.Escolas[0].nome : 'Sem escola';
        const cre = objeto[i].User.Gres[0] ? objeto[i].User.Gres[0].nome : '';
        const turma = objeto[i].User.Turmas[0] ? objeto[i].User.Turmas[0].descricao : '';
        let turno = '';
        if (turma) {
          turno = objeto[i].User.Turmas[0].Turno ? objeto[i].User.Turmas[0].Turno.descricao : '';
        } else {
          turno = '';
        }
        colocacao.setEscolares(escola, cre,
          turno, turma, photo);
        this.colocacoes.push(colocacao);
      }
    },

    async changeEscola () {
      try {
        this.dialog = true;
        this.colocacoesEscolar = [];
        this.colocacoesEscolarArea = [];
        this.rankings = [];
        this.desempenhoArea = [];
        this.desempenhoGeral = [];
        const filterEscola = this.escolas.filter((el) => el.titulo === this.escolaAtual);
        const filterSimulado = this.simulados.filter((el) => el.titulo === this.simuladoAtual);
        if (filterEscola.length > 0 && filterSimulado.length > 0) {
          const vector = ['mdi-podium-gold', 'mdi-podium-silver', 'mdi-podium-bronze', 'mdi-seal-variant'];
          const dados = await this.$http.get(`ranking-professor/escola/${filterEscola[0].id}/${filterSimulado[0].id}`,
            { headers: { Authorization: this.$store.state.token } });
          const alunos = dados.data.desempenho_escolar;
          for (let i = 0; i < alunos.length; i++) {
            const podio = vector[i] || 'mdi-seal-variant';
            const colocacao = new ColocacaoEscola();
            const colocaoArea = new ColocacaoEscola();
            colocaoArea.preencherNota(podio, i + 1, alunos[i].escola, alunos[i].media_matematica,
              alunos[i].media_natureza, alunos[i].media_linguagens, alunos[i].media_humana);
            colocacao.preencherCampos(podio, i + 1, alunos[i].escola, alunos[i].media_redacao,
              alunos[i].id, alunos[i].media_geral, alunos[i].cidade, alunos[i].gre);
            this.colocacoesEscolarArea.push(colocaoArea);
            this.colocacoesEscolar.push(colocacao);
          }
          this.rankings.push(new Ranking('Estadual', dados.data.positions.media_geral, dados.data.myEscola[0].media_geral));
          this.desempenhoGeral.push(new DesempenhoGeral('Média Da Escola', dados.data.myEscola[0].media_geral));
          this.desempenhoGeral.push(new DesempenhoGeral('Redação', dados.data.myEscola[0].media_redacao));
          this.desempenhoArea.push(new DesempenhoArea('Linguagens', dados.data.positions.media_linguagens));
          this.desempenhoArea.push(new DesempenhoArea('Matématica', dados.data.positions.media_matematica));
          this.desempenhoArea.push(new DesempenhoArea('Humanas', dados.data.positions.media_humana));
          this.desempenhoArea.push(new DesempenhoArea('Natureza', dados.data.positions.media_natureza));
          this.desempenhoArea.push(new DesempenhoArea('Redação', dados.data.positions.media_redacao));
        }

        this.dialog = false;
      } catch (e) {
        this.msgErro(e);
      }
    },
      
    async changeGreEscola (event) {
      try {
        this.dialog = true;
        const id = this.simulados.filter((el) => el.titulo === this.simuladoAtual);
        if (id.length <= 0) { alert('Selecione o simulado'); this.dialog = false; return; }
        let url = `desempenho-escola/${id[0].id}`;
        if (event !== 'Geral') {
          const cre = this.cres.filter((el) => el.nome === event);
          url = `desempenho-escola/${id[0].id}/${cre[0].id}`;
        }
        const dados = await this.$http.get(url, { headers: { Authorization: this.$store.state.token } });
        this.colocacoesEscolarCre = [];
        for (let i = 0; i < dados.data.length; i++) {
          const number = dados.data[i];
          const novo = {
            posicao: i + 1,
            escola: number.Escola.nome,
            cidade: number.Escola.cidade,
            cre: number.Escola.Gre.nome,
            media: number.media_geral,
            redacao: number.media_redacao,
          };
          this.colocacoesEscolarCre.push(novo);
        }
       
        this.dialog = false;
      } catch (e) {
        alert('Sem conexão com o servidor');
        this.dialog = false;
      }
    },

    async usersPerCre () {
      try {
        this.loader = true;
        const id2 = this.simulados.filter((el) => el.titulo === this.simuladoAtual);
        if (id2.length <= 0) { alert('Selecione o simulado'); this.loader = false; return; }
        let url = `desempenho-aluno-gre/${id2[0].id}`;
        if (this.creAtualAluno !== 'Geral') {
          const id = this.cres.filter((el) => el.nome === this.creAtualAluno);
          url = `desempenho-aluno-gre/${id2[0].id}/${id[0].id}`;
        }

        const dados = await this.$http.get(url, { headers: { Authorization: this.$store.state.token } });
        this.colocacoesGre = [];
        for (let i = 0; i < dados.data.length; i++) {
          const user = dados.data[i];
          const novo = new Colocacao('', i + 1, user.User.name, user.redacao, user.media, 'perfil', user.id);
          novo.setNotas(user.Humanas, user.Natureza, user.Linguagens, user.Matematica);
          novo.setEscolares(user.Escola.nome, user.Escola.Gre.nome, '', '', '');
          this.colocacoesGre.push(novo);
        }
        this.loader = false;
        console.log(dados);
      } catch (e) {
        this.loader = false;
        console.log(e);
      }
    },

    msgErro (e) {
      this.dialog = false;
      let message = 'Dados não encontrados';
      if (e.response) {
        if (e.response.status !== 400 || e.response.status !== 401) {
          message = 'Sem conexão com o servidor';
        }
      }
      alert(message);
    },
  },
};

export default methods;
