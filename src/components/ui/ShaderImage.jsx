import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

const ShaderImage = ({ 
  src, 
  alt, 
  className = '',
  onClick,
  onError,
  style = {},
  aspectRatio = '16/7'
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const sceneRef = useRef({});

  // Shaders - use useCallback to memoize them
  const vertexShader = useCallback(() => `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `, []);

  const fragmentShader = useCallback(() => `
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
  `, []);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    let scene, camera, renderer, planeMesh;
    let easeFactor = 0.02;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let aberrationIntensity = 0.0;
    let prevPosition = { x: 0.5, y: 0.5 };
    let animationId;

    const initializeScene = (texture) => {
      // Scene creation
      scene = new THREE.Scene();

      // Camera setup
      camera = new THREE.PerspectiveCamera(
        80,
        container.offsetWidth / container.offsetHeight,
        0.01,
        10
      );
      camera.position.z = 1;

      // Uniforms
      const shaderUniforms = {
        u_mouse: { type: "v2", value: new THREE.Vector2() },
        u_prevMouse: { type: "v2", value: new THREE.Vector2() },
        u_aberrationIntensity: { type: "f", value: 0.0 },
        u_texture: { type: "t", value: texture }
      };

      // Creating plane mesh with materials
      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader: vertexShader(),
          fragmentShader: fragmentShader()
        })
      );

      scene.add(planeMesh);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setClearColor(0x000000, 0); // Transparent background

      // Clear container and add canvas
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      
      // Make sure canvas fills the container
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.objectFit = 'cover';
      renderer.domElement.style.display = 'block';

      // Store references
      sceneRef.current = {
        scene,
        camera,
        renderer,
        planeMesh,
        mousePosition,
        targetMousePosition,
        aberrationIntensity,
        prevPosition,
        easeFactor
      };
    };

    const animateScene = () => {
      const { 
        planeMesh, 
        renderer, 
        scene, 
        camera, 
        mousePosition, 
        targetMousePosition, 
        prevPosition, 
        easeFactor 
      } = sceneRef.current;
      
      if (!planeMesh || !renderer || !scene || !camera) return;

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

      planeMesh.material.uniforms.u_mouse.value.set(
        mousePosition.x,
        1.0 - mousePosition.y
      );

      planeMesh.material.uniforms.u_prevMouse.value.set(
        prevPosition.x,
        1.0 - prevPosition.y
      );

      sceneRef.current.aberrationIntensity = Math.max(0.0, sceneRef.current.aberrationIntensity - 0.05);
      planeMesh.material.uniforms.u_aberrationIntensity.value = sceneRef.current.aberrationIntensity;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animateScene);
    };

    const handleMouseMove = (event) => {
      const { planeMesh, targetMousePosition, prevPosition } = sceneRef.current;
      if (!planeMesh) return;
      
      sceneRef.current.easeFactor = 0.02;
      const rect = container.getBoundingClientRect();
      Object.assign(prevPosition, targetMousePosition);

      targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.y = (event.clientY - rect.top) / rect.height;

      sceneRef.current.aberrationIntensity = 1;
      console.log('Mouse move:', targetMousePosition);
    };

    const handleMouseEnter = (event) => {
      const { mousePosition, targetMousePosition } = sceneRef.current;
      
      sceneRef.current.easeFactor = 0.02;
      const rect = container.getBoundingClientRect();

      mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
      console.log('Mouse enter:', targetMousePosition);
    };

    const handleMouseLeave = () => {
      const { targetMousePosition, prevPosition } = sceneRef.current;
      
      sceneRef.current.easeFactor = 0.05;
      Object.assign(targetMousePosition, prevPosition);
      console.log('Mouse leave');
    };

    const handleResize = () => {
      if (!renderer || !camera || !container) return;
      
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Wait for image to load
    const imageLoadHandler = () => {
      console.log('Image loaded, initializing WebGL...');
      new THREE.TextureLoader().load(
        image.src,
        (loadedTexture) => {
          console.log('Texture loaded successfully');
          initializeScene(loadedTexture);
          animateScene();

          // Add event listeners
          container.addEventListener("mousemove", handleMouseMove);
          container.addEventListener("mouseenter", handleMouseEnter);
          container.addEventListener("mouseleave", handleMouseLeave);
          window.addEventListener("resize", handleResize);
          
          console.log('ShaderImage initialized successfully');
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error);
          if (onError) onError({ target: image });
        }
      );
    };

    if (image.complete) {
      imageLoadHandler();
    } else {
      image.addEventListener('load', imageLoadHandler);
    }

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      container?.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseenter", handleMouseEnter);
      container?.removeEventListener("mouseleave", handleMouseLeave);
      window?.removeEventListener("resize", handleResize);
      
      if (renderer) {
        renderer.dispose();
      }
      if (planeMesh) {
        planeMesh.material.dispose();
        planeMesh.geometry.dispose();
      }
      
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [src, onError, vertexShader, fragmentShader]);

  return (
    <div className="relative group">
      {/* Hidden image for loading and fallback */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{ display: 'none' }}
        onError={onError}
      />
      
      {/* Shader container - this will hold the WebGL canvas */}
      <div
        ref={containerRef}
        className={`w-full overflow-hidden cursor-pointer transition-all duration-500 filter saturate-0 group-hover:saturate-100 ${className}`}
        style={{ 
          aspectRatio,
          ...style 
        }}
        onClick={onClick}
      >
        {/* This will be replaced by WebGL canvas */}
      </div>
    </div>
  );
};

ShaderImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onError: PropTypes.func,
  style: PropTypes.object,
  aspectRatio: PropTypes.string
};

export default ShaderImage;
