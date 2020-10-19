export default class DesempenhoArea {
    ttl;

    nota;

    notaEstado;

    ranking;

    constructor (ttl, ranking, nota, notaEstado) {
      this.ttl = ttl;
      this.nota = nota;
      this.notaEstado = notaEstado;
      this.ranking = ranking;
    }
}
