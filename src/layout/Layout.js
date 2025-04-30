import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Headers from '../components/Headers'
import Home from '../view/Home'
import Email from '../view/Email'
import ExploreSpecies from '../view/ExploreSpecies'
import TakeAction from '../view/TakeAction'
import Wireframe from '../view/Wireframe'
import ReadMoreForest from '../view/ReadMoreForest';
import ReadMoreBiodiversity from '../view/ReadMoreBiodiversity';

const Layout = () => {
    return (
        <BrowserRouter>
            <Headers />

            <Routes>
                <Route index element={<Home />} />
                <Route path="home/forest" element={<ReadMoreForest />} />
                <Route path="home/biodiversity" element={<ReadMoreBiodiversity />} />
                <Route path="email" element={<Email />} />
                <Route path="explore-species" element={<ExploreSpecies />} />
                <Route path="take-action" element={<TakeAction />} />
                <Route path="wireframe" element={<Wireframe />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Layout