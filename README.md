h5 项目

- [ ] 字体大小没有做自适应

## 部署

```bash
# 构建并启动
docker compose up -d --build

# 仅构建
docker compose build

# 查看日志
docker compose logs -f web

# 停止
docker compose down
```

启动后访问 http://localhost:8081
