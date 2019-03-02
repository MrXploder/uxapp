import Vue from "vue"
import Component from "vue-class-component"

import LatNavbar from "@/components/LatNavbar"

export default
@Component({
  components: {
    LatNavbar
  }
})
class LatDevices extends Vue {
  loading = false;
  devices = [];

  mounted() {
    this.loadDevices();
    this.startToFetch();
  }

  onAction(item) {
    item.loading = true;
    fetch(item.action).finally(() => item.loading = false);
  }

  onAddDeviceModalClose() {
    this.loadDevices();
  }

  loadDevices() {
    if (localStorage.getItem("uxapp-devices")) {
      try {
        this.devices = JSON.parse(localStorage.getItem("uxapp-devices")).map(device => {
          device.loading = false;
          if (device.type === "Monitoreo") device.response = "";
          return device;
        })
      }
      catch (e) {
        localStorage.removeItem("uxapp-devices");
      }
    }
    else {
      localStorage.setItem("uxapp-devices", JSON.stringify([]));
    }
  }

  get filteredDevices() {
    return this.devices.sort(function (a, b) {
      if (a.type > b.type) {
        return 1;
      }
      if (a.type < b.type) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
  }

  startToFetch() {
    setTimeout(() => {
      this.devices.forEach(device => {
        if (device.type === "Monitoreo") {
          fetch(device.action)
            .then(res => res.json())
            .then(res => {
              device.response = res
              this.startToFetch()
            })
            .catch(() => device.response = "")
        }
      })
    }, 5000)
  }
}