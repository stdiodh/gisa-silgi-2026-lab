# 데이터 형식

이 앱은 사용자가 직접 가진 JSON, CSV, Markdown 파일을 로컬 브라우저에서 읽어 문제은행에 추가합니다. 공식 기출/교재 원문을 저장소에 넣지 마세요.

## JSON

```json
{
  "questions": [
    {
      "id": "sample-c-001",
      "title": "C 배열과 반복문 출력",
      "type": "code-output",
      "chapter": "10장 프로그래밍 언어 활용",
      "topic": "C 제어문",
      "tags": ["C", "반복문", "배열", "출력예측"],
      "priority": "A",
      "trend2026Round1": true,
      "language": "C",
      "prompt": "다음 코드의 출력 결과를 쓰시오.",
      "code": "...",
      "answer": "예시정답",
      "aliases": ["예시 정답"],
      "explanation": "변수 i가 증가하면서 배열 요소가 순서대로 처리된다.",
      "trace": [
        {
          "step": 1,
          "line": "for (...)",
          "variableChanges": { "i": 0 },
          "outputSoFar": "",
          "note": "반복 시작"
        }
      ],
      "sourceNote": "샘플 변형 문제"
    }
  ]
}
```

## 필수 필드

- `id`
- `title`
- `type`
- `chapter`
- `topic`
- `tags`
- `priority`: `A`, `B`, `C`
- `trend2026Round1`
- `prompt`
- `answer`
- `explanation`
- `sourceNote`
- `originalIncluded`: 기본 앱 데이터와 공개 저장소에서는 항상 `false`

## 선택 필드

- `language`: `C`, `Java`, `Python`, `SQL`
- `code`
- `choices`
- `aliases`
- `trace`
- `tableAnswer`
- `sourceYear`
- `sourceRound`
- `sourceKind`: `official`, `publisher`, `restored`, `review`, `user-local`
- `sourceConfidence`: `high`, `medium`, `low`
- `derivedFromTrendSignalIds`
- `createdAt`
- `updatedAt`

`originalIncluded`가 `true`인 데이터는 기본 import에서 거부됩니다. 공개 저장소/앱 기본 데이터에는 실제 기출 원문, 교재 원문, 복원 문제 원문을 포함할 수 없습니다.

`code-output` 문제는 `trace`가 최소 2단계 이상 필요합니다.

## CSV

첫 줄은 헤더입니다. `tags`, `aliases`, `choices`는 `|`, `,`, `;`로 구분할 수 있습니다.

```csv
id,title,type,chapter,topic,tags,priority,trend2026Round1,language,prompt,answer,explanation,sourceNote
my-q-001,샘플 단답,short-answer,SQL 응용,DCL,SQL|DCL,A,true,SQL,권한 부여 명령은?,GRANT,GRANT는 권한 부여 명령이다.,개인 학습 자료
```

## Markdown

문제 블록은 `---`로 구분하고 각 줄은 `key: value` 형식을 사용합니다.

```markdown
id: my-q-001
title: 샘플 단답
type: short-answer
chapter: SQL 응용
topic: DCL
tags: SQL|DCL
priority: A
trend2026Round1: true
language: SQL
prompt: 권한 부여 명령은?
answer: GRANT
explanation: GRANT는 권한 부여 명령이다.
sourceNote: 개인 학습 자료
```
