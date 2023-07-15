import{c as l,p as y,t as h}from"./vendor.f107dedf.js";const p=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}};p();function v(e,t){const i=e.getBoundingClientRect();return[t.clientX-i.left,t.clientY-i.top]}function S(e,t){var i=canvasDom.getBoundingClientRect();return[t.touches[0].clientX-i.left,t.touches[0].clientY-i.top]}function _(e,t,i){const a=m(e,e.VERTEX_SHADER,t),o=m(e,e.FRAGMENT_SHADER,i),r=e.createProgram();return e.attachShader(r,a),e.attachShader(r,o),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(r)),null)}function m(e,t,i){const a=e.createShader(t);return e.shaderSource(a,i),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)?a:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(a)),e.deleteShader(a),null)}function E(e){const t=45*Math.PI/180,i=e.canvas.clientWidth/e.canvas.clientHeight,a=.1,o=100,r=l();y(r,t,i,a,o);const c=l();return h(c,c,[-0,0,-2.5]),[r,c]}let n={center:[0,0],radius:2,iterations:1e3,cmapscale:20.1,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,t,i){this.center=[e,t],this.radius=i,this.modified()},update:function(e,t){this.center=[this.center[0]+this.radius*e,this.center[1]-this.radius*t],this.radius=this.radius/2,this.modified()}};b();function b(){document.querySelector("#reset").addEventListener("click",s=>{document.querySelector("#iterations").value="10000",document.querySelector("#cmapscale").value="20.1",n.iterations=1e3,n.cmapscale=20.1,n.set(0,0,2)});const e=document.querySelector("#canvas");e.addEventListener("click",s=>{let u,d;[u,d]=v(e,s),u=u/350-1,d=d/350-1,n.update(u,d)}),e.addEventListener("touchstart",s=>{let u,d;[u,d]=S(e,s),u=u/350-1,d=d/350-1,n.update(u,d)}),document.querySelector("#iterations").addEventListener("input",s=>{n.iterations=parseInt(s.target.value),n.modified()}),document.querySelector("#cmapscale").addEventListener("input",s=>{n.cmapscale=parseFloat(s.target.value),n.modified()}),n.callbacks.push(()=>{document.querySelector("#clickpos").innerText=n.center});const t=e.getContext("webgl2");if(!t){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const o=_(t,`#version 300 es
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
  `),r={program:o,attribLocations:{vertexPosition:t.getAttribLocation(o,"aVertexPosition")},uniformLocations:{projectionMatrix:t.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:t.getUniformLocation(o,"uModelViewMatrix"),state:t.getUniformLocation(o,"uState")}},c=T(t),f=t.createTexture();t.bindTexture(t.TEXTURE_2D,f),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.pixelStorei(t.UNPACK_ALIGNMENT,1),n.callbacks.push(()=>{P(t,r,c)}),n.modified()}function T(e){const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t);const i=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),{position:t}}function L(){for(var e=n.center[0],t=n.center[1],i=0,a=0,o=new Float32Array(2e4),r=0;r<2e4;r++)o[r]=-1;for(var r=0;r<n.iterations;r++){o[2*r]=i,o[2*r+1]=a;var c=i*i-a*a+e;if(a=2*i*a+t,i=c,i*i+a*a>400)break}return o}function P(e,t,i){var a=L(),o=new Float32Array(a);e.texImage2D(e.TEXTURE_2D,0,e.R32F,100,200,0,e.RED,e.FLOAT,o),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let r,c;[r,c]=E(e);{const f=2,s=e.FLOAT,u=!1,d=0,x=0;e.bindBuffer(e.ARRAY_BUFFER,i.position),e.vertexAttribPointer(t.attribLocations.vertexPosition,f,s,u,d,x),e.enableVertexAttribArray(t.attribLocations.vertexPosition)}e.useProgram(t.program),e.uniformMatrix4fv(t.uniformLocations.projectionMatrix,!1,r),e.uniformMatrix4fv(t.uniformLocations.modelViewMatrix,!1,c),e.uniform4f(t.uniformLocations.state,n.center[0],n.cmapscale,n.radius,n.iterations);{const f=0,s=4;e.drawArrays(e.TRIANGLE_STRIP,f,s)}}
