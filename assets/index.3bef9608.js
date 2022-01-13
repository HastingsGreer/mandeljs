import{B as v,c as x,p as A,t as S}from"./vendor.177a21de.js";const b=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}};b();let c={center:[0,0],radius:2,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,t,i){this.center=[e,t],this.radius=i,this.modified()},update:function(e,t){this.center=[this.center[0]+this.radius*e,this.center[1]-this.radius*t],this.radius=this.radius/2,this.modified()}};y();function y(){console.log(new v(123.43)),document.querySelector("#reset").addEventListener("click",f=>{c.set(0,0,2)});const e=document.querySelector("#canvas");e.addEventListener("click",f=>{let s,a;[s,a]=C(e,f),s=s/256-1,a=a/256-1,c.update(s,a)}),c.callbacks.push(()=>{document.querySelector("#clickpos").innerText=c.center});const t=e.getContext("webgl2");if(!t){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const o=R(t,`#version 300 es
    in vec4 aVertexPosition;
	in vec4 aVertexColor;
	
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

	out highp vec4 vColor;
	
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	  vColor = aVertexColor;
    }
  `,`#version 300 es
    precision highp float;
    in highp vec4 vColor;

    out vec4 fragColor;
	

    uniform vec4 uState;
    void main() {
      float x = 2. * vColor[1] - 1.;
      float y = 2. * vColor[0] - 1.;

      float cx = uState[2] * x + uState[0];
      float cy = uState[2] * y + uState[1];
      x = 0.;
      y = 0.;
      int j;
      for(int i = 0; i < 1000; i++){
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
  `),r={program:o,attribLocations:{vertexPosition:t.getAttribLocation(o,"aVertexPosition"),vertexColor:t.getAttribLocation(o,"aVertexColor")},uniformLocations:{projectionMatrix:t.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:t.getUniformLocation(o,"uModelViewMatrix"),state:t.getUniformLocation(o,"uState")}},u=L(t);c.callbacks.push(()=>{P(t,r,u)}),c.modified()}function L(e){const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t);const i=[1,1,-1,1,1,-1,-1,-1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW);const n=[1,1,1,1,1,0,0,1,0,1,0,1,0,0,1,1],o=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW),{position:t,color:o}}function P(e,t,i){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const n=45*Math.PI/180,o=e.canvas.clientWidth/e.canvas.clientHeight,r=.1,u=100,f=x();A(f,n,o,r,u);const s=x();S(s,s,[-0,0,-2.5]);{const a=2,d=e.FLOAT,l=!1,m=0,h=0;e.bindBuffer(e.ARRAY_BUFFER,i.position),e.vertexAttribPointer(t.attribLocations.vertexPosition,a,d,l,m,h),e.enableVertexAttribArray(t.attribLocations.vertexPosition)}{const a=4,d=e.FLOAT,l=!1,m=0,h=0;e.bindBuffer(e.ARRAY_BUFFER,i.color),e.vertexAttribPointer(t.attribLocations.vertexColor,a,d,l,m,h),e.enableVertexAttribArray(t.attribLocations.vertexColor)}e.useProgram(t.program),e.uniformMatrix4fv(t.uniformLocations.projectionMatrix,!1,f),e.uniformMatrix4fv(t.uniformLocations.modelViewMatrix,!1,s),e.uniform4f(t.uniformLocations.state,c.center[0],c.center[1],c.radius,0);{const a=0,d=4;e.drawArrays(e.TRIANGLE_STRIP,a,d)}}function R(e,t,i){const n=p(e,e.VERTEX_SHADER,t),o=p(e,e.FRAGMENT_SHADER,i),r=e.createProgram();return e.attachShader(r,n),e.attachShader(r,o),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(r)),null)}function p(e,t,i){const n=e.createShader(t);return e.shaderSource(n,i),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(n)),e.deleteShader(n),null)}function C(e,t){const i=e.getBoundingClientRect();return[t.clientX-i.left,t.clientY-i.top]}
