# Source Policy

공개 저장소에는 학습 플랫폼 코드와 변형 샘플 문제만 포함합니다. 실제 기출 원문, 교재 원문, 복원 문제 원문, PDF/ZIP 파일은 포함하지 않습니다.

## SourceKind

### official

공식 출제기준/시험 정보입니다. 범주와 학습 방향을 잡는 데 사용합니다. 원문 문항은 포함하지 않습니다.

### publisher

출판사 공개 학습자료/자료실입니다. 공개적으로 확인 가능한 학습 범주를 참고하되, 교재 문장이나 문항 원문은 포함하지 않습니다.

### restored

복원 문제 기반 경향입니다. 공식 확정 기출로 표시하지 않고 `confidence`를 둡니다.

### review

개인 후기 기반 경향입니다. 표본이 제한적이므로 낮은 신뢰도로만 반영합니다.

### user-local

사용자가 직접 가진 자료를 로컬에서 import한 데이터입니다. 기본 저장소에 포함하지 않습니다.

## 원문 금지

다음은 공개 저장소에 포함하면 안 됩니다.

- 공식 기출 원문
- 복원 문제 원문
- 교재/PDF 문장
- `*.pdf`, `*.zip`, `*.7z`, `*.rar`, `*.db`, `*.sqlite`
- `materials/private/`, `data/private/`, `imports/raw/`, `.local/`

## originalIncluded

기본 샘플과 공개 저장소 데이터는 `originalIncluded: false`여야 합니다.

`originalIncluded: true` 데이터는 기본 import에서 거부됩니다. 개인 학습용 원문 자료는 공개 저장소 밖의 private 영역에서 관리해야 합니다.

## 변형 문제 원칙

샘플 문제는 출제 패턴과 태그를 바탕으로 새로 작성합니다.

- 변수명, 숫자, 구조, 문장 모두 새로 작성합니다.
- 출처는 `sourceKind`, `sourceConfidence`, `sourceNote`로 표시합니다.
- 복원/후기 기반이면 공식 확정처럼 보이지 않게 표시합니다.
