import { ComponentProps } from 'react';

export function Footprint({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      {...props}
      fill="currentColor"
    >
      <path d="M9.5,3.5c-1.4,0.3-2.3,1.4-2.6,2.7C6.6,7.4,7,8.6,7.8,9.5c0.7,0.8,1.9,1.2,3,1c1.4-0.3,2.3-1.4,2.6-2.7
        c0.3-1.2-0.1-2.4-0.9-3.3C11.8,3.7,10.6,3.3,9.5,3.5z M4.5,11.5c-1.1,0.3-1.9,1.1-2.2,2.2c-0.2,0.9,0,1.8,0.5,2.6
        c0.6,0.8,1.5,1.3,2.5,1.3c1.1-0.3,1.9-1.1,2.2-2.2c0.2-0.9,0-1.8-0.5-2.6C6.4,11.9,5.5,11.4,4.5,11.5z M13.5,13.5
