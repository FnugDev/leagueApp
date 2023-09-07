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


// million ignore
const IndexPage = () => {

  return (
    <div>
 <div className={styles.blurGradient}></div>
<SideMenu/>

    </div>
  );
};

export default IndexPage;
