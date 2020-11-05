<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn
            text
            class="text-none"
            to="/listar-codigos"
        >
          <v-icon
              v-text="'mdi-arrow-left'"
              class="mr-2"
          />

          voltar
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1>
          Gerar código de acesso
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-select
            label="Escolha o privilégio dos códigos"
            filled
            color="azul"
            :items="['Aluno', 'Diretor', 'Gestor']"
            hide-details
        />
      </v-col>

      <v-col
        cols="6"
        sm="4"
        md="3"
      >
        <v-text-field
            v-model="slider"
            hide-details
            label="Quantidade de códigos"
            filled
            color="azul"
            type="number"
        />
      </v-col>

      <v-col cols="12">
        <v-btn
            color="azul" class="text-none white--text"
        >
          Gerar códigos
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <subheader-secao>
          Códigos de acesso
        </subheader-secao>
      </v-col>

      <v-col
          cols="12"
          class="pt-0"
      >
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="body-2 font-weight-bold text-left">
                Códigos
              </th>
              <th class="body-2 font-weight-bold text-left">
                Privilégio
              </th>
            </tr>
            </thead>

            <tbody>
            <tr
                v-for="item in codigos"
                :key="item.codigo"
            >
              <td>
                <textarea
                    :id="item.codigo"
                    class="d-inline-block v-align-middle"
                    rows="1"
                    cols="15"
                    readonly
                >
                  {{ item.codigo }}
                </textarea>

                <v-btn
                    color="azul"
                    outlined
                    class="ml-4 text-none"
                    small
                    @click="copiarCodigo"
                >
                  Copiar código
                </v-btn>
              </td>
              <td>
                {{ item.privilegio }}
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'GerarCodigoAcesso',

  data () {
    return {
      slider: '',
      codigos: [
        {
          codigo: '121244',
          privilegio: 'Professor',
          tooltip: false,
        },
        {
          codigo: '121asd244',
          privilegio: 'Professor',
          tooltip: false,
        },
      ],
    };
  },

  methods: {
    copiarCodigo (e) {
      const codigo = e.currentTarget.previousElementSibling;
      const codigoPai = e.currentTarget.parentElement;
      codigo.select();
      codigo.setSelectionRange(0, 99999);
      document.execCommand('copy');

      const tooltip = document.createElement('DIV');
      tooltip.innerText = `Código ${codigo.value} copiado com sucesso`;
      codigoPai.appendChild(tooltip);
      tooltip.classList.add('acertou--text', 'font-weight-bold', 'transition');

      setTimeout(() => {
        codigoPai.removeChild(tooltip);
      }, 3000);
    },
  },
};
</script>

<style scoped>

</style>
