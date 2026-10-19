function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (password.length < 4) {
        document.getElementById("message").textContent =
            "Пароль должен содержать минимум 4 символа.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("wovieUsers") || "[]");

    const foundUser = users.find(function(user) {
        return user.email === email;
    });

    if (foundUser) {
        document.getElementById("message").textContent =
            "Аккаунт с такой почтой уже существует.";
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("wovieUsers", JSON.stringify(users));

    document.getElementById("message").textContent =
        "Регистрация прошла успешно! Теперь можно войти.";

    event.target.reset();
}

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("wovieUsers") || "[]");

    const user = users.find(function(item) {
        return item.email === email && item.password === password;
    });

    if (user) {
        localStorage.setItem("wovieCurrentUser", user.name);

        document.getElementById("message").textContent =
            "Добро пожаловать, " + user.name + "!";
    } else {
        document.getElementById("message").textContent =
            "Неправильная почта или пароль. Сначала зарегистрируйся.";
    }
}

function showUser() {
    const name = localStorage.getItem("wovieCurrentUser");
    const place = document.getElementById("user-status");

    if (name && place) {
        place.textContent = "Вы вошли как " + name;
    }
}

function logoutUser() {
    localStorage.removeItem("wovieCurrentUser");
    alert("Вы вышли из аккаунта.");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", showUser);