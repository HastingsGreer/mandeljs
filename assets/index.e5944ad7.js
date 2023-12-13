import{c as R,p as D,t as C,i as V}from"./vendor.0514c734.js";const j=function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const u of s)if(u.type==="childList")for(const v of u.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&e(v)}).observe(document,{childList:!0,subtree:!0});function _(s){const u={};return s.integrity&&(u.integrity=s.integrity),s.referrerpolicy&&(u.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?u.credentials="include":s.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function e(s){if(s.ep)return;s.ep=!0;const u=_(s);fetch(s.href,u)}};j();function I(t,l){const _=t.getBoundingClientRect();return[l.clientX-_.left,l.clientY-_.top]}function N(t,l){var _=canvasDom.getBoundingClientRect();return[l.touches[0].clientX-_.left,l.touches[0].clientY-_.top]}function b(t,l,_){const e=A(t,t.VERTEX_SHADER,l),s=A(t,t.FRAGMENT_SHADER,_),u=t.createProgram();return t.attachShader(u,e),t.attachShader(u,s),t.linkProgram(u),t.getProgramParameter(u,t.LINK_STATUS)?u:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(u)),null)}function A(t,l,_){const e=t.createShader(l);return t.shaderSource(e,_),t.compileShader(e),t.getShaderParameter(e,t.COMPILE_STATUS)?e:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(e)),t.deleteShader(e),null)}function O(t){const l=45*Math.PI/180,_=t.canvas.clientWidth/t.canvas.clientHeight,e=.1,s=100,u=R();D(u,l,_,e,s);const v=R();return C(v,v,[-0,0,-2.5]),[u,v]}V().then(({binding:t})=>{fetch("https://apj.hgreer.com/mandeljs",{method:"GET",cache:"no-store",mode:"no-cors"}),console.log(t);function l(){var o=t.mpfr_t();return t.mpfr_init_set_d(o,0,0),t.mpfr_set_prec(o,1200),t.mpfr_set_d(o,0,0),o}function _(o){var n=l();t.mpfr_log2(n,o,0);var c=t.mpfr_get_d(n,0);return c}let e={center:[l(),l()],radius:l(),iterations:1e3,cmapscale:20,callbacks:[],modified:function(){for(const o of this.callbacks)o()},set:function(o,n,c){t.mpfr_set_d(this.center[0],o,0),t.mpfr_set_d(this.center[1],n,0),t.mpfr_set_d(this.radius,c,0),this.modified()},update:function(o,n){var c=l();t.mpfr_mul_d(c,this.radius,o,0);var f=l();t.mpfr_mul_d(f,this.radius,-n,0),t.mpfr_mul_d(this.radius,this.radius,.5,0),t.mpfr_add(this.center[0],this.center[0],c,0),t.mpfr_add(this.center[1],this.center[1],f,0),this.modified()}};function s(o,n){var f;var c=o.replace(/\s+/g,"").split(";");return c=(f=c.find(r=>r.startsWith(n+"=")))==null?void 0:f.split("=")[1],c}document.cookie.length>30?(t.mpfr_set_string(e.center[0],s(document.cookie,"x"),10,0),t.mpfr_set_string(e.center[1],s(document.cookie,"y"),10,0),t.mpfr_set_string(e.radius,s(document.cookie,"radius"),10,0)):(t.mpfr_set_string(e.center[0],"0",10,0),t.mpfr_set_string(e.center[1],"0",10,0),t.mpfr_set_string(e.radius,"2",10,0)),u();function u(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",e.iterations=1e3,e.cmapscale=20.1,e.set(0,0,2)}),document.querySelector("#out").addEventListener("click",()=>{t.mpfr_mul_d(e.radius,e.radius,2,0),e.modified()});const o=Math.min(window.innerWidth,700),n=Math.min(o,window.innerHeight),c=document.querySelector("#canvas");c.width=n,c.height=n,c.addEventListener("click",a=>{let d,i;[d,i]=I(c,a),d=d/(n/2)-1,i=i/(n/2)-1,e.update(d,i)}),c.addEventListener("touchstart",a=>{let d,i;[d,i]=N(c,a),d=d/(n/2)-1,i=i/(n/2)-1,e.update(d,i)}),document.querySelector("#iterations").addEventListener("input",a=>{e.iterations=parseInt(a.target.value),e.modified()}),document.querySelector("#cmapscale").addEventListener("input",a=>{e.cmapscale=parseFloat(a.target.value),e.modified()});function f(){var a=document.querySelector("#clickpos").value;console.log("asfdsafsda",a),t.mpfr_set_string(e.center[0],s(a,"re"),10,0),t.mpfr_set_string(e.center[1],s(a,"im"),10,0),t.mpfr_set_string(e.radius,s(a,"r"),10,0);var d=l();+s(a,"iterations")&&(e.iterations=+s(a,"iterations")),t.mpfr_log2(d,e.radius,0);var i=t.mpfr_get_exp(e.radius,0),p=t.mpfr_get_d(d,0);console.log("radius",p,i),console.log("r",s(a,"r")),console.log(e),e.modified(),console.log(e),console.log("blur")}document.querySelector("#clickpos").addEventListener("blur",f),document.getElementById("clickpos").onPaste=f,e.callbacks.push(()=>{let a=t.mpfr_to_string(e.center[0],10,0,!1),d=t.mpfr_to_string(e.center[1],10,0,!1),i=t.mpfr_to_string(e.radius,10,0,!1);document.cookie="x="+a+";max-age=31536000",document.cookie="y="+d+";max-age=31536000",document.cookie="radius="+i+";max-age=31536000";function p(h){console.log(i);var E=10+i.replace(/0+\d$/,"").split("0").length;return h.slice(0,E)}document.querySelector("#clickpos").value="re="+p(a)+"; im="+p(d)+"; r="+p(i)+"; iterations="+e.iterations,window.history.replaceState(null,document.title,"/mandeljs/?;"+document.getElementById("clickpos").value.replace(/ /g,""))});const r=c.getContext("webgl2");if(!r){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const y=b(r,`#version 300 es
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
  `),w={program:y,attribLocations:{vertexPosition:r.getAttribLocation(y,"aVertexPosition")},uniformLocations:{projectionMatrix:r.getUniformLocation(y,"uProjectionMatrix"),modelViewMatrix:r.getUniformLocation(y,"uModelViewMatrix"),state:r.getUniformLocation(y,"uState"),poly1:r.getUniformLocation(y,"poly1"),poly2:r.getUniformLocation(y,"poly2")}},M=v(r),x=r.createTexture();r.bindTexture(r.TEXTURE_2D,x),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.pixelStorei(r.UNPACK_ALIGNMENT,1),e.callbacks.unshift(()=>{g(r,w,M)}),window.location.href.includes(";")&&(document.getElementById("clickpos").innerText=window.location.href,f()),e.modified()}function v(o){const n=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,n);const c=[1,1,-1,1,1,-1,-1,-1];return o.bufferData(o.ARRAY_BUFFER,new Float32Array(c),o.STATIC_DRAW),{position:n}}function F(){for(var o=e.center[0],n=e.center[1],c=l(),f=l(),r=new Float32Array(512*512),m=0;m<512*512;m++)r[m]=-1;for(var k=l(),y=l(),w=l(),M=0,x=0,a=0,d=0,i=0,p=0,h=0,E=[0,0,0,0,0,0],L=!0,m=0;m<e.iterations;m++){var P=t.mpfr_get_exp(c),U=t.mpfr_get_exp(f),T=Math.max(P,U);T<-1e4&&(T=0),r[3*m]=t.mpfr_get_d(c,0)/Math.pow(2,T),r[3*m+1]=t.mpfr_get_d(f,0)/Math.pow(2,T),r[3*m+2]=T;var S=t.mpfr_get_d(c,0),q=t.mpfr_get_d(f,0);t.mpfr_mul(k,c,c,0),t.mpfr_mul(y,c,f,0),t.mpfr_mul(w,f,f,0),t.mpfr_sub(c,k,w,0),t.mpfr_add(c,c,o,0),t.mpfr_add(f,y,y,0),t.mpfr_add(f,f,n,0);var B=[x,a,d,i,p,h];if([x,a,d,i,p,h]=[2*(S*x-q*a)+1,2*(S*a+q*x),2*(S*d-q*i)+x*x-a*a,2*(S*i+q*d)+2*x*a,2*(S*p-q*h+d*x-i*a),2*(S*h+q*p+d*a+i*x)],S=t.mpfr_get_d(c,0),q=t.mpfr_get_d(f,0),m==0||Math.max(Math.abs(d),Math.abs(i))>1e3*t.mpfr_get_d(e.radius,0)*Math.max(Math.abs(p),Math.abs(h))?L&&(E=B,M=m):(L&&console.log("failure cause",Math.max(Math.abs(d),Math.abs(i)),1*t.mpfr_get_d(e.radius,0)*Math.max(Math.abs(p),Math.abs(h))),L=!1),S*S+q*q>400)break}return console.log("orbit_len",m),console.log("plim",M),[r,E,M]}function g(o,n,c){for(var[f,r,m]=F(),k=new Float32Array(f),y=2,w=2;w<f.length;w++)y=Math.min(y,Math.abs(f[w]));console.log("smallest orbit bit",y),o.texImage2D(o.TEXTURE_2D,0,o.R32F,512,512,0,o.RED,o.FLOAT,k),o.clearColor(0,0,0,1),o.clearDepth(1),o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT);let M,x;[M,x]=O(o);{const p=2,h=o.FLOAT,E=!1,L=0,P=0;o.bindBuffer(o.ARRAY_BUFFER,c.position),o.vertexAttribPointer(n.attribLocations.vertexPosition,p,h,E,L,P),o.enableVertexAttribArray(n.attribLocations.vertexPosition)}o.useProgram(n.program),o.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,M),o.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,x),console.log(t.mpfr_get_exp(e.radius));var a=t.mpfr_get_d(e.radius,0);o.uniform4f(n.uniformLocations.state,e.center[0],e.cmapscale,1+_(e.radius),e.iterations),console.log(r);var d=Math.floor(Math.log2(Math.sqrt(r[0]*r[0]+r[1]*r[1]))),i=1/Math.pow(2,d);o.uniform4f(n.uniformLocations.poly1,i*r[0],i*r[1],i*a*r[2],i*a*r[3]),o.uniform4f(n.uniformLocations.poly2,i*a*a*r[4],i*a*a*r[5],m,d),console.log("poly_scaled",a*r[0],a*r[1],a*a*r[2],a*a*r[3],a*a*a*r[4],a*a*a*r[5],m,0);{const p=0,h=4;o.drawArrays(o.TRIANGLE_STRIP,p,h)}}});
