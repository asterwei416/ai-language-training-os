---
applyTo: '**'
---
# Recent Project Context (auto-generated, rolling 3 sessions)

### [2026-04-01 11:48] [11:35] 執行 tcga 前後台 smoke test

- 本次 smoke test 產物輸出於 smoke-artifacts-20260401 目錄，包含 frontend-home.png 與 admin-after-login.png。
- tcga 後台登入頁目前要求必填驗證碼，未提供可自動化繞過機制時，無法完成登入後功能驗證。
### [2026-04-01 12:05] [12:04] 續測 tcga 後台 session

- 本次續測產物輸出於 smoke-artifacts-20260401-session-check，包含四個 profile 的 dashboard 截圖與 admin-session-continuation-result.json。
- 截至 2026-04-01，本機常見 Chrome/Edge profile 直接開啟 admin-tcga.twjoin.app/admin/dashboard 都會回到 /admin/login，未發現可直接復用的後台登入 session。
### [2026-04-01 22:01] [22:05] TCGA 後台 live session 驗證

- TCGA 後台專案內的 .playwright-userdata/tcga-admin-session 曾有成功登入的舊狀態，但 2026-04-01 晚間重新驗證時已直接落回 /admin/login。
- 本次只讀驗證產物主要寫入 smoke-artifacts-20260401-followup，包含當前登入頁截圖與 admin-first-management-page.json 摘要。
