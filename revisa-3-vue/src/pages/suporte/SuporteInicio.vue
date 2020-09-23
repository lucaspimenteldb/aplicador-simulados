<template>
  <v-container>
    <MenuLateral />
    <Toolbar />
    <v-row>
      <v-col cols="12">
        <h1>
          Suporte
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <header-secao>
          Caixa de mensagens
        </header-secao>
      </v-col>
    </v-row>

    <!-- mensagens -->
    <v-col
        cols="12" class="px-0 py-2"
        v-for="(mensagem, i) in mensagens" :key="i"
    >
      <v-card class="pa-2 py-4 d-flex align-center transition rounded__normal cursor__pointer btn__shadow ">
        <!-- botoes de acao da mensagem-->
        <section>
          <button class="" />

          <v-icon v-text="'mdi-label-variant-outline'" />
        </section>

        <p class="ml-4 body-2">
          {{ mensagem.remetente }}
        </p>

        <p class="ml-auto body-2 font-weight-medium">
          {{ mensagem.assunto }}
        </p>

        <!-- data de recebimento e ler mais -->
        <section class="ml-auto d-flex">
          <p class="mt-1px mr-4 d-flex align-center caption">
            <v-icon
                v-text="'mdi-calendar-outline'" small
                class="mr-1 mb-1px"
            />

            {{ mensagem.dataRecebimento }}
          </p>

          <p class="d-flex align-center">
            ler...

            <v-icon
                v-text="'mdi-location-enter'" class="ml-2"
            />
          </p>
        </section>
      </v-card>
    </v-col>

    <TabsMobile />
  </v-container>
</template>

<script>
import MenuLateral from '../../components/MenuLateral.vue';
import Toolbar from '../../components/Toolbar.vue';
import TabsMobile from '../../components/TabsMobile.vue';

export default {
  name: 'SuporteInicio',
  components: {
    TabsMobile,
    MenuLateral,
    Toolbar,
  },

  data () {
    return {
      mensagens: [
        {
          importante: false,
          remetente: 'Lucas (Gestor)',
          assunto: 'Vamos ter uma prova para você amanhã...',
          dataRecebimento: '24 de ago',
        },
        {
          importante: true,
          remetente: 'Mano (Professor)',
          assunto: 'Vamos ter uma prova para você amanhã...',
          dataRecebimento: '8 de ago',
        },
        {
          importante: true,
          remetente: 'Aluizianha (Professora)',
          assunto: 'Eu queria ser que nem você quando crescer...',
          dataRecebimento: '14 de jul',
        },
        {
          importante: false,
          remetente: 'Lucas (Gestor)',
          assunto: 'Vamos ter uma prova para você amanhã...',
          dataRecebimento: '27 de jun',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
