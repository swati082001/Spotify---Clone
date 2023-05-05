import React from 'react'
import SimpleSidebar from '../components/Sidebar'
import { Heading ,Flex} from '@chakra-ui/react'
import Styles from "./MainContent.module.css"

const TopTracks = () => {
  return (
    <div className={Styles.main}>
      <Flex>
      <SimpleSidebar />
      <Heading>Top Tracks</Heading>
      </Flex>
    </div>
  )
}

export default TopTracks