'use client'
import { useEffect } from 'react';

const ThreeModel = () => {
  useEffect(() => {
    // Dynamically import the Three.js script
    console.log('Three.js script loaded');
    import('../3dmodel/main.js').catch((err) => console.error(err));
  }, []);

  return <div id="container3D" style={{ width: '100vw', height: '100vh' }} />;
};

export default ThreeModel;
