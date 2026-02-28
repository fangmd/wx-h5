#!/usr/bin/env bash
# 部署脚本：在本地执行，通过 SSH 在云服务器上拉取代码并重新构建部署

set -e

SERVER="root@39.106.7.10"
PROJECT_DIR="/root/wx-h5"

echo ">>> 连接服务器 $SERVER，部署项目 $PROJECT_DIR"
ssh "$SERVER" "cd $PROJECT_DIR && git pull && docker compose up -d --build"
echo ">>> 部署完成"
