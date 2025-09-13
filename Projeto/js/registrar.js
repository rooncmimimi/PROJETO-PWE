document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmError = document.getElementById('confirmError');

  let isValid = true;

  // Validação de e-mail
  if (!validateEmail(email)) {
    emailError.style.display = 'block';
    isValid = false;
  } else {
    emailError.style.display = 'none';
  }

  // Validação da senha
  if (password.length < 6) {
    passwordError.style.display = 'block';
    isValid = false;
  } else {
    passwordError.style.display = 'none';
  }

  // Confirmação de senha
  if (password !== confirmPassword) {
    confirmError.style.display = 'block';
    isValid = false;
  } else {
    confirmError.style.display = 'none';
  }

  if (isValid) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Verifica se o e-mail já existe
    if (users.some(u => u.email === email)) {
      alert('Este e-mail já está cadastrado');
      return;
    }

    // Cria o usuário e adiciona a propriedade completedProfile como false
    const newUser = {
      nome: nome,
      email: email,
      password: password,
      avatar: "",
      bio: "",
      completedProfile: false // usuário ainda não completou o perfil
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    alert('Cadastro realizado com sucesso! Agora complete seu perfil.');

    // Redireciona para a página de editar perfil inicial
    location.href = 'editar-perfil-inicial.html';
  }
});

// Função para validar e-mail
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
