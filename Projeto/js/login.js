document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  let isValid = true;

  // Validação de e-mail
  if (!validateEmail(email)) {
    emailError.style.display = 'block';
    isValid = false;
  } else {
    emailError.style.display = 'none';
  }

  // Validação de senha (mínimo 6 caracteres)
  if (password.length < 6) {
    passwordError.style.display = 'block';
    isValid = false;
  } else {
    passwordError.style.display = 'none';
  }

  if (isValid) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("E-mail ou senha incorretos");
      return;
    }

    // Salva usuário logado
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redireciona direto para index.html
    location.href = 'index.html';
  }
});

// Função para validar e-mail
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
