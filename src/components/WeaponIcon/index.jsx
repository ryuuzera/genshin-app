export const WeaponIcon = (props) => {
  let weaponName;
  console.log(props.objChar);
  switch (props.objChar.weapon) {
    case 'Claymore':
      weaponName = 'favonius-greatsword';
      break;
    case 'Sword':
      weaponName = 'favonius-sword';
      break;
    case 'Bow':
      weaponName = 'favonius-warbow';
      break;
    case 'Polearm':
      weaponName = 'favonius-lance';
      break;
    case 'Catalyst':
      weaponName = 'favonius-codex';
      break;
  }

  return (
    <>
      <img src={`https://api.genshin.dev/weapons/${weaponName}/icon.png`} />
    </>
  );
};
