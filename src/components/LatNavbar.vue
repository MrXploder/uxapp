<template>
  <v-toolbar dark color="blue-grey darken-3">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">Mis Dispositivos</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-dialog v-model="dialogOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn icon slot="activator">
        <v-icon>fa-plus</v-icon>
      </v-btn>
      <v-card>
        <v-toolbar dark color="blue">
          <v-btn icon dark v-on:click="dialogOpen = false">
            <v-icon>fa-times</v-icon>
          </v-btn>
          <v-toolbar-title>Agregar Dispositivo</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        
        <v-layout justify-center pt-4>
          <v-flex xs10>
            <v-form ref="form" v-model="FormMeta.valid" lazy-validation>
              <v-text-field label="Titulo" v-model="FormModel.title" :counter="15" :rules="FormMeta.rules.required" required></v-text-field>
              <v-text-field label="Subtitulo" v-model="FormModel.subTitle" :counter="30" :rules="FormMeta.rules.required" required></v-text-field>
              <v-text-field label="Url de Acción" v-model="FormModel.action" :counter="50" :rules="FormMeta.rules.required" required></v-text-field>
              <v-select :items="items" label="Tipo" v-model="FormModel.type" :rules="FormMeta.rules.required" required></v-select>
              <v-text-field v-if="FormModel.type === 'Monitoreo'" label="Subfijo" :counter="3" v-model="FormModel.suffix" :rules="FormMeta.rules.required" required></v-text-field>
              <v-btn color="success" block :disabled="!FormMeta.valid || FormMeta.saving" v-bind:loading="FormMeta.saving" @click="onFormSubmit">Guardar</v-btn>
            </v-form>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

export default
@Component({
  props: ["open", "closed"]
})
class LatNavbar extends Vue {
  items = ["Iluminación", "Monitoreo", "Control"];
  dialogOpen = false;
  FormMeta = {
    valid: true,
    saving: false,
    rules: {
      required: [v => !!v || "Este campo es obligatorio"]
    }
  };
  FormModel = {
    title: "",
    subTitle: "",
    action: "",
    type: "",
    suffix: ""
  };

  onFormSubmit() {
    if (this.$refs.form.validate()) {
      this.FormMeta.saving = true;

      switch (this.FormModel.type) {
        case "Iluminación":
          {
            this.FormModel.icon = "fa-lightbulb";
            this.FormModel.iconClass = "amber lighten-1 white--text";
          }
          break;

        case "Monitoreo": {
          this.FormModel.icon = "fa-desktop";
          this.FormModel.iconClass = "blue lighten-1 white--text";
        }
      }

      let devices = JSON.parse(localStorage.getItem("uxapp-devices"));
      devices.push(this.FormModel);
      localStorage.setItem("uxapp-devices", JSON.stringify(devices));

      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.FormMeta.saving = false;
      this.dialogOpen = false;
      this.$emit("closed");
    }
  }
}
</script>