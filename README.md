# SyncLife 칸반 보드 프로젝트

## 📋 프로젝트 개요

React와 Vite를 기반으로 개발된 태스크 관리 칸반 보드 애플리케이션입니다.

## 🌐 배포 URL

**GitHub Pages**: [https://woojoung1217.github.io/SyncLife/](https://woojoung1217.github.io/SyncLife/)

## 🚀 프로젝트 실행 방법

### 필수 요구사항

- Node.js 18.0 이상
- npm

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone https://github.com/woojoung1217/SyncLife.git
   cd SyncLife
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   브라우저에서 `http://localhost:5173/SyncLife/` 접속

4. **프로덕션 빌드**

   ```bash
   npm run build
   ```

5. **빌드 결과 미리보기**
   ```bash
   npm run preview
   ```

## 📅 개발 기간

2026년 1월 16일 ~ 2026 1월 18일

## 구현 기능 목록

### Priority 1 - 필수 기능

#### 1. 기본 칸반 보드

- ✅ 3개 컬럼 구조 (To Do, In Progress, Done)
- ✅ 컬럼별 태스크 개수 표시
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱 지원)

#### 2. 태스크 추가

- ✅ 모달을 통한 태스크 추가
- ✅ 제목, 설명, 우선순위(High/Medium/Low) 설정
- ✅ 유효성 검사 (제목 필수 입력)
- ✅ 우선순위별 색상 구분

#### 3. 데이터 영구 저장

- ✅ Zustand + localStorage를 통한 데이터 영구 저장
- ✅ 페이지 새로고침 시에도 데이터 유지

### Priority 2 - 권장 기능 (100% 구현)

#### 1. 드래그 앤 드롭 개선

- ✅ 컬럼 간 태스크 이동 (To Do → In Progress → Done)
- ✅ 드래그 중 시각적 피드백 (반투명 효과, 회전 애니메이션)
- ✅ 드롭 영역 하이라이트 (드래그 오버 시 파란색 배경)

#### 2. 태스크 관리 기능

- ✅ 태스크 수정 (제목, 설명, 우선순위)
- ✅ 태스크 삭제 (확인 다이얼로그 포함)
- ✅ 태스크 상세 보기 모달

#### 3. 기본 검색

- ✅ 제목 기반 실시간 검색
- ✅ 검색 결과 즉시 반영 (모든 컬럼에서 필터링)
- ✅ 검색어 없을 시 전체 태스크 표시
- ✅ 검색어 지우기 버튼

## 🛠️ 기술 스택

- **프론트엔드 프레임워크**: React 19.2.0
- **빌드 도구**: Vite 7.2.4
- **상태 관리**: Zustand 5.0.10
- **스타일링**: CSS3
- **배포**: GitHub Pages + GitHub Actions

## 🤖 AI 도구 활용

본 프로젝트는 개발 과정에서 AI 도구를 활용하여 개발 효율성을 높였습니다.

### 사용한 AI 도구

- **Cursor AI**: 코드 작성 및 리팩토링 지원

### AI 도구 활용 방법

1. **코드 생성 및 구현**

   - 컴포넌트 구조 설계 및 초기 코드 생성
   - 드래그 앤 드롭 기능 구현 가이드
   - 모달 컴포넌트 및 상태 관리 로직 작성

2. **코드 리팩토링 및 개선**

   - 컴포넌트 분리 및 재사용성 향상
   - CSS 스타일링 최적화
   - 코드 가독성 개선

3. **버그 수정 및 디버깅**

   - GitHub Pages 배포 관련 이슈 해결
   - 빌드 설정 및 경로 문제 해결

## 📁 프로젝트 구조

```
SyncLife/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── KanbanBoard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskModal.jsx
│   │   ├── TaskDetailModal.jsx
│   │   └── DeleteConfirmModal.jsx
│   ├── store/              # 상태 관리
│   │   └── useTaskStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 배포 설정
├── vite.config.js
└── package.json
```

## ❌ 미구현 기능 및 이유

### 다크 모드

**이유**:

- UI/UX 개선 기능으로 우선순위가 낮음
- 핵심 기능 구현에 집중하기 위해 제외

## 🔧 개발 환경 설정

### 환경 변수

현재 프로젝트는 환경 변수가 필요하지 않습니다.
