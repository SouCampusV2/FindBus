<template>
  <div class="container-custom">
    <div class="row">
      <navbar/>
      <stop-location/>
      <next-step v-if="getBusState"/>
      <trip-location v-if="getBusState"/>
      <next-step v-if="getTimesState"/>
      <bus-time-info v-if="getTimesState"/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/ui/Navbar";
import StopLocation from "@/components/ui/StopLocation";
import NextStep from "@/components/ui/elements/NextStep";
import TripLocation from "@/components/ui/TripLocation";
import BusTimeInformation from "@/components/ui/BusTimeInformation";
import {mapGetters} from "vuex";

export default {
  name: "index.vue",
  components: {
    "navbar": Navbar,
    "stop-location": StopLocation,
    "next-step": NextStep,
    'trip-location': TripLocation,
    'bus-time-info': BusTimeInformation
  },
  computed: {...mapGetters(['getBusState','getTimesState'])}
}
</script>

<style scoped>
.container-custom{
  max-width: 960px;
  margin: auto;
}

@media (max-width: 600px) {
  .container-custom {
    margin: 0px 18px 0px 18px;
  }
}

@media (min-width: 600px) {
  .container-custom {
    width: 450px;
  }
}

@media (min-width: 768px) {
  .container-custom {
    width: 550px;
  }
}
@media (min-width: 992px) {
  .container-custom {
    width: 750px;
  }
}
@media (min-width: 1200px) {
  .container-custom {
    width: 750px;
  }
}

</style>