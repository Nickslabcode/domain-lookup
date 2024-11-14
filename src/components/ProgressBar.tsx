import React from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <progress
      className="progress progress-primary w-56"
      value={progress}
      max="3"
    ></progress>
  );
};

export default ProgressBar;
