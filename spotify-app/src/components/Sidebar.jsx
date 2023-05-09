import React from 'react'
import Styles from "./Sidebar.module.css"
import {IconButton,Box,CloseButton,Flex,Icon,useColorModeValue,Link,Drawer,DrawerContent,Text,useDisclosure,BoxProps,FlexProps,VStack} from '@chakra-ui/react';
import { Avatar,Wrap,WrapItem} from '@chakra-ui/react'
import {NavLink} from "react-router-dom"
import {FiMenu} from 'react-icons/fi';

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
      <Drawer autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        isFullHeight
        size="xs">
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}


const Sidebar = ({ onClose, ...rest }) => {
  
  return (
   
    <Box 
         backgroundColor={{base:"black",lg:"transparent",xl:"transparent"}}
          w={{ base: "full", md: 60 }} 
          pos="fixed" 
          h="full" 
          {...rest} 
   >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box w={"90%"} p={"10px"}>
        <img className={Styles.logo} src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png' alt='spotify' 
        />
        </Box>
        
        <CloseButton display={{ base: 'flex', md: 'none' }} color={"white"} onClick={onClose} />
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

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

    </Flex>
  );
};