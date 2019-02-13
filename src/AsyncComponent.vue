<template>
  <div :id="id">
    <div v-if="isLoading">loading</div>
    <div v-else-if="isError">error</div>
  </div>
</template>

<script>
import Vue from "vue";

const ERROR_STATUS = "ERROR_STATUS";
const LOADING_STATUS = "LOADING_STATUS";

export default {
  data() {
    return {
      id: `ac_${this._uid}`,
      status: LOADING_STATUS
    };
  },
  computed: {
    isLoading() {
      return this.status === LOADING_STATUS;
    },
    isError() {
      return this.status === ERROR_STATUS;
    }
  },
  props: ["url", "name"],
  async mounted() {
    let Component = await this.asyncLoadScript(this.url, this.name);

    new Vue({
      render: h => <Component />
    }).$mount(`#${this.id}`);
  },
  methods: {
    asyncLoadScript(url, name) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.charset = "utf-8";
        script.timeout = 120;
        script.src = url;

        script.onload = function(event) {
          script.onerror = script.onload = null;
          resolve(window[name]);
        };

        script.onerror = function(event) {
          script.onerror = script.onload = null;
          this.status = ERROR_STATUS;
          reject(new Error("script 加载失败"));
        };
        document.head.appendChild(script);
      });
    }
  }
};
</script>

<style scoped>
</style>
