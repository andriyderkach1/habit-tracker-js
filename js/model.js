export default class HabitModel {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    this.habits = this.currentUser
      ? JSON.parse(localStorage.getItem(`habits_${this.currentUser.email}`)) || []
      : [];
  }

  registerUser(user) {
    if (this.users.some(u => u.email === user.email)) {
      throw new Error('Email already exists');
    }
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  loginUser(email, password) {
    const u = this.users.find(u => u.email === email && u.password === password);
    if (u) {
      this.currentUser = u;
      localStorage.setItem('currentUser', JSON.stringify(u));
      this.habits = JSON.parse(localStorage.getItem(`habits_${email}`)) || [];
      return true;
    }
    return false;
  }

  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.habits = [];
  }

  getCurrentUser() {
    return this.currentUser;
  }

  addHabit(name, description) {
    if (!this.currentUser) return;
    this.habits.push({ name, description, completed: false });
    this._saveHabits();
  }

  completeHabit(i) {
    if (!this.currentUser) return;
    this.habits[i].completed = true;
    this._saveHabits();
  }

  resetHabit(i) {
    if (!this.currentUser) return;
    this.habits[i].completed = false;
    this._saveHabits();
  }

  deleteHabit(i) {
    if (!this.currentUser) return;
    this.habits.splice(i, 1);
    this._saveHabits();
  }

  getHabits() {
    return this.habits;
  }

  _saveHabits() {
    localStorage.setItem(
      `habits_${this.currentUser.email}`,
      JSON.stringify(this.habits)
    );
  }
}
