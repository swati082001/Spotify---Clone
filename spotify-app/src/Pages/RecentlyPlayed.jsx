import React from 'react'
import SimpleSidebar from '../components/Sidebar'
import { Flex, Heading } from '@chakra-ui/react'
import Styles from "./MainContent.module.css"

const RecentlyPlayed = () => {
  return (
    <div className={Styles.main}>
      <Flex>
      <SimpleSidebar />
      <Heading>Recently Played</Heading>
      </Flex>
    </div>
  )
}

export default RecentlyPlayed