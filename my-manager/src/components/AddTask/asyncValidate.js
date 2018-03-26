const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//simulate server validation
const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => { 
   //task validation
  });
};

export default asyncValidate;
