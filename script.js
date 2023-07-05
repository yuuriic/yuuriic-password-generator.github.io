document.getElementById("generateBtn").addEventListener("click", function() {
  var length = 10;
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?";
  var password = generatePassword(length, charset);

  var passwordDisplay = document.getElementById("passwordDisplay");
  var passwordText = document.getElementById("passwordText");

  if (!passwordText) {
    passwordText = document.createElement("span");
    passwordText.id = "passwordText";
    passwordText.textContent = "*".repeat(length);
    passwordDisplay.appendChild(passwordText);
  }

  passwordText.textContent = "*".repeat(length);
  passwordText.setAttribute("data-password", password);

  var showBtn = document.getElementById("showBtn");
  var copyBtn = document.getElementById("copyBtn");

  if (!showBtn && !copyBtn) {
    showBtn = document.createElement("button");
    showBtn.id = "showBtn";
    showBtn.textContent = "Visualizar senha";
    showBtn.addEventListener("click", function() {
      var passwordText = document.getElementById("passwordText");
      var password = passwordText.getAttribute("data-password");

      if (passwordText.textContent === "*".repeat(password.length)) {
        passwordText.textContent = password;
      } else {
        passwordText.textContent = "*".repeat(password.length);
      }
    });

    copyBtn = document.createElement("button");
    copyBtn.id = "copyBtn";
    copyBtn.textContent = "Copiar senha";
    copyBtn.addEventListener("click", function() {
      var passwordText = document.getElementById("passwordText");
      var password = passwordText.getAttribute("data-password");

      navigator.clipboard.writeText(password).then(function() {
        copyBtn.textContent = "Copiado!";
        setTimeout(function() {
          copyBtn.textContent = "Copiar senha";
        }, 2000);
      }).catch(function() {
        // Trate erros de cópia da área de transferência, se necessário
      });
    });

    var buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    buttonContainer.appendChild(showBtn);
    buttonContainer.appendChild(copyBtn);

    passwordDisplay.appendChild(document.createElement("br"));
    passwordDisplay.appendChild(passwordText);
    passwordDisplay.appendChild(buttonContainer);
  } else {
    passwordText.textContent = "*".repeat(length);
  }
});

function generatePassword(length, charset) {
  var password = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}
