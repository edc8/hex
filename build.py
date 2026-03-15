import requests
import json
from urllib.parse import urlparse

# --- 基础配置 ---
USER = "edc8"
REPO = "hex"
FILE_NAME = "index.html"

# --- 1. 获取 Issue 数据 ---
def fetch_issues():
    url = f"https://api.github.com/repos/{USER}/{REPO}/issues?state=open&per_page=100"
    res = requests.get(url)
    if res.status_code != 200: return None
    
    issues = res.json()
    groups = {}
    for issue in issues:
        if "pull_request" in issue: continue
        # 获取分类标签
        cat = issue['labels'][0]['name'] if (issue.get('labels')) else 'MISC'
        if cat not in groups: groups[cat] = []
        
        # 提取链接和描述 (Issue 第一行为链接，后面为描述)
        body_parts = (issue.get('body') or "").split('\n')
        link = body_parts[0].strip() if body_parts else "#"
        desc = " ".join(body_parts[1:]).strip() or "No description provided."
        
        # 自动获取图标
        domain = urlparse(link).netloc if "http" in link else ""
        icon = f"https://favicon.splitbee.io/?url={domain}" if domain else ""

        groups[cat].append({
            "title": issue['title'],
            "url": link,
            "desc": desc,
            "icon": icon
        })
    return groups

# --- 2. 这里的样式和你原来的完全一致 ---
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>HEX / INDEX</title>
    <style>
        :root { --bg: #000; --line: rgba(255,255,255,0.1); --accent: #fff; --text-main: #fff; --text-dim: #666; --h-height: 120px; }
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        body { background-color: var(--bg); background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 40px 40px; color: var(--text-main); font-family: sans-serif; margin: 0; padding: 0; min-height: 100vh; }
        header { height: var(--h-height); display: flex; align-items: flex-end; padding: 20px; border-bottom: 1px solid var(--accent); margin-bottom: 40px; }
        header h1 { font-size: clamp(24px, 8vw, 40px); font-weight: 900; margin: 0; text-transform: uppercase; line-height: 0.8; }
        .container { padding: 0 20px 100px; max-width: 1200px; margin: 0 auto; }
        .section { margin-bottom: 80px; display: grid; grid-template-columns: 60px 1fr; gap: 20px; }
        .section-index { font-size: 14px; color: var(--accent); font-weight: bold; padding-top: 8px; }
        .section-content h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.3em; color: var(--text-dim); margin: 0 0 30px 0; }
        .links-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); border-top: 1px solid var(--line); }
        .link-item { display: flex; flex-direction: column; padding: 24px 0; text-decoration: none; color: inherit; border-bottom: 1px solid var(--line); transition: all 0.3s ease; }
        .link-header { display: flex; align-items: center; margin-bottom: 12px; }
        .link-icon { width: 24px; height: 24px; margin-right: 15px; filter: grayscale(1) invert(1); }
        .link-title { font-size: 18px; font-weight: 600; }
        .link-desc { font-size: 12px; color: var(--text-dim); line-height: 1.6; }
        @media (max-width: 600px) { .section { grid-template-columns: 1fr; gap: 5px; } header { height: 100px; } }
    </style>
</head>
<body>
    <header><h1>Hex /<br>Index_</h1></header>
    <div class="container" id="main"></div>
    <script>
        const data = DATA_PLACEHOLDER;
        const main = document.getElementById('main');
        let idx = 1;
        for (let cat in data) {
            const sec = document.createElement('div');
            sec.className = 'section';
            sec.innerHTML = `<div class="section-index">// ${String(idx++).padStart(2,'0')}</div><div class="section-content"><h2>${cat}</h2><div class="links-grid">` + 
                data[cat].map(i => `<a href="${i.url}" class="link-item" target="_blank"><div class="link-header"><img src="${i.icon}" class="link-icon" onerror="this.style.opacity=0"><span class="link-title">${i.title}</span></div><div class="link-desc">${i.desc}</div></a>`).join('') + 
                `</div></div>`;
            main.appendChild(sec);
        }
    </script>
</body>
</html>
"""

# --- 3. 写入文件 ---
if __name__ == "__main__":
    data = fetch_issues()
    if data:
        # 直接生成新的 HTML，不再去老文件里找占位符
        final_html = HTML_TEMPLATE.replace("DATA_PLACEHOLDER", json.dumps(data, ensure_ascii=False))
        with open(FILE_NAME, "w", encoding="utf-8") as f:
            f.write(final_html)
        print("Done!")
