import React from 'react'
import SimpleSidebar from '../components/Sidebar'
import { Box, Flex,Text,Input,InputGroup,InputRightElement} from '@chakra-ui/react'
import Styles from "./MainContent.module.css"
import { SearchIcon } from '@chakra-ui/icons'

const ForYou = () => {
  return (
    <div className={Styles.main}>
      <Flex>
      <SimpleSidebar />
      <Box w={"100%"} border={"1px solid white"} padding={"20px"}>
          <Text className={Styles.head}>For You</Text>
         
         {/* Search Bar */}
         <InputGroup className={Styles.inp}>
          <Input border={"none"} backgroundColor={"rgba(255, 255, 255, 0.08)"} w={"400px"} borderRadius={0} placeholder='Search Song, Artist' />
          <InputRightElement children={<SearchIcon boxSize={5} mr="40px" mt={2} opacity={"0.2"} />} />
         </InputGroup>

         {/* mapping of the songs */}
      </Box>
      </Flex>
    </div>
  )
}

export default ForYou