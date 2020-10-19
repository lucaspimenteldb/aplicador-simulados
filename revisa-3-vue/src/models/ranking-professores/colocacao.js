export default class Colocacao {
    icon;

    posicao;

    nome;

    redacao;

    pontuacao;

    perfil;

    id;

    redacao;

    Humanas;

    Natureza;

    Linguagens;

    Matematica;

    escola;

    turma;

    gre;

    turno;

    photo;

    constructor (icon, posicao, nome, redacao, pontuacao, perfil, id) {
      this.icon = icon;
      this.posicao = posicao;
      this.nome = nome;
      this.redacao = redacao;
      this.pontuacao = pontuacao;
      this.perfil = perfil;
      this.id = id;
    }
    
    setRedacao (redacao) {
      this.redacao = redacao;
    }
    
    setNotas (Humanas, Natureza, Linguagens, Matematica) {
      this.Humanas = Humanas;
      this.Matematica = Matematica;
      this.Linguagens = Linguagens;
      this.Natureza = Natureza;
    }

    setEscolares (escola, gre, turno, turma, photo) {
      this.turma = turma;
      this.photo = photo;
      this.escola = escola;
      this.gre = gre;
      this.turno = turno;
    }
}
