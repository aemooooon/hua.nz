import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

const ShaderImageSimple = ({ 
  src, 
  className = '',
  onClick,
  onError
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneDataRef = useRef({});

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;    
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;

    void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
 
        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
  `;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !src) return;

    let scene, camera, renderer, planeMesh, animationId;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let prevPosition = { x: 0.5, y: 0.5 };
    let aberrationIntensity = 0.0;
    let easeFactor = 0.02;

    const init = () => {
      // Create scene
      scene = new THREE.Scene();
      
      // Create camera
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 1;

      // Create renderer
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Clear container and add canvas
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      canvasRef.current = renderer.domElement;

      // Load texture
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        src,
        (texture) => {
          console.log('Texture loaded successfully');
          
          // Create material with shader
          const material = new THREE.ShaderMaterial({
            uniforms: {
              u_texture: { value: texture },
              u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
              u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
              u_aberrationIntensity: { value: 0.0 }
            },
            vertexShader,
            fragmentShader
          });

          // Create geometry and mesh
          const geometry = new THREE.PlaneGeometry(2, 2);
          planeMesh = new THREE.Mesh(geometry, material);
          scene.add(planeMesh);

          // Store references
          sceneDataRef.current = {
            scene,
            camera,
            renderer,
            planeMesh,
            mousePosition,
            targetMousePosition,
            prevPosition,
            aberrationIntensity,
            easeFactor
          };

          // Start animation
          animate();
          console.log('Shader scene initialized');
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error);
          if (onError) onError(error);
        }
      );
    };

    const animate = () => {
      if (!planeMesh || !renderer || !scene || !camera) return;

      // Update mouse position with easing
      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

      // Update shader uniforms
      planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
      planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);
      
      // Decay aberration intensity
      aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
      planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity;

      // Render scene
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      prevPosition.x = targetMousePosition.x;
      prevPosition.y = targetMousePosition.y;
      
      targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.y = (event.clientY - rect.top) / rect.height;
      
      aberrationIntensity = 1.0;
      easeFactor = 0.02;
      
      console.log('Mouse move:', targetMousePosition);
    };

    const handleMouseEnter = (event) => {
      const rect = container.getBoundingClientRect();
      mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
      easeFactor = 0.02;
      console.log('Mouse enter');
    };

    const handleMouseLeave = () => {
      targetMousePosition.x = prevPosition.x;
      targetMousePosition.y = prevPosition.y;
      easeFactor = 0.05;
      console.log('Mouse leave');
    };

    const handleResize = () => {
      if (!renderer || !camera) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Initialize
    init();

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      container?.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('mouseenter', handleMouseEnter);
      container?.removeEventListener('mouseleave', handleMouseLeave);
      window?.removeEventListener('resize', handleResize);
      
      if (renderer) {
        renderer.dispose();
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
      if (planeMesh) {
        planeMesh.material.dispose();
        planeMesh.geometry.dispose();
      }
    };
  }, [src, onError, vertexShader, fragmentShader]);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full cursor-pointer transition-all duration-500 filter saturate-0 hover:saturate-100 ${className}`}
      onClick={onClick}
      style={{ minHeight: '200px' }} // Ensure minimum height
    >
      {/* Canvas will be inserted here */}
    </div>
  );
};

ShaderImageSimple.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onError: PropTypes.func
};

export default ShaderImageSimple;
