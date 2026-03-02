#!/usr/bin/env python3
"""
风崽工作台 - 内容生成脚本
每天自动生成 AI 日报、GitHub 精选、大咖知识库内容
"""

import json
import os
from datetime import datetime, timedelta
import feedparser
import requests

DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

def generate_ai_daily():
    """生成 AI 日报"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    # RSS 源列表
    rss_feeds = [
        "https://news.ycombinator.com/rss",
        # 可以添加更多 RSS 源
    ]
    
    articles = []
    for feed_url in rss_feeds:
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:5]:  # 取前5条
                articles.append({
                    "title": entry.title,
                    "link": entry.link,
                    "summary": entry.get("summary", "")[:200] + "...",
                    "date": today
                })
        except Exception as e:
            print(f"Error parsing {feed_url}: {e}")
    
    data = {
        "date": today,
        "articles": articles[:10]  # 最多10条
    }
    
    with open(f"{DATA_DIR}/ai-daily-{today}.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    # 更新最新索引
    with open(f"{DATA_DIR}/ai-daily-latest.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ AI 日报生成完成: {today}")

def generate_github_daily():
    """生成 GitHub 每日精选"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    # 这里可以调用 GitHub API 获取推荐项目
    # 暂时用示例数据
    projects = [
        {
            "name": "n8n",
            "description": "自动化工作流平台",
            "stars": 177000,
            "url": "https://github.com/n8n-io/n8n",
            "reason": "减少重复工作，提升效率"
        },
        {
            "name": "stable-diffusion-webui",
            "description": "SD WebUI",
            "stars": 161000,
            "url": "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
            "reason": "课程核心技术"
        }
    ]
    
    data = {
        "date": today,
        "projects": projects
    }
    
    with open(f"{DATA_DIR}/github-daily-{today}.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    with open(f"{DATA_DIR}/github-daily-latest.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ GitHub 精选生成完成: {today}")

def generate_knowledge_base():
    """生成大咖知识库"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    # RSS 源
    rss_sources = {
        "Dan Koe": "https://dankoe.substack.com/feed",
        "Lenny Rachitsky": "https://www.lennysnewsletter.com/feed",
        "Naval": "https://nav.al/feed",
        "Andrej Karpathy": "https://karpathy.ai/feed.xml"
    }
    
    articles = []
    for author, feed_url in rss_sources.items():
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:3]:  # 每人取前3条
                articles.append({
                    "author": author,
                    "title": entry.title,
                    "link": entry.link,
                    "date": today,
                    "summary": "待翻译..."  # 可以接入翻译 API
                })
        except Exception as e:
            print(f"Error parsing {author}: {e}")
    
    data = {
        "date": today,
        "articles": articles[:10]  # 最多10条
    }
    
    with open(f"{DATA_DIR}/knowledge-{today}.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    with open(f"{DATA_DIR}/knowledge-latest.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 大咖知识库生成完成: {today}")

def generate_index():
    """生成索引文件"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    index = {
        "lastUpdated": today,
        "modules": {
            "aiDaily": f"data/ai-daily-{today}.json",
            "githubDaily": f"data/github-daily-{today}.json",
            "knowledge": f"data/knowledge-{today}.json"
        }
    }
    
    with open(f"{DATA_DIR}/index.json", "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 索引更新完成")

if __name__ == "__main__":
    print("🤖 开始生成内容...")
    generate_ai_daily()
    generate_github_daily()
    generate_knowledge_base()
    generate_index()
    print("✨ 全部完成!")
