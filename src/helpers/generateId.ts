const generateId = (): string => {
    return Math.random().toString(36).substring(2, 10) + Date.now();
  };
  
  export default generateId;
  