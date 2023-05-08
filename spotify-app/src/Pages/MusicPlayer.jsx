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

  

  //console.log(data[currentSong].url,currentSong,"current")
    
  return (
    <Box width={"100%"} >
        <Box width={"500px"} h={"600px"} pos={"fixed"} top={"60px"} right={"90px"} gap={"32px"} >
            <Box  h={"68px"} gap={"8px"}>
            <Text fontWeight={700} fontSize={"32px"} lineHeight={"36px"} fontStyle={"normal"}>{data[currentSong].title}</Text>
            <Text fontWeight={400} fontSize={"16px"} lineHeight={"24px"} fontStyle={"normal"} opacity={0.6}>{data[currentSong].artist}</Text>
            </Box>
            <Box width={"450px"} h={"510px"} mt="10px">
                <Image src={data[currentSong].photo}/>
            </Box>

            <Box>
            <Slider aria-label="slider-ex-1" max={duration} value={currentTime}  w="90%" mt="4"  onChange={handleSliderChange}>
                <SliderTrack bg="white">
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            
            <Flex dir='row' justifyContent={"space-between"} w="90%">

                        <Box>
                            <IconButton   borderRadius={"50px"} aria-label="options" bg={"transparent"} _hover={{bg:"rgba(255, 255, 255, 0.08)"}} icon={<SlOptions />}size="lg" mr="4"/>
                        </Box>


                        <Box>
                            <IconButton  onClick={handlePrev} borderRadius={"50px"} aria-label="previous" bg={"transparent"} _hover={{bg:"rgba(255, 255, 255, 0.08)"}} icon={<FaBackward />}size="lg" mr="4"/>

                            <IconButton  onClick={handlePlayPause} borderRadius={"50px"} aria-label={isPlaying ? "pause" : "play"} bg={"transparent"} _hover={{bg:"rgba(255, 255, 255, 0.08)"}} icon={isPlaying ? <FaPause /> : <FaPlay />}
                                size="lg" mr="4"/>

                            <IconButton onClick={handleNext} borderRadius={"50px"}  aria-label="next" bg={"transparent"} _hover={{bg:"rgba(255, 255, 255, 0.08)"}}  icon={<FaForward />} size="lg"/>
                        </Box>

                        <Box>
                            <IconButton _hover={{bg:"rgba(255, 255, 255, 0.08)"}} borderRadius={"50px"} icon={mute ? <FaVolumeMute /> : <FaVolumeUp />} onClick={toggleMute}
                            variant="ghost" size="lg" aria-label={mute ? "Unmute" : "Mute"}/>

                        </Box>
            </Flex>


            
            <audio autoPlay ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => setDuration(audioRef.current.duration)} onEnded={handleNext} />
            </Box>
        </Box>
    </Box>
  )
}

export default MusicPlayer