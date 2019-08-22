import { NS } from './age'

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

export const makeSpreadStr = ({ win, wins, connections, args }) => {
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

      if (remoteBox && remoteBox.hasUIs) {
        let hasUIs = remoteBox.hasUIs
        if (hasUIs) {
          let uis = remoteBox.uis[remoteOutputIdx]
          if (uis) {
            str += `${firstInput.argType} ${firstInput.spread}${firstInput._id} = ${uis.name}${uis._id};\n`
          }
        } else {
          str += `${firstInput.argType} ${firstInput.spread}${firstInput._id} = ${firstInput.defaults};\n`
        }
      } else if (remoteBox && remoteBox.isVarying) {
        str += `${firstInput.argType} ${firstInput.spread}${firstInput._id} = ${remoteBox.variName}${remoteBox.variID};\n`
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
  let varying = ``
  vwins.forEach((win) => {
    uis += makeStatements({ win, wins, connections })
  })
  vwins.forEach((win) => {
    if (win.isVarying && win.shaderType === shaderType) {
      varying += `varying ${win.variType} ${win.variName}${win.variID};\n`
    }
  })

  let functions = ``
  vwins.forEach((win) => {
    functions += `${makeFunc({ win, wins, connections })}`
  })

  let levels = getDepTree({ wins, connections, sType: shaderType })
  let depExecs = ``
  let spreadMap = new Map()
  let varyingMap = new Map()
  levels.slice().reverse().forEach((lvl) => {
    let win = lvl.origin
    win.spread = win.spread || {}
    let isSpread = win.spread.length > 0
    if (win.fnReturnType || isSpread) {
      let args = getArgs({ win: win, wins, connections, depsConn: lvl.depsConn })
      if (win.fnReturnType && win.fnReturnType !== 'void') {
        if (win.isVarying) {
          if (win.shaderType === shaderType && !varyingMap.has(win._id + shaderType)) {
            varyingMap.set(win._id + shaderType, true)
            depExecs += `  ${win.fnReturnType} winval${win._id} = ${win.fnName}${win.fnID}(${args});\n`
          }
        } else {
          depExecs += `  ${win.fnReturnType} winval${win._id} = ${win.fnName}${win.fnID}(${args});\n`
        }
      } else if (isSpread) {
        if (!spreadMap.has(win._id + shaderType)) {
          spreadMap.set(win._id + shaderType, win)
          // depExecs += `  ${win.fnReturnType} winval${win._id} = ${win.fnName}${win.fnID}(${args});\n`
          depExecs += `  ${makeSpreadStr({ win, wins, connections, args })}\n`
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
${varying}
${uis}
${functions}
${main}
  `
}

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
