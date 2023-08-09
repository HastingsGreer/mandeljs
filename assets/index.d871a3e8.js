import{c as R,p as V,t as B,i as C}from"./vendor.0514c734.js";const N=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))m(u);new MutationObserver(u=>{for(const d of u)if(d.type==="childList")for(const v of d.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&m(v)}).observe(document,{childList:!0,subtree:!0});function r(u){const d={};return u.integrity&&(d.integrity=u.integrity),u.referrerpolicy&&(d.referrerPolicy=u.referrerpolicy),u.crossorigin==="use-credentials"?d.credentials="include":u.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function m(u){if(u.ep)return;u.ep=!0;const d=r(u);fetch(u.href,d)}};N();function j(t,c){const r=t.getBoundingClientRect();return[c.clientX-r.left,c.clientY-r.top]}function I(t,c){var r=canvasDom.getBoundingClientRect();return[c.touches[0].clientX-r.left,c.touches[0].clientY-r.top]}function O(t,c,r){const m=A(t,t.VERTEX_SHADER,c),u=A(t,t.FRAGMENT_SHADER,r),d=t.createProgram();return t.attachShader(d,m),t.attachShader(d,u),t.linkProgram(d),t.getProgramParameter(d,t.LINK_STATUS)?d:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(d)),null)}function A(t,c,r){const m=t.createShader(c);return t.shaderSource(m,r),t.compileShader(m),t.getShaderParameter(m,t.COMPILE_STATUS)?m:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(m)),t.deleteShader(m),null)}function X(t){const c=45*Math.PI/180,r=t.canvas.clientWidth/t.canvas.clientHeight,m=.1,u=100,d=R();V(d,c,r,m,u);const v=R();return B(v,v,[-0,0,-2.5]),[d,v]}C().then(({binding:t})=>{console.log(t);function c(){var e=t.mpfr_t();return t.mpfr_init_set_d(e,0,0),t.mpfr_set_prec(e,1200),t.mpfr_set_d(e,0,0),e}let r={center:[c(),c()],radius:c(),iterations:1e3,cmapscale:20,callbacks:[],modified:function(){for(const e of this.callbacks)e()},set:function(e,s,i){t.mpfr_set_d(this.center[0],e,0),t.mpfr_set_d(this.center[1],s,0),t.mpfr_set_d(this.radius,i,0),this.modified()},update:function(e,s){var i=c();t.mpfr_mul_d(i,this.radius,e,0);var o=c();t.mpfr_mul_d(o,this.radius,-s,0),t.mpfr_mul_d(this.radius,this.radius,.5,0),t.mpfr_add(this.center[0],this.center[0],i,0),t.mpfr_add(this.center[1],this.center[1],o,0),this.modified()}};function m(e){var i;return(i=document.cookie.split("; ").find(o=>o.startsWith(e+"=")))==null?void 0:i.split("=")[1]}console.log(document.cookie),document.cookie.length>30?(t.mpfr_set_string(r.center[0],m("x"),10,0),t.mpfr_set_string(r.center[1],m("y"),10,0),t.mpfr_set_string(r.radius,m("radius"),10,0)):(t.mpfr_set_string(r.center[0],"0",10,0),t.mpfr_set_string(r.center[1],"0",10,0),t.mpfr_set_string(r.radius,"2",10,0)),u();function u(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",r.iterations=1e3,r.cmapscale=20.1,r.set(0,0,2)}),document.querySelector("#out").addEventListener("click",()=>{t.mpfr_mul_d(r.radius,r.radius,2,0),r.modified()});const e=Math.min(window.innerWidth,700),s=Math.min(e,window.innerHeight),i=document.querySelector("#canvas");i.width=s,i.height=s,i.addEventListener("click",f=>{let a,l;[a,l]=j(i,f),a=a/(s/2)-1,l=l/(s/2)-1,r.update(a,l)}),i.addEventListener("touchstart",f=>{let a,l;[a,l]=I(i,f),a=a/(s/2)-1,l=l/(s/2)-1,r.update(a,l)}),document.querySelector("#iterations").addEventListener("input",f=>{r.iterations=parseInt(f.target.value),r.modified()}),document.querySelector("#cmapscale").addEventListener("input",f=>{r.cmapscale=parseFloat(f.target.value),r.modified()}),r.callbacks.push(()=>{let f=t.mpfr_to_string(r.center[0],10,0,!1),a=t.mpfr_to_string(r.center[1],10,0,!1),l=t.mpfr_to_string(r.radius,10,0,!1);document.cookie="x="+f+";max-age=31536000",document.cookie="y="+a+";max-age=31536000",document.cookie="radius="+l+";max-age=31536000",document.querySelector("#clickpos").innerText=f+" + "+a+"i, r="+l});const o=i.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const y=O(o,`#version 300 es
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
void main() {
  int q = int(uState[2]) - 1;
  int cq = q;
  q = q + int(poly2[3]);
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

  if (false) {
      q = cq;
      dx = 0.;
      dy = 0.;
      k = 0;
  }
  int j = k;
  x = get_orbit_x(k);
  y = get_orbit_y(k);
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
  `),q={program:y,attribLocations:{vertexPosition:o.getAttribLocation(y,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(y,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(y,"uModelViewMatrix"),state:o.getUniformLocation(y,"uState"),poly1:o.getUniformLocation(y,"poly1"),poly2:o.getUniformLocation(y,"poly2")}},E=d(o),L=o.createTexture();o.bindTexture(o.TEXTURE_2D,L),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),r.callbacks.push(()=>{F(o,q,E)}),r.modified()}function d(e){const s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s);const i=[1,1,-1,1,1,-1,-1,-1];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW),{position:s}}function v(){for(var e=r.center[0],s=r.center[1],i=c(),o=c(),n=new Float32Array(512*512),_=0;_<512*512;_++)n[_]=-1;for(var y=c(),q=c(),E=c(),L=0,f=0,a=0,l=0,p=0,x=0,h=0,T=[0,0,0,0,0,0],k=!0,_=0;_<r.iterations;_++){var P=t.mpfr_get_exp(i),U=t.mpfr_get_exp(o),M=Math.max(P,U);M<-1e4&&(M=0),n[3*_]=t.mpfr_get_d(i,0)/Math.pow(2,M),n[3*_+1]=t.mpfr_get_d(o,0)/Math.pow(2,M),n[3*_+2]=M;var S=t.mpfr_get_d(i,0),w=t.mpfr_get_d(o,0);t.mpfr_mul(y,i,i,0),t.mpfr_mul(q,i,o,0),t.mpfr_mul(E,o,o,0),t.mpfr_sub(i,y,E,0),t.mpfr_add(i,i,e,0),t.mpfr_add(o,q,q,0),t.mpfr_add(o,o,s,0);var D=[f,a,l,p,x,h];if([f,a,l,p,x,h]=[2*(S*f-w*a)+1,2*(S*a+w*f),2*(S*l-w*p)+f*f-a*a,2*(S*p+w*l)+2*f*a,2*(S*x-w*h+l*f-p*a),2*(S*h+w*x+l*a+p*f)],S=t.mpfr_get_d(i,0),w=t.mpfr_get_d(o,0),Math.sqrt(l*l+p*p)>=100*t.mpfr_get_d(r.radius,0)*Math.sqrt(x*x+h*h)?k&&(T=D,L=_):k=!1,S*S+w*w>400)break}return console.log("plim",L),[n,T,L]}function F(e,s,i){for(var[o,n,_]=v(),y=new Float32Array(o),q=2,E=2;E<o.length;E++)q=Math.min(q,Math.abs(o[E]));console.log("smallest orbit bit",q),e.texImage2D(e.TEXTURE_2D,0,e.R32F,512,512,0,e.RED,e.FLOAT,y),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);let L,f;[L,f]=X(e);{const x=2,h=e.FLOAT,T=!1,k=0,P=0;e.bindBuffer(e.ARRAY_BUFFER,i.position),e.vertexAttribPointer(s.attribLocations.vertexPosition,x,h,T,k,P),e.enableVertexAttribArray(s.attribLocations.vertexPosition)}e.useProgram(s.program),e.uniformMatrix4fv(s.uniformLocations.projectionMatrix,!1,L),e.uniformMatrix4fv(s.uniformLocations.modelViewMatrix,!1,f),console.log(t.mpfr_get_exp(r.radius));var a=t.mpfr_get_d(r.radius,0);e.uniform4f(s.uniformLocations.state,r.center[0],r.cmapscale,t.mpfr_get_exp(r.radius),r.iterations),console.log(n);var l=Math.floor(Math.log2(Math.sqrt(n[0]*n[0]+n[1]*n[1]))),p=1/Math.pow(2,l);e.uniform4f(s.uniformLocations.poly1,p*n[0],p*n[1],p*a*n[2],p*a*n[3]),e.uniform4f(s.uniformLocations.poly2,p*a*a*n[4],p*a*a*n[5],_,l),console.log("poly_scaled",a*n[0],a*n[1],a*a*n[2],a*a*n[3],a*a*a*n[4],a*a*a*n[5],_,0);{const x=0,h=4;e.drawArrays(e.TRIANGLE_STRIP,x,h)}}});
