// Reviews marquee drag-to-scroll
document.addEventListener('DOMContentLoaded', function(){
  const marquee = document.querySelector('#reviews .reviews-marquee');
  const track = document.querySelector('#reviews .reviews-track');
  if(!marquee || !track) return;

  let isDown = false;
  let startX = 0;
  let startTranslate = 0;

  function getTranslateX(el){
    const tr = window.getComputedStyle(el).transform;
    if(!tr || tr === 'none') return 0;
    try{
      const dm = new DOMMatrix(tr);
      return dm.m41 || 0;
    }catch(e){
      // fallback parse
      const m = tr.match(/matrix\(([^,]+),[^,]+,[^,]+,[^,]+,\s*([^,]+),\s*([^\)]+)\)/);
      if(m) return parseFloat(m[2]) || 0;
      const m3 = tr.match(/matrix3d\(([^\)]+)\)/);
      if(m3){
        const parts = m3[1].split(',').map(s=>parseFloat(s.trim()));
        if(parts.length >= 13) return parts[12] || 0;
      }
    }
    return 0;
  }

  function pointerDown(evt){
    const e = evt instanceof PointerEvent ? evt : (evt.touches ? evt.touches[0] : evt);
    isDown = true;
    startX = e.clientX;
    // compute current transform before we disable animation
    startTranslate = getTranslateX(track);
    // turn off the CSS animation so we can control transform manually
    track.style.animation = 'none';
    // also leave the transform at the current position
    track.style.transform = `translateX(${startTranslate}px)`;
    marquee.classList.add('dragging');
    // pointer capture keeps moves coming even if cursor leaves marquee
    if (evt.pointerId !== undefined && marquee.setPointerCapture) {
      marquee.setPointerCapture(evt.pointerId);
    }
    evt.preventDefault && evt.preventDefault();
    console.log('reviews: pointerDown', startTranslate);
  }

  function pointerMove(evt){
    if(!isDown) return;
    const e = evt instanceof PointerEvent ? evt : (evt.touches ? evt.touches[0] : evt);
    const dx = (e.clientX || 0) - startX;
    const newT = startTranslate + dx;
    track.style.transform = `translateX(${newT}px)`;
    evt.preventDefault && evt.preventDefault();
    console.log('reviews: pointerMove', dx, newT);
  }

  function pointerUp(evt){
    if(!isDown) return;
    isDown = false;
    const e = evt instanceof PointerEvent ? evt : (evt.touches ? evt.touches[0] : evt);
    marquee.classList.remove('dragging');
    if (evt.pointerId !== undefined && marquee.releasePointerCapture) {
      marquee.releasePointerCapture(evt.pointerId);
    }
    // compute final translate value
    const finalT = getTranslateX(track);
    console.log('reviews: pointerUp finalT', finalT);
    // resume CSS animation at the corresponding offset
    const full = track.scrollWidth;
    const half = full / 2;
    let frac = (-finalT / half) % 1;
    if(frac < 0) frac += 1;
    const delay = frac * 75; // match 75s duration from CSS
    track.style.animation = `reviews-scroll 75s linear infinite`;
    track.style.animationDelay = `-${delay}s`;
    track.style.animationPlayState = 'running';
  }

  // Pointer events
  marquee.addEventListener('pointerdown', pointerDown, {passive:false});
  window.addEventListener('pointermove', pointerMove, {passive:false});
  window.addEventListener('pointerup', pointerUp);
  marquee.addEventListener('pointercancel', pointerUp);

  // Touch fallback for older browsers
  marquee.addEventListener('touchstart', function(e){ pointerDown(e.touches[0]); }, {passive:false});
  window.addEventListener('touchmove', function(e){ pointerMove(e.touches[0]); }, {passive:false});
  window.addEventListener('touchend', function(e){ pointerUp(e.changedTouches ? e.changedTouches[0] : e); });
});
