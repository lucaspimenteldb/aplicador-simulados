export default class DesempenhoGeral {
    ttl;

    nota;

    altura;

    constructor (ttl, nota) {
      this.ttl = ttl;
      this.nota = nota;
      this.altura = this.altura2;
    }

    get altura2 () {
      return (this.nota / (1000)) * 100;
    }
}
