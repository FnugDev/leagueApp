import Image from 'next/image';
import styles from '../styles/Summonerpage.module.css';
import Badge from '@mui/material/Badge';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

const BASE_URL = 'https://static.bigbrain.gg/assets/lol/riot_static/13.13.1/img/profileicon';

const ProfileBadgeContent: React.FC<{
  isClaimed: boolean;
  claimAcc: () => void;
}> = ({ isClaimed, claimAcc }) => (
  <Tooltip title={isClaimed ? 'Claimed account' : 'Unclaimed account press to claim'}>
    {isClaimed ? (

<Image alt="test"  className={styles.badgeIcon}width={25} 
height={25} src="/icons8-riot-games-480.svg"></Image>
    ) : (
      <ErrorIcon className={styles.badgeIcon} onClick={claimAcc} />
    )}
  </Tooltip>
);

const ProfilePicture: React.FC<{
  profileIcon: number;
  isClaimed: boolean;
  claimAcc: () => void;
}> = ({ profileIcon, isClaimed, claimAcc }) => {
  return (
    <div>

              <div className={styles.profilePictureContainer}>
              {/* <img 
           className={styles.profilePictureWing}
            src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/wings/wings_grandmaster.png"
            alt="Emblem"
          /> */}
      <div className={styles.profilePictureContainerSpin}>
        <img className={styles.profilePictureContainerLeague2} src="/league/spin1.webp" alt="Ring" />
        <img className={styles.profilePictureContainerLeague3} src="/league/spin1.webp" alt="Ring" />
      </div>
      <img className={styles.profilePictureContainerLeague} draggable={false} src="/league/loader.webp" alt="Ring" />
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<ProfileBadgeContent isClaimed={isClaimed} claimAcc={claimAcc} />}
      >
        <Avatar
          className={styles.profilePicture}
          alt="Summoner Profile"
          src={`${BASE_URL}/${profileIcon}.png`}
        />
      </Badge>
    </div>
    </div>

  );
};

export default ProfilePicture;
