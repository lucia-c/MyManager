const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//simulate server validation
const asyncValidate = (values) => {
  return sleep(1000).then(() => { 
    if (['progetto'].includes(values.name)) {
      throw new Error('That project name is taken');
    }
  });
};

export default asyncValidate;