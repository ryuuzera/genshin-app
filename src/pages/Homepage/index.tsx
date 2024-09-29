/* eslint-disable */
import { Avatar, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import bg from '../../../public/galaxy_background.jpg';
import { Char } from '../../@types/Char';
import { api } from '../../api/axios';
import { CharRarity } from '../../components/CharRarity';
import { Paimon } from '../../components/Paimon';
import { WeaponIcon } from '../../components/WeaponIcon';
import styles from './Homepage.module.css';

const HomePage = () => {
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

  const [avatar, setAvatar] = useState(new Array<JSX.Element>());
  const [character, setCharacter] = useState('albedo');
  const [characterImg, setCharacterImg] = useState('');
  const [characterObj, setCharacterObj] = useState({} as Char);

  useEffect(() => {
   
    setCharacterImg(`https://genshin.jmp.blue/characters/${character}/portrait.png`);
    api.get(`/characters/${character}`).then((response) => {
      setCharacterObj(response.data);
    });

    api
      .get('/characters')
      .then((response) => {
        const charArray = new Array<any>();
        let link;
        response.data.map((element: never) => {
          link = `https://genshin.jmp.blue/characters/${element}/icon.png`;
          if (
            !(
              ['traveler-dendro', 'ayato', 'collei', 'kuki-shinobu', 'shikanoin-heizou', 'tighnari', 'aloy'].indexOf(
                element
              ) >= 0
            )
          ) {
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
    setCharacterImg(`https://genshin.jmp.blue/characters/${character}/portrait.png`);
    api.get(`/characters/${character}`).then((response) => {
      setCharacterObj(response.data);
    });
  }, [character]);

  return (
    <>
      <div className='background'></div>
      <style jsx>
        {`
          .background {
            width: 100vw;
            height: 100vh;
            z-index: 1;
            border: none;
            background-image: url('${bg.src}');
            background-repeat: no-repeat;
            background-size: cover;
            filter: blur(1.5px);
            min-width: 900px;
          }
        `}
      </style>
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
                <Typography variant='h2' sx={{ marginTop: '1rem', marginLeft: '1rem', fontSize: '2.4rem' }}>
                  {`${characterObj.name}`}
                </Typography>
                <Typography variant='h4' sx={{ marginLeft: '1rem', marginTop: '15px', fontWeight: '300' }}>
                  <span className={styles.charElement}>
                    {characterObj ? `${characterObj.vision}` : ''}{' '}
                    <img
                      src={`https://genshin.jmp.blue/elements/${
                        characterObj.vision ? characterObj.vision.toLowerCase() : 'geo'
                      }/icon.png`}
                    />
                  </span>
                </Typography>
                <Typography variant='h4' sx={{ marginLeft: '1rem', marginTop: '25px', fontWeight: '300' }}>
                  <CharRarity charObj={characterObj} />
                </Typography>
              </Stack>
              <Stack className={styles.infoOneRight}>
                <Typography variant='h3' sx={{ marginTop: '1rem', marginRight: '1rem', fontWeight: '300' }}>
                  {`${characterObj.nation}`}
                </Typography>
                <Typography variant='h4' sx={{ marginRight: '1rem', fontWeight: '300' }}>
                  <span className={styles.charWeapon}>
                    <WeaponIcon objChar={characterObj} />
                    {characterObj ? `${characterObj.weapon}` : ''}{' '}
                  </span>
                </Typography>
                <Typography variant='h4' sx={{ marginRight: '1rem', fontWeight: '300' }}>
                  {`${characterObj.affiliation}`}
                </Typography>
              </Stack>
            </Stack>
            <Stack className={styles.characterInfo2}>
              <Stack className={styles.infoOneLeft}>
                <span className={styles.charDesc}>
                  <Typography sx={{ fontSize: '1.3rem', fontWeight: '300' }}>
                    {`${characterObj.description}`}
                  </Typography>
                </span>
              </Stack>
              <Stack className={styles.infoOneRight}></Stack>
            </Stack>
            <Stack className={styles.characterInfo3}>
              <Stack className={styles.characterInfoOneLeft}>
                <span className={styles.talentSkill}>
                  <img src={`https://genshin.jmp.blue/characters/${character}/talent-na`} />
                  <Typography variant='h1' sx={{ fontSize: '1.3rem', fontWeight: '300', marginLeft: '8px' }}>
                    {characterObj.skillTalents ? `${characterObj.skillTalents[0].name}` : ''}{' '}
                  </Typography>
                </span>
                <span className={styles.talentSkill}>
                  <img src={`https://genshin.jmp.blue/characters/${character}/talent-skill`} />
                  <Typography variant='h1' sx={{ fontSize: '1.3rem', fontWeight: '300', marginLeft: '8px' }}>
                    {characterObj.skillTalents ? `${characterObj.skillTalents[1].name}` : ''}{' '}
                  </Typography>
                </span>
                <span className={styles.talentSkill}>
                  <img
                    src={`https://genshin.jmp.blue/characters/${character}/${
                      character === 'diluc' ? 'talent_burst' : 'talent-burst'
                    }`}
                  />
                  <Typography variant='h1' sx={{ fontSize: '1.3rem', fontWeight: '300', marginLeft: '8px' }}>
                    {characterObj.skillTalents ? `${characterObj.skillTalents[2].name}` : ''}{' '}
                  </Typography>
                </span>
              </Stack>
            </Stack>
          </Stack>
          <Stack className={styles.Footer}>
            {
              //@ts-ignore
              <a href='https://github.com/ryuuzera' alt='gitHub' target='_blank'>
                Fagner Menezes ☕
              </a>
            }
          </Stack>
          {
            <iframe
              width='0'
              height='0'
              src='https://www.youtube.com/embed/ghaz6x9Q-_4?autoplay=1&loop=1'
              //@ts-ignore
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen
            ></iframe>
          }
        </Stack>
      </Stack>
    </>
  );
};

export default HomePage;
