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
        const escolaAux = await this.$http.get('ranking-professor');
        this.escolas = escolaAux.data.escolas;
        this.desempenhoGeral.push(new DesempenhoGeral('Média Estadual', escolaAux.data.desempenhoEstadual[0].media_geral));
        this.desempenhoGeral.push(new DesempenhoGeral('Redação Estadual', escolaAux.data.desempenhoEstadual[0].media_redacao));
        const vector = ['mdi-podium-gold', 'mdi-podium-silver', 'mdi-podium-bronze', 'mdi-seal-variant'];
        for (let i = 0; i < 3; i++) {
          const user = escolaAux.data.melhores[i];
          const photo = user.photo ? env.ROTA_DOMINIO + user.photo : `${env.ROTA_DOMINIO}vendor/crudbooster/avatar.jpg`;
          const melhor = new Melhores(photo, vector[i], i + 1, user.name, user.media, 26);
          this.melhores.push(melhor);
        }
        this.preencherRanking(escolaAux.data.melhores, vector);
        this.dialog = false;
      } catch (e) {
        this.dialog = false;
        alert('Sem conexão com o servidor');
        console.log(e);
        throw e;
      }
    },

    preencherRanking (objeto, vector) {
      for (let i = 0; i < objeto.length; i++) {
        const podio = vector[i] || 'mdi-seal-variant';
        const photo = objeto[i].photo ? env.ROTA_DOMINIO + objeto[i].photo : `${env.ROTA_DOMINIO}vendor/crudbooster/avatar.jpg`;
        const colocacao = new Colocacao(podio, i + 1, objeto[i].name, objeto[i].redacao, objeto[i].media, '', objeto[i].id);
        colocacao.setRedacao(objeto[i].redacao);
        colocacao.setNotas(objeto[i].hum, objeto[i].nat, objeto[i].ling, objeto[i].mat);
        colocacao.setEscolares(objeto[i].escola, objeto[i].gre, objeto[i].turno, objeto[i].turma, photo);
        this.colocacoes.push(colocacao);
      }
    },

    async changeEscola (event) {
      try {
        this.dialog = true;
        this.colocacoesEscolar = [];
        this.colocacoesEscolarArea = [];
        this.rankings = [];
        this.desempenhoArea = [];
        const filterEscola = this.escolas.filter((el) => el.titulo === event);
        if (filterEscola.length > 0) {
          const vector = ['mdi-podium-gold', 'mdi-podium-silver', 'mdi-podium-bronze', 'mdi-seal-variant'];
          const dados = await this.$http.get(`ranking-professor/escola/${filterEscola[0].id}`);
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
          this.desempenhoArea.push(new DesempenhoArea('Linguagens', dados.data.positions.media_linguagens));
          this.desempenhoArea.push(new DesempenhoArea('Matématica', dados.data.positions.media_matematica));
          this.desempenhoArea.push(new DesempenhoArea('Humanas', dados.data.positions.media_humana));
          this.desempenhoArea.push(new DesempenhoArea('Natureza', dados.data.positions.media_natureza));
          this.desempenhoArea.push(new DesempenhoArea('Redação', dados.data.positions.media_redacao));
        }

        this.dialog = false;
      } catch (e) {
        console.log(e);
        this.dialog = false;
        alert('Sem conexão do servidor');
      }
    },
  },
};

export default methods;
