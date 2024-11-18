import React from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      <p className="text-sm">Fetching data, please wait... {progress}/3</p>
      <progress
        className="progress progress-primary w-56"
        value={progress}
        max="3"
      ></progress>
    </>
  );
};

export default ProgressBar;
