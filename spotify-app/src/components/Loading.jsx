import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Box bgColor={"linear-gradient(160deg , rgb(${color.join(',')}) 8%, rgba(1,0,2,1) 90%)"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />
    </Box>
  )
}

export default Loading