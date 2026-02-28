h5 项目

- [ ] 字体大小没有做自适应

## 静态资源（根路径访问）

需要 `xx.com/文件名` 直接可访问的静态文件（如公众号 MP_verify_xxx.txt）放入 **`public/`** 即可，Vite 构建时会原样复制到站点根路径。无需配置。

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
