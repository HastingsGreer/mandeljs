import './style.css'
import BigNumber from 'bignumber.js'
import {getCursorPos, getTouchPos, initShaderProgram, loadShader, createMatrices, loadTexture} from './glutils.js'
let mandelbrot_state = {
    center: [0, 0],
    radius: 2,
    callbacks: [],
    modified: function() {
        for (const cb of this.callbacks){
            cb()
        }
    },
    set: function(x, y, r) {
        this.center = [x, y];
        this.radius = r;
        this.modified()
    },
    update: function(dx, dy) {
        this.center = [this.center[0] + this.radius * dx, this.center[1] - this.radius * dy]
        this.radius = this.radius / 2;
        this.modified()
    }
}

main()

function main() {

    document.querySelector("#reset").addEventListener('click', (event) => {
        mandelbrot_state.set(0, 0, 2)
    });

    const canvas = document.querySelector('#canvas')

    canvas.addEventListener('click', (event) => {
        let x, y
        [x, y] = getCursorPos(canvas, event);
        x = x / 350 - 1;
        y = y / 350 - 1;
        mandelbrot_state.update(x, y)
    });
    canvas.addEventListener("touchstart", (event) => {
        let x, y
        [x, y] = getTouchPos(canvas, event);
        x = x / 350 - 1;
        y = y / 350 - 1;
        mandelbrot_state.update(x, y)
    });
    mandelbrot_state.callbacks.push(()=>{

        document.querySelector("#clickpos").innerText = mandelbrot_state.center
    });
    const gl = canvas.getContext('webgl2')

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }


  // Vertex shader program

  const vsSource = `#version 300 es
    in vec4 aVertexPosition;
	
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

	out highp vec2 delta;
	
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	  delta = vec2(aVertexPosition[0], aVertexPosition[1]);
    }
  `;

  // Fragment shader program
  const fsSource = `#version 300 es
    precision highp float;
    in highp vec2 delta;

    out vec4 fragColor;
	

    uniform vec4 uState;
    void main() {
      float x = delta[0];
      float y = delta[1];

      float cx = uState[2] * x + uState[0];
      float cy = uState[2] * y + uState[1];
      x = 0.;
      y = 0.;
      int j;
      for(int i = 0; i < 10000; i++){
        j += 1;
        float tx = x * x - y * y + cx;
        y = 2. * x * y + cy;
        x = tx;
        if (x*x + y * y > 4.) {
            break;
        }
      }

      float c = float(10000 - j) / 20.1;
      fragColor = vec4(vec3(cos(c), cos(1.1214 * c) , cos(.8 * c)) / -2. + .5, 1.);
    }
  `;

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      state: gl.getUniformLocation(shaderProgram, "uState")
    },
  };

  const buffers = initBuffers(gl);

  // Draw the scene
  mandelbrot_state.callbacks.push( () => {
    drawScene(gl, programInfo, buffers);
  });
  mandelbrot_state.modified();
}

function initBuffers(gl) {


  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.

  const positions = [
     1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
    -1.0, -1.0,
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW);

  return {
    position: positionBuffer,
  };
}
//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  let projectionMatrix, modelViewMatrix;
  [projectionMatrix, modelViewMatrix] = createMatrices(gl)
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }
  
	
  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
  gl.uniform4f(
      programInfo.uniformLocations.state,
      mandelbrot_state.center[0], mandelbrot_state.center[1], mandelbrot_state.radius, 0);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}


