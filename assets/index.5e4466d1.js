import{c as S,p as P,t as R,i as A}from"./vendor.0514c734.js";const M=function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}};M();function w(a,f){const r=a.getBoundingClientRect();return[f.clientX-r.left,f.clientY-r.top]}function F(a,f){var r=canvasDom.getBoundingClientRect();return[f.touches[0].clientX-r.left,f.touches[0].clientY-r.top]}function U(a,f,r){const i=E(a,a.VERTEX_SHADER,f),t=E(a,a.FRAGMENT_SHADER,r),n=a.createProgram();return a.attachShader(n,i),a.attachShader(n,t),a.linkProgram(n),a.getProgramParameter(n,a.LINK_STATUS)?n:(alert("Unable to initialize the shader program: "+a.getProgramInfoLog(n)),null)}function E(a,f,r){const i=a.createShader(f);return a.shaderSource(i,r),a.compileShader(i),a.getShaderParameter(i,a.COMPILE_STATUS)?i:(alert("An error occurred compiling the shaders: "+a.getShaderInfoLog(i)),a.deleteShader(i),null)}function b(a){const f=45*Math.PI/180,r=a.canvas.clientWidth/a.canvas.clientHeight,i=.1,t=100,n=S();P(n,f,r,i,t);const p=S();return R(p,p,[-0,0,-2.5]),[n,p]}A().then(({getContext:a,calculate:f,binding:r})=>{console.log(r);function i(){var e=r.mpfr_t();return r.mpfr_init_set_d(e,0,0),r.mpfr_set_prec(e,200),r.mpfr_set_d(e,0,0),e}i();let t={center:[i(),i()],radius:2,iterations:1e3,cmapscale:20.1,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,c,s){r.mpfr_set_d(this.center[0],e,0),r.mpfr_set_d(this.center[1],c,0),this.radius=s,this.modified()},update:function(e,c){r.mpfr_add_d(this.center[0],this.center[0],this.radius*e,0),r.mpfr_add_d(this.center[1],this.center[1],-this.radius*c,0),this.radius=this.radius/2,console.log(r.mpfr_get_d(this.center[0],0)),console.log(r.mpfr_get_d(this.center[1],0)),console.log(r.mpfr_get_prec(this.center[0])),this.modified()}};n();function n(){document.querySelector("#reset").addEventListener("click",u=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",t.iterations=1e3,t.cmapscale=20.1,t.set(0,0,2)});const e=Math.min(window.innerWidth,700),c=Math.min(e,window.innerHeight),s=document.querySelector("#canvas");s.width=c,s.height=c,s.addEventListener("click",u=>{let m,x;[m,x]=w(s,u),m=m/(c/2)-1,x=x/(c/2)-1,t.update(m,x)}),s.addEventListener("touchstart",u=>{let m,x;[m,x]=F(s,u),m=m/(c/2)-1,x=x/(c/2)-1,t.update(m,x)}),document.querySelector("#iterations").addEventListener("input",u=>{t.iterations=parseInt(u.target.value),t.modified()}),document.querySelector("#cmapscale").addEventListener("input",u=>{t.cmapscale=parseFloat(u.target.value),t.modified()}),t.callbacks.push(()=>{document.querySelector("#clickpos").innerText=t.center});const o=s.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const l=U(o,`#version 300 es
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
  `),_={program:l,attribLocations:{vertexPosition:o.getAttribLocation(l,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(l,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(l,"uModelViewMatrix"),state:o.getUniformLocation(l,"uState")}},h=p(o),v=o.createTexture();o.bindTexture(o.TEXTURE_2D,v),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),t.callbacks.push(()=>{L(o,_,h)}),t.modified()}function p(e){const c=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,c);const s=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(s),e.STATIC_DRAW),{position:c}}function T(){for(var e=t.center[0],c=t.center[1],s=i(),o=i(),y=new Float32Array(512*512),d=0;d<512*512;d++)y[d]=-1;i();for(var l=i(),_=i(),h=i(),d=0;d<t.iterations;d++){y[2*d]=r.mpfr_get_d(s,0),y[2*d+1]=r.mpfr_get_d(o,0),r.mpfr_mul(l,s,s,0),r.mpfr_mul(_,s,o,0),r.mpfr_mul(h,o,o,0),r.mpfr_sub(s,l,h,0),r.mpfr_add(s,s,e,0),r.mpfr_add(o,_,_,0),r.mpfr_add(o,o,c,0);var v=r.mpfr_get_d(s,0),u=r.mpfr_get_d(o,0);if(v*v+u*u>400)break}return y}function L(e,c,s){var o=T(),y=new Float32Array(o);e.texImage2D(e.TEXTURE_2D,0,e.R32F,512,512,0,e.RED,e.FLOAT,y),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let d,l;[d,l]=b(e);{const _=2,h=e.FLOAT,v=!1,u=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,s.position),e.vertexAttribPointer(c.attribLocations.vertexPosition,_,h,v,u,m),e.enableVertexAttribArray(c.attribLocations.vertexPosition)}e.useProgram(c.program),e.uniformMatrix4fv(c.uniformLocations.projectionMatrix,!1,d),e.uniformMatrix4fv(c.uniformLocations.modelViewMatrix,!1,l),e.uniform4f(c.uniformLocations.state,t.center[0],t.cmapscale,t.radius,t.iterations);{const _=0,h=4;e.drawArrays(e.TRIANGLE_STRIP,_,h)}}});
