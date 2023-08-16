import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/system/Box';

const AnimatedBubblesChip = ({ label }) => {
  return (
    <Box position="relative">
      <Chip label={label} />
      <div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          background: 'rgba(255, 0, 0, 0.7)', // Customize color
          borderRadius: '50%',
          animation: 'bubbling 3s infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          background: 'rgba(255, 0, 0, 0.7)', // Customize color
          borderRadius: '50%',
          animation: 'bubbling 3s infinite',
          left: '50px',
          animationDelay: '1s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          background: 'rgba(255, 0, 0, 0.7)', // Customize color
          borderRadius: '50%',
          animation: 'bubbling 3s infinite',
          left: '-50px',
          animationDelay: '1.5s',
        }}
      />
    </Box>
  );
};

export default AnimatedBubblesChip;
