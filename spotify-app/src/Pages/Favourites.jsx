import React from 'react'
import SimpleSidebar from '../components/Sidebar'
import { Box, Flex,Text,Input,InputGroup,InputRightElement,Wrap,WrapItem,Avatar} from '@chakra-ui/react'
import Styles from "./MainContent.module.css"
import { SearchIcon } from '@chakra-ui/icons'
import {gql,useQuery} from "@apollo/client"
import Loading from '../components/Loading'
import MusicPlayer from './MusicPlayer'
import { debounce } from 'lodash';
import ColorThief from 'colorthief';



const GET_SONGS = gql`
query Query($playlistId: Int!, $search: String) {
  getSongs(playlistId: $playlistId, search: $search) {
    _id
    artist
    duration
    photo
    title
    url
  }
}
`;

const ForYou = ({playlistId}) => {
  const[activeIndex,SetactiveIndex] = React.useState(0)
  const [searchTerm, setSearchTerm] = React.useState(''); 
  const[Index,setIndex]  = React.useState(0)
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  const [backgroundGradient, setBackgroundGradient] = React.useState("linear-gradient(160deg, rgba(34,3,2,1) 8%, rgba(1,0,2,1) 90%)");
  

  const [Player,setPlayer] = React.useState({
    "_id": "61b6f14dc2f7cafd968c3207",
    "artist": "Andy Willams",
    "duration": 410,
    "photo": "https://i.scdn.co/image/ab67616d0000b273dd8408b50f45c66139f44ce2",
    "title": "Ain't Gonna Grieve",
    "url": "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3"
  })
  
  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: { playlistId : 3,search:searchTerm},
  });

  React.useEffect(()=>{

    async function Delay(){
      try {
        const colorThief = new ColorThief();
        const img = new Image();
        img.src = data?.getSongs[currentSongIndex].photo;
        img.setAttribute('crossOrigin', '');
        img.addEventListener('load', () => {
          const color = colorThief.getColor(img);
          setBackgroundGradient(`linear-gradient(160deg , rgb(${color.join(',')}) 8%, rgba(1,0,2,1) 90%)`);
        });

         if (loading) return <Loading />;
      } catch (error) {
        if (error) return <p>Error: {error.message}</p>;
      }
    }
    
    Delay()
    
  },[currentSongIndex, data?.getSongs])

  
  function handleClick(el,index){
    SetactiveIndex(index)
     setPlayer(el)
     setIndex(index)
     setCurrentSongIndex(index)
  }

  let debounced = debounce((value)=>{
     setSearchTerm(value)
  },1000)

  const handleSearch = (e) => {
    let value = e.target.value;
    debounced(value)
  };
   
 function handleCallback(i){
    SetactiveIndex(i)
    setCurrentSongIndex(i)
 }

 
 if (loading) return <Loading />;
 if (error) return <p>Error: {error.message}</p>;
 return (
  <Box color={"white"} width={{base:'100%',sm:"",md:"",lg:""}} background={backgroundGradient} backgroundSize="cover"> 
    <Flex >
    <SimpleSidebar />
    <Flex w={"100%"} direction={{base:"column-reverse",lg:'row'}} px={{base:"0",sm:"",md:"",lg:"1rem"}} justifyContent={"space-between"}>

    <Box w={{base:"85%",sm:"90%",md:"",lg:"45%"}} padding={{base:"0px",sm:"",md:"",lg:"20px"}} mt={{base:"50px",sm:"",md:"",lg:""}} >
       <Box display={{base:"none",lg:"block"}} mb="30px">
        <Text className={Styles.head}>Favourites</Text>
       
       {/* Search Bar */}
       <InputGroup mt={8} className={Styles.inp}>
        <Input border={"none"} backgroundColor={"rgba(255, 255, 255, 0.08)"}  onChange={(e)=>handleSearch(e)}  w={"550px"} borderRadius={0} placeholder='Search Song, Artist' />
        <InputRightElement w={"4.5rem"} children={<SearchIcon boxSize={5}  mt={2} opacity={"0.2"} />} />
       </InputGroup>
       </Box>

       {/* mapping of the songs */}
       
       { data.getSongs ?.map((el,i)=>(
        <Box key={el._id} className={Styles.ListItem} w={"100%"} onClick={()=>handleClick(el,i)} bg={i === activeIndex ? 'rgba(255, 255, 255, 0.08)' : ''} p={{base:"14px 14px 14px 5px",lg:'16px'}}>
          <Flex  justifyContent={"space-between"}>
            <Box>
              <Flex justifyContent={"space-between"} gap={{base:"10px",sm:"",md:"",lg:"20px"}}>
                <Box>
                   <Wrap>
                      <WrapItem>
                        <Avatar size={{base:"md",sm:"",md:"",lg:"lg"}} name={el.title} src={el.photo} />
                      </WrapItem>
               `    </Wrap>
                </Box>
               {/* Name and Playlist */}
                <Box>
                  <Text fontSize={{base:"16px",sm:"",md:"",lg:"18px"}}>{el.title}</Text>
                  <Text fontSize={{base:"12px",sm:"",md:"",lg:"15px"}} opacity={0.4}>{el.artist}</Text>
                </Box>
              </Flex>
            </Box>

            <Box mt="10px" >
               <Text fontSize={{base:"12px",sm:"",md:"",lg:"16px"}}>{(el.duration/60).toFixed(2)}</Text>
            </Box>
          </Flex>
          </Box>
       ))}

    </Box>
      {/* colortheif ka use krke index match karana hai , get the color and in callback send the color to parent */}
       {/* music player */}
    <Box width={{base:"80%",sm:"80%",md:"50%",lg:"50%"}} >
         <MusicPlayer playlist={Player} data={data.getSongs} index={Index} onChange={handleCallback} />
    </Box>
    </Flex>
    </Flex>
  </Box>
)
}

export default ForYou