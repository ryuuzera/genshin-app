import { AiFillStar } from 'react-icons/ai';
import styles from './CharRarity.module.css'

export const CharRarity = (props) => {
  const Star = [];

  if (props.charObj.rarity) {
    for (let i = 0; i < props.charObj.rarity; i++) {
      Star.push(<AiFillStar className={styles.Star} />);
    }
  }
  else {
    for (let i = 0; i < 4; i++) {
      Star.push(<AiFillStar className={styles.Star} />);
    }  
  }
  return <>{Star}</>;
};
