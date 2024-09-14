const loadScript = (src: string) => {
    return new Promise<void>((resolve, reject) => {
      // Check if the script is already in the document
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log(`Script loaded: ${src}`);
        resolve();
      };
      script.onerror = () => {
        console.error(`Failed to load script: ${src}`);
        reject(new Error(`Failed to load script: ${src}`));
      };
  
      document.body.appendChild(script);
    });
  };
  
  export default loadScript;
  