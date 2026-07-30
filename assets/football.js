const FEATURED = {
  id: 1,
  title: 'Real Madrid vô địch Champions League lần thứ 16 lịch sử',
  excerpt: 'Đêm Wembley rực lửa, Real Madrid đã hạ Dortmund 2-0 trong trận chung kết để giành chức vô địch Champions League lần thứ 16, tiếp tục khẳng định vị thế "ông hoàng châu Âu".',
  img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop&auto=format',
  category: 'Champions League',
  time: '2 giờ trước',
  author: 'Minh Tuấn',
  readTime: '5 phút',
};

const NEWS_ITEMS = [
  { id: 2, title: 'Erling Haaland phá kỷ lục ghi bàn Premier League', excerpt: 'Tiền đạo người Na Uy đã ghi bàn thứ 37 mùa giải, phá vỡ kỷ lục mùa một mà Alan Shearer lập ra năm 1996. Man City tiếp tục bay cao.', img: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&h=360&fit=crop&auto=format', category: 'Premier League', time: '4 giờ trước', author: 'Quang Huy', readTime: '3 phút', categoryColor: '#3b82f6' },
  { id: 3, title: 'Xavi rời Barcelona cuối mùa, Luis Enrique là ứng viên số 1', excerpt: 'Sau chuỗi kết quả không ổn định, Xavi đã đạt thoả thuận rời Barça. Ban lãnh đạo đã tiếp xúc với Luis Enrique và đội ngũ cựu HLV PSG.', img: 'https://images.unsplash.com/photo-1565205506-4c1c3e90d2d1?w=600&h=360&fit=crop&auto=format', category: 'La Liga', time: '6 giờ trước', author: 'Thành Nam', readTime: '4 phút', categoryColor: '#a855f7' },
  { id: 4, title: 'Kylian Mbappé lập hat-trick ra mắt tại Bernabeu', excerpt: 'Chân sút người Pháp đã có màn ra mắt trong mơ khi ghi đến 3 bàn, giúp Real Madrid đè bẹp Celta Vigo 5-1. Màn trình diễn được CĐV tán thưởng nhiệt liệt.', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=600&h=360&fit=crop&auto=format', category: 'La Liga', time: '8 giờ trước', author: 'Lê Phong', readTime: '3 phút', categoryColor: '#7c3aed' },
  { id: 5, title: 'Việt Nam lọt vào vòng loại World Cup 2026 khu vực châu Á', excerpt: 'Đội tuyển Việt Nam giành chiến thắng ấn tượng 2-1 trước Indonesia, chính thức đảm bảo vị trí trong nhóm 18 đội vào vòng loại thứ ba.', img: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=360&fit=crop&auto=format', category: 'Bóng đá Việt Nam', time: '10 giờ trước', author: 'Hoàng Long', readTime: '4 phút', categoryColor: '#2563eb' },
  { id: 6, title: 'Jurgen Klopp trở lại dẫn dắt Bayern Munich', excerpt: 'Sau kỳ nghỉ ngơi, HLV người Đức đã ký hợp đồng 3 năm với Die Roten, hứa hẹn cuộc cách mạng tư duy tại đội bóng xứ Bavaria.', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=360&fit=crop&auto=format', category: 'Bundesliga', time: '12 giờ trước', author: 'Bảo Anh', readTime: '5 phút', categoryColor: '#d97706' },
  { id: 7, title: 'Inter Milan – Serie A Champion 2025/26: Simone Inzaghi tạo triều đại', excerpt: 'Với chức vô địch Serie A lần thứ 22, Inter Milan khẳng định vị thế số một Italy trong thập kỷ này dưới bàn tay nhào nặn của Inzaghi.', img: 'https://images.unsplash.com/photo-1551958219-acbc595a68c4?w=600&h=360&fit=crop&auto=format', category: 'Serie A', time: '14 giờ trước', author: 'Trọng Nghĩa', readTime: '4 phút', categoryColor: '#059669' },
];

const LIVE_SCORES = [
  { home: 'Man City', homeGoals: 3, away: 'Arsenal', awayGoals: 1, minute: "72'", league: 'Premier League', live: true },
  { home: 'Real Madrid', homeGoals: 2, away: 'Atletico', awayGoals: 2, minute: 'FT', league: 'La Liga', live: false },
  { home: 'Bayern', homeGoals: 4, away: 'Dortmund', awayGoals: 0, minute: "89'", league: 'Bundesliga', live: true },
  { home: 'PSG', homeGoals: 1, away: 'Lyon', awayGoals: 1, minute: "45+2'", league: 'Ligue 1', live: true },
];

const CATEGORIES = ['Tất cả', 'Premier League', 'La Liga', 'Champions League', 'Bundesliga', 'Serie A', 'Bóng đá Việt Nam'];

let activeCategory = 'Tất cả';
let searchQuery = '';
let expandedArticle = null;

document.addEventListener('DOMContentLoaded', function () {
  renderLiveScores();
  renderCategoryFilter();
  renderFeatured();
  renderNewsGrid();

  document.getElementById('search-input').addEventListener('input', function (e) {
    searchQuery = e.target.value;
    renderFeatured();
    renderNewsGrid();
  });
});

function renderLiveScores() {
  const el = document.getElementById('live-scores-container');
  let html = '';
  LIVE_SCORES.forEach(function (s) {
    html += '<div style="padding:0.75rem 1rem;border-top:1px solid rgba(255,255,255,0.08);">';
    html += '<div class="flex items-center justify-between" style="font-size:0.75rem;color:#c4b5fd;margin-bottom:0.375rem;">';
    html += '<span>' + s.league + '</span><span style="font-weight:700;color:' + (s.live ? '#fca5a5' : '#94a3b8') + ';">' + s.minute + '</span>';
    html += '</div><div class="flex items-center justify-between gap-2">';
    html += '<span class="text-white font-medium" style="flex:1;font-size:0.875rem;">' + s.home + '</span>';
    html += '<span class="font-mono font-bold" style="font-size:1.125rem;padding:0.125rem 0.75rem;border-radius:0.5rem;background:' + (s.live ? 'rgba(239,68,68,0.15)' : 'rgba(148,163,184,0.1)') + ';color:' + (s.live ? '#fca5a5' : '#94a3b8') + ';">' + s.homeGoals + ' – ' + s.awayGoals + '</span>';
    html += '<span class="text-white font-medium" style="flex:1;font-size:0.875rem;text-align:right;">' + s.away + '</span>';
    html += '</div></div>';
  });
  el.innerHTML = html;
}

function renderCategoryFilter() {
  const el = document.getElementById('category-filter');
  el.innerHTML = '';
  CATEGORIES.forEach(function (c) {
    const btn = document.createElement('button');
    btn.textContent = c;
    btn.className = 'toggle-btn' + (activeCategory === c ? ' active' : '');
    btn.style.flexShrink = '0';
    btn.style.padding = '0.5rem 0.75rem';
    btn.style.fontSize = '0.75rem';
    btn.addEventListener('click', function () {
      activeCategory = c;
      renderCategoryFilter();
      renderFeatured();
      renderNewsGrid();
    });
    el.appendChild(btn);
  });
}

function renderFeatured() {
  const el = document.getElementById('featured-article');
  if (activeCategory !== 'Tất cả' || searchQuery) {
    el.innerHTML = '';
    return;
  }
  const isExpanded = expandedArticle === 1;
  el.innerHTML =
    '<div class="card-hover rounded-3xl relative" style="overflow:hidden;cursor:pointer;box-shadow:0 8px 40px rgba(124,58,237,0.15);" id="featured-card">' +
      '<div class="news-img-overlay" style="height:20rem;">' +
        '<img src="' + FEATURED.img + '" alt="' + FEATURED.title + '" />' +
        '<div class="absolute" style="inset:0;background:linear-gradient(to top,rgba(30,27,75,0.95) 0%,rgba(30,27,75,0.5) 50%,transparent 100%);"></div>' +
      '</div>' +
      '<div class="absolute" style="bottom:0;left:0;right:0;padding:1.5rem;">' +
        '<div class="flex items-center gap-3" style="margin-bottom:0.75rem;">' +
          '<span style="padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.75rem;font-weight:700;background:linear-gradient(90deg,#2563eb,#7c3aed);color:white;">' + FEATURED.category + '</span>' +
          '<span class="text-purple-300" style="font-size:0.75rem;">' + FEATURED.time + '</span>' +
        '</div>' +
        '<h2 class="font-display font-bold text-white" style="font-size:1.5rem;line-height:1.3;margin-bottom:0.5rem;">' + FEATURED.title + '</h2>' +
        (isExpanded ? '<p class="text-purple-200 animate-fade-in" style="font-size:0.875rem;line-height:1.6;">' + FEATURED.excerpt + '</p>' : '') +
        '<div class="flex items-center gap-3 text-purple-300" style="margin-top:0.75rem;font-size:0.75rem;">' +
          '<span>✍️ ' + FEATURED.author + '</span><span>•</span><span>⏱ ' + FEATURED.readTime + ' đọc</span><span>•</span>' +
          '<span>' + (isExpanded ? '▲ Thu gọn' : '▼ Xem thêm') + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.getElementById('featured-card').addEventListener('click', function () {
    expandedArticle = isExpanded ? null : 1;
    renderFeatured();
  });
}

function renderNewsGrid() {
  const el = document.getElementById('news-grid');
  const filtered = NEWS_ITEMS.filter(function (n) {
    const matchCat = activeCategory === 'Tất cả' || n.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    el.innerHTML = '<div class="text-center" style="padding:4rem 0;">' +
      '<div style="font-size:3rem;margin-bottom:1rem;">🔍</div>' +
      '<p class="text-indigo-900 font-semibold" style="font-size:1.125rem;">Không tìm thấy bài viết</p>' +
      '<p class="text-slate-400" style="font-size:0.875rem;margin-top:0.25rem;">Thử thay đổi từ khoá hoặc danh mục</p>' +
      '</div>';
    return;
  }

  el.className = 'grid grid-md-2 grid-lg-3 gap-6';
  el.innerHTML = '';
  filtered.forEach(function (article) {
    const isExpanded = expandedArticle === article.id;
    const card = document.createElement('article');
    card.className = 'card-hover white-card';
    card.style.overflow = 'hidden';
    card.style.cursor = 'pointer';
    card.innerHTML =
      '<div class="news-img-overlay" style="height:11rem;"><img src="' + article.img + '" alt="' + article.title + '" /></div>' +
      '<div style="padding:1.25rem;">' +
        '<div class="flex items-center justify-between" style="margin-bottom:0.75rem;">' +
          '<span style="font-size:0.75rem;font-weight:700;padding:0.25rem 0.625rem;border-radius:9999px;background:' + article.categoryColor + '18;color:' + article.categoryColor + ';">' + article.category + '</span>' +
          '<span class="text-slate-400" style="font-size:0.75rem;">' + article.time + '</span>' +
        '</div>' +
        '<h3 class="font-display font-bold text-indigo-900" style="font-size:1rem;line-height:1.4;margin-bottom:0.5rem;">' + article.title + '</h3>' +
        '<p class="text-slate-500" style="font-size:0.875rem;line-height:1.6;' + (isExpanded ? '' : 'display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;') + '">' + article.excerpt + '</p>' +
        '<div class="flex items-center justify-between text-slate-400" style="margin-top:1rem;font-size:0.75rem;">' +
          '<span>✍️ ' + article.author + '</span>' +
          '<span style="color:#7c3aed;">⏱ ' + article.readTime + '</span>' +
        '</div>' +
      '</div>';
    card.addEventListener('click', function () {
      expandedArticle = isExpanded ? null : article.id;
      renderNewsGrid();
    });
    el.appendChild(card);
  });
}
