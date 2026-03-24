# Baton: 4-Block Analysis Prototype (Baton #01)

## 🎯 任務目標
1. [x] 建立全系統桌面版原型 (Baton #01 - #07) [Legacy/Reference]
2. [x] **Mobile-First Transformation (核心轉向)**
   - [x] 重新生成「4-Block Analysis Matrix」(Mobile #01)
   - [x] 重新生成「Reflex Lab: Drill Center (Mobile)」(Mobile #02)
   - [x] 重新生成「Persona Squad: Comm Bridge (Mobile)」(Mobile #03)
   - [x] 重新生成「Gateway to Reflex: Onboarding (Mobile)」(Mobile #04)
   - [x] 重新生成「Epic Journey: Narrative World Map」(Mobile #05)
   - [x] 重新生成「Daily Lens: Camera HUD (Mobile)」(Mobile #06)

## 🎨 手機版設計原則 (Mobile Design Intent)
- **Thumb-Driven UX**: 核心交互 (Hold-to-speak, Swipe) 集中在螢幕下三分之一處。
- **Stacked Brutalism**: 將桌面版的 12 欄網格改為單欄垂直流量。
- **Tab Bar Navigation**: 側邊導覽列整合至底部導覽列 (Matrix/Lab/Journey/Squad)。
- **KOB (Kinetic On-Body)**: 模擬實體裝置的震動反饋感視覺化 (微動畫)。

## 🎨 設計意圖 (Design Intent)
- **US1 (Finished)**: 4-Block Viewer with layered markers.
- **US2 (Reflex Lab)**: 
  - **Staircase Progress**: 1-30 單元階梯進度條。
  - **Reaction Timer**: 3s/5s 視覺倒數與「Reflex Hit」成功反饋。
  - **Phase Indicator**: 當前階段 (Infuse/Warm-up/Reinforce/Live)。
- **US3 (Persona Squad)**:
  - **Character Bridge**: 具備不同情緒濾鏡的視訊/通訊介面。
  - **Emotion Monitor**: 實時顯示 AI 對話中的情緒波形。
  - **Memory Archive**: 30天記憶碎片的視覺化歸檔與刪除按鈕。

## 🏁 接力點 (Handover Points)
- [ ] 呼叫 `mcp_StitchMCP_generate_screen_from_text` 生成首頁原型。
- [ ] 更新 `metadata.json` 的 `screens` 清單。
- [ ] 下一棒：設計與現有 React 元件架構的整合方式。

---
*Created by Antigravity on 2026-03-23*
