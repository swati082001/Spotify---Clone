import React from 'react'
import {Routes,Route} from "react-router-dom"
import ForYou from '../Pages/ForYou'
import RecentlyPlayed from '../Pages/RecentlyPlayed'
import TopTracks from '../Pages/TopTracks'
import Favourites from '../Pages/Favourites'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<ForYou/>}></Route>
            <Route path='/recents' element={<RecentlyPlayed />}></Route>
            <Route path='/toptracks' element={<TopTracks />}></Route>
            <Route path='/favourites' element={<Favourites />}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes