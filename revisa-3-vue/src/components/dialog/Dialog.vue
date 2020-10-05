<template>
    <div class="text-center">
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    Click Me
                </v-btn>
            </template>

            <v-card>
                <v-card-title
v-html="titulo"
class="headline grey lighten-2"
/>

                <v-card-text v-html="texto"/>

                <v-divider />

                <v-card-actions>
                    <v-spacer />
                    <v-btn
                            color="primary"
                            text
                            @click="aparecerModal"
                    >
                       Fechar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
  name: 'Dialog',
  data () {
    return {
      
    };
  },
    
  methods: {
    aparecerModal () {
      this.$emit('aparecerModal', false);
    },
  },
    
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    dialog: false,
    titulo: '',
    texto: '',
  },
};
</script>

<style scoped>

</style>
