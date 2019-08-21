// import Vue from 'vue'

export const getDOM = ({ domID }) => {
  return new Promise((resolve) => {
    let tout = 0
    tout = setInterval(() => {
      let val = document.getElementById(domID)
      if (val) {
        resolve(val)
        clearTimeout(tout)
      }
    })
  })
}

export const waitGet = ({ getter }) => {
  return new Promise((resolve) => {
    let tout = 0
    tout = setInterval(() => {
      let val = getter()
      if (val) {
        resolve(val)
        clearTimeout(tout)
      }
    })
  })
}

export const boxColorTypes = {
  'preview-box': `linear-gradient(251deg, #ccc 9%, #b1b1b1 100%)`,
  vertexinput: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  output: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  statement: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  uniform: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  attribute: `linear-gradient(251deg, rgba(255,192,192,0.72) 9%, #FF1B1B 100%)`,
  previewWin: `linear-gradient(251deg, rgba(255,221,192,0.72) 9%, #FF881B 100%)`,
  varying: `linear-gradient(251deg, rgba(255,221,192,0.72) 9%, #FF881B 100%)`,
  function: `linear-gradient(251deg, rgba(192,255,210,0.72) 9%, #18CA1A 100%)`,
  default: `linear-gradient(251deg, rgba(192,255,210,0.72) 9%, #18CA1A 100%)`
}

export const connectorColorTypes = {
  'u': `#ccc`,
  'v': `#b1b1b1`,

  'ccc': `#ccc`,
  'a': `#b1b1b1`,
  'r': `#F72626`,
  'g': `#1FC938`,
  'b': `#1F59C9`,

  'sampler2D': `#F72626`,
  'float': `#1FC938`,
  'vec2': `hsl(38, 93%, 66%)`,
  'vec3': `hsl(38, 93%, 55%)`,
  'vec4': `hsl(38, 93%, 45%)`,
  'mat3': `#1F59C9`,
  'mat4': `#1F59C9`
}

export const getID = () => {
  return `_${Number(100000000 * Math.random()).toFixed(0)}_`
}

/*
win.inputs.push(
  AGE.getIO({ boxID: win._id, io: 'input', type: 'sampler2D', label: 'Happy' }),
  AGE.getIO({ boxID: win._id, io: 'input', type: 'float', label: 'Happy' }),
  AGE.getIO({ boxID: win._id, io: 'input', type: 'vec3', label: 'Happy' }),
  AGE.getIO({ boxID: win._id, io: 'input', type: 'mat3', label: 'Happy' })
)

win.outputs.push(
  AGE.getIO({ boxID: win._id, io: 'output', type: 'sampler2D', label: 'Happy' }),
  AGE.getIO({ boxID: win._id, io: 'output', type: 'float', label: 'Happy' }),
  AGE.getIO({ boxID: win._id, io: 'output', type: 'vec3', label: 'Happy' }),
  AGE.getIO({ boxID: win._id, io: 'output', type: 'mat3', label: 'Happy' })
)
*/

export const getIO = (args) => {
  return {
    ...args,
    _id: getID()
    // boxID,
    // arg,
    // argType,
    // io,
    // type,
    // code,
    // defaults,
    // label
  }
}

export const getWin = () => {
  return {
    _id: getID(),
    title: '',
    type: '',
    transition: '',
    order: 0,
    preview: 'uniform',
    pos: {
      x: 0,
      y: 0,
      w: 150,
      h: 100,
      s: 1
    },
    inputs: [
    ],
    outputs: [
    ],
    spread: [],
    declare: '',
    func: '',
    eval: '',
    isRoot: false,
    shaderType: ''
  }
}

export const focusWinsOfApp = ({ wins, appName }) => {
  wins.filter(t => t.appName === appName).forEach((win) => focusApp({ wins, win }))
}

export const focusApp = ({ wins, win }) => {
  wins.order = (t) => {
    t.order = 0
  }
  win.order = 100
  wins.sort((a, b) => {
    if (a.order > b.order) {
      return 1
    } else if (a.order < b.order) {
      return -1
    } else {
      return 0
    }
  })
  win.order = 0
}

export const makeDrag = ({ dom, onMM = () => {}, onDown = () => {}, onUp = () => {} }) => {
  let mod = {
    dom,
    down: false,
    tsX: 0,
    tsY: 0,
    dX: 0,
    dY: 0,
    aX: 0,
    aY: 0,
    pageX: 0,
    pageY: 0,
    target: false,
    onTS: (ev) => {
      let touch = ev.touches[0]
      mod.tsX = touch.pageX
      mod.tsY = touch.pageY
      mod.down = true
      onDown({ api: mod, ev })
    },
    onTM: (ev) => {
      if (mod.down) {
        try {
          ev.preventDefault()
        } catch (e) {
          console.log(e)
        }

        let touch = ev.touches[0]
        mod.dX = touch.pageX - mod.tsX
        mod.dY = touch.pageY - mod.tsY

        mod.aX += mod.dX
        mod.aY += mod.dY

        mod.tsX = touch.pageX
        mod.tsY = touch.pageY

        mod.pageX = touch.pageX
        mod.pageY = touch.pageY

        mod.target = touch.target

        onMM({ api: mod, ev })
      }
    },
    onTE: (ev) => {
      mod.down = false
    },
    onUp: (ev) => {
      onUp({ api: mod, ev })
    },
    onMD: (ev) => {
      mod.tsX = ev.pageX
      mod.tsY = ev.pageY
      mod.down = true
      onDown({ api: mod, ev })
    },
    onMM: (ev) => {
      if (mod.down) {
        mod.dX = ev.pageX - mod.tsX
        mod.dY = ev.pageY - mod.tsY

        mod.aX += mod.dX
        mod.aY += mod.dY

        mod.tsX = ev.pageX
        mod.tsY = ev.pageY

        mod.pageX = ev.pageX
        mod.pageY = ev.pageY

        mod.target = ev.target

        onMM({ api: mod, ev })
      }
    },
    onMU: (ev) => {
      mod.down = false
    }
  }
  window.addEventListener('mouseup', mod.onUp, false)
  window.addEventListener('touchend', mod.onUp, false)
  // window.addEventListener('touchcancel', mod.onUp, false)

  mod.dom.addEventListener('mouseup', mod.onUp, false)
  mod.dom.addEventListener('touchend', mod.onUp, false)
  // mod.dom.addEventListener('touchcancel', mod.onUp, false)

  //
  mod.dom.addEventListener('mousedown', mod.onMD, false)
  mod.dom.addEventListener('mousemove', mod.onMM, false)
  mod.dom.addEventListener('mouseup', mod.onMU, false)

  window.addEventListener('mousemove', mod.onMM, false)
  window.addEventListener('mouseup', mod.onMU, false)

  mod.dom.addEventListener('touchstart', mod.onTS, false)
  mod.dom.addEventListener('touchmove', mod.onTM, false)
  mod.dom.addEventListener('touchend', mod.onTE, false)
  mod.dom.addEventListener('touchcancel', mod.onTE, false)
  window.addEventListener('touchmove', mod.onTM, false)
  window.addEventListener('touchend', mod.onTE, false)
  window.addEventListener('touchcancel', mod.onTE, false)
}

// export const DnDFactory = () => {
// /*
// <template>
//   <div class="dndot" @click="onClick()" v-if="userdata" v-dragme v-dropme :userdata="userdata" :drop="onDrop">
//     123123
//   </div>
// </template>

// <script>
// import * as AGE from '../api/age'
// let directive = AGE.DnDFactory()()

// export default {
//   props: {
//     userdata: {}
//   },
//   directives: {
//     ...directive
//   },
//   data () {
//     return {
//     }
//   },
//   methods: {
//     onClick () {
//       console.log(this.userdata)
//     },
//     onDrop (v) {
//       console.log(v)
//     }
//   }
// }
// </script>

// <style>

// </style>
//   */
//   let hand = new Vue({})
//   let indicator = document.createElement('div')
//   indicator.style.display = 'none'
//   document.body.appendChild(indicator)

//   return () => {
//     let mod = {
//       dragme: {
//         // When the bound element is bind into the DOM...
//         bind (el, binding, vnode) {
//           let data = vnode.data.attrs.userdata
//           console.log(data)
//           // Focus the element
//           // el.omg()
//           let sent = false
//           makeDrag({
//             dom: el,
//             onDown: ({ api }) => {
//               sent = false
//               indicator.style.display = 'block'
//               indicator.style.opacity = '0'
//               indicator.style.transform = `translate3d(${api.pageX}px, ${30 + api.pageY}px, 0px)`
//               indicator.style.backgroundColor = 'white'
//               indicator.style.zIndex = '100000000'
//               indicator.style.position = 'fixed'
//               indicator.style.top = '0'
//               indicator.style.left = '0'
//               indicator.style.fontFamily = `'Avenir', Helvetica, Arial, sans-serif`
//               indicator.style.padding = '10px'
//               indicator.style.borderRadius = '10px'
//               indicator.style.boxShadow = `0px 0px 10px 0px grey`
//               indicator.innerText = data.label || ''
//               indicator.style.transition = ''
//               indicator.style.userSelect = 'none'
//             },
//             onMM: ({ api }) => {
//               indicator.style.opacity = '1'
//               indicator.style.transform = `translate3d(${api.pageX}px, ${30 + api.pageY}px, 0px)`
//               let rect = indicator.getBoundingClientRect()

//               let hoverAt = document.elementFromPoint(api.pageX, api.pageY)
//               if (hoverAt) {
//                 let json = hoverAt.getAttribute('json')
//                 if (json) {
//                   try {
//                     json = JSON.parse(json)
//                   } catch (e) {
//                     json = false
//                   }
//                 } else {
//                   json = false
//                 }
//                 if (json && JSON.stringify(json) !== JSON.stringify(data) && json._id !== data._id) {
//                   indicator.style.backgroundColor = 'lime'
//                   hand.canDrop = true
//                 } else {
//                   indicator.style.backgroundColor = 'white'
//                   hand.canDrop = false
//                 }
//               }

//               hand.x = rect.left - 30
//               hand.y = rect.top - 30
//               hand.data = data
//             },
//             onUp: ({ api, ev }) => {
//               indicator.display = 'none'
//               let hoverAt = document.elementFromPoint(api.pageX, api.pageY)
//               indicator.style.opacity = '0'
//               indicator.style.transform = ''
//               indicator.style.userSelect = ''
//               if (!sent && hand.canDrop) {
//                 hand.$emit('send', { hoverAt, handdata: data })
//                 sent = true
//               }
//             }
//           })
//         }
//       },
//       dropme: {
//         // When the bound element is bind into the DOM...
//         bind (el, binding, vnode) {
//           let dropHandler = vnode.data.attrs.drop || (() => {})
//           let userdata = vnode.data.attrs.userdata
//           el.setAttribute('json', JSON.stringify(userdata))

//           hand.$on('send', ({ hoverAt, handdata }) => {
//             if (hoverAt === el || el.contains(hoverAt) || hoverAt.contains(el)) {
//               if (JSON.stringify(handdata) !== JSON.stringify(userdata)) {
//                 console.log('-----found dropzone')
//                 console.log('-----drop data', userdata)
//                 console.log('-----hand data', handdata)
//                 dropHandler({ hand: handdata, land: userdata })
//               }
//             }
//           })

//           // el.addEventListener('mouseover', () => {
//           //   let rect = el.getBoundingClientRect()
//           //   let { x, y } = hand
//           //   console.log(el)

//           //   if (x >= rect.left && x <= (rect.left + rect.width) && y <= (rect.top + rect.height) && y >= rect.top) {
//           //     dropHandler({ hand: hand.data, land: userdata })
//           //   }
//           //   console.log(x >= rect.left, x <= (rect.left + rect.width), y <= (rect.top + rect.height), y >= rect.top)
//           // })
//         }
//       }
//     }
//     return mod
//   }
// }

/*
----------------------------------
----------------------------------
*/

export const NS = {
  SHADER_TYPES: {
    VERTEX: 'vertexShader',
    FRAGMENT: 'fragmentShader'
  },
  IO_TYPES: {
    BOTH: 'both',
    INPUT: 'input',
    OUTPUT: 'output'
  },
  DEFAULT_VALUES: {
    VEC2: `vec2(0.0, 0.0)`,
    VEC3: `vec3(0.0, 0.0, 0.0)`,
    VEC4: `vec4(0.0, 0.0, 0.0, 0.0)`,
    float0: '0.0',
    float1: '1.0',
    gl_Position: 'vec4(position, 1.0)',
    gl_PointSize: '1.0',
    gl_FragColor: 'vec4(0.5, 0.5, 0.5, 0.5)'
  },
  DATA_TYPES: {
    SAMPLER_2D: 'sampler2D',
    VEC4: 'vec4',
    VEC3: 'vec3',
    VEC2: 'vec2',
    FLOAT: 'float'
  }
}

// export const makeInputs = ({ wins }) => {
//   let win = getWin()
//   win.title = 'Inputs'
//   win.type = 'statement'
//   win.shaderType = `vertex`

//   win.inputs.push(
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'input', type: 'sampler2D', label: 'texture' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'input', type: 'float', label: 'speed' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'input', type: 'vec2', label: 'uv' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'input', type: 'vec3', label: 'position' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'input', type: 'vec4', label: 'color' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'input', type: 'mat4', label: 'projectionMatrix' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'input', type: 'mat4', label: 'modelViewMatrix' })
//   )

//   win.outputs.push(
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'output', type: 'sampler2D', label: 'texture' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'output', type: 'float', label: 'speed' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'output', type: 'vec2', label: 'uv' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'output', type: 'vec3', label: 'position' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'output', type: 'vec4', label: 'color' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'output', type: 'mat4', label: 'projectionMatrix' }),
//     getIO({ func: '', declare: '', spread: '', boxID: win._id, io: 'output', type: 'mat4', label: 'modelViewMatrix' })
//   )
//   win.hasUIs = `
//   `
//   win.func = `
//   `
//   win.spread = `
//   `
//   win.eval = `
//   `
//   win.isRoot = `
//   `

//   wins.push(win)

//   win.pos.w = 275
//   win.pos.h = 150
//   win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)

//   // win.pos.x = (wins.length - 1) * (win.pos.w + 10)
// }

// export const makeVertexInputs = ({ wins }) => {
//   let win = getWin()
//   win.title = 'Vertex Shader Output'
//   win.type = 'statement'
//   win.shaderType = NS.SHADER_TYPES.VERTEX
//   win.previewType = NS.PREVIEW_TYPES.VERTEX
//   win.preview = false

//   win.inputs.push(
//     getIO({ func: '', declare: '', defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' })
//   )

//   win.outputs.push(
//     // getIO({ func: '', declare: '', defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
//   )
//   win.hasUIs = `
//   `
//   win.func = `
//   `
//   win.spread = `
//   `
//   win.eval = `
//   `
//   win.isRoot = false

//   wins.push(win)

//   win.pos.w = 275
//   win.pos.h = 150

//   win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
// }

export const makeVertexRoot = ({ wins }) => {
  let win = getWin()
  win.title = 'Vertex Shader Output'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.VERTEX
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ argType: 'vec4', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
    getIO({ argType: 'float', arg: `newPtSize`, defaults: NS.DEFAULT_VALUES.gl_PointSize, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'gl_PointSize' })
  )

  win.outputs.push(
    // getIO({ defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = true
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)

  win.fnReturnType = 'void'
  win.fnID = getID()
  win.fnName = 'vertex_root'

  win.fnInner = `
  gl_Position = projectionMatrix * modelViewMatrix  * newPos;
  gl_PointSize = newPtSize;
`
  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)
}

export const makeUIMultiplyFloat = ({ wins }) => {
  let win = getWin()
  win.title = 'Float Multiply'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ argType: 'float', arg: `float1`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ argType: 'float', arg: `float2`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
  )

  win.outputs.push(
    getIO({ argType: 'float', arg: `float3`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 400

  win.fnReturnType = 'float'
  win.fnID = getID()
  win.fnName = 'multiply'
  win.fnInner = `
  return float1 * float2;
`

  return win
}

export const makeUIAdd = ({ wins }) => {
  let win = getWin()
  win.title = 'Float Add'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ argType: 'float', arg: `float1`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ argType: 'float', arg: `float2`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
  )

  win.outputs.push(
    getIO({ argType: 'float', arg: `float3`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 400

  win.fnReturnType = 'float'
  win.fnID = getID()
  win.fnName = 'add'
  win.fnInner = `
  return float1 + float2;
`

  return win
}

export const makeUIVector4 = ({ wins }) => {
  let win = getWin()
  win.title = 'Vector4 Input'
  win.type = 'vertexinput'

  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    // getIO({ argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
    // getIO({ defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = (win.pos.h + 10 + 120)

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = ``

  win.hasUIs = true
  win.uis = [
    {
      _id: getID(),
      type: 'ui-vec4',
      vari: 'vec4',
      name: 'vector4Value',
      value0: '0.5',
      value1: '0.5',
      value2: '0.5',
      value3: '1.0',
      outputID: win.outputs[0]._id,
      outputIDX: 0
    }
  ]

  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  return win
}

export const makeUIVector3 = ({ wins }) => {
  let win = getWin()
  win.title = 'Vector3 Input'
  win.type = 'vertexinput'

  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    // getIO({ argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
    // getIO({ defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = (win.pos.h + 10 + 120)

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = ``

  win.hasUIs = true
  win.uis = [
    {
      _id: getID(),
      type: 'ui-vec3',
      vari: 'vec3',
      name: 'vector3Value',
      value0: '0.5',
      value1: '0.5',
      value2: '0.5',
      outputID: win.outputs[0]._id,
      outputIDX: 0
    }
  ]

  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  return win
}

export const makeUIVector2 = ({ wins }) => {
  let win = getWin()
  win.title = 'Vector3 Input'
  win.type = 'vertexinput'

  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    // getIO({ argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
    // getIO({ defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = (win.pos.h + 10 + 120)

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = ``

  win.hasUIs = true
  win.uis = [
    {
      _id: getID(),
      type: 'ui-vec2',
      vari: 'vec2',
      name: 'vector2Value',
      value0: '0.5',
      value1: '0.5',
      outputID: win.outputs[0]._id,
      outputIDX: 0
    }
  ]

  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  return win
}

export const makeUINumber = ({ wins }) => {
  let win = getWin()
  win.title = 'Number Input'
  win.type = 'vertexinput'

  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    // getIO({ argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
    // getIO({ defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = (win.pos.h + 10 + 120)

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = ``

  win.hasUIs = true
  win.uis = [
    {
      _id: getID(),
      type: 'ui-float',
      vari: 'float',
      name: 'floatValue',
      value: '0.5',
      outputID: win.outputs[0]._id,
      outputIDX: 0
    }
  ]

  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  return win
}

export const makeSpreadV4 = ({ wins }) => {
  let win = getWin()
  win.title = 'Spread Vector 4'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  win.preview = false

  win.inputs.push(
    getIO({ argType: 'vec4', arg: `vec4Val`, spread: 'vec4Val', defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.outputs.push(
    getIO({ argType: 'float', arg: `float1`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ argType: 'float', arg: `float2`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ argType: 'float', arg: `float3`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ argType: 'float', arg: `float4`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
    // getIO({ defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.spread.push(
    {
      _id: getID(),
      type: 'sp-vec4',
      winID: win._id,
      outputID: win.outputs[0]._id,
      outputIDX: 0,
      vari: 'float',
      name: 'f0'
    },
    {
      _id: getID(),
      type: 'sp-vec4',
      winID: win._id,
      outputID: win.outputs[1]._id,
      outputIDX: 1,
      vari: 'float',
      name: 'f1'
    },
    {
      _id: getID(),
      type: 'sp-vec4',
      winID: win._id,
      outputID: win.outputs[2]._id,
      outputIDX: 2,
      vari: 'float',
      name: 'f2'
    },
    {
      _id: getID(),
      type: 'sp-vec4',
      winID: win._id,
      outputID: win.outputs[3]._id,
      outputIDX: 3,
      vari: 'float',
      name: 'f3'
    }
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = `
  `
}

export const makeSpreadV3 = ({ wins }) => {
  let win = getWin()
  win.title = 'Spread Vector 3'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  win.preview = false

  win.inputs.push(
    getIO({ argType: 'vec3', arg: `vec3Val`, spread: 'vec3Val', defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
  )

  win.outputs.push(
    getIO({ argType: 'float', arg: `float1`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ argType: 'float', arg: `float2`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ argType: 'float', arg: `float3`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
    // getIO({ defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.spread.push(
    {
      _id: getID(),
      type: 'sp-vec3',
      winID: win._id,
      outputID: win.outputs[0]._id,
      outputIDX: 0,
      vari: 'float',
      name: 'f0'
    },
    {
      _id: getID(),
      type: 'sp-vec3',
      winID: win._id,
      outputID: win.outputs[1]._id,
      outputIDX: 1,
      vari: 'float',
      name: 'f1'
    },
    {
      _id: getID(),
      type: 'sp-vec3',
      winID: win._id,
      outputID: win.outputs[2]._id,
      outputIDX: 2,
      vari: 'float',
      name: 'f2'
    }
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = `
  `
}

export const makeSpreadV2 = ({ wins }) => {
  let win = getWin()
  win.title = 'Spread Vector 2'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  win.preview = false

  win.inputs.push(
    getIO({ argType: 'vec2', arg: `vec2Val`, spread: 'vec2Val', defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
  )

  win.outputs.push(
    getIO({ argType: 'float', arg: `float1`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ argType: 'float', arg: `float2`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
    // getIO({ defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.spread.push(
    {
      _id: getID(),
      type: 'sp-vec2',
      winID: win._id,
      outputID: win.outputs[0]._id,
      outputIDX: 0,
      vari: 'float',
      name: 'f0'
    },
    {
      _id: getID(),
      type: 'sp-vec2',
      winID: win._id,
      outputID: win.outputs[1]._id,
      outputIDX: 1,
      vari: 'float',
      name: 'f1'
    }
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = `
  `
}

export const makeFragmentRoot = ({ wins }) => {
  let win = getWin()
  win.title = 'Fragment Shader Output'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.FRAGMENT
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ argType: 'vec4', arg: `outputColor`, defaults: NS.DEFAULT_VALUES.gl_FragColor, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_FragColor' })
  )

  win.outputs.push(
    // getIO({ func: '', declare: '', defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = true
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  win.fnReturnType = 'void'
  win.fnID = getID()
  win.fnName = 'fragment_root'
  win.fnInner = `
  gl_FragColor = outputColor;
`
}

export const makeMergeV4 = ({ wins }) => {
  let win = getWin()
  win.title = 'Merge 4 Output'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ argType: 'float', arg: `merge1`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'x' }),
    getIO({ argType: 'float', arg: `merge2`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'y' }),
    getIO({ argType: 'float', arg: `merge3`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'z' }),
    getIO({ argType: 'float', arg: `merge4`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'w' })
  )

  win.outputs.push(
    getIO({ argType: 'float', arg: `vec4`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0

  win.fnReturnType = 'vec4'
  win.fnID = getID()
  win.fnName = 'merge_vec4'
  win.fnInner = `
  return vec4(merge1, merge2, merge3, merge4);
`
}

export const makePreviwBox = ({ wins }) => {
  let win = getWin()
  win.title = 'Shader Preview Box'
  win.type = 'preview-box'
  win.shaderType = 'preview-box'
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  // win.boxLogicType = 'module'
  win.preview = true

  win.inputs.push(
  )
  win.outputs.push(
  )
  // getIO({ func: '', declare: '', defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })

  win.resize = true
  win.isRoot = true
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = (wins.length - 1) * (win.pos.w + 10)
}
export const getArgs = ({ win, wins, connections, depsConn = [] }) => {
  let args = ``

  let str = ({ inp }) => {
    let defaults = inp.defaults

    let foundConnection = connections.find(c => c.input._id === inp._id)
    if (foundConnection) {
      let remoteBoxID = foundConnection.output.boxID

      // let localBoxID = foundConnection.input.boxID
      // let currentDep = depsConn.find(con => con.output.boxID === remoteBoxID)
      // let localBox = wins.find(w => w._id === localBoxID)

      let remoteBox = wins.find(w => w._id === remoteBoxID)
      let remoteOutputIdx = foundConnection.output.uisIndex

      if (remoteBox) {
        if (remoteOutputIdx) {
          let uis = remoteBox.uis[remoteOutputIdx]
          let val = `${uis.name}${uis._id}`
          return `${val || defaults}`
        } else if (remoteBox.fnReturnType && remoteBox.fnReturnType !== 'void') {
          let w = remoteBox
          return `winval${w._id}`
        } else if (depsConn.length > 0 && remoteBox.uis) {
          let w = foundConnection.output
          let uis = remoteBox.uis.find(u => w._id === u.outputID)

          // foundConnection.output

          return `${uis.name}${uis._id}`
        } else if (depsConn.length > 0 && remoteBox.spread) {
          let w = foundConnection.output
          let uis = remoteBox.spread.find(u => w._id === u.outputID)

          // foundConnection.output

          return `${uis.name}${uis._id}`
        } else {
          return `${defaults}`
        }
      } else {
        return `${defaults}`
      }
    } else {
      return `${defaults}`
    }
  }

  let spreader = ({ spread }) => {
    return `${spread.vari} ${spread.name}${spread._id}`
  }

  win.inputs.forEach((inp, idx) => {
    if (idx === 0) {
      args += `${str({ inp, idx })}`
    } else {
      args += `, ${str({ inp, idx })} `
    }
  })

  win.spreads = win.spreads || []
  win.spreads.forEach((spread, idx) => {
    if (idx === 0) {
      args += `${spreader({ spread, idx })}`
    } else {
      args += `, ${spreader({ spread, idx })} `
    }
  })

  return args
}

export const getFnArgs = ({ win, wins, connections }) => {
  let args = ``
  win.inputs.forEach((inp, i) => {
    if (i === 0) {
      args += `in ${inp.argType} ${inp.arg}`
    } else {
      args += `, in ${inp.argType} ${inp.arg} `
    }
  })

  win.spread = win.spread || []
  win.spread.forEach((sp, i) => {
    if (i === 0) {
      args += `out ${sp.vari} ${sp.name}`
    } else {
      args += `, out ${sp.vari} ${sp.name}`
    }
  })
  return args
}

export const makeFunc = ({ win, wins, connections }) => {
  let fnReturnType = win.fnReturnType
  if (!fnReturnType) {
    return ``
  }

  let fnName = win.fnName
  let fnID = win.fnID
  let fnInner = win.fnInner
  let fnArgs = getFnArgs({ win, wins, connections })
  return `
${fnReturnType} ${fnName}${fnID} (${fnArgs}) {
  ${fnInner}
}
`
}

export const makeSpreadStr = ({ win, wins, connections }) => {
  let str = ``

  let hasSpread = win.spread.length > 0
  if (hasSpread) {
    let spread = win.spread
    let firstInput = win.inputs[0]

    let foundConnection = connections.find(c => c.input._id === firstInput._id)

    // let localBoxID = foundConnection.input.boxID
    // let currentDep = depsConn.find(con => con.output.boxID === remoteBoxID)
    // let localBox = wins.find(w => w._id === localBoxID)

    if (foundConnection) {
      let remoteBoxID = foundConnection.output.boxID
      let remoteBox = wins.find(w => w._id === remoteBoxID)
      let remoteOutputIdx = foundConnection.output.uisIndex
      if (remoteBox.fnReturnType && remoteBox.fnReturnType !== 'void') {
        let w = remoteBox
        return `winval${w._id}`
      } else if (remoteBox && remoteBox.hasUIs) {
        let hasUIs = remoteBox.hasUIs
        if (hasUIs) {
          let uis = remoteBox.uis[remoteOutputIdx]
          if (uis) {
            str += `${firstInput.argType} ${firstInput.spread}${firstInput._id} = ${uis.name}${uis._id};\n`
          }
        } else {
          str += `${firstInput.argType} ${firstInput.spread}${firstInput._id} = ${firstInput.defaults};\n`
        }
      }
    } else {
      str += `${firstInput.argType} ${firstInput.spread}${firstInput._id} = ${firstInput.defaults};\n`
    }

    spread.forEach((ui, idx) => {
      if (idx === 0) {
        str += `  ${ui.vari} ${ui.name}${ui._id} = ${firstInput.arg}${firstInput._id}.x; \n`
      } else if (idx === 1) {
        str += `  ${ui.vari} ${ui.name}${ui._id} = ${firstInput.arg}${firstInput._id}.y; \n`
      } else if (idx === 2) {
        str += `  ${ui.vari} ${ui.name}${ui._id} = ${firstInput.arg}${firstInput._id}.z; \n`
      } else if (idx === 3) {
        str += `  ${ui.vari} ${ui.name}${ui._id} = ${firstInput.arg}${firstInput._id}.w; \n`
      }

      // if (ui.type === 'sp-vec4') {
      // } else if (ui.type === 'sp-vec3') {
      //   str += `${ui.vari} ${ui.name}${ui._id} = vec3(${ui.value0}, ${ui.value1}, ${ui.value2}); \n`
      // } else if (ui.type === 'sp-vec2') {
      //   str += `${ui.vari} ${ui.name}${ui._id} = vec2(${ui.value0}, ${ui.value1}); \n`
      // }
    })
    return `${str}`
  }
  return `${str}`
}

export const makeStatements = ({ win, wins, connections }) => {
  let str = ``
  let hasUIs = win.hasUIs
  if (hasUIs) {
    let uis = win.uis
    uis.forEach((ui) => {
      if (ui.type === 'ui-float') {
        str += `${ui.vari} ${ui.name}${ui._id} = ${ui.value}; \n`
      } else if (ui.type === 'ui-vec4') {
        str += `${ui.vari} ${ui.name}${ui._id} = vec4(${ui.value0}, ${ui.value1}, ${ui.value2}, ${ui.value3}); \n`
      } else if (ui.type === 'ui-vec3') {
        str += `${ui.vari} ${ui.name}${ui._id} = vec3(${ui.value0}, ${ui.value1}, ${ui.value2}); \n`
      } else if (ui.type === 'ui-vec2') {
        str += `${ui.vari} ${ui.name}${ui._id} = vec2(${ui.value0}, ${ui.value1}); \n`
      }
    })
    return `${str}`
  }

  return `${str}`
}

export const rGetTree = ({ root, bucket, wins, connections }) => {
  let fragment = {}
  fragment.origin = root
  fragment.depsConn = connections.filter(c => root._id === c.input.boxID)
  bucket.push(fragment)

  if (fragment.depsConn.length === 0) {
  } else {
    fragment.depsConn.forEach((con) => {
      let rootID = con.output.boxID
      let root = wins.find(w => w._id === rootID)
      rGetTree({ root, bucket, wins, connections })
    })
  }
}

export const getDepTree = ({ wins, connections, sType }) => {
  let vwins = wins.filter(w => w.shaderType === sType || w.shaderType === NS.SHADER_TYPES.BOTH)
  let vroot = vwins.filter(v => v.isRoot)
  let bucket = []
  vroot.forEach((root) => {
    rGetTree({ root, bucket, wins, connections })
  })
  // console.log(bucket)
  return bucket
}

export const getShaderCode = ({ wins, connections, shaderType }) => {
  let uis = ``

  let vwins = wins.filter(w => w.shaderType === shaderType || w.shaderType === NS.SHADER_TYPES.BOTH)

  vwins.forEach((win) => {
    uis += makeStatements({ win, wins, connections })
  })

  let functions = ``
  vwins.forEach((win) => {
    functions += `${makeFunc({ win, wins, connections })}`
  })

  let levels = getDepTree({ wins, connections, sType: shaderType })
  let depExecs = ``
  let map = new Map()
  levels.slice().reverse().forEach((lvl) => {
    let win = lvl.origin
    win.spread = win.spread || {}
    let isSpread = win.spread.length > 0
    if (win.fnReturnType || isSpread) {
      let args = getArgs({ win: win, wins, connections, depsConn: lvl.depsConn })
      if (win.fnReturnType && win.fnReturnType !== 'void') {
        depExecs += `  ${win.fnReturnType} winval${win._id} = ${win.fnName}${win.fnID}(${args});\n`
      } else if (isSpread) {
        if (!map.has(win._id + shaderType)) {
          map.set(win._id + shaderType, win)
          depExecs += `  ${makeSpreadStr({ win, wins, connections })}\n`
        }
      } else {
        depExecs += `  ${win.fnName}${win.fnID}(${args});\n`
      }
    }
    // console.log(lvl.origin)
  })

  let main = `
void main (void) {
${depExecs}
}
`

  return `
${uis}
${functions}
${main}
  `
}

// export const getFragmentCode = ({ wins, connections }) => {
//   let delcares = ``

//   let fwins = wins.filter(w => w.shaderType === NS.SHADER_TYPES.FRAGMENT || w.shaderType === NS.SHADER_TYPES.BOTH)

//   fwins.forEach((win) => {
//     delcares += win.hasUIs
//   })

//   let functions = ``
//   fwins.forEach((win) => {
//     functions += `${makeFunc({ win, wins, connections })}`
//   })

//   let getRootCalls = fwins.filter(w => w.isRoot)

//   // console.log(getRootCalls)
//   let rootCalls = ``
//   getRootCalls.forEach((rc) => {
//     if (!rc.fnReturnType) {
//       return
//     }
//     let args = getArgs({ win: rc, wins, connections })
//     rootCalls += `${rc.fnName}${rc.fnID}(${args});`
//   })

//   let main = `
// void main (void) {
//   ${rootCalls}
// }
// `

//   return `
//     ${delcares}
//     ${functions}
//     ${main}
//   `
// }

export const getCode = ({ wins, connections = [] }) => {
  // console.log(connections)
  return {
    vertexShader: getShaderCode({ wins, connections, shaderType: NS.SHADER_TYPES.VERTEX }),
    fragmentShader: getShaderCode({ wins, connections, shaderType: NS.SHADER_TYPES.FRAGMENT })
    // fragmentShader: getFragmentCode({ wins, connections })
    //     `void main (void) {
    //   gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0);
    // }`//
  }
}
