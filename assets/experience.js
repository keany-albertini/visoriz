(()=>{'use strict';
const root=document.querySelector('[data-vx-studio]');if(!root)return;
const catalog={
fleuriste:{brand:'Maison Flora',label:'ATELIER FLORAL',title:'Des fleurs pour vos instants précieux.',desc:'Mariages, événements et créations florales sur mesure.',image:'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=1000&q=85',demo:'demos/fleuriste.html',alt:'Décoration florale romantique'},
boulangerie:{brand:'Le Fournil Doré',label:'BOULANGERIE ARTISANALE',title:'Le goût des bonnes choses.',desc:'Du pain frais, des recettes artisanales et beaucoup de passion.',image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=85',demo:'demos/boulangerie.html',alt:'Pains artisanaux'},
coiffure:{brand:'Atelier N°7',label:'COIFFURE & STYLE',title:'Un style qui vous ressemble.',desc:'Coupe, précision et expérience dans un salon singulier.',image:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1000&q=85',demo:'demos/coiffure.html',alt:'Intérieur de salon de coiffure'},
artisan:{brand:'Atelier Beaumont',label:'ARTISAN & SAVOIR-FAIRE',title:'Le détail fait la différence.',desc:'Des réalisations uniques, pensées pour durer.',image:'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1000&q=85',demo:'demos/artisan.html',alt:'Atelier et outils artisanaux'}
};
const offers={essentiel:{name:'Essentiel',price:79,offer:'Essentiel — 79 €'},business:{name:'Business',price:149,offer:'Business — 149 €'},reservation:{name:'Réservation',price:199,offer:'Réservation — 199 €'}};
const state={sector:'fleuriste',theme:'refined',goal:'business'};
const setText=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
const image=document.getElementById('vx-photo'),site=document.getElementById('vx-site'),demo=document.getElementById('vx-demo');
const render=()=>{
const data=catalog[state.sector],offer=offers[state.goal];
setText('vx-brand',data.brand);setText('vx-category',data.label);setText('vx-title',data.title);setText('vx-description',data.desc);setText('vx-price',offer.price+' €');setText('vx-offer',offer.name);setText('vx-preview-sector',data.brand);
site.classList.toggle('theme-bold',state.theme==='bold');site.classList.toggle('theme-warm',state.theme==='warm');
if(image.dataset.sector!==state.sector){image.classList.add('vx-fade');image.src=data.image;image.alt=data.alt;image.dataset.sector=state.sector;image.onload=()=>image.classList.remove('vx-fade');image.onerror=()=>image.classList.remove('vx-fade')}
demo.href=data.demo;
root.querySelectorAll('[data-vx-option]').forEach(btn=>btn.setAttribute('aria-pressed',String(state[btn.dataset.vxGroup]===btn.dataset.vxOption)));
};
root.querySelectorAll('[data-vx-option]').forEach(btn=>btn.addEventListener('click',()=>{state[btn.dataset.vxGroup]=btn.dataset.vxOption;render()}));
document.getElementById('vx-request')?.addEventListener('click',()=>{
const data=catalog[state.sector],offer=offers[state.goal];
const select=document.getElementById('offer');if(select)select.value=offer.offer;
const message=document.getElementById('message');if(message){const style={refined:'élégant et épuré',bold:'moderne et affirmé',warm:'chaleureux et naturel'}[state.theme];message.value='Bonjour, je souhaite créer un site pour mon activité ('+data.label.toLowerCase()+'). J\'aime le style '+style+' du configurateur. Je souhaite discuter de la formule '+offer.name+' ('+offer.price+' € de création, hors frais complémentaires).';}
document.getElementById('contact')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
setTimeout(()=>document.getElementById('name')?.focus({preventScroll:true}),500);
});
render();

// Mobile showcase: interactive, keyboard-accessible, and with working demo links.
const heroSlides=[
{category:'01 / FLEURISTE & ÉVÉNEMENTIEL',name:'Maison Flora',image:'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=900&q=85',alt:'Composition florale, aperçu du modèle Maison Flora',url:'demos/fleuriste.html'},
{category:'02 / BOULANGERIE ARTISANALE',name:'Le Fournil Doré',image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=85',alt:'Pains artisanaux, aperçu du modèle Le Fournil Doré',url:'demos/boulangerie.html'},
{category:'03 / ARTISAN & SAVOIR-FAIRE',name:'Atelier Beaumont',image:'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=900&q=85',alt:'Atelier de menuiserie, aperçu du modèle Atelier Beaumont',url:'demos/artisan.html'}
];
let heroIndex=0;
const heroImg=document.getElementById('vx-hero-img');
const heroLink=document.getElementById('vx-hero-link');
function updateHero(delta){
if(!heroImg||!heroLink)return;
heroIndex=(heroIndex+delta+heroSlides.length)%heroSlides.length;
const slide=heroSlides[heroIndex];
heroImg.classList.add('vx-swapping');
heroImg.src=slide.image;heroImg.alt=slide.alt;
heroImg.onload=()=>heroImg.classList.remove('vx-swapping');
heroImg.onerror=()=>heroImg.classList.remove('vx-swapping');
heroLink.href=slide.url;heroLink.setAttribute('aria-label','Explorer le modèle '+slide.name);
setText('vx-hero-category',slide.category);setText('vx-hero-name',slide.name);
setText('vx-hero-counter',String(heroIndex+1).padStart(2,'0')+' / 03');
}
document.getElementById('vx-hero-prev')?.addEventListener('click',()=>updateHero(-1));
document.getElementById('vx-hero-next')?.addEventListener('click',()=>updateHero(1));

const progress=document.createElement('div');progress.className='vx-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const header=document.querySelector('.header');
let queued=false;
const onScroll=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';header?.classList.toggle('is-scrolled',scrollY>12);queued=false})};
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
const elements=document.querySelectorAll('.vx-studio-head,.vx-studio-grid,.section-head,.project,.visual-intro,.visual-tile');
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}})},{threshold:.07,rootMargin:'0px 0px 35px 0px'});
elements.forEach(el=>{el.classList.add('vx-reveal');observer.observe(el)});
}
})();