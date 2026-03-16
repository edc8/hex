import requests
import json
import os
from urllib.parse import urlparse

# --- 基础配置 ---
USER = "edc8"
REPO = "hex"
# 从 GitHub Actions 环境变量获取 Token，本地测试可临时手动填写
TOKEN = os.getenv("GITHUB_TOKEN")

def fetch_issues():
    headers = {"Authorization": f"token {TOKEN}"} if TOKEN else {}
    # 获取带标签的公开 Issue
    url = f"https://api.github.com/repos/{USER}/{REPO}/issues?state=open&per_page=100"
    
    try:
        res = requests.get(url, headers=headers)
        if res.status_code != 200:
            print(f"API 错误: {res.status_code}")
            return None
        
        issues = res.json()
        groups = {}
        for issue in issues:
            if "pull_request" in issue: continue
            
            # 分类逻辑：取第一个标签名，没有则归类为 MISC
            cat = issue['labels'][0]['name'] if (issue.get('labels')) else 'MISC'
            if cat not in groups: groups[cat] = []
            
            # 解析正文：第一行为链接，后续为描述
            body = issue.get('body') or ""
            body_parts = body.strip().split('\n')
            link = body_parts[0].strip() if body_parts else "#"
            desc = " ".join(body_parts[1:]).strip() or "暂无描述"
            
            # 自动图标
            domain = urlparse(link).netloc if "http" in link else ""
            icon = f"https://favicon.splitbee.io/?url={domain}" if domain else ""

            groups[cat].append({
                "title": issue['title'],
                "url": link,
                "desc": desc,
                "icon": icon
            })
        return groups
    except Exception as e:
        print(f"发生异常: {e}")
        return None

if __name__ == "__main__":
    data = fetch_issues()
    if data:
        # 核心：生成 JSON 数据文件，避免 HTML 巨大
        with open("data.json", "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print("data.json 数据已更新")
