import{B as A,c as x,p,t as h}from"./vendor.177a21de.js";const y=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}};y();b();function b(){console.log(new A(123.43));const o=document.querySelector("#canvas").getContext("webgl");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const t=S(o,`
    attribute vec4 aVertexPosition;
	attribute vec4 aVertexColor;
	
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

	varying lowp vec4 vColor;
	
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	  vColor = aVertexColor;
    }
  `,`
		varying lowp vec4 vColor;
	
    precision lowp float;

    void main() {
      float x = 2. * vColor[0] - 1.;
      float y = 2. * vColor[1] - 1.;

      float cx = x;
      float cy = y;
      x = 0.;
      y = 0.;

      for(int i = 0; i < 1000; i++){
        float tx = x * x - y * y + cx;
        y = 2. * x * y + cy;
        x = tx;
      }

      bool in_circ = (x * x) + (y * y) < 1.;


      gl_FragColor = vColor * float(in_circ);
      gl_FragColor[3] = 1.;
    }
  `),r={program:t,attribLocations:{vertexPosition:o.getAttribLocation(t,"aVertexPosition"),vertexColor:o.getAttribLocation(t,"aVertexColor")},uniformLocations:{projectionMatrix:o.getUniformLocation(t,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(t,"uModelViewMatrix")}},a=P(o);R(o,r,a)}function P(e){const o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o);const n=[1,1,-1,1,1,-1,-1,-1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW);const i=[1,1,1,1,1,0,0,1,0,1,0,1,0,0,1,1],t=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),{position:o,color:t}}function R(e,o,n){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const i=45*Math.PI/180,t=e.canvas.clientWidth/e.canvas.clientHeight,r=.1,a=100,m=x();p(m,i,t,r,a);const f=x();h(f,f,[-0,0,-2.5]);{const c=2,s=e.FLOAT,u=!1,d=0,l=0;e.bindBuffer(e.ARRAY_BUFFER,n.position),e.vertexAttribPointer(o.attribLocations.vertexPosition,c,s,u,d,l),e.enableVertexAttribArray(o.attribLocations.vertexPosition)}{const c=4,s=e.FLOAT,u=!1,d=0,l=0;e.bindBuffer(e.ARRAY_BUFFER,n.color),e.vertexAttribPointer(o.attribLocations.vertexColor,c,s,u,d,l),e.enableVertexAttribArray(o.attribLocations.vertexColor)}e.useProgram(o.program),e.uniformMatrix4fv(o.uniformLocations.projectionMatrix,!1,m),e.uniformMatrix4fv(o.uniformLocations.modelViewMatrix,!1,f);{const c=0,s=4;e.drawArrays(e.TRIANGLE_STRIP,c,s)}}function S(e,o,n){const i=v(e,e.VERTEX_SHADER,o),t=v(e,e.FRAGMENT_SHADER,n),r=e.createProgram();return e.attachShader(r,i),e.attachShader(r,t),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(r)),null)}function v(e,o,n){const i=e.createShader(o);return e.shaderSource(i,n),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)?i:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(i)),e.deleteShader(i),null)}
