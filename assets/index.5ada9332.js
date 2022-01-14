import{c as d,p as m,t as h}from"./vendor.f107dedf.js";const p=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}};p();function x(e,t){const i=e.getBoundingClientRect();return[t.clientX-i.left,t.clientY-i.top]}function S(e,t){var i=canvasDom.getBoundingClientRect();return[t.touches[0].clientX-i.left,t.touches[0].clientY-i.top]}function v(e,t,i){const n=l(e,e.VERTEX_SHADER,t),r=l(e,e.FRAGMENT_SHADER,i),o=e.createProgram();return e.attachShader(o,n),e.attachShader(o,r),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?o:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(o)),null)}function l(e,t,i){const n=e.createShader(t);return e.shaderSource(n,i),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(n)),e.deleteShader(n),null)}function y(e){const t=45*Math.PI/180,i=e.canvas.clientWidth/e.canvas.clientHeight,n=.1,r=100,o=d();m(o,t,i,n,r);const a=d();return h(a,a,[-0,0,-2.5]),[o,a]}let u={center:[0,0],radius:2,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,t,i){this.center=[e,t],this.radius=i,this.modified()},update:function(e,t){this.center=[this.center[0]+this.radius*e,this.center[1]-this.radius*t],this.radius=this.radius/2,this.modified()}};P();function P(){document.querySelector("#reset").addEventListener("click",f=>{u.set(0,0,2)});const e=document.querySelector("#canvas");e.addEventListener("click",f=>{let c,s;[c,s]=x(e,f),c=c/256-1,s=s/256-1,u.update(c,s)}),e.addEventListener("touchstart",f=>{let c,s;[c,s]=S(e,f),c=c/256-1,s=s/256-1,u.update(c,s)}),u.callbacks.push(()=>{document.querySelector("#clickpos").innerText=u.center});const t=e.getContext("webgl2");if(!t){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const r=v(t,`#version 300 es
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
  `),o={program:r,attribLocations:{vertexPosition:t.getAttribLocation(r,"aVertexPosition")},uniformLocations:{projectionMatrix:t.getUniformLocation(r,"uProjectionMatrix"),modelViewMatrix:t.getUniformLocation(r,"uModelViewMatrix"),state:t.getUniformLocation(r,"uState")}},a=L(t);u.callbacks.push(()=>{b(t,o,a)}),u.modified()}function L(e){const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t);const i=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),{position:t}}function b(e,t,i){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let n,r;[n,r]=y(e);{const o=2,a=e.FLOAT,f=!1,c=0,s=0;e.bindBuffer(e.ARRAY_BUFFER,i.position),e.vertexAttribPointer(t.attribLocations.vertexPosition,o,a,f,c,s),e.enableVertexAttribArray(t.attribLocations.vertexPosition)}e.useProgram(t.program),e.uniformMatrix4fv(t.uniformLocations.projectionMatrix,!1,n),e.uniformMatrix4fv(t.uniformLocations.modelViewMatrix,!1,r),e.uniform4f(t.uniformLocations.state,u.center[0],u.center[1],u.radius,0);{const o=0,a=4;e.drawArrays(e.TRIANGLE_STRIP,o,a)}}
