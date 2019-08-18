// import Vue from 'vue'

export const getDOM = async ({ domID }) => {
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

export const getIO = ({ boxID, io = 'output', type = 'sampler2D', label = 'Happy' }) => {
  return {
    _id: getID(),
    boxID,
    io,
    type,
    label
  }
}

export const getWin = () => {
  return {
    _id: getID(),
    title: '',
    type: '',
    transition: '',
    order: 0,
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

    ]
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