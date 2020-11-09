<template>
  <v-container fluid>
<!--    <MenuLateral />-->
<!--    <Toolbar />-->
    <v-row>
      <v-col cols="12">
        <h1>
          Desempenho Geral - Simulado 1
        </h1>
      </v-col>

<!--      <v-col cols="12">-->
<!--        <subheader-secao class="mb-4">-->
<!--          Filtrar desempenho por:-->
<!--        </subheader-secao>-->

<!--        <v-btn-->
<!--            class="mt-2 border-3 border__azul azul&#45;&#45;text font-weight-medium text-capitalize rounded__normal"-->
<!--        >-->
<!--          Turma-->
<!--        </v-btn>-->

<!--        <v-btn class="mt-2 ml-4 azul white&#45;&#45;text font-weight-medium text-capitalize btn__shadow rounded__normal">-->
<!--          Escola-->
<!--        </v-btn>-->
<!--      </v-col>-->

      <v-col
          cols="12" sm="8"
          md="5" lg="4"
          class="pt-0"
      >
        <v-select
            v-model="simuladoAtual"
            @change="changeTurma"
            :items="simulados.map((el => el.titulo))" filled
            label="Filtrar desempenho por simulado" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" class="pa-0"
      />

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            :items="escolas.map((el => el.titulo))" filled
            @change="changeEscola"
            v-model="escolaAtual"
            label="Filtrar desempenho por escola" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            @change="changeTurma"
            v-model="turmaAtual"
            :items="turmas.map((el => el.titulo))" filled
            label="Filtrar desempenho por turma" color="azul"
            hide-details
        />
      </v-col>

    </v-row>

    <PDFs />

    <v-row>
      <v-col
          cols="12" class="mt-8"
      >
        <header-secao>
          Desempenho - {{ simuladoAtual }}
        </header-secao>
      </v-col>

      <v-col cols="12">
        <subheader-secao>
          Desempenho Geral
        </subheader-secao>
      </v-col>

      <!-- desempenho geral da escola/turma comparada a do estado-->
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="desempenho in desempenhoGeral" :key="desempenho.ttl"
          class="pt-0"
      >
        <v-card>
          <v-card-text>
            <p class="font-weight-bold grey--text text--darken-3">
              {{ desempenho.ttl }}
            </p>

            <h5 class="text-h4 font-weight-bold grey--text text--darken-3">
              {{ desempenho.nota }}
            </h5>

            <div
                class="w-1/3 absolute bottom-0 right-4 azul rounded__normal__top"
                :style="{ height: `${desempenho.altura}%` }"
            >
              <p class="mt-1 text-center font-weight-medium white--text">
                {{ desempenho.altura.toFixed() }}%
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
          cols="12" class="pa-0"
      />
      <!-- desempenho do estado -->
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="desempenho in desempenhoGeralEstado" :key="desempenho.ttl"
      >
        <v-card>
          <v-card-text>
            <p class="font-weight-bold grey--text text--darken-3">
              {{ desempenho.ttl }}
            </p>

            <h5 class="text-h4 font-weight-light grey--text text--darken-3">
              {{ desempenho.nota }}
            </h5>

            <div
                class="w-1/3 absolute bottom-0 right-4 amarelo rounded__normal__top"
                :style="{ height: `${desempenho.altura}%` }"
            >
              <p class="mt-1 text-center font-weight-medium">
                {{ desempenho.altura.toFixed() }}%
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

<!--      <v-col-->
<!--          cols="12" class="mt-8"-->
<!--      >-->
<!--        <subheader-secao>-->
<!--          Médias Gerais da turma-->
<!--        </subheader-secao>-->
<!--      </v-col>-->

<!--      <v-col-->
<!--          cols="12"-->
<!--      >-->
<!--        <v-card>-->
<!--          <v-card-text class="py-0 d-flex h-240 align-end justify-space-between">-->
<!--            <div-->
<!--                class="w-1/6 relative rounded__normal__top"-->
<!--                :class="[ medias.selecionado ? 'azul' : 'grey']"-->
<!--                v-for="medias in mediasGerais" :key="medias.ttl"-->
<!--                :style="{ height: `${medias.altura * 2.4}%` }"-->
<!--            >-->

<!--              <p-->
<!--                  class="w-full absolute top&#45;&#45;6 text-center"-->
<!--                  :class="[ medias.selecionado ? 'font-weight-medium' : '' ]"-->
<!--              >-->
<!--                {{ medias.ttl }}-->
<!--              </p>-->

<!--              <p-->
<!--                  class="text-center font-weight-medium white&#45;&#45;text"-->
<!--                  :class="[ medias.selecionado ? 'mt-2 text-h5' : '' ]"-->
<!--              >-->
<!--                {{ medias.altura }}%-->
<!--              </p>-->
<!--            </div>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-col>-->

      <!-- médias -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho por Área
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="4"
          md="3"
          v-for="desempenho in desempenhoArea2" :key="desempenho.ttl"
          class="pt-0"
      >
        <v-card>
          <v-card-text>
            <p class="caption font-weight-bold grey--text text--darken-3">
              {{ desempenho.ttl }}
            </p>

            <h5
                class="body-1 font-weight-bold text--darken-3"
                :class="{
                          'errou--text': desempenho.nota < desempenho.notaEstado,
                          'acertou--text': desempenho.nota > desempenho.notaEstado
                }"
            >
              {{ desempenho.nota }}
              <span
                  class="body-2" v-if="desempenho.ttl != 'Redação'"
              >
                TRI
              </span>
              <span
                  class="body-2" v-else
              >
                média
              </span>
            </h5>

            <h5
                class="body-1 grey--text text--darken-3"
            >
              {{ desempenho.notaEstado }} <span class="body-2"> estado </span>
            </h5>

            <div
                class="w-40 h-1/2 absolute bottom-0 right-4 text-center azul rounded__normal__top"
            >
              <v-icon
                  v-text="'mdi-seal-variant'" color="white"
                  class="mt-2"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- desempenho por aluno -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho por Aluno
        </subheader-secao>
      </v-col>

      <v-col
          cols="12"
          class="pt-0"
      >
        <v-text-field
            label="Pesquisar..."
            filled
            append-icon="mdi-magnify"
            class="max-w-240 float-right"
            hide-details
            v-model="search"
        />

        <v-data-table
            :headers="headerRanking" :items="colocacoes"
            fixed-header
            :search="search"
            class="text-no-wrap clear-both"
        >
          <template v-slot:item.posicao="{ item }">
            <p class="font-weight-bold">
              <v-icon
                  v-text="item.icon" color="black"
                  small
              />
              {{ item.posicao }}
            </p>
          </template>

<!--          <template v-slot:item.gabarito>-->
<!--            <v-btn-->
<!--                small-->
<!--                id="ver__aluno"-->
<!--                class="azul white&#45;&#45;text rounded__normal text-capitalize mr-1"-->
<!--                color="primary"-->
<!--            >-->
<!--              ver aluno-->
<!--            </v-btn>-->
<!--          </template>-->
        </v-data-table>
      </v-col>

      <!-- ver gabarito do aluno -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
         Gabarito do aluno
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="5" lg="4"
          class="pt-0"
      >
        <v-autocomplete
            @change="changeSelectArea"
            :items="alunos.map((el => el.titulo))" filled
            id="aluno__gabarito"
            v-model="alunoGabarito"
            label="Selecionar aluno para ver gabarito" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          class="pt-0 relative"
      >
        <p
            id="mensagem__select__area"
            class="opacity-0 absolute top--4 left-4 errou--text transition transform-x--30"
        >
          Agora, escolha a área para ver o desempenho
        </p>

        <v-select
            @change="changeSelectArea"
            :items="areas.map((el => el.titulo))"
            id="select__area__gabarito"
            filled color="azul"
            v-model="areaAtual"
            label="Escolha qual área deseja ver"
            hide-details
        />
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headers" fixed-header
            :items="questoesGabarito"
        >
          <template v-slot:item.resultado="{ item }">
            <p
                class="font-weight-medium"
                :class="`${item.resultado}--text`"
            >
              {{ item.resultado }}
            </p>
          </template>

          <template v-slot:item.dificuldade="{ item }">
            <p>
              {{ item.dificuldade }}
            </p>
          </template>

          <!-- modal para ver a questão -->
          <template v-slot:item.url="{ item }">
            <v-dialog
                v-model="dialog[item.id]"
                max-width="90%"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    class="azul white--text rounded__normal text-capitalize mr-1"
                    color="primary"
                    v-bind="attrs" v-on="on"
                    :to="item.url"
                    @click.stop="$set(dialog, item.id, true)"
                >
                  ver questão
                </v-btn>
              </template>

              <!--              <Dialog :dialog="true" />-->

              <v-card class="relative w-full">
                <v-card-title>
                  <span class="headline">Questão {{ item.name }}</span>
                </v-card-title>

                <v-card-text>
                  <!-- anunciado da questão -->
                  <article
                      v-html="item.descricao"
                      class="img__questoes"
                  >
                    <!-- eslint-disable max-len -->
                  </article>

                  <h6
                      class="mt-4 body-1 acertou--text" v-if="item.marcada === item.gabarito"
                  >
                    Parabéns! Você arrasou na questão
                  </h6>

                  <h6
                      class="mt-4 body-1 errou--text" v-else
                  >
                    O mouse deve ter escorregado na hora de marcar...
                  </h6>

                  <br>
                  <!-- questões -->
                  <v-hover
                      v-for="(alternativa, questao) in item.alternativas" :key="questao"
                  >
                    <article
                        class="pb-2 pt-2 mt-2 d-flex align-center border__bottom"
                        :id="`alternativa${questao}`"
                        :class="{
                          'green lighten-3':item.gabarito === questao.toUpperCase(),
                          'red lighten-3': item.gabarito != questao.toUpperCase() && item.marcada === questao.toUpperCase()
                        }"
                    >
                      <!-- letra a,b etc.-->
                      <p
                          class="ml-1 mr-3 text-h6 leading__tight pointer__events__none"
                          :class="[ questao === 'b' || questao === 'd' ? '' : 'mb-1' ]"
                      >
                        {{ questao }}
                      </p>

                      <p
                          class="body-2 pointer__events__none"
                          v-html="alternativa"
                      />

                      <v-icon
                          v-if="item.gabarito === questao.toUpperCase()"
                          v-text="'mdi-checkbox-marked-circle-outline'" class="mr-2"
                      />

                      <v-icon
                          v-if="item.gabarito != questao.toUpperCase() && item.marcada === questao.toUpperCase()"
                          v-text="'mdi-close-circle-outline'" class="mr-2"
                      />
                    </article>
                  </v-hover>
                </v-card-text>

                <v-card-actions class="px-4">
                  <v-spacer />

                  <v-btn
                      color="green darken-1" text
                      @click="$set(dialog, item.id, false)"
                  >
                    Fechar
                  </v-btn>
                  <Dialog :item="item" />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>

      <!-- tabela com o desempenho por área do aluno -->
      <!--<v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho por Área
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerArea" :items="desempenhoArea"
            fixed-header hide-default-footer
        />
      </v-col>-->

      <!-- tabela com o desempenho por disciplina do aluno -->
      <!--<v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho por Disciplina
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerDisciplina" :items="desempenhoDisciplina"
            fixed-header hide-default-footer
        />
      </v-col>

      &lt;!&ndash; premios que a gente vai receber &ndash;&gt;
      <PremiosMensais class="mt-8" />-->
    </v-row>

    <!-- desempenho nas redações -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Desempenho nas Redações - {{ simuladoAtual }}
        </header-secao>
      </v-col>

      <v-col cols="12">
        <subheader-secao>
          Média das Redações
        </subheader-secao>
      </v-col>

      <v-col
          cols="6" sm="4"
          md="3" lg="2"
          class="pt-0"
      >
        <v-card>
          <v-card-title>
            <p class="d-block w-full text-h4 font-weight-bold text-center grey--text text--darken-3">
              {{ redacaoGeral }}
            </p>
          </v-card-title>
        </v-card>
      </v-col>

      <!-- por competencia -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Média por competência
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          lg="4"
          v-for="competencia in competencias" :key="competencia.competenciaNome"
          class="pt-0"
      >
        <v-card class="h-full">
          <v-card-text class="d-flex align-center justify-space-between">
            <article class="max-w-3/4">
              <p class="caption grey--text text--darken-3">
                {{ competencia.competenciaNome }}
              </p>

              <p class="body-2 grey--text text--darken-3">
                {{ competencia.descricao }}
              </p>
            </article>

            <v-progress-circular
                size="60" width="6"
                :value="competencia.notaCompetencia / 2" :color="competencia.desempenho"
                class="flex-shrink-0"
            >
              <p class="text-h6 text-center">
                {{ competencia.notaCompetencia }}
              </p>
            </v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- escolher qual desempenho quer ver-->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
         Média por assunto e Comparação de Media TRI - {{ simuladoAtual }}
        </header-secao>
      </v-col>

      <!-- secao dos desempenhos do simulado -->
      <!-- parte da média geral -->
      <!--<v-col cols="12">
        <subheader-secao class="grey&#45;&#45;text text&#45;&#45;darken-3">
          Média geral
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="5"
          md="4"
      >
        <v-card>
          <v-card-text class="d-flex align-center">
            <div class="bolinha__acertos absolute top-4 left-6" />
            <v-icon
                v-text="'mdi-checkbox-marked-circle-outline'" color="black"
            />

            <p class="ml-2 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              {{ simuladosEscolares.questoesCorretas }} questões corretas
            </p>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-text class="d-flex align-center">
            <div class="bolinha__erro absolute top-4 left-6" />
            <v-icon
                v-text="'mdi-close-circle-outline'" color="black"
            />

            <p class="ml-2 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              {{ simuladosEscolares.questoesErradas }} questões erradas
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
          cols="12" sm="4"
      >
        <p class="caption font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
          Média de acertos
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.questoesCorretas / simuladosEscolares.questoesTotais) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{ ((simuladosEscolares.questoesCorretas / simuladosEscolares.questoesTotais) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>
      </v-col>

      &lt;!&ndash; parte da média por disciplina e área &ndash;&gt;
      <v-col
          cols="12" class="mt-4"
      >
        <subheader-secao>
          Média por disciplina e área
        </subheader-secao>
      </v-col>

      &lt;!&ndash; area de linguagens &ndash;&gt;
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="disciplina in simuladosEscolares.disciplinas" :key="disciplina.disciplina + '0'"
          :class="disciplina.area === 'linguagens' ? '' : 'd-none'"
      >
        <v-card
            :class="`destaque__${disciplina.area}`" class="rounded__normal"
            v-if="disciplina.area === 'linguagens'"
        >
          <v-card-title>
            {{ disciplina.disciplina }}
          </v-card-title>

          &lt;!&ndash; porcentagem em cima à direita &ndash;&gt;
          <article class="w-46 absolute top-4 right-4">
            <p class="text-center body-2 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              {{ (disciplina.qCorretas / disciplina.qTotais * 100).toFixed(1) }}%
            </p>

            <v-progress-linear
                :value="disciplina.qCorretas / disciplina.qTotais * 100"
                color="desempenhoOtimo" rounded
            />
          </article>

          <v-card-text>
            <p class="d-flex relative font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              <span class="bolinha__acertos absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qCorretas }} questões corretas
            </p>

            <p class="mt-2 d-flex relative font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              <span class="bolinha__erro absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-close-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qErradas }} questões erradas
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      &lt;!&ndash; gráficos de acertos por disciplina de linguagens&ndash;&gt;
      <v-col
          cols="12" sm="6"
          lg="3"
      >
        <p class="caption font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
          Média da área de Linguagens
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoLinguagens[0] / simuladosEscolares.desempenhoLinguagens[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2 mr-4" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{
              ((simuladosEscolares.desempenhoLinguagens[0] / simuladosEscolares.desempenhoLinguagens[2]) * 100).toFixed(1)
            }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoLinguagens[0] / simuladosEscolares.desempenhoLinguagens[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{ simuladosEscolares.desempenhoLinguagens[0] }}/{{ simuladosEscolares.desempenhoLinguagens[2] }}
          </p>
        </v-progress-circular>
      </v-col>
      <v-col cols="12" />

      &lt;!&ndash; área de matemática &ndash;&gt;
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="disciplina in simuladosEscolares.disciplinas" :key="disciplina.disciplina + '1'"
          :class="disciplina.area === 'matematica' ? '' : 'd-none'"
      >
        <v-card
            :class="`destaque__${disciplina.area}`" class="rounded__normal"
            v-if="disciplina.area === 'matematica'"
        >
          <v-card-title>
            {{ disciplina.disciplina }}
          </v-card-title>

          &lt;!&ndash; porcentagem em cima à direita &ndash;&gt;
          <article class="w-46 absolute top-4 right-4">
            <p class="text-center body-2 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              {{ (disciplina.qCorretas / disciplina.qTotais * 100).toFixed(1) }}%
            </p>

            <v-progress-linear
                :value="disciplina.qCorretas / disciplina.qTotais * 100"
                color="desempenhoOtimo" rounded
            />
          </article>

          <v-card-text>
            <p class="d-flex relative font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              <span class="bolinha__acertos absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qCorretas }} questões corretas
            </p>

            <p class="mt-2 d-flex relative font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              <span class="bolinha__erro absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-close-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qErradas }} questões erradas
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      &lt;!&ndash; gráficos de acertos por disciplina de matemática&ndash;&gt;
      <v-col
          cols="12" sm="6"
          lg="3"
      >
        <p class="caption font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
          Média da área de Matemática
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoMatematica[0] / simuladosEscolares.desempenhoMatematica[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2 mr-4" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{
              ((simuladosEscolares.desempenhoMatematica[0] / simuladosEscolares.desempenhoMatematica[2]) * 100).toFixed(1)
            }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoMatematica[0] / simuladosEscolares.desempenhoMatematica[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{ simuladosEscolares.desempenhoMatematica[0] }}/{{ simuladosEscolares.desempenhoMatematica[2] }}
          </p>
        </v-progress-circular>
      </v-col>
      <v-col cols="12" />

      &lt;!&ndash; área de natureza &ndash;&gt;
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="disciplina in simuladosEscolares.disciplinas" :key="disciplina.disciplina + '2'"
          :class="disciplina.area === 'natureza' ? '' : 'd-none'"
      >
        <v-card
            :class="`destaque__${disciplina.area}`" class="rounded__normal"
            v-if="disciplina.area === 'natureza'"
        >
          <v-card-title>
            {{ disciplina.disciplina }}
          </v-card-title>

          &lt;!&ndash; porcentagem em cima à direita &ndash;&gt;
          <article class="w-46 absolute top-4 right-4">
            <p class="text-center body-2 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              {{ (disciplina.qCorretas / disciplina.qTotais * 100).toFixed(1) }}%
            </p>

            <v-progress-linear
                :value="disciplina.qCorretas / disciplina.qTotais * 100"
                color="desempenhoOtimo" rounded
            />
          </article>

          <v-card-text>
            <p class="d-flex relative font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              <span class="bolinha__acertos absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qCorretas }} questões corretas
            </p>

            <p class="mt-2 d-flex relative font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              <span class="bolinha__erro absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-close-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qErradas }} questões erradas
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      &lt;!&ndash; gráficos de acertos por disciplina de natureza &ndash;&gt;
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
      >
        <p class="caption font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
          Média da área de Natureza
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoNatureza[0] / simuladosEscolares.desempenhoNatureza[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2 mr-4" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{
              ((simuladosEscolares.desempenhoNatureza[0] / simuladosEscolares.desempenhoNatureza[2]) * 100).toFixed(1)
            }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoNatureza[0] / simuladosEscolares.desempenhoNatureza[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{ simuladosEscolares.desempenhoNatureza[0] }}/{{ simuladosEscolares.desempenhoNatureza[2] }}
          </p>
        </v-progress-circular>
      </v-col>
      <v-col cols="12" />

      &lt;!&ndash; área de humanas &ndash;&gt;
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="disciplina in simuladosEscolares.disciplinas" :key="disciplina.disciplina + '3'"
          :class="disciplina.area === 'humanas' ? '' : 'd-none'"
      >
        <v-card
            :class="`destaque__${disciplina.area}`" class="rounded__normal"
            v-if="disciplina.area === 'humanas'"
        >
          <v-card-title>
            {{ disciplina.disciplina }}
          </v-card-title>

          &lt;!&ndash; porcentagem em cima à direita &ndash;&gt;
          <article class="w-46 absolute top-4 right-4">
            <p class="text-center body-2 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              {{ (disciplina.qCorretas / disciplina.qTotais * 100).toFixed(1) }}%
            </p>

            <v-progress-linear
                :value="disciplina.qCorretas / disciplina.qTotais * 100"
                color="desempenhoOtimo" rounded
            />
          </article>

          <v-card-text>
            <p class="d-flex relative font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              <span class="bolinha__acertos absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qCorretas }} questões corretas
            </p>

            <p class="mt-2 d-flex relative font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
              <span class="bolinha__erro absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-close-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qErradas }} questões erradas
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      &lt;!&ndash; gráficos de acertos por disciplina de natureza &ndash;&gt;
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
      >
        <p class="caption font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
          Média da área de Humanas
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoHumanas[0] / simuladosEscolares.desempenhoHumanas[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2 mr-4" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{
              ((simuladosEscolares.desempenhoHumanas[0] / simuladosEscolares.desempenhoHumanas[2]) * 100).toFixed(1)
            }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoHumanas[0] / simuladosEscolares.desempenhoHumanas[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{ simuladosEscolares.desempenhoHumanas[0] }}/{{ simuladosEscolares.desempenhoHumanas[2] }}
          </p>
        </v-progress-circular>
      </v-col>-->

      <!-- media por assunto -->
      <v-col cols="12">
        <subheader-secao>
          Média por assunto
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          class="pt-0"
      >
        <!-- select da disciplina -->
        <v-select
            :items="disciplinas.map((el) => el.titulo)" filled
            @change="changeAssuntos"
            label="Escolha o componente curricular" color="azul"
            hide-details
        />
      </v-col>
      <v-col
          cols="12" class="pa-0"
      />

      <v-col
          cols="12" sm="6"
          md="4" v-for="assunto in assuntos"
          :key="assunto.id"
      >
        <!-- display dos assuntos -->
        <assunto
            :assunto="assunto.titulo" :acertos="assunto.totalFormat"
        />
      </v-col>

      <!-- desempenho por turma -->
      <v-col
          cols="12"
          class="mt-8"
      >
        <subheader-secao>
          Compare as médias TRI das escolas e turmas
        </subheader-secao>
      </v-col>

      <v-col
          cols="12"
          md="4" sm="8"
          class="pt-0"
      >
        <v-select
                filled
                v-model="escolaAtualGraf"
                @change="changeEscolaGraf"
                :items="escolas.map((el) => el.titulo)"
            label="Filtrar desempenho por escola" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" class="pa-0"
      />

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            filled
            :items="turmasGraf.map((el) => el.titulo)"
            v-model="turmaGraf1"
            @change="changeTurmaGraf"
            label="Comparar turmas" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            filled
            :items="turmasGraf.map((el) => el.titulo)"
            v-model="turmaGraf2"
            @change="changeTurmaGraf"
            label="Comparar turmas" color="azul"
            hide-details
        />
      </v-col>
    </v-row>

    <!-- historico de acesso -->
    <!--<v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Histórico de acessos
        </header-secao>
      </v-col>

      &lt;!&ndash; historico de acesso &ndash;&gt;
      <v-col
          cols="12" md="6"
      >
        <subheader-secao class="mb-4">
          Histórico de acesso
        </subheader-secao>

        <v-card class="mr-4 mb-4 d-inline-block">
          <v-card-text class="d-flex align-center justify-space-between grey&#45;&#45;text text&#45;&#45;darken-3">
            <article>
              <p class="font-weight-bold">
                Dia 1
              </p>

              <p>
                10.000 alunos
              </p>
            </article>

            <article class="ml-2 d-flex align-center justify-center flex-shrink-0 w-40 h-40 rounded-circle azul">
              <v-icon
                  v-text="'mdi-play-outline'" color="black"
              />
            </article>
          </v-card-text>
        </v-card>

        <v-card class="mr-4 mb-4 d-inline-block">
          <v-card-text class="d-flex align-center justify-space-between grey&#45;&#45;text text&#45;&#45;darken-3">
            <article>
              <p class="font-weight-bold">
                Dia 2
              </p>

              <p>
                9.800 alunos
              </p>
            </article>

            <article class="ml-2 d-flex align-center justify-center flex-shrink-0 w-40 h-40 rounded-circle azul">
              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" color="black"
              />
            </article>m
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>-->
    <Bar
        :chartdata="chartdata"
        @reniciar="reiniciar"
    />
    <loading :dialog="showLoading" />

    <v-row>
      <!-- desempenho por área -->
      <v-col
          cols="12"
          class="mt-8"
      >
        <subheader-secao>
          Compare as áreas do conhecimento das escolas e turmas
        </subheader-secao>
      </v-col>

      <v-col
          cols="12"
          md="4" sm="8"
          class="pt-0"
      >
        <v-select
            filled
            v-model="escolaAtualGraf"
            @change="changeEscolaGraf"
            :items="escolas.map((el) => el.titulo)"
            label="Filtrar desempenho por escola" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" class="pa-0"
      />

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            filled
            :items="turmasGraf.map((el) => el.titulo)"
            v-model="turmaGraf1"
            @change="changeTurmaGraf"
            label="Comparar turmas" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            filled
            :items="turmasGraf.map((el) => el.titulo)"
            v-model="turmaGraf2"
            @change="changeTurmaGraf"
            label="Comparar turmas" color="azul"
            hide-details
        />
      </v-col>
    </v-row>

    <Bar
        :chartdata="chartdata"
        @reniciar="reiniciar"
    />
    <loading :dialog="showLoading" />

    <TabsMobile />
  </v-container>
</template>

<script>
// import PremiosMensais from '../components-professores/PremiosMensais.vue';
// import MenuLateral from '../components/MenuLateral.vue';
// import Toolbar from '../components/Toolbar.vue';
import data from '../mixis/desempenho-geral-professor/data';
import methods from '../mixis/desempenho-geral-professor/method';
import loading from '../components/loading/Loading.vue';
import TabsMobile from '../components/TabsMobile.vue';
import Dialog from '../components/dialog/Dialog.vue';
import Bar from '../components/Graficos/GraficoBar.vue';
import PDFs from '../components/pdfs/PDFs.vue';

export default {
  name: 'DesempenhoGeral',
  mixins: [data, methods],
  components: {
    TabsMobile, loading, Dialog, Bar, PDFs,
  },
  // components: { PremiosMensais },

  created () {
    this.puxandoSimulEscol();
  },

  mounted () {
    document.querySelectorAll('.v-data-footer__select').forEach((elementos) => {
      // eslint-disable-next-line no-param-reassign
      elementos.innerHTML = '';
    });

    const alunoGabarito = document.getElementById('ver__aluno');
    const alunoGabaritoSelect = document.getElementById('aluno__gabarito');
    const mensagemSelectArea = document.getElementById('mensagem__select__area');
    const selectAreaGabarito = document.getElementById('select__area__gabarito');
    let alunoGabaritoNome;

    /* alunoGabarito.addEventListener('click', () => {
      alunoGabaritoNome = alunoGabarito.parentNode.parentNode.firstChild.innerText;

      alunoGabaritoSelect.parentNode.parentNode.click();
      alunoGabarito.scrollIntoView();

      setTimeout(() => {
        alunoGabaritoSelect.value = alunoGabaritoNome;
      }, 800);

      setTimeout(() => {
        mensagemSelectArea.classList.remove('opacity-0');
        mensagemSelectArea.classList.remove('transform-x--30');
        mensagemSelectArea.classList.add('transform-x-0');
      }, 1000);
    });

    selectAreaGabarito.parentNode.parentNode.addEventListener('click', () => {
      mensagemSelectArea.classList.remove('transform-x-0');
      mensagemSelectArea.classList.add('opacity-0');
      mensagemSelectArea.classList.add('transform-x--30');
    }); */
  },
};

</script>

<style scoped>

</style>
