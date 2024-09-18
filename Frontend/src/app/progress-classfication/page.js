"use client";
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from '../../styles/ImageUpload.module.css';

export default function ImageUpload() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Handle file uploads here
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <main className={styles.container}>
      <h1>Upload Construction Site Images</h1>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
    </main>
  );
}
