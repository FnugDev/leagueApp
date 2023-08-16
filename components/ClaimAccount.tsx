// ProfilePicture.tsx
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '..//styles/Summonerpage.module.css';
import Backdrop from '@mui/material/Backdrop';
import { useTheme } from '@mui/material/styles';
import React from 'react';

interface ClaimAccountProps {
  onConfirm: (randomIconId: number) => void; // Define the callback function prop
}


// million-ignore
const ClaimAccount: React.FC<ClaimAccountProps> = ({ onConfirm }) => {
  const theme = useTheme();
  const randomIconId = Math.floor(Math.random() * 28) + 1; // Generate randomIconId

  const handleConfirm = () => {
    // Call the onConfirm callback function with the randomIconId when the user clicks "confirm"
    onConfirm(randomIconId);
  };

  return (
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={true}
  >
    <div className={styles.claimAccountWrapper}>
      <Paper className={styles.claimAccountContainer}>
        <Image
          className={styles.claimAccountPicture}
          alt="Summoner Profile"
          width={100}
          height={100}
          src={`https://static.bigbrain.gg/assets/lol/riot_static/13.13.1/img/profileicon/${randomIconId}.png`}
        />

        <Typography className={styles.claimAccountText}>
          change summoner icon to the icon above to verify you&apos;re the owner of the account
        </Typography>

        <Button color="info" variant="contained" onClick={handleConfirm}>
          confirm
        </Button>
      </Paper>
    </div>
  </Backdrop>
);
};

export default ClaimAccount;
