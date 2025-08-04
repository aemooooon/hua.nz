import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import webglResourceManager from "../../utils/WebGLResourceManager";

const EffectPixelDistortion = ({ src, style = {} }) => {
    const containerRef = useRef();

    useEffect(() => {
        let renderer, scene, camera, planeMesh;
        let animationFrameId, resourceId;
        let mousePosition = { x: 0.5, y: 0.5 };
        let targetMousePosition = { x: 0.5, y: 0.5 };
        let prevPosition = { x: 0.5, y: 0.5 };
        let easeFactor = 0.02;
        let aberrationIntensity = 0.0;

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
                vec2 centerOfPixel = gridUV + vec2(1.0 / 20.0, 1.0 / 20.0);
                
                vec2 mouseDirection = u_mouse - u_prevMouse;
                
                vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
                float pixelDistanceToMouse = length(pixelToMouseDirection);
                float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
    
                vec2 uvOffset = strength * -mouseDirection * 0.2;
                vec2 uv = vUv - uvOffset;

                vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
                vec4 colorG = texture2D(u_texture, uv);
                vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

                gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
            }
        `;

        const initializeScene = (texture) => {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(
                80,
                containerRef.current.offsetWidth / containerRef.current.offsetHeight,
                0.01,
                10
            );
            camera.position.z = 1;

            const shaderUniforms = {
                u_mouse: { type: "v2", value: new THREE.Vector2() },
                u_prevMouse: { type: "v2", value: new THREE.Vector2() },
                u_aberrationIntensity: { type: "f", value: 0.0 },
                u_texture: { type: "t", value: texture },
            };

            planeMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(2, 2),
                new THREE.ShaderMaterial({
                    uniforms: shaderUniforms,
                    vertexShader,
                    fragmentShader,
                })
            );

            scene.add(planeMesh);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
            containerRef.current.appendChild(renderer.domElement);
            
            // 注册WebGL资源
            resourceId = webglResourceManager.registerResources('EffectPixelDistortion', {
                renderer,
                scene,
                camera,
                planeMesh
            });
        };

        const animateScene = () => {
            animationFrameId = requestAnimationFrame(animateScene);

            mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
            mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

            planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
            planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);

            aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
            planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity;

            renderer.render(scene, camera);
        };

        const handleResize = () => {
            if (!containerRef.current) return;

            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        const handleMouseMove = (event) => {
            easeFactor = 0.02;
            const rect = containerRef.current.getBoundingClientRect();
            prevPosition = { ...targetMousePosition };

            targetMousePosition.x = (event.clientX - rect.left) / rect.width;
            targetMousePosition.y = (event.clientY - rect.top) / rect.height;

            aberrationIntensity = 1;
        };

        const handleMouseEnter = (event) => {
            easeFactor = 0.02;
            const rect = containerRef.current.getBoundingClientRect();

            mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
            mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
        };

        const handleMouseLeave = () => {
            easeFactor = 0.05;
            targetMousePosition = { ...prevPosition };
        };

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            src,
            (texture) => {
                initializeScene(texture);
                animateScene();
            },
            undefined,
            (error) => {
                console.error(`Error loading texture from ${src}:`, error);
            }
        );

        window.addEventListener("resize", handleResize);
        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            
            // 清理WebGL资源管理器中的资源
            if (resourceId) {
                webglResourceManager.cleanup(resourceId);
            }
            
            // 清理Three.js资源
            if (scene) {
                scene.children.forEach(child => {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(material => {
                                if (material.map) material.map.dispose();
                                material.dispose();
                            });
                        } else {
                            if (child.material.map) child.material.map.dispose();
                            child.material.dispose();
                        }
                    }
                });
            }
            
            if (renderer) renderer.dispose();
            window.removeEventListener("resize", handleResize);
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [src]);

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                ...style,
            }}
        />
    );
};

EffectPixelDistortion.propTypes = {
    src: PropTypes.string.isRequired,
    style: PropTypes.object,
};

export default EffectPixelDistortion;
