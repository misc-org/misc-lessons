# Git / GitHub 講座

## 使い方

1. nodejs, npm, git をインストールしてください。
   - nodejs, npm: https://nodejs.org/ja/
   - git: https://git-scm.com/
2. このリポジトリをクローンしてください。
3. このリポジトリのディレクトリに移動してください。
4. `npm install` を実行してください。
5. http://localhost:5173 にアクセスしてください。
6. 完成！

## ローカル内での共有

1. 各 OS ごとに、自身の IP アドレスを調べてください。
   - Windows: `ipconfig`
   - Mac: `ifconfig`
   - Linux: `ifconfig`
2. `npm run dev` を実行してください。
3. `http://localhost:5173` を `http://<自身の IP アドレス>:5173` に変更してアクセスしてください。

**アドレスのローカル内に限定した公開について (ファイアウォールの設定)**
- ファイアウォールの設定を変更して、ポート 5173 を開放してください。
- これらのコマンドはすべて `sudo` 権限が必要です。
```shell
# Windows
New-NetFirewallRule -DisplayName "Allow Localhost Access" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow

# Mac
sudo ipfw add 100 fwd
sudo ipfw add 100 allow tcp from any to any 5173

# Linux
sudo iptables -A INPUT -p tcp --dport 5173 -j ACCEPT
```
