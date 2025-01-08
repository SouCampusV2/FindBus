<template>
  <div class="col-12">
    <div class="stop-location row p-0 m-0 justify-content-center">
      <div class="row p-0">
        <div class="col-12 p-0 d-flex gap-2 flex-column">
          <div v-if="!loader">
            <h1>Please, select the bus:</h1>
          </div>
          <div class="d-flex flex-column">
            <div class="" v-if="!loader">
              <div
                  @click="showTimeTable(bus)"
                  v-for="bus in busses"
                  :class="{
                  'badge m-1': true,
                  'text-bg-primary': bus.length == 1,
                  'text-bg-warning': bus.length == 2,
                  'text-bg-danger': bus.length == 3,
                  'text-bg-info': bus.length >= 4,
                }"
              >{{bus}}</div>
            </div>
            <div class="d-flex justify-content-center align-items-center" v-if="loader">
              <loader-custom/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/ui/elements/Button"
import ButtonSelect from "@/components/ui/elements/ButtonSelect";
import {mapGetters,mapActions} from "vuex";
import Loader from "@/components/ui/elements/Loader";

export default {
  name: "TripLocation",
  components: {
    "button-main": Button,
    "button-select": ButtonSelect,
    "loader-custom": Loader
  },
  computed: {...mapGetters(["getAxios", "getStop"])},
  data(){
    return {
      busses: [],
      loader: true
    }
  },
  mounted() {
    this.getAxios.get(`/api/search/bus/${this.getStop.id}`).then(response => {
      this.busses = response.data;
      setTimeout(() => {
        this.loader = false
      }, 1000)
    })
  },
  methods: {
    ...mapActions(['setForm', 'nextStep']),
    showTimeTable(bus){
      this.nextStep({
        stepName: 'times',
        value: false
      })
      setTimeout(() => {
        this.setForm({
          field: "bus",
          value: bus
        })
        this.nextStep({
          stepName: 'times',
          value: true
        })
      }, 500)

      setTimeout(() => {
        window.scrollTo(0, 500);
      },250)
    }
  }
}
</script>

<style scoped>
h1{
  font-weight: 300;
  font-size: 18px;
  color: #000000;
}
.stop-location{
  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(24, 25, 28, 0.25);
  border-radius: 16px;
  padding: 34px!important;
  animation-duration: 0.8s;
  animation-name: show-animation;
}
input:focus{
  color: #212529;
  background-color: #fff;
  border-color: #C850C000;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(255, 0, 200, 0.57);
}
.spinner{
  color: #C850C0;
}
.badge{
  cursor: pointer;
  width: fit-content;
}
</style>