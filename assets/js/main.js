
const qs=(s,scope=document)=>scope.querySelector(s);
const qsa=(s,scope=document)=>[...scope.querySelectorAll(s)];
const header=qs('.site-header');
const toggle=qs('.menu-toggle');
const menu=qs('.nav-menu');
window.addEventListener('scroll',()=>header&&header.classList.toggle('scrolled',window.scrollY>30));
if(toggle&&menu){toggle.addEventListener('click',()=>{toggle.classList.toggle('active');menu.classList.toggle('open');});qsa('.nav-menu a').forEach(a=>a.addEventListener('click',()=>{toggle.classList.remove('active');menu.classList.remove('open');}));}
const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -4% 0px'});
qsa('.reveal').forEach(el=>observer.observe(el));
function initHeroSlides(){
  qsa('.hero[data-slides]').forEach(hero=>{
    const slides=(hero.dataset.slides||'').split('|').filter(Boolean);
    if(!slides.length) return;
    const bg=document.createElement('div');bg.className='hero-bg';
    const a=document.createElement('div');const b=document.createElement('div');
    a.className='hero-bg-layer active';b.className='hero-bg-layer';
    a.style.backgroundImage=`url("${slides[0]}")`;
    b.style.backgroundImage=`url("${slides[1]||slides[0]}")`;
    bg.append(a,b);hero.prepend(bg);
    if(slides.length<2) return;
    let i=0,active=0,layers=[a,b];
    setInterval(()=>{
      i=(i+1)%slides.length;
      const next=active?0:1;
      layers[next].style.backgroundImage=`url("${slides[i]}")`;
      layers[next].classList.add('active');
      layers[active].classList.remove('active');
      active=next;
    },5200);
  });
}
initHeroSlides();

function initPhotoCardSlides(){
  qsa('.photo-card[data-photo-slides]').forEach(card=>{
    const slides=(card.dataset.photoSlides||'').split('|').filter(Boolean);
    if(!slides.length) return;
    const a=document.createElement('div');
    const b=document.createElement('div');
    a.className='photo-slide-layer active';
    b.className='photo-slide-layer';
    a.style.backgroundImage=`url("${slides[0]}")`;
    b.style.backgroundImage=`url("${slides[1]||slides[0]}")`;
    card.prepend(b);
    card.prepend(a);
    if(!card.querySelector('.coverage-caption')){
      const cap=document.createElement('span');
      cap.className='coverage-caption';
      cap.textContent='Southern California Coverage';
      card.append(cap);
    }
    if(slides.length<2) return;
    let i=0,active=0,layers=[a,b];
    setInterval(()=>{
      i=(i+1)%slides.length;
      const next=active?0:1;
      layers[next].style.backgroundImage=`url("${slides[i]}")`;
      layers[next].classList.add('active');
      layers[active].classList.remove('active');
      active=next;
    },4200);
  });
}
initPhotoCardSlides();

function animateCount(el){
  if(el.dataset.done==='true') return;
  el.dataset.done='true';
  const target=Number(el.dataset.count||0),suffix=el.dataset.suffix||'';
  const duration=1100;
  let start=performance.now();
  function frame(now){
    const p=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=Math.round(target*eased)+suffix;
    if(p<1) requestAnimationFrame(frame);
    else el.textContent=target+suffix;
  }
  requestAnimationFrame(frame);
}
const countObserver=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){animateCount(e.target);countObserver.unobserve(e.target);}}),{threshold:.55});
qsa('[data-count]').forEach(el=>countObserver.observe(el));
qsa('[data-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const msg=qs('.form-message',form);if(msg)msg.textContent='Demo form ready. Connect this form to your CRM or email backend before launch.';form.reset();}));


function initVideoPosters(){
  qsa('.video-poster[data-video-posters]').forEach(poster=>{
    const slides=(poster.dataset.videoPosters||'').split('|').filter(Boolean);
    if(!slides.length) return;
    const a=document.createElement('div');
    const b=document.createElement('div');
    a.className='video-poster-layer active';
    b.className='video-poster-layer';
    a.style.backgroundImage=`url("${slides[0]}")`;
    b.style.backgroundImage=`url("${slides[1]||slides[0]}")`;
    poster.append(a,b);
    if(slides.length<2) return;
    let i=0,active=0,layers=[a,b];
    setInterval(()=>{
      i=(i+1)%slides.length;
      const next=active?0:1;
      layers[next].style.backgroundImage=`url("${slides[i]}")`;
      layers[next].classList.add('active');
      layers[active].classList.remove('active');
      active=next;
    },4600);
  });
}
initVideoPosters();

function initVideoModal(){
  const modal=qs('.video-modal');
  if(!modal) return;
  qsa('[data-video-modal]').forEach(btn=>btn.addEventListener('click',()=>{
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }));
  qsa('[data-video-close]',modal).forEach(btn=>btn.addEventListener('click',()=>{
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&modal.classList.contains('open')){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
    }
  });
}
initVideoModal();
