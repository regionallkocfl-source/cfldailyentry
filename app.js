const PWA_BUILD = 'v25.09.17-B2';

const STORAGE_KEY = 'cfl_apps_script_exec_url_v1';
const setup = document.getElementById('setup');
const frameWrap = document.getElementById('frameWrap');
const frame = document.getElementById('appFrame');
const appUrlInput = document.getElementById('appUrl');
const setupMsg = document.getElementById('setupMsg');
const statusText = document.getElementById('statusText');
const offlineBar = document.getElementById('offlineBar');
let installPrompt = null;

function validUrl(value){
  try { const u = new URL(value); return u.protocol === 'https:' && /script\.google\.com$/.test(u.hostname) && /\/macros\/s\/.+\/exec/.test(u.pathname); }
  catch(e){ return false; }
}
function currentUrl(){ return localStorage.getItem(STORAGE_KEY) || ''; }
function loadApp(url){
  if(!validUrl(url)){ showSetup('Please paste a valid Apps Script /exec URL.'); return; }
  localStorage.setItem(STORAGE_KEY,url);
  setup.classList.add('hidden'); frameWrap.classList.remove('hidden');
  const sep = url.indexOf('?') === -1 ? '?' : '&';
  frame.src = url + sep + 'pwaBuild=' + encodeURIComponent(PWA_BUILD) + '&_=' + Date.now();
  statusText.textContent = (navigator.onLine ? 'Online' : 'Offline') + ' • ' + PWA_BUILD;
}
function showSetup(message){
  frameWrap.classList.add('hidden'); setup.classList.remove('hidden');
  appUrlInput.value = currentUrl();
  setupMsg.innerHTML = message ? '<div class="error">'+message+'</div>' : '';
}
document.getElementById('saveBtn').addEventListener('click',()=>{
  const v=appUrlInput.value.trim();
  if(!validUrl(v)){ setupMsg.innerHTML='<div class="error">URL must be the deployed Apps Script Web App URL ending in /exec.</div>'; return; }
  setupMsg.innerHTML='<div class="ok">Saved. Opening app…</div>'; loadApp(v);
});
document.getElementById('settingsBtn').addEventListener('click',()=>showSetup(''));
document.getElementById('refreshBtn').addEventListener('click',()=>{ const u=currentUrl(); if(u) loadApp(u); else showSetup(''); });
document.getElementById('openBtn').addEventListener('click',()=>{ const u=currentUrl(); if(u) window.open(u,'_blank','noopener'); else showSetup(''); });
window.addEventListener('online',()=>{statusText.textContent='Online • '+PWA_BUILD;offlineBar.classList.add('hidden')});
window.addEventListener('offline',()=>{statusText.textContent='Offline • '+PWA_BUILD;offlineBar.classList.remove('hidden')});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;document.getElementById('installBtn').classList.remove('hidden')});
document.getElementById('installBtn').addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;document.getElementById('installBtn').classList.add('hidden')});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.error));}
const qp=new URLSearchParams(location.search).get('app');
if(qp && validUrl(qp)){localStorage.setItem(STORAGE_KEY,qp);history.replaceState({},'',location.pathname);}
const saved=currentUrl(); if(saved) loadApp(saved); else showSetup('');
if(!navigator.onLine) offlineBar.classList.remove('hidden');
