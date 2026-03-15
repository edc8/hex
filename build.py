import requests
import json
import re
from urllib.parse import urlparse

# 你的配置
USER = "edc8"
REPO = "hex"
FILE_NAME = "index.html"

def build():
    # 1. 获取 Issues 数据
    url = f"https://api.github.com/repos/{USER}/{REPO}/issues?state=open&per_page=100"
    res = requests.get(url)
    if res.status_code != 200: return

    issues = res.json()
    groups = {}
    
    for issue in issues:
        if "pull_request" in issue: continue
        cat = issue['labels'][0]['name'] if issue['labels'] else 'MISC'
        if cat not in groups: groups[cat] = []
        
        body = issue.get('body', '') or ''
        lines = body.split('\n')
        link = lines[0].strip() if lines else '#'
        desc = " ".join(lines[1:]).strip() if len(lines) > 1 else "NO_DESCRIPTION"
        
        domain = urlparse(link).netloc if "http" in link else ""
        icon = f"https://favicon.splitbee.io/?url={domain}" if domain else "https://github.githubassets.com/favicons/favicon.svg"

        groups[cat].append({
            "title": issue['title'],
            "url": link,
            "desc": desc,
            "icon": icon
        })

    # 2. 注入 HTML
    with open(FILE_NAME, 'r', encoding='utf-8') as f:
        content = f.read()

    data_json = json.dumps(groups, ensure_ascii=False, indent=2)
    new_script = f'<script>const PRE_RENDERED_DATA = {data_json};</script>'
    
    content = re.sub(r'.*?', 
                    f'\n        {new_script}\n        ', 
                    content, flags=re.DOTALL)

    with open(FILE_NAME, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    build()
