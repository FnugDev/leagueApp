// ProfilePicture.tsx
import Image from 'next/image';
import styles from '..//styles/Summonerpage.module.css';
import { block } from 'million/react';
import React from 'react';
 
const ProfilePicture: React.FC<{ profileIcon: number }> = ({ profileIcon }) => {
  return (
    <div className={styles.profilePictureContainer}>
      <Image
        className={styles.profilePicture}
        alt="Summoner Profile"
        width={100}
        height={100}
        src={`https://static.bigbrain.gg/assets/lol/riot_static/13.13.1/img/profileicon/${profileIcon}.png`}
      />
    </div>
  );
};

const ProfilePictureBlock = block(ProfilePicture);

export default ProfilePicture;
