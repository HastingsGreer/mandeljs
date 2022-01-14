import{c as l,p as S,t as v}from"./vendor.f107dedf.js";const y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}};y();function P(e,t){const i=e.getBoundingClientRect();return[t.clientX-i.left,t.clientY-i.top]}function L(e,t,i){const n=m(e,e.VERTEX_SHADER,t),r=m(e,e.FRAGMENT_SHADER,i),o=e.createProgram();return e.attachShader(o,n),e.attachShader(o,r),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?o:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(o)),null)}function m(e,t,i){const n=e.createShader(t);return e.shaderSource(n,i),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(n)),e.deleteShader(n),null)}let a={center:[0,0],radius:2,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,t,i){this.center=[e,t],this.radius=i,this.modified()},update:function(e,t){this.center=[this.center[0]+this.radius*e,this.center[1]-this.radius*t],this.radius=this.radius/2,this.modified()}};b();function b(){document.querySelector("#reset").addEventListener("click",f=>{a.set(0,0,2)});const e=document.querySelector("#canvas");e.addEventListener("click",f=>{let c,s;[c,s]=P(e,f),c=c/256-1,s=s/256-1,a.update(c,s)}),a.callbacks.push(()=>{document.querySelector("#clickpos").innerText=a.center});const t=e.getContext("webgl2");if(!t){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const r=L(t,`#version 300 es
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
    void main() {
      float x = delta[0];
      float y = delta[1];

      float cx = uState[2] * x + uState[0];
      float cy = uState[2] * y + uState[1];
      x = 0.;
      y = 0.;
      int j;
      for(int i = 0; i < 5000; i++){
        j += 1;
        float tx = x * x - y * y + cx;
        y = 2. * x * y + cy;
        x = tx;
        if (x*x + y * y > 4.) {
            break;
        }
      }

      float c =  float(j % 100) / 100.;
      fragColor = vec4(c, c, c, 1);
    }
  `),o={program:r,attribLocations:{vertexPosition:t.getAttribLocation(r,"aVertexPosition")},uniformLocations:{projectionMatrix:t.getUniformLocation(r,"uProjectionMatrix"),modelViewMatrix:t.getUniformLocation(r,"uModelViewMatrix"),state:t.getUniformLocation(r,"uState")}},u=A(t);a.callbacks.push(()=>{M(t,o,u)}),a.modified()}function A(e){const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t);const i=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),{position:t}}function M(e,t,i){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const n=45*Math.PI/180,r=e.canvas.clientWidth/e.canvas.clientHeight,o=.1,u=100,f=l();S(f,n,r,o,u);const c=l();v(c,c,[-0,0,-2.5]);{const s=2,d=e.FLOAT,h=!1,p=0,x=0;e.bindBuffer(e.ARRAY_BUFFER,i.position),e.vertexAttribPointer(t.attribLocations.vertexPosition,s,d,h,p,x),e.enableVertexAttribArray(t.attribLocations.vertexPosition)}e.useProgram(t.program),e.uniformMatrix4fv(t.uniformLocations.projectionMatrix,!1,f),e.uniformMatrix4fv(t.uniformLocations.modelViewMatrix,!1,c),e.uniform4f(t.uniformLocations.state,a.center[0],a.center[1],a.radius,0);{const s=0,d=4;e.drawArrays(e.TRIANGLE_STRIP,s,d)}}
