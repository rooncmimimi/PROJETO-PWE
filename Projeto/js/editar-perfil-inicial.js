document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert("Nenhum usuário logado.");
    location.href = 'login.html';
    return;
  }

  const nomeInput = document.getElementById('nome');
  const avatarInput = document.getElementById('avatar');
  const avatarPreview = document.getElementById('avatarPreview');

  nomeInput.value = currentUser.nome || '';
  if (currentUser.avatar) {
    avatarPreview.src = currentUser.avatar;
    avatarPreview.style.display = 'block';
  }

  // Pré-visualização da imagem
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
    if (avatarPreview.src) currentUser.avatar = avatarPreview.src;
    currentUser.completedProfile = true; // marca que terminou o perfil inicial

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
      users[index] = currentUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      alert('Perfil inicial salvo com sucesso!');
      location.href = 'index.html'; // depois redireciona normalmente
    }
  });
});
