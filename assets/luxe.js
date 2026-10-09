/* Visoriz Luxe — subtle scroll parallax, progressive enhancements, accessibility */
(()=>{'use strict';
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
const layers=[...document.querySelectorAll('[data-luxe-depth]')];
const photos=[...document.querySelectorAll('.visual-tile img')];
const showcase=document.querySelector('.luxe-showcase');
const desktop=window.matchMedia('(min-width: 741px)');
let ticking=false;
const paint=()=>{
ticking=false;
if(motion.matches){
layers.forEach(el=>el.style.setProperty('--luxe-depth','0px'));
photos.forEach(el=>el.style.setProperty('--luxe-photo-shift','0px'));
return;
}
const view=window.innerHeight||800;
for(const layer of layers){
const rect=layer.getBoundingClientRect();
if(rect.bottom< -250||rect.top>view+250)continue;
const depth=Number(layer.dataset.luxeDepth)||0;
const center=rect.top+rect.height/2;
const offset=Math.max(-60,Math.min(60,(view/2-center)*depth*(desktop.matches?1:0.4)));
layer.style.setProperty('--luxe-depth',offset.toFixed(1)+'px');
}
for(const photo of photos){
const rect=photo.parentElement.getBoundingClientRect();
if(rect.bottom< -100||rect.top>view+100)continue;
const offset=Math.max(-18,Math.min(18,(view/2-(rect.top+rect.height/2))*0.045));
photo.style.setProperty('--luxe-photo-shift',offset.toFixed(1)+'px');
}
};
const queue=()=>{if(!ticking){ticking=true;requestAnimationFrame(paint)}};
addEventListener('scroll',queue,{passive:true});
addEventListener('resize',queue,{passive:true});
if(motion.addEventListener)motion.addEventListener('change',queue);
queue();
if(showcase&&desktop.matches&&!motion.matches){
let raf=0;
showcase.addEventListener('pointermove',e=>{
if(e.pointerType==='touch')return;
if(raf)cancelAnimationFrame(raf);
raf=requestAnimationFrame(()=>{
const rect=showcase.getBoundingClientRect();
const x=((e.clientX-rect.left)/rect.width-.5)*12;
const y=((e.clientY-rect.top)/rect.height-.5)*12;
showcase.style.setProperty('--luxe-pointer-x',x.toFixed(1)+'px');
showcase.style.setProperty('--luxe-pointer-y',y.toFixed(1)+'px');
});
},{passive:true});
showcase.addEventListener('pointerleave',()=>{showcase.style.setProperty('--luxe-pointer-x','0px');showcase.style.setProperty('--luxe-pointer-y','0px')});
}
})();