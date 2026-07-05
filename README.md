# gisa-silgi-2026-lab

정보처리기사 실기 2026년 7월 19일 시험 대비용 로컬 우선 학습 웹사이트입니다. Vite, React, TypeScript, Tailwind CSS, Dexie IndexedDB로 동작하며 백엔드 서버 없이 브라우저 안에 학습 기록을 저장합니다.

이 프로젝트는 개인 학습용 도구이며 공식 기출/교재 원문을 제공하지 않습니다. 공개 저장소에는 플랫폼 코드와 새로 만든 샘플 변형 문제만 포함합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

검증:

```bash
npm run test
npm run build
```

## 주요 기능

- 대시보드: D-day, 오늘 풀이 수, 복습 예정, 2026 1회 경향 진척도, 최근 7일 그래프, 약점 태그
- 문제은행: 키워드, 장, 태그, 언어, 유형, 중요도, 경향, 오답, 복습 예정 필터
- 2026 1회 경향 집중 모드: 코드 출력 비중을 높이고 SQL, DB, 보안/네트워크, 테스트/패턴을 함께 훈련
- 코드 출력 훈련: C, Java, Python, SQL 탭과 실행 추적 표 제공
- 오답노트와 간격 반복: SM-2 스타일 nextReviewAt 계산
- 모의고사: 20문항, 100점 만점, 경향 모의고사는 코드 출력 최소 7문항
- 데이터 import/export: JSON, CSV, Markdown import와 JSON export

## 데이터 import

사용자가 로컬에 가진 JSON/CSV/Markdown 파일을 `/import` 페이지에서 직접 불러옵니다. 브라우저 File API로만 읽고 서버로 전송하지 않습니다.

자세한 형식은 [docs/DATA_FORMAT.md](docs/DATA_FORMAT.md)를 참고하세요.

## GitHub Pages 배포

Vite `base`는 프로덕션 빌드에서 `/gisa-silgi-2026-lab/`로 설정됩니다.

```bash
npm run build
npm run preview
```

`main` 브랜치 push 시 `.github/workflows/pages.yml`이 GitHub Pages 배포를 수행할 수 있습니다. 저장소 Settings에서 Pages 소스를 GitHub Actions로 설정하세요.

## 2026 1회 경향 반영 방식

앱은 요구사항에 명시된 경향 가중치를 샘플 학습 모드에 반영합니다.

- 프로그래밍 언어 활용 40%
- SQL 응용 15%
- 데이터베이스/자료구조 15%
- 보안/네트워크 15%
- 소프트웨어 공학/테스트/패턴 15%

샘플 문제는 모두 변형 예시이며 실제 복원 문제나 교재 문장을 베끼지 않았습니다.

## 공개 저장소에 넣으면 안 되는 파일

`.gitignore`로 다음 자료를 제외합니다.

- `materials/private/`
- `data/private/`
- `imports/raw/`
- `.local/`
- `.db`, `.sqlite`
- `*.pdf`, `*.zip`, `*.7z`, `*.rar`
- `.env`, `.env.*`

## 스크린샷

추후 추가 예정:

- 대시보드
- 문제 풀이 화면
- 2026 1회 경향 집중 모드
- 모의고사 결과
