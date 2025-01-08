<template>
  <form class="pe-2">
    <div class="form-group">
      <label :for="title">{{title}}:</label>
      <input
          @input="updateInputValue($event)"
          :value="inputValue"
          type="text"
          class="form-control mt-1"
          :id="title"
          :placeholder="placeholder"
          @focusin="focusChange(true)"
          @focusout="focusChange(false)"
      >
      <div :class="{
        'select-list': true,
        'show-menu': isFocused && tool.dataList.length !== 0
      }">
        <ul>
          <li @click="selectHint(item)" v-for="item in tool.dataList">{{ item[fieldName] }}</li>
        </ul>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ["title", "placeholder", "tool", "fieldName", "inputValue"],
  name: "InputSelect",
  data(){
    return {
      isFocused: false,
    }
  },
  methods: {
    focusChange(change){
      setTimeout(() => {
        this.isFocused = change
      }, 150)
    },
    selectHint(item){
      this.$emit('update:inputValue', item[this.fieldName])
      this.isFocused = false
      //call the method, for selecting in VUEX
      this.tool.save(item)
    },
    updateInputValue(e){
      this.$emit('update:inputValue', e.target.value)
      this.tool.search(this.inputValue)

    }
  },
}
</script>

<style scoped>
.form-group{
  position: relative;
}
input:focus{
  color: #212529;
  background-color: #fff;
  border-color: #C850C000;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(255, 0, 225, 0.57);
}

.select-list{
  box-shadow: 0px 4px 12px rgba(24, 25, 28, 0.25);
  border-radius: 16px;
  padding: 12px;
  background: white;

  position: absolute;
  transform: translateY(10px);
  width: 100%;
  cursor: pointer;

  display: none;
  max-height: 300px;
  overflow: scroll;
  z-index: 3;
}
.select-list ul {
  margin: 0px;
  list-style: none;
  padding: 0px;
}
.select-list ul li{
  padding: 10px;
}

.select-list ul li:hover{
  background: #f6f6f6;
  border-radius: 16px;
}

.show-menu{
  display: block!important;
  animation-name: test;
  animation-duration: 0.3s;
}

@keyframes test {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(10px);
  }
}
</style>