import React from 'react';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = () => {
    return(
        <header>
            <h1>Eco</h1>
        </header>
    )
}

export default Header;