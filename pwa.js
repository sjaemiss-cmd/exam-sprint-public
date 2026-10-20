(()=>{
 const status=document.getElementById('offline-status'),install=document.getElementById('install-app'),update=document.getElementById('update-app');
 let prompt=null,ready=false,registration=null,reloading=false;
 const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 function connection(){status.textContent=ready?(navigator.onLine?'● 오프라인 준비 완료':'● 오프라인 학습 중'):(navigator.onLine?'학습자료를 기기에 저장 중…':'첫 접속은 인터넷 연결이 필요해요');status.classList.toggle('ready',ready)}
 function installation(){install.textContent=standalone()?'앱으로 실행 중':prompt?'앱 설치':'홈 화면에 설치';install.disabled=standalone()}
 addEventListener('beforeinstallprompt',e=>{e.preventDefault();prompt=e;installation()});
 addEventListener('appinstalled',()=>{prompt=null;installation()});
 install.onclick=async()=>{if(prompt){await prompt.prompt();await prompt.userChoice;prompt=null;installation()}else document.getElementById('install-help').showModal()};
 document.getElementById('backup-progress').onclick=()=>document.getElementById('export').click();
 document.getElementById('restore-progress').onclick=()=>document.getElementById('import').click();
 addEventListener('online',connection);addEventListener('offline',connection);installation();connection();
 update.onclick=()=>{if(registration?.waiting){registration.waiting.postMessage({type:'ACTIVATE_UPDATE'})}};
 if('serviceWorker' in navigator){
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloading)return;if(update.dataset.pending==='1'){reloading=true;location.reload()}else{ready=true;connection()}});
  navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(async reg=>{registration=reg;const showUpdate=()=>{update.hidden=false;update.dataset.pending='1'};if(reg.waiting)showUpdate();reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)showUpdate()})});reg.update().catch(()=>{});await navigator.serviceWorker.ready;ready=true;connection()}).catch(()=>{status.textContent='오프라인 저장 실패 · 온라인 학습은 가능합니다'});
 }else status.textContent='이 브라우저는 온라인으로 이용하세요';
})();
