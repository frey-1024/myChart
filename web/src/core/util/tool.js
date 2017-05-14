const tool ={
    isUndefined:(value)=>typeof value === 'undefined',
    isDefined:(value)=>typeof value !== 'undefined',
    isString:(value)=>typeof value === 'string',
    isArray:(value)=>Object.prototype.toString.call(value)=='[object Array]'
};

export default tool;