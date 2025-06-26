const imageMap: { [key: string]: any } = {
    salon_one: require('../assets/images/salon_one.jpg'),
    salon_two: require('../assets/images/salon_two.jpg'),
    salon_three: require('../assets/images/salon_three.jpg'),
    salon_four: require('../assets/images/salon_four.jpg'),
    salon_five: require('../assets/images/salon_five.jpg'),
    salon_six: require('../assets/images/salon_six.jpg'),
    salon_seven: require('../assets/images/salon_seven.jpg'),
    salon_eight: require('../assets/images/salon_eight.jpg'),
    salon_nine: require('../assets/images/salon_nine.jpg'),
    salon_ten: require('../assets/images/salon_ten.jpg'),
    salon_eleven: require('../assets/images/salon_eleven.jpg'),
  };
  
  export const getSalonImage = (imageKey: string): any => {
    return imageMap[imageKey] ?? imageMap['salon_one'];
  };
  
  export default imageMap;
  