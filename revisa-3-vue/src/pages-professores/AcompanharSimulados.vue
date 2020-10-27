<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          Acompanhar Simulados Estaduais
        </h1>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="5" lg="4"
      >
        <v-select
            filled
            hide-details
            color="azul"
            @change="changeSelect"
            v-model="simuladoSelecionado"
            :items="simulados.map((el) => `${el.titulo} (${el.SimuladoEstadoMaster.titulo})`)"
            label="Selecione qual simulado quer ver"
        />
      </v-col>

      <v-col
          cols="12" sm="8"
          md="5" lg="4"
      >
        <v-select
            filled
            hide-details
            color="azul"
            v-model="escolaAtual"
            @change="changeEscola"
            :items="escolas.map((el) => el.nome)"
            label="Selecione qual escola quer ver"
        />
      </v-col>

      <v-col
          cols="12" sm="8"
          md="5" lg="4"
      >
        <v-select
            filled
            hide-details
            color="azul"
            @change="changeSelect"
            v-model="turmaAtual"
            label="Selecione qual turma quer ver"
            :items="turmas.map((el) => el.descricao)"
        />
      </v-col>

      <v-col
          cols="12" sm="8"
          md="5" lg="4"
      >
        <v-select
            filled
            hide-details
            color="azul"
            v-model="tipoAtual"
            :items="tipos"
            @change="changeSelect"

            label="Selecione a situação do simulado"
        />
      </v-col>
    </v-row>

    <!-- professor e coordenador -->
    <v-row>
      <v-col
          cols="12"
          class="mt-12"
      >
        <header-secao>
          Desempenho do {{ simuladoSelecionado }} por Aluno
        </header-secao>
      </v-col>

      <v-col cols="12">
        <v-text-field
            label="Pesquisar..."
            filled
            color="azul"
            append-icon="mdi-magnify"
            class="max-w-240 float-right"
            hide-details
            v-model="search"
        />

        <v-data-table
            :headers="headerInformacoes"
            :items="informacoes"
            fixed-header
            :search="search"
            class="clear-both"
        >
          <template v-slot:item.simulado="{ item }">
            <p
                class="font-weight-bold"
                :class="{ 'acertou--text':item.simulado === 'Entregue', 'errou--text':item.simulado === 'Não entregue' }"
            >
              {{ item.simulado }}
            </p>
          </template>

          <template v-slot:item.redacao="{ item }">
            <p
                class="font-weight-bold"
                :class="[ item.redacao === 'Entregue' ? 'acertou--text' : 'errou--text' ]"
            >
              {{ item.redacao }}
            </p>
          </template>

          <template v-slot:item.email="{ item }">
            <v-dialog
                persistent
                max-width="500px"
                v-model="alunos[item.id]"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    filled
                    color="azul"
                    v-text="item.email"
                    class=" white--text text-none"
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="$set(alunos, item.id, true)"
                    @click="reset(item)"
                />
              </template>

              <v-card class="transition-ease-in-out">
                <v-alert
                    v-show="envioEmail"
                    class="pl-6 azul white--text rounded-0"
                >
                  Email enviado com sucesso

                  <v-icon
                      color="white"
                      v-text="'mdi-email-check-outline'"
                      small
                      class="ml-2"
                  />

                  <v-icon
                      v-text="'mdi-close-circle-outline'"
                      color="white"
                      @click="$set(alunos, item.id, false)"
                      class="float-right"
                  />
                </v-alert>

                <v-alert
                    class="pl-6 errou white--text rounded-0"
                    v-show="envioEmailErro"
                >
                  O envio do email falhou...

                  <v-icon
                      color="white"
                      v-text="'mdi-email-remove-outline'"
                      small
                      class="ml-2"
                  />
                </v-alert>

                <v-alert
                    class="pl-6 errou white--text rounded-0"
                    v-show="camposBrancos"
                >
                  Preencha todos campos antes de enviar...

                  <v-icon
                      color="white"
                      v-text="'mdi-email-remove-outline'"
                      small
                      class="ml-2"
                  />
                </v-alert>

                <v-card-title class="mb-4">
                  Enviar email para {{ item.nome }}
                </v-card-title>

                <v-card-text>
                  <v-text-field
                      filled
                      color="azul"
                      label="Assunto"
                      hide-details
                      class="mb-2"
                      v-model="assuntoEmail"
                  />

                  <v-textarea
                      label="Mensagem..."
                      filled
                      color="azul"
                      auto-grow
                      v-model="mensagemEmail"
                  />
                </v-card-text>

                <v-card-actions class="px-6">
                  <v-spacer />

                  <v-btn
                      v-text="'cancelar'"
                      color="errou"
                      text
                      class="text-none"
                      @click.stop="$set(alunos, item.id, false)"
                  />

                  <v-btn
                      color="azul"
                      :loading="giroBtn"
                      :disabled="giroBtn"
                      v-text="'Enviar email'"
                      class="text-none white--text"
                      @click.stop="enviarEmail"
                  />
                </v-card-actions>
              </v-card>

            </v-dialog>
          </template>
        </v-data-table>

        <JsonExcel
name="Alunos.xls"
:data="informacoes"
id="json"
v-show="false"
:before-generate="startExcel"
:before-finish="finishExcel"
/>
        <JsonExcel
name="Alunos.xls"
:data="informacoesCRE"
id="jsonCre"
v-show="false"
:before-generate="startExcel"
:before-finish="finishExcel"
/>

        <JsonExcel
                name="Alunos.xls"
                :data="informacoesCoordenador"
                id="jsonCoorde"
                v-show="false"
                :before-generate="startExcel"
                :before-finish="finishExcel"
        />
        <v-btn
                @click="download"
                :disabled="excel"
                :loading="excel"
                filled
                color="azul"
                v-text="'Exportar dados dos alunos'"
                class="mt-2 white--text text-none"
        />
      </v-col>
    </v-row>

    <!-- só coordenador -->
    <v-row>
      <v-col
          cols="12"
          class="mt-12"
      >
        <header-secao>
          Desempenho do {{ simuladoSelecionado }} por Escola
        </header-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerCoordenador"
            :items="informacoesCoordenador"
            fixed-header
        />

        <v-btn
            filled
            color="azul"
            @click="downloadCoord"
            v-text="'Exportar dados das escolas'"
            class="mt-2 white--text text-none"
        />
      </v-col>
    </v-row>

    <!-- diretor das CRE -->
    <v-row v-show="privilegioCRE">
      <v-col
          cols="12"
          class="mt-12"
      >
        <header-secao>
          Desempenho por CRE
        </header-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerCRE"
            :items="informacoesCRE"
            fixed-header
        />

        <v-btn
            filled
            color="azul"
            @click="downloadCre"
            v-text="'Exportar dados das CREs'"
            class="mt-2 white--text text-none"
        />
      </v-col>
    </v-row>
    <loading :dialog="loading" />
  </v-container>
</template>

<script>
import JsonExcel from 'vue-json-excel';
import data from '../mixis/acompanhar_simulado/data';
import methods from '../mixis/acompanhar_simulado/methods';
import loading from '../components/loading/Loading.vue';

export default {
  name: 'AcompanharSimulados',
  components: { loading, JsonExcel },
  mixins: [data, methods],
  created () {
    this.iniciar();
  },
  mounted () {
    document.querySelectorAll('.v-data-footer__select').forEach((paginacao) => {
      // eslint-disable-next-line no-param-reassign
      paginacao.innerHTML = '';
    });
    document.querySelectorAll('.v-data-footer__pagination').forEach((itens) => {
      const elementos = itens.innerHTML.split(' ');
      // eslint-disable-next-line no-param-reassign
      itens.innerHTML = `${elementos[0]} de ${elementos[2]}`;
    });
  },
};
</script>

<style scoped>

</style>
