import{c as y,p as L,t as P,i as R}from"./vendor.0514c734.js";const A=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const _ of c.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&i(_)}).observe(document,{childList:!0,subtree:!0});function r(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerpolicy&&(c.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?c.credentials="include":t.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(t){if(t.ep)return;t.ep=!0;const c=r(t);fetch(t.href,c)}};A();function M(a,n){const r=a.getBoundingClientRect();return[n.clientX-r.left,n.clientY-r.top]}function F(a,n){var r=canvasDom.getBoundingClientRect();return[n.touches[0].clientX-r.left,n.touches[0].clientY-r.top]}function w(a,n,r){const i=v(a,a.VERTEX_SHADER,n),t=v(a,a.FRAGMENT_SHADER,r),c=a.createProgram();return a.attachShader(c,i),a.attachShader(c,t),a.linkProgram(c),a.getProgramParameter(c,a.LINK_STATUS)?c:(alert("Unable to initialize the shader program: "+a.getProgramInfoLog(c)),null)}function v(a,n,r){const i=a.createShader(n);return a.shaderSource(i,r),a.compileShader(i),a.getShaderParameter(i,a.COMPILE_STATUS)?i:(alert("An error occurred compiling the shaders: "+a.getShaderInfoLog(i)),a.deleteShader(i),null)}function U(a){const n=45*Math.PI/180,r=a.canvas.clientWidth/a.canvas.clientHeight,i=.1,t=100,c=y();L(c,n,r,i,t);const _=y();return P(_,_,[-0,0,-2.5]),[c,_]}R().then(({getContext:a,calculate:n,binding:r})=>{console.log(r);function i(){var e=r.mpfr_t();return r.mpfr_init_set_d(e,0,0),r.mpfr_set_prec(e,200),r.mpfr_set_d(e,0,0),e}i();let t={center:[i(),i()],radius:2,iterations:1e3,cmapscale:20.1,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,o,s){r.mpfr_set_d(this.center[0],e,0),r.mpfr_set_d(this.center[1],o,0),this.radius=s,this.modified()},update:function(e,o){r.mpfr_add_d(this.center[0],this.center[0],this.radius*e,0),r.mpfr_add_d(this.center[1],this.center[1],-this.radius*o,0),this.radius=this.radius/2,console.log(r.mpfr_get_d(this.center[0],0)),console.log(r.mpfr_get_d(this.center[1],0)),console.log(r.mpfr_get_prec(this.center[0])),this.modified()}};c();function c(){document.querySelector("#reset").addEventListener("click",f=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",t.iterations=1e3,t.cmapscale=20.1,t.set(0,0,2)});const e=document.querySelector("#canvas");e.addEventListener("click",f=>{let u,d;[u,d]=M(e,f),u=u/350-1,d=d/350-1,t.update(u,d)}),e.addEventListener("touchstart",f=>{let u,d;[u,d]=F(e,f),u=u/350-1,d=d/350-1,t.update(u,d)}),document.querySelector("#iterations").addEventListener("input",f=>{t.iterations=parseInt(f.target.value),t.modified()}),document.querySelector("#cmapscale").addEventListener("input",f=>{t.cmapscale=parseFloat(f.target.value),t.modified()}),t.callbacks.push(()=>{document.querySelector("#clickpos").innerText=t.center});const o=e.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const m=w(o,`#version 300 es
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
     for (int i = 0; float(i) < uState[3]; i++){
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
      float c = (uState[3] - float(j)) / uState[1];
      fragColor = vec4(vec3(cos(c), cos(1.1214 * c) , cos(.8 * c)) / -2. + .5, 1.);
    }
  `),l={program:m,attribLocations:{vertexPosition:o.getAttribLocation(m,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(m,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(m,"uModelViewMatrix"),state:o.getUniformLocation(m,"uState")}},h=_(o),x=o.createTexture();o.bindTexture(o.TEXTURE_2D,x),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),t.callbacks.push(()=>{E(o,l,h)}),t.modified()}function _(e){const o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o);const s=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(s),e.STATIC_DRAW),{position:o}}function S(){for(var e=t.center[0],o=t.center[1],s=i(),p=i(),m=new Float32Array(2e4),l=0;l<2e4;l++)m[l]=-1;i();for(var h=i(),x=i(),f=i(),l=0;l<t.iterations;l++){m[2*l]=r.mpfr_get_d(s,0),m[2*l+1]=r.mpfr_get_d(p,0),r.mpfr_mul(h,s,s,0),r.mpfr_mul(x,s,p,0),r.mpfr_mul(f,p,p,0),r.mpfr_sub(s,h,f,0),r.mpfr_add(s,s,e,0),r.mpfr_add(p,x,x,0),r.mpfr_add(p,p,o,0);var u=r.mpfr_get_d(s,0),d=r.mpfr_get_d(p,0);if(u*u+d*d>400)break}return m}function E(e,o,s){var p=S(),m=new Float32Array(p);e.texImage2D(e.TEXTURE_2D,0,e.R32F,100,200,0,e.RED,e.FLOAT,m),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let l,h;[l,h]=U(e);{const x=2,f=e.FLOAT,u=!1,d=0,T=0;e.bindBuffer(e.ARRAY_BUFFER,s.position),e.vertexAttribPointer(o.attribLocations.vertexPosition,x,f,u,d,T),e.enableVertexAttribArray(o.attribLocations.vertexPosition)}e.useProgram(o.program),e.uniformMatrix4fv(o.uniformLocations.projectionMatrix,!1,l),e.uniformMatrix4fv(o.uniformLocations.modelViewMatrix,!1,h),e.uniform4f(o.uniformLocations.state,t.center[0],t.cmapscale,t.radius,t.iterations);{const x=0,f=4;e.drawArrays(e.TRIANGLE_STRIP,x,f)}}});
