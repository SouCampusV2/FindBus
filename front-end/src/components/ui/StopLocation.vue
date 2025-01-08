<template>
  <div class="col-12">
    <div class="stop-location row p-0 m-0 justify-content-center">
      <div class="row p-0">
        <div class="col-6 p-0">
          <input-select
              title="Region name"
              placeholder="Enter region name"
              :tool="regionTool"
              fieldName="name"
              v-model:inputValue="regionTool.value"
          />
        </div>
        <div class="col-6 p-0">
          <input-select
              title="Stop name"
              placeholder="Enter stop name"
              :tool="stopTool"
              fieldName="stop_name"
              v-model:inputValue="stopTool.value"
          />
        </div>
      </div>
      <div class="row justify-content-between info p-0">
        <div class="col-6 d-flex justify-content-start align-items-end p-0 info-text" >
          <span v-if="getRegion != null" :class="{
            'show': getRegion != null,
            'path': true
          }">{{ getRegion.name }},

            <span v-if="getStop != null" :class="{
              'show': getStop != null,
              'path stop ms-1': true,
            }"> {{ getStop.stop_name }}</span>

          </span>

        </div>
        <div class="col-6 p-0 d-flex justify-content-end">
          <button-main
            :action="preNextAction"
          >
            Next step
          </button-main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/ui/elements/Button"
import InputSelect from "@/components/ui/elements/InputSelect";
import {mapGetters, mapActions} from "vuex";
export default {
  name: "StopLocation",
  components: {
    "button-main": Button,
    "input-select": InputSelect
  },
  computed:{
    ...mapGetters(["getAxios", "getRegion", "getStop"])
  },
  data() {
    return {
      regionTool: {
        search: async (item) => {
          if(item.length >= 2) { // Добавляем проверку на минимальную длину
            try {
              const response = await this.getAxios.get(`/api/search/region/${item}`)
              if(response.data && Array.isArray(response.data)) {
                this.regionTool.dataList = response.data
              } else {
                this.regionTool.dataList = []
              }
            } catch (error) {
              console.error('Error fetching regions:', error)
              this.regionTool.dataList = []
            }
          } else {
            this.regionTool.dataList = []
          }
        },
        save: (item) => this.setForm({
          field: "region",
          value: item
        }),
        dataList: [],
        value: ""
      },
      stopTool: {
        search: async (item) => {
          if(item.length >= 2 && this.getRegion?.id) { // Проверяем длину и наличие региона
            try {
              const response = await this.getAxios.post(`/api/search/stops/${item}`, {
                region: this.getRegion.id
              })
              if(response.data && Array.isArray(response.data)) {
                this.stopTool.dataList = response.data
              } else {
                this.stopTool.dataList = []
              }
            } catch (error) {
              console.error('Error fetching stops:', error)
              this.stopTool.dataList = []
            }
          } else {
            this.stopTool.dataList = []
          }
        },
        save: (item) => this.setForm({
          field: "stop",
          value: item
        }),
        dataList: [],
        value: ""
      }
    }
  },
  methods: {
    ...mapActions(["setForm", 'nextStep']),
    preNextAction(){
      this.nextStep({
        stepName: 'bus',
        value: false
      })
      this.nextStep({
        stepName: 'times',
        value: false
      })

      setTimeout(() => {
        if(this.getRegion != undefined && this.getStop != undefined && this.getRegion != null && this.getStop != null ){
          this.nextStep({
            stepName: 'bus',
            value: true
          })
        }
      }, 150)
    }
  },
  watch: {
    getRegion: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.regionTool.value = newVal?.name || "";
          // Очистка данных, если регион изменился
          this.clearSteps();
        }
      },
    },
    getStop: {
      deep: true,
      immediate: true,
      handler() {
        this.getStop != null ? this.stopTool.value = this.getStop.stop_name : this.stopTool.value = "";
      },
    },
  },
};
</script>

<style scoped>
.stop-location{
  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(24, 25, 28, 0.25);
  border-radius: 16px;
  padding: 34px!important;
  margin-top: 22px!important;
}
.info{
  margin-top: 27px;
}
.info-text{
  font-weight: 300;
  color: #000000;
  position: relative;
}
.show{
  transition: 0.2s;
  animation-name: show-animation;
  animation-duration: 0.6s;
}
.path{
  position: absolute;
  z-index: 1;
  width: 250px;
}
</style>