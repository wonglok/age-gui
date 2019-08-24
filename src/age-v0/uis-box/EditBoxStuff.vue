<template>
  <div class="full age-addbox-wrap scroller">
    <div class="age-addbox-close-plane full" @click="close()">
    </div>
    <div class="age-addbox-content scroller">
      <h1>
        Edit Module
      </h1>
      <p>
        Resize
        <input type="checkbox" v-model="win.resize"  />
      </p>
        <!-- {
        "shader": "vertexShader",
        "argType": "vec4",
        "arg": "vec4_a",
        "defaults": "vec4(0.0, 0.0, 0.0, 0.0)",
        "boxID": "_87839477_",
        "io": "input",
        "type": "vec4",
        "label": "vec4",
        "_id": "_34182198_"
      }, -->

      <div v-if="win && win.type === 'custom-function'">
        <p>
          moduleID: {{ win._id }}
        </p>
        <div :key="input._id" v-for="(input, idx) in win.inputs">
          <div>
            Data Type:
            <select v-model="input.argType" @change="onChangeArgType({ input, value: $event.target.value })">
              <option value="float">Float</option>
              <option value="vec4">Vector4</option>
              <option value="vec3">Vector3</option>
              <option value="vec2">Vector2</option>
            </select>

            Argument Name:
            <input type="text" v-model="input.arg" @input="onChangeArgName({ input, value: input.arg })">

            Defaults:
            <input type="text" v-model="input.defaults">

            <button @click="removeInput({ input, idx, inputs: win.inputs })">Remove</button>
          </div>
        </div>
        <button @click="addInput({ win })">Add Inputs</button>
        <!-- <textarea v-model="win.fnInner" cols="30" rows="10" @input="compile"></textarea> -->
        <Brace style="height: 200px;" :mode="'glsl'" :getter="() => win.fnExt" :setter="(v) => { win.fnExt = v }"></Brace>
        <Brace style="height: 200px;" :mode="'glsl'" :getter="() => win.fnInner" :setter="(v) => { win.fnInner = v }"></Brace>
      </div>
      <button @click="remove()">Remove This</button>
      <div>
        <p>JSON</p>
        <pre>{{ win }}</pre>
      </div>
    </div>
    <div class="age-addbox-close" @click="close()">
      <img src="../icons/close.svg" alt="" />
    </div>
  </div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  components: {
    Brace: require('./Brace.vue').default
  },
  props: {
    winID: {},
    wins: {},
    connections: {}
  },
  data () {
    return {
      win: this.wins.find(e => e._id === this.winID)
    }
  },
  watch: {
    win: {
      deep: true,
      handler () {
        this.save()
        this.compile()
        this.plot()
      }
    }
  },
  mounted () {
    let close = (evt) => {
      window.removeEventListener('close', close)
      if (evt.keyCode === 127) {
        this.close()
      }
    }
    window.addEventListener('keydown', close)
  },
  methods: {
    plot () {
      window.dispatchEvent(new Event('ui-layout'))
      window.dispatchEvent(new Event('plot'))
    },
    removeInput ({ input, idx, inputs }) {
      this.$parent.onClickConnector(input)
      inputs.splice(idx, 1)
    },
    onChangeArgName ({ input, value }) {
      input.label = value
    },
    onChangeArgType ({ input, value }) {
      input.defaults = AGE.NS.DEFAULT_VALUES[value]
      input.type = value
      input.io = 'input'
    },
    addInput ({ win }) {
      AGE.BOX.addInputToFunction({ win })
      this.compile()
      this.save()
    },
    compile () {
      window.dispatchEvent(new Event('compile-shader'))
    },
    save () {
      this.$emit('save', true)
    },
    close () {
      this.compile()
      this.$parent.overlay = false
      this.save()
    },
    remove () {
      this.win.inputs.forEach((conn) => {
        this.$parent.onClickConnector(conn)
      })
      this.win.outputs.forEach((conn) => {
        this.$parent.onClickConnector(conn)
      })
      this.wins.splice(this.wins.findIndex(w => w._id === this.winID), 1)
      this.$root.$forceUpdate()
      this.close()
    }
  }
}
</script>

<style>

</style>
