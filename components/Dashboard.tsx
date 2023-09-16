import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    const fetchLolAccount = async () => {
      try {
        const res = await axios.get('/api/getLolAccount');
        console.log('Account info:', res.data);
      } catch (error) {
        console.error('Failed to fetch account:', error);
      }
    };

    fetchLolAccount();
  }, []);

  return (
    <div>
      {/* Render the user's LoL account details here */}
    </div>
  );
}
