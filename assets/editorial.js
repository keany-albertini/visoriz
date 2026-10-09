/* Visoriz — lightweight premium motion; respects reduced-motion preferences */
(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const hero=document.querySelector('.hero');
const arch=document.querySelector('.hero-arch');
const sectionTargets=document.querySelectorAll('.section-heading,.signature .container,.step,.plan,.faq-grid,.contact-grid,.hero-art');
if(!reduced.matches&&'IntersectionObserver'in window){
const observer=new IntersectionObserver(entries=>{
for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}
},{threshold:.06,rootMargin:'0px 0px 35px 0px'});
sectionTargets.forEach(el=>{el.classList.add('vx-reveal');observer.observe(el)});
}
const links=[...document.querySelectorAll('.desktop-nav a')];
if('IntersectionObserver'in window){
const sections=[...document.querySelectorAll('section[id]')];
const navObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{if(!entry.isIntersecting)return;links.forEach(link=>{const current=link.getAttribute('href')==='#'+entry.target.id;current?link.setAttribute('aria-current','location'):link.removeAttribute('aria-current')})});
},{rootMargin:'-25% 0px -65% 0px'});
sections.forEach(section=>navObserver.observe(section));
}
if(hero&&arch&&!reduced.matches){
let frame=0;
const update=()=>{frame=0;
const rect=hero.getBoundingClientRect();
if(rect.bottom<0||rect.top>innerHeight)return;
const shift=Math.max(-35,Math.min(35,(-rect.top)*.07));
arch.style.setProperty('--hero-shift',shift.toFixed(1)+'px');
};
const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});update();
}
})();