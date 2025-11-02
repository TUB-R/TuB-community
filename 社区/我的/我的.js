document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", function () {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("请输入用户名和密码！");
            return;
        }

        // 简单模拟验证，可改为后端请求
        if (username === "admin" && password === "123456") {
            alert("登录成功！");
            window.location.href = "index.html"; // 登录后跳转主页
        } else {
            alert("用户名或密码错误！");
        }
    });
});