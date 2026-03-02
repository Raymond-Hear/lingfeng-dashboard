// 办公室可视化脚本
document.addEventListener('DOMContentLoaded', function() {
    initOffice();
    loadYesterdayMemo();
});

function initOffice() {
    const canvas = document.getElementById('office-canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置画布大小
    canvas.width = 800;
    canvas.height = 500;
    
    // 绘制办公室背景
    drawOfficeBackground(ctx);
    
    // 绘制风崽（简化为一个圆形代表）
    drawFengZai(ctx, 200, 300);
    
    // 显示气泡
    showBubble('正在整理日报...');
}

function drawOfficeBackground(ctx) {
    // 背景色
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(0, 0, 800, 500);
    
    // 绘制房间区域
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 2;
    
    // 书房区域
    ctx.strokeRect(50, 100, 200, 200);
    ctx.fillStyle = '#718096';
    ctx.font = '14px sans-serif';
    ctx.fillText('书房', 120, 90);
    
    // 客厅区域
    ctx.strokeRect(300, 250, 200, 200);
    ctx.fillText('客厅', 380, 240);
    
    // 厨房区域
    ctx.strokeRect(550, 100, 200, 200);
    ctx.fillText('厨房', 620, 90);
    
    // 阳台区域
    ctx.strokeRect(550, 350, 200, 100);
    ctx.fillText('阳台', 620, 340);
}

function drawFengZai(ctx, x, y) {
    // 绘制风崽（简化为带表情的圆形）
    ctx.fillStyle = '#e94560';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // 眼睛
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x - 8, y - 5, 6, 0, Math.PI * 2);
    ctx.arc(x + 8, y - 5, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x - 8, y - 5, 3, 0, Math.PI * 2);
    ctx.arc(x + 8, y - 5, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 微笑
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y + 5, 10, 0, Math.PI);
    ctx.stroke();
}

function showBubble(text) {
    const bubble = document.getElementById('status-bubble');
    bubble.textContent = text;
    bubble.style.display = 'block';
    bubble.style.left = '220px';
    bubble.style.top = '250px';
    
    setTimeout(() => {
        bubble.style.display = 'none';
    }, 3000);
}

function loadYesterdayMemo() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];
    
    fetch(`../data/memo/${dateStr}.json`)
        .then(r => r.json())
        .then(data => {
            document.getElementById('yesterday-memo').innerHTML = 
                `<p>${data.content || '昨日无记录'}</p>`;
        })
        .catch(() => {
            document.getElementById('yesterday-memo').innerHTML = 
                '<p>昨日无记录</p>';
        });
}
