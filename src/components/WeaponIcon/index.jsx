/* eslint-disable @next/next/no-img-element */
export const WeaponIcon = (props) => {
  let weaponName;
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
      {// eslint-disable-next-line jsx-a11y/alt-text
      <img src={`https://genshin.jmp.blue/weapons/${weaponName}/icon.png`} />}
    </>
  );
};
