import type { SVGProps } from 'react';

export default function PlusIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="52" height="27" viewBox="0 0 52 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width="52" height="27" rx="13.5" fill="#242EDB" />
            <path d="M26 6.5V20.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 13.5H33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>


    );
}