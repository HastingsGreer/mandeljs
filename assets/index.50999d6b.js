import{c as D,p as O,t as X,i as z}from"./vendor.0514c734.js";const G=function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))o(m);new MutationObserver(m=>{for(const _ of m)if(_.type==="childList")for(const E of _.addedNodes)E.tagName==="LINK"&&E.rel==="modulepreload"&&o(E)}).observe(document,{childList:!0,subtree:!0});function y(m){const _={};return m.integrity&&(_.integrity=m.integrity),m.referrerpolicy&&(_.referrerPolicy=m.referrerpolicy),m.crossorigin==="use-credentials"?_.credentials="include":m.crossorigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function o(m){if(m.ep)return;m.ep=!0;const _=y(m);fetch(m.href,_)}};G();function H(e,f){const y=e.getBoundingClientRect();return[f.clientX-y.left,f.clientY-y.top]}function W(e,f){var y=canvasDom.getBoundingClientRect();return[f.touches[0].clientX-y.left,f.touches[0].clientY-y.top]}function Y(e,f,y){const o=C(e,e.VERTEX_SHADER,f),m=C(e,e.FRAGMENT_SHADER,y),_=e.createProgram();return e.attachShader(_,o),e.attachShader(_,m),e.linkProgram(_),e.getProgramParameter(_,e.LINK_STATUS)?_:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(_)),null)}function C(e,f,y){const o=e.createShader(f);return e.shaderSource(o,y),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(console.log("An error occurred compiling the shaders: "+e.getShaderInfoLog(o)),e.deleteShader(o),null)}function K(e){const f=45*Math.PI/180,y=e.canvas.clientWidth/e.canvas.clientHeight,o=.1,m=100,_=D();O(_,f,y,o,m);const E=D();return X(E,E,[-0,0,-2.5]),[_,E]}z().then(({binding:e})=>{fetch("https://apj.hgreer.com/mandeljs",{method:"GET",cache:"no-store",mode:"no-cors"}),console.log(e);function f(){var t=e.mpfr_t();return e.mpfr_init_set_d(t,0,0),e.mpfr_set_prec(t,1200),e.mpfr_set_d(t,0,0),t}function y(t){var s=f();e.mpfr_log2(s,t,0);var a=e.mpfr_get_d(s,0);return a}let o={center:[f(),f()],radius:f(),iterations:1e3,cmapscale:20,callbacks:[],modified:function(){for(const t of this.callbacks)t()},set:function(t,s,a){e.mpfr_set_d(this.center[0],t,0),e.mpfr_set_d(this.center[1],s,0),e.mpfr_set_d(this.radius,a,0),this.modified()},update:function(t,s){var a=f();e.mpfr_mul_d(a,this.radius,t,0);var i=f();e.mpfr_mul_d(i,this.radius,-s,0),e.mpfr_mul_d(this.radius,this.radius,1/2,0),e.mpfr_add(this.center[0],this.center[0],a,0),e.mpfr_add(this.center[1],this.center[1],i,0),this.modified()}};function m(t,s){var i;var a=t.replace(/\s+/g,"").split(";");return a=(i=a.find(r=>r.startsWith(s+"=")))==null?void 0:i.split("=")[1],a}document.cookie.length>30?(e.mpfr_set_string(o.center[0],m(document.cookie,"x"),10,0),e.mpfr_set_string(o.center[1],m(document.cookie,"y"),10,0),e.mpfr_set_string(o.radius,m(document.cookie,"radius"),10,0)):(e.mpfr_set_string(o.center[0],"0",10,0),e.mpfr_set_string(o.center[1],"0",10,0),e.mpfr_set_string(o.radius,"2",10,0)),_();function _(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",o.iterations=1e3,o.cmapscale=20.1,o.set(0,0,2)}),document.querySelector("#out").addEventListener("click",()=>{e.mpfr_mul_d(o.radius,o.radius,2,0),o.modified()});const t=Math.min(window.innerWidth,700),s=Math.min(t,window.innerHeight),a=document.querySelector("#canvas");a.width=s,a.height=s,a.addEventListener("click",d=>{let p,l;[p,l]=H(a,d),p=p/(s/2)-1,l=l/(s/2)-1,o.update(p,l)}),a.addEventListener("touchstart",d=>{let p,l;[p,l]=W(a,d),p=p/(s/2)-1,l=l/(s/2)-1,o.update(p,l)}),document.querySelector("#iterations").addEventListener("input",d=>{o.iterations=parseInt(d.target.value),o.modified()}),document.querySelector("#cmapscale").addEventListener("input",d=>{o.cmapscale=parseFloat(d.target.value),o.modified()});function i(){var d=document.querySelector("#clickpos").value;console.log("asfdsafsda",d),e.mpfr_set_string(o.center[0],m(d,"re"),10,0),e.mpfr_set_string(o.center[1],m(d,"im"),10,0),e.mpfr_set_string(o.radius,m(d,"r"),10,0);var p=f();+m(d,"iterations")&&(o.iterations=+m(d,"iterations")),e.mpfr_log2(p,o.radius,0);var l=e.mpfr_get_exp(o.radius,0),h=e.mpfr_get_d(p,0);console.log("radius",h,l),console.log("r",m(d,"r")),console.log(o),o.modified(),console.log(o),console.log("blur")}document.querySelector("#clickpos").addEventListener("blur",i),document.getElementById("clickpos").onPaste=i,o.callbacks.push(()=>{let d=e.mpfr_to_string(o.center[0],10,0,!1),p=e.mpfr_to_string(o.center[1],10,0,!1),l=e.mpfr_to_string(o.radius,10,0,!1);document.cookie="x="+d+";max-age=31536000",document.cookie="y="+p+";max-age=31536000",document.cookie="radius="+l+";max-age=31536000";function h(S){var w=10+l.replace(/0+\d$/,"").split("0").length;return S.slice(0,w)}document.querySelector("#clickpos").value="re="+h(d)+"; im="+h(p)+"; r="+h(l)+"; iterations="+o.iterations,window.history.replaceState(null,document.title,"/mandeljs/?;"+document.getElementById("clickpos").value.replace(/ /g,""))});const r=a.getContext("webgl2");if(!r){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const x=Y(r,`#version 300 es
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
  int row = i / 1024;
  return texelFetch(sequence, ivec2( i % 1024, row), 0)[0];
}
float get_orbit_y(int i) {
  i = i * 3 + 1;
  int row = i / 1024;
  return texelFetch(sequence, ivec2( i % 1024, row), 0)[0];
}
float get_orbit_scale(int i) {
  i = i * 3 + 2;
  int row = i / 1024;
  return texelFetch(sequence, ivec2( i % 1024, row), 0)[0];
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

    if (isinf(unS)) {
    unS = 0.;
      }

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


    if ( true && dx * dx + dy * dy > 1000000.) {
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

    if (true  && fx * fx + fy * fy < S * S * dx * dx + S * S * dy * dy || (x == -1. && y == -1.)) {
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
  `),q={program:x,attribLocations:{vertexPosition:r.getAttribLocation(x,"aVertexPosition")},uniformLocations:{projectionMatrix:r.getUniformLocation(x,"uProjectionMatrix"),modelViewMatrix:r.getUniformLocation(x,"uModelViewMatrix"),state:r.getUniformLocation(x,"uState"),poly1:r.getUniformLocation(x,"poly1"),poly2:r.getUniformLocation(x,"poly2")}},T=E(r),v=r.createTexture();r.bindTexture(r.TEXTURE_2D,v),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.pixelStorei(r.UNPACK_ALIGNMENT,1),o.callbacks.unshift(()=>{I(r,q,T)}),window.location.href.includes(";")&&(document.getElementById("clickpos").innerText=window.location.href,i()),o.modified()}function E(t){const s=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,s);const a=[1,1,-1,1,1,-1,-1,-1];return t.bufferData(t.ARRAY_BUFFER,new Float32Array(a),t.STATIC_DRAW),{position:s}}function g(t,s){var[a,i]=t,[r,n]=s,u=Math.max(i,n);return u>i?a=a*Math.pow(2,i-u):r=r*Math.pow(2,n-u),[a-r,u]}function M(t,s){var[a,i]=t,[r,n]=s,u=Math.max(i,n);return u>i?a=a*Math.pow(2,i-u):r=r*Math.pow(2,n-u),[a+r,u]}function c(t,s){var[a,i]=t,[r,n]=s,u=a*r,x=i+n;if(u!=0){var q=Math.round(Math.log2(Math.abs(u)));u=u/Math.pow(2,q),x=x+q}return[u,x]}function b(t,s){var[a,i]=t,[r,n]=s,u=Math.max(i,n);return u>i?a=a*Math.pow(2,i-u):r=r*Math.pow(2,n-u),[Math.max(Math.abs(a),Math.abs(r)),u]}function B(t,s){var[a,i]=t,[r,n]=s,u=Math.max(i,n);return u>i?a=a*Math.pow(2,i-u):r=r*Math.pow(2,n-u),a>r}function V(){for(var t=o.center[0],s=o.center[1],a=f(),i=f(),r=new Float32Array(1024*1024),n=0;n<1024*1024;n++)r[n]=-1;var u=f(),x=f(),q=f(),T=0,v=[0,0],d=[0,0],p=[0,0],l=[0,0],h=[0,0],S=[0,0],w=[0,0,0,0,0,0],R=!0;f(),f();for(var n=0;n<o.iterations;n++){var A=e.mpfr_get_exp(a),U=e.mpfr_get_exp(i),P=Math.max(A,U);P<-1e4&&(P=0);var F=0;r[3*n]=e.mpfr_get_d_2exp(F,a,0)/Math.pow(2,P-A),r[3*n+1]=e.mpfr_get_d_2exp(F,i,0)/Math.pow(2,P-U),r[3*n+2]=P;var k=[r[3*n],r[3*n+2]],L=[r[3*n+1],r[3*n+2]];e.mpfr_mul(u,a,a,0),e.mpfr_mul(x,a,i,0),e.mpfr_mul(q,i,i,0),e.mpfr_sub(a,u,q,0),e.mpfr_add(a,a,t,0),e.mpfr_add(i,x,x,0),e.mpfr_add(i,i,s,0);var N=[v,d,p,l,h,S];if([v,d,p,l,h,S]=[M(c([2,0],g(c(k,v),c(L,d))),[1,0]),c([2,0],M(c(k,d),c(L,v))),g(M(c([2,0],g(c(k,p),c(L,l))),c(v,v)),c(d,d)),M(c([2,0],M(c(k,l),c(L,p))),c(c([2,0],v),d)),c([2,0],M(g(c(k,h),c(L,S)),g(c(p,v),c(l,d)))),c([2,0],M(M(M(c(k,S),c(L,h)),c(p,d)),c(l,v)))],k=[e.mpfr_get_d_2exp(F,a,0),e.mpfr_get_exp(a)],L=[e.mpfr_get_d_2exp(F,i,0),e.mpfr_get_exp(i)],n==0||B(b(p,l),c([1e3,e.mpfr_get_exp(o.radius)],b(h,S)))?R&&(w=N,T=n):R=!1,B(M(c(k,k),c(L,L)),[400,0]))break}return console.log("plim",T),window.orbit=r,console.log("orbit_len",n),[r,w,T]}function j(t){return Math.pow(2,t[1])*t[0]}function I(t,s,a){for(var[i,r,n]=V(),u=new Float32Array(i),x=2,q=2;q<i.length;q++)x=Math.min(x,Math.abs(i[q]));console.log("smallest orbit bit",x),t.texImage2D(t.TEXTURE_2D,0,t.R32F,1024,1024,0,t.RED,t.FLOAT,u),t.clearColor(0,0,0,1),t.clearDepth(1),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);let T,v;[T,v]=K(t);{const R=2,A=t.FLOAT,U=!1,P=0,F=0;t.bindBuffer(t.ARRAY_BUFFER,a.position),t.vertexAttribPointer(s.attribLocations.vertexPosition,R,A,U,P,F),t.enableVertexAttribArray(s.attribLocations.vertexPosition)}t.useProgram(s.program),t.uniformMatrix4fv(s.uniformLocations.projectionMatrix,!1,T),t.uniformMatrix4fv(s.uniformLocations.modelViewMatrix,!1,v),console.log(e.mpfr_get_exp(o.radius));var d=e.mpfr_get_exp(o.radius),p=0,l=e.mpfr_get_d_2exp(p,o.radius,0);l=[l,d],console.log(l),t.uniform4f(s.uniformLocations.state,o.center[0],o.cmapscale,1+y(o.radius),o.iterations),console.log(r);var h=c([1,0],b(r[0],r[1])),S=[1,-h[1]],w=[c(S,r[0]),c(S,r[1]),c(S,c(l,r[2])),c(S,c(l,r[3])),c(S,c(l,c(l,r[4]))),c(S,c(l,c(l,r[5])))].map(j);t.uniform4f(s.uniformLocations.poly1,w[0],w[1],w[2],w[3]),t.uniform4f(s.uniformLocations.poly2,w[4],w[5],n,h[1]),console.log("poly_scaled",w,n,0);{const R=0,A=4;t.drawArrays(t.TRIANGLE_STRIP,R,A)}}});
