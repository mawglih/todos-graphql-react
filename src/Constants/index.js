export const formatDate = input => {
  const newDate = new Date(parseInt(input)).toLocaleDateString('en-US');
  // const newTime = new Date(parseInt(input)).toLocaleTimeString('en-US');
  return newDate;
}

export const WEB_LINKS = [
  {
    name: 'city',
    value: 'https://s3.amazonaws.com/photo-links/city.png',
  },
  {
    name: 'clouds',
    value: 'https://s3.amazonaws.com/photo-links/clouds.png',
  },
  {
    name: 'fall',
    value: 'https://s3.amazonaws.com/photo-links/fall.png',
  },
  {
    name: 'lake',
    value: 'https://s3.amazonaws.com/photo-links/lake.png',
  },
  {
    name: 'port',
    value: 'https://s3.amazonaws.com/photo-links/port.png',
  },
  {
    name: 'stone',
    value: 'https://s3.amazonaws.com/photo-links/stone.png',
  },
  {
    name: 'tree',
    value: 'https://s3.amazonaws.com/photo-links/sosna.png',
  },
];

export const CATEGORY = [
  'Cleaning',
  'Laundry',
  'Sport',
  'Leisure',
  'Health',
];

export default {};
