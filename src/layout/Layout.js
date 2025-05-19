import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Headers from '../components/Headers'
import Home from '../view/Home'
import Email from '../view/Email'
import ForestHabitat from '../view/ForestHabitat'
import ExploreSpecies from '../view/ExploreSpecies'
import Policy from '../view/Policy'
import Wireframe from '../view/Wireframe'
import ScrollToTop from '../components/ScrollToTop'
import Footer from '../components/Footer'

const Layout = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Headers />
            <Routes>
                <Route index element={<Home />} />
                <Route path="email" element={<Email />} />
                <Route path="forest-habitat" element={<ForestHabitat />} />
                <Route path="explore-species" element={<ExploreSpecies />} />
                <Route path="policy" element={<Policy />} />
                <Route path="wireframe" element={<Wireframe />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Layout