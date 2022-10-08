import Image from "next/image";
import PaimonImg from "../../../public/paimon.png";
import { Stack} from '@mui/material';
import styles from './Paimon.module.css';

export const Paimon = () => {
  return (
    <>
      <div className='paimon'>
        <Stack className={styles.nxPaimon} >
            <Image src={PaimonImg} alt='Paimon'/>
        </Stack>
      </div>
      <style jsx>
        {`
                @keyframes float {
                    0% {
        
                        transform: translatey(0px);
                    }
                    50% {
                
                        transform: translatey(-30px);
                    }
                    100% {
                    
                        transform: translatey(0px);
                    }
                }
                .paimon {
                    position: absolute;
                    left: -9%;
                    top: -14%;
                    z-index: 1;
                    transform: translatey(0px);
                    animation: float 3s ease-in-out infinite;
                }
                `}
      </style>
    </>
  );
};
