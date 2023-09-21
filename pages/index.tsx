import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { styled, useTheme } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import styles from '../styles/Summonerpage.module.css';
import React from 'react';
import SideMenu from '../components/SideMenu';



const IndexPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        style={{

          width: '100%',

          height: '100%',
          objectFit: 'cover',

          zIndex: '-1',
        }}
      >
        <source src="covenww.mp4" type="video/mp4" />
      </video>

      {/* Blur overlay */}
      <div
        style={{
          position: 'absolute',

          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,40,0.4)',
          zIndex: '1',
        }}
      ></div>

      {/* Your content */}
      <div
        style={{
          position: 'relative',
          zIndex: '2',
        }}
      >
        {/* Your Content Here */}
      </div>
    </div>
  );
};

export default IndexPage;
