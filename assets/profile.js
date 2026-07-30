// Dữ liệu kỹ năng
const SKILLS = [
  { name: 'React / TypeScript', level: 90, color: '#2563eb' },
  { name: 'Node.js / Express', level: 80, color: '#7c3aed' },
  { name: 'Python / Django', level: 75, color: '#a855f7' },
  { name: 'PostgreSQL / MongoDB', level: 70, color: '#2563eb' },
  { name: 'Docker / DevOps', level: 65, color: '#7c3aed' },
  { name: 'UI/UX Design', level: 85, color: '#a855f7' },
];

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('skills-container');
  if (!container) return;

  SKILLS.forEach(function (s, i) {
    const wrap = document.createElement('div');
    wrap.style.marginBottom = '1.25rem';
    wrap.innerHTML =
      '<div class="flex justify-between" style="margin-bottom:0.375rem;">' +
        '<span class="font-medium" style="font-size:0.875rem;color:#334155;">' + s.name + '</span>' +
        '<span class="font-semibold" style="font-size:0.875rem;color:' + s.color + ';">' + s.level + '%</span>' +
      '</div>' +
      '<div style="width:100%;height:0.5rem;border-radius:9999px;background:#ede9fe;">' +
        '<div class="skill-bar-fill" data-level="' + s.level + '" style="width:0%;background:linear-gradient(90deg,' + s.color + ',#a855f7);"></div>' +
      '</div>';
    container.appendChild(wrap);

    const bar = wrap.querySelector('.skill-bar-fill');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            bar.style.width = s.level + '%';
          }, i * 100);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(wrap);
  });
});
