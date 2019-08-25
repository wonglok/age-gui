import * as Audio from '../media/mic-history'
import * as THREE from 'three'
import * as UI from './age-ui'

export const setupAudioUniform = ({ win, uniforms, uni, ctx }) => {
  uniforms[uni.name + uni._id] = {
    value: null
  }
  let loop = () => {
    ctx.rAFID[uni.name + uni._id] = requestAnimationFrame(loop)
    let api = Audio.APIs[uni._id]
    if (api) {
      uniforms[uni.name + uni._id].value = api.update().texture
      ctx.mesh.material.needsUpdate = true
      ctx.$forceUpdate()
    }
    // console.log(uniforms[uni.name + uni._id].value)
  }
  cancelAnimationFrame(ctx.rAFID[uni.name + uni._id] || 0)
  ctx.rAFID[uni.name + uni._id] = requestAnimationFrame(loop)
}

export const setupResolution = async ({ win, uniforms, uni, ctx }) => {
  let update = async () => {
    uniforms[uni.name + uni._id] = {
      value: new THREE.Vector2(1024, 1024)
    }
    let dom = await UI.getDOM({ domID: ctx.preview.domID })
    let rect = dom.getBoundingClientRect()
    uniforms[uni.name + uni._id] = {
      value: new THREE.Vector2(rect.width, rect.height)
    }
    ctx.mesh.material.needsUpdate = true
    // console.log(JSON.stringify(uniforms[uni.name + uni._id].value))
  }
  window.addEventListener('resize', () => {
    update()
  })
  window.addEventListener('ui-layout', () => {
    update()
  })
  update()
}

let texutreCache = new Map()

export const setupSampler2D = ({ win, uniforms, uni, ctx }) => {
  if (!texutreCache.has(uni.url)) {
    let texture = new THREE.TextureLoader().load(uni.url)
    texutreCache.set(uni.url, texture)
    uniforms[uni.name + uni._id] = {
      value: texture
    }
  } else {
    uniforms[uni.name + uni._id] = {
      value: texutreCache.get(uni.url)
    }
  }
}

export const setupTimer = ({ uniforms, uni, ctx }) => {
  uniforms[uni.name + uni._id] = {
    value: window.performance.now() * 0.0001
  }
  let loop = () => {
    ctx.rAFID[uni.name + uni._id] = requestAnimationFrame(loop)
    uniforms[uni.name + uni._id].value = window.performance.now() * 0.0001
    // console.log(uniforms[uni.name + uni._id].value)
  }
  cancelAnimationFrame(ctx.rAFID[uni.name + uni._id] || 0)
  ctx.rAFID[uni.name + uni._id] = requestAnimationFrame(loop)
}

export const setupShaderMaterail = ({ win, uni, uniforms, ctx }) => {
  if (uni.uniType === 'timer') {
    setupTimer({ uniforms, uni, ctx })
  } else if (uni.uniType === 'sampler2D') {
    setupSampler2D({ win, uniforms, uni, ctx })
  } else if (uni.uniType === 'resolution') {
    setupResolution({ win, uniforms, uni, ctx })
  } else if (uni.uniType === 'sampler2D-audio') {
    setupAudioUniform({ win, uniforms, uni, ctx })
  }
}
