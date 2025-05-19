import HabitModel from './model.js';
import HabitView  from './view.js';

const model = new HabitModel(),
      view  = new HabitView(),
      page  = location.pathname.split('/').pop();

const init = {
  'register.html': () => {
    const f = document.getElementById('register-form');
    f?.addEventListener('submit', e => {
      e.preventDefault();
      try {
        model.registerUser({
          name: f.name.value,
          email: f.email.value,
          gender: f.gender.value,
          dob: f.dob.value,
          password: f.password.value
        });
        location = 'login.html';
      } catch (err) {
        view.showError(err.message);
      }
    });
  },

  'login.html': () => {
    const f = document.getElementById('login-form');
    f?.addEventListener('submit', e => {
      e.preventDefault();
      if (model.loginUser(f.email.value, f.password.value)) {
        location = 'profile.html';
      } else {
        view.showError('Invalid email or password');
      }
    });
  },

  'profile.html': () => {
    if (!model.getCurrentUser()) return location = 'login.html';
    view.renderProfile(model.getCurrentUser());
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      model.logoutUser();
      location = 'login.html';
    });
  },

  'habits.html': () => {
    if (!model.getCurrentUser()) return location = 'login.html';
    view.renderHabits(model.getHabits());

    document.getElementById('habit-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      model.addHabit(f.habitName.value, f.habitDesc.value);
      view.renderHabits(model.getHabits());
      f.reset();
    });

    document.querySelector('.list-group')?.addEventListener('click', e => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const i = +btn.dataset.index;
      switch (btn.dataset.action) {
        case 'toggle': {
          const d = document.querySelector(`.habit-desc[data-desc-index="${i}"]`);
          const open = d.classList.toggle('open');
          d.style.maxHeight = open ? d.scrollHeight + 'px' : null;
          break;
        }
        case 'complete':
          model.completeHabit(i);
          view.renderHabits(model.getHabits());
          break;
        case 'reset':
          model.resetHabit(i);
          view.renderHabits(model.getHabits());
          break;
        case 'delete':
          model.deleteHabit(i);
          view.renderHabits(model.getHabits());
          break;
      }
    });
  }
};

init[page]?.();