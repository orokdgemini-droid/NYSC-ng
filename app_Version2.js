// app.js — client-side logic for NYSC ng prototype

// Demo account data (mocked)
const DEMO_USERS = {
  corper: {
    username: 'corper',
    password: 'nysc123',
    fullName: 'Corper John Doe',
    status: 'Active',
    callUp: null,
    avatar: 'https://via.placeholder.com/180x180.png?text=Passport'
  }
};

function $(sel){ return document.querySelector(sel); }
function redirect(path){ location.href = path; }

// Simple auth helpers using localStorage (demo-only)
const Auth = {
  login(username, password){
    const user = DEMO_USERS[username];
    if(!user) return { ok:false, msg:'Invalid username or password.' };
    if(password !== user.password) return { ok:false, msg:'Invalid username or password.' };
    // store session object
    const session = {
      username: user.username,
      fullName: user.fullName,
      status: user.status,
      callUp: user.callUp,
      avatar: user.avatar,
      created: Date.now()
    };
    localStorage.setItem('nysc_session', JSON.stringify(session));
    return { ok:true, session };
  },
  getSession(){
    const raw = localStorage.getItem('nysc_session');
    if(!raw) return null;
    try { return JSON.parse(raw); } catch(e){ return null; }
  },
  logout(){
    localStorage.removeItem('nysc_session');
  }
}

/* ---- Login page behavior ---- */
if (document.getElementById('login-form')){
  const form = $('#login-form');
  const errorBox = $('#error');
  const usernameInput = $('#username');
  const passwordInput = $('#password');
  const togglePw = $('#toggle-pw');

  // quick redirect if already logged in
  if(Auth.getSession()){
    redirect('dashboard.html');
  }

  togglePw.addEventListener('click', ()=>{
    const isPw = passwordInput.type === 'password';
    passwordInput.type = isPw ? 'text' : 'password';
    togglePw.textContent = isPw ? 'Hide' : 'Show';
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    errorBox.hidden = true;
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if(!username || !password){
      errorBox.textContent = 'Please enter both username and password.';
      errorBox.hidden = false;
      return;
    }

    const result = Auth.login(username, password);
    if(!result.ok){
      errorBox.textContent = result.msg;
      errorBox.hidden = false;
      return;
    }

    // success
    redirect('dashboard.html');
  });
}

/* ---- Dashboard behavior ---- */
if (document.getElementById('welcome')){
  // guard: only accessible if logged in
  const session = Auth.getSession();
  if(!session){
    // not authenticated — redirect to login
    redirect('index.html');
  } else {
    // populate fields
    const displayName = $('#displayName');
    const fullNameField = $('#fullName');
    const avatarImg = $('#avatarImg');
    const preview = $('#preview');
    const usernameSummary = $('#summaryUsername');
    const userStatus = $('#userStatus');
    const callUpBox = $('#callUp');

    displayName.textContent = session.fullName || session.username;
    fullNameField.value = session.fullName || session.username;
    avatarImg.src = session.avatar || 'https://via.placeholder.com/180x180.png?text=Passport';
    preview.src = avatarImg.src;
    usernameSummary.textContent = session.username;
    userStatus.textContent = session.status || 'Active';
    callUpBox.textContent = session.callUp || 'Not available';

    // passport upload preview
    const passportInput = $('#passportUpload');
    passportInput.addEventListener('change', (ev)=>{
      const file = ev.target.files && ev.target.files[0];
      if(!file) return;
      if(!file.type.startsWith('image/')){
        alert('Please select an image file.');
        return;
      }
      const url = URL.createObjectURL(file);
      preview.src = url;
      avatarImg.src = url;
      // store preview in session for user convenience (not uploaded)
      const s = Auth.getSession() || {};
      s.avatar = url;
      localStorage.setItem('nysc_session', JSON.stringify(s));
    });

    // logout
    $('#logoutBtn').addEventListener('click', ()=>{
      Auth.logout();
      redirect('index.html');
    });
  }
}