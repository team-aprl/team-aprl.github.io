(() => {
  const carousel = document.querySelector('.home-photo-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.home-photo-track');
  const photos = Array.from(track.children);
  if (photos.length < 3) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clone = (item) => {
    const copy = item.cloneNode(true);
    return copy;
  };
  track.prepend(clone(photos[photos.length - 1]));
  track.append(clone(photos[0]));
  let index = 1;
  let moving = false;
  let timer;
  const position = () => {
    const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
    track.style.transform = `translateX(${-index * step}px)`;
    Array.from(track.children).forEach((item, i) => {
      const visible = i === index || i === index + 1;
      item.tabIndex = visible ? 0 : -1;
      item.setAttribute('aria-hidden', String(!visible));
    });
  };
  const finish = () => {
    track.classList.remove('is-animated');
    if (index === 0) index = photos.length;
    if (index === photos.length + 1) index = 1;
    position();
    moving = false;
  };
  const move = (direction) => {
    if (moving) return;
    moving = true;
    index += direction;
    track.classList.add('is-animated');
    position();
    if (reducedMotion.matches) finish();
  };
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    if (!reducedMotion.matches && !document.hidden && !carousel.matches(':hover') && !carousel.contains(document.activeElement)) timer = setInterval(() => move(1), 5000);
  };
  carousel.querySelector('.home-photo-prev').addEventListener('click', () => { move(-1); start(); });
  carousel.querySelector('.home-photo-next').addEventListener('click', () => { move(1); start(); });
  track.addEventListener('transitionend', (event) => { if (event.propertyName === 'transform') finish(); });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', (event) => { if (!carousel.contains(event.relatedTarget)) start(); });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  reducedMotion.addEventListener('change', start);
  window.addEventListener('resize', position);
  position();
  start();
})();
