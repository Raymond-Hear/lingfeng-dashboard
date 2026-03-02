// AI日报页面脚本
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('today-date').textContent = today;
    
    loadTodayContent();
});

function loadTodayContent() {
    const today = new Date().toISOString().split('T')[0];
    
    fetch(`../data/ai-daily/${today}.json`)
        .then(r => r.json())
        .then(data => {
            renderTodayContent(data);
        })
        .catch(() => {
            document.getElementById('today-content').innerHTML = 
                '<p class="empty">今日暂无日报数据</p>';
        });
}

function renderTodayContent(data) {
    const container = document.getElementById('today-content');
    
    if (!data || !data.items || data.items.length === 0) {
        container.innerHTML = '<p class="empty">今日暂无日报数据</p>';
        return;
    }
    
    const html = data.items.map(item => `
        <article class="article-item">
            <a href="${item.url}" target="_blank" class="article-title">${item.title}</a>
            <p>${item.summary || ''}</p>
            <div class="article-meta">
                ${item.source ? `<span>${item.source}</span>` : ''}
                ${item.score ? `<span>评分: ${item.score}</span>` : ''}
            </div>
        </article>
    `).join('');
    
    container.innerHTML = html;
}

function toggleArchive() {
    const archive = document.getElementById('archive-content');
    archive.classList.toggle('hidden');
    
    if (!archive.classList.contains('hidden') && archive.children.length === 0) {
        loadArchive();
    }
}

function loadArchive() {
    // 加载历史日报列表
    const archive = document.getElementById('archive-content');
    archive.innerHTML = '<p class="loading">加载中...</p>';
    
    // TODO: 从 data 目录读取所有历史文件
    setTimeout(() => {
        archive.innerHTML = '<p class="empty">历史数据整理中...</p>';
    }, 500);
}
