// MeshGradient.jsx
// Drop this into any section. The canvas fills its parent container.
// Parent must have: position: relative  (and a defined height)
//
// Usage:
//   <div style={{ position: 'relative', height: '100vh' }}>
//     <MeshGradient colors="cyan" opacity={1} speed={1} />
//     <YourContent style={{ position: 'relative', zIndex: 1 }} />
//   </div>

import { useEffect, useRef } from "react";

// ─── Color presets ────────────────────────────────────────────────────────────
const PRESETS = {
  cyan: [
    [0.025, 0.07,  0.14 ],   // deep navy
    [0.035, 0.19,  0.33 ],   // mid blue
    [0.040, 0.52,  0.65 ],   // teal
    [0.080, 0.78,  0.85 ],   // bright cyan
  ],
  purple: [
    [0.06,  0.02,  0.14 ],   // deep violet
    [0.18,  0.05,  0.35 ],   // mid purple
    [0.40,  0.10,  0.60 ],   // purple
    [0.70,  0.30,  0.90 ],   // soft lavender
  ],
  sunset: [
    [0.10,  0.02,  0.08 ],   // deep maroon
    [0.35,  0.06,  0.15 ],   // dark rose
    [0.75,  0.22,  0.12 ],   // burnt orange
    [0.95,  0.60,  0.20 ],   // gold
  ],
  forest: [
    [0.02,  0.08,  0.04 ],   // deep forest
    [0.04,  0.20,  0.10 ],   // dark green
    [0.06,  0.45,  0.22 ],   // mid green
    [0.20,  0.75,  0.40 ],   // bright green
  ],
};

// ─── GLSL shaders ─────────────────────────────────────────────────────────────
const VERT = `
  attribute vec2 pos;
  void main() { gl_Position = vec4(pos, 0.0, 1.0); }
`;

const FRAG = `
  precision highp float;
  uniform float t;
  uniform float speed;
  uniform vec2  res;
  uniform vec3  c0, c1, c2, c3;

  vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec2 mod289v2(vec2 x){return x-floor(x*(1./289.))*289.;}
  vec3 permute(vec3 x){return mod289v3(((x*34.)+1.)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(.211324865,.366025404,-.577350270,.024390244);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
    i=mod289v2(i);
    vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
    vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
    m=m*m; m=m*m;
    vec3 x2=2.*fract(p*C.www)-1.;
    vec3 h=abs(x2)-.5;
    vec3 ox=floor(x2+.5);
    vec3 a0=x2-ox;
    m*=1.79284291-.85373472*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.*dot(m,g);
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / res;
    float s  = t * speed * 0.16;

    float n1 = snoise(uv * 1.6 + vec2(s*0.38,  s*0.22));
    float n2 = snoise(uv * 2.4 + vec2(-s*0.28, s*0.44) + 8.0);
    float n3 = snoise(uv * 1.1 + vec2(s*0.18, -s*0.32) + 4.0);
    float n4 = snoise(uv * 3.2 + vec2(s*0.50,  s*0.18) + 16.0);

    float noise = clamp(n1*0.44+n2*0.28+n3*0.18+n4*0.10, -1.0, 1.0);
    noise = noise * 0.5 + 0.5;

    float blend = clamp(uv.x * 0.65 + noise * 0.52 - 0.10, 0.0, 1.0);
    float vd    = 1.0 - uv.y * 0.20;

    vec3 col;
    if(blend < 0.33)       col = mix(c0, c1, blend / 0.33);
    else if(blend < 0.66)  col = mix(c1, c2, (blend-0.33)/0.33);
    else                   col = mix(c2, c3, (blend-0.66)/0.34);

    col *= vd;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// ─── WebGL helpers ────────────────────────────────────────────────────────────
function mkShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function initGL(canvas, colors) {
  const gl = canvas.getContext("webgl");
  if (!gl) return null;

  const prog = gl.createProgram();
  gl.attachShader(prog, mkShader(gl, gl.VERTEX_SHADER,   VERT));
  gl.attachShader(prog, mkShader(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, "pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // Upload color uniforms
  const [c0,c1,c2,c3] = colors;
  gl.uniform3fv(gl.getUniformLocation(prog, "c0"), c0);
  gl.uniform3fv(gl.getUniformLocation(prog, "c1"), c1);
  gl.uniform3fv(gl.getUniformLocation(prog, "c2"), c2);
  gl.uniform3fv(gl.getUniformLocation(prog, "c3"), c3);

  return {
    gl,
    uT:     gl.getUniformLocation(prog, "t"),
    uRes:   gl.getUniformLocation(prog, "res"),
    uSpeed: gl.getUniformLocation(prog, "speed"),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function MeshGradient({
  colors  = "cyan",     // "cyan" | "purple" | "sunset" | "forest" | float[4][3] custom
  speed   = 1,          // animation speed multiplier  (0.5 = slow, 2 = fast)
  opacity = 1,          // 0–1
  style   = {},         // extra inline styles on the canvas
}) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const glCtx     = useRef(null);

  const palette = Array.isArray(colors) ? colors : (PRESETS[colors] ?? PRESETS.cyan);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = initGL(canvas, palette);
    if (!ctx) return;
    glCtx.current = ctx;

    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      ctx.gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function loop(ts) {
      const { gl, uT, uRes, uSpeed } = ctx;
      gl.uniform1f(uT,     ts * 0.001);
      gl.uniform1f(uSpeed, speed);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);   // eslint-disable-line

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        zIndex: 0,
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        display: "block",
        ...style,
      }}
    />
  );
}