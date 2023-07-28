import{c as M,p as F,t as U,i as D}from"./vendor.0514c734.js";const V=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))l(u);new MutationObserver(u=>{for(const d of u)if(d.type==="childList")for(const _ of d.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&l(_)}).observe(document,{childList:!0,subtree:!0});function r(u){const d={};return u.integrity&&(d.integrity=u.integrity),u.referrerpolicy&&(d.referrerPolicy=u.referrerpolicy),u.crossorigin==="use-credentials"?d.credentials="include":u.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function l(u){if(u.ep)return;u.ep=!0;const d=r(u);fetch(u.href,d)}};V();function B(t,c){const r=t.getBoundingClientRect();return[c.clientX-r.left,c.clientY-r.top]}function C(t,c){var r=canvasDom.getBoundingClientRect();return[c.touches[0].clientX-r.left,c.touches[0].clientY-r.top]}function N(t,c,r){const l=R(t,t.VERTEX_SHADER,c),u=R(t,t.FRAGMENT_SHADER,r),d=t.createProgram();return t.attachShader(d,l),t.attachShader(d,u),t.linkProgram(d),t.getProgramParameter(d,t.LINK_STATUS)?d:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(d)),null)}function R(t,c,r){const l=t.createShader(c);return t.shaderSource(l,r),t.compileShader(l),t.getShaderParameter(l,t.COMPILE_STATUS)?l:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(l)),t.deleteShader(l),null)}function j(t){const c=45*Math.PI/180,r=t.canvas.clientWidth/t.canvas.clientHeight,l=.1,u=100,d=M();F(d,c,r,l,u);const _=M();return U(_,_,[-0,0,-2.5]),[d,_]}D().then(({binding:t})=>{console.log(t);function c(){var e=t.mpfr_t();return t.mpfr_init_set_d(e,0,0),t.mpfr_set_prec(e,800),t.mpfr_set_d(e,0,0),e}let r={center:[c(),c()],radius:c(),iterations:1e3,cmapscale:20.1,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,s,a){t.mpfr_set_d(this.center[0],e,0),t.mpfr_set_d(this.center[1],s,0),t.mpfr_set_d(this.radius,a,0),this.modified()},update:function(e,s){var a=c();t.mpfr_mul_d(a,this.radius,e,0);var o=c();t.mpfr_mul_d(o,this.radius,-s,0),t.mpfr_mul_d(this.radius,this.radius,.5,0),t.mpfr_add(this.center[0],this.center[0],a,0),t.mpfr_add(this.center[1],this.center[1],o,0),this.modified()}};function l(e){var a;return(a=document.cookie.split("; ").find(o=>o.startsWith(e+"=")))==null?void 0:a.split("=")[1]}console.log(document.cookie),document.cookie.length>30?(t.mpfr_set_string(r.center[0],l("x"),10,0),t.mpfr_set_string(r.center[1],l("y"),10,0),t.mpfr_set_string(r.radius,l("radius"),10,0)):(t.mpfr_set_string(r.center[0],"0",10,0),t.mpfr_set_string(r.center[1],"0",10,0),t.mpfr_set_string(r.radius,"2",10,0)),u();function u(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",r.iterations=1e3,r.cmapscale=20.1,r.set(0,0,2)}),document.querySelector("#out").addEventListener("click",()=>{t.mpfr_mul_d(r.radius,r.radius,2,0),r.modified()});const e=Math.min(window.innerWidth,700),s=Math.min(e,window.innerHeight),a=document.querySelector("#canvas");a.width=s,a.height=s,a.addEventListener("click",f=>{let i,n;[i,n]=B(a,f),i=i/(s/2)-1,n=n/(s/2)-1,r.update(i,n)}),a.addEventListener("touchstart",f=>{let i,n;[i,n]=C(a,f),i=i/(s/2)-1,n=n/(s/2)-1,r.update(i,n)}),document.querySelector("#iterations").addEventListener("input",f=>{r.iterations=parseInt(f.target.value),r.modified()}),document.querySelector("#cmapscale").addEventListener("input",f=>{r.cmapscale=parseFloat(f.target.value),r.modified()}),r.callbacks.push(()=>{let f=t.mpfr_to_string(r.center[0],10,0,!1),i=t.mpfr_to_string(r.center[1],10,0,!1),n=t.mpfr_to_string(r.radius,10,0,!1);document.cookie="x="+f+";max-age=31536000",document.cookie="y="+i+";max-age=31536000",document.cookie="radius="+n+";max-age=31536000",document.querySelector("#clickpos").innerText=f+" + "+i+"i"});const o=a.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const y=N(o,`#version 300 es
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
  float sqrx =  (dcx * dcx - dcy * dcy);
  float sqry =  (2. * dcx * dcy);

  float cux =  (dcx * sqrx - dcy * sqry);
  float cuy =  (dcx * sqry + dcy * sqrx);
  float dx = poly1[0]  * dcx - poly1[1] *  dcy + poly1[2] * sqrx - poly1[3] * sqry ;// + poly2[0] * cux - poly2[1] * cuy;
  float dy = poly1[0] *  dcy + poly1[1] *  dcx + poly1[2] * sqry + poly1[3] * sqrx ;//+ poly2[0] * cuy + poly2[1] * cux;


  //dx = 0.;
  //dy = 0.;
      
  int k = int(poly2[2]);

  if (true) {
      dx = 0.;
      dy = 0.;
      k = 0;
  }
  //if (dx * dx + dy * dy < 100000000000000000000.){
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
  `),v={program:y,attribLocations:{vertexPosition:o.getAttribLocation(y,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(y,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(y,"uModelViewMatrix"),state:o.getUniformLocation(y,"uState"),poly1:o.getUniformLocation(y,"poly1"),poly2:o.getUniformLocation(y,"poly2")}},q=d(o),E=o.createTexture();o.bindTexture(o.TEXTURE_2D,E),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),r.callbacks.push(()=>{A(o,v,q)}),r.modified()}function d(e){const s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s);const a=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),{position:s}}function _(){for(var e=r.center[0],s=r.center[1],a=c(),o=c(),m=new Float32Array(512*512),p=0;p<512*512;p++)m[p]=-1;for(var y=c(),v=c(),q=c(),E=0,f=0,i=0,n=0,x=0,L=0,T=0,w=[0,0,0,0,0,0],P=!0,p=0;p<r.iterations;p++){m[2*p]=t.mpfr_get_d(a,0),m[2*p+1]=t.mpfr_get_d(o,0);var h=t.mpfr_get_d(a,0),S=t.mpfr_get_d(o,0);t.mpfr_mul(y,a,a,0),t.mpfr_mul(v,a,o,0),t.mpfr_mul(q,o,o,0),t.mpfr_sub(a,y,q,0),t.mpfr_add(a,a,e,0),t.mpfr_add(o,v,v,0),t.mpfr_add(o,o,s,0);var k=[f,i,n,x,L,T];if([f,i,n,x,L,T]=[2*(h*f-S*i)+1,2*(h*i+S*f),2*(h*n-S*x)+f*f-i*i,2*(h*x+S*n)+2*f*i,2*(h*L-S*T+n*f-x*i),2*(h*T+S*L+n*i+x*f)],h=t.mpfr_get_d(a,0),S=t.mpfr_get_d(o,0),Math.sqrt(n*n+x*x)>=1e3*t.mpfr_get_d(r.radius,0)*Math.sqrt(L*L+T*T)?P&&(w=k,E=p):P=!1,h*h+S*S>400)break}return console.log("plim",E),[m,w,E]}function A(e,s,a){for(var[o,m,p]=_(),y=new Float32Array(o),v=2,q=2;q<o.length;q++)v=Math.min(v,Math.abs(o[q]));console.log("smallest orbit bit",v),e.texImage2D(e.TEXTURE_2D,0,e.R32F,512,512,0,e.RED,e.FLOAT,y),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let E,f;[E,f]=j(e);{const n=2,x=e.FLOAT,L=!1,T=0,w=0;e.bindBuffer(e.ARRAY_BUFFER,a.position),e.vertexAttribPointer(s.attribLocations.vertexPosition,n,x,L,T,w),e.enableVertexAttribArray(s.attribLocations.vertexPosition)}e.useProgram(s.program),e.uniformMatrix4fv(s.uniformLocations.projectionMatrix,!1,E),e.uniformMatrix4fv(s.uniformLocations.modelViewMatrix,!1,f),console.log(t.mpfr_get_exp(r.radius));var i=t.mpfr_get_d(r.radius,0);e.uniform4f(s.uniformLocations.state,r.center[0],r.cmapscale,t.mpfr_get_exp(r.radius),r.iterations),console.log(m),e.uniform4f(s.uniformLocations.poly1,m[0],m[1],i*m[2],i*m[3]),e.uniform4f(s.uniformLocations.poly2,i*i*m[4],i*i*m[5],p,0);{const n=0,x=4;e.drawArrays(e.TRIANGLE_STRIP,n,x)}}});
