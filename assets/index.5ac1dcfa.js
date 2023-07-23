import{c as M,p as F,t as U,i as k}from"./vendor.0514c734.js";const D=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))u(l);new MutationObserver(l=>{for(const n of l)if(n.type==="childList")for(const _ of n.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&u(_)}).observe(document,{childList:!0,subtree:!0});function r(l){const n={};return l.integrity&&(n.integrity=l.integrity),l.referrerpolicy&&(n.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?n.credentials="include":l.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(l){if(l.ep)return;l.ep=!0;const n=r(l);fetch(l.href,n)}};D();function B(t,a){const r=t.getBoundingClientRect();return[a.clientX-r.left,a.clientY-r.top]}function C(t,a){var r=canvasDom.getBoundingClientRect();return[a.touches[0].clientX-r.left,a.touches[0].clientY-r.top]}function V(t,a,r){const u=R(t,t.VERTEX_SHADER,a),l=R(t,t.FRAGMENT_SHADER,r),n=t.createProgram();return t.attachShader(n,u),t.attachShader(n,l),t.linkProgram(n),t.getProgramParameter(n,t.LINK_STATUS)?n:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(n)),null)}function R(t,a,r){const u=t.createShader(a);return t.shaderSource(u,r),t.compileShader(u),t.getShaderParameter(u,t.COMPILE_STATUS)?u:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(u)),t.deleteShader(u),null)}function N(t){const a=45*Math.PI/180,r=t.canvas.clientWidth/t.canvas.clientHeight,u=.1,l=100,n=M();F(n,a,r,u,l);const _=M();return U(_,_,[-0,0,-2.5]),[n,_]}k().then(({binding:t})=>{console.log(t);function a(){var e=t.mpfr_t();return t.mpfr_init_set_d(e,0,0),t.mpfr_set_prec(e,800),t.mpfr_set_d(e,0,0),e}let r={center:[a(),a()],radius:a(),iterations:1e3,cmapscale:20.1,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,s,i){t.mpfr_set_d(this.center[0],e,0),t.mpfr_set_d(this.center[1],s,0),t.mpfr_set_d(this.radius,i,0),this.modified()},update:function(e,s){var i=a();t.mpfr_mul_d(i,this.radius,e,0);var o=a();t.mpfr_mul_d(o,this.radius,-s,0),t.mpfr_mul_d(this.radius,this.radius,.5,0),t.mpfr_add(this.center[0],this.center[0],i,0),t.mpfr_add(this.center[1],this.center[1],o,0),this.modified()}};t.mpfr_set_d(r.center[0],-1.1875,0),t.mpfr_set_d(r.center[1],-.3030073924731182,0),t.mpfr_set_d(r.radius,Math.pow(2,-7),0),u();function u(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",r.iterations=1e3,r.cmapscale=20.1,r.set(0,0,2)});const e=Math.min(window.innerWidth,700),s=Math.min(e,window.innerHeight),i=document.querySelector("#canvas");i.width=s,i.height=s,i.addEventListener("click",d=>{let c,f;[c,f]=B(i,d),c=c/(s/2)-1,f=f/(s/2)-1,r.update(c,f)}),i.addEventListener("touchstart",d=>{let c,f;[c,f]=C(i,d),c=c/(s/2)-1,f=f/(s/2)-1,r.update(c,f)}),document.querySelector("#iterations").addEventListener("input",d=>{r.iterations=parseInt(d.target.value),r.modified()}),document.querySelector("#cmapscale").addEventListener("input",d=>{r.cmapscale=parseFloat(d.target.value),r.modified()}),r.callbacks.push(()=>{let d=t.mpfr_to_string(r.center[0],10,0,!1),c=t.mpfr_to_string(r.center[1],10,0,!1);document.querySelector("#clickpos").innerText=d+" + "+c+"i"});const o=i.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const y=V(o,`#version 300 es
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
uniform vec4 poly1;
uniform vec4 poly2;
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

  int q = int(uState[2]) - 1;
  int cq = q;
  float S = pow(2., float(q));
  float dcx = delta[0];
  float dcy = delta[1];
  float x;
  float y;
  // dx + dyi = (p0 + p1 i) * (dcx, dcy) + (p2 + p3i) * (dcx + dcy * i) * (dcx + dcy * i)
  float sqrx =S *  (dcx * dcx - dcy * dcy);
  float sqry =S *  (2. * dcx * dcy);

  float cux = S * (dcx * sqrx - dcy * sqry);
  float cuy = S * (dcx * sqry + dcy * sqrx);
  float dx = poly1[0]  * dcx - poly1[1] *  dcy + poly1[2] * sqrx - poly1[3] * sqry + poly2[0] * cux - poly2[1] * cuy;
  float dy = poly1[0] *  dcy + poly1[1] *  dcx + poly1[2] * sqry + poly1[3] * sqrx + poly2[0] * cuy + poly2[1] * cux;


  //dx = 0.;
  //dy = 0.;
      
  int k = int(poly2[2]);
  //if (dx * dx + dy * dy > 1.){
  //fragColor = vec4(1, 0, 1, 1);
  //return;
  //}
  int j = k;
  x = get_orbit_x(k);
  y = get_orbit_y(k);
  for (int i = k; float(i) < uState[3]; i++){
    j += 1;
    k += 1;
    float tx = 2. * x * dx - 2. * y * dy + S * dx * dx - S * dy * dy + dcx;
    dy = 2. * x * dy + 2. * y * dx + S * 2. * dx * dy + dcy;
    dx = tx;
    x = get_orbit_x(k);
    y = get_orbit_y(k);
    float fx = x + S * dx;
    float fy = y + S * dy;
    if (fx * fx + fy * fy > 4.){
      break;
    }
    if ( dx * dx + dy * dy > 4.0) {
      dx = dx / 2.;
      dy = dy / 2.;
      q = q + 1;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
    }
    if ( dx * dx + dy * dy < .25) {
      dx = dx * 2.;
      dy = dy * 2.;
      q = q - 1;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
  }

    if (fx * fx + fy * fy < S * S * dx * dx + S * S * dy * dy || (x == -1. && y == -1.)) {
      dx  = fx;
      dy = fy;
      q = 0;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
      k = 0;
      x = get_orbit_x(0);
      y = get_orbit_y(0);
    }
  }
  float c = (uState[3] - float(j)) / uState[1];
  fragColor = vec4(vec3(cos(c), cos(1.1214 * c) , cos(.8 * c)) / -2. + .5, 1.);
}
  `),v={program:y,attribLocations:{vertexPosition:o.getAttribLocation(y,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(y,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(y,"uModelViewMatrix"),state:o.getUniformLocation(y,"uState"),poly1:o.getUniformLocation(y,"poly1"),poly2:o.getUniformLocation(y,"poly2")}},q=l(o),E=o.createTexture();o.bindTexture(o.TEXTURE_2D,E),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),r.callbacks.push(()=>{_(o,v,q)}),r.modified()}function l(e){const s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s);const i=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),{position:s}}function n(){for(var e=r.center[0],s=r.center[1],i=a(),o=a(),m=new Float32Array(512*512),p=0;p<512*512;p++)m[p]=-1;for(var y=a(),v=a(),q=a(),E=0,d=0,c=0,f=0,x=0,L=0,T=0,w=[0,0,0,0,0,0],P=!0,p=0;p<r.iterations;p++){m[2*p]=t.mpfr_get_d(i,0),m[2*p+1]=t.mpfr_get_d(o,0);var h=t.mpfr_get_d(i,0),S=t.mpfr_get_d(o,0);t.mpfr_mul(y,i,i,0),t.mpfr_mul(v,i,o,0),t.mpfr_mul(q,o,o,0),t.mpfr_sub(i,y,q,0),t.mpfr_add(i,i,e,0),t.mpfr_add(o,v,v,0),t.mpfr_add(o,o,s,0);var A=[d,c,f,x,L,T];if([d,c,f,x,L,T]=[2*(h*d-S*c)+1,2*(h*c+S*d),2*(h*f-S*x)+d*d-c*c,2*(h*x+S*f)+2*d*c,2*(h*L-S*T+f*d-x*c),2*(h*T+S*L+f*c+x*d)],h=t.mpfr_get_d(i,0),S=t.mpfr_get_d(o,0),Math.sqrt(f*f+x*x)>=100*t.mpfr_get_d(r.radius,0)*Math.sqrt(L*L+T*T)?P&&(w=A,E=p):P=!1,h*h+S*S>400)break}return console.log("plim",E),[m,w,E]}function _(e,s,i){for(var[o,m,p]=n(),y=new Float32Array(o),v=2,q=2;q<o.length;q++)v=Math.min(v,Math.abs(o[q]));console.log("smallest orbit bit",v),e.texImage2D(e.TEXTURE_2D,0,e.R32F,512,512,0,e.RED,e.FLOAT,y),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let E,d;[E,d]=N(e);{const c=2,f=e.FLOAT,x=!1,L=0,T=0;e.bindBuffer(e.ARRAY_BUFFER,i.position),e.vertexAttribPointer(s.attribLocations.vertexPosition,c,f,x,L,T),e.enableVertexAttribArray(s.attribLocations.vertexPosition)}e.useProgram(s.program),e.uniformMatrix4fv(s.uniformLocations.projectionMatrix,!1,E),e.uniformMatrix4fv(s.uniformLocations.modelViewMatrix,!1,d),console.log(t.mpfr_get_exp(r.radius)),t.mpfr_get_d(r.radius,0),e.uniform4f(s.uniformLocations.state,r.center[0],r.cmapscale,t.mpfr_get_exp(r.radius),r.iterations),console.log(m),e.uniform4f(s.uniformLocations.poly1,m[0],m[1],m[2],m[3]),e.uniform4f(s.uniformLocations.poly2,m[4],m[5],p,0);{const c=0,f=4;e.drawArrays(e.TRIANGLE_STRIP,c,f)}}});
