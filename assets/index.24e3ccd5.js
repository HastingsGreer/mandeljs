import{c as S,p as T,t as L,i as P}from"./vendor.0514c734.js";const R=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))f(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const p of c.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&f(p)}).observe(document,{childList:!0,subtree:!0});function r(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerpolicy&&(c.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?c.credentials="include":s.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function f(s){if(s.ep)return;s.ep=!0;const c=r(s);fetch(s.href,c)}};R();function w(e,a){const r=e.getBoundingClientRect();return[a.clientX-r.left,a.clientY-r.top]}function A(e,a){var r=canvasDom.getBoundingClientRect();return[a.touches[0].clientX-r.left,a.touches[0].clientY-r.top]}function M(e,a,r){const f=E(e,e.VERTEX_SHADER,a),s=E(e,e.FRAGMENT_SHADER,r),c=e.createProgram();return e.attachShader(c,f),e.attachShader(c,s),e.linkProgram(c),e.getProgramParameter(c,e.LINK_STATUS)?c:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(c)),null)}function E(e,a,r){const f=e.createShader(a);return e.shaderSource(f,r),e.compileShader(f),e.getShaderParameter(f,e.COMPILE_STATUS)?f:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(f)),e.deleteShader(f),null)}function q(e){const a=45*Math.PI/180,r=e.canvas.clientWidth/e.canvas.clientHeight,f=.1,s=100,c=S();T(c,a,r,f,s);const p=S();return L(p,p,[-0,0,-2.5]),[c,p]}P().then(({binding:e})=>{console.log(e);function a(){var t=e.mpfr_t();return e.mpfr_init_set_d(t,0,0),e.mpfr_set_prec(t,800),e.mpfr_set_d(t,0,0),t}let r={center:[a(),a()],radius:a(),iterations:1e3,cmapscale:20.1,callbacks:[],modified:function(){for(const t of this.callbacks)t()},set:function(t,n,i){e.mpfr_set_d(this.center[0],t,0),e.mpfr_set_d(this.center[1],n,0),e.mpfr_set_d(this.radius,i,0),this.modified()},update:function(t,n){var i=a();e.mpfr_mul_d(i,this.radius,t,0);var o=a();e.mpfr_mul_d(o,this.radius,-n,0),e.mpfr_mul_d(this.radius,this.radius,.5,0),e.mpfr_add(this.center[0],this.center[0],i,0),e.mpfr_add(this.center[1],this.center[1],o,0),this.modified()}};e.mpfr_set_d(r.radius,2,0),f();function f(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",r.iterations=1e3,r.cmapscale=20.1,r.set(0,0,2)});const t=Math.min(window.innerWidth,700),n=Math.min(t,window.innerHeight),i=document.querySelector("#canvas");i.width=n,i.height=n,i.addEventListener("click",d=>{let u,x;[u,x]=w(i,d),u=u/(n/2)-1,x=x/(n/2)-1,r.update(u,x)}),i.addEventListener("touchstart",d=>{let u,x;[u,x]=A(i,d),u=u/(n/2)-1,x=x/(n/2)-1,r.update(u,x)}),document.querySelector("#iterations").addEventListener("input",d=>{r.iterations=parseInt(d.target.value),r.modified()}),document.querySelector("#cmapscale").addEventListener("input",d=>{r.cmapscale=parseFloat(d.target.value),r.modified()}),r.callbacks.push(()=>{let d=e.mpfr_to_string(r.center[0],10,0,!1),u=e.mpfr_to_string(r.center[1],10,0,!1);document.querySelector("#clickpos").innerText=d+" + "+u+"i"});const o=i.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const m=M(o,`#version 300 es
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
    dx = dx / 8.;
    dy = dy / 8.;
    q = q + 3;
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
  `),_={program:m,attribLocations:{vertexPosition:o.getAttribLocation(m,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(m,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(m,"uModelViewMatrix"),state:o.getUniformLocation(m,"uState")}},h=s(o),v=o.createTexture();o.bindTexture(o.TEXTURE_2D,v),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),r.callbacks.push(()=>{p(o,_,h)}),r.modified()}function s(t){const n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n);const i=[1,1,-1,1,1,-1,-1,-1];return t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW),{position:n}}function c(){for(var t=r.center[0],n=r.center[1],i=a(),o=a(),y=new Float32Array(512*512),l=0;l<512*512;l++)y[l]=-1;for(var m=a(),_=a(),h=a(),l=0;l<r.iterations;l++){y[2*l]=e.mpfr_get_d(i,0),y[2*l+1]=e.mpfr_get_d(o,0),e.mpfr_mul(m,i,i,0),e.mpfr_mul(_,i,o,0),e.mpfr_mul(h,o,o,0),e.mpfr_sub(i,m,h,0),e.mpfr_add(i,i,t,0),e.mpfr_add(o,_,_,0),e.mpfr_add(o,o,n,0);var v=e.mpfr_get_d(i,0),d=e.mpfr_get_d(o,0);if(v*v+d*d>400)break}return y}function p(t,n,i){var o=c(),y=new Float32Array(o);t.texImage2D(t.TEXTURE_2D,0,t.R32F,512,512,0,t.RED,t.FLOAT,y),t.clearColor(0,0,0,1),t.clearDepth(1),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);let l,m;[l,m]=q(t);{const _=2,h=t.FLOAT,v=!1,d=0,u=0;t.bindBuffer(t.ARRAY_BUFFER,i.position),t.vertexAttribPointer(n.attribLocations.vertexPosition,_,h,v,d,u),t.enableVertexAttribArray(n.attribLocations.vertexPosition)}t.useProgram(n.program),t.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,l),t.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,m),console.log(e.mpfr_get_exp(r.radius)),t.uniform4f(n.uniformLocations.state,r.center[0],r.cmapscale,e.mpfr_get_exp(r.radius),r.iterations);{const _=0,h=4;t.drawArrays(t.TRIANGLE_STRIP,_,h)}}});
