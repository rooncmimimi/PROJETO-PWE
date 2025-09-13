document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert("Nenhum usuário logado.");
    location.href = 'login.html';
    return;
  }

  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const bioInput = document.getElementById('bio');
  const avatarInput = document.getElementById('avatar');
  const avatarPreview = document.getElementById('avatarPreview');

  // Preenche campos
  nomeInput.value = currentUser.nome || '';
  emailInput.value = currentUser.email || '';
  bioInput.value = currentUser.bio || '';
  if (currentUser.avatar) {
    avatarPreview.src = currentUser.avatar;
    avatarPreview.style.display = 'block';
  }

  // Pré-visualização da foto
  avatarInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        avatarPreview.src = e.target.result;
        avatarPreview.style.display = 'block';
      }
      reader.readAsDataURL(file);
    }
  });

  // Salvar alterações
  document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    currentUser.nome = nomeInput.value;
    currentUser.email = emailInput.value;
    currentUser.bio = bioInput.value;
    if (avatarPreview.src) currentUser.avatar = avatarPreview.src;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
      users[index] = currentUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      alert("Alterações feitas!");
    }
  });

  // Excluir conta
  document.getElementById('deleteAccount').addEventListener('click', function() {
    if (confirm("Tem certeza que deseja excluir sua conta?")) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users = users.filter(u => u.email !== currentUser.email);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem('currentUser');
      alert("Conta excluída com sucesso!");
      location.href = 'index.html';
    }
  });
});
