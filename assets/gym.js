// ===== Sinh kế hoạch dựa trên thông tin người dùng =====
function generatePlan(weight, height, age, gender, goal, activity) {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  let bmiCategory = '';
  let bmiColor = '';
  if (bmi < 18.5) { bmiCategory = 'Thiếu cân'; bmiColor = '#2563eb'; }
  else if (bmi < 25) { bmiCategory = 'Bình thường'; bmiColor = '#16a34a'; }
  else if (bmi < 30) { bmiCategory = 'Thừa cân'; bmiColor = '#d97706'; }
  else { bmiCategory = 'Béo phì'; bmiColor = '#dc2626'; }

  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityFactor = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 }[activity];
  const tdee = Math.round(bmr * activityFactor);

  const calTarget = goal === 'lose' ? tdee - 400 : goal === 'gain' ? tdee + 350 : tdee;
  const protein = Math.round(weight * (goal === 'gain' ? 2.2 : 1.8));
  const fat = Math.round((calTarget * 0.25) / 9);
  const carbs = Math.round((calTarget - protein * 4 - fat * 9) / 4);

  const workouts = goal === 'lose' ? [
    { day: 'Thứ 2', focus: 'Cardio + Core', exercises: [
      { name: 'Chạy bộ / Elip', sets: '30–40 phút', note: 'Nhịp tim 65–75% max' },
      { name: 'Plank', sets: '3 × 45 giây', note: 'Giữ thẳng lưng' },
      { name: 'Mountain Climber', sets: '3 × 20 reps', note: 'Tốc độ vừa phải' },
      { name: 'Jumping Jack', sets: '3 × 30 reps', note: 'Khởi động và hạ nhiệt' },
    ]},
    { day: 'Thứ 4', focus: 'Full Body Strength', exercises: [
      { name: 'Squat', sets: '4 × 15 reps', note: 'Tạ vừa phải, kỹ thuật đúng' },
      { name: 'Push-Up', sets: '3 × 12 reps', note: 'Có thể dùng đầu gối nếu cần' },
      { name: 'Dumbbell Row', sets: '3 × 12 reps mỗi bên', note: 'Siết cơ lưng' },
      { name: 'Lunge', sets: '3 × 10 reps mỗi chân', note: 'Bước dài, giữ thăng bằng' },
    ]},
    { day: 'Thứ 6', focus: 'HIIT + Cardio', exercises: [
      { name: 'Burpee', sets: '4 × 10 reps', note: 'Nghỉ 30 giây giữa set' },
      { name: 'High Knee Run', sets: '4 × 30 giây', note: 'Nâng đầu gối lên cao' },
      { name: 'Box Jump', sets: '3 × 10 reps', note: 'Hạ cánh nhẹ nhàng' },
      { name: 'Cool-down Yoga', sets: '10 phút', note: 'Giãn cơ toàn thân' },
    ]},
  ] : goal === 'gain' ? [
    { day: 'Thứ 2', focus: 'Ngực + Vai + Tay Trước', exercises: [
      { name: 'Bench Press', sets: '5 × 6 reps', note: 'Tạ nặng, nghỉ 2 phút' },
      { name: 'Incline Dumbbell Press', sets: '4 × 8 reps', note: 'Tập trung cơ ngực trên' },
      { name: 'Overhead Press', sets: '4 × 8 reps', note: 'Không cong lưng' },
      { name: 'Barbell Curl', sets: '3 × 10 reps', note: 'Siết cơ bắp ở đỉnh' },
    ]},
    { day: 'Thứ 4', focus: 'Lưng + Tay Sau', exercises: [
      { name: 'Deadlift', sets: '5 × 5 reps', note: 'Bài tổng hợp quan trọng' },
      { name: 'Pull-Up / Lat Pulldown', sets: '4 × 8 reps', note: 'Co cơ lưng rộng' },
      { name: 'Barbell Row', sets: '4 × 8 reps', note: 'Giữ thẳng lưng' },
      { name: 'Tricep Pushdown', sets: '3 × 12 reps', note: 'Khuỷu tay sát người' },
    ]},
    { day: 'Thứ 6', focus: 'Chân + Mông + Bụng', exercises: [
      { name: 'Back Squat', sets: '5 × 5 reps', note: 'Ngồi sâu, gót không nhấc' },
      { name: 'Romanian Deadlift', sets: '4 × 8 reps', note: 'Căng cơ đùi sau' },
      { name: 'Leg Press', sets: '4 × 12 reps', note: 'Không khoá gối' },
      { name: 'Cable Crunch', sets: '4 × 15 reps', note: 'Siết bụng ở đỉnh' },
    ]},
  ] : [
    { day: 'Thứ 2', focus: 'Upper Body + Core', exercises: [
      { name: 'Push-Up Variations', sets: '4 × 12 reps', note: 'Wide/standard/diamond' },
      { name: 'Dumbbell Shoulder Press', sets: '3 × 10 reps', note: 'Kiểm soát chuyển động' },
      { name: 'Plank Hold', sets: '3 × 60 giây', note: 'Hít thở đều' },
      { name: 'Russian Twist', sets: '3 × 20 reps', note: 'Dùng tạ nhẹ' },
    ]},
    { day: 'Thứ 4', focus: 'Lower Body', exercises: [
      { name: 'Goblet Squat', sets: '4 × 12 reps', note: 'Giữ tạ trước ngực' },
      { name: 'Hip Thrust', sets: '4 × 15 reps', note: 'Siết mông ở đỉnh' },
      { name: 'Walking Lunge', sets: '3 × 12 reps mỗi chân', note: 'Bước qua phòng' },
      { name: 'Calf Raise', sets: '4 × 20 reps', note: 'Kiểm soát phần hạ' },
    ]},
    { day: 'Thứ 6', focus: 'Cardio + Flexibility', exercises: [
      { name: 'Cycling / Bơi lội', sets: '35 phút', note: 'Cường độ vừa phải' },
      { name: 'Yoga Flow', sets: '20 phút', note: 'Tập trung hít thở' },
      { name: 'Foam Rolling', sets: '10 phút', note: 'Toàn thân' },
    ]},
  ];

  const meals = goal === 'lose' ? [
    { time: '07:00', name: 'Bữa sáng', calories: Math.round(calTarget * 0.25), foods: ['Yến mạch + sữa ít béo', 'Trứng luộc × 2', 'Trái cây tươi (táo/chuối)'] },
    { time: '10:00', name: 'Bữa phụ sáng', calories: Math.round(calTarget * 0.1), foods: ['Sữa chua Hy Lạp không đường', 'Hạnh nhân × 15 hạt'] },
    { time: '12:30', name: 'Bữa trưa', calories: Math.round(calTarget * 0.3), foods: ['Cơm gạo lứt 150g', 'Ức gà nướng 200g', 'Rau xanh xào ít dầu'] },
    { time: '15:30', name: 'Bữa phụ chiều', calories: Math.round(calTarget * 0.1), foods: ['Protein shake (1 muỗng)', 'Chuối 1 quả'] },
    { time: '19:00', name: 'Bữa tối', calories: Math.round(calTarget * 0.25), foods: ['Cá hồi nướng 180g', 'Khoai lang luộc 100g', 'Salad rau nhiều loại'] },
  ] : goal === 'gain' ? [
    { time: '07:00', name: 'Bữa sáng', calories: Math.round(calTarget * 0.22), foods: ['Yến mạch + whey protein', 'Trứng × 4 (3 lòng trắng)', 'Bơ đậu phộng 2 muỗng'] },
    { time: '10:00', name: 'Bữa phụ sáng', calories: Math.round(calTarget * 0.13), foods: ['Bánh mì nguyên cám + pho mát', 'Sữa tươi nguyên kem 300ml'] },
    { time: '12:30', name: 'Bữa trưa', calories: Math.round(calTarget * 0.3), foods: ['Cơm trắng 200g', 'Thịt bò xào 200g', 'Rau củ luộc + ít mỡ'] },
    { time: '15:30', name: 'Pre-workout', calories: Math.round(calTarget * 0.1), foods: ['Chuối + mật ong', 'Creatine + caffeine (nếu dùng)'] },
    { time: '18:30', name: 'Post-workout', calories: Math.round(calTarget * 0.12), foods: ['Whey protein shake 40g', 'Gạo trắng 100g'] },
    { time: '20:00', name: 'Bữa tối', calories: Math.round(calTarget * 0.13), foods: ['Ức gà 250g + khoai lang', 'Casein protein trước ngủ'] },
  ] : [
    { time: '07:00', name: 'Bữa sáng', calories: Math.round(calTarget * 0.25), foods: ['Yến mạch + quả mọng', 'Trứng × 2 + phô mai ít béo', 'Café/trà xanh'] },
    { time: '12:30', name: 'Bữa trưa', calories: Math.round(calTarget * 0.35), foods: ['Cơm gạo lứt 150g', 'Cá/thịt gà 180g', 'Rau xanh đa dạng'] },
    { time: '15:00', name: 'Bữa phụ', calories: Math.round(calTarget * 0.1), foods: ['Trái cây + hạt hỗn hợp', 'Sữa chua'] },
    { time: '19:00', name: 'Bữa tối', calories: Math.round(calTarget * 0.3), foods: ['Đậu hũ/cá 150g', 'Gạo lứt 120g', 'Canh rau'] },
  ];

  const goalLabel = goal === 'lose' ? 'Giảm cân' : goal === 'gain' ? 'Tăng cơ' : 'Duy trì';

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    bmiColor,
    tdee,
    goal: goalLabel,
    workouts,
    nutrition: { calories: calTarget, protein, carbs, fat, meals },
  };
}

// ===== State cho các nhóm nút chọn =====
let gender = 'male';
let goal = 'maintain';
let activity = 'moderate';
let activeTab = 'workout';
let currentResult = null;

function setupToggleGroup(containerId, onSelect) {
  const container = document.getElementById(containerId);
  container.querySelectorAll('.toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      container.querySelectorAll('.toggle-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      onSelect(btn.dataset.value);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setupToggleGroup('gender-group', function (v) { gender = v; });
  setupToggleGroup('goal-group', function (v) { goal = v; });
  setupToggleGroup('activity-group', function (v) { activity = v; });

  document.getElementById('submit-btn').addEventListener('click', handleSubmit);
});

function showError(msg) {
  document.getElementById('error-box').innerHTML = msg
    ? '<div class="error-box">⚠️ ' + msg + '</div>'
    : '';
}

function handleSubmit() {
  const w = parseFloat(document.getElementById('weight').value);
  const h = parseFloat(document.getElementById('height').value);
  const a = parseInt(document.getElementById('age').value, 10);

  if (!w || !h || !a || w < 30 || w > 250 || h < 100 || h > 250 || a < 10 || a > 100) {
    showError('Vui lòng nhập đúng thông tin (Cân nặng 30–250kg, Chiều cao 100–250cm, Tuổi 10–100)');
    return;
  }
  showError('');

  currentResult = generatePlan(w, h, a, gender, goal, activity);
  activeTab = 'workout';
  renderResult();

  const section = document.getElementById('plan-result');
  section.classList.remove('hidden');
  setTimeout(function () {
    section.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function renderResult() {
  const result = currentResult;
  const container = document.getElementById('result-container');

  let html = '';

  // BMI + Stats card
  html += '<div class="white-card" style="padding:1.75rem;box-shadow:0 8px 40px rgba(124,58,237,0.1);">';
  html += '<h2 class="font-display font-bold text-indigo-900" style="font-size:1.5rem;margin-bottom:1.25rem;">Kết Quả Phân Tích</h2>';
  html += '<div class="grid grid-2 grid-md-4 gap-4">';
  html += statCard('Chỉ số BMI', result.bmi, result.bmiCategory, result.bmiColor);
  html += statCard('TDEE', result.tdee, 'kcal/ngày', '#7c3aed');
  html += statCard('Mục tiêu', result.goal, 'của bạn', '#2563eb');
  html += statCard('Protein/ngày', result.nutrition.protein + 'g', 'khuyến nghị', '#a855f7');
  html += '</div></div>';

  // Tab selector
  html += '<div class="flex gap-2" style="padding:0.25rem;border-radius:1rem;background:white;box-shadow:0 2px 12px rgba(124,58,237,0.08);">';
  html += '<button id="tab-workout" class="tab-btn" style="flex:1;padding:0.75rem;border:none;border-radius:0.75rem;font-weight:600;font-size:0.875rem;">🏋️ Lịch Tập Gym</button>';
  html += '<button id="tab-nutrition" class="tab-btn" style="flex:1;padding:0.75rem;border:none;border-radius:0.75rem;font-weight:600;font-size:0.875rem;">🥗 Thực Đơn</button>';
  html += '</div>';

  // Content placeholder
  html += '<div id="tab-content" class="animate-fade-in"></div>';

  // Navigation
  html += '<div class="white-card" style="padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:linear-gradient(135deg,#1e1b4b,#4c1d95);">';
  html += '<div class="flex flex-col" style="gap:1rem;justify-content:space-between;align-items:center;">';
  html += '<div style="text-align:center;"><p class="text-white font-semibold">Khám phá thêm</p><p class="text-purple-300" style="font-size:0.875rem;">Xem profile hoặc tin tức bóng đá</p></div>';
  html += '<div class="flex gap-3">';
  html += '<a href="index.html" class="btn-primary" style="padding:0.625rem 1rem;border-radius:0.75rem;font-size:0.875rem;font-weight:500;"><span>👤 Profile</span></a>';
  html += '<a href="football.html" class="btn-ghost" style="padding:0.625rem 1rem;border-radius:0.75rem;font-size:0.875rem;font-weight:500;">⚽ Bóng Đá</a>';
  html += '</div></div></div>';

  container.innerHTML = html;

  document.getElementById('tab-workout').addEventListener('click', function () { activeTab = 'workout'; renderTabButtons(); renderTabContent(); });
  document.getElementById('tab-nutrition').addEventListener('click', function () { activeTab = 'nutrition'; renderTabButtons(); renderTabContent(); });

  renderTabButtons();
  renderTabContent();
}

function statCard(label, value, sub, color) {
  return '<div style="text-align:center;border-radius:1rem;padding:1rem;background:#f8f7ff;border:1px solid #ede9fe;">' +
    '<div class="font-mono font-bold" style="font-size:1.5rem;margin-bottom:0.25rem;color:' + color + ';">' + value + '</div>' +
    '<div class="font-medium text-indigo-900" style="font-size:0.75rem;">' + label + '</div>' +
    '<div class="text-slate-400" style="font-size:0.75rem;margin-top:0.125rem;">' + sub + '</div>' +
    '</div>';
}

function renderTabButtons() {
  const wBtn = document.getElementById('tab-workout');
  const nBtn = document.getElementById('tab-nutrition');
  if (activeTab === 'workout') {
    wBtn.style.background = 'linear-gradient(135deg,#2563eb,#7c3aed)'; wBtn.style.color = 'white';
    nBtn.style.background = 'transparent'; nBtn.style.color = '#6d28d9';
  } else {
    nBtn.style.background = 'linear-gradient(135deg,#2563eb,#7c3aed)'; nBtn.style.color = 'white';
    wBtn.style.background = 'transparent'; wBtn.style.color = '#6d28d9';
  }
}

function renderTabContent() {
  const result = currentResult;
  const el = document.getElementById('tab-content');
  let html = '<div style="display:flex;flex-direction:column;gap:1rem;margin-top:1rem;">';

  if (activeTab === 'workout') {
    result.workouts.forEach(function (day) {
      html += '<div class="white-card" style="overflow:hidden;">';
      html += '<div class="flex items-center justify-between" style="padding:1rem 1.25rem;background:linear-gradient(135deg,#1e1b4b,#4c1d95);">';
      html += '<span class="text-white font-bold">' + day.day + '</span>';
      html += '<span class="text-purple-300" style="font-size:0.75rem;padding:0.25rem 0.75rem;border-radius:9999px;font-weight:500;background:rgba(168,85,247,0.3);">' + day.focus + '</span>';
      html += '</div><div style="padding:1rem;display:flex;flex-direction:column;gap:0.75rem;">';
      day.exercises.forEach(function (ex, idx) {
        html += '<div class="flex flex-col" style="gap:0.25rem;padding:0.5rem 0;' + (idx < day.exercises.length - 1 ? 'border-bottom:1px solid #ede9fe;' : '') + '">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.25rem;">';
        html += '<div><span class="font-medium text-indigo-900" style="font-size:0.875rem;">' + ex.name + '</span>';
        html += '<p class="text-slate-400" style="font-size:0.75rem;margin:0.125rem 0 0;">' + ex.note + '</p></div>';
        html += '<span class="chip" style="font-size:0.75rem;font-weight:600;white-space:nowrap;">' + ex.sets + '</span>';
        html += '</div></div>';
      });
      html += '</div></div>';
    });
  } else {
    // Macro summary
    html += '<div class="white-card" style="padding:1.25rem;">';
    html += '<h3 class="font-bold text-indigo-900" style="margin-bottom:1rem;">Macro Mục Tiêu / Ngày</h3>';
    html += '<div class="grid grid-4 gap-3 text-center">';
    html += macroCard('Calories', result.nutrition.calories, 'kcal', '#2563eb');
    html += macroCard('Protein', result.nutrition.protein, 'g', '#7c3aed');
    html += macroCard('Carbs', result.nutrition.carbs, 'g', '#a855f7');
    html += macroCard('Fat', result.nutrition.fat, 'g', '#6d28d9');
    html += '</div></div>';

    // Meals
    result.nutrition.meals.forEach(function (meal) {
      html += '<div class="white-card" style="overflow:hidden;">';
      html += '<div class="flex items-center justify-between" style="padding:0.75rem 1.25rem;background:linear-gradient(90deg,#1e1b4b,#4c1d95);">';
      html += '<div class="flex items-center gap-3">';
      html += '<span class="font-mono font-bold" style="font-size:0.75rem;padding:0.25rem 0.625rem;border-radius:9999px;background:rgba(168,85,247,0.3);color:#c4b5fd;">' + meal.time + '</span>';
      html += '<span class="text-white font-semibold" style="font-size:0.875rem;">' + meal.name + '</span>';
      html += '</div><span class="text-purple-300" style="font-size:0.75rem;font-weight:500;">' + meal.calories + ' kcal</span>';
      html += '</div><ul style="list-style:none;margin:0;padding:1rem;display:flex;flex-direction:column;gap:0.5rem;">';
      meal.foods.forEach(function (f) {
        html += '<li class="flex items-center gap-2 text-slate-600" style="font-size:0.875rem;">';
        html += '<span style="width:0.375rem;height:0.375rem;border-radius:9999px;flex-shrink:0;background:#7c3aed;"></span>' + f + '</li>';
      });
      html += '</ul></div>';
    });
  }

  html += '</div>';
  el.innerHTML = html;
}

function macroCard(label, val, unit, color) {
  return '<div style="border-radius:0.75rem;padding:0.75rem;background:#f8f7ff;">' +
    '<div class="font-mono font-bold" style="font-size:1.125rem;color:' + color + ';">' + val + '</div>' +
    '<div class="text-slate-400" style="font-size:0.75rem;">' + unit + '</div>' +
    '<div class="font-medium text-indigo-900" style="font-size:0.75rem;margin-top:0.125rem;">' + label + '</div>' +
    '</div>';
}
