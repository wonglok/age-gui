import { getID, NS } from './age'

export const getIO = (args) => {
  return {
    ...args,
    _id: getID()
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

export const makeAttributPosition = ({ wins }) => {
  let win = getWin()
  win.title = 'Vertex Shader Position Attbitue'
  win.type = 'red'
  win.shaderType = NS.SHADER_TYPES.VERTEX
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    // getIO({ shader: win.shaderType, argType: 'vec4', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
    // getIO({ shader: win.shaderType, argType: 'float', arg: `newPtSize`, defaults: NS.DEFAULT_VALUES.gl_PointSize, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'gl_PointSize' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `newPos`, defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'position' })
  )

  win.isRoot = true
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)

  win.fnReturnType = 'vec3'
  win.fnID = getID()
  win.fnName = 'vertex_attribute'

  win.fnInner = `
  return position;
`
  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  return win
}

export const makeVertexRoot = ({ wins }) => {
  let win = getWin()
  win.title = 'Vertex Shader Output'
  win.type = 'yellow'
  win.shaderType = NS.SHADER_TYPES.VERTEX
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `newPtSize`, defaults: NS.DEFAULT_VALUES.gl_PointSize, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'gl_PointSize' })
  )

  win.outputs.push(
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = true
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)

  win.fnReturnType = 'void'
  win.fnID = getID()
  win.fnName = 'vertex_root'

  win.fnInner = `
  gl_Position = projectionMatrix * modelViewMatrix  * newPos;
  gl_PointSize = newPtSize;
`
  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  return win
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
    getIO({ shader: win.shaderType, argType: 'float', arg: `float1`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `float2`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `float3`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = 'float'
  win.fnID = getID()
  win.fnName = 'multiply'
  win.fnInner = `
  return float1 * float2;
`

  return win
}

export const makeUIMultiplyVec4 = ({ wins }) => {
  let win = getWin()
  win.title = 'Multiply Vector 4'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4_1`, defaults: NS.DEFAULT_VALUES.VEC4_MIX, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' }),
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4_2`, defaults: NS.DEFAULT_VALUES.VEC4_MIX, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4`, defaults: NS.DEFAULT_VALUES.VEC4_MIX, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = 'vec4'
  win.fnID = getID()
  win.fnName = 'multiply'
  win.fnInner = `
  return vec4_1 * vec4_2;
`

  return win
}

export const makeUIMultiplyVec3 = ({ wins }) => {
  let win = getWin()
  win.title = 'Multiply Vector 3'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3_1`, defaults: NS.DEFAULT_VALUES.VEC3_MIX, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' }),
    getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3_2`, defaults: NS.DEFAULT_VALUES.VEC3_MIX, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3`, defaults: NS.DEFAULT_VALUES.VEC3_MIX, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = 'vec3'
  win.fnID = getID()
  win.fnName = 'multiply'
  win.fnInner = `
  return vec3_1 * vec3_2;
`

  return win
}

export const makeUIMultiplyVec2 = ({ wins }) => {
  let win = getWin()
  win.title = 'Multiply Vector 2'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2_1`, defaults: NS.DEFAULT_VALUES.VEC2_MIX, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' }),
    getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2_2`, defaults: NS.DEFAULT_VALUES.VEC2_MIX, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2`, defaults: NS.DEFAULT_VALUES.VEC2_MIX, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = 'vec2'
  win.fnID = getID()
  win.fnName = 'multiply'
  win.fnInner = `
  return vec2_1 * vec2_2;
`

  return win
}

export const makeTextureReader = ({ wins }) => {
  let win = getWin()
  win.title = '2D Texture Reader'
  win.type = 'texture-reader'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.resize = false
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'sampler2D', arg: `sampler2D_value`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.SAMPLER2D, label: 'sampler2D' }),
    getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2_value`, defaults: NS.DEFAULT_VALUES.VEC2_MIX, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4`, defaults: NS.DEFAULT_VALUES.VEC4_MIX, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = 'vec4'
  win.fnID = getID()
  win.fnName = 'textureReader'
  win.fnInner = `
  return texture2D(sampler2D_value, vec2_value);
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
    getIO({ shader: win.shaderType, argType: 'float', arg: `float1`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `float2`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `float3`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

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
    // getIO({ shader: win.shaderType, argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

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
    // getIO({ shader: win.shaderType, argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

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
    // getIO({ shader: win.shaderType, argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

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
    // getIO({ shader: win.shaderType, argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

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

export const makeUniformTimer = ({ wins }) => {
  let win = getWin()
  win.title = 'Uniform Float'
  win.type = 'green'

  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    // getIO({ shader: win.shaderType, argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = ``

  win.hasUniforms = true
  win.uniforms = [
    {
      _id: getID(),
      type: 'ui-float',
      uniType: 'timer',
      vari: 'float',
      name: 'iTime',
      value: '0.5',
      outputID: win.outputs[0]._id,
      outputIDX: 0
    }
  ]

  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  return win
}

export const makeUniformResolution = ({ wins }) => {
  let win = getWin()
  win.title = 'Uniform Vector2 Resolution'
  win.type = 'green'

  win.shaderType = NS.SHADER_TYPES.FRAGMENT
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    // getIO({ shader: win.shaderType, argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' }),
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = ``

  win.hasUniforms = true
  win.uniforms = [
    {
      _id: getID(),
      type: 'ui-vec2',
      uniType: 'resolution',
      vari: 'vec2',
      name: 'iResolution',
      // value: 'vec2(512.0, 512.0)',
      outputID: win.outputs[0]._id,
      outputIDX: 0
    }
  ]

  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  return win
}

export const makeUniformTexture = ({ wins }) => {
  let win = getWin()
  win.title = 'Uniform Texture'
  win.type = 'green'

  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = true
  win.resize = true
  // win.boxLogicType = 'module'

  win.inputs.push(
    // getIO({ shader: win.shaderType, argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.SAMPLER2D, label: 'sampler2D' }),
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.SAMPLER2D, label: 'sampler2D' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = ``

  win.hasUniforms = true
  win.isTexture = true
  win.uniforms = [
    {
      _id: getID(),
      type: 'ui-sampler2D',
      uniType: 'sampler2D',
      vari: 'sampler2D',
      name: 'iTexture',
      url: '',
      outputID: win.outputs[0]._id,
      outputIDX: 0
    }
  ]

  // win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  return win
}

export const makeUniformAudioHistory = ({ wins }) => {
  let win = getWin()
  win.title = 'Uniform AudioHistory'
  win.type = 'green'

  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.VERTEX
  win.preview = true
  win.resize = true
  // win.boxLogicType = 'module'

  win.inputs.push(
    // getIO({ shader: win.shaderType, argType: 'vec3', arg: `newPos`, defaults: NS.DEFAULT_VALUES.gl_Position, spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_Position' }),
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.SAMPLER2D, label: 'sampler2D' }),
    getIO({ shader: win.shaderType, uisIndex: 0, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.SAMPLER2D, label: 'sampler2D' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = ``

  win.hasUniforms = true
  win.isAudio = true
  win.uniforms = [
    {
      _id: getID(),
      type: 'audio-sampler2D',
      uniType: 'sampler2D-audio',
      vari: 'sampler2D',
      name: 'iAudio',
      url: '',
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
  win.resize = true

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `spreadVec4`, spread: 'spreadVec4', defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `float1`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `float2`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `float3`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `float4`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
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

  win.isRoot = true
  wins.push(win)

  win.pos.w = 150
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = `
  `
  return win
}

export const makeSpreadV3 = ({ wins }) => {
  let win = getWin()
  win.title = 'Spread Vector 3'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  win.preview = false
  win.resize = true

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec3', arg: `spreadVec3`, spread: 'spreadVec3', defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `float1`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `float2`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `float3`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.FLOAT, label: 'float' })
    // getIO({ shader: win.shaderType, defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec3', label: 'gl_FragCoord' })
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

  win.isRoot = true
  wins.push(win)

  win.pos.w = 150
  win.pos.h = 150
  win.pos.y = 0

  win.fnReturnType = ''
  win.fnID = getID()
  win.fnName = ''
  win.fnInner = `
  `
  return win
}

export const makeFragmentRoot = ({ wins }) => {
  let win = getWin()
  win.title = 'Fragment Shader Output'
  win.type = 'fragment'
  win.shaderType = NS.SHADER_TYPES.FRAGMENT
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `outputColor`, defaults: NS.DEFAULT_VALUES.gl_FragColor, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'gl_FragColor' })
  )

  win.outputs.push(
    // getIO({ shader: win.shaderType, func: '', declare: '', defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })
  )

  win.isRoot = true
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = (wins.length - 1) * (win.pos.w + 10)

  win.fnReturnType = 'void'
  win.fnID = getID()
  win.fnName = 'fragment_root'
  win.fnInner = `
  gl_FragColor = outputColor;
`
  return win
}

export const makeVertexFunction = ({ wins }) => {
  let win = getWin()
  win.title = 'Vertex Function'
  win.type = 'custom-function'
  win.shaderType = NS.SHADER_TYPES.VERTEX
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4_a`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' }),
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4_b`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `vec4`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0
  win.fnExt = ''
  win.fnReturnType = 'vec4'
  win.fnID = getID()
  win.fnName = 'fn_vec4'
  win.fnInner = `
  return vec4_a + vec4_b;
`

  return win
}

export const addInputToFunction = ({ win }) => {
  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4_` + win.inputs.length, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )
}

export const makeFragmentFunction = ({ wins }) => {
  let win = getWin()
  win.title = 'Fragment Function'
  win.type = 'custom-function'
  win.shaderType = NS.SHADER_TYPES.FRAGMENT
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4_a`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' }),
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4_b`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `vec4`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0

  win.fnExt = ''
  win.fnReturnType = 'vec4'
  win.fnID = getID()
  win.fnName = 'fn_vec4'
  win.fnInner = `
  return vec4_a + vec4_b;
`

  return win
}

export const makeDuplicateV4 = ({ wins }) => {
  let win = getWin()
  win.title = 'Duplicate Vector 4 Output'
  win.type = 'red'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4input`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' }),
    getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0

  win.isDuplicate = true

  win.fnReturnType = 'vec4'
  win.fnID = getID()
  win.fnName = 'duplicate_v4'
  win.fnInner = `
    return vec4input;
  `

  return win
}

export const makeDuplicateV3 = ({ wins }) => {
  let win = getWin()
  win.title = 'Duplicate Vector 3 Output'
  win.type = 'red'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3input`, defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3`, defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' }),
    getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3`, defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0

  win.isDuplicate = true

  win.fnReturnType = 'vec3'
  win.fnID = getID()
  win.fnName = 'duplicate_v3'
  win.fnInner = `
    return vec3input;
  `

  return win
}

export const makeDuplicateV2 = ({ wins }) => {
  let win = getWin()
  win.title = 'Duplicate Vector 2 Output'
  win.type = 'red'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2input`, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2`, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' }),
    getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2`, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0

  win.isDuplicate = true

  win.fnReturnType = 'vec2'
  win.fnID = getID()
  win.fnName = 'duplicate_v2'
  win.fnInner = `
    return vec2input;
  `

  return win
}

export const makeDuplicateFloat = ({ wins }) => {
  let win = getWin()
  win.title = 'Duplicate Float Output'
  win.type = 'red'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `floatinput`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC2, label: 'float' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `float`, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'float' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `float`, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'float' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0

  win.isDuplicate = true

  win.fnReturnType = 'float'
  win.fnID = getID()
  win.fnName = 'duplicate_float'
  win.fnInner = `
    return floatinput;
  `

  return win
}

export const makeMergeV4 = ({ wins }) => {
  let win = getWin()
  win.title = 'Merge 4 Output'
  win.type = 'merge'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `merge1`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'x' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `merge2`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'y' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `merge3`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'z' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `merge4`, defaults: NS.DEFAULT_VALUES.float1, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'w' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `vec4`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 150
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0

  win.fnReturnType = 'vec4'
  win.fnID = getID()
  win.fnName = 'merge_vec4'
  win.fnInner = `
  return vec4(merge1, merge2, merge3, merge4);
`

  return win
}

export const makeMergeV3 = ({ wins }) => {
  let win = getWin()
  win.title = 'Merge 3 Output'
  win.type = 'output'
  win.shaderType = NS.SHADER_TYPES.BOTH
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  win.preview = false
  // win.boxLogicType = 'module'

  win.inputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `merge1`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'x' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `merge2`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'y' }),
    getIO({ shader: win.shaderType, argType: 'float', arg: `merge3`, defaults: NS.DEFAULT_VALUES.float0, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.FLOAT, label: 'z' })
  )

  win.outputs.push(
    getIO({ shader: win.shaderType, argType: 'float', arg: `vec3`, defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
  )

  win.isRoot = false
  wins.push(win)

  win.pos.w = 150
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0

  win.fnReturnType = 'vec3'
  win.fnID = getID()
  win.fnName = 'merge_vec3'
  win.fnInner = `
  return vec3(merge1, merge2, merge3);
`

  return win
}

export const makeVaryingV4 = ({ wins }) => {
  let variID = getID()
  let vertexWindow = () => {
    let win = getWin()
    win.title = 'Varying Vector 4 (Vertex Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.VERTEX
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
      getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4Input`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
    )

    win.outputs.push(
    )

    win.isRoot = true
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec4`
    win.variName = `varying_v4_value`
    win.variID = variID

    win.fnReturnType = 'void'
    win.fnID = getID()
    win.fnName = 'vec4_varying_setter'
    win.fnInner = `
  ${win.variName}${variID} = vec4Input;
  `

    return win
  }
  let fragmentWindow = () => {
    let win = getWin()
    win.title = 'Varying Vector 4 (Fragment Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.FRAGMENT
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
    )

    win.outputs.push(
      getIO({ shader: win.shaderType, argType: 'vec4', arg: `vec4Input`, defaults: NS.DEFAULT_VALUES.VEC4, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4, label: 'vec4' })
    )

    win.isRoot = false
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec4`
    win.variName = `varying_v4_value`
    win.variID = variID

    win.fnReturnType = 'vec4'
    win.fnID = getID()
    win.fnName = 'vec4_varying_getter'
    win.fnInner = `
    return ${win.variName}${variID};
  `

    return win
  }
  return {
    hasBoth: true,
    vertex: vertexWindow(),
    fragment: fragmentWindow()
  }
}

export const makeVaryingV3 = ({ wins }) => {
  let variID = getID()
  let vertexWindow = () => {
    let win = getWin()
    win.title = 'Varying Vector 3 (Vertex Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.VERTEX
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
      getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3Input`, defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
    )

    win.outputs.push(
    )

    win.isRoot = true
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec3`
    win.variName = `varying_v3_value`
    win.variID = variID

    win.fnReturnType = 'void'
    win.fnID = getID()
    win.fnName = 'vec3_varying_setter'
    win.fnInner = `
  ${win.variName}${variID} = vec3Input;
  `

    return win
  }
  let fragmentWindow = () => {
    let win = getWin()
    win.title = 'Varying Vector 3 (Fragment Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.FRAGMENT
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
    )

    win.outputs.push(
      getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3Input`, defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
    )

    win.isRoot = false
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec3`
    win.variName = `varying_v3_value`
    win.variID = variID

    win.fnReturnType = 'vec3'
    win.fnID = getID()
    win.fnName = 'vec3_varying_getter'
    win.fnInner = `
    return ${win.variName}${variID};
  `

    return win
  }
  return {
    hasBoth: true,
    vertex: vertexWindow(),
    fragment: fragmentWindow()
  }
}

export const makeVaryingV2 = ({ wins }) => {
  let variID = getID()
  let vertexWindow = () => {
    let win = getWin()
    win.title = 'Varying Vector 2 (Vertex Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.VERTEX
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
      getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2Input`, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
    )

    win.outputs.push(
    )

    win.isRoot = true
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec2`
    win.variName = `varying_v2_value`
    win.variID = variID

    win.fnReturnType = 'void'
    win.fnID = getID()
    win.fnName = 'vec2_varying_setter'
    win.fnInner = `
  ${win.variName}${variID} = vec2Input;
  `
    return win
  }

  let fragmentWindow = () => {
    let win = getWin()
    win.title = 'Varying Vector 2 (Fragment Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.FRAGMENT
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
    )

    win.outputs.push(
      getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2Input`, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
    )

    win.isRoot = false
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec2`
    win.variName = `varying_v2_value`
    win.variID = variID

    win.fnReturnType = 'vec2'
    win.fnID = getID()
    win.fnName = 'vec2_varying_getter'
    win.fnInner = `
    return ${win.variName}${variID};
  `
    return win
  }

  return {
    hasBoth: true,
    vertex: vertexWindow(),
    fragment: fragmentWindow()
  }
}

export const makeVaryingV2UV = ({ wins }) => {
  let variID = getID()
  let vertexWindow = () => {
    let win = getWin()
    win.title = 'Varying UV Vector2 (Vertex Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.VERTEX
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
    )

    win.outputs.push(
      getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2Input`, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
    )

    win.isRoot = true
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec2`
    win.variName = `varying_v2_value`
    win.variID = variID

    win.fnReturnType = 'vec2'
    win.fnID = getID()
    win.fnName = 'vec2_varying_setter_getter'
    win.fnInner = `
  ${win.variName}${variID} = uv;

  return uv;

  `
    return win
  }

  let fragmentWindow = () => {
    let win = getWin()
    win.title = 'Varying Vector 2 (Fragment Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.FRAGMENT
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
    )

    win.outputs.push(
      getIO({ shader: win.shaderType, argType: 'vec2', arg: `vec2Input`, defaults: NS.DEFAULT_VALUES.VEC2, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC2, label: 'vec2' })
    )

    win.isRoot = false
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec2`
    win.variName = `varying_v2_value`
    win.variID = variID

    win.fnReturnType = 'vec2'
    win.fnID = getID()
    win.fnName = 'vec2_varying_getter'
    win.fnInner = `
    return ${win.variName}${variID};
  `
    return win
  }

  return {
    hasBoth: true,
    vertex: vertexWindow(),
    fragment: fragmentWindow()
  }
}

export const makeVaryingV3Noraml = ({ wins }) => {
  let variID = getID()
  let vertexWindow = () => {
    let win = getWin()
    win.title = 'Varying Normal-V3 (Vertex Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.VERTEX
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
    )

    win.outputs.push(
      getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3Input`, defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
    )

    win.isRoot = true
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec3`
    win.variName = `varying_v3_value`
    win.variID = variID

    win.fnReturnType = 'vec3'
    win.fnID = getID()
    win.fnName = 'vec3_varying_setter_getter'
    win.fnInner = `
  ${win.variName}${variID} = normal;

  return normal;

  `
    return win
  }

  let fragmentWindow = () => {
    let win = getWin()
    win.title = 'Varying Normal V3 (Fragment Shader)'
    win.type = 'purple'
    win.shaderType = NS.SHADER_TYPES.FRAGMENT
    // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
    win.preview = false
    // win.boxLogicType = 'module'

    win.inputs.push(
    )

    win.outputs.push(
      getIO({ shader: win.shaderType, argType: 'vec3', arg: `vec3Input`, defaults: NS.DEFAULT_VALUES.VEC3, boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC3, label: 'vec3' })
    )

    win.isRoot = false
    wins.push(win)

    win.pos.w = 275
    win.pos.h = 150
    // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
    win.pos.x = 0
    win.pos.y = 0

    win.isVarying = true
    win.variType = `vec3`
    win.variName = `varying_v3_value`
    win.variID = variID

    win.fnReturnType = 'vec3'
    win.fnID = getID()
    win.fnName = 'vec3_varying_getter'
    win.fnInner = `
    return ${win.variName}${variID};
  `
    return win
  }

  return {
    hasBoth: true,
    vertex: vertexWindow(),
    fragment: fragmentWindow()
  }
}

export const makePreviwBox = ({ wins }) => {
  let win = getWin()
  win.title = 'Shader Preview Box'
  win.type = 'preview-box'
  win.shaderType = 'preview-box'
  win.previewType = 'material'
  // win.previewType = NS.PREVIEW_TYPES.FRAGMENT
  // win.boxLogicType = 'module'
  win.preview = true

  win.inputs.push(
  )
  win.outputs.push(
  )

  // getIO({ shader: win.shaderType, func: '', declare: '', defaults: '', spread: '', boxID: win._id, io: NS.IO_TYPES.INPUT, type: 'vec4', label: 'gl_FragCoord' })

  win.resize = true
  win.isRoot = true
  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150
  // // win.pos.y = (wins.length - 1) * (win.pos.h + 10 + 200 + 120)
  win.pos.x = 0
  win.pos.y = 0

  return win
}
