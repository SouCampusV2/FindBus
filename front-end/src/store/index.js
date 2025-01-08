import { createStore } from 'vuex'

export default createStore({
  state: {
    settings: {
      axios: null
    },
    form: {
      region: null,
      stop: null,
      bus: ""
    },
    steps: {
      stopAndRegion: true,
      bus: false,
      times: false
    }
  },
  getters: {
    getAxios(state){
      return state.settings.axios;
    },
    getRegion(state){
      return state.form.region;
    },
    getStop(state){
      return state.form.stop;
    },
    getBus(state){
      return state.form.bus;
    },
    getBusState(state){
      return state.steps.bus;
    },
    getTimesState(state){
      return state.steps.times;
    },
  },
  mutations: {
    setAxiosMutation(state, axios){
      state.settings.axios = axios
    },
    setFormMutation(state, formObject){
      state.form[formObject.field] = formObject.value;
    },
    nextStepMutation(state, stepObject){
      state.steps[stepObject.stepName] = stepObject.value
      setTimeout(() => {
        window.scrollTo(0, 500);
      },250)
    },
    clearAllMutation(state){
      state.steps = {
        stopAndRegion: true,
        bus: false,
        times: false
      }
      state.form = {
        region: null,
        stop: null,
        bus: ""
      }
    }
  },
  actions: {
    setAxios(context, axios){
      context.commit("setAxiosMutation", axios)
    },
    setForm(context, formObject){
      context.commit("setFormMutation", formObject)
    },
    nextStep(context, stepObject){
      context.commit("nextStepMutation", stepObject)
    },
    clearAll(context){
      context.commit("clearAllMutation")
    }
  },
  modules: {

  }
})
