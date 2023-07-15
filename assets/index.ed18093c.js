import{c as l,p as h,t as y}from"./vendor.f107dedf.js";const v=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}};v();function p(e,t){const i=e.getBoundingClientRect();return[t.clientX-i.left,t.clientY-i.top]}function _(e,t){var i=canvasDom.getBoundingClientRect();return[t.touches[0].clientX-i.left,t.touches[0].clientY-i.top]}function b(e,t,i){const n=x(e,e.VERTEX_SHADER,t),o=x(e,e.FRAGMENT_SHADER,i),r=e.createProgram();return e.attachShader(r,n),e.attachShader(r,o),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(r)),null)}function x(e,t,i){const n=e.createShader(t);return e.shaderSource(n,i),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(n)),e.deleteShader(n),null)}function E(e){const t=45*Math.PI/180,i=e.canvas.clientWidth/e.canvas.clientHeight,n=.1,o=100,r=l();h(r,t,i,n,o);const a=l();return y(a,a,[-0,0,-2.5]),[r,a]}let c={center:[0,0],radius:2,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,t,i){this.center=[e,t],this.radius=i,this.modified()},update:function(e,t){this.center=[this.center[0]+this.radius*e,this.center[1]-this.radius*t],this.radius=this.radius/2,this.modified()}};T();function T(){document.querySelector("#reset").addEventListener("click",d=>{c.set(0,0,2)});const e=document.querySelector("#canvas");e.addEventListener("click",d=>{let s,f;[s,f]=p(e,d),s=s/350-1,f=f/350-1,c.update(s,f)}),e.addEventListener("touchstart",d=>{let s,f;[s,f]=_(e,d),s=s/350-1,f=f/350-1,c.update(s,f)}),c.callbacks.push(()=>{document.querySelector("#clickpos").innerText=c.center});const t=e.getContext("webgl2");if(!t){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const o=b(t,`#version 300 es
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
     for (int i = 0; i < 10000; i++){
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
      float c = float(10000 - j) / 20.1;
      fragColor = vec4(vec3(cos(c), cos(1.1214 * c) , cos(.8 * c)) / -2. + .5, 1.);
    }
  `),r={program:o,attribLocations:{vertexPosition:t.getAttribLocation(o,"aVertexPosition")},uniformLocations:{projectionMatrix:t.getUniformLocation(o,"uProjectionMatrix"),modelViewMatrix:t.getUniformLocation(o,"uModelViewMatrix"),state:t.getUniformLocation(o,"uState")}},a=S(t),u=t.createTexture();t.bindTexture(t.TEXTURE_2D,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.pixelStorei(t.UNPACK_ALIGNMENT,1),c.callbacks.push(()=>{L(t,r,a)}),c.modified()}function S(e){const t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t);const i=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),{position:t}}function P(){for(var e=c.center[0],t=c.center[1],i=0,n=0,o=new Float32Array(2e4),r=0;r<2e4;r++)o[r]=-1;for(var r=0;r<1e4;r++){o[2*r]=i,o[2*r+1]=n;var a=i*i-n*n+e;if(n=2*i*n+t,i=a,i*i+n*n>400)break}return o}function L(e,t,i){var n=P(),o=new Float32Array(n);e.texImage2D(e.TEXTURE_2D,0,e.R32F,100,200,0,e.RED,e.FLOAT,o),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let r,a;[r,a]=E(e);{const u=2,d=e.FLOAT,s=!1,f=0,m=0;e.bindBuffer(e.ARRAY_BUFFER,i.position),e.vertexAttribPointer(t.attribLocations.vertexPosition,u,d,s,f,m),e.enableVertexAttribArray(t.attribLocations.vertexPosition)}e.useProgram(t.program),e.uniformMatrix4fv(t.uniformLocations.projectionMatrix,!1,r),e.uniformMatrix4fv(t.uniformLocations.modelViewMatrix,!1,a),e.uniform4f(t.uniformLocations.state,c.center[0],c.center[1],c.radius,0);{const u=0,d=4;e.drawArrays(e.TRIANGLE_STRIP,u,d)}}
