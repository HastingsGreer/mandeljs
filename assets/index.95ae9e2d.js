import{c as R,p as V,t as B,i as C}from"./vendor.0514c734.js";const j=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))m(u);new MutationObserver(u=>{for(const f of u)if(f.type==="childList")for(const v of f.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&m(v)}).observe(document,{childList:!0,subtree:!0});function e(u){const f={};return u.integrity&&(f.integrity=u.integrity),u.referrerpolicy&&(f.referrerPolicy=u.referrerpolicy),u.crossorigin==="use-credentials"?f.credentials="include":u.crossorigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function m(u){if(u.ep)return;u.ep=!0;const f=e(u);fetch(u.href,f)}};j();function N(t,s){const e=t.getBoundingClientRect();return[s.clientX-e.left,s.clientY-e.top]}function b(t,s){var e=canvasDom.getBoundingClientRect();return[s.touches[0].clientX-e.left,s.touches[0].clientY-e.top]}function g(t,s,e){const m=A(t,t.VERTEX_SHADER,s),u=A(t,t.FRAGMENT_SHADER,e),f=t.createProgram();return t.attachShader(f,m),t.attachShader(f,u),t.linkProgram(f),t.getProgramParameter(f,t.LINK_STATUS)?f:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(f)),null)}function A(t,s,e){const m=t.createShader(s);return t.shaderSource(m,e),t.compileShader(m),t.getShaderParameter(m,t.COMPILE_STATUS)?m:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(m)),t.deleteShader(m),null)}function I(t){const s=45*Math.PI/180,e=t.canvas.clientWidth/t.canvas.clientHeight,m=.1,u=100,f=R();V(f,s,e,m,u);const v=R();return B(v,v,[-0,0,-2.5]),[f,v]}C().then(({binding:t})=>{fetch("https://apj.hgreer.com/mandeljs",{method:"GET",cache:"no-store"}),console.log(t);function s(){var r=t.mpfr_t();return t.mpfr_init_set_d(r,0,0),t.mpfr_set_prec(r,1200),t.mpfr_set_d(r,0,0),r}let e={center:[s(),s()],radius:s(),iterations:1e3,cmapscale:20,callbacks:[],modified:function(){for(const r of this.callbacks)r()},set:function(r,n,c){t.mpfr_set_d(this.center[0],r,0),t.mpfr_set_d(this.center[1],n,0),t.mpfr_set_d(this.radius,c,0),this.modified()},update:function(r,n){var c=s();t.mpfr_mul_d(c,this.radius,r,0);var o=s();t.mpfr_mul_d(o,this.radius,-n,0),t.mpfr_mul_d(this.radius,this.radius,.5,0),t.mpfr_add(this.center[0],this.center[0],c,0),t.mpfr_add(this.center[1],this.center[1],o,0),this.modified()}};function m(r,n){var o;return(o=r.split("; ").find(l=>l.startsWith(n+"=")))==null?void 0:o.split("=")[1]}console.log(document.cookie),document.cookie.length>30?(t.mpfr_set_string(e.center[0],m(document.cookie,"x"),10,0),t.mpfr_set_string(e.center[1],m(document.cookie,"y"),10,0),t.mpfr_set_string(e.radius,m(document.cookie,"radius"),10,0)):(t.mpfr_set_string(e.center[0],"0",10,0),t.mpfr_set_string(e.center[1],"0",10,0),t.mpfr_set_string(e.radius,"2",10,0)),u();function u(){document.querySelector("#reset").addEventListener("click",()=>{document.querySelector("#iterations").value="1000",document.querySelector("#cmapscale").value="20.1",e.iterations=1e3,e.cmapscale=20.1,e.set(0,0,2)}),document.querySelector("#out").addEventListener("click",()=>{t.mpfr_mul_d(e.radius,e.radius,2,0),e.modified()});const r=Math.min(window.innerWidth,700),n=Math.min(r,window.innerHeight),c=document.querySelector("#canvas");c.width=n,c.height=n,c.addEventListener("click",i=>{let a,d;[a,d]=N(c,i),a=a/(n/2)-1,d=d/(n/2)-1,e.update(a,d)}),c.addEventListener("touchstart",i=>{let a,d;[a,d]=b(c,i),a=a/(n/2)-1,d=d/(n/2)-1,e.update(a,d)}),document.querySelector("#iterations").addEventListener("input",i=>{e.iterations=parseInt(i.target.value),e.modified()}),document.querySelector("#cmapscale").addEventListener("input",i=>{e.cmapscale=parseFloat(i.target.value),e.modified()}),document.querySelector("#clickpos").addEventListener("blur",()=>{var i=document.querySelector("#clickpos").value;console.log("asfdsafsda",i),t.mpfr_set_string(e.center[0],m(i,"re"),10,0),t.mpfr_set_string(e.center[1],m(i,"im"),10,0),t.mpfr_set_string(e.radius,m(i,"r"),10,0),e.modified(),console.log("blur")}),e.callbacks.push(()=>{let i=t.mpfr_to_string(e.center[0],10,0,!1),a=t.mpfr_to_string(e.center[1],10,0,!1),d=t.mpfr_to_string(e.radius,10,0,!1);document.cookie="x="+i+";max-age=31536000",document.cookie="y="+a+";max-age=31536000",document.cookie="radius="+d+";max-age=31536000";function p(x){var h=5+d.split("0").length;return x.slice(0,h)}document.querySelector("#clickpos").value="re="+p(i)+"; im="+p(a)+"; r="+p(d)});const o=c.getContext("webgl2");if(!o){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const y=g(o,`#version 300 es
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
  `),q={program:y,attribLocations:{vertexPosition:o.getAttribLocation(y,"aVertexPosition")},uniformLocations:{projectionMatrix:o.getUniformLocation(y,"uProjectionMatrix"),modelViewMatrix:o.getUniformLocation(y,"uModelViewMatrix"),state:o.getUniformLocation(y,"uState"),poly1:o.getUniformLocation(y,"poly1"),poly2:o.getUniformLocation(y,"poly2")}},E=f(o),M=o.createTexture();o.bindTexture(o.TEXTURE_2D,M),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.pixelStorei(o.UNPACK_ALIGNMENT,1),e.callbacks.unshift(()=>{F(o,q,E)}),e.modified()}function f(r){const n=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,n);const c=[1,1,-1,1,1,-1,-1,-1];return r.bufferData(r.ARRAY_BUFFER,new Float32Array(c),r.STATIC_DRAW),{position:n}}function v(){for(var r=e.center[0],n=e.center[1],c=s(),o=s(),l=new Float32Array(512*512),_=0;_<512*512;_++)l[_]=-1;for(var y=s(),q=s(),E=s(),M=0,i=0,a=0,d=0,p=0,x=0,h=0,k=[0,0,0,0,0,0],T=!0,_=0;_<e.iterations;_++){var P=t.mpfr_get_exp(c),U=t.mpfr_get_exp(o),L=Math.max(P,U);L<-1e4&&(L=0),l[3*_]=t.mpfr_get_d(c,0)/Math.pow(2,L),l[3*_+1]=t.mpfr_get_d(o,0)/Math.pow(2,L),l[3*_+2]=L;var S=t.mpfr_get_d(c,0),w=t.mpfr_get_d(o,0);t.mpfr_mul(y,c,c,0),t.mpfr_mul(q,c,o,0),t.mpfr_mul(E,o,o,0),t.mpfr_sub(c,y,E,0),t.mpfr_add(c,c,r,0),t.mpfr_add(o,q,q,0),t.mpfr_add(o,o,n,0);var D=[i,a,d,p,x,h];if([i,a,d,p,x,h]=[2*(S*i-w*a)+1,2*(S*a+w*i),2*(S*d-w*p)+i*i-a*a,2*(S*p+w*d)+2*i*a,2*(S*x-w*h+d*i-p*a),2*(S*h+w*x+d*a+p*i)],S=t.mpfr_get_d(c,0),w=t.mpfr_get_d(o,0),Math.max(Math.abs(d),Math.abs(p))>=100*t.mpfr_get_d(e.radius,0)*Math.max(Math.abs(x),Math.abs(h))?T&&(k=D,M=_):T=!1,S*S+w*w>400)break}return console.log("orbit_len",_),console.log("plim",M),[l,k,M]}function F(r,n,c){for(var[o,l,_]=v(),y=new Float32Array(o),q=2,E=2;E<o.length;E++)q=Math.min(q,Math.abs(o[E]));console.log("smallest orbit bit",q),r.texImage2D(r.TEXTURE_2D,0,r.R32F,512,512,0,r.RED,r.FLOAT,y),r.clearColor(0,0,0,1),r.clearDepth(1),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT);let M,i;[M,i]=I(r);{const x=2,h=r.FLOAT,k=!1,T=0,P=0;r.bindBuffer(r.ARRAY_BUFFER,c.position),r.vertexAttribPointer(n.attribLocations.vertexPosition,x,h,k,T,P),r.enableVertexAttribArray(n.attribLocations.vertexPosition)}r.useProgram(n.program),r.uniformMatrix4fv(n.uniformLocations.projectionMatrix,!1,M),r.uniformMatrix4fv(n.uniformLocations.modelViewMatrix,!1,i),console.log(t.mpfr_get_exp(e.radius));var a=t.mpfr_get_d(e.radius,0);r.uniform4f(n.uniformLocations.state,e.center[0],e.cmapscale,t.mpfr_get_exp(e.radius),e.iterations),console.log(l);var d=Math.floor(Math.log2(Math.sqrt(l[0]*l[0]+l[1]*l[1]))),p=1/Math.pow(2,d);r.uniform4f(n.uniformLocations.poly1,p*l[0],p*l[1],p*a*l[2],p*a*l[3]),r.uniform4f(n.uniformLocations.poly2,p*a*a*l[4],p*a*a*l[5],_,d),console.log("poly_scaled",a*l[0],a*l[1],a*a*l[2],a*a*l[3],a*a*a*l[4],a*a*a*l[5],_,0);{const x=0,h=4;r.drawArrays(r.TRIANGLE_STRIP,x,h)}}});
