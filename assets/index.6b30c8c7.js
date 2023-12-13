import{c as R,p as B,t as V,i as C}from"./vendor.0514c734.js";const j=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))e(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const v of u.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&e(v)}).observe(document,{childList:!0,subtree:!0});function _(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerpolicy&&(u.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?u.credentials="include":l.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function e(l){if(l.ep)return;l.ep=!0;const u=_(l);fetch(l.href,u)}};j();function N(t,n){const _=t.getBoundingClientRect();return[n.clientX-_.left,n.clientY-_.top]}function b(t,n){var _=canvasDom.getBoundingClientRect();return[n.touches[0].clientX-_.left,n.touches[0].clientY-_.top]}function I(t,n,_){const e=A(t,t.VERTEX_SHADER,n),l=A(t,t.FRAGMENT_SHADER,_),u=t.createProgram();return t.attachShader(u,e),t.attachShader(u,l),t.linkProgram(u),t.getProgramParameter(u,t.LINK_STATUS)?u:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(u)),null)}function A(t,n,_){const e=t.createShader(n);return t.shaderSource(e,_),t.compileShader(e),t.getShaderParameter(e,t.COMPILE_STATUS)?e:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(e)),t.deleteShader(e),null)}function O(t){const n=45*Math.PI/180,_=t.canvas.clientWidth/t.canvas.clientHeight,e=.1,l=100,u=R();B(u,n,_,e,l);const v=R();return V(v,v,[-0,0,-2.5]),[u,v]}C().then(({binding:t})=>{fetch("https://apj.hgreer.com/mandeljs",{method:"GET",cache:"no-store",mode:"no-cors"}),console.log(t);function n(){var r=t.mpfr_t();return t.mpfr_init_set_d(r,0,0),t.mpfr_set_prec(r,1200),t.mpfr_set_d(r,0,0),r}function _(r){var i=n();t.mpfr_log2(i,r,0);var c=t.mpfr_get_d(i,0);return c}let e={center:[n(),n()],radius:n(),iterations:1e3,cmapscale:20,callbacks:[],modified:function(){for(const r of this.callbacks)r()},set:function(r,i,c){t.mpfr_set_d(this.center[0],r,0),t.mpfr_set_d(this.center[1],i,0),t.mpfr_set_d(this.radius,c,0),this.modified()},update:function(r,i){var c=n();t.mpfr_mul_d(c,this.radius,r,0);var o=n();t.mpfr_mul_d(o,this.radius,-i,0),t.mpfr_mul_d(this.radius,this.radius,.5,0),t.mpfr_add(this.center[0],this.center[0],c,0),t.mpfr_add(this.center[1],this.center[1],o,0),this.modified()}};function l(r,i){var o;var c=r.replace(/\s+/g," ").split("; ");return c=(o=c.find(f=>f.startsWith(i+"=")))==null?void 0:o.split("=")[1],c}console.log(document.cookie),document.cookie.length>30?(t.mpfr_set_string(e.center[0],l(document.cookie,"x"),10,0),t.mpfr_set_string(e.center[1],l(document.cookie,"y"),10,0),t.mpfr_set_string(e.radius,l(document.cookie,"radius"),10,0)):(t.mpfr_set_string(e.center[0],"0",10,0),t.mpfr_set_string(e.center[1],"0",10,0),t.mpfr_set_string(e.radius,"2",10,0)),u();function u(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",e.iterations=1e3,e.cmapscale=20.1,e.set(0,0,2)}),document.querySelector("#out").addEventListener("click",()=>{t.mpfr_mul_d(e.radius,e.radius,2,0),e.modified()});const r=Math.min(window.innerWidth,700),i=Math.min(r,window.innerHeight),c=document.querySelector("#canvas");c.width=i,c.height=i,c.addEventListener("click",s=>{let a,d;[a,d]=N(c,s),a=a/(i/2)-1,d=d/(i/2)-1,e.update(a,d)}),c.addEventListener("touchstart",s=>{let a,d;[a,d]=b(c,s),a=a/(i/2)-1,d=d/(i/2)-1,e.update(a,d)}),document.querySelector("#iterations").addEventListener("input",s=>{e.iterations=parseInt(s.target.value),e.modified()}),document.querySelector("#cmapscale").addEventListener("input",s=>{e.cmapscale=parseFloat(s.target.value),e.modified()}),document.querySelector("#clickpos").addEventListener("blur",()=>{var s=document.querySelector("#clickpos").value;console.log("asfdsafsda",s),t.mpfr_set_string(e.center[0],l(s,"re"),10,0),t.mpfr_set_string(e.center[1],l(s,"im"),10,0),t.mpfr_set_string(e.radius,l(s,"r"),10,0);var a=n();t.mpfr_log2(a,e.radius,0);var d=t.mpfr_get_exp(e.radius,0),m=t.mpfr_get_d(a,0);console.log("radius",m,d),e.iterations=1e4,console.log("r",l(s,"r")),console.log(e),e.modified(),console.log(e),console.log("blur")}),e.callbacks.push(()=>{let s=t.mpfr_to_string(e.center[0],10,0,!1),a=t.mpfr_to_string(e.center[1],10,0,!1),d=t.mpfr_to_string(e.radius,10,0,!1);document.cookie="x="+s+";max-age=31536000",document.cookie="y="+a+";max-age=31536000",document.cookie="radius="+d+";max-age=31536000";function m(x){return x}document.querySelector("#clickpos").value="re="+m(s)+"; im="+m(a)+"; r="+m(d)});const o=c.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const y=I(o,`#version 300 es
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
  `),q={program:y,attribLocations:{vertexPosition:o.getAttribLocation(y,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(y,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(y,"uModelViewMatrix"),state:o.getUniformLocation(y,"uState"),poly1:o.getUniformLocation(y,"poly1"),poly2:o.getUniformLocation(y,"poly2")}},w=v(o),E=o.createTexture();o.bindTexture(o.TEXTURE_2D,E),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),e.callbacks.unshift(()=>{U(o,q,w)}),e.modified()}function v(r){const i=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,i);const c=[1,1,-1,1,1,-1,-1,-1];return r.bufferData(r.ARRAY_BUFFER,new Float32Array(c),r.STATIC_DRAW),{position:i}}function F(){for(var r=e.center[0],i=e.center[1],c=n(),o=n(),f=new Float32Array(512*512),p=0;p<512*512;p++)f[p]=-1;for(var y=n(),q=n(),w=n(),E=0,s=0,a=0,d=0,m=0,x=0,h=0,k=[0,0,0,0,0,0],L=!0,p=0;p<e.iterations;p++){var P=t.mpfr_get_exp(c),g=t.mpfr_get_exp(o),T=Math.max(P,g);T<-1e4&&(T=0),f[3*p]=t.mpfr_get_d(c,0)/Math.pow(2,T),f[3*p+1]=t.mpfr_get_d(o,0)/Math.pow(2,T),f[3*p+2]=T;var S=t.mpfr_get_d(c,0),M=t.mpfr_get_d(o,0);t.mpfr_mul(y,c,c,0),t.mpfr_mul(q,c,o,0),t.mpfr_mul(w,o,o,0),t.mpfr_sub(c,y,w,0),t.mpfr_add(c,c,r,0),t.mpfr_add(o,q,q,0),t.mpfr_add(o,o,i,0);var D=[s,a,d,m,x,h];if([s,a,d,m,x,h]=[2*(S*s-M*a)+1,2*(S*a+M*s),2*(S*d-M*m)+s*s-a*a,2*(S*m+M*d)+2*s*a,2*(S*x-M*h+d*s-m*a),2*(S*h+M*x+d*a+m*s)],S=t.mpfr_get_d(c,0),M=t.mpfr_get_d(o,0),p==0||Math.max(Math.abs(d),Math.abs(m))>1e3*t.mpfr_get_d(e.radius,0)*Math.max(Math.abs(x),Math.abs(h))?L&&(k=D,E=p):(L&&console.log("failure cause",Math.max(Math.abs(d),Math.abs(m)),1*t.mpfr_get_d(e.radius,0)*Math.max(Math.abs(x),Math.abs(h))),L=!1),S*S+M*M>400)break}return console.log("orbit_len",p),console.log("plim",E),[f,k,E]}function U(r,i,c){for(var[o,f,p]=F(),y=new Float32Array(o),q=2,w=2;w<o.length;w++)q=Math.min(q,Math.abs(o[w]));console.log("smallest orbit bit",q),r.texImage2D(r.TEXTURE_2D,0,r.R32F,512,512,0,r.RED,r.FLOAT,y),r.clearColor(0,0,0,1),r.clearDepth(1),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT);let E,s;[E,s]=O(r);{const x=2,h=r.FLOAT,k=!1,L=0,P=0;r.bindBuffer(r.ARRAY_BUFFER,c.position),r.vertexAttribPointer(i.attribLocations.vertexPosition,x,h,k,L,P),r.enableVertexAttribArray(i.attribLocations.vertexPosition)}r.useProgram(i.program),r.uniformMatrix4fv(i.uniformLocations.projectionMatrix,!1,E),r.uniformMatrix4fv(i.uniformLocations.modelViewMatrix,!1,s),console.log(t.mpfr_get_exp(e.radius));var a=t.mpfr_get_d(e.radius,0);r.uniform4f(i.uniformLocations.state,e.center[0],e.cmapscale,1+_(e.radius),e.iterations),console.log(f);var d=Math.floor(Math.log2(Math.sqrt(f[0]*f[0]+f[1]*f[1]))),m=1/Math.pow(2,d);r.uniform4f(i.uniformLocations.poly1,m*f[0],m*f[1],m*a*f[2],m*a*f[3]),r.uniform4f(i.uniformLocations.poly2,m*a*a*f[4],m*a*a*f[5],p,d),console.log("poly_scaled",a*f[0],a*f[1],a*a*f[2],a*a*f[3],a*a*a*f[4],a*a*a*f[5],p,0);{const x=0,h=4;r.drawArrays(r.TRIANGLE_STRIP,x,h)}}});
