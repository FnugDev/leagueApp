// ProfilePicture.tsx
import Image from 'next/image';
import styles from '..//styles/Summonerpage.module.css';
import { block } from 'million/react';
import Badge from '@mui/material/Badge';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
 
const ProfilePicture: React.FC<{ profileIcon: number, isClaimed: boolean, claimAcc: () => void }> = ({ profileIcon, isClaimed, claimAcc }) => {
  return (
    <div className={styles.profilePictureContainer}>
      {isClaimed ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Tooltip title="Claimed account">
              <VerifiedIcon className={styles.badgeIcon} color="info" />
            </Tooltip>
          }
        >
          <Avatar
            className={styles.profilePicture}
            alt="Summoner Profile"
            src={`https://static.bigbrain.gg/assets/lol/riot_static/13.13.1/img/profileicon/${profileIcon}.png`}
          />
        </Badge>
        ) : (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Tooltip title="Unclaimed account press to claim">
                <ErrorIcon className={styles.badgeIcon} onClick={claimAcc}  />
              </Tooltip>
            }
          >
            <Avatar
              className={styles.profilePicture}
              alt="Summoner Profile"
              src={`https://static.bigbrain.gg/assets/lol/riot_static/13.13.1/img/profileicon/${profileIcon}.png`}
            />
          </Badge>
          )}

    </div>
  );
};

const ProfilePictureBlock = block(ProfilePicture);

export default ProfilePicture;
