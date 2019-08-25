// import Vue from 'vue'

export const BOX = require('./age-box.js')
export const GEN = require('./age-gen.js')
export const UI = require('./age-ui.js')
export const Shader = require('./age-shader.js')

/*
----------------------------------
----------------------------------
*/

export const NS = {
  SHADER_TYPES: {
    BOTH: 'both',
    VARYING_VERTEX: 'varying_vertex',
    VARYING_FRAGMENT: 'varying_fragment',
    VERTEX: 'vertexShader',
    FRAGMENT: 'fragmentShader'
  },
  IO_TYPES: {
    BOTH: 'both',
    INPUT: 'input',
    OUTPUT: 'output'
  },
  DEFAULT_VALUES: {
    NULL: 'null',

    float: '0.0',
    vec2: `vec2(0.0, 0.0)`,
    vec3: `vec3(0.0, 0.0, 0.0)`,
    vec4: `vec4(0.0, 0.0, 0.0, 0.0)`,

    VEC2: `vec2(0.0, 0.0)`,
    VEC3: `vec3(0.0, 0.0, 0.0)`,
    VEC4: `vec4(0.0, 0.0, 0.0, 0.0)`,

    VEC2_MIX: `vec2(1.0, 1.0)`,
    VEC3_MIX: `vec3(1.0, 1.0, 1.0)`,
    VEC4_MIX: `vec4(1.0, 1.0, 1.0, 1.0)`,

    float0: '0.0',
    float1: '1.0',

    gl_Position: 'vec4(position, 1.0)',
    gl_PointSize: '1.0',
    gl_FragColor: 'vec4(0.5, 0.5, 0.5, 0.5)'
  },
  DATA_TYPES: {
    SAMPLER2D: 'sampler2D',
    TEXTURE2D: 'texture2D',

    VEC4: 'vec4',
    VEC3: 'vec3',
    VEC2: 'vec2',
    FLOAT: 'float'
  }
}

export const boxColorTypes = {
  'grey': `linear-gradient(251deg, #ccc 9%, #b1b1b1 100%)`,

  'purple': `linear-gradient(251deg, rgba(214, 192, 255, 0.72) 9%, rgb(133, 27, 255) 100%)`,
  'fragment': `linear-gradient(251deg, rgba(214, 192, 255, 0.72) 9%, rgb(133, 27, 255) 100%)`,
  blue: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  vertexinput: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  output: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  statement: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  uniform: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  'texture-reader': `linear-gradient(251deg, rgba(255,192,192,0.72) 9%, #FF1B1B 100%)`,
  attribute: `linear-gradient(251deg, rgba(255,192,192,0.72) 9%, #FF1B1B 100%)`,
  red: `linear-gradient(251deg, rgba(255,192,192,0.72) 9%, #FF1B1B 100%)`,
  yellow: `linear-gradient(251deg, rgba(255,221,192,0.72) 9%, #FF881B 100%)`,
  default: `linear-gradient(251deg, rgba(255,221,192,0.72) 9%, #FF881B 100%)`,
  'preview-box': `linear-gradient(251deg, rgba(255,221,192,0.72) 9%, #FF881B 100%)`,
  'custom-function': `linear-gradient(251deg, rgba(255, 192, 250, 0.72) 9%, rgb(27, 234, 255) 100%)`,
  function: `linear-gradient(251deg, rgba(192,255,210,0.72) 9%, #18CA1A 100%)`,
  green: `linear-gradient(251deg, rgba(192,255,210,0.72) 9%, #18CA1A 100%)`
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
