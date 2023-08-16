import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './container';
import React from 'react';



export function Hero() {
  return (
    <div className="relative">
      <Blur />
      <Container>
        <code>
            export function Hero() {
                
            }
        </code>
  
      </Container>
    </div>
  );
}

export function Blur() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
    >
      <div className="fix-safari-blur blur-[106px] h-56 bg-gradient-to-br from-purple-500 to-purple-400 dark:from-purple-700"></div>
      <div className="fix-safari-blur blur-[106px] h-32 bg-gradient-to-r from-purple-400 to-purple-300 dark:to-purple-600"></div>
    </div>
  );
}

