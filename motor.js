(() => {
  'use strict';
  function previewDocument(code,probe=''){
    const dom=new DOMParser().parseFromString(code,'text/html');
    const assetBase=new URL('./',location.href).href;
    for(const el of dom.querySelectorAll('link[href], script[src]')) {
      const attr=el.tagName==='LINK'?'href':'src';
      const url=el.getAttribute(attr);
      const match=url.match(/^https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.3\.8\/dist\/(?:css|js)\/(bootstrap\.min\.css|bootstrap\.bundle\.min\.js)$/);
      if(match){el.setAttribute(attr,new URL('assets/'+match[1],assetBase).href);el.removeAttribute('integrity');el.removeAttribute('crossorigin');}
    }
    const base=dom.createElement('base');base.href=assetBase;dom.head.prepend(base);
    const style=dom.createElement('style');style.textContent=':where(img,video){max-width:100%;height:auto}';dom.head.prepend(style);
    const csp=dom.createElement('meta');csp.httpEquiv='Content-Security-Policy';csp.content="object-src 'none'; form-action 'none'; frame-src 'none'";dom.head.prepend(csp);
    const links=dom.createElement('script');links.textContent="document.addEventListener('click', function(e){const a=e.target.closest?.('a[href^=\"#\"]');if(!a)return;let hash=a.getAttribute('href').slice(1);try{hash=decodeURIComponent(hash)}catch{}const target=document.getElementById(hash);if(target){e.preventDefault();target.scrollIntoView();}});";dom.body.append(links);
    if(probe){const script=dom.createElement('script');script.textContent=probe;dom.body.append(script);}
    return '<!doctype html>\n'+dom.documentElement.outerHTML;
  }
  function behaviorTest(l,code){
    return new Promise(resolve=>{
      const id=crypto.randomUUID();
      const frame=document.createElement('iframe'); frame.setAttribute('sandbox','allow-scripts allow-forms');frame.title='Comprobación del ejercicio';frame.setAttribute('aria-hidden','true');frame.tabIndex=-1;frame.style.cssText='position:fixed;left:-9999px;width:640px;height:350px;border:0';
      const stop=result=>{clearTimeout(timer);window.removeEventListener('message',receive);frame.remove();resolve({behavior:result});};
      const receive=e=>{if(e.source===frame.contentWindow&&e.data?.exerciseRun===id)stop(e.data.ok===true);};
      const timer=setTimeout(()=>stop(false),4500);
      window.addEventListener('message',receive);
      const test='window.addEventListener("load",()=>{let ok=false;try{ok=Boolean(('+l.probe.toString()+')());}catch{} parent.postMessage({exerciseRun:'+JSON.stringify(id)+',ok},"*");},{once:true});';
      frame.srcdoc=previewDocument(code,test);document.body.append(frame);
    });
  }
  window.EtiquetaMotor=Object.freeze({previewDocument,behaviorTest});
})();
