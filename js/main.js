// 主页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前日期
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const now = new Date();
        dateEl.textContent = now.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }
    
    // 加载今日内容预览
    loadTodayPreview();
});

function loadTodayPreview() {
    const today = new Date().toISOString().split('T')[0];
    
    // 加载 AI 日报预览
    fetch(`../data/ai-daily/${today}.json`)
        .then(r => r.json())
        .then(data => {
            updatePreview('ai-daily', data);
        })
        .catch(() => {
            document.getElementById('ai-daily-preview').innerHTML = 
                '<p class="empty">今日暂无数据</p>';
        });
    
    // 加载论文预览
    fetch(`../data/papers/${today}.json`)
        .then(r => r.json())
        .then(data => {
            updatePreview('papers', data);
        })
        .catch(() => {
            document.getElementById('papers-preview').innerHTML = 
                '<p class="empty">今日暂无数据</p>';
        });
    
    // 加载知识库预览
    fetch(`../data/knowledge/${today}.json`)
        .then(r => r.json())
        .then(data => {
            updatePreview('knowledge', data);
        })
        .catch(() => {
            document.getElementById('knowledge-preview').innerHTML = 
                '<p class="empty">今日暂无数据</p>';
        });
}

function updatePreview(type, data) {
    const container = document.getElementById(`${type}-preview`);
    const countEl = document.getElementById(`${type}-count`);
    
    if (!data || !data.items || data.items.length === 0) {
        container.innerHTML = '<p class="empty">今日暂无数据</p>';
        return;
    }
    
    countEl.textContent = `${data.items.length} 篇`;
    
    // 只显示前3条
    const items = data.items.slice(0, 3);
    const html = items.map(item => `
        <div class="preview-item">
            <a href="${item.url}" target="_blank">${item.title}</a>
        </div>
    `).join('');
    
    container.innerHTML = html;
}
