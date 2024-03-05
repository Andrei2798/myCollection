import { usersRepository } from "./usersRepository.js";

function renderUserList(users) {
  const userList = document.querySelector("#user-list");
  userList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `Name: ${user.name}, Email: ${user.email}, Password: ${user.password}`;
    userList.appendChild(li);
  });
}

const addUserForm = document.querySelector("#user-form");
addUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameInput = document.querySelector("#name-input");
  const emailInput = document.querySelector("#email-input");
  const passwordInput = document.querySelector("#password-input");
  let randomID = Math.floor(Math.random() * 1000000000) + 1;
  let today = new Date().toLocaleDateString("ru-RU");

  try {
    await usersRepository.create({
      id: randomID,
      name: nameInput.value,
      password: passwordInput.value,
      email: emailInput.value,
      registrationDate: today,
    });

    const users = await usersRepository.getAll();
    renderUserList(users);

    // Очищаем поля формы
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    // Переходим на страницу index.html
    window.location.href = "../index.html";
  } catch (error) {
    console.error("Error adding user:", error);
    // В случае ошибки можно вывести сообщение пользователю или выполнить другие действия
  }
});

// Обработчик события для кнопки отображения списка пользователей
const showUsersButton = document.querySelector("#show-users-btn");
showUsersButton.addEventListener("click", async () => {
  // Получаем список пользователей и обновляем интерфейс
  const users = await usersRepository.getAll();
  renderUserList(users);
});
