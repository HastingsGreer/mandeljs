import{c as P,p as C,t as D,i as V}from"./vendor.0514c734.js";const N=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))u(l);new MutationObserver(l=>{for(const f of l)if(f.type==="childList")for(const y of f.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&u(y)}).observe(document,{childList:!0,subtree:!0});function r(l){const f={};return l.integrity&&(f.integrity=l.integrity),l.referrerpolicy&&(f.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?f.credentials="include":l.crossorigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function u(l){if(l.ep)return;l.ep=!0;const f=r(l);fetch(l.href,f)}};N();function j(t,c){const r=t.getBoundingClientRect();return[c.clientX-r.left,c.clientY-r.top]}function z(t,c){var r=canvasDom.getBoundingClientRect();return[c.touches[0].clientX-r.left,c.touches[0].clientY-r.top]}function I(t,c,r){const u=R(t,t.VERTEX_SHADER,c),l=R(t,t.FRAGMENT_SHADER,r),f=t.createProgram();return t.attachShader(f,u),t.attachShader(f,l),t.linkProgram(f),t.getProgramParameter(f,t.LINK_STATUS)?f:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(f)),null)}function R(t,c,r){const u=t.createShader(c);return t.shaderSource(u,r),t.compileShader(u),t.getShaderParameter(u,t.COMPILE_STATUS)?u:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(u)),t.deleteShader(u),null)}function b(t){const c=45*Math.PI/180,r=t.canvas.clientWidth/t.canvas.clientHeight,u=.1,l=100,f=P();C(f,c,r,u,l);const y=P();return D(y,y,[-0,0,-2.5]),[f,y]}V().then(({binding:t})=>{console.log(t);function c(){var e=t.mpfr_t();return t.mpfr_init_set_d(e,0,0),t.mpfr_set_prec(e,1200),t.mpfr_set_d(e,0,0),e}let r={center:[c(),c()],radius:c(),iterations:1e3,cmapscale:20.1,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,s,a){t.mpfr_set_d(this.center[0],e,0),t.mpfr_set_d(this.center[1],s,0),t.mpfr_set_d(this.radius,a,0),this.modified()},update:function(e,s){var a=c();t.mpfr_mul_d(a,this.radius,e,0);var o=c();t.mpfr_mul_d(o,this.radius,-s,0),t.mpfr_mul_d(this.radius,this.radius,.5,0),t.mpfr_add(this.center[0],this.center[0],a,0),t.mpfr_add(this.center[1],this.center[1],o,0),this.modified()}};function u(e){var a;return(a=document.cookie.split("; ").find(o=>o.startsWith(e+"=")))==null?void 0:a.split("=")[1]}console.log(document.cookie),document.cookie.length>30?(t.mpfr_set_string(r.center[0],u("x"),10,0),t.mpfr_set_string(r.center[1],u("y"),10,0),t.mpfr_set_string(r.radius,u("radius"),10,0)):(t.mpfr_set_string(r.center[0],"0",10,0),t.mpfr_set_string(r.center[1],"0",10,0),t.mpfr_set_string(r.radius,"2",10,0)),l();function l(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",r.iterations=1e3,r.cmapscale=20.1,r.set(0,0,2)}),document.querySelector("#out").addEventListener("click",()=>{t.mpfr_mul_d(r.radius,r.radius,2,0),r.modified()});const e=Math.min(window.innerWidth,700),s=Math.min(e,window.innerHeight),a=document.querySelector("#canvas");a.width=s,a.height=s,a.addEventListener("click",d=>{let i,n;[i,n]=j(a,d),i=i/(s/2)-1,n=n/(s/2)-1,r.update(i,n)}),a.addEventListener("touchstart",d=>{let i,n;[i,n]=z(a,d),i=i/(s/2)-1,n=n/(s/2)-1,r.update(i,n)}),document.querySelector("#iterations").addEventListener("input",d=>{r.iterations=parseInt(d.target.value),r.modified()}),document.querySelector("#cmapscale").addEventListener("input",d=>{r.cmapscale=parseFloat(d.target.value),r.modified()}),r.callbacks.push(()=>{let d=t.mpfr_to_string(r.center[0],10,0,!1),i=t.mpfr_to_string(r.center[1],10,0,!1),n=t.mpfr_to_string(r.radius,10,0,!1);document.cookie="x="+d+";max-age=31536000",document.cookie="y="+i+";max-age=31536000",document.cookie="radius="+n+";max-age=31536000",document.querySelector("#clickpos").innerText=d+" + "+i+"i, r="+n});const o=a.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const _=I(o,`#version 300 es
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
  i = i * 3;
  int row = i / 512;
  return texelFetch(sequence, ivec2( i % 512, row), 0)[0];
}
float get_orbit_y(int i) {
  i = i * 3 + 1;
  int row = i / 512;
  return texelFetch(sequence, ivec2( i % 512, row), 0)[0];
}
float get_orbit_scale(int i) {
  i = i * 3 + 2;
  int row = i / 512;
  return texelFetch(sequence, ivec2( i % 512, row), 0)[0];
}

vec2 floatexp(float z) {
  return vec2(0, 0);
}

int exponent(float z) {
  uint ex = (floatBitsToUint(z)>>23)&255U;
  int exi = int(ex);
  return exi;
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
//	x = x * pow(2., get_orbit_scale(k));
//	y = y * pow(2., get_orbit_scale(k));
  for (int i = k; float(i) < uState[3]; i++){
    j += 1;
    k += 1;
   float os = get_orbit_scale(k - 1);
   dcx = delta[0] * pow(2., float(-q + cq - int(os)));
   dcy = delta[1] * pow(2., float(-q + cq - int(os)));
    float unS = pow(2., float(q) -get_orbit_scale(k - 1));

    float tx = 2. * x * dx - 2. * y * dy + unS  * dx * dx - unS * dy * dy + dcx;
    dy = 2. * x * dy + 2. * y * dx + unS * 2. * dx * dy +  dcy;
    dx = tx;

  //if (dy == 0. && k != 1){
  //fragColor = vec4(float(k) / 1000., 0, 1, 1);
  //return;
  //}
    q = q + int(os);
    S = pow(2., float(q));

    x = get_orbit_x(k);
    y = get_orbit_y(k);
    float fx = x * pow(2., get_orbit_scale(k)) + S * dx;
    float fy = y * pow(2., get_orbit_scale(k))+ S * dy;
    if (fx * fx + fy * fy > 4.){
      break;
    }
    if ( true && dx * dx + dy * dy > 4.) {
      dx = dx / 2.;
      dy = dy / 2.;
      q = q + 1;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
    }
    if ( false && dx * dx + dy * dy < .25) {
      dx = dx * 2.;
      dy = dy * 2.;
      q = q - 1;
      S = pow(2., float(q));
      dcx = delta[0] * pow(2., float(-q + cq));
      dcy = delta[1] * pow(2., float(-q + cq));
  }

    if ( true && fx * fx + fy * fy < S * S * dx * dx + S * S * dy * dy || (x == -1. && y == -1.)) {
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
  `),v={program:_,attribLocations:{vertexPosition:o.getAttribLocation(_,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(_,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(_,"uModelViewMatrix"),state:o.getUniformLocation(_,"uState"),poly1:o.getUniformLocation(_,"poly1"),poly2:o.getUniformLocation(_,"poly2")}},q=f(o),w=o.createTexture();o.bindTexture(o.TEXTURE_2D,w),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),r.callbacks.push(()=>{A(o,v,q)}),r.modified()}function f(e){const s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s);const a=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),{position:s}}function y(){for(var e=r.center[0],s=r.center[1],a=c(),o=c(),m=new Float32Array(512*512),p=0;p<512*512;p++)m[p]=-1;for(var _=c(),v=c(),q=c(),w=0,d=0,i=0,n=0,x=0,E=0,L=0,k=[0,0,0,0,0,0],M=!0,p=0;p<r.iterations;p++){var F=t.mpfr_get_exp(a),U=t.mpfr_get_exp(o),T=Math.max(F,U);T<-1e4&&(T=0),m[3*p]=t.mpfr_get_d(a,0)/Math.pow(2,T),m[3*p+1]=t.mpfr_get_d(o,0)/Math.pow(2,T),m[3*p+2]=T;var h=t.mpfr_get_d(a,0),S=t.mpfr_get_d(o,0);t.mpfr_mul(_,a,a,0),t.mpfr_mul(v,a,o,0),t.mpfr_mul(q,o,o,0),t.mpfr_sub(a,_,q,0),t.mpfr_add(a,a,e,0),t.mpfr_add(o,v,v,0),t.mpfr_add(o,o,s,0);var B=[d,i,n,x,E,L];if([d,i,n,x,E,L]=[2*(h*d-S*i)+1,2*(h*i+S*d),2*(h*n-S*x)+d*d-i*i,2*(h*x+S*n)+2*d*i,2*(h*E-S*L+n*d-x*i),2*(h*L+S*E+n*i+x*d)],h=t.mpfr_get_d(a,0),S=t.mpfr_get_d(o,0),Math.sqrt(n*n+x*x)>=1e3*t.mpfr_get_d(r.radius,0)*Math.sqrt(E*E+L*L)?M&&(k=B,w=p):M=!1,h*h+S*S>400)break}return console.log("plim",w),[m,k,w]}function A(e,s,a){for(var[o,m,p]=y(),_=new Float32Array(o),v=2,q=2;q<o.length;q++)v=Math.min(v,Math.abs(o[q]));console.log("smallest orbit bit",v),e.texImage2D(e.TEXTURE_2D,0,e.R32F,512,512,0,e.RED,e.FLOAT,_),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let w,d;[w,d]=b(e);{const n=2,x=e.FLOAT,E=!1,L=0,k=0;e.bindBuffer(e.ARRAY_BUFFER,a.position),e.vertexAttribPointer(s.attribLocations.vertexPosition,n,x,E,L,k),e.enableVertexAttribArray(s.attribLocations.vertexPosition)}e.useProgram(s.program),e.uniformMatrix4fv(s.uniformLocations.projectionMatrix,!1,w),e.uniformMatrix4fv(s.uniformLocations.modelViewMatrix,!1,d),console.log(t.mpfr_get_exp(r.radius));var i=t.mpfr_get_d(r.radius,0);e.uniform4f(s.uniformLocations.state,r.center[0],r.cmapscale,t.mpfr_get_exp(r.radius),r.iterations),console.log(m),e.uniform4f(s.uniformLocations.poly1,m[0],m[1],i*m[2],i*m[3]),e.uniform4f(s.uniformLocations.poly2,i*i*m[4],i*i*m[5],p,0);{const n=0,x=4;e.drawArrays(e.TRIANGLE_STRIP,n,x)}}});
