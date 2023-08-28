import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import styles from '../styles/Summonerpage.module.css';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';

const regions = [
  'br', 'eune', 'euw', 'jp', 'kr', 'lan', 'las', 'na', 'oce', 'tr', 'ru', 'ph', 'sg', 'th', 'tw', 'vn'
];

const SummonerSearch = () => {
  const [selectedRegion, setSelectedRegion] = useState('na'); // Default region
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // Use null to control Menu component
  const regionButtonRef = useRef(null); 
  const [anchorEl, setAnchorEl] = useState(null);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setAnchorEl(null);
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  const CustomBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.vars.palette.cbox,
    border: '1px solid rgba(218, 226, 237,0.8)',
    boxShadow: '0px 0px 1px #d9d9d9, 0px 1px 1px #d9d9d9',

    [theme.getColorSchemeSelector('dark')]: {
      backgroundColor: theme.vars.palette.cbox,
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
      border: "1px solid rgba(39, 37, 53, 0.8)",
    },
  }));

  return (
    <CustomBox className={styles.searchSummoner} onClick={handleBoxClick} style={{ position: 'relative' }} display="flex" alignItems="center">
      <IconButton>
        <SearchIcon />
      </IconButton>
      <TextField
        placeholder="Enter summoner name"
        size="small"
        style={{ flex: 1, margin: '0 8px' }}
      />
      <div className="region-dropdown">
        <Button
          color="info"
          size="small"
          onClick={handleDropdownClick}
        >
          {selectedRegion} <ArrowDropDownIcon />
        </Button>
        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          className={styles.searchSummonerMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {regions.map(region => (
            <MenuItem
              key={region}
              className={styles.searchSummonerMenuItem}
              onClick={() => handleRegionChange(region)}
            >
              {region}
            </MenuItem>
          ))}
        </Popover>
      </div>
      <Button variant="contained" color="primary">
        Search
      </Button>
    </CustomBox>
  );
};

export default SummonerSearch;
