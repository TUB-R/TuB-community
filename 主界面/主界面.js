// 页面加载完成后执行
window.onload = function() {
    // 初始化时间更新
    updateTime();
    setInterval(updateTime, 1000);
    
    // 加载弹窗配置
    loadModals();
};

// 时间更新功能
function updateTime() {
    const now = new Date();
    document.getElementById('date').textContent = now.toLocaleDateString('zh-CN');
    document.getElementById('time').textContent = now.toLocaleTimeString('zh-CN');
}

// 页面跳转功能
function jumpToPage() {
    window.location.href = './社区/主页/主页.html'; // 替换为实际目标页面路径
}

// 弹窗相关功能
let modalQueue = [];
let currentModalIndex = 0;
let backdropClickHandler = null;
let totalModalCount = 0; // 新增：存储原始弹窗总数量（永久不变）

// 加载弹窗配置
function loadModals() {
    fetch('主界面/公告.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(configs => {
            if (!configs || configs.length === 0) {
                console.log('没有弹窗配置');
                closeModal();
                return;
            }
            modalQueue = [...configs];
            totalModalCount = configs.length; // 初始化原始总数量
            showNextModal();
        })
        .catch(error => {
            console.error('加载弹窗配置时出错:', error);
            closeModal();
        });
}

// 显示下一个弹窗
function showNextModal() {
    // 移除之前的事件监听器
    if (backdropClickHandler) {
        document.getElementById('modalOverlay').removeEventListener('click', backdropClickHandler);
        backdropClickHandler = null;
    }
    
    if (modalQueue.length === 0) {
        closeModal();
        return;
    }
    
    const config = modalQueue[0];
    let content = '';
    
    // 构建弹窗内容
    if (config.标题) {
        content += `
            <div class="modal-header">
                <h3 class="modal-title">${config.标题}</h3>
            </div>
        `;
    }
    
    if (config.内容) {
        content += `<div class="modal-body">${config.内容}</div>`;
    }
    
    // 构建按钮区域
    let buttons = '';
    if (config.显示取消按钮) {
        buttons += `<button class="modal-btn cancel-btn" id="cancelBtn">取消</button>`;
    }
    if (config.显示分享按钮) {
        buttons += `<button class="modal-btn share-btn" id="shareBtn">分享</button>`;
    }
    if (config.显示确定按钮) {
        buttons += `<button class="modal-btn confirm-btn" id="confirmBtn">确定</button>`;
    }
    
    if (buttons) {
        content += `<div class="modal-footer">${buttons}</div>`;
    }
    
    // 添加弹窗指示器：使用原始总数量totalModalCount
    content += `<div class="modal-indicator">${currentModalIndex + 1}/${totalModalCount}</div>`;
    
    // 渲染弹窗
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('modalOverlay').style.display = 'flex';
    
    // 绑定按钮事件
    bindModalEvents(config);
}

// 绑定弹窗按钮事件
function bindModalEvents(config) {
    // 确定按钮
    if (config.显示确定按钮) {
        document.getElementById('confirmBtn').addEventListener('click', function() {
            modalQueue.shift();
            currentModalIndex++;
            showNextModal();
        });
    }
    
    // 取消按钮
    if (config.显示取消按钮) {
        document.getElementById('cancelBtn').addEventListener('click', function() {
            modalQueue.shift();
            currentModalIndex++;
            showNextModal();
        });
    }
    
    // 分享按钮
    if (config.显示分享按钮) {
        document.getElementById('shareBtn').addEventListener('click', function() {
            navigator.clipboard.writeText(config.分享内容 || config.内容 || '')
                .then(() => {
                    const toast = document.getElementById('toast');
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 2000);
                })
                .catch(err => {
                    console.error('复制失败:', err);
                });
        });
    }
    
    // 空白处点击关闭
    if (config.允许点击空白处关闭) {
        backdropClickHandler = function(e) {
            if (e.target === this) {
                modalQueue.shift();
                currentModalIndex++;
                showNextModal();
            }
        };
        document.getElementById('modalOverlay').addEventListener('click', backdropClickHandler);
    }
}

// 关闭弹窗
function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}
