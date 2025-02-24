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
