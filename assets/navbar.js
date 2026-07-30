// Điều khiển menu mobile (hamburger) dùng chung cho mọi trang
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const bar1 = document.getElementById('bar1');
  const bar2 = document.getElementById('bar2');
  const bar3 = document.getElementById('bar3');

  if (!toggleBtn || !mobileMenu) return;

  let open = false;

  toggleBtn.addEventListener('click', function () {
    open = !open;
    mobileMenu.classList.toggle('open', open);
    bar1.style.transform = open ? 'rotate(45deg) translate(3px, 5px)' : 'none';
    bar2.style.opacity = open ? '0' : '1';
    bar3.style.transform = open ? 'rotate(-45deg) translate(3px, -5px)' : 'none';
  });

  // Đóng menu khi bấm 1 link
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      open = false;
      mobileMenu.classList.remove('open');
      bar1.style.transform = 'none';
      bar2.style.opacity = '1';
      bar3.style.transform = 'none';
    });
  });
});
