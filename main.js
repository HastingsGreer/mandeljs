import "./style.css";

import { init } from "gmp-wasm";

import { getCursorPos, getTouchPos, initShaderProgram, createMatrices } from "./glutils.js";

init().then(({ binding }) => {
  console.log(binding);

  function mpfr_zero() {
    var zero = binding.mpfr_t();
    binding.mpfr_init_set_d(zero, 0, 0);
    binding.mpfr_set_prec(zero, 1200);
    binding.mpfr_set_d(zero, 0, 0);
    return zero;
  }

  let mandelbrot_state = {
    center: [mpfr_zero(), mpfr_zero()],
    radius: mpfr_zero(),
    iterations: 1000,
    cmapscale: 20,
    callbacks: [],
    modified: function () {
      for (const cb of this.callbacks) {
        cb();
      }
    },
    set: function (x, y, r) {
      binding.mpfr_set_d(this.center[0], x, 0);
      binding.mpfr_set_d(this.center[1], y, 0);
      binding.mpfr_set_d(this.radius, r, 0);
      this.modified();
    },
    update: function (dx, dy) {
      var mx = mpfr_zero();
      binding.mpfr_mul_d(mx, this.radius, dx, 0);
      var my = mpfr_zero();
      binding.mpfr_mul_d(my, this.radius, -dy, 0);

      binding.mpfr_mul_d(this.radius, this.radius, 0.5, 0);

      binding.mpfr_add(this.center[0], this.center[0], mx, 0);
      binding.mpfr_add(this.center[1], this.center[1], my, 0);

      this.modified();
    },
  };
  function get_cookie(key) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(key + "="))
      ?.split("=")[1];
    return cookieValue;
  }
  console.log(document.cookie);
  if (document.cookie.length > 30) {
    binding.mpfr_set_string(mandelbrot_state.center[0], get_cookie("x"), 10, 0);
    binding.mpfr_set_string(mandelbrot_state.center[1], get_cookie("y"), 10, 0);
    binding.mpfr_set_string(mandelbrot_state.radius, get_cookie("radius"), 10, 0);
  } else {
    binding.mpfr_set_string(mandelbrot_state.center[0], "0", 10, 0);
    binding.mpfr_set_string(mandelbrot_state.center[1], "0", 10, 0);
    binding.mpfr_set_string(mandelbrot_state.radius, "2", 10, 0);
  }
  main();
  function main() {
    document.querySelector("#reset").addEventListener("click", () => {
      document.querySelector("#iterations").value = "1000";
      document.querySelector("#cmapscale").value = "20.1";
      mandelbrot_state.iterations = 1000;
      mandelbrot_state.cmapscale = 20.1;
      mandelbrot_state.set(0, 0, 2);
    });
    document.querySelector("#out").addEventListener("click", () => {
      binding.mpfr_mul_d(mandelbrot_state.radius, mandelbrot_state.radius, 2, 0);
      mandelbrot_state.modified();
    });
    const maxWidth = Math.min(window.innerWidth, 700);
    const canvasSize = Math.min(maxWidth, window.innerHeight);

    const canvas = document.querySelector("#canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.addEventListener("click", (event) => {
      let x, y;
      [x, y] = getCursorPos(canvas, event);
      x = x / (canvasSize / 2) - 1;
      y = y / (canvasSize / 2) - 1;
      mandelbrot_state.update(x, y);
    });
    canvas.addEventListener("touchstart", (event) => {
      let x, y;
      [x, y] = getTouchPos(canvas, event);
      x = x / (canvasSize / 2) - 1;
      y = y / (canvasSize / 2) - 1;
      mandelbrot_state.update(x, y);
    });
    document.querySelector("#iterations").addEventListener("input", (event) => {
      mandelbrot_state.iterations = parseInt(event.target.value);
      mandelbrot_state.modified();
    });
    document.querySelector("#cmapscale").addEventListener("input", (event) => {
      mandelbrot_state.cmapscale = parseFloat(event.target.value);
      mandelbrot_state.modified();
    });

    mandelbrot_state.callbacks.push(() => {
      let x_str = binding.mpfr_to_string(mandelbrot_state.center[0], 10, 0, false);
      let y_str = binding.mpfr_to_string(mandelbrot_state.center[1], 10, 0, false);
      let radius_str = binding.mpfr_to_string(mandelbrot_state.radius, 10, 0, false);

      document.cookie = "x=" + x_str + ";max-age=31536000";
      document.cookie = "y=" + y_str + ";max-age=31536000";
      document.cookie = "radius=" + radius_str + ";max-age=31536000";
      //fetch(
      //  "https://apj.hgreer.com/mandel/?real=" + x_str + "&imag=" + y_str + "&radius=" + radius_str,
      //);

      document.querySelector("#clickpos").innerText = x_str + " + " + y_str + "i, r=" + radius_str;
    });
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
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
    const fsSource = `#version 300 es
precision highp float;
in highp vec2 delta;
out vec4 fragColor;
uniform vec4 uState;
uniform vec4 poly1;
uniform vec4 poly2;
uniform sampler2D sequence;
float get_orbit_x(int i) {
  i = i * 3;
  int row = i / 512;
  return texelFetch(sequence, ivec2( i % 512, row), 0)[0];
}
float get_orbit_y(int i) {
  i = i * 3 + 1;
  int row = i / 512;
  return texelFetch(sequence, ivec2( i % 512, row), 0)[0];
}
float get_orbit_scale(int i) {
  i = i * 3 + 2;
  int row = i / 512;
  return texelFetch(sequence, ivec2( i % 512, row), 0)[0];
}
void main() {
  int q = int(uState[2]) - 1;
  int cq = q;
  q = q + int(poly2[3]);
  float S = pow(2., float(q));
  float dcx = delta[0];
  float dcy = delta[1];
  float x;
  float y;
  // dx + dyi = (p0 + p1 i) * (dcx, dcy) + (p2 + p3i) * (dcx + dcy * i) * (dcx + dcy * i)
  float sqrx =  (dcx * dcx - dcy * dcy);
  float sqry =  (2. * dcx * dcy);

  float cux =  (dcx * sqrx - dcy * sqry);
  float cuy =  (dcx * sqry + dcy * sqrx);
  float dx = poly1[0]  * dcx - poly1[1] *  dcy + poly1[2] * sqrx - poly1[3] * sqry ;// + poly2[0] * cux - poly2[1] * cuy;
  float dy = poly1[0] *  dcy + poly1[1] *  dcx + poly1[2] * sqry + poly1[3] * sqrx ;//+ poly2[0] * cuy + poly2[1] * cux;
      
  int k = int(poly2[2]);

  if (false) {
      q = cq;
      dx = 0.;
      dy = 0.;
      k = 0;
  }
  int j = k;
  x = get_orbit_x(k);
  y = get_orbit_y(k);
  for (int i = k; float(i) < uState[3]; i++){
    j += 1;
    k += 1;
    float os = get_orbit_scale(k - 1);
    dcx = delta[0] * pow(2., float(-q + cq - int(os)));
    dcy = delta[1] * pow(2., float(-q + cq - int(os)));
    float unS = pow(2., float(q) -get_orbit_scale(k - 1));

    float tx = 2. * x * dx - 2. * y * dy + unS  * dx * dx - unS * dy * dy + dcx;
    dy = 2. * x * dy + 2. * y * dx + unS * 2. * dx * dy +  dcy;
    dx = tx;

    q = q + int(os);
    S = pow(2., float(q));

    x = get_orbit_x(k);
    y = get_orbit_y(k);
    float fx = x * pow(2., get_orbit_scale(k)) + S * dx;
    float fy = y * pow(2., get_orbit_scale(k))+ S * dy;
    if (fx * fx + fy * fy > 4.){
      break;
    }
    if ( true && dx * dx + dy * dy > 4.) {
      dx = dx / 2.;
      dy = dy / 2.;
      q = q + 1;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
    }
    if ( false && dx * dx + dy * dy < .25) {
      dx = dx * 2.;
      dy = dy * 2.;
      q = q - 1;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
    }

    if ( true && fx * fx + fy * fy < S * S * dx * dx + S * S * dy * dy || (x == -1. && y == -1.)) {
      dx  = fx;
      dy = fy;
      q = 0;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
      k = 0;
      x = get_orbit_x(0);
      y = get_orbit_y(0);
    }
  }
  float c = (uState[3] - float(j)) / uState[1];
  fragColor = vec4(vec3(cos(c), cos(1.1214 * c) , cos(.8 * c)) / -2. + .5, 1.);
}
  `;
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        state: gl.getUniformLocation(shaderProgram, "uState"),
        poly1: gl.getUniformLocation(shaderProgram, "poly1"),
        poly2: gl.getUniformLocation(shaderProgram, "poly2"),
      },
    };
    const buffers = initBuffers(gl);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    mandelbrot_state.callbacks.push(() => {
      drawScene(gl, programInfo, buffers);
    });
    mandelbrot_state.modified();
  }
  function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return {
      position: positionBuffer,
    };
  }
  function make_reference_orbit() {
    var cx = mandelbrot_state.center[0];
    var cy = mandelbrot_state.center[1];
    var x = mpfr_zero();
    var y = mpfr_zero();
    var orbit = new Float32Array(512 * 512);
    for (var i = 0; i < 512 * 512; i++) {
      orbit[i] = -1;
    }
    var txx = mpfr_zero();
    var txy = mpfr_zero();
    var tyy = mpfr_zero();

    var polylim = 0;

    var Bx = 0;
    var By = 0;
    var Cx = 0;
    var Cy = 0;
    var Dx = 0;
    var Dy = 0;
    var poly = [0, 0, 0, 0, 0, 0];
    var not_failed = true;

    //var scaled_x = mpfr_zero();
    //var scaled_y = mpfr_zero();
    for (var i = 0; i < mandelbrot_state.iterations; i++) {
      //check if x and y are both representable as 32 bit floats

      var x_exponent = binding.mpfr_get_exp(x);
      var y_exponent = binding.mpfr_get_exp(y);

      var scale_exponent = Math.max(x_exponent, y_exponent);

      if (scale_exponent < -10000) {
        scale_exponent = 0;
      }
      //console.log("scale exponent", scale_exponent);
      //if (x_exponent < -126 || x_exponent > 127 || y_exponent < -126 || y_exponent > 127) {
      //  orbit[3 * i] = binding.mpfr_get_d(x, 0);
      //  orbit[3 * i + 1] = binding.mpfr_get_d(y, 0);
      //  orbit[3 * i + 2] = 0;
      //} else {
      orbit[3 * i] = binding.mpfr_get_d(x, 0) / Math.pow(2, scale_exponent);
      orbit[3 * i + 1] = binding.mpfr_get_d(y, 0) / Math.pow(2, scale_exponent);
      orbit[3 * i + 2] = scale_exponent;
      //}

      var fx = binding.mpfr_get_d(x, 0);
      var fy = binding.mpfr_get_d(y, 0);
      binding.mpfr_mul(txx, x, x, 0);
      binding.mpfr_mul(txy, x, y, 0);
      binding.mpfr_mul(tyy, y, y, 0);
      binding.mpfr_sub(x, txx, tyy, 0);
      binding.mpfr_add(x, x, cx, 0);
      binding.mpfr_add(y, txy, txy, 0);
      binding.mpfr_add(y, y, cy, 0);

      var prev_poly = [Bx, By, Cx, Cy, Dx, Dy];
      [Bx, By, Cx, Cy, Dx, Dy] = [
        2 * (fx * Bx - fy * By) + 1,
        2 * (fx * By + fy * Bx),
        2 * (fx * Cx - fy * Cy) + Bx * Bx - By * By,
        2 * (fx * Cy + fy * Cx) + 2 * Bx * By,
        2 * (fx * Dx - fy * Dy + Cx * Bx - Cy * By),
        2 * (fx * Dy + fy * Dx + Cx * By + Cy * Bx),
      ];
      fx = binding.mpfr_get_d(x, 0);
      fy = binding.mpfr_get_d(y, 0);

      if (
        Math.sqrt(Cx * Cx + Cy * Cy) >=
        100 * binding.mpfr_get_d(mandelbrot_state.radius, 0) * Math.sqrt(Dx * Dx + Dy * Dy)
      ) {
        if (not_failed) {
          poly = prev_poly;
          polylim = i;
        }
      } else {
        not_failed = false;
      }

      if (fx * fx + fy * fy > 400) {
        break;
      }
    }
    console.log("plim", polylim);
    return [orbit, poly, polylim];
  }
  function drawScene(gl, programInfo, buffers) {
    var [orbit, poly, polylim] = make_reference_orbit();
    var values = new Float32Array(orbit);
    var minval = 2;
    for (var i = 2; i < orbit.length; i++) {
      minval = Math.min(minval, Math.abs(orbit[i]));
    }
    console.log("smallest orbit bit", minval);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, 512, 512, 0, gl.RED, gl.FLOAT, values);
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let projectionMatrix, modelViewMatrix;
    [projectionMatrix, modelViewMatrix] = createMatrices(gl);
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
        offset,
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }
    gl.useProgram(programInfo.program);
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
    console.log(binding.mpfr_get_exp(mandelbrot_state.radius));
    var r = binding.mpfr_get_d(mandelbrot_state.radius, 0);
    gl.uniform4f(
      programInfo.uniformLocations.state,
      mandelbrot_state.center[0],
      mandelbrot_state.cmapscale,
      binding.mpfr_get_exp(mandelbrot_state.radius),
      mandelbrot_state.iterations,
    );
    console.log(poly);
    var poly_scale_exp = Math.floor(Math.log2(Math.sqrt(poly[0] * poly[0] + poly[1] * poly[1])));
    var poly_scale = 1 / Math.pow(2, poly_scale_exp);

    gl.uniform4f(
      programInfo.uniformLocations.poly1,
      poly_scale * poly[0],
      poly_scale * poly[1],
      poly_scale * r * poly[2],
      poly_scale * r * poly[3],
    );
    gl.uniform4f(
      programInfo.uniformLocations.poly2,
      poly_scale * r * r * poly[4],
      poly_scale * r * r * poly[5],
      polylim,
      poly_scale_exp,
    );
    console.log(
      "poly_scaled",
      r * poly[0],
      r * poly[1],
      r * r * poly[2],
      r * r * poly[3],
      r * r * r * poly[4],
      r * r * r * poly[5],
      polylim,
      0,
    );
    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
});
