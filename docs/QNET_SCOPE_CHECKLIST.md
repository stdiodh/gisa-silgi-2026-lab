# Q-Net Scope Checklist

이 문서는 사용자가 Q-Net에서 직접 내려받은 공식 출제기준 PDF/문서를 앱 문제 태그와 대조하기 위한 체크리스트입니다.
Q-Net 원문, PDF, 기출 문제 본문은 저장소에 저장하지 않습니다.

## 공식 문서 대조 체크리스트

아래 항목은 공식 PDF/문서를 로컬에서 열어 확인한 뒤 체크합니다.

- [ ] 요구사항 확인
- [ ] 데이터 입출력/DB
- [ ] 통합 구현/인터페이스
- [ ] 서버 프로그램 구현
- [ ] 화면 설계
- [ ] 애플리케이션 테스트
- [ ] SQL 응용
- [ ] 소프트웨어 개발 보안
- [ ] 프로그래밍 언어 활용
- [ ] 응용 SW 기초 기술
- [ ] 제품 소프트웨어 패키징

## Coverage Report

기준: `src/data/sampleQuestions.ts` export 결과 201문항  
산정일: 2026-07-07  
산정 방식: 각 문제의 `chapter`, `topic`, `tags` 텍스트에 영역별 키워드가 포함되는지 확인했습니다. 한 문제가 여러 영역에 중복 집계될 수 있습니다.

| 영역 | 매칭 키워드 기준 | 커버 문항 수 | 예시 문제 ID | 상태 |
| --- | --- | ---: | --- | --- |
| 요구사항 확인 | 요구사항, 유스케이스, 명세, UML, 모델링 | 0 | - | 문제 추가 후보 |
| 데이터 입출력/DB | 데이터베이스, DB, 정규화, 키, 트랜잭션, ACID, 관계 | 25 | sample-db-001, sample-db-002, sample-db-003, sample-db-004, gen-db-001 | 커버 |
| 통합 구현/인터페이스 | 인터페이스, API, 통합, JSON, XML, REST | 2 | round2-2026-sw-003, round2-2026-sw-009 | 커버 |
| 서버 프로그램 구현 | 서버, MVC, Spring, 서비스, 트랜잭션 | 4 | sample-db-004, gen-db-009, gen-db-010, round2-2026-db-008 | 커버 |
| 화면 설계 | 화면, UI, UX, 와이어프레임, 스토리보드 | 0 | - | 문제 추가 후보 |
| 애플리케이션 테스트 | 테스트, 경계값, 블랙박스, 화이트박스, 단위테스트 | 24 | sample-sw-001, sample-sw-002, gen-sw-001, gen-sw-002, gen-sw-003 | 커버 |
| SQL 응용 | SQL, SELECT, JOIN, GROUP, HAVING, DML, DCL | 36 | sample-sql-001, sample-sql-002, sample-sql-003, sample-sql-004, sample-sql-005 | 커버 |
| 소프트웨어 개발 보안 | 보안, 암호, 해시, 인증, 인가, 취약점, SQL Injection, XSS | 33 | sample-sec-001, sample-sec-002, sample-sec-003, sample-sec-004, gen-sec-001 | 커버 |
| 프로그래밍 언어 활용 | C, Java, Python, 프로그래밍, 출력예측, 포인터, 상속, 리스트 | 123 | sample-c-001, sample-c-002, sample-c-003, sample-c-004, sample-c-005 | 커버 |
| 응용 SW 기초 기술 | OS, 운영체제, 네트워크, 스케줄링, 프로세스, TCP, UDP, IP | 33 | sample-sec-001, sample-sec-002, sample-sec-003, sample-sec-004, gen-sec-001 | 커버 |
| 제품 소프트웨어 패키징 | 패키징, 릴리즈, 버전, 배포, 제품소프트웨어 | 1 | round2-2026-sw-012 | 커버 |

## 문제 추가 후보

coverage가 0인 영역:

- 요구사항 확인
- 화면 설계

coverage가 낮은 영역:

- 제품 소프트웨어 패키징
- 통합 구현/인터페이스
- 서버 프로그램 구현

새 문제를 추가할 때도 기출 원문은 저장하지 않고, 변형 문제만 `originalIncluded: false`로 유지합니다.
