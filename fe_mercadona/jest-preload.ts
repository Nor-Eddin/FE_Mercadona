const nodeSpy = require('spy-fs').spy([
    process.cwd() + '/src',
  ]);
  

  
  global.importMetaResolve = (specifier) => {
    const currentModuleUrl = new URL(process.cwd() + '/src/jest-preload.js').href;
    const importUrl = new URL(specifier, `file://${currentModuleUrl}`).href;
  
    let res;
    try {
      res = require(importUrl);
    } catch (e) {
      console.log('Error importing', importUrl, e);
      throw e;
    }
  
    return {
      url: importUrl,
      export: () => res,
    };
  };
  
  