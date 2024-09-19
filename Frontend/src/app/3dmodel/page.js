'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from '../../styles/3Dmodel.module.css'; // Import CSS module

const ModelViewer = ({ modelId }) => {
  const mountRef = useRef(null);

  const modelPaths = [
    '/models/modern.glb',
    '/models/modern2.glb',
    '/models/modern3.glb',
    '/models/modern4.glb',
    '/models/modern5.glb',
    '/models/modern6.glb',
    '/models/modern7.glb',
    '/models/modern8.glb',
    '/models/modern9.glb',
    '/models/modern10.glb',
  ];

  useEffect(() => {
    if (!mountRef.current) return;
    // Scene, camera, renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load the selected model
    const loader = new GLTFLoader();
    const modelPath = modelPaths[modelId - 1]; // Load based on modelId
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      scene.add(model);
      const boundingBox = new THREE.Box3().setFromObject(model);
      const size = boundingBox.getSize(new THREE.Vector3());
      const center = boundingBox.getCenter(new THREE.Vector3());

      camera.position.set(center.x, center.y, size.z * 2);
      camera.lookAt(center);

      controls.target.copy(center);
      controls.update();

      setModelLoaded(true);




    });

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      controls.dispose();
    };
  }, [modelId]); // Reload the model when modelId changes

  return <div ref={mountRef} className={styles.viewer} />;
};

const ModelList = ({ onSelectModel }) => {
  const models = [
    { id: 1, name: 'Model 1', icon: '/icons/modelicon.png' },
    { id: 2, name: 'Model 2', icon: '/icons/modelicon.png' },
    { id: 3, name: 'Model 3', icon: '/icons/modelicon.png' },
    { id: 4, name: 'Model 4', icon: '/icons/modelicon.png' },
    { id: 5, name: 'Model 5', icon: '/icons/modelicon.png' },
    { id: 6, name: 'Model 6', icon: '/icons/modelicon.png' },
    { id: 7, name: 'Model 7', icon: '/icons/modelicon.png' },
    { id: 8, name: 'Model 8', icon: '/icons/modelicon.png' },
    { id: 9, name: 'Model 9', icon: '/icons/modelicon.png' },
    { id: 10, name: 'Model 10', icon: '/icons/modelicon.png' },
  ];

  return (
    <div className={styles.grid}>
      {models.map((model) => (
        <div
          key={model.id}
          className={styles.card}
          onClick={() => onSelectModel(model.id)}
        >
          <img src={model.icon} alt={model.name} className={styles.icon} />
          <h3>{model.name}</h3>
        </div>
      ))}
    </div>
  );
};

const Page = () => {
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <div className={styles.container}>
      {!selectedModel ? (
        <ModelList onSelectModel={(modelId) => setSelectedModel(modelId)} />
      ) : (
        <div className={styles.viewerContainer}>
          <button onClick={() => setSelectedModel(null)} className={styles.backButton}>
            Back to Models
          </button>
          <ModelViewer modelId={selectedModel} />
        </div>
      )}
    </div>
  );
};

export default Page;
