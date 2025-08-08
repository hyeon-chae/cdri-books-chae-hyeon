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

## 폴더 구조 및 주요 코드 설명

```
