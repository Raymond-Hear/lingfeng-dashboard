# 风崽的工作台

一个动态更新的 AI 助手工作台，部署在 GitHub Pages。

## 架构

- **前端**: 纯 HTML/CSS/JS，部署在 GitHub Pages
- **后端**: Python 脚本，定时抓取内容生成静态数据
- **自动化**: GitHub Actions 每天定时更新内容

## 内容模块

1. **风崽的办公室** - 像素可视化，实时状态
2. **AI 日报** - 每日 Hacker News 等 RSS 抓取
3. **GitHub 每日精选** - 个性化项目推荐
4. **大咖知识库** - Dan Koe/Naval/Lenny/Karpathy 文章

## 本地开发

```bash
# 安装依赖
pip install -r requirements.txt

# 运行后端脚本生成内容
python scripts/generate-content.py

# 本地预览
python -m http.server 8080
```

## GitHub Actions 自动更新

- 每天 7:00 生成 AI 日报
- 每天 10:00 生成 GitHub 精选
- 每天 12:00 和 18:00 更新大咖知识库
