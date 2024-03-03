import React from 'react';

const BackgroundVideo = ({ src }) => {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <video autoPlay loop muted style={{ width: '100vw',height: '100vh', marginTop: '0px',objectFit: 'cover' }}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
