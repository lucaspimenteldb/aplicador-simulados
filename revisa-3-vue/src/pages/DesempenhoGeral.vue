<template>
  <v-container fluid>
    <MenuLateral />
    <Toolbar />

    <v-row>
      <v-col cols="12">
        <h1>
          Desempenho Geral
        </h1>

        <h3>
          Seu desempenho está separado por tipo
        </h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <header-secao>
          Seu Desempenho e Rankings
        </header-secao>
      </v-col>

      <v-col
          cols="12"
      >
        <subheader-secao>
          Você quer ver o ver desempenho de qual simulado?
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
      >
        <v-select
            @change="changeSelect"
            :disabled="disabledSimulado"
            :items="simulados" filled
            label="Escolha o simulado para ver seu desempenho" color="azul"
            hide-details
        />
      </v-col>

      <!-- selecionar ranking -->
      <SelecionarRanking class="mt-8" />

      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Ranking Escolar
        </subheader-secao>
      </v-col>

      <v-col
          cols="6" sm="4"
          md="2"
          v-for="card in informacoesAdicionais" :key="card.ttl"
      >
        <!-- pontuacao e posicao no ranking selecionado -->
        <v-card
            class="d-flex align-center overflow-hidden"
        >
          <!-- icones dos card pequenos -->
          <div class="my-4 pa-3 d-flex justify-center align-center relative left--2 rounded-circle bg__verde__desempenho">
            <v-icon
                v-text="card.icon" color="black"
            />
          </div>

          <v-card-text class="py-0 px-1 mt-1">
            <p class="text-h5 leading__supertight font-weight-bold black--text">
              {{ card.info }}
            </p>

            <p
                :class="[ card.ttl === 'Pontuação' ? '' : 'd-none' ]" class="leading__tight grey--text text--darken-3"
            >
              {{ card.legenda }}
            </p>

            <p
                :class="[ card.ttl === 'Pontuação' ? 'ml-4 d-none' : 'ml-1' ]" class="leading__tight grey--text text--darken-3"
            >
              {{ card.legenda }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- tabela com o desempenho por área do aluno -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho por Área no Simulado 1
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerArea" :items="desempenhoArea"
            fixed-header hide-default-footer
        >
          <template v-slot:item.media ="{ item }">
            <p class="font-weight-bold">
              {{ item.media }}
            </p>
          </template>
        </v-data-table>
      </v-col>

      <!-- tabela com o desempenho por disciplina do aluno -->
      <!--<v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho por Disciplina no Simulado 1
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerDisciplina" :items="desempenhoDisciplina"
            fixed-header hide-default-footer
        >
          <template v-slot:item.media ="{ item }">
            <p class="font-weight-bold">
              {{ item.media }}
            </p>
          </template>
        </v-data-table>
      </v-col>-->

      <!-- tabela das questoes -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Gabarito do Simulado 1
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
      >
        <v-select
            :items="areas"
            filled color="azul"
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
                v-model="dialog[item.id]" width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    class="azul white--text rounded__normal text-capitalize"
                    color="primary"
                    v-bind="attrs" v-on="on"
                    :to="item.url"
                    @click.stop="$set(dialog, item.id, true)"
                >
                  ver questão
                </v-btn>
              </template>

              <v-card class="relative overflow-hidden">
                <v-icon
                    v-text="'mdi-close-circle-outline'" class="absolute top--8 right--8 pointer__events__none cursor__pointer z-1000"
                    color="errou" large
                />

                <v-card-title>
                  <span class="headline">Questão {{ item.name }}</span>
                </v-card-title>

                <v-card-text>
                  <!-- anunciado da questão -->
                  <article>
                    <!-- eslint-disable max-len -->
                    Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor.

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
                      v-for="(alternativa, questao) in alternativas" :key="questao"
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

                      <p class="body-2 pointer__events__none">
                        {{ alternativa }}
                      </p>

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
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- desempenho geral dos simulados -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Desempenho Geral dos Simulados
        </header-secao>
      </v-col>

      <!-- secao dos desempenhos do simulado -->
      <v-col cols="12">
        <subheader-secao>
          Desempenho nos Simulados Escolares
        </subheader-secao>
      </v-col>

      <!-- parte da média geral -->
      <v-col cols="12">
        <h4 class="grey--text text--darken-3">
          Média geral
        </h4>
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

            <p class="ml-2 font-weight-medium grey--text text--darken-3">
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

            <p class="ml-2 font-weight-medium grey--text text--darken-3">
              {{ simuladosEscolares.questoesErradas }} questões erradas
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
          cols="12" sm="4"
      >
        <p class="caption font-weight-medium grey--text text--darken-3">
          Média de acertos
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.questoesCorretas / simuladosEscolares.questoesTotais) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey--text text--darken-3">
            {{ ((simuladosEscolares.questoesCorretas / simuladosEscolares.questoesTotais) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>
      </v-col>

      <!-- parte da média por disciplina e área -->
      <!--<v-col
          cols="12" class="mt-4"
      >
        <h4>
          Média por disciplina e área
        </h4>
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
            {{ ((simuladosEscolares.desempenhoLinguagens[0] / simuladosEscolares.desempenhoLinguagens[2]) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoLinguagens[0] / simuladosEscolares.desempenhoLinguagens[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{ simuladosEscolares.desempenhoLinguagens[0] }}/{{ simuladosEscolares.desempenhoLinguagens[2]}}
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
            {{ ((simuladosEscolares.desempenhoMatematica[0] / simuladosEscolares.desempenhoMatematica[2]) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoMatematica[0] / simuladosEscolares.desempenhoMatematica[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{ simuladosEscolares.desempenhoMatematica[0] }}/{{ simuladosEscolares.desempenhoMatematica[2]}}
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
            {{ ((simuladosEscolares.desempenhoNatureza[0] / simuladosEscolares.desempenhoNatureza[2]) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoNatureza[0] / simuladosEscolares.desempenhoNatureza[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{ simuladosEscolares.desempenhoNatureza[0] }}/{{ simuladosEscolares.desempenhoNatureza[2]}}
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
            {{ ((simuladosEscolares.desempenhoHumanas[0] / simuladosEscolares.desempenhoHumanas[2]) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoHumanas[0] / simuladosEscolares.desempenhoHumanas[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey&#45;&#45;text text&#45;&#45;darken-3">
            {{ simuladosEscolares.desempenhoHumanas[0] }}/{{ simuladosEscolares.desempenhoHumanas[2]}}
          </p>
        </v-progress-circular>
      </v-col>-->

      <!-- media por assunto -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Média por assunto
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
      >
        <!-- select da disciplina -->
        <v-select
            :items="disciplinas" filled
            label="Escolha a disciplina" color="azul"
            hide-details
        />
      </v-col>
      <v-col
          cols="12" class="pa-0"
      />

      <v-col
          cols="12" sm="6"
          md="4" v-for="assunto in 6"
          :key="assunto"
      >
        <!-- display dos assuntos -->
        <assunto
            :assunto="`Assunto ${assunto}`" acertos="2/10"
        />
      </v-col>
    </v-row>

    <!-- desempenho nas redações -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Desempenho nas Redações
        </header-secao>
      </v-col>

      <v-col cols="12">
        <subheader-secao>
          Média de notas das suas redações
        </subheader-secao>
      </v-col>
      <v-col
          cols="6" sm="3"
          md="2"
      >
        <v-card>
          <v-card-title>
            <p class="d-block w-full text-h4 font-weight-bold text-center grey--text text--darken-3">
              820
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

    <!-- historico de acesso -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Histórico de acessos
        </header-secao>
      </v-col>

      <!-- historico de acesso -->
      <v-col
          cols="12" md="6"
      >
        <subheader-secao class="mb-4">
          Histórico de acesso
        </subheader-secao>

        <v-card class="mr-4 mb-4 d-inline-block">
          <v-card-text class="d-flex align-center justify-space-between grey--text text--darken-3">
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
          <v-card-text class="d-flex align-center justify-space-between grey--text text--darken-3">
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
            </article>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <TabsMobile />
  </v-container>
</template>

<script>
import SelecionarRanking from '../components/SelecionarRanking.vue';
import MenuLateral from '../components/MenuLateral.vue';
import Toolbar from '../components/Toolbar.vue';
import TabsMobile from '../components/TabsMobile.vue';
import desempenho from '../services/desempenho/desempenho-service';

export default {
  name: 'DesempenhoGeral',

  components: {
    SelecionarRanking, MenuLateral, Toolbar, TabsMobile,
  },

  async created () {
    const dados = await desempenho.desempenhoAluno('desempenho/desempenho-aluno');
    console.log(dados);
  },

  methods: {
    extrairTitulo (objeto) {
      if (objeto.length > 0) {
        return objeto.map((el) => el.titulo);
      }

      return objeto;
    },

    pesquisarSimulado (simulado) {
      const filtrado = this.simuladosPesquisa.filter((el) => el.titulo === simulado);
      return filtrado;
    },

    changeSelect (event) {
      const filtrado = this.pesquisarSimulado(event);
      if (filtrado.length > 0) {
        this.disabledSimulado = true;
      }
    },
  },
  data () {
    return {
      play: 'mdi-play',

      dialog: {},
      alternativas: {
        a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        b: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        e: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
      },

      questoesGabarito: [
        {
          name: '1',
          disciplina: 'português',
          marcada: 'A',
          gabarito: 'A',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          dificuldade: 'fácil',
          mediaEscolar: '80% acerto',
          id: 0,
        },
        {
          name: '2',
          disciplina: 'português',
          marcada: 'B',
          gabarito: 'B',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          dificuldade: 'fácil',
          mediaEscolar: '80% acerto',
          id: 1,
        },
        {
          name: '3',
          disciplina: 'português',
          marcada: 'B',
          gabarito: 'B',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          dificuldade: 'fácil',
          mediaEscolar: '80% acerto',
          id: 2,
        },
        {
          name: '4',
          disciplina: 'português',
          marcada: 'D',
          gabarito: 'E',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          dificuldade: 'fácil',
          mediaEscolar: '80% acerto',
          id: 3,
        },
        {
          name: '5',
          disciplina: 'português',
          marcada: 'D',
          gabarito: 'D',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          dificuldade: 'fácil',
          mediaEscolar: '80% acerto',
          id: 4,
        },
        {
          name: '6',
          disciplina: 'português',
          marcada: 'C',
          gabarito: 'B',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          dificuldade: 'fácil',
          mediaEscolar: '80% acerto',
          id: 5,
        },
      ],
      headers: [
        {
          text: 'Questão',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Disciplina',
          value: 'disciplina',
          class: 'font-weight-bold',
        },
        {
          text: 'Marcada',
          value: 'marcada',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Gabarito',
          value: 'gabarito',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Resultado',
          value: 'resultado',
          class: 'font-weight-bold',
        },
        {
          text: 'Dificuldade',
          value: 'dificuldade',
          class: 'font-weight-bold',
        },
        {
          text: 'Média Escolar',
          value: 'mediaEscolar',
          class: 'font-weight-bold',
        },
        {
          text: '',
          value: 'url',
          sortable: false,
          class: 'font-weight-bold',
        },
      ],

      headerQuestao: [
        {
          text: 'Questão',
          align: 'start',
          sortable: false,
          value: 'questao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Disciplina',
          sortable: false,
          value: 'disciplina',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Gabarito',
          sortable: false,
          value: 'gabarito',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Questão Marcada',
          sortable: false,
          value: 'questaoMarcada',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Média Escolar',
          sortable: false,
          value: 'media',
          class: 'body-2 font-weight-bold',
        },
        {
          text: '',
          sortable: false,
          value: 'verQuestao',
        },
      ],

      desempenhoArea: [
        {
          media: 'Meu desempenho',
          redacao: 880,
          humanas: 950,
          natureza: 800,
          matematica: 800,
          linguagens: 900,
        },
        {
          media: 'Média Estadual',
          redacao: 880,
          humanas: 950,
          natureza: 800,
          matematica: 800,
          linguagens: 900,
        },
        {
          media: 'Ranking Estadual',
          redacao: '12º colocado',
          humanas: '14º colocado',
          natureza: '14º colocado',
          matematica: '14º colocado',
          linguagens: '14º colocado',
        },
        {
          media: 'Ranking Escolar',
          redacao: '12º colocado',
          humanas: '14º colocado',
          natureza: '14º colocado',
          matematica: '14º colocado',
          linguagens: '14º colocado',
        },
        {
          media: 'Ranking na Turma',
          redacao: '12º colocado',
          humanas: '14º colocado',
          natureza: '14º colocado',
          matematica: '14º colocado',
          linguagens: '14º colocado',
        },
      ],
      desempenhoDisciplina: [
        {
          media: 'Meu desempenho',
          geografia: 880,
          historia: 950,
          filosofia: 800,
          sociologia: 800,
          biologia: 900,
          fisica: 900,
          quimica: 900,
          portugues: 900,
          ingles: 900,
          artes: 900,
          edFisica: 900,
        },
        {
          media: 'Média Estadual',
          geografia: 880,
          historia: 950,
          filosofia: 800,
          sociologia: 800,
          biologia: 900,
          fisica: 900,
          quimica: 900,
          portugues: 900,
          ingles: 900,
          artes: 900,
          edFisica: 900,
        },
        {
          media: 'Ranking Estadual',
          geografia: '12º posição',
          historia: '14º colocado',
          filosofia: '14º colocado',
          sociologia: '14º colocado',
          biologia: '14º colocado',
          fisica: '14º colocado',
          quimica: '14º colocado',
          portugues: '14º colocado',
          ingles: '14º colocado',
          artes: '14º colocado',
          edFisica: '14º colocado',
        },
        {
          media: 'Ranking Escolar',
          geografia: '12º posição',
          historia: '14º colocado',
          filosofia: '14º colocado',
          sociologia: '14º colocado',
          biologia: '14º colocado',
          fisica: '14º colocado',
          quimica: '14º colocado',
          portugues: '14º colocado',
          ingles: '14º colocado',
          artes: '14º colocado',
          edFisica: '14º colocado',
        },
        {
          media: 'Ranking na Turma',
          geografia: '12º posição',
          historia: '14º colocado',
          filosofia: '14º colocado',
          sociologia: '14º colocado',
          biologia: '14º colocado',
          fisica: '14º colocado',
          quimica: '14º colocado',
          portugues: '14º colocado',
          ingles: '14º colocado',
          artes: '14º colocado',
          edFisica: '14º colocado',
        },
      ],
      headerArea: [
        {
          text: 'Média',
          align: 'start',
          sortable: false,
          value: 'media',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ciências Humanas',
          align: 'start',
          sortable: false,
          value: 'humanas',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ciências da Natureza',
          sortable: false,
          value: 'natureza',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Liguagens e seus Códigos',
          sortable: false,
          value: 'linguagens',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Matemática',
          sortable: false,
          value: 'matematica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          sortable: false,
          value: 'redacao',
          class: 'body-2 font-weight-bold',
        },
      ],
      headerDisciplina: [
        {
          text: 'Média',
          align: 'start',
          sortable: false,
          value: 'media',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Geografia',
          align: 'start',
          sortable: false,
          value: 'geografia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'História',
          sortable: false,
          value: 'historia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Filosofia',
          sortable: false,
          value: 'filosofia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Sociologia',
          sortable: false,
          value: 'sociologia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Biologia',
          sortable: false,
          value: 'biologia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Física',
          sortable: false,
          value: 'fisica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Química',
          sortable: false,
          value: 'quimica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Português',
          sortable: false,
          value: 'portugues',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Inglês',
          sortable: false,
          value: 'ingles',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Artes',
          sortable: false,
          value: 'artes',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ed. Física',
          sortable: false,
          value: 'edFisica',
          class: 'body-2 font-weight-bold',
        },
      ],

      simulados: ['Sem dados'],
      simuladosPesquisa: [],
      disabledSimulado: false,
      disciplinas: ['Português', 'Espanhol', 'Inlgês', 'Literatura', 'Artes', 'Ed. Física', 'Matemática', 'Química', 'Física', 'Biologia', 'História', 'Geografia', 'Filosofia', 'Sociologia'],
      areas: ['Ciências Humanas e suas tecnologias', 'Ciências da Natureza e suas tecnologias', 'Linguagens, códigos e suas tecnologias', 'Matemática e suas tecnologias'],
      desempenhoEscolhido: null,
      informacoesAdicionais: [
        {
          ttl: 'Pontuação',
          icon: 'mdi-podium',
          info: '740',
          legenda: 'Média Geral',
        },
        {
          ttl: 'Ranking Escolar',
          icon: 'mdi-trophy-variant-outline',
          info: '10º',
          posicaoAnterior: '14º',
          legenda: 'Colocado',
        },
      ],

      desempenhos: [
        {
          tipo: 'Simulados Escolares',
          descricao: 'Ver o meu desempenho das suas disciplinas e áreas nos simulados escolares',
          classe: 'destaque__simulados__desempenho',
        },
        {
          tipo: 'Redações',
          descricao: 'Ver a evolução do meu desempenho nas redações corrigidas',
          classe: 'destaque__redacao__desempenho',
        },
      ],

      simuladosEscolares: {
        questoesCorretas: 200,
        questoesErradas: 80,
        questoesTotais: 280,
        get desempenhoLinguagens () {
          let linguagensCorretas = 0;
          let linguagensErradas = 0;
          let linguagensTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'linguagens') {
              linguagensCorretas += disciplina.qCorretas;
              linguagensErradas += disciplina.qErradas;
              linguagensTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [linguagensCorretas, linguagensErradas, linguagensTotais];
        },
        get desempenhoMatematica () {
          let matematicaCorretas = 0;
          let matematicaErradas = 0;
          let matematicaTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'matematica') {
              matematicaCorretas += disciplina.qCorretas;
              matematicaErradas += disciplina.qErradas;
              matematicaTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [matematicaCorretas, matematicaErradas, matematicaTotais];
        },
        get desempenhoNatureza () {
          let naturezaCorretas = 0;
          let naturezaErradas = 0;
          let naturezaTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'natureza') {
              naturezaCorretas += disciplina.qCorretas;
              naturezaErradas += disciplina.qErradas;
              naturezaTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [naturezaCorretas, naturezaErradas, naturezaTotais];
        },
        get desempenhoHumanas () {
          let humanasCorretas = 0;
          let humanasErradas = 0;
          let humanasTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'humanas') {
              humanasCorretas += disciplina.qCorretas;
              humanasErradas += disciplina.qErradas;
              humanasTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [humanasCorretas, humanasErradas, humanasTotais];
        },

        disciplinas: [
          {
            disciplina: 'Português',
            qCorretas: 160,
            qErradas: 120,
            qTotais: 280,
            area: 'linguagens',
          },
          {
            disciplina: 'Espanhol',
            qCorretas: 180,
            qErradas: 100,
            qTotais: 280,
            area: 'linguagens',
          },
          {
            disciplina: 'Inglês',
            qCorretas: 240,
            qErradas: 40,
            qTotais: 280,
            area: 'linguagens',
          },
          {
            disciplina: 'Matemática',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'matematica',
          },
          {
            disciplina: 'Biologia',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'natureza',
          },
          {
            disciplina: 'Física',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'natureza',
          },
          {
            disciplina: 'História',
            qCorretas: 100,
            qErradas: 60,
            qTotais: 160,
            area: 'humanas',
          },
          {
            disciplina: 'Geografia',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'humanas',
          },
        ],
      },

      competencias: [
        {
          competenciaNome: 'Competência 1',
          descricao: 'Domínio de escrito da língua portuguesa.',
          notaCompetencia: 200,
          desempenho: 'desempenhoExcelente',
        },
        {
          competenciaNome: 'Competência 2',
          descricao: 'Compreender o tema e não fugir do que é proposto.',
          notaCompetencia: 120,
          desempenho: 'desempenhoBom',
        },
        {
          competenciaNome: 'Competência 3',
          descricao: 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.',
          notaCompetencia: 80,
          desempenho: 'desempenhoRuim',
        },
        {
          competenciaNome: 'Competência 4',
          descricao: 'Conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.',
          notaCompetencia: 40,
          desempenho: 'desempenhoMuitoRuim',
        },
        {
          competenciaNome: 'Competência 5',
          descricao: 'Respeito aos direitos humanos.',
          notaCompetencia: 160,
          desempenho: 'desempenhoOtimo',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
