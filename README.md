# 📚 Book Finder

**책 검색 기능을 중심으로 한 도서 탐색 웹 애플리케이션입니다.**  
카카오 책 검색 API를 활용하여 실시간 도서 검색, 검색 기록 저장, 무한 스크롤, 상세 필터 등의 기능을 제공합니다.

---

## 🧩 프로젝트 개요

사용자는 검색창에 키워드를 입력하여 도서를 검색할 수 있으며,  
검색 기록은 최근 8개까지 저장되어 다시 쉽게 검색할 수 있습니다.  
또한, 검색 대상(제목, 저자명, 출판사, ISBN)을 선택하여 보다 정교한 검색이 가능합니다.

> ✅ **주요 기술 스택**: React, TypeScript, Zustand, React Query, ShadcnUI, Tailwind CSS

---

## ⚙️ 실행 방법 및 환경 설정

```bash
# 1. 저장소 클론
git clone https://github.com/hyeon-chae/cdri-books-chae-hyeon.git

# 2. 의존성 설치
cd cdri-books-chae-hyeon
npm install

# 3. 환경 변수 설정
cp .env.local

# 4. 개발 서버 실행
npm run dev
```

---

## 📂 폴더 구조 및 주요 코드 설명

```bash
📦 root
├── 📁 src/                     # 실제 애플리케이션 코드
│   ├── 📁 components/          # 재사용 가능한 공통 UI 컴포넌트
│   │   ├── 📁 ui               # 버튼, 입력창, 페이지네이션 등 UI 단위 컴포넌트
│   │   ├── BookDetailItem.tsx
│   │   ├── BookItemToggle.tsx  # 도서 아이템을 목록과 상세로 보여주는 토글 카드 UI
│   │   ├── BookListItem.tsx
│   │   ├── Empty.tsx
│   │   ├── Header.tsx
│   │   ├── PaginationWrapper.tsx # Shadcn 기반 페이지네이션 컴포넌트
│   │   └── SearchInput.tsx     # 검색창 + 검색 기록 드롭다운 + 검색 핉터
│
│   ├── 📁 hooks/               # 커스텀 훅 모음
│   │   ├── useClickOutside.ts  # 외부 클릭 감지 hook
│   │   ├── useInfiniteScroll.ts
│   │   ├── usePagination.ts
│   │   └── useSearchBooks.ts   # 검색 관련 react-query hook
│
│   ├── 📁 lib/                 # 유틸리티 함수 및 API 관련 로직
│   │   ├── 📁 api/             # API 호출 함수
│   │   │   ├── common.ts
│   │   │   └── search.ts
│   │   ├── 📁 types/           # 타입 선언
│   │   │   └── search.ts
│   │   └── utils.ts            # 유틸 함수 및 상수
│
│   ├── 📁 pages/               # 라우팅 페이지 (기능별로 분리)
│   │   └── 📁 home/            # 홈 관련 페이지 컴포넌트
│   │       ├── FavoritesContents.tsx
│   │       ├── index.tsx
│   │       └── SearchContents.tsx # 검색 결과 리스트 및 스크롤 기능 포함
│
│   ├── 📁 routes/                # 라우터 설정 파일
│   │   └── index.tsx
│
│   ├── 📁 stores/                # Zustand 상태 관리 저장소
│   │   ├── bookmarkStore.ts      # 찜하기 상태 관리
│   │   └── searchHistoryStore.ts # 검색 히스토리 관리
│
│   ├── App.tsx                   # 앱의 진입 컴포넌트
│   ├── index.css                 # 글로벌 스타일
│   └── main.tsx                  # Vite 엔트리 파일

```

---

## 사용된 주요 라이브러리 및 선택 이유

### Vite
- 역할: 프론트엔드 개발 번들러 및 개발 서버
- 선택 이유:
Vite는 기존의 Webpack보다 훨씬 빠른 번들링 속도와 즉각적인 HMR(Hot Module Replacement) 을 제공합니다.
특히 개발 중 페이지를 새로 고칠 필요 없이 코드 변경 사항을 실시간 반영해줘 개발 경험을 매우 부드럽고 빠르게 만들어줍니다.

또한, 다음과 같은 장점으로 인해 선택하게 되었습니다:

  - 빠른 시작 속도: ES 모듈 기반으로 의존성 프리번들링을 하여, 개발 서버 기동이 거의 즉시 이루어짐
  -  모던한 빌드 환경: Rollup 기반 빌드로, 최종 번들 크기와 최적화 성능이 우수
  - 플러그인 생태계: Tailwind, React, Zustand 등 주요 라이브러리와의 통합도 매우 원활
  - React와의 궁합: vite-plugin-react를 통해 빠른 개발 환경 구축이 가능

특히 이 프로젝트와 같이 빠르게 반복 테스트하고 UI를 자주 확인해야 하는 상황에서 Vite는 시간과 스트레스를 줄이는 데 큰 도움이 되었습니다.

### React Query (TanStack Query v5)
- 역할: 서버 데이터 요청, 캐싱, 상태 관리
- 선택 이유:
API로부터 받아오는 데이터를 효율적으로 관리하기 위해 React Query를 사용했습니다.
useInfiniteQuery로 무한 스크롤을 간편하게 구현할 수 있었고, 요청 중복 방지나 캐싱, 로딩 상태 관리 등 번거로운 작업을 자동으로 처리해줍니다.
서버 데이터 전용으로 매우 안정적인 라이브러리입니다.

### Zustand
- 역할: 클라이언트 측 상태 관리 (찜 목록, 검색 기록 등)
선택 이유:
- 복잡한 설정 없이 전역 상태를 쉽게 관리할 수 있고, persist 미들웨어를 통해 로컬 스토리지 연동도 간단하게 처리됩니다.
Redux보다 코드가 간결하고, context 없이도 컴포넌트 어디서든 상태를 사용할 수 있어 개발 생산성을 높여줍니다.

### Shadcn UI
- 역할: UI 컴포넌트 라이브러리
- 선택 이유:
Tailwind CSS 기반의 UI 컴포넌트 라이브러리로, 스타일 커스터마이징이 자유롭고 디자인 일관성을 유지하기 쉽습니다.
Radix UI 기반으로 접근성도 뛰어나며, 필요한 컴포넌트만 설치해서 사용 가능해 프로젝트가 가볍고 관리가 용이합니다.

### Tailwind CSS
- 역할: CSS 프레임워크
- 선택 이유:
클래스 기반의 유틸리티-first 방식으로 빠르게 UI를 구현할 수 있으며, 컴포넌트 재사용성과 유지보수성이 뛰어납니다.
CSS 작성 시간을 줄여주고, 디자이너와 협업할 때도 직관적인 구조로 소통이 쉬운 편입니다.

---

## 강조하고 싶은 기능

### 🔍 1. 최근 검색어 기록 (Zustand + LocalStorage)
- Zustand 전역 상태를 통해 최근 검색 키워드 8개까지 저장, 오래된 순으로 자동 삭제
- 검색창 포커스 시 드롭다운 형태로 검색 기록 노출
- 키워드 클릭 시 해당 검색어로 즉시 재검색 가능
- 삭제 버튼으로 개별 삭제 가능

### 📖 2. 검색 필터 드롭다운
- 제목, 저자, 출판사, ISBN 선택 가능
- 선택된 필터 기준으로 API 호출
- 검색 필터와 입력값은 별도로 관리되어 유연한 검색 가능

### 📌 3. 글로벌 상태 기반 찜하기 기능
- bookmarkStore를 통해 사용자가 마음에 드는 책을 찜 가능
- 각 도서 카드에 토글 버튼 제공 (찜/찜 해제)
- 상태는 전역에서 공유되며 FavoritesContents.tsx에 찜 목록만 필터링하여 렌더링
- 페이지 전환 시에도 찜 상태 유지

### ♾️ 4. 무한 스크롤
- 검색 목록 Intersection Observer 기반, 사용자가 스크롤 시 다음 페이지 자동 로딩
- react-query를 활용해 효율적인 페이지 캐싱 및 요청 중복 방지
- 사용자 조작 없이 자연스러운 결과 로딩 경험 제공

### 💾 5. 상태 및 UX 최적화
- 쿼리 중복 방지, 창 포커스/네트워크 복원 시 불필요한 리패치 방지
- 검색 시 입력창 자동 블러 처리

---

## 미리보기
### 검색
<img src="/public/preview/search.gif" alt="검색 시연" width="500">

### 검색 필터
<img src="/public/preview/search_filter.gif" alt="검색 시연" width="500">

### 찜하기
<img src="/public/preview/favorite.gif" alt="검색 시연" width="500">

---

## 향후 개선 포인트
- Skeleton UI 및 로딩 스피너 추가
- 검색 바 필터 재사용가능 하도록 분리

