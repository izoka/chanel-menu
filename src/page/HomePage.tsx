import React from "react";
import Menu from "../components/Menu";

import "./HomePage.css";

const menuOptions = [
    {
        id: 1,
        title: 'Artist',
        parent: null,
    },
    {
        id: 2,
        title: 'Stone',
        parent: 1,
    },
    {
        id: 3,
        title: 'Metallica',
        parent: 1,
    },
    {
        id: 4,
        title: 'Film',
        parent: null,
        url: 'https://www.chanel.com/'
    },
    {
        id: 5,
        title: 'The Rolling Stones',
        parent: 2,
    },
    {
        id: 6,
        title: 'Gorillaz',
        parent: 1,
    },
    {
        id: 7,
        title: 'Album',
        parent: 5,
        url: 'https://www.chanel.com/'
    },
    {
        id: 8,
        title: 'Série',
        parent: null,
        url: 'https://www.chanel.com/'
    },
    {
        id: 9,
        title: 'Bones',
        parent: 8,
    },
]

const HomePage: React.FC = () => {
    return (
        <div className="container">
            <Menu data={menuOptions} />
        </div>
    )
}

export default HomePage;
