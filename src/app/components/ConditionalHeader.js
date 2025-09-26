'use client';

import { usePathname } from 'next/navigation';
import Header from './Header'; // Your original Header component

const ConditionalHeader = () => {
    const pathname = usePathname();

    // Add any other paths where you don't want the header to appear
    const noHeaderPaths = ['/login']; 

    // If the current path is in the noHeaderPaths array, render nothing
    if (noHeaderPaths.includes(pathname)) {
        return null;
    }

    // Otherwise, render the main Header component
    return <Header />;
};

export default ConditionalHeader;