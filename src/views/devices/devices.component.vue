<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card style="height: 100%; overflow-y: auto">
        <LatNavbar @closed="onAddDeviceModalClose"/>
        <v-list two-line subheader>
          <v-list-tile v-for="(device, index) in filteredDevices" v-bind:key="index" avatar>
            <v-list-tile-avatar>
              <v-icon v-bind:class="[device.iconClass]">{{ device.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ device.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ device.subTitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="device.type === 'Iluminación'">
              <v-btn fab depressed flat v-bind:loading="device.loading" v-bind:disabled="device.loading" v-on:click="onAction(device)">
                <img src="@/assets/tap.svg" style="width: 40px">
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action v-if="device.type === 'Monitoreo'">
              <v-btn fab depressed flat v-bind:loading="device.loading" v-bind:disabled="device.loading" v-on:click="onAction(device)">
                <span class="with-suffix">{{ device.response || 0 }}{{ device.suffix }}</span>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src="./devices.component.js"></script>
<style lang="css">
.with-suffix {
  width: 100%;
  text-align: center;
}
</style>
