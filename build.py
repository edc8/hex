import requests
import json
import os

# 配置
USER = "edc8"
REPO = "hex"
TOKEN = os.getenv("GITHUB_TOKEN")

def fetch_and_save():
    headers = {"Authorization": f"token {TOKEN}"} if TOKEN else {}
    url = f"https://api.github.com/repos/{USER}/{REPO}/issues?state=open&per_page=100"
    
    res = requests.get(url, headers=headers)
    if res.status_code != 200: return
    
    issues = res.json()
    # ... 这里保留你之前的 groups 处理逻辑 ...
    
    # 【修改点】直接保存为数据文件，不塞进 HTML
    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(groups, f, ensure_ascii=False)

if __name__ == "__main__":
    fetch_and_save()
