/* Plantora's front-end authentication demo. Accounts are stored only in this browser. */
(function () {
  'use strict';

  const USERS_KEY = 'plantora-users';
  const SESSION_KEY = 'plantora-session';
  const PENDING_KEY = 'plantora-pending-user';

  function readStore(store, key, fallback) {
    try { return JSON.parse(store.getItem(key) || JSON.stringify(fallback)); }
    catch (_) { return fallback; }
  }

  function getUsers() { return readStore(localStorage, USERS_KEY, []); }
  function homePath() { return window.location.pathname.includes('/html/') ? '../index.html' : 'index.html'; }
  function loginPath() { return window.location.pathname.includes('/html/') ? 'login.html' : 'html/login.html'; }
  function accountPath() { return window.location.pathname.includes('/html/') ? 'account.html' : 'html/account.html'; }
  function field(id) { return document.getElementById(id); }

  window.showError = function (id, message) { const node = field(id); if (node) node.textContent = message; };
  window.clearError = function (id) { window.showError(id, ''); };
  window.setInputState = function (id, state) {
    const input = field(id);
    if (!input) return;
    input.classList.remove('valid', 'invalid');
    if (state) input.classList.add(state);
    input.setAttribute('aria-invalid', state === 'invalid' ? 'true' : 'false');
  };
  window.showBanner = function (id, show) {
    const node = field(id);
    if (!node) return;
    node.hidden = !show;
    node.style.display = show ? 'flex' : 'none';
  };
  function bannerMessage(id, message) { const node = field(id); if (node) node.textContent = message; }
  function setLoading(id, loading) {
    const button = field(id);
    if (!button) return;
    const label = button.querySelector('span');
    const spinner = button.querySelector('.btn-spinner');
    button.disabled = loading;
    button.setAttribute('aria-busy', String(loading));
    if (label) { label.hidden = loading; label.style.display = loading ? 'none' : 'inline'; }
    if (spinner) { spinner.hidden = !loading; spinner.style.display = loading ? 'block' : 'none'; }
  }

  window.togglePassword = function (inputId, button) {
    const input = field(inputId);
    if (!input) return;
    const visible = input.type === 'password';
    input.type = visible ? 'text' : 'password';
    button.querySelector('i').className = visible ? 'ti ti-eye' : 'ti ti-eye-off';
    button.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
  };

  window.checkStrength = function (value) {
    const fill = field('strengthFill');
    const label = field('strengthLabel');
    if (!fill || !label) return;
    const score = [value.length >= 6, /[A-Z]/.test(value), /\d/.test(value), /[^A-Za-z0-9]/.test(value)].filter(Boolean).length;
    const levels = [
      ['0%', '#e0ddd8', ''], ['25%', '#e05c3a', 'Weak'], ['50%', '#DCCCAC', 'Fair'],
      ['75%', '#99AD7A', 'Good'], ['100%', '#546B41', 'Strong']
    ];
    const [width, color, text] = levels[score];
    fill.style.width = width; fill.style.background = color; label.textContent = text; label.style.color = color;
  };

  function validEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
  function clearFormFeedback(errorIds, bannerId) {
    errorIds.forEach(window.clearError);
    window.showBanner(bannerId, false);
  }

  window.handleLogin = function () {
    clearFormFeedback(['emailError', 'passwordError'], 'loginError');
    window.showBanner('loginSuccess', false);
    const email = field('loginEmail')?.value.trim().toLowerCase() || '';
    const password = field('loginPassword')?.value || '';
    let isValid = true;
    if (!validEmail(email)) { window.showError('emailError', email ? 'Enter a valid email address.' : 'Email is required.'); window.setInputState('loginEmail', 'invalid'); isValid = false; }
    else window.setInputState('loginEmail', 'valid');
    if (password.length < 6) { window.showError('passwordError', password ? 'Password must be at least 6 characters.' : 'Password is required.'); window.setInputState('loginPassword', 'invalid'); isValid = false; }
    else window.setInputState('loginPassword', 'valid');
    if (!isValid) return;

    setLoading('loginBtn', true);
    window.setTimeout(function () {
      const user = getUsers().find((item) => item.email === email && item.password === password);
      setLoading('loginBtn', false);
      if (!user) {
        window.showBanner('loginError', true);
        bannerMessage('loginErrorMsg', 'Incorrect email or password. Please try again.');
        window.setInputState('loginEmail', 'invalid'); window.setInputState('loginPassword', 'invalid');
        return;
      }
      const session = { email: user.email, name: user.firstName, loggedIn: true };
      const storage = field('rememberMe')?.checked ? localStorage : sessionStorage;
      localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); storage.setItem(SESSION_KEY, JSON.stringify(session));
      window.showBanner('loginSuccess', true);
      window.setTimeout(() => { window.location.href = homePath(); }, 800);
    }, 350);
  };

  window.handleRegister = function () {
    const errors = ['firstNameError', 'lastNameError', 'registerEmailError', 'registerPasswordError', 'confirmPasswordError', 'termsError'];
    clearFormFeedback(errors, 'registerError');
    const firstName = field('firstName')?.value.trim() || '';
    const lastName = field('lastName')?.value.trim() || '';
    const email = field('registerEmail')?.value.trim().toLowerCase() || '';
    const password = field('registerPassword')?.value || '';
    const confirm = field('confirmPassword')?.value || '';
    let isValid = true;
    [['firstName', firstName, 'firstNameError', 'First name is required.'], ['lastName', lastName, 'lastNameError', 'Last name is required.']].forEach(([id, value, error, message]) => {
      if (!value) { window.showError(error, message); window.setInputState(id, 'invalid'); isValid = false; } else window.setInputState(id, 'valid');
    });
    if (!validEmail(email)) { window.showError('registerEmailError', email ? 'Enter a valid email address.' : 'Email is required.'); window.setInputState('registerEmail', 'invalid'); isValid = false; }
    else if (getUsers().some((user) => user.email === email)) { window.showError('registerEmailError', 'An account with this email already exists.'); window.setInputState('registerEmail', 'invalid'); isValid = false; }
    else window.setInputState('registerEmail', 'valid');
    if (password.length < 6) { window.showError('registerPasswordError', password ? 'Use at least 6 characters.' : 'Password is required.'); window.setInputState('registerPassword', 'invalid'); isValid = false; }
    else window.setInputState('registerPassword', 'valid');
    if (!confirm || confirm !== password) { window.showError('confirmPasswordError', confirm ? "Passwords don't match." : 'Please confirm your password.'); window.setInputState('confirmPassword', 'invalid'); isValid = false; }
    else window.setInputState('confirmPassword', 'valid');
    if (!field('agreeTerms')?.checked) { window.showError('termsError', 'Please agree to continue.'); isValid = false; }
    if (!isValid) { window.showBanner('registerError', true); bannerMessage('registerErrorMsg', 'Please fix the highlighted fields before continuing.'); return; }

    setLoading('registerBtn', true);
    window.setTimeout(function () {
      const users = getUsers(); users.push({ firstName, lastName, email, password }); localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(PENDING_KEY, JSON.stringify({ email, firstName }));
      window.location.href = 'register-success.html';
    }, 400);
  };

  window.googleLogin = function () { window.showToast('Google sign-in is not connected in this demo.', 'error'); };

  window.checkAuth = function () { return readStore(localStorage, SESSION_KEY, null) || readStore(sessionStorage, SESSION_KEY, null); };
  window.requireAuth = function () { const session = window.checkAuth(); if (!session) window.location.href = loginPath(); return session; };
  window.closeLogoutModal = function () { field('logoutOverlay')?.remove(); };
  window.confirmLogout = function () {
    localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); window.closeLogoutModal();
    window.showToast('Signed out successfully. See you soon!');
    window.setTimeout(() => { window.location.href = homePath(); }, 600);
  };
  window.showLogoutModal = function () {
    if (field('logoutOverlay')) return;
    const overlay = document.createElement('div'); overlay.id = 'logoutOverlay'; overlay.className = 'logout-overlay';
    overlay.innerHTML = '<section class="logout-modal" role="dialog" aria-modal="true" aria-labelledby="logout-heading"><div class="logout-modal-icon"><i class="ti ti-logout"></i></div><h3 id="logout-heading">Sign out?</h3><p>Are you sure you want to sign out of your Plantora account?</p><div class="logout-modal-btns"><button class="btn-cancel" type="button">Cancel</button><button class="btn-logout-confirm" type="button">Yes, sign out</button></div></section>';
    overlay.addEventListener('click', (event) => { if (event.target === overlay) window.closeLogoutModal(); });
    overlay.querySelector('.btn-cancel').addEventListener('click', window.closeLogoutModal);
    overlay.querySelector('.btn-logout-confirm').addEventListener('click', window.confirmLogout);
    document.body.appendChild(overlay); overlay.querySelector('.btn-cancel').focus();
  };
  window.showToast = function (message, type) {
    field('plantora-toast')?.remove();
    const toast = document.createElement('div'); toast.id = 'plantora-toast'; toast.className = 'plantora-toast ' + (type === 'error' ? 'is-error' : ''); toast.setAttribute('role', 'status'); toast.textContent = message;
    document.body.appendChild(toast); window.setTimeout(() => toast.remove(), 3000);
  };

  /* ── PROFILE DROPDOWN (My Account / Sign Out) ── */

  function closeProfileMenu() {
    field('profileDropdown')?.remove();
    document.removeEventListener('click', handleOutsideProfileClick, true);
    const trigger = document.querySelector('.navbar-icons a[href*="account"]');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function handleOutsideProfileClick(event) {
    const menu = field('profileDropdown');
    const trigger = document.querySelector('.navbar-icons a[href*="account"]');
    if (menu && !menu.contains(event.target) && trigger && !trigger.contains(event.target)) {
      closeProfileMenu();
    }
  }

  function toggleProfileMenu(anchorEl, session) {
    if (field('profileDropdown')) { closeProfileMenu(); return; }

    const menu = document.createElement('div');
    menu.id = 'profileDropdown';
    menu.className = 'profile-dropdown';
    menu.setAttribute('role', 'menu');
    menu.innerHTML =
      '<div class="profile-dropdown-header">' +
        '<span class="profile-dropdown-name">' + (session.name || 'Plant Parent') + '</span>' +
        '<span class="profile-dropdown-email">' + (session.email || '') + '</span>' +
      '</div>' +
      '<a href="' + accountPath() + '" class="profile-dropdown-item" role="menuitem"><i class="ti ti-user"></i> My Account</a>' +
      '<button type="button" class="profile-dropdown-item profile-dropdown-signout" role="menuitem"><i class="ti ti-logout"></i> Sign Out</button>';

    // append to the icon row, not inside the <a> itself — nesting a link/button
    // inside an anchor is invalid HTML and unreliable across browsers
    anchorEl.parentElement.appendChild(menu);
    anchorEl.setAttribute('aria-expanded', 'true');

    menu.querySelector('.profile-dropdown-signout').addEventListener('click', function (event) {
      event.stopPropagation();
      closeProfileMenu();
      window.showLogoutModal();
    });

    // wait a tick so this same click doesn't immediately trigger the outside-click close
    window.setTimeout(function () {
      document.addEventListener('click', handleOutsideProfileClick, true);
    }, 0);
  }

  window.updateNavAuth = function () {
    const profileLink = document.querySelector('.navbar-icons a[href*="account"]');
    if (!profileLink) return;
    closeProfileMenu();

    const session = window.checkAuth();
    const profile = profileLink.querySelector('.navbar-profile');

    if (session) {
      profileLink.href = '#';
      profileLink.setAttribute('aria-haspopup', 'true');
      profileLink.setAttribute('aria-expanded', 'false');
      profileLink.onclick = function (event) {
        event.preventDefault();
        toggleProfileMenu(profileLink, session);
      };
      if (profile) profile.innerHTML = '<span>' + (session.name?.charAt(0).toUpperCase() || 'P') + '</span>';
    } else {
      profileLink.href = loginPath();
      profileLink.onclick = null;
      profileLink.removeAttribute('aria-haspopup');
      profileLink.removeAttribute('aria-expanded');
    }
  };

  function populateAccountSidebar() {
    if (!document.querySelector('.account-page')) return;

    const session = window.checkAuth();
    if (!session) {
      window.location.href = 'login.html';
      return;
    }

    const user = getUsers().find((item) => item.email === session.email);
    if (!user) return;

    const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Plant Parent';
    const initials = [user.firstName, user.lastName]
      .filter(Boolean)
      .map((name) => name.charAt(0).toUpperCase())
      .join('') || 'P';
    document.querySelectorAll('.account-user-name').forEach((node) => { node.textContent = fullName; });
    document.querySelectorAll('.account-user-email').forEach((node) => { node.textContent = user.email || ''; });
    document.querySelectorAll('.account-avatar-initials').forEach((node) => { node.textContent = initials; });
  }

  function populateAccountPage() {
    const form = field('profileForm');
    if (!form) return;

    const session = window.checkAuth();
    if (!session) {
      window.location.href = 'login.html';
      return;
    }

    const user = getUsers().find((item) => item.email === session.email);
    if (!user) return;

    function fillProfile(currentUser) {
      field('firstName').value = currentUser.firstName || '';
      field('lastName').value = currentUser.lastName || '';
      field('email').value = currentUser.email || '';
      field('phone').value = currentUser.phone || '';
      field('address').value = currentUser.address || '';

      const fullName = [currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ') || 'Plant Parent';
      const initials = [currentUser.firstName, currentUser.lastName]
        .filter(Boolean)
        .map((name) => name.charAt(0).toUpperCase())
        .join('') || 'P';
      const nameDisplay = document.querySelector('.account-user-name');
      const emailDisplay = document.querySelector('.account-user-email');
      const avatar = document.querySelector('.account-avatar-initials');
      if (nameDisplay) nameDisplay.textContent = fullName;
      if (emailDisplay) emailDisplay.textContent = currentUser.email || '';
      if (avatar) avatar.textContent = initials;
    }

    fillProfile(user);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const updatedUser = {
        ...user,
        firstName: field('firstName').value.trim(),
        lastName: field('lastName').value.trim(),
        email: field('email').value.trim().toLowerCase(),
        phone: field('phone').value.trim(),
        address: field('address').value.trim()
      };
      const users = getUsers();
      const duplicateEmail = users.some((item) => item.email === updatedUser.email && item.email !== user.email);
      if (duplicateEmail) {
        window.showToast('That email is already linked to another account.', 'error');
        return;
      }

      const updatedUsers = users.map((item) => item.email === user.email ? updatedUser : item);
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      const updatedSession = { email: updatedUser.email, name: updatedUser.firstName, loggedIn: true };
      const sessionStore = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage;
      sessionStore.setItem(SESSION_KEY, JSON.stringify(updatedSession));
      user.firstName = updatedUser.firstName;
      user.lastName = updatedUser.lastName;
      user.email = updatedUser.email;
      user.phone = updatedUser.phone;
      user.address = updatedUser.address;
      fillProfile(user);
      window.updateNavAuth();
      window.showToast('Profile details saved.');
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { window.closeLogoutModal(); closeProfileMenu(); }
  });
  document.addEventListener('DOMContentLoaded', function () {
    window.updateNavAuth();
    populateAccountSidebar();
    populateAccountPage();
  });
}());
