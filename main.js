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
    uniform sampler2D sequence;
    float get_orbit_x(int i) {
    i = i * 2;
    int row = i / 100;
    return texelFetch(sequence, ivec2( i % 100, row), 0)[0];
    }
    float get_orbit_y(int i) {
    i = i * 2 + 1;
    int row = i / 100;
    return texelFetch(sequence, ivec2( i % 100, row), 0)[0];
    }
    void main() {
     float dcx = uState[2] * delta[0];
     float dcy = uState[2] * delta[1];
     float x;
     float y;

     float dx = 0.;
     float dy = 0.;
     int j = 0;
     int k = 0;
     x = get_orbit_x(0);
     y = get_orbit_y(0);
     for (int i = 0; i < 10000; i++){
     	j += 1;
	k += 1;
	float tx = 2. * x * dx - 2. * y * dy + dx * dx - dy * dy + dcx;
	dy = 2. * x * dy + 2. * y * dx + 2. * dx * dy + dcy;
	dx = tx;

	x = get_orbit_x(k);
	y = get_orbit_y(k);

	float fx = x + dx;
	float fy = y + dy;

	if (fx * fx + fy * fy > 4.){
	break;
	}
	if (fx * fx + fy * fy < dx * dx + dy * dy || (x == -1. && y == -1.)) {
	dx  = fx;
	dy = fy;
	k = 0;
	x = get_orbit_x(0);
	y = get_orbit_y(0);
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
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

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
function make_reference_orbit(){
	var cx = mandelbrot_state.center[0];
	var cy = mandelbrot_state.center[1];
	var x = 0;
	var y = 0;
	var j = 0;
	var orbit = new Float32Array(20000);
	for(var i = 0; i < 20000; i++){
		orbit[i] = -1;
	}
	for(var i = 0; i < 10000; i ++){
		orbit[2 * i] = x;
		orbit[2 * i + 1] = y;
		j += 1;
		var tx = x * x - y * y + cx;
		y = 2. * x * y + cy;
		x = tx;
		if (x * x + y * y > 400) {
			break;
		}
	}
	return orbit;
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers) {
  var orbit = make_reference_orbit();
  var values = new Float32Array(orbit);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, 100, 200, 0, gl.RED, gl.FLOAT, values);
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


