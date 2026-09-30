import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, Environment, Preload } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Suspense, useEffect, useRef, useState } from 'react';
import { FaApple, FaBell, FaBoxOpen, FaCalendarCheck, FaCertificate, FaChartLine, FaChevronDown, FaCrown, FaEnvelope, FaGem, FaGooglePlay, FaHandshake, FaHeart, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaPinterestP, FaShieldAlt, FaStar, FaTags, FaUserTie, FaVideo, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import * as THREE from 'three';
import { HeroScene } from './components/HeroScene.jsx';
import { ShowroomScene } from './components/ShowroomScene.jsx';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL='https://wa.me/917575835916?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Goldentree%20Jewels.';
const ANDROID_URL='https://play.google.com/store/apps/details?id=com.ark.goldentree';
const IOS_URL='https://apps.apple.com/us/app/goldentree-jewels-limited/id6785775980';
const MAPS_URL='https://www.google.com/maps/place/Goldentree+Jewels+Limited+mavdi+Rajkot/@22.25552,70.78333,17z/data=!3m1!4b1!4m6!3m5!1s0x3959cb0010a27729:0xc3d598a3b1001019!8m2!3d22.25552!4d70.78333!16s%2Fg%2F11vpv60zrr?entry=ttu&g_ep=EgoyMDI2MDkyNy4xIKXMDSoASAFQAw%3D%3D';

function ExplodedRing({ side, label }) {
  const parts=[['gem','Brilliant Diamond'],['setting','Crown Setting'],['band','Gold Shank']];
  return <figure className={`ring-assembly ${side}`} aria-label={label}>
    {parts.map(([part,name])=><span className={`ring-component ${part}`} key={part}><img src="/assets/rings-construction-exploded.png" alt=""/><small>{name}</small></span>)}
    <figcaption>{label}</figcaption>
  </figure>;
}

function EarringGallery(){
  return <figure className="earring-gallery" aria-label="Five animated earring vitrines"><img src="/assets/earrings-five-vitrines.png" alt="Five luxury earring designs inside illuminated glass vitrines"/><span className="earring-glint glint-one"/><span className="earring-glint glint-two"/></figure>
}

function BangleFan() {
  return <figure className="bangle-stage" aria-label="Five animated luxury bangles">
    <img className="bangle-platform" src="/assets/bangle-lotus-platform.png" alt="Ivory marble bangle display platform with champagne gold trim"/>
    <img className="lotus lotus-closed" src="/assets/ivory-gold-lotus-closed.png" alt="Closed ivory lotus bud with champagne gold edges"/>
    <img className="lotus lotus-open" src="/assets/ivory-gold-lotus-open-transparent.png" alt="Open ivory lotus with champagne gold edges"/>
    {[0,1,2,3,4].map(index=><span className="bangle-piece" style={{'--piece':index}} key={index}><img className="gold-bangle" src="/assets/bangle-fan-sprite.png" alt=""/><img className="diamond-bangle" src="/assets/diamond-bangle-sprite.png" alt=""/></span>)}
  </figure>;
}

const reviews = [
  {quote:'The necklace felt as though it had always belonged to our family. Every detail carries warmth, history and extraordinary craftsmanship.',name:'Ananya R.',place:'Hyderabad'},
  {quote:'From the first private viewing to the final fitting, the experience was thoughtful, calm and completely personal.',name:'Meera & Arjun',place:'Bengaluru'},
  {quote:'The diamond ring catches light beautifully from every angle. It is modern, timeless and unmistakably special.',name:'Kavya S.',place:'Mumbai'},
  {quote:'Their team understood the emotion behind our celebration and helped us find a piece that feels truly one of a kind.',name:'Priya Sharma',place:'Chennai'},
  {quote:'Beautiful designs, transparent guidance and patient service. Goldentree Jewels made the entire occasion unforgettable.',name:'Nisha K.',place:'Coimbatore'}
];

function TestimonialsSlider(){
  const [active,setActive]=useState(0);
  useEffect(()=>{const timer=window.setInterval(()=>setActive(index=>(index+1)%reviews.length),4800);return()=>window.clearInterval(timer)},[]);
  return <div className="testimonial-slider"><div className="testimonial-stage">{reviews.map((review,index)=>{const delta=(index-active+reviews.length)%reviews.length;const position=delta===0?'is-active':delta===1?'is-next':delta===reviews.length-1?'is-prev':'is-hidden';return <blockquote className={`testimonial-slide ${position}`} key={review.name} aria-hidden={position==='is-hidden'}><div className="review-stars" aria-label="Five star review">{Array.from({length:5},(_,star)=><FaStar key={star}/>)}</div><p>“{review.quote}”</p><footer><span className="review-avatar">{review.name.charAt(0)}</span><span><b>{review.name}</b><small>{review.place}</small></span></footer></blockquote>})}</div><div className="testimonial-dots" aria-label="Select a customer review">{reviews.map((review,index)=><button className={index===active?'is-active':''} onClick={()=>setActive(index)} aria-label={`Show review from ${review.name}`} key={review.name}/>)}</div></div>
}

function FooterGroup({ title, children, className='' }){
  const [open,setOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>700);
  useEffect(()=>{const query=window.matchMedia('(max-width: 700px)');const sync=()=>setOpen(!query.matches);sync();query.addEventListener('change',sync);return()=>query.removeEventListener('change',sync)},[]);
  return <details className={`footer-group ${className}`} open={open} onToggle={event=>setOpen(event.currentTarget.open)}><summary>{title} <FaChevronDown/></summary><div className="footer-links">{children}</div></details>
}

function CameraRig({ progress }) {
  const { camera, scene } = useThree();
  const target = useRef(new THREE.Vector3());
  const black = useRef(new THREE.Color('#000'));
  const ivory = useRef(new THREE.Color('#efe7d8'));
  useFrame((state, delta) => {
    const p = progress.current;
    const introP = THREE.MathUtils.smoothstep(p, 0, .36);
    const transitionP = THREE.MathUtils.smoothstep(p, .22, .46);
    const showroomP = THREE.MathUtils.smoothstep(p, .34, 1);
    const carouselDrift = THREE.MathUtils.smoothstep(p,.38,.82) * .2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, Math.sin(state.clock.elapsedTime*.28)*.14*showroomP + carouselDrift, 2.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, THREE.MathUtils.lerp(1.45,1.8,showroomP), 2.8, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, THREE.MathUtils.lerp(9.2,-1.6,transitionP), 2.8, delta);
    target.current.set(0, THREE.MathUtils.lerp(.15,1.25,showroomP), THREE.MathUtils.lerp(0,-10.7,transitionP));
    camera.lookAt(target.current); camera.fov=THREE.MathUtils.lerp(39,44,introP); camera.updateProjectionMatrix();
    if (!scene.background?.isColor) scene.background = new THREE.Color('#000');
    scene.background.copy(black.current).lerp(ivory.current, THREE.MathUtils.smoothstep(p,.28,.45));
    if (scene.fog?.color) scene.fog.color.copy(scene.background);
  });
  return null;
}

function Experience({ progress }) {
  return <><fog attach="fog" args={['#000',8,28]} /><CameraRig progress={progress} /><HeroScene progress={progress} /><ShowroomScene progress={progress} /><Environment preset="studio" environmentIntensity={.22} /><EffectComposer multisampling={0}><Bloom intensity={.82} luminanceThreshold={1.15} luminanceSmoothing={.12} mipmapBlur /><Vignette eskil={false} offset={.18} darkness={.62} /></EffectComposer><AdaptiveDpr pixelated /><Preload all /></>;
}

export function App() {
  const progress = useRef(0);
  useEffect(() => {
    const lenis = new Lenis({ duration:1.5, smoothWheel:true, wheelMultiplier:.8 });
    const scroll = { value:0 };
    const trigger = ScrollTrigger.create({ trigger:'#cinematic-scroll', start:'top top', end:'bottom bottom', scrub:1.2, onUpdate:self=>{const p=self.progress;scroll.value=p;document.documentElement.style.setProperty('--logo-flight',Math.max(0,Math.min(1,(p-.07)/.17)).toFixed(3));document.documentElement.style.setProperty('--showroom-ui',Math.max(0,Math.min(1,(p-.23)/.1)).toFixed(3));document.documentElement.style.setProperty('--intro-logo',Math.max(0,Math.min(1,(.30-p)/.055)).toFixed(3))} });
    const ticker = time => { lenis.raf(time*1000); progress.current=THREE.MathUtils.lerp(progress.current,scroll.value,.075) };
    gsap.ticker.add(ticker); gsap.ticker.lagSmoothing(0);
    const editorial = gsap.context(() => {
      gsap.utils.toArray('.collection-section').forEach((section,index) => {
        gsap.fromTo(section.querySelectorAll('.section-copy > *'),{opacity:0,y:28},{opacity:1,y:0,stagger:.09,duration:.9,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 70%'}});
        const image=section.querySelector('.section-art img');
        if(image && !section.classList.contains('signature')) gsap.fromTo(image,{scale:1.07,y:36},{scale:1,y:-18,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:1}});
        const art=section.querySelector('.section-art');
        if(art) gsap.fromTo(art,{rotationY:index%2===0?-7:7,rotationX:3,x:index%2===0?45:-45},{rotationY:index%2===0?6:-6,rotationX:-3,x:index%2===0?-35:35,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:1}});
      });
      gsap.fromTo('.signature .section-art img',{y:-260,scale:1.16,rotation:-1.5},{y:95,scale:1,rotation:1.2,ease:'none',scrollTrigger:{trigger:'.signature',start:'top bottom',end:'bottom top',scrub:1.15}});
      gsap.fromTo('.heritage-story>img',{scale:1.08,x:-22},{scale:1,x:18,ease:'none',scrollTrigger:{trigger:'.heritage-story',start:'top bottom',end:'bottom top',scrub:1.1}});
      gsap.fromTo('.heritage-brand,.heritage-story>aside',{opacity:0,y:35},{opacity:1,y:0,stagger:.16,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.heritage-story',start:'top 66%'}});
      gsap.timeline({scrollTrigger:{trigger:'.signature',start:'top 74%',toggleActions:'play none none reverse'}}).fromTo('.signature .section-art',{opacity:0,y:62,scale:.94},{opacity:1,y:0,scale:1,duration:1,ease:'power3.out'}).fromTo('.signature .section-copy>*',{opacity:0,y:30},{opacity:1,y:0,stagger:.1,duration:.65,ease:'power3.out'},'-=.48').fromTo('.signature .jewel-thumb',{opacity:0,y:70,rotationY:-16,scale:.9},{opacity:1,y:0,rotationY:0,scale:1,stagger:.16,duration:.78,ease:'back.out(1.25)'},'-=.2');
      gsap.utils.toArray('.ring-assembly').forEach((ring,ringIndex)=>{
        const starts=[-26,-1,26],ends=[-38,-2,38];
        gsap.fromTo(ring.querySelectorAll('.ring-component'),{y:index=>starts[index],rotation:index=>(index-1)*-3,opacity:.92},{y:index=>ends[index],rotation:index=>(index-1)*(ringIndex===0?8:-8),opacity:1,stagger:.025,ease:'none',scrollTrigger:{trigger:'.love-detail',start:'top 82%',end:'bottom 26%',scrub:1.15}});
        gsap.fromTo(ring,{x:ringIndex===0?-18:18,scale:.68},{x:ringIndex===0?8:-8,scale:.78,ease:'none',scrollTrigger:{trigger:'.love-detail',start:'top bottom',end:'bottom top',scrub:1.2}});
      });
      gsap.fromTo('.grace-ring',{opacity:0,y:95,rotationY:-22,scale:.78},{opacity:1,y:0,rotationY:0,scale:1,ease:'power2.out',scrollTrigger:{trigger:'.grace-detail',start:'top 78%',end:'center 46%',scrub:1}});
      gsap.fromTo('.grace-detail .section-copy',{opacity:0,x:-42},{opacity:1,x:0,ease:'none',scrollTrigger:{trigger:'.grace-detail',start:'top 74%',end:'center 48%',scrub:1}});
      gsap.fromTo('.earring-gallery img',{y:42,scale:1.025},{y:-12,scale:1,ease:'none',scrollTrigger:{trigger:'.earrings-story',start:'top 82%',end:'bottom 25%',scrub:1.1}});
      gsap.to('.earring-glint',{x:520,opacity:.9,stagger:.18,ease:'none',scrollTrigger:{trigger:'.earrings-story',start:'top 72%',end:'bottom 30%',scrub:1}});
      const spread=Math.min(205,window.innerWidth*.145),fanX=[-spread,-spread*.5,0,spread*.5,spread],fanY=[38,-8,-58,-8,38],fanR=[-25,-13,0,13,25];
      gsap.set('.lotus-closed',{scale:1,opacity:1,y:0});
      gsap.set('.lotus-open',{scale:1,opacity:0,y:0});
      gsap.set('.bangle-piece',{opacity:0,x:index=>fanX[index],y:index=>fanY[index],rotation:index=>fanR[index],scale:index=>index===2?1.06:.88});
      gsap.set('.gold-bangle',{opacity:1});
      gsap.set('.diamond-bangle',{opacity:0,filter:'brightness(.72)'});
      ScrollTrigger.create({trigger:'.bangles-story',start:'top top',end:'bottom bottom',scrub:1.1,onUpdate:self=>{
        const p=self.progress;
        const open=gsap.utils.clamp(0,1,(p-.16)/.24);
        const reveal=gsap.utils.clamp(0,1,(p-.47)/.18);
        const diamond=gsap.utils.clamp(0,1,(p-.76)/.18);
        gsap.set('.lotus-closed',{opacity:1-open});
        gsap.set('.lotus-open',{opacity:open});
        gsap.set('.bangle-piece',{opacity:reveal});
        gsap.set('.gold-bangle',{opacity:1-diamond});
        gsap.set('.diamond-bangle',{opacity:diamond,filter:`brightness(${.72+diamond*.46}) drop-shadow(0 0 ${diamond*9}px rgba(255,255,255,.9))`});
      }});
      gsap.fromTo('.offer-orbit',{rotation:-22,scale:.72,opacity:0},{rotation:10,scale:1,opacity:1,ease:'none',scrollTrigger:{trigger:'.golden-offer',start:'top 84%',end:'bottom 25%',scrub:1.1}});
      gsap.fromTo('.offer-jewel',{y:120,rotation:-9,scale:.78},{y:-34,rotation:4,scale:1,ease:'none',scrollTrigger:{trigger:'.golden-offer',start:'top bottom',end:'bottom top',scrub:1.1}});
      gsap.timeline({scrollTrigger:{trigger:'.why-us',start:'top 78%',toggleActions:'play none none reverse'}}).fromTo('.why-us header>*',{opacity:0,y:24},{opacity:1,y:0,stagger:.12,duration:.62,ease:'power3.out'}).fromTo('.reason-item',{opacity:0,y:34,scale:.9},{opacity:1,y:0,scale:1,stagger:.13,duration:.72,ease:'back.out(1.35)'},'-=.18');
      gsap.fromTo('.testimonial-slider',{opacity:0,y:42,scale:.97},{opacity:1,y:0,scale:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.testimonials',start:'top 76%'}});
      gsap.timeline({scrollTrigger:{trigger:'.appointment',start:'top 76%',toggleActions:'play none none reverse'}}).fromTo('.appointment .section-copy>span',{opacity:0,y:22,letterSpacing:'.48em'},{opacity:1,y:0,letterSpacing:'.18em',duration:.7,ease:'power3.out'}).fromTo('.appointment .section-copy h2,.appointment .section-copy>p',{opacity:0,y:34},{opacity:1,y:0,stagger:.13,duration:.75,ease:'power3.out'},'-=.35').fromTo('.appointment-actions a',{opacity:0,y:24,scale:.94},{opacity:1,y:0,scale:1,stagger:.12,duration:.55,ease:'back.out(1.4)'},'-=.3').fromTo('.appointment-service',{opacity:0,y:22},{opacity:1,y:0,stagger:.12,duration:.55,ease:'power2.out'},'-=.2');
      gsap.fromTo('.store-info',{opacity:0,x:-70,rotationY:8},{opacity:1,x:0,rotationY:0,ease:'power3.out',scrollTrigger:{trigger:'.store-visit',start:'top 72%'}});
      gsap.fromTo('.store-photo',{opacity:0,x:75,scale:1.04},{opacity:1,x:0,scale:1,ease:'power3.out',scrollTrigger:{trigger:'.store-visit',start:'top 72%'}});
      gsap.fromTo('.app-preview-card',{opacity:0,y:70,rotationY:-10},{opacity:1,y:0,rotationY:0,ease:'power2.out',scrollTrigger:{trigger:'.app-promo',start:'top 72%'}});
      gsap.fromTo('.app-hero-copy>*',{opacity:0,y:28},{opacity:1,y:0,stagger:.1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.app-promo',start:'top 76%'}});
      gsap.fromTo('.app-features article',{opacity:0,y:28},{opacity:1,y:0,stagger:.08,duration:.6,ease:'power2.out',scrollTrigger:{trigger:'.app-features',start:'top 86%'}});
      gsap.fromTo('.footer-main>*',{opacity:0,y:24},{opacity:1,y:0,stagger:.1,duration:.65,ease:'power2.out',scrollTrigger:{trigger:'.site-footer',start:'top 88%'}});
      gsap.fromTo('.nav-brand img',{scale:.72,rotation:-18,filter:'drop-shadow(0 0 0 rgba(196,143,62,0))'},{scale:1.08,rotation:0,filter:'drop-shadow(0 0 12px rgba(196,143,62,.75))',duration:1.2,ease:'power2.out'});
    });
    return()=>{editorial.revert();trigger.kill();gsap.ticker.remove(ticker);lenis.destroy()};
  },[]);
  return <><main id="cinematic-scroll" className="relative h-[620vh] bg-black text-white"><div className="fixed inset-0"><Canvas shadows dpr={[1,1.5]} camera={{position:[0,1.45,9.2],fov:39,near:.1,far:80}} gl={{antialias:true,toneMapping:THREE.ACESFilmicToneMapping,toneMappingExposure:.8,powerPreference:'high-performance'}}><Suspense fallback={null}><Experience progress={progress} /></Suspense></Canvas></div><div className="intro-logo brand-spark"><img src="/assets/goldentree-brand-lockup.jpeg" alt="Goldentree Jewels Limited logo"/><i className="brand-glint"><FaStar/></i></div><nav className="showroom-nav" aria-label="Primary navigation"><div className="nav-side nav-left"><a href="#home">Home</a><a href="#collections">Collections</a><a href="#about">About Us</a></div><div className="nav-brand brand-spark"><img src="/assets/goldentree-brand-lockup.jpeg" alt="Goldentree Jewels Limited"/><i className="brand-glint"><FaStar/></i><span>Goldentree Jewels</span><small>Jewels Limited</small></div><div className="nav-side nav-right"><a href="#contact">Contact</a><button>Search</button><button>Cart</button></div></nav><div className="scroll-cue">Scroll to enter the showroom</div><section id="home" className="h-[190vh]" aria-label="Cinematic Goldentree Jewels logo introduction"/><section id="collections" className="h-[430vh]" aria-label="Luxury jewellery showroom and product carousel"/></main>
    <section className="collection-section heritage-story" aria-labelledby="heritage-title"><img src="/assets/geetha-red-heritage.png" alt="Temple gold jewellery presented on rich ruby-red velvet"/><div className="heritage-brand brand-spark"><img src="/assets/goldentree-brand-lockup.jpeg" alt="Goldentree Jewels Limited"/><i className="brand-glint"><FaStar/></i><span>Since 1998</span><h2 id="heritage-title">Goldentree<br/>Jewels</h2><p>More than jewellery.<br/>It’s a part of your story.</p></div><aside><span>Crafted for Generations</span><p>A celebration of temple artistry, precious rubies and emeralds, finished by master craftspeople.</p><a href="#collections">Discover Our Heritage</a></aside></section>
    <section className="collection-section split-editorial signature" aria-labelledby="signature-title"><div className="section-copy"><span>Signature Collection</span><h2 id="signature-title">A Masterpiece<br/>in Gold</h2><small>Tradition Crafted For Tomorrow</small><p>Exquisitely designed to celebrate heritage and feminine grace. This masterpiece blends traditional South Indian craftsmanship with contemporary elegance.</p><a href="#collections">Explore Collection</a></div><figure className="section-art"><img src="/assets/necklace-editorial.webp" alt="Ornate temple gold necklace on a cream pedestal"/></figure><aside className="side-inscription">Grace<br/>in every detail</aside><div className="jewellery-thumbs detail-crops"><figure className="jewel-thumb"><img src="/assets/r3f-emerald-necklace.png" alt="Emerald temple necklace"/><i className="jewel-spark"><FaStar/></i><i className="jewel-spark"><FaStar/></i><figcaption>Temple Necklace</figcaption></figure><figure className="jewel-thumb"><img src="/assets/r3f-emerald-pendant.png" alt="Emerald gold pendant"/><i className="jewel-spark"><FaStar/></i><i className="jewel-spark"><FaStar/></i><figcaption>Emerald Pendant</figcaption></figure><figure className="jewel-thumb"><img src="/assets/r3f-earrings.png" alt="Ornate gold earrings"/><i className="jewel-spark"><FaStar/></i><i className="jewel-spark"><FaStar/></i><figcaption>Heritage Earrings</figcaption></figure><figure className="jewel-thumb"><img src="/assets/r3f-gold-bangle.png" alt="Sculpted gold bangle"/><i className="jewel-spark"><FaStar/></i><i className="jewel-spark"><FaStar/></i><figcaption>Sculpted Bangle</figcaption></figure></div></section>
    <section id="ring-focus" className="collection-section love-detail"><div className="section-copy love-copy"><span>Ring Collection</span><h2>Love In<br/>Every Detail</h2><p>Two expressions of devotion, revealed piece by piece as you move through the story.</p></div><div className="love-rings" aria-label="Diamond and ruby rings"><ExplodedRing side="left" label="Diamond devotion"/><ExplodedRing side="right" label="Ruby devotion"/></div></section>
    <section id="grace-detail" className="collection-section grace-detail" aria-labelledby="grace-title"><div className="section-copy"><span>Silver Rings Collection</span><h2 id="grace-title">Grace<br/>In Every<br/>Detail</h2><p>From timeless classics to modern expressions, our silver rings are crafted to celebrate life's most precious moments.</p><a href="#collections">Explore Collection</a><small>Scroll to discover</small></div><div className="grace-rings"><img className="grace-platform" src="/assets/bangle-lotus-platform.png" alt="Ivory marble and champagne gold ring pedestal"/><figure className="grace-ring"><img src="/assets/silver-diamond-statement-ring.png" alt="Platinum floral halo ring covered with diamonds"/><figcaption>The Radiance</figcaption></figure><figure className="grace-ring"><img src="/assets/silver-diamond-marquise-ring.png" alt="Marquise starburst platinum diamond ring"/><figcaption>The Blossom</figcaption></figure></div><aside><span>More Than</span><b>A Ring</b><p>Every detail is considered, every stone selected for brilliance.</p></aside></section>
    <section id="earrings" className="collection-section split-editorial earrings-story" aria-labelledby="earrings-title"><div className="section-copy"><span>Earrings Collection</span><h2 id="earrings-title">Elegance<br/>That Speaks<br/>Volumes</h2><p>From everyday essentials to statement pieces, our earrings are designed to add brilliance to every moment of your story.</p><a href="#collections">Explore Collection</a></div><EarringGallery/><aside className="tradition-note"><span>Traditional</span><strong>Heirlooms</strong><p>Handcrafted in gold, diamonds and precious stones.</p><ul><li>Temple Jhumkas</li><li>Emerald Drops</li><li>Diamond Chandeliers</li></ul></aside></section>
    <section id="bangles" className="collection-section bangles-story" aria-labelledby="bangles-title"><div className="bangle-canvas"><div className="section-copy"><span>Bangles Collection</span><h2 id="bangles-title">Tradition<br/>On Your Wrist</h2><p>More than an ornament, a bangle is a symbol of grace, strength and prosperity. Our designs blend heritage craftsmanship with modern elegance.</p><a href="#collections">Explore Bangles</a></div><BangleFan/></div></section>
    <section className="collection-section golden-offer" aria-labelledby="offer-title"><div className="section-copy offer-copy"><span>A Special Gesture of Love</span><h2 id="offer-title">Only <strong>7.77%</strong></h2><h3>Making Charges</h3><p>On Every Jewellery</p><a href="#collections">Explore Collection</a><small>Celebrate every occasion with exceptional craftsmanship</small></div></section>
    <section id="why-us" className="collection-section why-us" aria-labelledby="why-title"><header><span>A Legacy You Can Trust</span><h2 id="why-title">Why Choose Goldentree Jewels?</h2><p>More than jewellery, a part of every celebration.</p></header><div className="reason-grid"><article className="reason-item"><i><FaCertificate/></i><h3>Certified Diamonds</h3><p>BIS hallmarked and independently authenticated.</p></article><article className="reason-item"><i><FaGem/></i><h3>Exquisite Craftsmanship</h3><p>Hand-finished by generations of master artisans.</p></article><article className="reason-item"><i><FaCrown/></i><h3>Timeless Designs</h3><p>Jewellery created to live beautifully beyond trends.</p></article><article className="reason-item"><i><FaHandshake/></i><h3>Personal Guidance</h3><p>Thoughtful expertise for every milestone and celebration.</p></article><article className="reason-item"><i><FaShieldAlt/></i><h3>Trusted Since 1998</h3><p>An enduring promise of purity and transparency.</p></article></div></section>
    <section id="testimonials" className="collection-section testimonials" aria-labelledby="stories-title"><header><span>Stories Of Devotion</span><h2 id="stories-title">What Our Customers Say</h2><p>Moments of trust, celebration and jewellery chosen with love.</p></header><TestimonialsSlider/></section>
    <section id="contact" className="collection-section appointment"><div className="section-copy"><span>Let Us Help You Find Yours</span><h2>Looking for the<br/>Perfect Jewellery?</h2><p>Visit our store or connect with our experts for personalised guidance and exclusive collections.</p><div className="appointment-actions"><a href="mailto:jewelsgoldentree@gmail.com"><FaCalendarCheck/>Book an Appointment</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><FaWhatsapp/>Chat on WhatsApp</a></div><div className="appointment-services"><span className="appointment-service"><i><FaVideo/></i><b>In-store &amp; virtual<br/>appointments</b></span><span className="appointment-service"><i><FaUserTie/></i><b>Personalised<br/>consultation</b></span><span className="appointment-service"><i><FaGem/></i><b>Exclusive<br/>collections</b></span></div></div><div className="appointment-mark brand-spark"><img src="/assets/goldentree-brand-lockup.jpeg" alt="Goldentree Jewels Limited"/><i className="brand-glint"><FaStar/></i></div></section>
    <section id="visit-store" className="collection-section store-visit" aria-labelledby="visit-title"><header><span>Visit Our Store</span><h2 id="visit-title">We’d Love to See You</h2><p>Come experience our collection in person.</p></header><div className="store-visit-layout"><article className="store-info"><div className="store-info-brand brand-spark"><img src="/assets/goldentree-brand-lockup.jpeg" alt="Goldentree Jewels Limited"/><i className="brand-glint"><FaStar/></i></div><dl><div><dt>Address</dt><dd>Rajkot, Gujarat, India</dd></div><div><dt>Call Us</dt><dd>+91 7575835916</dd></div><div><dt>Email</dt><dd>jewelsgoldentree@gmail.com</dd></div><div><dt>Business Hours</dt><dd>Mon–Sat: 10:00 AM–8:00 PM<br/>Sunday: 11:00 AM–6:00 PM</dd></div></dl><a href={MAPS_URL} target="_blank" rel="noreferrer">Get Directions</a></article><figure className="store-photo"><img src="/assets/goldentree-showroom.jpeg" alt="Goldentree Jewels Limited showroom in Rajkot"/><figcaption>Goldentree Jewels Limited · Rajkot, Gujarat</figcaption></figure></div></section>
    <section id="app" className="collection-section app-promo" aria-labelledby="app-title"><div className="app-hero-copy"><span>Your Jewellery World<br/>Now Closer Than Ever</span><h2 id="app-title">Download<br/>Our App</h2><h3>Timeless Jewellery,<br/>Now in Your Hands</h3><p>Explore our complete collection, check live gold and silver rates, track your schemes and discover exclusive offers—anytime, anywhere.</p></div><figure className="app-phone-art"><img src="/assets/app-upright-phones-v2.png" alt="Two upright phones showing a jewellery campaign and the Goldentree Jewels catalogue app"/></figure><div className="app-features"><article><i><FaChartLine/></i><b>Live Gold &amp;<br/>Silver Rates</b><span>Stay updated<br/>in real time</span></article><article><i><FaGem/></i><b>Browse Jewellery<br/>Collection</b><span>Explore our<br/>entire range</span></article><article><i><FaTags/></i><b>Exclusive<br/>App-Only Offers</b><span>Special deals<br/>just for you</span></article><article><i><FaBoxOpen/></i><b>Order Tracking<br/>&amp; History</b><span>Know your order<br/>at every step</span></article><article><i><FaBell/></i><b>Push Notifications<br/>for Offers</b><span>Be the first<br/>to know</span></article><article><i><FaHeart/></i><b>Wishlist &amp;<br/>Favourites</b><span>Save what<br/>you love</span></article></div><div className="app-download"><div className="store-download"><a className="store-badge" href={ANDROID_URL} target="_blank" rel="noreferrer"><FaGooglePlay/><span>Get it on<b>Google Play</b></span></a><div className="app-qr"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(ANDROID_URL)}`} alt="QR code for the Goldentree Jewels Android app"/><small>Android app</small></div></div><div className="store-download"><a className="store-badge" href={IOS_URL} target="_blank" rel="noreferrer"><FaApple/><span>Download on the<b>App Store</b></span></a><div className="app-qr"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(IOS_URL)}`} alt="QR code for the Goldentree Jewels iOS app"/><small>iPhone app</small></div></div></div></section>
    <section className="more-than-app" aria-labelledby="more-app-title"><div><span>Exclusive Benefits</span><h2 id="more-app-title">More Than<br/>Just an App</h2><p>A seamless jewellery experience designed around you.</p></div><article><i><FaTags/></i><b>App-Only Offers</b><p>Be the first to access limited launches and private offers.</p></article><article><i><FaGem/></i><b>Personalised Recommendations</b><p>Discover jewellery selected around your taste and celebrations.</p></article><article><i><FaHeart/></i><b>Expert Guidance</b><p>Connect with our jewellery specialists whenever you need advice.</p></article></section>
    <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><div className="footer-lockup brand-spark"><img src="/assets/goldentree-brand-lockup.jpeg" alt="Goldentree Jewels Limited"/></div><p>Your trusted destination for exclusive gold ornaments, crafted with precision and elegance in Rajkot.</p><nav className="social-links" aria-label="Social media"><a href="https://www.instagram.com/goldentree_jewels" target="_blank" rel="noreferrer" aria-label="Goldentree Jewels on Instagram"><span><FaInstagram/></span></a><a href="https://pin.it/1uMubXe9c" target="_blank" rel="noreferrer" aria-label="Goldentree Jewels on Pinterest"><span><FaPinterestP/></span></a><a href="https://www.youtube.com/@goldentreejewels" target="_blank" rel="noreferrer" aria-label="Goldentree Jewels on YouTube"><span><FaYoutube/></span></a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with Goldentree Jewels on WhatsApp"><span><FaWhatsapp/></span></a></nav></div><FooterGroup title="Quick Links"><a href="#home">Home</a><a href="#collections">Collections</a><a href="#ring-focus">Rings</a><a href="#earrings">Earrings</a><a href="#bangles">Bangles</a><a href="#contact">Book an Appointment</a></FooterGroup><FooterGroup title="Legal"><a href="#terms">Terms &amp; Conditions</a><a href="#privacy">Privacy Policy</a><a href="#refunds">Refund Policy</a><a href="#shipping">Shipping Policy</a><a href="#care">Jewellery Care</a></FooterGroup><FooterGroup title="Contact Us" className="footer-contact"><span className="footer-contact-line"><i><FaMapMarkerAlt/></i><b>Goldentree Jewels Limited<br/><small>Rajkot, Gujarat, India</small></b></span><a className="footer-contact-line" href="tel:+917575835916"><i><FaPhoneAlt/></i><b>+91 7575835916</b></a><a className="footer-contact-line" href="mailto:jewelsgoldentree@gmail.com"><i><FaEnvelope/></i><b>jewelsgoldentree@gmail.com</b></a><a className="footer-contact-line" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><i><FaWhatsapp/></i><b>Chat on WhatsApp</b></a></FooterGroup></div><div className="footer-bottom"><p>© 2026 Goldentree Jewels. All rights reserved. · Designed with devotion · Since 1998</p></div></footer>
  </>;
}
