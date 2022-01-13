import{B as v,c as x,p as b,t as y}from"./vendor.177a21de.js";const A=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}};A();let c={center:[0,0],radius:2,callbacks:[],modified:function(){for(const t of this.callbacks)t()},set:function(t,e,i){this.center=[t,e],this.radius=i,this.modified()},update:function(t,e){this.center=[this.center[0]+this.radius*t,this.center[1]-this.radius*e],this.radius=this.radius/2,this.modified()}};S();function S(){console.log(new v(123.43)),document.querySelector("#reset").addEventListener("click",f=>{c.set(0,0,2)});const t=document.querySelector("#canvas");t.addEventListener("click",f=>{let s,a;[s,a]=F(t,f),s=s/256-1,a=a/256-1,c.update(s,a)}),c.callbacks.push(()=>{document.querySelector("#clickpos").innerText=c.center});const e=t.getContext("webgl");if(!e){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const o=R(e,`
    attribute vec4 aVertexPosition;
	attribute vec4 aVertexColor;
	
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

	varying highp vec4 vColor;
	
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	  vColor = aVertexColor;
    }
  `,`
    varying highp vec4 vColor;
	
    precision highp float;

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

      bool in_circ = (x * x) + (y * y) < 4.;


      gl_FragColor = vColor * float(in_circ);
      gl_FragColor[3] = float(j) / 1000.;
    }
  `),r={program:o,attribLocations:{vertexPosition:e.getAttribLocation(o,"aVertexPosition"),vertexColor:e.getAttribLocation(o,"aVertexColor")},uniformLocations:{projectionMatrix:e.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(o,"uModelViewMatrix"),state:e.getUniformLocation(o,"uState")}},u=L(e);c.callbacks.push(()=>{P(e,r,u)}),c.modified()}function L(t){const e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e);const i=[1,1,-1,1,1,-1,-1,-1];t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW);const n=[1,1,1,1,1,0,0,1,0,1,0,1,0,0,1,1],o=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,new Float32Array(n),t.STATIC_DRAW),{position:e,color:o}}function P(t,e,i){t.clearColor(0,0,0,1),t.clearDepth(1),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);const n=45*Math.PI/180,o=t.canvas.clientWidth/t.canvas.clientHeight,r=.1,u=100,f=x();b(f,n,o,r,u);const s=x();y(s,s,[-0,0,-2.5]);{const a=2,d=t.FLOAT,l=!1,m=0,h=0;t.bindBuffer(t.ARRAY_BUFFER,i.position),t.vertexAttribPointer(e.attribLocations.vertexPosition,a,d,l,m,h),t.enableVertexAttribArray(e.attribLocations.vertexPosition)}{const a=4,d=t.FLOAT,l=!1,m=0,h=0;t.bindBuffer(t.ARRAY_BUFFER,i.color),t.vertexAttribPointer(e.attribLocations.vertexColor,a,d,l,m,h),t.enableVertexAttribArray(e.attribLocations.vertexColor)}t.useProgram(e.program),t.uniformMatrix4fv(e.uniformLocations.projectionMatrix,!1,f),t.uniformMatrix4fv(e.uniformLocations.modelViewMatrix,!1,s),t.uniform4f(e.uniformLocations.state,c.center[0],c.center[1],c.radius,0);{const a=0,d=4;t.drawArrays(t.TRIANGLE_STRIP,a,d)}}function R(t,e,i){const n=p(t,t.VERTEX_SHADER,e),o=p(t,t.FRAGMENT_SHADER,i),r=t.createProgram();return t.attachShader(r,n),t.attachShader(r,o),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)?r:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(r)),null)}function p(t,e,i){const n=t.createShader(e);return t.shaderSource(n,i),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(n)),t.deleteShader(n),null)}function F(t,e){const i=t.getBoundingClientRect();return[e.clientX-i.left,e.clientY-i.top]}
