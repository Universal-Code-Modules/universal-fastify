require('dotenv').config();
const config = require('./config');
const math = require('@dip1059/safe-math-js');
// const { TEST, LOG_TIME } = process.env;


    const measureTime = (start, format = true) => {
        if (! LOG_API_CALL_TIME) return;
        const NS_PER_SEC = 1e9;
        const NUM_IN_MS = 1000000;
        if (start) {
          const diff = process.hrtime(start);
          const time = format ? 
          ((diff[0] ? diff[0] + ' sec, ' : '') + (diff[1]/NUM_IN_MS).toFixed(3) + 'ms') :
          parseFloat((diff[0] * 1000 + (diff[1] / NUM_IN_MS).toFixed(3)));
          return time;
        }
        return process.hrtime();
    }

    

    // const formatMilliseconds = (milliseconds) => {
    //     const ms = milliseconds % 1000;
    //     milliseconds = (milliseconds - ms) / 1000;
    // }
    

    const delay = (time) => {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }

    const random = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }

    const roughSizeOfObject = (value) => {
        const typeSizes = {
          "undefined": () => 0,
          "boolean": () => 4,
          "number": () => 8,
           "bigint": () => 8,
          "string": item => 2 * item.length,
          "object": item => !item ? 0 : Object
            .keys(item)
            .reduce((total, key) => ut.roughSizeOfObject(key) + ut.roughSizeOfObject(item[key]) + total, 0)
        };
        return typeSizes[typeof value](value)
    }
    
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    
    const humanFileSize = (bytes, si=false, dp=1) => {
        const thresh = si ? 1000 : 1024;
      
        if (Math.abs(bytes) < thresh) {
          return bytes + ' B';
        }
      
        const units = si 
          ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
          : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        const r = 10**dp;
      
        do {
          bytes /= thresh;
          ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
      
      
        return bytes.toFixed(dp) + ' ' + units[u];
    }

   

 const safeRequire = (modulePath) => { 
  try {
   return require(modulePath);
  }
  catch (e) {
   console.log('requireF(): The file "' + modulePath + '".js could not be loaded.');
   return false;
  }
}


    



module.exports = {measureTime, math, delay, random, roughSizeOfObject, formatBytes, 
                  humanFileSize, safeRequire };