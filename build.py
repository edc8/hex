import requests
import json
import re
from urllib.parse import urlparse

USER = "edc8"
REPO = "hex"
FILE_NAME = "index.html"

def build():
    # 1. 抓取所有开启的 Issue
    url = f"https://api.github.com/repos/{USER}/{REPO}/issues?state=open&per_page=100"
    res = requests.get(url)
    if res.status_code != 200:
        print(f"API Error: {res.status_code}")
        return

    issues = res.json()
    groups = {}
    
    for issue in issues:
        if "pull_request" in issue: continue
        
        # 处理分类 (Label)
        cat = issue['labels'][0]['name'] if (issue.get('labels') and len(issue['labels']) > 0) else 'MISC'
        if cat not in groups: groups[cat] = []
        
        # 处理正文格式
        body = issue.get('body', '') or ''
        lines = body.split('\n')
        link = lines[0].strip() if (lines and lines[0].strip()) else '#'
        desc = " ".join(lines[1:]).strip() if len(lines) > 1 else "NO_DESCRIPTION"
        
        # 提取域名获取图标
        domain = urlparse(link).netloc if "http" in link else ""
        icon = f"https://favicon.splitbee.io/?url={domain}" if domain else "https://github.githubassets.com/favicons/favicon.svg"

        groups[cat].append({
            "title": issue['title'],
            "url": link,
            "desc": desc,
            "icon": icon
        })

    # 2. 读取 HTML 模板
    with open(FILE_NAME, 'r', encoding='utf-8') as f:
        content = f.read()

    # 3. 序列化数据
    data_json = json.dumps(groups, ensure_ascii=False)
    # 构造精确的注入代码
    new_slot = f'<script>const PRE_RENDERED_DATA = {data_json};</script>'
    
    # 4. 替换占位符
    pattern = r'.*?'
    if not re.search(pattern, content, flags=re.DOTALL):
        print("Error: DATA_SLOT markers not found in index.html!")
        return

    new_content = re.sub(pattern, new_slot, content, flags=re.DOTALL)

    # 5. 写回文件
    with open(FILE_NAME, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Success! Processed {len(issues)} items into {len(groups)} categories.")

if __name__ == "__main__":
    build()
