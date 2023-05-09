import { Box, Heading, Image ,Text,Slider,SliderFilledTrack,SliderTrack,SliderThumb,Button,IconButton, Flex} from '@chakra-ui/react'
import React,{ useState, useRef, useEffect } from 'react'
import {FaPlay,FaPause,FaForward,FaBackward,} from "react-icons/fa";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

const MusicPlayer = ({playlist,data,index,onChange}) => {

    const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mute,SetMute] = useState(false);
    
   useEffect(()=>{
    data.forEach((el,i)=>{
        if(el._id===playlist._id){
            setCurrentSong(i)
            // setIsPlaying(true)
        }
    })
   },[playlist])


   
   useEffect(() => {
    audioRef.current.src = data[currentSong].url;
    audioRef.current.load();
  }, [currentSong, data]);
  

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    SetMute(audioRef.current.muted);
  };

  const handleSliderChange = (value) => {
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };


  const handleNext = () => {
    setCurrentTime(0);
    setCurrentSong((currentSong + 1) % data.length);
    setIsPlaying(true);
    console.log(currentSong,"currentsong")
    onChange((currentSong + 1) % data.length)
  };
  

  const handlePrev = () => {
    setCurrentTime(0);
    setCurrentSong(
      currentSong === 0 ? data.length - 1 : currentSong - 1
    );
    onChange(currentSong === 0 ? data.length - 1 : currentSong - 1)
    setIsPlaying(true);
  };

  // {{base:"",sm:"",md:"",lg:""}}

  //console.log(data[currentSong].url,currentSong,"current")
    
  return (
    <Box width={"100%"} >
        <Box width={{base:"100%",sm:"100%",md:"100%",lg:"500px"}} h={{base:"auto",sm:"auto",md:"auto",lg:"600px"}} pos={{lg:'fixed'}} top={{lg:"60px"}} right={{lg:"90px"}} gap={"32px"} mt={{base:"60px",sm:"",md:"",lg:"0px"}}>

            <Box  h={{base:"auto",sm:"auto",md:"auto",lg:"68px"}} gap={"8px"}>

              <Text textAlign={{base:"center",sm:"center",md:"initial",lg:"initial"}} fontWeight={700} fontSize={{base:"26px",sm:"28px",md:"32px",lg:"32px"}} lineHeight={"36px"} fontStyle={"normal"}>{data[currentSong].title}</Text>

              <Text textAlign={{base:"center",sm:"center",md:"initial",lg:"initial"}} fontWeight={400} fontSize={"16px"} lineHeight={"24px"} fontStyle={"normal"} opacity={0.6}>{data[currentSong].artist}</Text>
            
            </Box>

            <Box width={{lg:"450px",base:"100%"}} h={{base:"auto",sm:"auto",md:"510px",lg:"510px"}} mt="10px">
                <Image src={data[currentSong].photo}/>
            </Box>

            <Box>
            <Slider aria-label="slider-ex-1" max={duration} value={currentTime}  w={{base:"100%",sm:"100%",md:"90%",lg:"90%"}} mt="4"  onChange={handleSliderChange}>
                <SliderTrack bg="white">
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            
            <Flex dir='row' justifyContent={"space-between"} w={{base:"100%",sm:"100%",md:"90%",lg:"90%"}}>

                        <Box>
                            <IconButton   borderRadius={"50px"} aria-label="options" bg={"transparent"} _hover={{bg:"rgba(255, 255, 255, 0.08)"}} icon={<SlOptions />} size={{base:"xs",sm:"sm",md:"sm",lg:"lg"}} mr={{base:"2",sm:"",md:"",lg:"4"}}/>
                        </Box>


                        <Box>
                            <IconButton  onClick={handlePrev} borderRadius={"50px"} aria-label="previous" bg={"transparent"} _hover={{bg:"rgba(255, 255, 255, 0.08)"}} icon={<FaBackward />} size={{base:"xs",sm:"sm",md:"sm",lg:"lg"}} mr={{base:"2",sm:"",md:"",lg:"4"}}/>

                            <IconButton  onClick={handlePlayPause} borderRadius={"50px"} aria-label={isPlaying ? "pause" : "play"} bg={"transparent"} _hover={{bg:"rgba(255, 255, 255, 0.08)"}} icon={isPlaying ? <FaPause /> : <FaPlay />}
                                size={{base:"xs",sm:"sm",md:"sm",lg:"lg"}} mr={{base:"2",sm:"",md:"",lg:"4"}}/>

                            <IconButton onClick={handleNext} borderRadius={"50px"}  aria-label="next" bg={"transparent"} _hover={{bg:"rgba(255, 255, 255, 0.08)"}}  icon={<FaForward />} size={{base:"xs",sm:"sm",md:"sm",lg:"lg"}}/>
                        </Box>

                        <Box>
                            <IconButton _hover={{bg:"rgba(255, 255, 255, 0.08)"}} borderRadius={"50px"} icon={mute ? <FaVolumeMute /> : <FaVolumeUp />} onClick={toggleMute}
                            variant="ghost" size={{base:"xs",sm:"sm",md:"sm",lg:"lg"}} aria-label={mute ? "Unmute" : "Mute"}/>

                        </Box>
            </Flex>


            
            <audio autoPlay ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => setDuration(audioRef.current.duration)} onEnded={handleNext} />
            </Box>
        </Box>
    </Box>
  )
}

export default MusicPlayer