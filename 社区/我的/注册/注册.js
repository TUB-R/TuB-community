document.addEventListener("DOMContentLoaded", () => {
    const $ = id => document.getElementById(id);
    const registerBtn = $("registerBtn");
    const loginLink = $("loginLink");

    let isProcessing = false;

    async function handleRegister() {
        if (isProcessing) return;
        isProcessing = true;

        const username = $("username").value.trim();
        const password = $("password").value.trim();

        if (!username || !password) {
            alert("请输入用户名和密码！");
            isProcessing = false;
            return;
        }

        try {
            // 尝试读取本地用户数据
            let users = JSON.parse(localStorage.getItem("userData") || "[]");

            // 检查用户名是否已存在
            if (users.some(u => u.username === username)) {
                alert("用户名已存在，请更换用户名！");
                isProcessing = false;
                return;
            }

            // 添加新用户
            users.push({ username, password });

            // 保存回 localStorage（模拟写入 JSON）
            localStorage.setItem("userData", JSON.stringify(users));

            alert("注册成功！即将跳转到登录页面。");
            window.location.href = "../登录/登录.html";
        } catch (err) {
            console.error("注册出错：", err);
            alert("系统错误，请稍后再试！");
        } finally {
            isProcessing = false;
        }
    }

    // 绑定事件
    registerBtn.addEventListener("click", handleRegister);
    loginLink.addEventListener("click", e => {
        e.preventDefault();
        window.location.href = "../登录/登录.html";
    });
});