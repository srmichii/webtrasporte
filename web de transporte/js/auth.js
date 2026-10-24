/**
 * EDGERUNNER FREIGHT // AUTHENTICATION SYSTEM
 * LocalStorage mock backend para clientes y admin
 */

const USERS_KEY = 'cyberfreight_users';
const SESSION_KEY = 'cyberfreight_session';

// Inicializar la base de datos local y usuario admin por defecto
function initAuthDB() {
  let users = JSON.parse(localStorage.getItem(USERS_KEY));
  if (!users) {
    users = {
      'admin': {
        username: 'admin',
        password: '123',
        role: 'admin',
        domicilio: 'Corpo Plaza, Arasaka Tower',
        history: []
      }
    };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

// Obtener todos los usuarios
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}

// Guardar usuarios
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Obtener sesión actual
function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);
  if (session) {
    const users = getUsers();
    return users[session];
  }
  return null;
}

// Registrar nuevo cliente
function registerUser(username, password, domicilio) {
  const users = getUsers();
  if (users[username]) {
    return { success: false, message: 'El usuario ya existe en la red.' };
  }
  
  users[username] = {
    username,
    password,
    role: 'client',
    domicilio,
    history: []
  };
  saveUsers(users);
  
  // Auto-login
  localStorage.setItem(SESSION_KEY, username);
  return { success: true, message: 'Registro exitoso. Conectado a la red.' };
}

// Iniciar sesión
function loginUser(username, password) {
  const users = getUsers();
  const user = users[username];
  
  if (user && user.password === password) {
    localStorage.setItem(SESSION_KEY, username);
    return { success: true, message: `Conexión establecida, ${username}.` };
  }
  return { success: false, message: 'Credenciales inválidas o ICE bloqueado.' };
}

// Cerrar sesión
function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  return { success: true, message: 'Desconectado de la red exitosamente.' };
}

// Agregar compra al historial del usuario activo
function addPurchaseToHistory(purchaseData) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const users = getUsers();
    
    // Add date
    purchaseData.date = new Date().toLocaleString('es-MX');
    
    users[currentUser.username].history.push(purchaseData);
    saveUsers(users);
  }
}

// Lógica de UI Auth
function updateAuthUI() {
  const user = getCurrentUser();
  const btnAuth = document.getElementById('btn-nav-auth-text');
  if (btnAuth) {
    if (user) {
      btnAuth.textContent = user.username.toUpperCase();
    } else {
      btnAuth.textContent = 'NET LOG-IN';
    }
  }
}

// Modales Funciones
window.openLoginModal = function() {
  document.getElementById('auth-modal-overlay').classList.add('active');
  document.getElementById('login-view').style.display = 'block';
  document.getElementById('register-view').style.display = 'none';
}

window.closeAuthModal = function() {
  const ol = document.getElementById('auth-modal-overlay');
  if(ol) ol.classList.remove('active');
  
  const cpl = document.getElementById('client-panel-overlay');
  if(cpl) cpl.classList.remove('active');
  
  const apl = document.getElementById('admin-panel-overlay');
  if(apl) apl.classList.remove('active');
}

window.openClientPanel = function() {
  const user = getCurrentUser();
  if (!user) return;
  
  document.getElementById('client-panel-overlay').classList.add('active');
  document.getElementById('cp-username').textContent = user.username;
  document.getElementById('cp-domicilio').textContent = user.domicilio;
  
  // Render History
  const historyList = document.getElementById('cp-history-list');
  historyList.innerHTML = '';
  if (user.history.length === 0) {
    historyList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No hay despachos registrados.</p>';
  } else {
    user.history.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';
      div.style = 'background: rgba(255,255,255,0.05); padding: 12px; margin-bottom: 8px; border-radius: 6px; border-left: 2px solid var(--lucy-cyan);';
      div.innerHTML = `
        <div style="display:flex; justify-content: space-between; margin-bottom: 5px;">
          <span class="badge-neon badge-cyan">${item.ticketId}</span>
          <span style="color: var(--text-secondary); font-size: 0.8rem;">${item.date}</span>
        </div>
        <div style="font-size: 0.9rem; color: #fff;">Destino: ${item.destination}</div>
        <div style="font-size: 0.9rem; color: var(--lucy-cyan); font-family: var(--font-mono);">Total: ${item.total}</div>
      `;
      historyList.appendChild(div);
    });
  }
}

window.openAdminPanel = function() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') return;
  
  document.getElementById('admin-panel-overlay').classList.add('active');
  
  // Render Client List
  const users = getUsers();
  const clientList = document.getElementById('ap-client-list');
  clientList.innerHTML = '';
  
  Object.values(users).forEach(u => {
    if (u.role === 'client') {
      const div = document.createElement('div');
      div.className = 'history-item';
      div.style = 'background: rgba(255,255,255,0.05); padding: 12px; margin-bottom: 8px; border-radius: 6px;';
      div.innerHTML = `
        <div style="display:flex; justify-content: space-between; margin-bottom: 5px;">
          <span style="color: #fff; font-weight: bold;">${u.username}</span>
          <span class="badge-neon badge-pink">${u.history.length} despachos</span>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-secondary);">Domicilio: ${u.domicilio}</div>
      `;
      clientList.appendChild(div);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAuthDB();
  updateAuthUI();

  // Navigation button
  const btnAuthTop = document.getElementById('btn-nav-auth');
  if (btnAuthTop) {
    btnAuthTop.addEventListener('click', (e) => {
      e.preventDefault();
      const user = getCurrentUser();
      if (user) {
        if (user.role === 'admin') openAdminPanel();
        else openClientPanel();
      } else {
        openLoginModal();
      }
    });
  }

  // Bind Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = document.getElementById('login-user').value.trim();
      const p = document.getElementById('login-pass').value.trim();
      const res = loginUser(u, p);
      if (res.success) {
        showToast(res.message);
        closeAuthModal();
        updateAuthUI();
      } else {
        showToast('⚠️ ' + res.message);
      }
    });
  }

  // Bind Register Form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = document.getElementById('reg-user').value.trim();
      const p = document.getElementById('reg-pass').value.trim();
      const d = document.getElementById('reg-domicilio').value.trim();
      
      const res = registerUser(u, p, d);
      if (res.success) {
        showToast(res.message);
        closeAuthModal();
        updateAuthUI();
      } else {
        showToast('⚠️ ' + res.message);
      }
    });
  }

  // Bind Logout Buttons
  document.querySelectorAll('.btn-logout').forEach(btn => {
    btn.addEventListener('click', () => {
      logoutUser();
      closeAuthModal();
      updateAuthUI();
      showToast('Desconectado de la red.');
    });
  });
});
