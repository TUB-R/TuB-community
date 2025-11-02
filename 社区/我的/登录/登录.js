document.addEventListener("DOMContentLoaded", () => {
    const $ = id => document.getElementById(id);
    const loginBtn = $("loginBtn");
    const registerLink = $("registerLink");
    const forgetLink = $("forgetLink");

    let isProcessing = false;

    async function handleLogin() {
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
            const response = await fetch("../../数据/登录数据/登录.json", { cache: "no-cache" });
            if (!response.ok) throw new Error(`无法读取用户数据文件：HTTP ${response.status}`);

            const users = await response.json();
            if (!Array.isArray(users)) throw new Error("用户数据格式错误，必须是数组");

            const matched = users.some(u => u.username === username && u.password === password);

            alert(matched ? "登录成功！" : "用户名或密码错误！");
            if (matched) window.location.href = "../导航栏/index.html";
        } catch (err) {
            console.error("读取用户数据出错：", err);
            alert("系统错误，请稍后再试！");
        } finally {
            isProcessing = false;
        }
    }

    loginBtn.addEventListener("click", handleLogin);
    registerLink.addEventListener("click", e => {
        e.preventDefault();
        window.location.href = "../注册/注册.html";
    });
    forgetLink.addEventListener("click", e => {
        e.preventDefault();
        window.location.href = "找回密码.html";
    });
});