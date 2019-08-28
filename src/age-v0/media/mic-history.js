/**
 * Copyright 2019 WONG LOK

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 */

import * as THREE from 'three'

export const setup = () => {
  var api = {}
  var fftSize = 128 // up to 2048 with pow2
  var listener = new THREE.AudioListener()

  var analyser = null
  var texture = null
  var sound = null
  var dataPerScan = fftSize / 2.0
  var maxHistory = 60 * 1.5
  var savedBits = new Uint8Array(new Array(dataPerScan * maxHistory))
  // var bitsArr = new Array(dataPerScan * maxHistory * 3)
  var historyArr = [
  ]

  for (var i = 0; i < maxHistory; i++) {
    historyArr.push(new Uint8Array(new Array(dataPerScan)))
  }

  navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
    sound = new THREE.Audio(listener)
    var context = listener.context
    listener.setMasterVolume(0.0)
    var source = context.createMediaStreamSource(stream)
    sound.setNodeSource(source)

    analyser = new THREE.AudioAnalyser(sound, fftSize)
    texture = new THREE.DataTexture(savedBits, dataPerScan, maxHistory, THREE.LuminanceFormat)
  })

  api.pause = () => {
    sound.pause()
  }

  api.update = () => {
    if (analyser) {
      analyser.getFrequencyData()

      historyArr.pop()
      historyArr.unshift(analyser.data.slice())

      // savedBits = new Uint8Array(dataPerScan * maxHistory)

      for (let ai = 0; ai < historyArr.length; ai++) {
        let currnetAI = historyArr[ai]
        for (let bi = 0; bi < currnetAI.length; bi++) {
          let v = currnetAI[bi]
          let idx = ai * dataPerScan + bi
          savedBits[idx] = v
          // bitsArr[idx + 0] = v2
          // bitsArr[idx + 1] = v2
          // bitsArr[idx + 2] = v2
        }
      }

      // console.log(savedBits.length + ' bits updated')
      // analyser.getAverageFrequency()
    }
    if (texture) {
      // texture = new THREE.DataTexture(savedBits, dataPerScan, 1.0 * maxHistory, THREE.LuminanceFormat)
      texture.needsUpdate = true
    }

    return {
      dimension: {
        x: dataPerScan,
        y: maxHistory
      },
      // bits: bitsArr,
      texture
    }
  }
  return api
}

/*
var listener = new THREE.AudioListener();
camera.add( listener );

navigator.mediaDevices.getUserMedia( { sound: true, video: false } ).then( handleSuccess );

function handleSuccess( stream ) {

    var sound = new THREE.Audio( listener );
}
*/

export var APIs = {
}
