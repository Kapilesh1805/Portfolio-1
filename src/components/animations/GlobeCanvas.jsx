import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

/**
 * World continent polygon outlines in (longitude, latitude) degrees [-180..180, -90..90].
 * Rendered onto equirectangular texture and wrapped onto 3D sphere.
 */
const CONTINENTS = [
  // North America
  [
    [-168, 65], [-162, 70], [-140, 69], [-120, 71], [-95, 74], [-82, 68], [-68, 62],
    [-60, 56], [-55, 47], [-64, 44], [-73, 40], [-80, 26], [-82, 23], [-88, 18],
    [-84, 10], [-77, 8], [-83, 10], [-90, 15], [-97, 19], [-105, 23], [-115, 30],
    [-122, 38], [-125, 48], [-135, 57], [-152, 60], [-165, 60], [-168, 65],
  ],
  // Greenland
  [
    [-50, 60], [-40, 65], [-22, 70], [-20, 77], [-28, 83], [-55, 83], [-60, 76],
    [-55, 66], [-50, 60],
  ],
  // South America
  [
    [-77, 9], [-71, 12], [-61, 10], [-50, 0], [-35, -5], [-37, -12], [-40, -21],
    [-47, -27], [-56, -34], [-65, -42], [-67, -54], [-74, -52], [-74, -42],
    [-71, -30], [-77, -15], [-81, -5], [-79, 4], [-77, 9],
  ],
  // Europe & Scandinavia
  [
    [-9, 36], [-9, 43], [-1, 46], [-4, 50], [2, 51], [7, 54], [10, 57], [18, 56],
    [24, 60], [28, 70], [20, 70], [12, 64], [5, 60], [8, 55], [0, 48], [-4, 44],
    [0, 42], [10, 38], [15, 38], [14, 44], [22, 40], [28, 41], [30, 46], [40, 47],
    [38, 38], [30, 32], [20, 34], [10, 37], [0, 37], [-9, 36],
  ],
  // Great Britain & Ireland
  [
    [-5, 50], [0, 51], [1, 54], [-3, 58], [-5, 57], [-4, 53], [-5, 50],
  ],
  // Africa
  [
    [-6, 36], [10, 37], [25, 32], [33, 31], [35, 24], [43, 12], [51, 10], [42, 0],
    [40, -11], [35, -24], [28, -34], [18, -34], [12, -22], [10, -5], [5, 4],
    [-8, 4], [-15, 12], [-17, 15], [-12, 28], [-6, 36],
  ],
  // Madagascar
  [
    [44, -13], [50, -15], [48, -25], [44, -25], [44, -13],
  ],
  // Asia
  [
    [40, 47], [50, 45], [55, 38], [60, 25], [68, 25], [72, 20], [78, 8], [80, 16],
    [88, 22], [92, 18], [98, 10], [103, 1], [105, 10], [108, 20], [118, 24],
    [121, 32], [120, 40], [130, 42], [135, 48], [142, 52], [155, 56], [162, 60],
    [175, 65], [178, 68], [160, 70], [135, 74], [105, 77], [80, 73], [60, 70],
    [45, 68], [40, 58], [40, 47],
  ],
  // Arabian Peninsula
  [
    [35, 30], [45, 30], [55, 26], [60, 22], [55, 16], [45, 12], [42, 16], [35, 28], [35, 30],
  ],
  // Japan
  [
    [130, 32], [133, 34], [140, 36], [143, 44], [141, 40], [136, 35], [130, 32],
  ],
  // Australia
  [
    [114, -22], [122, -18], [130, -12], [136, -12], [142, -10], [145, -15],
    [150, -22], [153, -28], [150, -37], [140, -38], [135, -35], [128, -32],
    [115, -34], [113, -26], [114, -22],
  ],
  // New Zealand
  [
    [168, -45], [174, -41], [178, -37], [175, -40], [170, -44], [168, -45],
  ],
  // Antarctica
  [
    [-180, -78], [-140, -75], [-90, -72], [-60, -65], [-40, -74], [0, -70],
    [50, -67], [100, -66], [140, -67], [180, -78], [180, -90], [-180, -90],
  ],
]

// Prominent design atelier beacons (longitude, latitude, label)
const ATELIER_HUBS = [
  [2.35, 48.85, 'Paris'],
  [9.19, 45.46, 'Milan'],
  [-0.12, 51.5, 'London'],
  [-74.0, 40.71, 'New York'],
  [139.69, 35.68, 'Tokyo'],
  [55.27, 25.2, 'Dubai'],
  [72.87, 19.07, 'Mumbai'],
]

/** Generate high-resolution luxury world map texture on an offscreen canvas */
function createWorldTexture() {
  const W = 1024
  const H = 512
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // 1. Ocean base: Deep luxury espresso chocolate gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, H)
  oceanGrad.addColorStop(0, '#1E1009')
  oceanGrad.addColorStop(0.5, '#28150D')
  oceanGrad.addColorStop(1, '#1A0D07')
  ctx.fillStyle = oceanGrad
  ctx.fillRect(0, 0, W, H)

  // Subtle bathymetric grid
  ctx.strokeStyle = 'rgba(215, 184, 159, 0.05)'
  ctx.lineWidth = 1
  for (let y = 0; y < H; y += 32) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(W, y)
    ctx.stroke()
  }

  // 2. Graticule: Longitude meridians (every 15 deg) & Latitude parallels (every 15 deg)
  ctx.strokeStyle = 'rgba(201, 142, 122, 0.35)'
  ctx.lineWidth = 1.0

  // Parallels
  for (let lat = -75; lat <= 75; lat += 15) {
    const y = ((90 - lat) / 180) * H
    ctx.beginPath()
    if (lat === 0) {
      // Equator: slightly stronger gold line with tick marks
      ctx.strokeStyle = 'rgba(215, 184, 159, 0.75)'
      ctx.lineWidth = 1.8
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.stroke()
      // Equator tick marks
      for (let lon = -180; lon <= 180; lon += 5) {
        const tx = ((lon + 180) / 360) * W
        ctx.beginPath()
        ctx.moveTo(tx, y - 3)
        ctx.lineTo(tx, y + 3)
        ctx.stroke()
      }
      ctx.strokeStyle = 'rgba(201, 142, 122, 0.35)'
      ctx.lineWidth = 1.0
    } else if (Math.abs(lat) === 23.5) {
      // Tropics
      ctx.setLineDash([4, 4])
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.stroke()
      ctx.setLineDash([])
    } else {
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.stroke()
    }
  }

  // Meridians
  for (let lon = -180; lon <= 180; lon += 15) {
    const x = ((lon + 180) / 360) * W
    ctx.beginPath()
    if (lon === 0) {
      ctx.strokeStyle = 'rgba(215, 184, 159, 0.75)'
      ctx.lineWidth = 1.6
      ctx.moveTo(x, 0)
      ctx.lineTo(x, H)
      ctx.stroke()
      ctx.strokeStyle = 'rgba(201, 142, 122, 0.35)'
      ctx.lineWidth = 1.0
    } else {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, H)
      ctx.stroke()
    }
  }

  // Helper: converts [lon, lat] to [x, y] on texture canvas
  const toXY = ([lon, lat]) => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H]

  // 3. Render Continents with rich warm bronze fill, soft blur shadow, and rose gold outlines
  ctx.save()
  CONTINENTS.forEach((poly) => {
    if (poly.length < 3) return
    ctx.beginPath()
    const [startX, startY] = toXY(poly[0])
    ctx.moveTo(startX, startY)
    for (let i = 1; i < poly.length; i++) {
      const [px, py] = toXY(poly[i])
      ctx.lineTo(px, py)
    }
    ctx.closePath()

    // Fill with rich bronze/cognac
    ctx.fillStyle = '#6E4029'
    ctx.fill()

    // Metallic rose gold contour stroke
    ctx.strokeStyle = 'rgba(201, 142, 122, 0.95)'
    ctx.lineWidth = 2.2
    ctx.stroke()
  })
  ctx.restore()

  // 4. Stippled architectural dot matrix on the landmasses (creates luxury aesthetic)
  // We sample pixel data to only place dots on filled land areas
  const imgData = ctx.getImageData(0, 0, W, H)
  const data = imgData.data

  ctx.fillStyle = 'rgba(245, 230, 220, 0.65)'
  const dotStep = 7
  for (let y = 10; y < H - 10; y += dotStep) {
    for (let x = 10; x < W - 10; x += dotStep) {
      const idx = (y * W + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      // Check if pixel is within land color threshold
      if (r > 90 && g > 50 && b < 70) {
        ctx.beginPath()
        ctx.arc(x, y, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  // 5. Atelier Beacon Hubs: Glowing gold circles with radiating rings
  ATELIER_HUBS.forEach(([lon, lat]) => {
    const [x, y] = toXY([lon, lat])
    // Core dot
    ctx.fillStyle = '#FDF8F5'
    ctx.beginPath()
    ctx.arc(x, y, 2.5, 0, Math.PI * 2)
    ctx.fill()

    // Inner bronze ring
    ctx.strokeStyle = 'rgba(201, 142, 122, 0.9)'
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.arc(x, y, 5.5, 0, Math.PI * 2)
    ctx.stroke()

    // Outer faint pulse ring
    ctx.strokeStyle = 'rgba(215, 184, 159, 0.5)'
    ctx.lineWidth = 0.8
    ctx.beginPath()
    ctx.arc(x, y, 9, 0, Math.PI * 2)
    ctx.stroke()
  })

  return canvas
}

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_rotation;      // in radians
uniform float u_tilt;          // in radians
uniform sampler2D u_texture;
uniform float u_alpha;

void main() {
  // Normalize screen coordinates so (0,0) is center
  vec2 p = (gl_FragCoord.xy - u_resolution * 0.5) / (min(u_resolution.x, u_resolution.y) * 0.5);
  
  float r = length(p);
  float globeRadius = 0.84;
  
  // 1. Atmospheric outer corona halo (Fresnel rim around sphere)
  if (r > globeRadius) {
    float dist = r - globeRadius;
    if (dist > 0.28) {
      discard;
    }
    float glow = exp(-dist * 13.0) * 0.65 * (1.0 - smoothstep(0.0, 0.28, dist));
    // Warm bronze/rose-gold corona: #C98E7A -> (0.788, 0.557, 0.478)
    vec3 coronaColor = vec3(0.82, 0.58, 0.50);
    gl_FragColor = vec4(coronaColor * glow * 1.6, glow * u_alpha);
    return;
  }
  
  // 2. On sphere: compute true 3D normal vector
  float z = sqrt(max(0.0, globeRadius * globeRadius - r * r));
  vec3 N = vec3(p.x, p.y, z) / globeRadius;
  
  // Apply axial tilt (around Z axis)
  float cosTilt = cos(u_tilt);
  float sinTilt = sin(u_tilt);
  vec3 tiltedN = vec3(
    N.x * cosTilt - N.y * sinTilt,
    N.x * sinTilt + N.y * cosTilt,
    N.z
  );
  
  // Rotate around Y axis (Earth's vertical axis)
  float cosR = cos(u_rotation);
  float sinR = sin(u_rotation);
  vec3 rotN = vec3(
    tiltedN.x * cosR + tiltedN.z * sinR,
    tiltedN.y,
    -tiltedN.x * sinR + tiltedN.z * cosR
  );
  
  // Spherical UV coordinates
  float PI = 3.14159265359;
  float lon = atan(rotN.x, rotN.z);
  float lat = asin(clamp(rotN.y, -1.0, 1.0));
  
  vec2 mapUV = vec2(lon / (2.0 * PI) + 0.5, lat / PI + 0.5);
  
  // Sample luxury world map texture
  vec4 mapTex = texture2D(u_texture, mapUV);
  
  // 3. 3D Lighting Setup
  // Key light: front-top-left
  vec3 L = normalize(vec3(-0.45, 0.55, 0.70));
  float NdotL = dot(N, L);
  float diff = max(0.0, NdotL);
  
  // Subtle warm bounce light from lower right
  vec3 bounceL = normalize(vec3(0.5, -0.4, -0.3));
  float bounceDiff = max(0.0, dot(N, bounceL)) * 0.18;
  
  // Ambient base light
  float amb = 0.28;
  
  // Blinn-Phong Specular gloss glint
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);
  float NdotH = max(0.0, dot(N, H));
  float spec = pow(NdotH, 26.0) * 0.52;
  
  // Fresnel edge rim glow (rose gold halo on curved horizon)
  float fresnel = pow(1.0 - z / globeRadius, 2.6) * 0.75;
  vec3 rimColor = vec3(0.85, 0.65, 0.55);
  
  // Surface composite
  vec3 surfaceColor = mapTex.rgb;
  vec3 litColor = surfaceColor * (diff * 0.85 + amb + bounceDiff)
                + spec * vec3(1.0, 0.94, 0.88)
                + fresnel * rimColor;
                
  // Subtle sphere depth curve
  litColor *= (0.72 + 0.28 * (z / globeRadius));
  
  gl_FragColor = vec4(litColor, u_alpha);
}
`

/**
 * 3D Globe Canvas:
 * Renders mathematical 3D rotating globe with real lighting, spherical curvature,
 * and high-resolution luxury world map texture via WebGL (with 2D canvas fallback).
 */
const GlobeCanvas = forwardRef(function GlobeCanvas({ size = 420 }, ref) {
  const canvasRef = useRef(null)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const locsRef = useRef(null)
  const angleRef = useRef(0)
  const alphaRef = useRef(1)
  const is2DRef = useRef(false)
  const textureCanvasRef = useRef(null)

  // Imperative API for 60 FPS animation without React re-render overhead
  useImperativeHandle(ref, () => ({
    setRotation: (angle) => {
      angleRef.current = angle
      renderFrame()
    },
    setAlpha: (alpha) => {
      alphaRef.current = alpha
      renderFrame()
    },
  }))

  const renderFrame = () => {
    const gl = glRef.current
    if (gl && programRef.current && locsRef.current) {
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(programRef.current)
      gl.uniform2f(locsRef.current.u_resolution, gl.canvas.width, gl.canvas.height)
      gl.uniform1f(locsRef.current.u_rotation, angleRef.current)
      gl.uniform1f(locsRef.current.u_tilt, 0.35) // 20 degree axial tilt
      gl.uniform1f(locsRef.current.u_alpha, alphaRef.current)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      return
    }

    // 2D Canvas Fallback
    if (is2DRef.current && canvasRef.current) {
      render2DFallback()
    }
  }

  const render2DFallback = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const r = (Math.min(w, h) * 0.5) * 0.84
    const cx = w * 0.5
    const cy = h * 0.5

    ctx.clearRect(0, 0, w, h)
    ctx.save()
    ctx.globalAlpha = alphaRef.current

    // Base Sphere Gradient
    const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r)
    grad.addColorStop(0, '#784B32')
    grad.addColorStop(0.6, '#3D2214')
    grad.addColorStop(1, '#1A0D07')

    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()

    // 3D Meridians
    ctx.strokeStyle = 'rgba(201, 142, 122, 0.35)'
    ctx.lineWidth = 1.2
    for (let i = 0; i < 12; i++) {
      const lon = (i / 12) * Math.PI + angleRef.current
      const cosVal = Math.cos(lon)
      ctx.beginPath()
      ctx.ellipse(cx, cy, Math.abs(cosVal) * r, r, 0.35, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Specular shine
    const shine = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, 2, cx - r * 0.35, cy - r * 0.35, r * 0.6)
    shine.addColorStop(0, 'rgba(255, 245, 235, 0.45)')
    shine.addColorStop(1, 'rgba(255, 245, 235, 0)')
    ctx.fillStyle = shine
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()

    // Atmosphere rim
    ctx.strokeStyle = 'rgba(201, 142, 122, 0.65)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()

    ctx.restore()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr

    // Generate offscreen texture
    const texCanvas = createWorldTexture()
    textureCanvasRef.current = texCanvas

    // Attempt WebGL initialization
    let gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false })
    if (!gl) {
      gl = canvas.getContext('experimental-webgl', { alpha: true, antialias: true })
    }

    if (!gl) {
      is2DRef.current = true
      render2DFallback()
      return
    }

    glRef.current = gl

    // Compile Shaders
    const createShader = (type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('WebGL shader error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) {
      is2DRef.current = true
      render2DFallback()
      return
    }

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('WebGL program error:', gl.getProgramInfoLog(program))
      is2DRef.current = true
      render2DFallback()
      return
    }

    programRef.current = program

    // Quad Buffer
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // Upload Texture with Y-axis flipped so canvas top matches WebGL UV top
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas)

    // Enable Blending for atmosphere halo
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Uniform Locations
    locsRef.current = {
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_rotation: gl.getUniformLocation(program, 'u_rotation'),
      u_tilt: gl.getUniformLocation(program, 'u_tilt'),
      u_alpha: gl.getUniformLocation(program, 'u_alpha'),
      u_texture: gl.getUniformLocation(program, 'u_texture'),
    }

    gl.useProgram(program)
    gl.uniform1i(locsRef.current.u_texture, 0)

    renderFrame()

    return () => {
      if (gl) {
        if (texture) gl.deleteTexture(texture)
        if (buffer) gl.deleteBuffer(buffer)
        if (program) gl.deleteProgram(program)
        if (vs) gl.deleteShader(vs)
        if (fs) gl.deleteShader(fs)
      }
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'block',
      }}
      className="select-none pointer-events-none drop-shadow-[0_25px_35px_rgba(42,24,16,0.6)]"
      aria-label="3D Rotating Globe"
    />
  )
})

export default GlobeCanvas
