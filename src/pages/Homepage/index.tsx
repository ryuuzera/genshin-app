/* eslint-disable */
import { Avatar, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import Sound from 'react-sound';
import { api } from '../../api/axios';
import { Paimon } from '../../components/Paimon';
import styles from './Homepage.module.css';
import { CharRarity } from '../../components/CharRarity';

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
      return <img {...props} />;
    } else {
      return (
        <>
          <Stack className={styles.Progress}>
            <Stack className={styles.CircularProgress}>
              <CircularProgress size={'10rem'} sx={{ color: '#640cf3' }} />
            </Stack>
          </Stack>
        </>
      );
    }
  };

  const [avatar, setAvatar] = useState([] as any);
  const [character, setCharacter] = useState('albedo');
  const [characterImg, setCharacterImg] = useState('');
  const [characterObj, setCharacterObj] = useState({});

  useEffect(() => {
    setCharacterImg(`https://api.genshin.dev/characters/${character}/portrait.png`);
    api.get(`/characters/${character}`).then((response) => {
      setCharacterObj(response.data);
      console.log(response.data);
    });

    api
      .get('/characters')
      .then((response) => {
        const charArray = new Array<any>();
        let link = '';
        response.data.map((element: never) => {
          link = `https://api.genshin.dev/characters/${element}/icon.png`;
          if (!(['ayato', 'collei', 'kuki-shinobu', 'shikanoin-heizou', 'tighnari'].indexOf(element) >= 0)) {
            charArray.push(
              <div
                className={styles.charMenu}
                id={element}
                onClick={() => {
                  setCharacter(element);
                }}
              >
                <Avatar
                  sx={{
                    background: 'rgba(150,150,150,0.2)',
                    border: '1px solid rgba(250,250,250,0.4)',
                    margin: '5px 10px 5px 10px',
                    width: 64,
                    height: 64,
                  }}
                  alt={`${element as string}`}
                  src={link}
                />

                <p>{`${(element as string)
                  .replace('-', '\xa0')
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, function (str) {
                    return str.toUpperCase();
                  })}`}</p>
              </div>
            );
          }
          setAvatar(charArray);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setCharacterImg(`https://api.genshin.dev/characters/${character}/portrait.png`);
    api.get(`/characters/${character}`).then((response) => {
      setCharacterObj(response.data);
      console.log(response.data);
    });
  }, [character]);

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
      <Stack className={styles.imageChar}>
        <AsyncImage src={characterImg} className={styles.imgCharinside} />
      </Stack>
      W
      <Stack className={styles.container}>
        <Paimon />
        <Stack className={styles.leftMenu}>{avatar}</Stack>
        <Stack className={styles.characterContainer}>
          <Stack className={styles.characterCard}>
            <Stack className={styles.characterInfo}>
              <Stack className={styles.infoOneLeft}>
                <Typography variant='h3' sx={{ marginTop: '1rem', marginLeft: '1rem' }}>
                  {`${characterObj.name}`}
                </Typography>
                <Typography variant='h4' sx={{ marginLeft: '1rem', marginTop: '15px' }}>
                  <span className={styles.charElement}>
                    {characterObj ? `${characterObj.vision}` : ''}{' '}
                    <img
                      src={`https://api.genshin.dev/elements/${
                        characterObj.vision ? characterObj.vision.toLowerCase() : 'geo'
                      }/icon.png`}
                    />
                  </span>
                </Typography>
                <Typography variant='h4' sx={{ marginLeft: '1rem', marginTop: '25px' }}>
                  <CharRarity charObj={characterObj} />
                </Typography>
              </Stack>
              <Stack className={styles.infoOneRight}>
                <Typography variant='h3' sx={{ marginTop: '1rem', marginRight: '1rem' }}>
                {`${characterObj.nation}`}
                </Typography>
                <Typography variant='h4' sx={{ marginRight: '1rem' }}>
                {`${characterObj.weapon}`}
                </Typography>
                <Typography variant='h4' sx={{ marginRight: '1rem' }}>
                {`${characterObj.affiliation}`}
                </Typography>
              </Stack>
            </Stack>
            <Stack className={styles.characterInfo2}></Stack>
            <Stack className={styles.characterInfo3}></Stack>
          </Stack>
          <Stack className={styles.Footer}>
            <p>Fagner Menezes ☕</p>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
