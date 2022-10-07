import styles from './Homepage.module.css';
import { Stack, Button, Avatar} from '@mui/material';
import { api } from '../../api/axios';
import { useEffect,useState} from 'react';


export const HomePage = () => {

    const [avatar, setAvatar] = useState([] as any);
    const [character, setCharacter] = useState('');

    const characterMenus = useEffect(() => {
        api.get('/characters').then((response) => {
            const charArray = new Array<any>
            let link = ''
            response.data.map((element: never) => { 
                link = `https://api.genshin.dev/characters/${element}/icon.png`;
                charArray.push(
                <div className={styles.charMenu} id={element} onClick={() => {setCharacter(element)}}>
                    <Avatar sx={{ background: 'rgba(150,150,150,0.2)', border:'1px solid rgba(250,250,250,0.4)',  margin: '5px 10px 5px 10px', width: 64, height: 64 }} alt={`${(element as string)}`}  src={link} />

                    <p>{`${(element as string).replace('-', '\xa0').replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}`}</p>

                </div>)
                setAvatar(charArray)
            })
        }).catch(err => {
            console.log(err)
        })
    },[]
    )

    const selectChar = useEffect(() => {
        api.get(`/characters/${character}`).then((response) => {

        })
    }, [])


    return (
        <>
        <Stack className={styles.background}></Stack>
            <Stack className={styles.container}>
                <Stack className={styles.leftMenu}>
                    {avatar}
                </Stack>
                <Stack className={styles.characterContainer}>
                    <Stack className={styles.characterCard}>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}