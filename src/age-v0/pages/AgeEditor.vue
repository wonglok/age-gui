<template>
  <div class="age-editor full">
    <ConnectionLines :offset="offset" ref="lines" @dom="setupDrag" class="age-layer" :connections="connections" :connectorDOMs="connectorDOMs"></ConnectionLines>
    <PreviewArea class="age-layer" :wins="wins" :previewDOMs="previewDOMs" :connections="connections"></PreviewArea>
    <div ref="stuff" class="age-layer full"></div>
    <Box :offset="offset" @drop="onDropConnection" @clicker="onClickConnector" class="age-layer" :connections="connections" :previewDOMs="previewDOMs" :connectorDOMs="connectorDOMs" :wins="wins" v-for="(win) in wins" :key="win._id" :win="win"></Box>
    <div class="posabs top-right">
      <button @click="overlay = 'add-module'">Add Module +</button>
    </div>
    <AddBoxMenu class="age-layer" v-if="overlay === 'add-module'"></AddBoxMenu>
  </div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  components: {
    PreviewArea: require('../uis-gl/PreviewArea.vue').default,
    AddBoxMenu: require('../uis-box/AddBoxMenu.vue').default,
    ConnectionLines: require('../uis-box/ConnectionLines.vue').default,
    Box: require('../uis-box/Box.vue').default
  },
  data () {
    return {
      offset: {
        x: 0,
        y: 0
      },
      overlay: '',
      previewDOMs: [],
      connectorDOMs: [],
      connections: [],
      wins: [],
      toggleCode: false
    }
  },
  mounted () {
    this.createDefaultWin()

    let dom = document.body
    dom.addEventListener('wheel', (evt) => {
      evt.preventDefault()
      this.offset.x += -evt.deltaX
      this.offset.y += -evt.deltaY
      this.$forceUpdate()
      this.$nextTick(() => {
        this.$root.$forceUpdate()
        window.dispatchEvent(new Event('plot'))
      })
    }, { passive: false })

    this.setupDrag({ dom: this.$refs.stuff })
  },
  methods: {
    setupDrag ({ dom }) {
      AGE.UI.makeDrag({
        dom,
        onMM: ({ api, ev }) => {
          this.offset.x += api.dX
          this.offset.y += api.dY
          this.$forceUpdate()
          this.$nextTick(() => {
            this.$root.$forceUpdate()
            window.dispatchEvent(new Event('plot'))
          })
        }
      })
    },
    getStyle () {
      return {
        transform: `translate3d(${this.offset.x}px, ${this.offset.y}px, 0px)`
      }
    },
    onDropConnection (v) {
      let arr = [v.hand, v.land]
      let stuff = {
        [arr[0].io]: arr[0],
        [arr[1].io]: arr[1]
      }

      this.connections.push({
        input: stuff.input,
        output: stuff.output
      })

      // this.$forceUpdate()
      // console.log(JSON.stringify(this.connections, null, ' '))
    },
    onClickConnector (conn) {
      let idx = -1
      this.connections.forEach((c, idxo) => {
        if (c.input._id === conn._id || c.output._id === conn._id) {
          idx = idxo
        }
      })
      if (idx !== -1) {
        this.connections.splice(idx, 1)
      }
      // console.log(JSON.stringify(conn, null, ' '))
    },
    createDefaultWin () {
      AGE.BOX.makeVertexRoot({ wins: this.wins }) // 0
      AGE.BOX.makeFragmentRoot({ wins: this.wins }) // 1
      AGE.BOX.makePreviwBox({ wins: this.wins }) // 2
      AGE.BOX.makeUINumber({ wins: this.wins }) // 3
      AGE.BOX.makeUINumber({ wins: this.wins }) // 4
      AGE.BOX.makeUIMultiplyFloat({ wins: this.wins }) // 5
      AGE.BOX.makeUIVector4({ wins: this.wins }) // 6

      AGE.BOX.makeSpreadV4({ wins: this.wins }) // 7
      AGE.BOX.makeMergeV4({ wins: this.wins }) // 8

      AGE.BOX.makeVaryingV4({ wins: this.wins }) // 9 vertex , 10 fragment

      // AGE.makeSpreadV3({ wins: this.wins })
      // AGE.makeSpreadV2({ wins: this.wins })

      // this.connections.push({
      //   output: this.wins[3].outputs[0],
      //   input: this.wins[0].inputs[1]
      // })

      this.connections.push({
        output: this.wins[3].outputs[0],
        input: this.wins[5].inputs[0]
      })

      this.connections.push({
        output: this.wins[4].outputs[0],
        input: this.wins[5].inputs[1]
      })

      this.connections.push({
        output: this.wins[10].outputs[0],
        input: this.wins[7].inputs[0]
      })

      // this.connections.push({
      //   output: this.wins[7].outputs[0],
      //   input: this.wins[0].inputs[1]
      // })

      // this.connections.push({
      //   output: this.wins[6].outputs[0],
      //   input: this.wins[7].inputs[0]
      // })

      /* eslint-disable */
      this.wins[0].pos = {"x":782,"y":487,"w":275,"h":88,"s":1}
      this.wins[5].pos = {"x":347,"y":441,"w":275,"h":88,"s":1}
      this.wins[3].pos = {"x":0,"y":280,"w":275,"h":62,"s":1}
      this.wins[4].pos = {"x":1,"y":601,"w":275,"h":62,"s":1}

      this.wins[2].pos = {"x":388,"y":106,"w":275,"h":226,"s":1}

      this.wins[6].pos = {"x":3,"y":739,"w":275,"h":62,"s":1}
      this.wins[7].pos = {"x":405,"y":665,"w":275,"h":140,"s":1}

      let mixed = require('./demo.json')
      this.wins = mixed.wins
      this.connections = mixed.connections
      this.$forceUpdate()

      window.copyme = () => {
        let str = JSON.stringify({
          wins: this.wins,
          connections: this.connections
        })
        console.log(`${str}`)
      }

      // AGE.BOX.makeMergeV4({ wins: this.wins })
    }
  }
}
</script>

<style>
</style>
