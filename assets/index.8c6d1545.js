import{c as S,p as q,t as w,i as L}from"./vendor.0514c734.js";const P=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))d(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const _ of c.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&d(_)}).observe(document,{childList:!0,subtree:!0});function r(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerpolicy&&(c.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?c.credentials="include":s.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function d(s){if(s.ep)return;s.ep=!0;const c=r(s);fetch(s.href,c)}};P();function R(t,a){const r=t.getBoundingClientRect();return[a.clientX-r.left,a.clientY-r.top]}function A(t,a){var r=canvasDom.getBoundingClientRect();return[a.touches[0].clientX-r.left,a.touches[0].clientY-r.top]}function M(t,a,r){const d=E(t,t.VERTEX_SHADER,a),s=E(t,t.FRAGMENT_SHADER,r),c=t.createProgram();return t.attachShader(c,d),t.attachShader(c,s),t.linkProgram(c),t.getProgramParameter(c,t.LINK_STATUS)?c:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(c)),null)}function E(t,a,r){const d=t.createShader(a);return t.shaderSource(d,r),t.compileShader(d),t.getShaderParameter(d,t.COMPILE_STATUS)?d:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(d)),t.deleteShader(d),null)}function F(t){const a=45*Math.PI/180,r=t.canvas.clientWidth/t.canvas.clientHeight,d=.1,s=100,c=S();q(c,a,r,d,s);const _=S();return w(_,_,[-0,0,-2.5]),[c,_]}L().then(({binding:t})=>{console.log(t);function a(){var e=t.mpfr_t();return t.mpfr_init_set_d(e,0,0),t.mpfr_set_prec(e,800),t.mpfr_set_d(e,0,0),e}let r={center:[a(),a()],radius:a(),iterations:1e3,cmapscale:20.1,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,n,i){t.mpfr_set_d(this.center[0],e,0),t.mpfr_set_d(this.center[1],n,0),t.mpfr_set_d(this.radius,i,0),this.modified()},update:function(e,n){var i=a();t.mpfr_mul_d(i,this.radius,e,0);var o=a();t.mpfr_mul_d(o,this.radius,-n,0),t.mpfr_mul_d(this.radius,this.radius,.5,0),t.mpfr_add(this.center[0],this.center[0],i,0),t.mpfr_add(this.center[1],this.center[1],o,0),this.modified()}};t.mpfr_set_d(r.radius,2,0),d();function d(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",r.iterations=1e3,r.cmapscale=20.1,r.set(0,0,2)});const e=Math.min(window.innerWidth,700),n=Math.min(e,window.innerHeight),i=document.querySelector("#canvas");i.width=n,i.height=n,i.addEventListener("click",f=>{let u,m;[u,m]=R(i,f),u=u/(n/2)-1,m=m/(n/2)-1,r.update(u,m)}),i.addEventListener("touchstart",f=>{let u,m;[u,m]=A(i,f),u=u/(n/2)-1,m=m/(n/2)-1,r.update(u,m)}),document.querySelector("#iterations").addEventListener("input",f=>{r.iterations=parseInt(f.target.value),r.modified()}),document.querySelector("#cmapscale").addEventListener("input",f=>{r.cmapscale=parseFloat(f.target.value),r.modified()}),r.callbacks.push(()=>{let f=t.mpfr_to_string(r.center[0],10,0,!1),u=t.mpfr_to_string(r.center[1],10,0,!1),m=t.mpfr_to_string(r.radius,10,0,!1);fetch("https://apj.hgreer.com/mandel/?real="+f+"&imag="+u+"&radius="+m),document.querySelector("#clickpos").innerText=f+" + "+u+"i"});const o=i.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const p=M(o,`#version 300 es
in vec4 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
out highp vec2 delta;
void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  delta = vec2(aVertexPosition[0], aVertexPosition[1]);
}
  `,`#version 300 es
precision highp float;
in highp vec2 delta;
out vec4 fragColor;
uniform vec4 uState;
uniform sampler2D sequence;
float get_orbit_x(int i) {
  i = i * 2;
  int row = i / 512;
  return texelFetch(sequence, ivec2( i % 512, row), 0)[0];
}
float get_orbit_y(int i) {
  i = i * 2 + 1;
  int row = i / 512;
  return texelFetch(sequence, ivec2( i % 512, row), 0)[0];
}
void main() {

  int q = int(uState[2]) - 1;
  int cq = q;
  float S = pow(2., float(q));
  float dcx = delta[0];
  float dcy = delta[1];
  float x;
  float y;
  float dx = 0.;
  float dy = 0.;
  int j = 0;
  int k = 0;
  x = get_orbit_x(0);
  y = get_orbit_y(0);
  for (int i = 0; float(i) < uState[3]; i++){
    j += 1;
    k += 1;
    float tx = 2. * x * dx - 2. * y * dy + S * dx * dx - S * dy * dy + dcx;
    dy = 2. * x * dy + 2. * y * dx + S * 2. * dx * dy + dcy;
    dx = tx;
    x = get_orbit_x(k);
    y = get_orbit_y(k);
    float fx = x + S * dx;
    float fy = y + S * dy;
    if (fx * fx + fy * fy > 4.){
      break;
    }
    if ( dx * dx + dy * dy > 4.0) {
      dx = dx / 2.;
      dy = dy / 2.;
      q = q + 1;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
    }
    if ( dx * dx + dy * dy < .25) {
      dx = dx * 2.;
      dy = dy * 2.;
      q = q - 1;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
    }

    if (fx * fx + fy * fy < S * S * dx * dx + S * S * dy * dy || (x == -1. && y == -1.)) {
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
  `),x={program:p,attribLocations:{vertexPosition:o.getAttribLocation(p,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(p,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(p,"uModelViewMatrix"),state:o.getUniformLocation(p,"uState")}},v=s(o),h=o.createTexture();o.bindTexture(o.TEXTURE_2D,h),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),r.callbacks.push(()=>{_(o,x,v)}),r.modified()}function s(e){const n=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,n);const i=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),{position:n}}function c(){for(var e=r.center[0],n=r.center[1],i=a(),o=a(),y=new Float32Array(512*512),l=0;l<512*512;l++)y[l]=-1;for(var p=a(),x=a(),v=a(),l=0;l<r.iterations;l++){y[2*l]=t.mpfr_get_d(i,0),y[2*l+1]=t.mpfr_get_d(o,0),t.mpfr_mul(p,i,i,0),t.mpfr_mul(x,i,o,0),t.mpfr_mul(v,o,o,0),t.mpfr_sub(i,p,v,0),t.mpfr_add(i,i,e,0),t.mpfr_add(o,x,x,0),t.mpfr_add(o,o,n,0);var h=t.mpfr_get_d(i,0),f=t.mpfr_get_d(o,0);if(h*h+f*f>400)break}return y}function _(e,n,i){for(var o=c(),y=new Float32Array(o),l=2,p=2;p<o.length;p++)l=Math.min(l,Math.abs(o[p]));console.log("smallest orbit bit",l),e.texImage2D(e.TEXTURE_2D,0,e.R32F,512,512,0,e.RED,e.FLOAT,y),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let x,v;[x,v]=F(e);{const h=2,f=e.FLOAT,u=!1,m=0,T=0;e.bindBuffer(e.ARRAY_BUFFER,i.position),e.vertexAttribPointer(n.attribLocations.vertexPosition,h,f,u,m,T),e.enableVertexAttribArray(n.attribLocations.vertexPosition)}e.useProgram(n.program),e.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,x),e.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,v),console.log(t.mpfr_get_exp(r.radius)),e.uniform4f(n.uniformLocations.state,r.center[0],r.cmapscale,t.mpfr_get_exp(r.radius),r.iterations);{const h=0,f=4;e.drawArrays(e.TRIANGLE_STRIP,h,f)}}});
