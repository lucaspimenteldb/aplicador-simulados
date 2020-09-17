<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Tem certeza que deseja sair?</v-card-title>
        <v-card-text>Tem certeza que deseja sair?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Tem certeza que deseja sair?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="aparecerModal">Não</v-btn>
          <v-btn color="green darken-1" text @click="sair">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import storage from "@/storage/storage";
import { Busao } from '../../main';
export default {
  name: 'ModalPadrao',
  props: {
    dialog: false
  },

  methods: {
    aparecerModal () {
      this.$emit('aparecerModal', false)
    },

    sair () {
      Busao.$emit('autenticado', false);
      storage.delete('token');
      window.location.href="";
      // this.aparecerModal();
    },
  },
}
</script>