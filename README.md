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
npm run coverage:scope
npm run validate:data
npm run test
npm run build
```

## 주요 기능

- Daily Mission: 하루 한 번 20문항 세트, 코드 trace 필수, 완료 streak 기록
- 대시보드: D-day, 오늘 풀이 수, 복습 예정, 2026 1회 경향 진척도, 최근 7일 그래프, 약점 태그
- 문제은행: 키워드, 장, 태그, 언어, 유형, 중요도, 경향, 오답, 복습 예정 필터
- 2026 1회 경향 집중 모드: 코드 출력 비중을 높이고 SQL, DB, 보안/네트워크, 테스트/패턴을 함께 훈련
- 최근 3년+최신 경향 모드: 2023~2025 반복 패턴과 2026 1회 복원/후기 경향을 변형 문제로 훈련
- 코드 출력 훈련: C, Java, Python, SQL 탭과 실행 추적 표 제공
- 오답노트와 간격 반복: SM-2 스타일 nextReviewAt 계산
- 모의고사: 20문항, 100점 만점, 경향 모의고사는 코드 출력 최소 7문항
- 데이터 import/export: JSON, CSV, Markdown import와 JSON export

## 2026 실기 2회 전 범위 학습팩

PR #1의 `round2TargetQuestions`는 코드, SQL, 보안 중심의 검수 변형 문제팩입니다. 후속 `round2ScopeGapQuestions`는 요구사항 확인, 화면 설계, 통합 구현/인터페이스, 서버 프로그램 구현, 제품 소프트웨어 패키징 영역을 보강해 2026년 7월 19일 실기 2회 전 범위를 맞춥니다.

coverage report는 Q-Net 원문을 저장하지 않고 문제 데이터의 `chapter`, `topic`, `tags`만 대조합니다.

```bash
npm run coverage:scope
```

결과는 [docs/QNET_SCOPE_CHECKLIST.md](docs/QNET_SCOPE_CHECKLIST.md)에 자동 반영됩니다.

## GitHub Pages

- 배포 URL: https://stdiodh.github.io/gisa-silgi-2026-lab/
- Vite base: `/gisa-silgi-2026-lab/`
- Pages source: GitHub Actions workflow

## 매일 학습 루틴

1. `/daily`에서 오늘의 Daily Mission을 시작합니다.
2. 코드 출력 문제는 Trace Pad에 변수 상태, 출력 버퍼, 현재 줄, 근거를 먼저 적습니다.
3. 정답 확인 후 내 trace와 해설 trace를 비교합니다.
4. 틀린 문제는 오답노트와 간격 반복 복습에 자동 반영합니다.
5. 완료 체크를 눌러 streak와 약점 태그를 저장합니다.

시험 3일 전부터는 Daily Mission이 모의고사 20문항 + 오답 복습 중심으로 전환됩니다. D-Day에는 새 문제 풀이를 막고 체크리스트만 확인합니다.

## 데이터 import

사용자가 로컬에 가진 JSON/CSV/Markdown 파일을 `/import` 페이지에서 직접 불러옵니다. 브라우저 File API로만 읽고 서버로 전송하지 않습니다.

외부 사이트 자동 수집은 구현하지 않습니다. 정처기 감자, Q-Net, 교재, PDF, 복원 문제 원문은 공개 저장소에 저장하지 않고, 개인 학습 목적으로 직접 정리한 자료만 IndexedDB private import로 저장합니다. Export 파일에는 private import 문제가 포함될 수 있으므로 공개 공유 전에 반드시 확인해야 합니다.

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

## 출처 신뢰도 정책

문제에는 `sourceKind`, `sourceConfidence`, `derivedFromTrendSignalIds`, `originalIncluded` 메타데이터를 둡니다.

- `official`: 공식 출제기준/시험 정보 기반 범주
- `publisher`: 출판사 공개 학습자료/자료실 기반 범주
- `restored`: 복원 문제 기반 경향
- `review`: 개인 후기 기반 경향
- `user-local`: 사용자가 직접 import한 로컬 자료

복원/후기 기반 자료는 공식 확정 기출처럼 표시하지 않고 confidence를 둡니다. 기본 샘플의 `originalIncluded`는 항상 `false`입니다.

자세한 내용은 [docs/SOURCE_POLICY.md](docs/SOURCE_POLICY.md), [docs/TREND_RESEARCH.md](docs/TREND_RESEARCH.md)를 참고하세요.

## 시험 직전 D-13 플랜

`/plan`은 2026-07-06부터 2026-07-19까지 고정 플랜을 보여줍니다.

- D-13: 진단 모의고사와 약점 태그 추출
- D-12 ~ D-10: C, Java, Python 코드 출력 집중
- D-9 ~ D-7: SQL, DB, 보안/네트워크 집중
- D-6 ~ D-4: 테스트/패턴/공학과 코드 출력 강화
- D-3 ~ D-1: 경향 모의고사와 최종 오답팩
- D-Day: 체크리스트만 확인

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

## Topics

추천 GitHub topics:

`korean`, `certification`, `vite`, `react`, `typescript`, `indexeddb`, `study-tool`
