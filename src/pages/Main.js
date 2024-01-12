import { useState } from 'react';
import Home from './Home.js';
import News from './News.js';
import People from './People.jsx';
import PeopleReg from './PeopleRegister.jsx';
import NiverList from './Niver.jsx';
import { Route, Routes } from 'react-router-dom';
import './css/Main.css'

const Main = () => {

    return (
        <div className="Main">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/people" element={<People />} />
                <Route path="/people/register" element={<PeopleReg />} />
                <Route path="/people/person/:userid" element={<People />} />
                <Route path="/NiverList" element={<NiverList />} />
            </Routes>
        </div>
    )
}

export default Main;