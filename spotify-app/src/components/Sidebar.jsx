import React from 'react'
import Styles from "./Sidebar.module.css"
import {IconButton,Box,CloseButton,Flex,Icon,useColorModeValue,Link,Drawer,DrawerContent,Text,useDisclosure,BoxProps,FlexProps, VStack,} from '@chakra-ui/react';
import {NavLink} from "react-router-dom"

const SidebarLinks = [
  {name:"For You", path:"/"},
  {name:"Top Tracks" , path:"/toptracks"},
  {name:"Favourites" , path:"/favourites"},
  {name:"Recents", path:"/recents"}
]

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" >
      <Sidebar
        onClose={() => onClose}
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


const Sidebar = ({ onClose, ...rest }) => {

  
  return (
   
    <Box className={Styles.Sidebar}
      borderRight="1px"
      pos="fixed"
      
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        
        <img className={Styles.logo} src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png' alt='spotify' 
        />
        
        {/* <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} /> */}
      </Flex>
      {SidebarLinks.map((el,i) => (
        <VStack key={i}>
            <NavLink to={el.path}>{el.name}</NavLink>
        </VStack>
      ))}
    </Box>
  )
}

// export default Sidebar