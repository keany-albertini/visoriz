(() => {
  const burger=document.getElementById('burger');
  const menu=document.getElementById('mobile-nav');
  const close=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.textContent='☰'};
  burger?.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',String(open));
    burger.textContent=open?'✕':'☰';
  });
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  const filters=[...document.querySelectorAll('.filter')];
  const projects=[...document.querySelectorAll('.project')];
  filters.forEach(button=>button.addEventListener('click',()=>{
    const selected=button.dataset.filter;
    filters.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
    projects.forEach(card=>{card.dataset.filtered=String(selected!=='all'&&card.dataset.category!==selected)});
  }));
  const offer=document.getElementById('offer');
  document.querySelectorAll('[data-offer]').forEach(link=>link.addEventListener('click',()=>{if(offer)offer.value=link.dataset.offer}));
  let currentMessage='';
  const form=document.getElementById('contact-form');
  const feedback=document.getElementById('form-feedback');
  const copy=document.getElementById('copy-btn');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(form);
    currentMessage='Bonjour Visoriz,\\n\\n'+
      'Nom : '+data.get('name')+'\\n'+
      'Email : '+data.get('email')+'\\n'+
      'Formule : '+data.get('offer')+'\\n\\n'+
      'Mon projet :\\n'+data.get('message');
    feedback.textContent="Votre demande est prête. Elle n'a pas été envoyée : copiez-la pour la conserver ou la transmettre lorsque notre contact sera activé.";
    copy.classList.add('visible');
  });
  copy?.addEventListener('click',async()=>{
    if(!currentMessage)return;
    try{
      if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(currentMessage);
      feedback.textContent='Message copié dans le presse-papiers. Aucune donnée n’a été envoyée.';
    }catch{
      const box=document.createElement('textarea');
      box.value=currentMessage;box.style.width='100%';box.rows=7;
      box.setAttribute('aria-label','Votre demande à copier');
      copy.replaceWith(box);box.select();box.focus();
      feedback.textContent='Sélectionnez puis copiez ce texte. Aucune donnée n’a été envoyée.';
    }
  });
})();