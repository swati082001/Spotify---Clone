import React from 'react'
import Styles from "./Sidebar.module.css"
import {IconButton,Box,CloseButton,Flex,Icon,useColorModeValue,Link,Drawer,DrawerContent,Text,useDisclosure,BoxProps,FlexProps, VStack,} from '@chakra-ui/react';
import { Avatar, AvatarBadge, AvatarGroup ,Wrap,WrapItem} from '@chakra-ui/react'
import {NavLink} from "react-router-dom"

const SidebarLinks = [
  {name:"For You", path:"/"},
  {name:"Top Tracks" , path:"/toptracks"},
  {name:"Favourites" , path:"/favourites"},
  {name:"Recents", path:"/recents"}
]

export default function SimpleSidebar({ children }) {
  
  return (
    <Box minH="100vh" >
      <Sidebar
        display={{ base: 'none', md: 'block' }}
      />
      {/* <Drawer autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
       */}
      
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}


const Sidebar = () => {
  
  return (
   
    <Box className={Styles.Sidebar}
      pos="fixed">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box w={"90%"} p={"10px"}>
        <img className={Styles.logo} src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png' alt='spotify' 
        />
        </Box>
        
        {/* <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} /> */}
      </Flex>
      <Box className={Styles.navBox}>
      {SidebarLinks.map((el,i) => (
        <VStack key={i}>
            <NavLink to={el.path} style={({isActive})=>{
          return isActive ? {opacity:"100"}:{opacity:0.4}
        }} >
              <Text className={Styles.nav}>{el.name}</Text>
            </NavLink>
        </VStack>
      ))}
      </Box>

      <Box className={Styles.footer}>
        <Wrap>
          <WrapItem>
            <Avatar  name='Dan Abrahmov' src='https://bit.ly/code-beast' />
          </WrapItem>
        </Wrap>
      </Box>
     
    </Box>
  )
}

// export default Sidebar