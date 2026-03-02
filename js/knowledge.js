// 大咖知识库脚本
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('today-date').textContent = today;
    
    loadTodayContent();
    
    // 绑定筛选按钮
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterByAuthor(this.dataset.author);
        });
    });
});

function loadTodayContent() {
    const today = new Date().toISOString().split('T')[0];
    
    fetch(`../data/knowledge/${today}.json`)
        .then(r => r.json())
        .then(data => {
            renderTodayContent(data);
        })
        .catch(() => {
            document.getElementById('today-content').innerHTML = 
                '<p class="empty">今日暂无更新</p>';
        });
}

function renderTodayContent(data) {
    const container = document.getElementById('today-content');
    
    if (!data || !data.items || data.items.length === 0) {
        container.innerHTML = '<p class="empty">今日暂无更新</p>';
        return;
    }
    
    const html = data.items.map(item => `
        <article class="article-item" data-author="${item.author || ''}">
            <a href="${item.url}" target="_blank" class="article-title">${item.title}</a>
            <p>${item.summary || ''}</p>
            <div class="article-meta">
                <span>${item.author || ''}</span>
                <span>${item.date || ''}</span>
            </div>
        </article>
    `).join('');
    
    container.innerHTML = html;
}

function filterByAuthor(author) {
    const items = document.querySelectorAll('.article-item');
    items.forEach(item => {
        if (author === 'all' || item.dataset.author === author) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function toggleArchive() {
    const archive = document.getElementById('archive-content');
    archive.classList.toggle('hidden');
}
