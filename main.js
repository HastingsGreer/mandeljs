import "./style.css";

import { init } from "gmp-wasm";

import { getCursorPos, getTouchPos, initShaderProgram, createMatrices } from "./glutils.js";

init().then(({ binding }) => {
  fetch("https://apj.hgreer.com/mandeljs", {
    method: "GET", // or 'POST' if needed
    cache: "no-store",
    mode: "no-cors",
  });
  // No further handling of the response or errors

  console.log(binding);

  function mpfr_zero() {
    var zero = binding.mpfr_t();
    binding.mpfr_init_set_d(zero, 0, 0);
    binding.mpfr_set_prec(zero, 1200);
    binding.mpfr_set_d(zero, 0, 0);
    return zero;
  }
  function get_exp(val) {
    var log = mpfr_zero();

    binding.mpfr_log2(log, val, 0);

    var logfloat = binding.mpfr_get_d(log, 0);
    return logfloat;
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

      binding.mpfr_mul_d(this.radius, this.radius, 1.0 / 2.0, 0);

      binding.mpfr_add(this.center[0], this.center[0], mx, 0);
      binding.mpfr_add(this.center[1], this.center[1], my, 0);

      this.modified();
    },
  };
  function get_cookie(cookie, key) {
    var cookieValue = cookie.replace(/\s+/g, "").split(";");

    cookieValue = cookieValue.find((row) => row.startsWith(key + "="))?.split("=")[1];

    return cookieValue;
  }
  if (document.cookie.length > 30) {
    binding.mpfr_set_string(mandelbrot_state.center[0], get_cookie(document.cookie, "x"), 10, 0);
    binding.mpfr_set_string(mandelbrot_state.center[1], get_cookie(document.cookie, "y"), 10, 0);
    binding.mpfr_set_string(mandelbrot_state.radius, get_cookie(document.cookie, "radius"), 10, 0);
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
    function updateFromClickpos() {
      var text = document.querySelector("#clickpos").value;
      console.log("asfdsafsda", text);
      binding.mpfr_set_string(mandelbrot_state.center[0], get_cookie(text, "re"), 10, 0);
      binding.mpfr_set_string(mandelbrot_state.center[1], get_cookie(text, "im"), 10, 0);
      binding.mpfr_set_string(mandelbrot_state.radius, get_cookie(text, "r"), 10, 0);

      var log = mpfr_zero();
      if (+get_cookie(text, "iterations")) {
        mandelbrot_state.iterations = +get_cookie(text, "iterations");
      }
      binding.mpfr_log2(log, mandelbrot_state.radius, 0);
      var exp = binding.mpfr_get_exp(mandelbrot_state.radius, 0);

      var logfloat = binding.mpfr_get_d(log, 0);
      console.log("radius", logfloat, exp);
      console.log("r", get_cookie(text, "r"));
      console.log(mandelbrot_state);
      mandelbrot_state.modified();
      console.log(mandelbrot_state);

      console.log("blur");
    }
    document.querySelector("#clickpos").addEventListener("blur", updateFromClickpos);
    document.getElementById("clickpos").onPaste = updateFromClickpos;

    mandelbrot_state.callbacks.push(() => {
      let x_str = binding.mpfr_to_string(mandelbrot_state.center[0], 10, 0, false);
      let y_str = binding.mpfr_to_string(mandelbrot_state.center[1], 10, 0, false);
      let radius_str = binding.mpfr_to_string(mandelbrot_state.radius, 10, 0, false);

      document.cookie = "x=" + x_str + ";max-age=31536000";
      document.cookie = "y=" + y_str + ";max-age=31536000";
      document.cookie = "radius=" + radius_str + ";max-age=31536000";
      //fetch(
      // "https://apj.hgreer.com/mandel/?real=" + x_str + "&imag=" + y_str + "&radius=" + radius_str,
      //  {
      //   method: "GET", 
      //   cache: "no-store",
      //   mode: "no-cors",
      //});
      function clip(str) {
        var l = 10 + radius_str.replace(/0+\d$/, "").split("0").length;
        return str.slice(0, l);
      }

      document.querySelector("#clickpos").value =
        "re=" +
        clip(x_str) +
        "; im=" +
        clip(y_str) +
        "; r=" +
        clip(radius_str) +
        "; iterations=" +
        mandelbrot_state.iterations;

      window.history.replaceState(
        null,
        document.title,
        "/?;" + document.getElementById("clickpos").value.replace(/ /g, ""),
      );
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
  int row = i / 1024;
  return texelFetch(sequence, ivec2( i % 1024, row), 0)[0];
}
float get_orbit_y(int i) {
  i = i * 3 + 1;
  int row = i / 1024;
  return texelFetch(sequence, ivec2( i % 1024, row), 0)[0];
}
float get_orbit_scale(int i) {
  i = i * 3 + 2;
  int row = i / 1024;
  return texelFetch(sequence, ivec2( i % 1024, row), 0)[0];
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

    if (isinf(unS)) {
    unS = 0.;
      }

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


    if ( true && dx * dx + dy * dy > 1000000.) {
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

    if (true  && fx * fx + fy * fy < S * S * dx * dx + S * S * dy * dy || (x == -1. && y == -1.)) {
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
    mandelbrot_state.callbacks.unshift(() => {
      drawScene(gl, programInfo, buffers);
    });
    if (window.location.href.includes(";")) {
      document.getElementById("clickpos").innerText = window.location.href;
      updateFromClickpos();
    }
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
  function sub(a, b) {
    var [am, ae] = a;
    var [bm, be] = b;
    var ret_e = Math.max(ae, be);
    if (ret_e > ae) {
      am = am * Math.pow(2, ae - ret_e);
    } else {
      bm = bm * Math.pow(2, be - ret_e);
    }
    return [am - bm, ret_e];
  }
  function add(a, b) {
    var [am, ae] = a;
    var [bm, be] = b;
    var ret_e = Math.max(ae, be);
    if (ret_e > ae) {
      am = am * Math.pow(2, ae - ret_e);
    } else {
      bm = bm * Math.pow(2, be - ret_e);
    }
    return [am + bm, ret_e];
  }
  function mul(a, b) {
    var [am, ae] = a;
    var [bm, be] = b;

    var m = am * bm,
      e = ae + be;

    if (m != 0) {
      var logm = Math.round(Math.log2(Math.abs(m)));

      m = m / Math.pow(2, logm);
      e = e + logm;
    }
    return [m, e];
  }
  function maxabs(a, b) {
    var [am, ae] = a;
    var [bm, be] = b;
    var ret_e = Math.max(ae, be);
    if (ret_e > ae) {
      am = am * Math.pow(2, ae - ret_e);
    } else {
      bm = bm * Math.pow(2, be - ret_e);
    }
    return [Math.max(Math.abs(am), Math.abs(bm)), ret_e];
  }
  function gt(a, b) {
    var [am, ae] = a;
    var [bm, be] = b;
    var ret_e = Math.max(ae, be);
    if (ret_e > ae) {
      am = am * Math.pow(2, ae - ret_e);
    } else {
      bm = bm * Math.pow(2, be - ret_e);
    }
    return am > bm;
  }

  function make_reference_orbit() {
    var cx = mandelbrot_state.center[0];
    var cy = mandelbrot_state.center[1];
    var x = mpfr_zero();
    var y = mpfr_zero();
    var orbit = new Float32Array(1024 * 1024);
    for (var i = 0; i < 1024 * 1024; i++) {
      orbit[i] = -1;
    }
    var txx = mpfr_zero();
    var txy = mpfr_zero();
    var tyy = mpfr_zero();

    var polylim = 0;

    var Bx = [0, 0];
    var By = [0, 0];
    var Cx = [0, 0];
    var Cy = [0, 0];
    var Dx = [0, 0];
    var Dy = [0, 0];
    var poly = [0, 0, 0, 0, 0, 0];
    var not_failed = true;

    var scaled_x = mpfr_zero();
    var scaled_y = mpfr_zero();
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
      var _ = 0;

      orbit[3 * i] = binding.mpfr_get_d_2exp(_, x, 0) / Math.pow(2, scale_exponent - x_exponent);
      orbit[3 * i + 1] =
        binding.mpfr_get_d_2exp(_, y, 0) / Math.pow(2, scale_exponent - y_exponent);
      orbit[3 * i + 2] = scale_exponent;

      var fx = [orbit[3 * i], orbit[3 * i + 2]];
      var fy = [orbit[3 * i + 1], orbit[3 * i + 2]];
      binding.mpfr_mul(txx, x, x, 0);
      binding.mpfr_mul(txy, x, y, 0);
      binding.mpfr_mul(tyy, y, y, 0);
      binding.mpfr_sub(x, txx, tyy, 0);
      binding.mpfr_add(x, x, cx, 0);
      binding.mpfr_add(y, txy, txy, 0);
      binding.mpfr_add(y, y, cy, 0);

      var prev_poly = [Bx, By, Cx, Cy, Dx, Dy];
      [Bx, By, Cx, Cy, Dx, Dy] = [
        add(mul([2, 0], sub(mul(fx, Bx), mul(fy, By))), [1, 0]),
        mul([2, 0], add(mul(fx, By), mul(fy, Bx))),
        sub(add(mul([2, 0], sub(mul(fx, Cx), mul(fy, Cy))), mul(Bx, Bx)), mul(By, By)),
        add(mul([2, 0], add(mul(fx, Cy), mul(fy, Cx))), mul(mul([2, 0], Bx), By)),
        mul([2, 0], add(sub(mul(fx, Dx), mul(fy, Dy)), sub(mul(Cx, Bx), mul(Cy, By)))),
        mul([2, 0], add(add(add(mul(fx, Dy), mul(fy, Dx)), mul(Cx, By)), mul(Cy, Bx))),
      ];
      fx = [binding.mpfr_get_d_2exp(_, x, 0), binding.mpfr_get_exp(x)];
      fy = [binding.mpfr_get_d_2exp(_, y, 0), binding.mpfr_get_exp(y)];
      if (
        i == 0 ||
        gt(
          maxabs(Cx, Cy),
          mul([1000, binding.mpfr_get_exp(mandelbrot_state.radius)], maxabs(Dx, Dy)),
        )
      ) {
        if (not_failed) {
          poly = prev_poly;
          polylim = i;
        }
      } else {
        if (not_failed) {
        }
        not_failed = false;
      }

      if (gt(add(mul(fx, fx), mul(fy, fy)), [400, 0])) {
        break;
      }
    }
    console.log("plim", polylim);
    window.orbit = orbit;
    console.log("orbit_len", i);
    return [orbit, poly, polylim];
  }
  function floaty(d) {
    return Math.pow(2, d[1]) * d[0];
  }
  function drawScene(gl, programInfo, buffers) {
    var [orbit, poly, polylim] = make_reference_orbit();
    var values = new Float32Array(orbit);
    var minval = 2;
    for (var i = 2; i < orbit.length; i++) {
      minval = Math.min(minval, Math.abs(orbit[i]));
    }
    console.log("smallest orbit bit", minval);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, 1024, 1024, 0, gl.RED, gl.FLOAT, values);
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
    var rexp = binding.mpfr_get_exp(mandelbrot_state.radius);
    var _ = 0;
    var r = binding.mpfr_get_d_2exp(_, mandelbrot_state.radius, 0);
    r = [r, rexp];
    console.log(r);

    gl.uniform4f(
      programInfo.uniformLocations.state,
      mandelbrot_state.center[0],
      mandelbrot_state.cmapscale,
      1 + get_exp(mandelbrot_state.radius),
      mandelbrot_state.iterations,
    );
    console.log(poly);

    var poly_scale_exp = mul([1, 0], maxabs(poly[0], poly[1]));

    var poly_scale = [1, -poly_scale_exp[1]];

    var poly_scaled = [
      mul(poly_scale, poly[0]),
      mul(poly_scale, poly[1]),
      mul(poly_scale, mul(r, poly[2])),
      mul(poly_scale, mul(r, poly[3])),
      mul(poly_scale, mul(r, mul(r, poly[4]))),
      mul(poly_scale, mul(r, mul(r, poly[5]))),
    ].map(floaty);

    gl.uniform4f(
      programInfo.uniformLocations.poly1,
      poly_scaled[0],
      poly_scaled[1],
      poly_scaled[2],
      poly_scaled[3],
    );
    gl.uniform4f(
      programInfo.uniformLocations.poly2,
      poly_scaled[4],
      poly_scaled[5],
      polylim,
      poly_scale_exp[1],
    );
    console.log("poly_scaled", poly_scaled, polylim, 0);
    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
});
