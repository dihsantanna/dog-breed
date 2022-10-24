export const breeds = {
  chihuahua: {
    breed: 'chihuahua',
    message: [
      'https://images.dog.ceo/breeds/chihuahua/n02085620_10074.jpg',
      'https://images.dog.ceo/breeds/chihuahua/n02085620_10131.jpg',
      'https://images.dog.ceo/breeds/chihuahua/n02085620_10621.jpg',
      'https://images.dog.ceo/breeds/chihuahua/n02085620_1073.jpg',
      'https://images.dog.ceo/breeds/chihuahua/n02085620_10976.jpg',
      'https://images.dog.ceo/breeds/chihuahua/n02085620_11140.jpg',
      'https://images.dog.ceo/breeds/chihuahua/n02085620_11238.jpg',
      'https://images.dog.ceo/breeds/chihuahua/n02085620_11258.jpg',
      'https://images.dog.ceo/breeds/chihuahua/n02085620_11337.jpg',
      'https://images.dog.ceo/breeds/chihuahua/n02085620_11477.jpg',
    ],
  },
  pug: {
    breed: 'pug',
    message: [
      'https://images.dog.ceo/breeds/pug/IMG_0226.jpg',
      'https://images.dog.ceo/breeds/pug/IMG_0233.jpg',
      'https://images.dog.ceo/breeds/pug/IMG_3507.jpg',
      'https://images.dog.ceo/breeds/pug/RoxyCruising.jpg',
      'https://images.dog.ceo/breeds/pug/Suki.jpg',
      'https://images.dog.ceo/breeds/pug/brody-rufferee.jpg',
      'https://images.dog.ceo/breeds/pug/c677d2fa5324.jpg',
      'https://images.dog.ceo/breeds/pug/n02110958_10.jpg',
      'https://images.dog.ceo/breeds/pug/n02110958_10186.jpg',
      'https://images.dog.ceo/breeds/pug/n02110958_10193.jpg',

    ],
  },
  husky: {
    breed: 'husky',
    message: [
      'https://images.dog.ceo/breeds/husky/20180901_150234.jpg',
      'https://images.dog.ceo/breeds/husky/20180904_185604.jpg',
      'https://images.dog.ceo/breeds/husky/20180924_193829.jpg',
      'https://images.dog.ceo/breeds/husky/MsMilo_Husky1.jpg',
      'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg',
      'https://images.dog.ceo/breeds/husky/n02110185_10116.jpg',
      'https://images.dog.ceo/breeds/husky/n02110185_10171.jpg',
      'https://images.dog.ceo/breeds/husky/n02110185_10175.jpg',
      'https://images.dog.ceo/breeds/husky/n02110185_10273.jpg',
      'https://images.dog.ceo/breeds/husky/n02110185_10360.jpg',
    ],
  },
  labrador: {
    breed: 'labrador',
    message: [
      'https://images.dog.ceo/breeds/labrador/IMG_4708.jpg',
      'https://images.dog.ceo/breeds/labrador/IMG_4709.jpg',
      'https://images.dog.ceo/breeds/labrador/IMG_6236.JPG',
      'https://images.dog.ceo/breeds/labrador/JessieIncognito.jpg',
      'https://images.dog.ceo/breeds/labrador/Lucy.jpg',
      'https://images.dog.ceo/breeds/labrador/Luke.jpg',
      'https://images.dog.ceo/breeds/labrador/n02099712_1150.jpg',
      'https://images.dog.ceo/breeds/labrador/n02099712_1200.jpg',
      'https://images.dog.ceo/breeds/labrador/n02099712_1229.jpg',
      'https://images.dog.ceo/breeds/labrador/n02099712_1254.jpg',
    ],
  },
};

export type BreedType = keyof typeof breeds;
