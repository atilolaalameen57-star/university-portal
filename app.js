/* ================================================
   MERIDIAN UNIVERSITY PORTAL
   app.js — Clean Architecture (Module Pattern)
   ================================================ */

/**
 * DATA LAYER — Pure data, no DOM interaction
 */
const Data = (() => {
  const user = {
    id: 'STU-2024-0042',
    name: 'Alex Johnson',
    firstName: 'Alex',
    initials: 'AJ',
    email: 'a.johnson@meridian.edu',
    phone: '+1 (555) 024-0042',
    department: 'Computer Science',
    year: '3rd Year',
    gpa: 3.72,
  };

  const credentials = { id: 'demo', password: 'demo123' };

  const courses = [
    { code: 'CS301', name: 'Data Structures', lecturer: 'Dr. M. Patel', credits: 3, progress: 72, room: 'Room 2B', color: 'color-1', icon: '🗃️' },
    { code: 'CS401', name: 'Software Engineering', lecturer: 'Prof. J. Williams', credits: 4, progress: 58, room: 'Lab 4', color: 'color-3', icon: '⚙️' },
    { code: 'MTH220', name: 'Calculus III', lecturer: 'Dr. A. Osei', credits: 3, progress: 80, room: 'Hall A', color: 'color-2', icon: '∫' },
    { code: 'ENG210', name: 'Technical Writing', lecturer: 'Ms. L. Torres', credits: 2, progress: 65, room: 'Room 5A', color: 'color-5', icon: '✍️' },
    { code: 'CS350', name: 'Computer Networks', lecturer: 'Dr. R. Kim', credits: 3, progress: 45, room: 'Lab 2', color: 'color-4', icon: '🌐' },
    { code: 'PHY101', name: 'Physics for Engineers', lecturer: 'Prof. B. Nkosi', credits: 3, progress: 90, room: 'Hall C', color: 'color-6', icon: '⚛️' },
  ];

  const grades = [
    { course: 'Data Structures', code: 'CS301', credits: 3, score: 88, grade: 'A', status: 'Pass' },
    { course: 'Software Engineering', code: 'CS401', credits: 4, score: 76, grade: 'B', status: 'Pass' },
    { course: 'Calculus III', code: 'MTH220', credits: 3, score: 91, grade: 'A', status: 'Pass' },
    { course: 'Technical Writing', code: 'ENG210', credits: 2, score: 82, grade: 'A', status: 'Pass' },
    { course: 'Computer Networks', code: 'CS350', credits: 3, score: 70, grade: 'B', status: 'Pass' },
    { course: 'Physics for Engineers', code: 'PHY101', credits: 3, score: 65, grade: 'C', status: 'Pass' },
  ];

  const gpaHistory = [
    { sem: 'Yr1 S1', val: 3.20 },
    { sem: 'Yr1 S2', val: 3.45 },
    { sem: 'Yr2 S1', val: 3.55 },
    { sem: 'Yr2 S2', val: 3.68 },
    { sem: 'Yr3 S1', val: 3.72 },
  ];

  const timetable = {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: [
      { time: '08:00', classes: ['CS301\nRoom 2B', '', 'CS301\nRoom 2B', '', 'MTH220\nHall A'] },
      { time: '10:30', classes: ['MTH220\nHall A', 'CS401\nLab 4', '', 'MTH220\nHall A', 'CS401\nLab 4'] },
      { time: '13:00', classes: ['', 'CS350\nLab 2', 'CS401\nLab 4', 'CS350\nLab 2', ''] },
      { time: '15:30', classes: ['ENG210\nRoom 5A', '', 'PHY101\nHall C', '', 'ENG210\nRoom 5A'] },
    ],
  };

  const colorMap = { 'CS301': 'c1', 'MTH220': 'c2', 'CS401': 'c3', 'CS350': 'c4', 'ENG210': 'c5', 'PHY101': 'c6' };

  const books = [
    { title: 'Introduction to Algorithms', author: 'Cormen et al.', subject: 'Computer Science', icon: '📘', available: true, cover: '#2a9d8f' },
    { title: 'Clean Code', author: 'Robert C. Martin', subject: 'Software Eng.', icon: '💻', available: true, cover: '#4a80c8' },
    { title: 'Calculus: Early Transcendentals', author: 'James Stewart', subject: 'Mathematics', icon: '📙', available: false, cover: '#e07070' },
    { title: 'Computer Networking: A Top-Down Approach', author: 'Kurose & Ross', subject: 'Networking', icon: '🌐', available: true, cover: '#c8813a' },
    { title: 'The Art of Technical Writing', author: 'L. Torres', subject: 'English', icon: '✍️', available: true, cover: '#9b59b6' },
    { title: 'University Physics Vol. 1', author: 'Young & Freedman', subject: 'Physics', icon: '⚛️', available: false, cover: '#e9b949' },
    { title: 'Design Patterns', author: 'Gang of Four', subject: 'Software Eng.', icon: '🧩', available: true, cover: '#2d6a8f' },
    { title: 'Linear Algebra Done Right', author: 'Sheldon Axler', subject: 'Mathematics', icon: '🔢', available: true, cover: '#2a9d8f' },
  ];

  const payments = [
    { desc: 'Tuition — Semester 2', date: 'Jan 15, 2026', amount: '$3,500' },
    { desc: 'Hostel Fee — Sem 2', date: 'Jan 18, 2026', amount: '$600' },
    { desc: 'Tuition — Semester 1', date: 'Aug 20, 2025', amount: '$3,500' },
    { desc: 'Lab & Tech Fee', date: 'Aug 20, 2025', amount: '$320' },
    { desc: 'Hostel Fee — Sem 1', date: 'Aug 22, 2025', amount: '$600' },
  ];

  return { user, credentials, courses, grades, gpaHistory, timetable, colorMap, books, payments };
})();


/**
 * UI LAYER — Pure DOM manipulation, receives data as arguments
 */
const UI = (() => {

  const renderCourses = (courses) => {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = courses.map(c => `
      <div class="course-card ${c.color}">
        <div style="font-size:30px; margin-bottom:8px">${c.icon}</div>
        <div class="course-code">${c.code}</div>
        <div class="course-name">${c.name}</div>
        <div class="course-info">
          👤 ${c.lecturer}<br>
          🏫 ${c.room} &nbsp;|&nbsp; ${c.credits} Credits
        </div>
        <div class="course-progress">
          <div class="progress-label"><span>Progress</span><span>${c.progress}%</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${c.progress}%"></div></div>
        </div>
      </div>
    `).join('');
  };

  const renderGrades = (grades) => {
    const body = document.getElementById('gradesBody');
    body.innerHTML = grades.map(g => {
      const gradeClass = g.grade.startsWith('A') ? 'grade-A' : g.grade.startsWith('B') ? 'grade-B' : 'grade-C';
      return `
        <tr>
          <td>${g.course}</td>
          <td>${g.code}</td>
          <td>${g.credits}</td>
          <td>${g.score}%</td>
          <td><span class="grade-pill ${gradeClass}">${g.grade}</span></td>
          <td class="status-pass">✓ ${g.status}</td>
        </tr>
      `;
    }).join('');
  };

  const renderGradeDist = (grades) => {
    const dist = document.getElementById('gradeDist');
    const counts = { A: 0, B: 0, C: 0 };
    grades.forEach(g => { if (g.grade.startsWith('A')) counts.A++; else if (g.grade.startsWith('B')) counts.B++; else counts.C++; });
    const max = grades.length;
    dist.innerHTML = Object.entries(counts).map(([grade, count]) => `
      <div class="dist-row">
        <div class="dist-label">${grade}</div>
        <div class="dist-track"><div class="dist-fill" style="width:${(count/max)*100}%"></div></div>
        <div class="dist-count">${count}</div>
      </div>
    `).join('');
  };

  const renderGpaHistory = (history) => {
    const el = document.getElementById('gpaHistory');
    const max = 4.0;
    el.innerHTML = history.map(h => `
      <div class="hist-row">
        <div class="hist-sem">${h.sem}</div>
        <div class="hist-track"><div class="hist-fill" style="width:${(h.val/max)*100}%"></div></div>
        <div class="hist-val">${h.val}</div>
      </div>
    `).join('');
  };

  const renderGpaChart = (history) => {
    const chart = document.getElementById('gpaChart');
    const max = 4.0;
    chart.innerHTML = history.map(h => {
      const pct = Math.round((h.val / max) * 100);
      return `
        <div class="gpa-bar-wrap">
          <div class="gpa-bar" data-val="${h.val}" style="height:${pct}%"></div>
          <div class="gpa-bar-label">${h.sem}</div>
        </div>
      `;
    }).join('');
  };

  const renderTimetable = ({ days, slots }, colorMap) => {
    const tt = document.getElementById('timetable');
    const headers = ['Time', ...days].map(d => `<div class="tt-head">${d}</div>`).join('');
    const rows = slots.map(slot => {
      const cells = slot.classes.map((cls, i) => {
        if (!cls.trim()) return `<div class="tt-cell empty"></div>`;
        const [name, room] = cls.split('\n');
        const code = name.trim();
        const cClass = colorMap[code] || 'c1';
        return `<div class="tt-cell filled ${cClass}"><div><strong>${code}</strong><span>${room || ''}</span></div></div>`;
      });
      return `<div class="tt-time">${slot.time}</div>${cells.join('')}`;
    }).join('');

    tt.innerHTML = `<div class="tt-grid">${headers}${rows}</div>`;
  };

  const renderLibrary = (books) => {
    const grid = document.getElementById('libraryGrid');
    grid.innerHTML = books.map(b => `
      <div class="book-card">
        <div class="book-cover" style="background:${b.cover}20">${b.icon}</div>
        <div class="book-info">
          <div class="book-title">${b.title}</div>
          <div class="book-author">${b.author}</div>
          <span class="book-tag ${b.available ? '' : 'unavail'}">${b.available ? '✓ Available' : '✗ Checked Out'}</span>
        </div>
      </div>
    `).join('');
  };

  const renderPayments = (payments) => {
    const list = document.getElementById('paymentList');
    list.innerHTML = payments.map(p => `
      <div class="pay-item">
        <div class="pay-info">
          <strong>${p.desc}</strong>
          <span>${p.date}</span>
        </div>
        <div class="pay-amt">+ ${p.amount}</div>
      </div>
    `).join('');
  };

  const setUserInfo = (user) => {
    const ids = { welcomeName: user.firstName, userChipName: user.name, profileName: user.name };
    Object.entries(ids).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  };

  const showModal = (title, body) => {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = body;
    document.getElementById('modal').classList.remove('hidden');
  };

  const hideModal = () => document.getElementById('modal').classList.add('hidden');

  const showLoginError = () => document.getElementById('loginError').classList.remove('hidden');
  const hideLoginError = () => document.getElementById('loginError').classList.add('hidden');

  const showScreen = (id) => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  };

  const navigateTo = (pageId, navEl) => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (navEl) navEl.classList.add('active');

    const title = pageId.charAt(0).toUpperCase() + pageId.slice(1).replace('-', ' & ');
    document.getElementById('topbarTitle').textContent = title;
  };

  return {
    renderCourses, renderGrades, renderGradeDist, renderGpaHistory,
    renderGpaChart, renderTimetable, renderLibrary, renderPayments,
    setUserInfo, showModal, hideModal, showLoginError, hideLoginError,
    showScreen, navigateTo
  };
})();


/**
 * APP CONTROLLER — Orchestrates Data + UI + user events
 */
const App = (() => {
  let allBooks = [];

  const init = () => {
    allBooks = Data.books;
  };

  const login = () => {
    const id = document.getElementById('loginId').value.trim();
    const pass = document.getElementById('loginPass').value.trim();

    if (id === Data.credentials.id && pass === Data.credentials.password) {
      UI.hideLoginError();
      UI.showScreen('portalScreen');
      UI.setUserInfo(Data.user);
      _renderAll();
    } else {
      UI.showLoginError();
    }
  };

  const logout = () => {
    UI.showScreen('loginScreen');
    document.getElementById('loginId').value = '';
    document.getElementById('loginPass').value = '';
  };

  const navigate = (pageId, navEl) => {
    UI.navigateTo(pageId, navEl);
    // Close notifications and sidebar on mobile
    document.getElementById('notifPanel').classList.add('hidden');
    document.getElementById('sidebar').classList.remove('open');
  };

  const toggleSidebar = () => {
    document.getElementById('sidebar').classList.toggle('open');
  };

  const toggleNotif = () => {
    document.getElementById('notifPanel').classList.toggle('hidden');
  };

  const searchLibrary = (query) => {
    const q = query.toLowerCase();
    const filtered = allBooks.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.subject.toLowerCase().includes(q)
    );
    UI.renderLibrary(filtered);
  };

  const payFee = () => {
    UI.showModal(
      '💳 Payment Portal',
      `<p style="color:#7a7a9a; font-size:14px; margin-bottom:16px">Amount due: <strong style="color:#e07070; font-size:18px">$420</strong></p>
       <p style="font-size:13.5px; color:#7a7a9a; line-height:1.7">Payment gateway integration would connect to your institution's payment provider (Stripe, Flutterwave, PayStack, etc.).</p>
       <p style="font-size:13px; color:#2a9d8f; margin-top:12px; background:rgba(42,157,143,0.08); padding:10px 14px; border-radius:8px">✓ Demo mode — no real payment processed.</p>`
    );
  };

  const editProfile = () => {
    UI.showModal(
      '✏️ Edit Profile',
      `<p style="font-size:14px; color:#7a7a9a; line-height:1.7">In a full implementation, this form would allow you to update your contact details, profile picture, and notification preferences.</p>
       <p style="font-size:13px; color:#4a80c8; margin-top:12px; background:rgba(74,128,200,0.08); padding:10px 14px; border-radius:8px">ℹ️ This is a demo portal — edits are not persisted.</p>`
    );
  };

  const closeModal = (e) => {
    if (e.target.id === 'modal') UI.hideModal();
  };

  const closeModalDirect = () => UI.hideModal();

  // Allow Enter key on login
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.getElementById('loginScreen').classList.contains('active')) {
      login();
    }
    if (e.key === 'Escape') UI.hideModal();
  });

  // Close notif panel when clicking outside
  document.addEventListener('click', (e) => {
    const notifBtn = document.querySelector('.notif-btn');
    const panel = document.getElementById('notifPanel');
    if (!notifBtn.contains(e.target)) panel.classList.add('hidden');
  });

  // Private: render all sections once after login
  const _renderAll = () => {
    UI.renderCourses(Data.courses);
    UI.renderGrades(Data.grades);
    UI.renderGradeDist(Data.grades);
    UI.renderGpaHistory(Data.gpaHistory);
    UI.renderGpaChart(Data.gpaHistory);
    UI.renderTimetable(Data.timetable, Data.colorMap);
    UI.renderLibrary(Data.books);
    UI.renderPayments(Data.payments);
  };

  init();

  return { login, logout, navigate, toggleSidebar, toggleNotif, searchLibrary, payFee, editProfile, closeModal, closeModalDirect };
})();