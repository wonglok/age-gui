<template>
  <div>
  </div>
</template>

<script>
import * as AGE from '../api/age'
import _ from 'lodash'
// import * as Audio from '../media/mic-history.js'

let THREE = {
  ...require('three'),
  ...require('three/examples/jsm/controls/OrbitControls.js')
}

export default {
  props: {
    connections: {},
    wins: {},
    win: {},
    scenes: {},
    preview: {}
  },
  data () {
    return {
      config: {},
      shader: false,
      mesh: false,
      rAFID: {},
      group: {
        scene: false,
        render () {}
      }
    }
  },
  watch: {
    uniformsStr: {
      deep: true,
      handler: _.debounce(function () {
        this.makeMat()
      }, 100)
    },
    connections: {
      deep: true,
      handler () {
        this.makeMat()
      }
    }
  },
  computed: {
    uniformsStr () {
      return JSON.stringify({
        uni: (this.win.uniforms || []).filter(e => e.uniType === 'sampler2D')
      })
    }
  },
  beforeDestroy  () {
    delete this.scenes[this.preview.domID]
    for (var kn in this.rAFID) {
      cancelAnimationFrame(this.rAFID[kn] || 0)
    }
  },
  methods: {
    // setupTimer ({ uniforms, uni }) {
    //   uniforms[uni.name + uni._id] = {
    //     value: window.performance.now() * 0.0001
    //   }
    //   let loop = () => {
    //     this.rAFID[uni.name + uni._id] = requestAnimationFrame(loop)
    //     uniforms[uni.name + uni._id].value = window.performance.now() * 0.0001
    //     // console.log(uniforms[uni.name + uni._id].value)
    //   }
    //   cancelAnimationFrame(this.rAFID[uni.name + uni._id] || 0)
    //   this.rAFID[uni.name + uni._id] = requestAnimationFrame(loop)
    // },
    // setupSampler2D ({ win, uniforms, uni }) {
    //   if (!texutreCache.has(uni.url)) {
    //     let texture = new THREE.TextureLoader().load(uni.url)
    //     texutreCache.set(uni.url, texture)
    //     uniforms[uni.name + uni._id] = {
    //       value: texture
    //     }
    //   } else {
    //     uniforms[uni.name + uni._id] = {
    //       value: texutreCache.get(uni.url)
    //     }
    //   }
    // },
    // async setupResolution ({ win, uniforms, uni }) {
    //   let update = async () => {
    //     uniforms[uni.name + uni._id] = {
    //       value: new THREE.Vector2(1024, 1024)
    //     }
    //     let dom = await AGE.UI.getDOM({ domID: this.preview.domID })
    //     let rect = dom.getBoundingClientRect()
    //     uniforms[uni.name + uni._id] = {
    //       value: new THREE.Vector2(rect.width, rect.height)
    //     }
    //     this.mesh.material.needsUpdate = true
    //     // console.log(JSON.stringify(uniforms[uni.name + uni._id].value))
    //   }
    //   window.addEventListener('resize', () => {
    //     update()
    //   })
    //   window.addEventListener('ui-layout', () => {
    //     update()
    //   })
    //   update()
    // },
    // setupAudioUniform ({ win, uniforms, uni }) {
    //   uniforms[uni.name + uni._id] = {
    //     value: null
    //   }
    //   let loop = () => {
    //     this.rAFID[uni.name + uni._id] = requestAnimationFrame(loop)
    //     let api = Audio.APIs[uni._id]
    //     if (api) {
    //       uniforms[uni.name + uni._id].value = api.update().texture
    //       this.mesh.material.needsUpdate = true
    //     }
    //     // console.log(uniforms[uni.name + uni._id].value)
    //   }
    //   cancelAnimationFrame(this.rAFID[uni.name + uni._id] || 0)
    //   this.rAFID[uni.name + uni._id] = requestAnimationFrame(loop)
    // },
    makeMat () {
      let shader = this.shader = AGE.GEN.getCode({ wins: this.wins, connections: this.connections })
      this.$emit('shader', shader)

      for (var kn in this.rAFID) {
        cancelAnimationFrame(this.rAFID[kn] || 0)
      }

      let uniforms = {
      }
      let config = {
        uniforms
      }

      this.wins.forEach(win => {
        // console.log(win)
        if (win.hasUniforms) {
          win.uniforms.forEach((uni) => {
            // if (uni.uniType === 'timer') {
            //   AGE.Shader.setupTimer({ uniforms, uni, ctx: this })
            // } else if (uni.uniType === 'sampler2D') {
            //   AGE.Shader.setupSampler2D({ win, uniforms, uni, ctx: this })
            // } else if (uni.uniType === 'resolution') {
            //   AGE.Shader.setupResolution({ win, uniforms, uni, ctx: this })
            // } else if (uni.uniType === 'sampler2D-audio') {
            //   AGE.Shader.setupAudioUniform({ win, uniforms, uni, ctx: this })
            // }
            AGE.Shader.setupShaderMaterail({ win, uni, uniforms, ctx: this })
          })
        }
      })

      var material = new THREE.ShaderMaterial({
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        transparent: true,
        ...config
        // color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
        // roughness: 0.5,
        // metalness: 0,
        // flatShading: true
      })
      if (this.mesh) {
        this.mesh.material = material
        this.mesh.needsUpdate = true
      }
      return material
    }
  },
  async mounted () {
    // console.log(this.preview, this.wins, this.win, this.scenes)

    let dom = await AGE.UI.getDOM({ domID: this.preview.domID })
    let rect = dom.getBoundingClientRect()
    let scene = this.group.scene = new THREE.Scene()
    let fov = 75
    let aspect = rect.width / rect.height
    let near = 0.1
    let far = 100000000

    let camera = this.group.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 16
    var controls = new THREE.OrbitControls(camera, dom)
    controls.minDistance = 0
    controls.maxDistance = 16
    controls.enablePan = false
    controls.enableZoom = false

    // console.log(this.connections)

    let geometry = new THREE.SphereBufferGeometry(8.5, 320, 320)
    let material = this.makeMat()
    window.addEventListener('compile-shader', () => {
      this.makeMat()
    }, false)
    let mesh = this.mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444))
    var light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(1, 1, 1)
    scene.add(light)

    window.addEventListener('resize', () => {
      let size = dom.getBoundingClientRect()
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
    })
    scene.background = new THREE.Color('rgb(192,223,255)')

    this.group.render = ({ renderer }) => {
      controls.update()
      // scene.children[0].rotation.y += 0.01
      let rect = dom.getBoundingClientRect()

      if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
          rect.right < 0 || rect.left > renderer.domElement.clientWidth) {
        return // it's off screen
      }

      var width = rect.right - rect.left
      var height = rect.bottom - rect.top
      var left = rect.left
      var bottom = renderer.domElement.clientHeight - rect.bottom

      //
      renderer.setViewport(left, bottom, width, height)
      renderer.setScissor(left, bottom, width, height)

      renderer.render(scene, camera)
    }

    this.scenes[this.preview.domID] = this.group
  }
}
</script>

<style>

</style>
