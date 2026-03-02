// 论文页面脚本
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('today-date').textContent = today;
    
    loadTodayContent();
});

function loadTodayContent() {
    const today = new Date().toISOString().split('T')[0];
    
    fetch(`../data/papers/${today}.json`)
        .then(r => r.json())
        .then(data => {
            renderTodayContent(data);
        })
        .catch(() => {
            document.getElementById('today-content').innerHTML = 
                '<p class="empty">今日暂无论文数据</p>';
        });
}

function renderTodayContent(data) {
    const container = document.getElementById('today-content');
    
    if (!data || !data.items || data.items.length === 0) {
        container.innerHTML = '<p class="empty">今日暂无论文数据</p>';
        return;
    }
    
    const html = data.items.map(item => `
        <article class="article-item">
            <a href="${item.url}" target="_blank" class="article-title">${item.title}</a>
            <p>${item.authors || ''} ${item.year || ''}</p>
            <p>${item.summary || ''}</p>
            <div class="article-meta">
                ${item.source ? `<span>${item.source}</span>` : ''}
            </div>
        </article>
    `).join('');
    
    container.innerHTML = html;
}

function toggleArchive() {
    const archive = document.getElementById('archive-content');
    archive.classList.toggle('hidden');
}
