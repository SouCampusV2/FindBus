<template>
  <div class="col-12">
    <div class="stop-location row p-0 m-0 justify-content-center">
      <div class="row p-0">
        <div class="col-12 d-flex justify-content-center align-items-center" v-if="loader">
          <loader-custom/>
        </div>
        <div class="col-12 d-flex mb-4 " v-if="!loader">
          <div class="d-flex justify-content-center align-items-center name">
            <div
                :class="{
                  'badge me-2': true,
                  'text-bg-primary': getBus.length == 1,
                  'text-bg-warning': getBus.length == 2,
                  'text-bg-danger': getBus.length == 3,
                  'text-bg-info': getBus.length >= 4,
                }"
            >{{getBus}}</div>
            <span v-if="tripInfo != null">{{tripInfo.trip_long_name}}</span>
          </div>
          <hr>
        </div>
        <div class="col-3">
          <div :class="{
            'time': true,
            'select': time.selected
          }" v-for="time in times" v-if="!loader" @click="setTime(time)">
            {{time.arrival_time}}
          </div>
        </div>
        <div :class="{
          'col-9 p-0 d-flex gap-2 flex-column align-items-center': true,
          'justify-content-center': loaderTable
        }" v-if="!loader && tripInfo != null">
          <loader-custom v-if="loaderTable"/>
          <table v-if="!loaderTable" class="table">
            <thead>
              <tr>
                <th scope="col">Arrival time</th>
                <th scope="col">Stop name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="time in tripInfo.times" :class="{
                'one-row': true,
                'your-station': time.selected
              }">
                <th scope="row">{{time.arrival_time}}</th>
                <td>{{time.stop.stop_name}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/ui/elements/Button"
import ButtonSelect from "@/components/ui/elements/ButtonSelect";
import {mapGetters} from "vuex";
import Loader from "@/components/ui/elements/Loader";

export default {
  name: "BusTimeInformation",
  components: {
    "button-main": Button,
    "button-select": ButtonSelect,
    "loader-custom": Loader
  },
  computed: {...mapGetters(["getAxios", "getStop", "getBus"])},
  data(){
    return {
      times: [],
      loader: true,
      loaderTable: true,
      time: null,
      tripInfo: null
    }
  },
  mounted() {
    this.getAxios.post(`/api/search/bus-times/`, {
      stopId: this.getStop.id,
      busName: this.getBus
    }).then(response => {
      // Сортируем массив времен
      this.times = response.data.sort((a, b) => {
        // Преобразуем строки времени в объекты Date для корректного сравнения
        const timeA = new Date(`1970/01/01 ${a.arrival_time}`);
        const timeB = new Date(`1970/01/01 ${b.arrival_time}`);
        return timeA - timeB;
      });
      
      this.times.forEach(time => {
        time.selected = false
      })
      setTimeout(() => {
        this.loader = false
      }, 1000)
    })
},
  methods: {
    setTime(time){
      this.times.forEach(time => {
        time.selected = false
      })
      time.selected = true
      this.time = time
    }
  },
  watch: {
    time(){
      if(this.time != null){
        this.loaderTable = true
        this.getAxios.get(`api/search/trip-info/${this.time.trip.id}`).then(response => {
          this.tripInfo = response.data;
          // Сортируем массив времен в расписании
          this.tripInfo.times.sort((a, b) => {
            const timeA = new Date(`1970/01/01 ${a.arrival_time}`);
            const timeB = new Date(`1970/01/01 ${b.arrival_time}`);
            return timeA - timeB;
          });
          
          this.tripInfo.times.forEach(time => {
            if(time.stop.id == this.getStop.id){
              time.selected = true
            }else{
              time.selected = false
            }
          })
          setTimeout(() => {
            window.scrollTo(0, 600);
          },250)
          setTimeout(() => {
            this.loaderTable = false
          }, 1000)
        })
      }
    }
  }
}
</script>

<style scoped>
.name{
  font-weight: 300;
  font-size: 18px;
  color: #000000;
}
.name span{
  font-weight: bold;
}
.stop-location{
  margin-top: 35px;
  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(24, 25, 28, 0.25);
  border-radius: 16px;
  padding: 34px!important;
}
input:focus{
  color: #212529;
  background-color: #fff;
  border-color: #C850C0;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(255, 0, 191, 0.57);
}
.time{
  padding: 6px;
  text-align: center;
  margin-bottom: 10px;
  background: white;
  border-radius: 16px;
  border-radius: 16px;
  width: 100%;
  height: fit-content;
  cursor: pointer;
  border: 2px solid #C850C0;
  transition: 0.3s;
  cursor: pointer;
}
.time:hover{
  background: #C850C0;
  transition: 0.3s;
  cursor: pointer;
  color: white;
}
.one-row:hover {
  background: #ffffff;
}
.select{
  background: #C850C0!important;
  color: rgb(255, 255, 255);
}
.your-station{
  background: #C850C0!important;
  color: white;
}
</style>