# 할일 관리 (To-Do Manager) 📋

React 기반의 직관적이고 모던한 할일 관리 웹 애플리케이션입니다.

## 주요 기능 ✨

### 핵심 기능
- ✅ **할일 관리**: 할일 추가, 수정, 삭제, 완료 표시
- 📅 **날짜/시간 설정**: 각 할일에 기한 날짜와 시간 지정
- 📂 **폴더 시스템**: 비슷한 유형의 할일을 폴더로 그룹화
- 🎨 **파스텔 컬러**: 각 폴더별 파스텔 톤 색상 지정
- 🔄 **카테고리 필터링**: "전체", "오늘", "이번주", "나중에" 탭으로 필터링
- 💾 **로컬 스토리지**: 새로고침해도 데이터 유지
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크탑 모두 지원

### UI/UX 특징
- 🎯 **오늘의 일정 대시보드**: 오늘 할일을 한눈에 확인
- 🌊 **부드러운 애니메이션**: Hover 효과 및 전환 애니메이션
- 🎨 **심플하고 모던한 디자인**: 흰색 배경에 파스텔 톤 포인트 색상
- 📊 **통계 카드**: 전체/진행중/완료 할일 개수 표시

## 기술 스택 🛠️

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS (CSS Variables, CSS Modules)
- **Date Handling**: date-fns
- **Storage**: Local Storage API

## 시작하기 🚀

### 설치

```bash
cd todo-manager
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` (또는 표시된 포트) 열기

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 프리뷰

```bash
npm run preview
```

## 프로젝트 구조 📁

```
todo-manager/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── Dashboard.jsx    # 오늘의 일정 대시보드
│   │   ├── CategoryTabs.jsx # 카테고리 탭 필터
│   │   ├── TodoList.jsx     # 할일 목록
│   │   ├── TodoItem.jsx     # 개별 할일 아이템
│   │   ├── TodoForm.jsx     # 할일 추가/수정 폼
│   │   ├── FolderSidebar.jsx # 폴더 사이드바
│   │   └── FolderManager.jsx # 폴더 관리 모달
│   ├── hooks/              # 커스텀 훅
│   │   ├── useLocalStorage.js # 로컬 스토리지 훅
│   │   ├── useTodos.js      # 할일 관리 훅
│   │   ├── useFolders.js    # 폴더 관리 훅
│   │   └── useDateFilter.js # 날짜 필터링 훅
│   ├── utils/              # 유틸리티 함수
│   │   └── uuid.js         # UUID 생성기
│   ├── styles/             # 전역 스타일
│   │   ├── variables.css   # CSS 변수
│   │   ├── global.css      # 전역 스타일
│   │   └── animations.css  # 애니메이션
│   ├── App.jsx             # 메인 앱 컴포넌트
│   ├── App.css
│   └── main.jsx            # 진입점
├── public/
├── index.html
└── package.json
```

## 사용 방법 📖

### 할일 추가하기
1. 상단의 "할일 추가" 버튼 클릭
2. 제목, 메모, 날짜, 시간, 폴더 입력
3. "추가" 버튼 클릭

### 폴더 관리하기
1. 왼쪽 사이드바에서 "폴더 관리" 버튼 클릭
2. 새 폴더 이름과 색상 선택 후 추가
3. 기존 폴더 수정 또는 삭제 가능

### 카테고리별 보기
- **전체**: 모든 할일 표시
- **오늘**: 오늘 기한인 할일만 표시
- **이번주**: 이번 주 기한인 할일만 표시
- **나중에**: 이번 주 이후 또는 기한 없는 할일 표시

### 모바일에서 사용
- 좌측 상단 햄버거 메뉴(☰)로 폴더 사이드바 열기/닫기
- 모든 기능이 터치 인터페이스에 최적화됨

## 데이터 구조 💾

### Todo 객체
```javascript
{
  id: 'uuid',
  title: '할일 제목',
  memo: '상세 메모',
  dueDate: '2026-01-20',
  dueTime: '14:00',
  folderId: 'folder-uuid',
  completed: false,
  createdAt: timestamp
}
```

### Folder 객체
```javascript
{
  id: 'uuid',
  name: '업무',
  color: '#FFB6C1'
}
```

## 브라우저 지원 🌐

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 라이선스 📄

이 프로젝트는 MIT 라이선스를 따릅니다.

## 개발 정보 👨‍💻

- **React**: 18.3.1
- **Vite**: 7.3.1
- **date-fns**: 4.1.0

---

만든 날짜: 2026년 1월 20일
