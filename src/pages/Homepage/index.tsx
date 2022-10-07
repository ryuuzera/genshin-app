import styles from './Homepage.module.css';
import { Stack, Avatar, CircularProgress} from '@mui/material';
import { api } from '../../api/axios';
import { useEffect,useState} from 'react';
import Sound from 'react-sound';
import { Paimon } from '../../components/Paimon'

export const HomePage = () => {
    

    const AsyncImage = (props: any) => {
        const [loadedSrc, setLoadedSrc] = useState(null);
        useEffect(() => {
            setLoadedSrc(null);
            if (props.src) {
                const handleLoad = () => {
                  setLoadedSrc(props.src);
              };
              const image = new Image();
              image.addEventListener('load', handleLoad);
                image.src = props.src;
              return () => {
                    image.removeEventListener('load', handleLoad);
              };
          }
      }, [props.src]);
        if (loadedSrc === props.src) {
          return (
              <img {...props} />
          );
      }else { 
        return (<CircularProgress size={'10rem'} sx={{position: 'absolute',
        left: '42%',
        top: '38%',
        }} />);
      }
  };

    const [avatar, setAvatar] = useState([] as any);
    const [character, setCharacter] = useState('albedo');
    const [characterImg, setCharacterImg] = useState('')

    useEffect(() => {
        api.get('/characters').then((response) => {
            const charArray = new Array<any>
            let link = ''
            response.data.map((element: never) => { 
                link = `https://api.genshin.dev/characters/${element}/icon.png`;
                if (!(['ayato', 'collei', 'kuki-shinobu', 'shikanoin-heizou', 'tighnari'].indexOf(element) >= 0)){
                charArray.push(
                <div className={styles.charMenu} id={element} onClick={() => {setCharacter(element)}}>
                    <Avatar sx={{ background: 'rgba(150,150,150,0.2)', border:'1px solid rgba(250,250,250,0.4)',  margin: '5px 10px 5px 10px', width: 64, height: 64 }} alt={`${(element as string)}`}  src={link} />

                    <p>{`${(element as string).replace('-', '\xa0').replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}`}</p>

                </div>)}
                setAvatar(charArray)
            }) 
        }).catch(err => {
            console.log(err)
        })
    },[]
    )

    useEffect(() => {
        api.get(`/characters/${character}`).then((response) => {
            
        })
    }, [character])

    useEffect(() => {
        setCharacterImg(`https://api.genshin.dev/characters/${character}/portrait.png`)
        console.log(characterImg)
    }, [character])


    return (
        <>
        <Sound 
        url={'genshin-theme.mp3'}
        playbackRate={1}
        playStatus={'PLAYING'}
        loop={true}
        autoLoad={true}
        volume={50}
        />
        <Stack className={styles.background}></Stack>
            <Stack className={styles.container}>
                <Paimon />
                <Stack className={styles.leftMenu}>
                    {avatar}
                </Stack>
                <Stack className={styles.characterContainer}>
                    <Stack className={styles.characterCard}>
                         <AsyncImage src={characterImg}/> 
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}