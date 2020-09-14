<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          Desempenho Geral - Simulado 1
        </h1>
      </v-col>

      <v-col cols="12">
        <subheader-secao class="mb-4">
          Filtrar desempenho por:
        </subheader-secao>

        <v-btn
            class="mt-2 border-3 border__azul azul--text font-weight-medium text-capitalize rounded__normal"
        >
          Estado
        </v-btn>

        <v-btn
            class="mt-2 ml-4 border-3 border__azul azul--text font-weight-medium text-capitalize rounded__normal"
        >
          GRE
        </v-btn>

        <v-btn class="mt-2 ml-4 azul white--text font-weight-medium text-capitalize btn__shadow rounded__normal">
          Escola
        </v-btn>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            :items="escola" filled
            label="Filtrar desempenho por escola" color="azul"
            hide-details
        />
      </v-col>
      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            :items="turma" filled
            label="Filtrar desempenho por turma" color="azul"
            hide-details
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Desempenho e Rankings
        </header-secao>
      </v-col>

      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho Geral
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="desempenho in desempenhoGeral" :key="desempenho.ttl"
      >
        <v-card>
          <v-card-text>
            <p class="font-weight-bold grey--text text--darken-3">
              {{ desempenho.ttl }}
            </p>

            <h5 class="text-h4 font-weight-bold grey--text text--darken-3">
              {{  desempenho.nota }}
            </h5>

            <div
                class="w-1/3 absolute bottom-0 right-4 azul rounded__normal__top"
                :style="{ height: `${desempenho.altura}%` }"
            >
              <p class="mt-4 text-center font-weight-medium white--text">
                {{ desempenho.altura.toFixed() }}%
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Médias Gerais das Escolas
        </subheader-secao>
      </v-col>

      <v-col
          cols="12"
      >
        <v-card>
          <v-card-text class="py-0 d-flex h-240 align-end justify-space-between">
            <div
                class="w-1/6 relative rounded__normal__top"
                :class="[ medias.selecionado ? 'azul' : 'grey']"
                v-for="medias in mediasGerais" :key="medias.ttl"
                :style="{ height: `${medias.altura * 2.4}%` }"
            >

              <p
                  class="w-full absolute top--6 text-center"
                  :class="[ medias.selecionado ? 'font-weight-medium' : '' ]"
              >
                {{ medias.ttl }}
              </p>

              <p
                  class="text-center font-weight-medium white--text"
                  :class="[ medias.selecionado ? 'mt-2 text-h5' : '' ]"
              >
                {{ medias.altura }}%
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- médias -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Ranking por Área
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="4"
          md="3"
          v-for="desempenho in desempenhoArea2" :key="desempenho.ttl"
      >
        <v-card>
          <v-card-text>
            <p class="font-weight-bold grey--text text--darken-3">
              {{ desempenho.ttl }}
            </p>

            <h5 class="text-h6 font-weight-bold grey--text text--darken-3">
              {{  desempenho.ranking }}º <span class="body-2">colocado</span>
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

      <!-- tabela com o desempenho por área do aluno -->
      <v-col
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
      </v-col>
      <!-- tabela com o desempenho por disciplina do aluno -->
      <v-col
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

      <!-- premios que a gente vai receber -->
      <PremiosMensais class="mt-8" />
    </v-row>

    <!-- escolher qual desempenho quer ver-->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Desempenho nas atividades
        </header-secao>
      </v-col>

      <v-col cols="12">
        <subheader-secao>
          Escolha qual desempenho ver
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          v-for="desempenho in desempenhos" :key="desempenho.tipo"
      >
        <v-card
            class="h-full btn__shadow transition cursor__pointer" :class="desempenho.classe"
        >
          <v-card-text>
            <p class="text-h6 font-weight-medium grey--text text--darken-3">
              {{ desempenho.tipo}}
            </p>

            <p class="grey--text text--darken-3">
              {{ desempenho.descricao }}
            </p>

            <p class="mt-4 font-weight-bold grey--text text--darken-3">
              Ver {{ desempenho.tipo }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- secao dos desempenhos do simulado -->
      <v-col
          cols="12" class="mt-8"
      >
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
      <v-col
          cols="12" class="mt-4"
      >
        <h4>
          Média por disciplina e área
        </h4>
      </v-col>

      <!-- area de linguagens -->
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

          <!-- porcentagem em cima à direita -->
          <article class="w-46 absolute top-4 right-4">
            <p class="text-center body-2 font-weight-medium grey--text text--darken-3">
              {{ (disciplina.qCorretas / disciplina.qTotais * 100).toFixed(1) }}%
            </p>

            <v-progress-linear
                :value="disciplina.qCorretas / disciplina.qTotais * 100"
                color="desempenhoOtimo" rounded
            />
          </article>

          <v-card-text>
            <p class="d-flex relative font-weight-medium grey--text text--darken-3">
            <span class="bolinha__acertos absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qCorretas }} questões corretas
            </p>

            <p class="mt-2 d-flex relative font-weight-medium grey--text text--darken-3">
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
      <!-- gráficos de acertos por disciplina de linguagens-->
      <v-col
          cols="12" sm="6"
          lg="3"
      >
        <p class="caption font-weight-medium grey--text text--darken-3">
          Média da área de Linguagens
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoLinguagens[0] / simuladosEscolares.desempenhoLinguagens[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2 mr-4" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey--text text--darken-3">
            {{ ((simuladosEscolares.desempenhoLinguagens[0] / simuladosEscolares.desempenhoLinguagens[2]) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoLinguagens[0] / simuladosEscolares.desempenhoLinguagens[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey--text text--darken-3">
            {{ simuladosEscolares.desempenhoLinguagens[0] }}/{{ simuladosEscolares.desempenhoLinguagens[2]}}
          </p>
        </v-progress-circular>
      </v-col>
      <v-col cols="12" />

      <!-- área de matemática -->
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

          <!-- porcentagem em cima à direita -->
          <article class="w-46 absolute top-4 right-4">
            <p class="text-center body-2 font-weight-medium grey--text text--darken-3">
              {{ (disciplina.qCorretas / disciplina.qTotais * 100).toFixed(1) }}%
            </p>

            <v-progress-linear
                :value="disciplina.qCorretas / disciplina.qTotais * 100"
                color="desempenhoOtimo" rounded
            />
          </article>

          <v-card-text>
            <p class="d-flex relative font-weight-medium grey--text text--darken-3">
              <span class="bolinha__acertos absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qCorretas }} questões corretas
            </p>

            <p class="mt-2 d-flex relative font-weight-medium grey--text text--darken-3">
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
      <!-- gráficos de acertos por disciplina de matemática-->
      <v-col
          cols="12" sm="6"
          lg="3"
      >
        <p class="caption font-weight-medium grey--text text--darken-3">
          Média da área de Matemática
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoMatematica[0] / simuladosEscolares.desempenhoMatematica[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2 mr-4" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey--text text--darken-3">
            {{ ((simuladosEscolares.desempenhoMatematica[0] / simuladosEscolares.desempenhoMatematica[2]) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoMatematica[0] / simuladosEscolares.desempenhoMatematica[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey--text text--darken-3">
            {{ simuladosEscolares.desempenhoMatematica[0] }}/{{ simuladosEscolares.desempenhoMatematica[2]}}
          </p>
        </v-progress-circular>
      </v-col>
      <v-col cols="12" />

      <!-- área de natureza -->
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

          <!-- porcentagem em cima à direita -->
          <article class="w-46 absolute top-4 right-4">
            <p class="text-center body-2 font-weight-medium grey--text text--darken-3">
              {{ (disciplina.qCorretas / disciplina.qTotais * 100).toFixed(1) }}%
            </p>

            <v-progress-linear
                :value="disciplina.qCorretas / disciplina.qTotais * 100"
                color="desempenhoOtimo" rounded
            />
          </article>

          <v-card-text>
            <p class="d-flex relative font-weight-medium grey--text text--darken-3">
              <span class="bolinha__acertos absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qCorretas }} questões corretas
            </p>

            <p class="mt-2 d-flex relative font-weight-medium grey--text text--darken-3">
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
      <!-- gráficos de acertos por disciplina de natureza -->
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
      >
        <p class="caption font-weight-medium grey--text text--darken-3">
          Média da área de Natureza
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoNatureza[0] / simuladosEscolares.desempenhoNatureza[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2 mr-4" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey--text text--darken-3">
            {{ ((simuladosEscolares.desempenhoNatureza[0] / simuladosEscolares.desempenhoNatureza[2]) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoNatureza[0] / simuladosEscolares.desempenhoNatureza[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey--text text--darken-3">
            {{ simuladosEscolares.desempenhoNatureza[0] }}/{{ simuladosEscolares.desempenhoNatureza[2]}}
          </p>
        </v-progress-circular>
      </v-col>
      <v-col cols="12" />

      <!-- área de humanas -->
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

          <!-- porcentagem em cima à direita -->
          <article class="w-46 absolute top-4 right-4">
            <p class="text-center body-2 font-weight-medium grey--text text--darken-3">
              {{ (disciplina.qCorretas / disciplina.qTotais * 100).toFixed(1) }}%
            </p>

            <v-progress-linear
                :value="disciplina.qCorretas / disciplina.qTotais * 100"
                color="desempenhoOtimo" rounded
            />
          </article>

          <v-card-text>
            <p class="d-flex relative font-weight-medium grey--text text--darken-3">
              <span class="bolinha__acertos absolute top-0 left-2" />

              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                  class="mr-2"
              />

              {{ disciplina.qCorretas }} questões corretas
            </p>

            <p class="mt-2 d-flex relative font-weight-medium grey--text text--darken-3">
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
      <!-- gráficos de acertos por disciplina de natureza -->
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
      >
        <p class="caption font-weight-medium grey--text text--darken-3">
          Média da área de Humanas
        </p>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoHumanas[0] / simuladosEscolares.desempenhoHumanas[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2 mr-4" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey--text text--darken-3">
            {{ ((simuladosEscolares.desempenhoHumanas[0] / simuladosEscolares.desempenhoHumanas[2]) * 100).toFixed(1) }}%
          </p>
        </v-progress-circular>

        <v-progress-circular
            :size="100" :width="6"
            :value="(simuladosEscolares.desempenhoHumanas[0] / simuladosEscolares.desempenhoHumanas[2]) * 100"
            color="desempenhoOtimo"
            class="mt-2" rotate="-90"
        >
          <p class="ml-1 font-weight-medium grey--text text--darken-3">
            {{ simuladosEscolares.desempenhoHumanas[0] }}/{{ simuladosEscolares.desempenhoHumanas[2]}}
          </p>
        </v-progress-circular>
      </v-col>

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
  </v-container>
</template>

<script>
import PremiosMensais from '../components-professores/PremiosMensais.vue';

export default {
  name: 'DesempenhoGeral',
  components: { PremiosMensais },

  data () {
    return {
      play: 'mdi-play',

      escola: ['Todas', 'Escola de Tal Canto', 'Escola Xzinho', 'Escolinha do Bairro'],
      turma: ['Todas', '3 ano - A', '3 ano - B', '3 ano - C', '3 ano - D'],

      mediasGerais: [
        {
          ttl: 'nota < 400',
          altura: 5,
          selecionado: false,
        },
        {
          ttl: '399 < nota < 600',
          altura: 30,
          selecionado: false,
        },
        {
          ttl: '599 < nota < 700',
          altura: 35,
          selecionado: false,
        },
        {
          ttl: '699 < nota < 800',
          altura: 20,
          selecionado: true,
        },
        {
          ttl: '799 < nota',
          altura: 10,
          selecionado: false,
        },

      ],

      desempenhoGeral: [
        {
          ttl: 'Média TRI',
          nota: 750,
          get altura () {
            return this.nota / 10;
          },
        },
        {
          ttl: 'Redação 1',
          nota: 920,
          get altura () {
            return this.nota / 10;
          },
        },
        {
          ttl: 'Acertos totais',
          nota: 110,
          get altura () {
            return (this.nota / 180) * 100;
          },
        },
      ],
      desempenhoArea2: [
        {
          ttl: 'Linguagens',
          ranking: 750,
        },
        {
          ttl: 'Humanas',
          ranking: 920,
        },
        {
          ttl: 'Matemática',
          ranking: 110,
        },
        {
          ttl: 'Natureza',
          ranking: 110,
        },
        {
          ttl: 'Redação',
          ranking: 110,
        },
      ],
      desempenhoArea: [
        {
          redacao: 880,
          humanas: '950 - 42 acertos',
          natureza: '800 - 30 acertos',
          matematica: '730 - 30 acertos',
          linguagens: '506 - 30 acertos',
        },
      ],
      desempenhoDisciplina: [
        {
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
      ],

      headerArea: [
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

      disciplinas: ['Português', 'Espanhol', 'Inlgês', 'Literatura', 'Artes', 'Ed. Física', 'Matemática', 'Química', 'Física', 'Biologia', 'História', 'Geografia', 'Filosofia', 'Sociologia'],
      desempenhoEscolhido: null,
      informacoesAdicionais: [
        {
          ttl: 'Pontuação',
          icon: 'mdi-podium',
          info: '+740',
          legenda: 'pontos',
        },
        {
          ttl: 'Ranking Escolar',
          icon: 'mdi-trophy-variant-outline',
          info: '10º',
          posicaoAnterior: '14º',
          legenda: 'posição',
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
