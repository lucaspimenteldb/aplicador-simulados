export default class ColocacaoEscola {
    icon;

    posicao;

    media;

    redacao;

    pontuacao;

    id;

    escola;

    cre;

    municipio;

    humanas;

    natureza;

    linguagens;

    matematica;

    preencherCampos (icon, posicao, escola, redacao, id, media, municipio, cre) {
      this.cre = cre;
      this.icon = icon;
      this.posicao = posicao;
      this.escola = escola;
      this.redacao = redacao;
      this.id = id;
      this.media = media;
      this.municipio = municipio;
    }

    preencherNota (icon, posicao, escola, natureza, linguagens, humanas, matematica) {
      this.matematica = matematica;
      this.escola = escola;
      this.natureza = natureza;
      this.linguagens = linguagens;
      this.humanas = humanas;
      this.posicao = posicao;
      this.icon = icon;
    }
}
