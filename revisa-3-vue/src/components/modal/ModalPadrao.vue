<template>
  <v-row justify="center">
    <v-dialog
      v-model="objeto.dialog"
      persistent max-width="290"
    >
      <v-card>
        <v-card-title class="body-1 text-break">
          {{ objeto.titulo }}
        </v-card-title>

        <v-card-actions>
          <v-spacer />
          <v-btn
              color="azul"
              text @click="aparecerModal"
              class="text-none"
          >
            {{ objeto.textButton }}
          </v-btn>

          <v-btn
              v-show="objeto.confirm"
              color="errou"
              text @click="sair"
              class="text-none"
          >
            {{ objeto.textConfirm }}
          </v-btn>

          <v-btn
              v-show="objeto.confirm2"
              color="errou"
              text @click="funcao"
              class="text-none"
          >
            {{ objeto.textConfirm2 }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import storage from '../../storage/storage';
import { Busao } from '../../main';

export default {
  name: 'ModalPadrao',
  props: {
    objeto: {
      dialog: false,
      titulo: 'Tem certeza que deseja sair?',
      textConfirm: 'Sair',
      textConfirm2: 'Sair',
      textButton: 'Cancelar',
      confirm: false,
      confirm2: false,

    },

  },

  methods: {
    aparecerModal () {
      this.$emit('aparecerModal', false);
    },

    funcao () {
      this.$emit('funcao');
    },

    sair () {
      Busao.$emit('autenticado', false);
      storage.delete('token');
      window.location.href = '';
      // this.aparecerModal();
    },
  },
};
</script>
