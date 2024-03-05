import { usersRepository } from "./usersRepository.js";

const baseUrl = window.location.origin; // Получаем доменное имя, например, "https://example.com"

function logIn(event) {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;

  // Получаем всех пользователей из базы данных
  usersRepository
    .getAll()
    .then((users) => {
      // Проверяем каждого пользователя
      let userFound = false;
      users.forEach((user) => {
        if (user.name === name && user.password === password) {
          // Пользователь найден, аутентификация успешна
          userFound = true;
          localStorage.setItem("isAuthorithed", 1);
          // Используем относительный путь для перенаправления на главную страницу
          window.location.href = baseUrl + "/index.html";
        }
      });

      // Если пользователь не найден, выводим сообщение об ошибке
      if (!userFound) {
        document.querySelector("#message").style.color = "red";
        document.querySelector("#message").innerHTML =
          "User not found or incorrect password";
      }
    })
    .catch((error) => {
      // Обработка ошибок получения пользователей из базы данных, если необходимо
      console.error("Error fetching users:", error);
      document.querySelector("#message").style.color = "red";
      document.querySelector("#message").innerHTML =
        "An error occurred while trying to log in. Please try again later.";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login-form").addEventListener("submit", logIn);
});
