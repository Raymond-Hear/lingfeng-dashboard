/**
 * 风崽工作台 - 内容加载器
 * 从 data/ 目录加载动态内容
 */

// 加载 AI 日报
async function loadAIDaily() {
    try {
        const response = await fetch('data/ai-daily-latest.json');
        const data = await response.json();
        
        const container = document.getElementById('ai-daily-content');
        container.innerHTML = data.articles.map(article => `
            <div class="content-card">
                <h4>${article.title}</h4>
                <p>${article.summary}</p>
                <a href="${article.link}" target="_blank">阅读原文 →</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('加载 AI 日报失败:', error);
        document.getElementById('ai-daily-content').innerHTML = '<p>加载中...</p>';
    }
}

// 加载 GitHub 精选
async function loadGitHubDaily() {
    try {
        const response = await fetch('data/github-daily-latest.json');
        const data = await response.json();
        
        const container = document.getElementById('github-content');
        container.innerHTML = data.projects.map(project => `
            <div class="content-card">
                <h4>⭐ ${project.name}</h4>
                <p>${project.description}</p>
                <span class="stars">${project.stars.toLocaleString()} stars</span>
                <p class="reason">💡 ${project.reason}</p>
                <a href="${project.url}" target="_blank">查看项目 →</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('加载 GitHub 精选失败:', error);
        document.getElementById('github-content').innerHTML = '<p>加载中...</p>';
    }
}

// 加载大咖知识库
async function loadKnowledgeBase() {
    try {
        const response = await fetch('data/knowledge-latest.json');
        const data = await response.json();
        
        const container = document.getElementById('knowledge-content');
        container.innerHTML = data.articles.map(article => `
            <div class="content-card">
                <span class="author">${article.author}</span>
                <h4>${article.title}</h4>
                <p>${article.summary}</p>
                <a href="${article.link}" target="_blank">阅读全文 →</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('加载大咖知识库失败:', error);
        document.getElementById('knowledge-content').innerHTML = '<p>加载中...</p>';
    }
}

// 显示更多内容（弹窗）
async function showMore(type) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    const titles = {
        'ai-daily': '历史 AI 日报',
        'github': '历史 GitHub 精选',
        'knowledge': '全部大咖文章'
    };
    
    title.textContent = titles[type];
    body.innerHTML = '<p>加载历史数据中...</p>';
    modal.style.display = 'block';
    
    // TODO: 加载历史数据
    body.innerHTML = '<p>历史数据功能开发中...</p>';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    loadAIDaily();
    loadGitHubDaily();
    loadKnowledgeBase();
    
    // 点击弹窗外部关闭
    window.onclick = (event) => {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
