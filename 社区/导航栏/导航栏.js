// 底部导航栏交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 为每个导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有链接的active类
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 为当前点击的链接添加active类
            this.classList.add('active');
        });
    });
});