import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { block, For } from 'million/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton component
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Stack from '@mui/material/Stack';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import styles from '../../../styles/Summonerpage.module.css';
import MatchStyles from '../../../styles/MatchHistory.module.css';
import Paper from '@mui/material/Paper';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';
import { getFirestore,getDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SearchBar from '../../../components/searchBar';
import ProfilePicture from '../../../components/ProfilePicture';
import ClaimAccount from '../../../components/ClaimAccount';
import RankedBox from '../../../components/RankedBox';
import ChampionStats from '../../../components/ChampionStats';
import MatchBox from '../../../components/MatchBox';
import UnrankedBox from '../../../components/UnrankedBox';
import LoginAndRegister from '../../../components/LoginRegistration';
import SideMenu from '../../../components/SideMenu';
import AnimatedBubblesChip from '../../../components/animatedChip';
import SummonerSearch from '../../../components/searchSummoner';
import { useBackdropContext } from '../../../components/BackdropContext';
// import challengerSVG from '../../../public/vercel.svg';
// import grandmasterSVG from '../../../data/ranks/grandmaster.svg'; // Don't forget the .svg extension for each SVG file
// import masterSVG from '../../../data/ranks/master.svg';
// import diamondSVG from '../../../data/ranks/diamond.svg';
// import emeraldSVG from '../../../data/ranks/emerald.svg';
// import platinumSVG from '../../../data/ranks/platinum.svg';
// import goldSVG from '../../../data/ranks/gold.svg';
// import silverSVG from '../../../data/ranks/silver.svg';
// import bronzeSVG from '../../../data/ranks/bronze.svg';
// import ironSVG from '../../../data/ranks/iron.svg';
// import { ReactComponent as MySvg } from '../public/vercel.svg';
import React from 'react';
import AcUnit from '@mui/icons-material/AcUnit';

const debounce = <T extends any[]>(func: (...args: T) => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const chipIconMapping = {
  'AcUnit': AcUnitIcon,
  'WhatshotIcon': WhatshotIcon,
  // 'Challenger': challengerSVG,

  // Add other icons and their names here
};

const IndexPage = () => {
  const router = useRouter();
  const { region, username } = router.query;
  const [data, setData] = useState<{
    summonerData: any;
    playerChips: any;
    soloQueueInfo: any;
    flexQueueInfo: any;
    matchHistory: any;
    championStats: any;
    summonerLive: any;
  } | null>(null);

  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const itemImageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/`;
  const SummonerImageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/`;
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showClaimAccountForm, setShowClaimAccountForm] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isAccHasClaimed, setAccHasClaimed] = useState(false);
  const [authacc, setAuthacc] = useState<string | null>(null);
  const { openBackdrop, closeBackdrop, backdropOpen } = useBackdropContext();

  useEffect(() => {
    fetchData(); // Initial data load

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthacc(user.uid);
      } else {
        setAuthacc(null);
      }
    });

    if (region && username) {
      debouncedFetchData(); // Fetch data on region or username change
    }
  
    return () => {
      unsubscribe(); // Clean up the subscription when the component unmounts
    };
  }, [region, username]);

  useEffect(() => {
    if (region !== router.query.region || username !== router.query.username) {
      localStorage.removeItem('summonerDataCache');
    }
  }, [region, username, router.query.region, router.query.username]);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted
  
    const checkClaimStatus = async () => {
      try {
        const db = getFirestore();
        const claimDocRef = doc(db, "claimedAccounts", `${username}(${region})`);
        const docSnapshot = await getDoc(claimDocRef);
  
        if (isMounted) { // Check if the component is still mounted before updating state
          if (docSnapshot.exists()) {
            setIsClaimed(true);
          } else {
            setIsClaimed(false);
          }
        }
      } catch (error) {
        console.error("Error checking claim status:", error);
      }
    };
  
    checkClaimStatus();
  
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, [username, region]);
  

  useEffect(() => {
    const checkUserClaims = async () => {
      if (!authacc || Array.isArray(authacc)) {
        // If the username is not available or is an array, return or do nothing
        return;
      }

      const db = getFirestore();
      const userClaimsDocRef = doc(db, "userClaims", authacc);
      const docSnapshot = await getDoc(userClaimsDocRef);
      
      if (docSnapshot.exists()) {
        setAccHasClaimed(true);
      }
    };

    checkUserClaims();
  }, [authacc]);
  // Function to check the claim status in Firestore

  useEffect(() => {
    const fetchLatestVersion = async () => {
      try {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await response.json();
        setLatestVersion(versions[0]); // Store the latest version in state
      } catch (error) {
        console.error('Error fetching latest version:', error);
      }
    };

    fetchLatestVersion();
  }, []);


  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/summoner/${region}/${username}`);
      const jsonData = await response.json();
      setData(jsonData);

      // Store the data in the local storage to be used for client-side caching
      localStorage.setItem('summonerDataCache', JSON.stringify({ data: jsonData, timestamp: Date.now() }));
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);

      // Handle API rate limit exceeded
      if (error.message === 'API rate limit exceeded') {
        // Display a message to the user indicating the rate limit is exceeded
        setData(null); // Clear the data so that Skeleton components will be rendered
      }
    }
  };

  // Function to fetch data only if it's not in the cache or cache is expired
  const fetchDataFromCache = () => {
    const cachedData = localStorage.getItem('summonerDataCache');
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        const cacheExpiration = new Date(parsedData.timestamp).getTime() + 2 * 60 * 1000; // Cache expires after 2 minutes (100 requests in 2 minutes)
        const cachedUsername = parsedData?.data?.summonerData?.name;
        if (Date.now() < cacheExpiration && cachedUsername === username) {
          // Use the cached data only if the username matches the current username in the state
          setData(parsedData.data);
          return;
        }
      } catch (error) {
        console.error('Error parsing cached data:', error);
      }
    }
    // If data is not in the cache or cache is expired, fetch it from the API
    fetchData();
  };

  const debouncedFetchData = useCallback(
    debounce(fetchDataFromCache, 1000),
    [fetchDataFromCache]
  ); // Debounce the API request with a delay of 1 second


  const totalSoloGames = data?.soloQueueInfo?.wins + data?.soloQueueInfo?.losses;
  const SoloQWinRate = totalSoloGames === 0 ? 0 : (data?.soloQueueInfo?.wins / totalSoloGames) * 100;

  // Calculate Flex Queue Win Rate
  const totalFlexGames = data?.flexQueueInfo?.wins + data?.flexQueueInfo?.losses;
  const FlexWinRate = totalFlexGames === 0 ? 0 : (data?.flexQueueInfo?.wins / totalFlexGames) * 100;
  


  const showLogin = () => {
    setShowLoginForm(true);

  };

  const handleStartClaimAccount = () => {
    setShowClaimAccountForm(true)
  };
  // const [isClaimAccountLoading, setIsClaimAccountLoading] = useState(true);
  const handleClaimAccount = async (confirmedIconId: number) => {
    try {
      const username = router.query.username;
      const region = router.query.region;

      if (!username || Array.isArray(username)) {
        // If the username is not available or is an array, return or do nothing
        return;
      }

      if (!authacc || Array.isArray(authacc)) {
        // If the username is not available or is an array, return or do nothing
        return;
      }
  
      // Check if the account is still unclaimed (in case another user claimed it just before this function was called)
      const db = getFirestore();

      const claimDocRef = doc(db, "claimedAccounts", `${username}(${region})`);
      const userClaimsDocRef = doc(db, "userClaims", authacc);
  
      const docSnapshot = await getDoc(claimDocRef);
      if (docSnapshot.exists()) {
        // Account is already claimed, do nothing
        return;
      }

      const docSnapshot3 = await getDoc(userClaimsDocRef);
      if (docSnapshot3.exists()) {
        // Account is already claimed, do nothing
        return;
      }
  
      const fetchedData = await fetchData();
  
      console.log(fetchedData?.summonerData?.profileIcon, confirmedIconId);
  
      if (fetchedData?.summonerData?.profileIcon == confirmedIconId) {
        // Update the Firestore document to claim the account
        setShowClaimAccountForm(false);

        await setDoc(claimDocRef, { claimedBy: authacc });
        await setDoc(userClaimsDocRef, { username, region });
        // Set the isClaimed state to true to trigger the UI update
        setIsClaimed(true);
  
      } else {
        console.log("authentication failed summoner icon does not match");
        setShowClaimAccountForm(false);
      }
    } catch (error) {
      console.error("Error claiming account:", error);
    }
  };
  
  
  const handleProfileButtonClick = async () => {
    try {
      // Retrieve the claimed account's username and region for the current user
      const db = getFirestore();

      if (!authacc || Array.isArray(authacc)) {
        // If the username is not available or is an array, return or do nothing
        return;
      }

      const userClaimsDocRef = doc(db, "userClaims", authacc);
      const docSnapshot = await getDoc(userClaimsDocRef);
      if (docSnapshot.exists()) {
        const { username, region } = docSnapshot.data();
        // Redirect to the claimed account's profile page
        router.push(`/summoner/${region}/${username}`);
      } else {
        console.log("No claimed account found for the current user");
        // Handle the case where no claimed account is found for the current user
      }
    } catch (error) {
      console.error("Error handling profile button click:", error);
    }
  };


  const profilePictureElement = useMemo(() => {
    if (data?.summonerData?.profileIcon !== undefined) {
      return <ProfilePicture profileIcon={data.summonerData.profileIcon} isClaimed={isClaimed} claimAcc={handleStartClaimAccount} />;
    } else {
      return (
        <Skeleton className={styles.profilePictureContainer} variant="circular" width={96} height={96} animation="wave" />
      );
    }
  }, [data?.summonerData?.profileIcon]);

  const Username = ({ name }) => {
    const usernameElement = useMemo(() => {
      return (
        <div className={styles.usernameContainer}>
          {name ? (
            <Typography className={styles.username}>
              {name}
            </Typography>
          ) : (
            <Skeleton width={96} variant="text" sx={{ fontSize: '1rem' }} />
          )}
        </div>
      );
    }, [name]);
  
    return usernameElement;
  };  
  

interface PlayerChip {
  name: string;
  desc: string;
  icon: string | null;
  color: string;
}


// ... rest of your code

const summonerChipsElement = useMemo(() => {
  if (data?.playerChips) {
    return (
      <div className={styles.summonerChipsContainer}>
        {data.playerChips.map((chip: PlayerChip, index: number) => {
          const ChipIcon = chip.icon ? chipIconMapping[chip.icon] : null; // Use chip.icon if it's not null
          return (
            <Tooltip key={index} title={chip.desc} arrow>
              <Chip
                label={chip.name}
                style={{ color: chip.color }}
                className={styles.summonerChips}
                icon={ChipIcon ? <ChipIcon className={styles.smallIcon} style={{ color: chip.color }} /> : <div />} // Use a default empty div as the icon
              />
            </Tooltip>
          );
        })}
      </div>
    );
  } else {
    return null; // Return null if data.playerChips is falsy
  }
}, [data?.playerChips]);

// let summonerChipsElement: JSX.Element | null = null;
// if (data?.playerChips) {
//   summonerChipsElement = (
//     <div className={styles.summonerChipsContainer}>
//       {data.playerChips.map((chip: PlayerChip, index: number) => {
//         const ChipIcon = chip.icon ? chipIconMapping[chip.icon] : null; // Use chip.icon if it's not null
//         return (
//           <Tooltip key={index} title={chip.desc} arrow>
//             <Chip
//               label={chip.name}
//               style={{ color: chip.color }}
//               className={styles.summonerChips}
//               icon={
//                 <img
//                   src={"../../ranks/master.svg"}
       
//                   className={styles.smallIcon}
      
//                 />
//               } // Use a default empty div as the icon
//             />
//           </Tooltip>
//         );
//       })}
//     </div>
//   );
// }
  



  let liveGameButtonElement: JSX.Element | null = null;
  if (data?.summonerLive) {
    liveGameButtonElement = (
      <Button
        variant="outlined"
        color="error"
        startIcon={<RadioButtonCheckedIcon />}
        href={`/live/${region}/${username}`}
        onClick={() => router.push(`/live/${region}/${username}`)}
      >
        Live Game
      </Button>
    );
  }

  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    // Calculate rotation based on cursor position
    const rotationX = (clientY / window.innerHeight - 0.5) * 30; // Adjust the multiplier for sensitivity
    const rotationY = (clientX / window.innerWidth - 0.5) * 30;
    setRotation({ x: rotationX, y: rotationY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 }); // Reset rotation when cursor leaves
  };

  const [rotation2, setRotation2] = useState({ x: 0, y: 0 });

  const handleMouseMove2 = (e) => {
    const { clientX, clientY } = e;
    // Calculate rotation based on cursor position
    const rotationX = (clientY / window.innerHeight - 0.5) * 30; // Adjust the multiplier for sensitivity
    const rotationY = (clientX / window.innerWidth - 0.5) * 30;
    setRotation2({ x: rotationX, y: rotationY });
  };

  const handleMouseLeave2 = () => {
    setRotation({ x: 0, y: 0 }); // Reset rotation when cursor leaves
  };

  const soloQueueRankedBoxElement = useMemo(() => {
    if (data?.soloQueueInfo) {
      return (
        <RankedBox
          queueName="Ranked Solo"
          tier={data.soloQueueInfo.tier}
          rank={data.soloQueueInfo.rank}
          leaguePoints={data.soloQueueInfo.leaguePoints}
          wins={data.soloQueueInfo.wins}
          losses={data.soloQueueInfo.losses}
          winRate={SoloQWinRate}
        />
      );
    } else {
      return <UnrankedBox title="Ranked Solo" text="UNRANKED" />;
    }
  }, [data?.soloQueueInfo, SoloQWinRate]);

  const flexQueueRankedBoxElement = useMemo(() => {
    if (data?.flexQueueInfo) {
      return (
        <RankedBox
          queueName="Ranked Flex"
          tier={data.flexQueueInfo.tier}
          rank={data.flexQueueInfo.rank}
          leaguePoints={data.flexQueueInfo.leaguePoints}
          wins={data.flexQueueInfo.wins}
          losses={data.flexQueueInfo.losses}
          winRate={FlexWinRate}
        />
      );
    } else {
      return <UnrankedBox title="Ranked Flex" text="UNRANKED" />;
    }
  }, [data?.flexQueueInfo, FlexWinRate]);

  const renderLoginForm = () => {
    if (showLoginForm) {
      return <LoginAndRegister />;
    }
    return null;
  };
  
  const renderClaimAccountForm = () => {
    if (showClaimAccountForm) {
      return <ClaimAccount onConfirm={handleClaimAccount} />;
    }
    return null;
  };
  const CustomPaper = styled(Paper)(({ theme }) => ({
    // backdropFilter: 'blur(10px)',
    backgroundColor: theme.vars.palette.cbox,
    // boxShadow: '0px 0px 1px #d9d9d9, 0px 1px 1px #d9d9d9',
  
    [theme.getColorSchemeSelector('dark')]: {
      // backdropFilter: 'blur(10px)',
      backgroundColor: theme.vars.palette.cbox,
      // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
  }));

  return (
    <div className={styles.fullScreenContainer}>
 <div className={styles.blurGradient}></div>
 <div className={styles.blurGradient2}></div>
      <div className={styles.parentContainer}>
      <div className={styles.parentContainerContent}>
      <div className={styles.contentWrapper}>
        <div className={styles.profileContainer}>


          {summonerChipsElement}
          {profilePictureElement}
          <Username name={data?.summonerData?.name} />

          {liveGameButtonElement}
        </div>
        
      
        
          <div className={styles.leagueV4Container}>
            {soloQueueRankedBoxElement}
            {flexQueueRankedBoxElement}
            <ChampionStats championStats={data?.championStats || {}} />
          </div>

          {/* Match History */}
          <CustomPaper className={MatchStyles.matchHistoryContainer}>
            <Box className={MatchStyles.matchHistoryBox}>
              <Box className={MatchStyles.matchHistoryHeader}>
                <Typography className={MatchStyles.matchHistoryHeaderText} variant="h6">Match History</Typography>
              </Box>
              <Box>
                {data?.matchHistory?.map((match) => (
                  match ? (
                    <MatchBox key={match.matchId} match={match} itemImageUrl={itemImageUrl} summonerImageUrl={SummonerImageUrl} />
                  ) : (
                    <Skeleton key={null} className={MatchStyles.matchBox} variant="rectangular" width="100%" height={120} animation="wave" style={{ marginBottom: '16px' }} />
                  )
                ))}
              </Box>
            </Box>
          </CustomPaper>
        </div>
        </div>
        </div>

          {/* Side Menu */}
        <div>
          <SideMenu/>
          <div>
  {renderLoginForm()}
</div>
<div>
  {renderClaimAccountForm()}
</div>
        </div>
  
      <Backdrop
     sx={{
        color: '#fff',
        
        backdropFilter: 'blur(4px)',

        top: 0,

        width: '100%',
        height: '100%',
        zIndex: 100000000,
      }}
      invisible={true}
      open={backdropOpen}
      onClick={closeBackdrop}
>
  <SummonerSearch/>
</Backdrop>
    </div>
  );
};

 



export default IndexPage;
