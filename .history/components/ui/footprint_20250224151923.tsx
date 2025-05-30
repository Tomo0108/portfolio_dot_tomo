import { ComponentProps } from 'react';

export function Footprint({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      {...props}
      fill="currentColor"
    >
      <path d="M35,15 C31,15 27,17 25,20 C23,23 22,27 23,30 C24,33 26,36 29,37 C32,38 36,38 39,36 C42,34 44,31 44,27 C44,24 43,21 41,19 C39,17 37,15 35,15 Z
              M65,30 C62,30 59,31 57,33 C55,35 54,38 55,41 C56,44 58,46 61,47 C64,48 67,47 69,45 C71,43 72,40 71,37 C70,34 68,32 65,30 Z
              M20,45 C17,45 14,46 12,48 C10,50 9,53 10,56 C11,59 13,61 16,62 C19,63 22,62 24,60 C26,58 27,55 26,52 C25,49 23,47 20,45 Z
              M50,60 C47,60 44,61 42,63 C40,65 39,68 40,71 C41,74 43,76 46,77 C49,78 52,77 54,75 C56,73 57,70 56,67 C55,64 53,62 50,60 Z" />
    </svg>
  );
}
