/**
 * 风崽的办公室 - 像素可视化
 */

// 办公室区域定义
const AREAS = {
    idle: { x: 100, y: 350, name: '休息区', color: '#4ade80' },
    writing: { x: 300, y: 200, name: '工作区', color: '#60a5fa' },
    researching: { x: 500, y: 200, name: '研究区', color: '#a78bfa' },
    executing: { x: 300, y: 350, name: '执行区', color: '#fbbf24' },
    syncing: { x: 500, y: 350, name: '同步区', color: '#f472b6' },
    error: { x: 650, y: 250, name: 'Debug区', color: '#f87171' }
};

// 风崽状态
let fengzaiState = 'idle';
let fengzaiMessage = '待命中，随时准备为你服务';

class PixelOffice {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.fengzaiX = AREAS.idle.x;
        this.fengzaiY = AREAS.idle.y;
        this.targetX = this.fengzaiX;
        this.targetY = this.fengzaiY;
        
        this.init();
    }
    
    init() {
        this.draw();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        setInterval(() => this.autoChangeState(), 30000); // 每30秒自动切换状态
    }
    
    // 绘制办公室场景
    draw() {
        const ctx = this.ctx;
        
        // 清空画布
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, 800, 500);
        
        // 绘制地板
        ctx.fillStyle = '#2d2d44';
        ctx.fillRect(50, 150, 700, 300);
        
        // 绘制区域
        for (const [key, area] of Object.entries(AREAS)) {
            // 区域背景
            ctx.fillStyle = area.color + '20'; // 20% 透明度
            ctx.fillRect(area.x - 60, area.y - 40, 120, 80);
            
            // 区域边框
            ctx.strokeStyle = area.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(area.x - 60, area.y - 40, 120, 80);
            
            // 区域名称
            ctx.fillStyle = '#fff';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(area.name, area.x, area.y + 50);
        }
        
        // 绘制风崽（像素风格）
        this.drawFengzai();
        
        // 绘制气泡
        if (fengzaiMessage) {
            this.drawBubble();
        }
    }
    
    // 绘制风崽
    drawFengzai() {
        const ctx = this.ctx;
        const x = this.fengzaiX;
        const y = this.fengzaiY;
        
        // 身体（像素块）
        ctx.fillStyle = '#e94560';
        ctx.fillRect(x - 15, y - 15, 30, 30);
        
        // 眼睛
        ctx.fillStyle = '#fff';
        ctx.fillRect(x - 8, y - 8, 6, 6);
        ctx.fillRect(x + 2, y - 8, 6, 6);
        
        // 瞳孔
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 6, y - 6, 2, 2);
        ctx.fillRect(x + 4, y - 6, 2, 2);
        
        // 微笑
        ctx.fillStyle = '#fff';
        ctx.fillRect(x - 4, y + 2, 8, 2);
    }
    
    // 绘制气泡
    drawBubble() {
        const ctx = this.ctx;
        const x = this.fengzaiX;
        const y = this.fengzaiY - 50;
        
        // 气泡背景
        ctx.fillStyle = '#fff';
        ctx.fillRect(x - 80, y - 25, 160, 30);
        
        // 气泡边框
        ctx.strokeStyle = '#e94560';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 80, y - 25, 160, 30);
        
        // 气泡文字
        ctx.fillStyle = '#333';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(fengzaiMessage.substring(0, 20), x, y - 5);
    }
    
    // 移动风崽到指定区域
    moveTo(areaKey, message) {
        const area = AREAS[areaKey];
        if (!area) return;
        
        this.targetX = area.x;
        this.targetY = area.y;
        fengzaiState = areaKey;
        fengzaiMessage = message || `在${area.name}`;
        
        // 更新状态栏
        document.getElementById('current-status').textContent = 
            `风崽在${area.name} - ${message}`;
        
        this.animateMove();
    }
    
    // 动画移动
    animateMove() {
        const dx = this.targetX - this.fengzaiX;
        const dy = this.targetY - this.fengzaiY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 2) {
            this.fengzaiX = this.targetX;
            this.fengzaiY = this.targetY;
            this.draw();
            return;
        }
        
        const speed = 3;
        this.fengzaiX += (dx / distance) * speed;
        this.fengzaiY += (dy / distance) * speed;
        
        this.draw();
        requestAnimationFrame(() => this.animateMove());
    }
    
    // 根据时间自动切换状态
    autoChangeState() {
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        
        // 定时任务时间
        if ((hour === 7 || hour === 8) && minute < 35) {
            this.moveTo('syncing', '生成 AI 日报中...');
        } else if (hour === 10 && minute < 35) {
            this.moveTo('syncing', '抓取 GitHub 项目中...');
        } else if ((hour === 12 || hour === 18) && minute < 35) {
            this.moveTo('researching', '阅读大咖文章中...');
        } else if (hour >= 9 && hour <= 18) {
            this.moveTo('writing', '帮聆风工作中...');
        } else {
            this.moveTo('idle', '休息中...');
        }
    }
    
    // 更新时间显示
    updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        document.getElementById('current-time').textContent = timeStr;
    }
}

// 初始化
let office;
document.addEventListener('DOMContentLoaded', () => {
    office = new PixelOffice('office-canvas');
    
    // 初始状态
    office.autoChangeState();
});
