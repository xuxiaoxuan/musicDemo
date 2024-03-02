import React from 'react';

const BackgroundVideo = ({ src }) => {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <video autoPlay loop muted style={{ width: '2408px',height: '1353px',  marginLeft: '-837.5px', marginTop: '0px',objectFit: 'cover' }}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
