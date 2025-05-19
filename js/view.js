export default class HabitView {
  renderProfile(user) {
    document.querySelector('#profile-name').textContent   = user.name;
    document.querySelector('#profile-email').textContent  = user.email;
    document.querySelector('#profile-dob').textContent    = user.dob;
    document.querySelector('#profile-gender').textContent = user.gender;
  }

  renderHabits(habits) {
    const list = document.querySelector('.list-group');
    list.innerHTML = '';
    habits.forEach((h, i) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex flex-column' + (h.completed ? ' list-group-item-success' : '');

      const header = document.createElement('div');
      header.className = 'd-flex justify-content-between align-items-center';
      header.innerHTML = `
        <span>${h.name}</span>
        <div>
          <button class="btn btn-link btn-sm p-0 me-2" data-action="toggle" data-index="${i}">▼</button>
          <button class="btn btn-success btn-sm me-2" data-action="complete" data-index="${i}">Completed</button>
          <button class="btn btn-secondary btn-sm me-2" data-action="reset" data-index="${i}">Reset</button>
          <button class="btn btn-danger btn-sm" data-action="delete" data-index="${i}">Delete</button>
        </div>
      `;

      const desc = document.createElement('div');
      desc.className = 'habit-desc';
      desc.dataset.descIndex = i;
      desc.innerHTML = `<hr><strong>Description:</strong> ${h.description}`;

      li.append(header, desc);
      list.appendChild(li);
    });
  }

  showError(msg) {
    alert(msg);
  }
}
