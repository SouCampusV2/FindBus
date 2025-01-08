<template>
    <div class="row justify-content-between p-0 m-0 geo-location-position">
      <div class="col-6 align-items-center d-flex" v-show="stop != null">
        <span class="nearest-stop" v-if="stop != null" @click="autoFill()">
          <b class="auto-fill show">{{stop.zone_area.name}}, {{stop.stop_name}}</b>
        </span>
      </div>
      <div class="col-4 justify-content-end d-flex">
        <button-main v-if="geoPosition != null" :action="findNearestStop.bind(this)">
          <BIconArrowRepeat v-if="!geoLoader"/>
          <div class="spinner-border" role="status" v-if="geoLoader">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button-main>
        <button-main
            v-if="geoPosition == null"
            :action="getGeoLocations.bind(this)"
        >
          <BIconGeo v-if="!geoLoader"/>
          <div class="spinner-border" role="status" v-if="geoLoader">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button-main>
      </div>
    </div>
  </template>
  
  <script>
  import Button from "@/components/ui/elements/Button";
  import {mapGetters, mapActions} from "vuex";
  import toastr from "toastr";
  
  export default {
    name: "GeoLocation",
    components: {
      "button-main": Button,
    },
    computed: {...mapGetters(["getAxios"])},
    data(){
      return {
        options: {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        },
        geoPosition: null,
        stop: null,
        geoLoader: false
      }
    },
    methods: {
      ...mapActions(['setForm', 'nextStep']),
      findNearestStop(){
        this.geoLoader = true
        this.getAxios.get(`/api/search/geo-location/${this.geoPosition.lat}/${this.geoPosition.lon}/`).then(
            response => {
              this.stop = response.data
              this.geoLoader = false
            }
        )
      },
      getGeoLocations(){
        this.geoLoader = true
  
        navigator.geolocation.getCurrentPosition((pos) => {
          const crd = pos.coords;
          this.geoPosition = {
            lat: crd.latitude,
            lon: crd.longitude
          }
  
          this.findNearestStop()
        }, () => {
          toastr.warning(`Sorry, but application cannot get access to your geo position`);
  
          this.geoLoader = false
        }, this.options);
      },
      autoFill(){
        this.setForm({
          field: "region",
          value: this.stop.zone_area
        })
        this.setForm({
          field: "stop",
          value: this.stop
        })
        this.nextStep({
          stepName: "bus",
          value: true
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .geo-location-position{
    margin-top: 82px!important;
  }
  .nearest-stop{
    font-weight: 300;
    font-size: 18px;
    color: #000000;
  }
  .auto-fill{
    font-weight: 400;
    color: red;
    font-size: 16px;
    color: #000000;
    cursor: pointer;
  
    position: relative;
    line-height: 1; /*задаём высоту строки*/
    text-decoration: none; /*убираем подчёркивание*/
  }
  .auto-fill:after {
    display: block;
    position: absolute;
    left: 0; /*изменить на right:0;, чтобы изменить направление подчёркивания */
    width: 0;/*задаём длинну линии до наведения курсора*/
    height: 2px; /*задаём ширину линии*/
    background-color: #C850C0; /*задаём цвет линии*/
    content: "";
    transition: width 0.3s ease-out; /*задаём время анимации*/
  }
  
  .auto-fill:hover:after,
  .auto-fill:focus:after {
    width: 100%; /*устанавливаем значение 100% чтобы ссылка подчёркивалась полностью*/
  }
  .spinner-border{
    width: 15px;
    height: 15px;
    border-width: 0.2rem!important;
  }
  .show{
    transition: 0.2s;
    animation-name: show-animation;
    animation-duration: 0.6s;
  }
  </style>