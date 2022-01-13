import{B as A,c as x,p as v,t as h}from"./vendor.177a21de.js";const y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}};y();b();function b(){console.log(new A(123.43));const e=document.querySelector("#canvas");e.addEventListener("click",u=>{let c,a;[c,a]=S(e,u),c=c/512,a=a/512,console.log(c,a)});const t=e.getContext("webgl");if(!t){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const o=L(t,`
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
      float x = 2. * vColor[1] - 1.;
      float y = 2. * vColor[0] - 1.;

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
  `),r={program:o,attribLocations:{vertexPosition:t.getAttribLocation(o,"aVertexPosition"),vertexColor:t.getAttribLocation(o,"aVertexColor")},uniformLocations:{projectionMatrix:t.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:t.getUniformLocation(o,"uModelViewMatrix")}},s=P(t);R(t,r,s)}function P(e){const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t);const i=[1,1,-1,1,1,-1,-1,-1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW);const n=[1,1,1,1,1,0,0,1,0,1,0,1,0,0,1,1],o=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW),{position:t,color:o}}function R(e,t,i){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const n=45*Math.PI/180,o=e.canvas.clientWidth/e.canvas.clientHeight,r=.1,s=100,u=x();v(u,n,o,r,s);const c=x();h(c,c,[-0,0,-2.5]);{const a=2,f=e.FLOAT,d=!1,l=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,i.position),e.vertexAttribPointer(t.attribLocations.vertexPosition,a,f,d,l,m),e.enableVertexAttribArray(t.attribLocations.vertexPosition)}{const a=4,f=e.FLOAT,d=!1,l=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,i.color),e.vertexAttribPointer(t.attribLocations.vertexColor,a,f,d,l,m),e.enableVertexAttribArray(t.attribLocations.vertexColor)}e.useProgram(t.program),e.uniformMatrix4fv(t.uniformLocations.projectionMatrix,!1,u),e.uniformMatrix4fv(t.uniformLocations.modelViewMatrix,!1,c);{const a=0,f=4;e.drawArrays(e.TRIANGLE_STRIP,a,f)}}function L(e,t,i){const n=p(e,e.VERTEX_SHADER,t),o=p(e,e.FRAGMENT_SHADER,i),r=e.createProgram();return e.attachShader(r,n),e.attachShader(r,o),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(r)),null)}function p(e,t,i){const n=e.createShader(t);return e.shaderSource(n,i),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(n)),e.deleteShader(n),null)}function S(e,t){const i=e.getBoundingClientRect();return[t.clientX-i.left,t.clientY-i.top]}
