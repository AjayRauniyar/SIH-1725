"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../styles/ImageUpload.module.css'; // Import your CSS module

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,    // For pie charts
  PointElement,  // For line charts
  LineElement,   // For line charts
  Title,
  Tooltip,
  Legend
);

const ImageUpload = () => {
  const [previousImage, setPreviousImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [category, setCategory] = useState('foundation');
  const [progressData, setProgressData] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.name === 'previousImage') {
      setPreviousImage(e.target.files[0]);
    } else if (e.target.name === 'currentImage') {
      setCurrentImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!previousImage || !currentImage) {
      setError('Please upload both images.');
      return;
    }

    const formData = new FormData();
    formData.append('previous_image', previousImage);
    formData.append('current_image', currentImage);

    try {
      const response = await axios.post(`http://localhost:5000/upload/${category}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProgressData(response.data);
      setError(null);
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    }
  };

  // Ensure progressData exists before rendering the chart
  const pieData = progressData ? {
    labels: ['Work Done', 'Remaining'],
    datasets: [{
      data: [progressData.work_done_percentage, 100 - progressData.work_done_percentage],  // Ensure valid data
      backgroundColor: ['#36A2EB', '#FF6384'], // Blue for done, Red for remaining
      hoverBackgroundColor: ['#36A2EB', '#FF6384'], // Colors on hover
    }],
  } : null; // If progressData is not available, don't pass data

  const lineData = progressData ? {
    labels: ['Similarity Score'],
    datasets: [{
      label: 'Similarity Score',
      data: [progressData.similarity_score],
      fill: false,
      borderColor: '#FF6384',
      tension: 0.1,
    }],
  } : null; // If progressData is not available, don't pass data

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Image Upload</h1>
        <div className={styles.formGroup}>
          <label className={styles.label}>Previous Image:</label>
          <input type="file" name="previousImage" onChange={handleImageChange} className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Current Image:</label>
          <input type="file" name="currentImage" onChange={handleImageChange} className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
            <option value="foundation">Foundation</option>
            <option value="superstructure">Super Structure</option>
            <option value="interiors">Interiors</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>

      {progressData && (
        <div className={styles.result}>
          <h2 className={styles.resultTitle}>Progress Result:</h2>
          <p><strong>Category:</strong> {progressData.category}</p>
          <p><strong>Work Done Percentage:</strong> {progressData.work_done_percentage}%</p>
          <p><strong>Similarity Score:</strong> {progressData.similarity_score}</p>

          <div className={styles.chartContainer}>
            <h3>Work Done Percentage</h3>
            {/* Ensure pieData is not null */}
            {pieData && <Pie data={pieData} />}

            <h3>Similarity Score</h3>
            {/* Ensure lineData is not null */}
            {lineData && <Line data={lineData} />}
          </div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
