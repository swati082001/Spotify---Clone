import React from 'react'
import SimpleSidebar from '../components/Sidebar'
import { Heading ,Box, Flex} from '@chakra-ui/react'
import Styles from "./MainContent.module.css"

const ForYou = () => {
  return (
    <div className={Styles.main}>
      <Flex>
      <SimpleSidebar />
      <Heading>For You</Heading>
      </Flex>
    </div>
  )
}

export default ForYou