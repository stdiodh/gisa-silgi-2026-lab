import type { Question } from '../domain/question';

const sourceNote = '2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)';

export const round2TargetQuestions: Question[] = [
  {
    "id": "round2-2026-c-001",
    "title": "C 포인터 배열 이동",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 포인터",
    "tags": [
      "포인터",
      "배열",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "포인터가 배열 중간을 가리킬 때 출력 결과를 쓰시오.",
    "code": "#include <stdio.h>\nint main(void) {\n  int a[5] = {3, 1, 4, 1, 5};\n  int *p = a + 1;\n  printf(\"%d %d\", *p, *(p + 2));\n  return 0;\n}",
    "answer": "1 1",
    "aliases": [
      "11",
      "1 1\n"
    ],
    "explanation": "풀이 포인트: a+1은 a[1]을 가리킨다. *(p+2)는 a[3]이다. 키워드: 포인터 산술은 자료형 크기 단위로 이동한다.",
    "trace": [
      {
        "step": 1,
        "line": "int *p = a + 1",
        "variableChanges": {
          "p": "&a[1]",
          "*p": 1
        },
        "outputSoFar": "",
        "note": "배열명 a는 첫 원소 주소로 해석된다."
      },
      {
        "step": 2,
        "line": "*(p + 2)",
        "variableChanges": {
          "p+2": "&a[3]",
          "*(p+2)": 1
        },
        "outputSoFar": "",
        "note": "p 기준 두 칸 뒤는 a[3]이다."
      },
      {
        "step": 3,
        "line": "printf",
        "variableChanges": {},
        "outputSoFar": "1 1",
        "note": "두 값을 공백으로 출력한다."
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-002",
    "title": "C 후위 증가와 포인터 역참조",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 포인터",
    "tags": [
      "포인터",
      "증감",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "후위 증가가 값 사용과 변수 변경에 미치는 영향을 쓰시오.",
    "code": "#include <stdio.h>\nint main(void) {\n  int x = 10;\n  int *p = &x;\n  printf(\"%d \", (*p)++);\n  printf(\"%d\", x);\n  return 0;\n}",
    "answer": "10 11",
    "aliases": [
      "1011",
      "10 11\n"
    ],
    "explanation": "풀이 포인트: (*p)++는 x의 현재 값 10을 먼저 사용하고, 그 다음 x를 11로 증가시킨다. 키워드: 후위 증가, 역참조.",
    "trace": [
      {
        "step": 1,
        "line": "int *p = &x",
        "variableChanges": {
          "x": 10,
          "p": "&x"
        },
        "outputSoFar": "",
        "note": "p가 x를 가리킨다."
      },
      {
        "step": 2,
        "line": "printf(\"%d \", (*p)++)",
        "variableChanges": {
          "used": 10,
          "x": 11
        },
        "outputSoFar": "10 ",
        "note": "현재 값을 출력한 뒤 증가한다."
      },
      {
        "step": 3,
        "line": "printf(\"%d\", x)",
        "variableChanges": {
          "x": 11
        },
        "outputSoFar": "10 11",
        "note": "증가된 x를 출력한다."
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-003",
    "title": "C 문자열 포인터 인덱스",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 문자열",
    "tags": [
      "문자열",
      "포인터",
      "배열",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "문자열 배열에서 2칸씩 건너뛸 때 출력 문자열을 쓰시오.",
    "code": "#include <stdio.h>\nint main(void) {\n  char s[] = \"IPSEC\";\n  for (int i = 0; i < 5; i += 2) {\n    printf(\"%c\", *(s + i));\n  }\n  return 0;\n}",
    "answer": "ISC",
    "aliases": [
      "ISC",
      "ISC\n",
      "isc"
    ],
    "explanation": "풀이 포인트: i는 0, 2, 4가 되고 s[0]=I, s[2]=S, s[4]=C가 출력된다. 키워드: 문자열 끝의 null은 출력 범위 밖이다.",
    "trace": [
      {
        "step": 1,
        "line": "i=0",
        "variableChanges": {
          "i": 0,
          "*(s+i)": "I"
        },
        "outputSoFar": "I",
        "note": "첫 글자 출력"
      },
      {
        "step": 2,
        "line": "i=2",
        "variableChanges": {
          "i": 2,
          "*(s+i)": "S"
        },
        "outputSoFar": "IS",
        "note": "두 칸 뒤 출력"
      },
      {
        "step": 3,
        "line": "i=4",
        "variableChanges": {
          "i": 4,
          "*(s+i)": "C"
        },
        "outputSoFar": "ISC",
        "note": "마지막 유효 문자 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-004",
    "title": "C 구조체 배열 포인터",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 구조체",
    "tags": [
      "구조체",
      "포인터",
      "배열",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "구조체 배열에서 포인터가 가리키는 필드 값을 계산하시오.",
    "code": "#include <stdio.h>\ntypedef struct { int id; int score; } Student;\nint main(void) {\n  Student a[3] = {{1,70}, {2,80}, {3,90}};\n  Student *p = a;\n  printf(\"%d\", (p + 1)->score + p->id);\n  return 0;\n}",
    "answer": "81",
    "aliases": [
      "81",
      "81\n"
    ],
    "explanation": "풀이 포인트: p는 a[0], p+1은 a[1]이다. (p+1)->score는 80, p->id는 1이므로 81이다. 키워드: 구조체 포인터의 -> 연산.",
    "trace": [
      {
        "step": 1,
        "line": "Student *p = a",
        "variableChanges": {
          "p": "&a[0]"
        },
        "outputSoFar": "",
        "note": "배열 첫 원소를 가리킨다."
      },
      {
        "step": 2,
        "line": "(p + 1)->score",
        "variableChanges": {
          "(p+1)->score": 80,
          "p->id": 1
        },
        "outputSoFar": "",
        "note": "두 필드를 읽는다."
      },
      {
        "step": 3,
        "line": "printf",
        "variableChanges": {
          "result": 81
        },
        "outputSoFar": "81",
        "note": "80+1 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-005",
    "title": "C 함수 포인터와 재귀 합",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 함수 포인터",
    "tags": [
      "함수포인터",
      "재귀",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "함수 포인터로 재귀 함수를 호출한 결과를 쓰시오.",
    "code": "#include <stdio.h>\nint f(int n) {\n  if (n <= 1) return 1;\n  return n + f(n - 2);\n}\nint main(void) {\n  int (*fp)(int) = f;\n  printf(\"%d\", fp(5));\n  return 0;\n}",
    "answer": "9",
    "aliases": [
      "9",
      "9\n"
    ],
    "explanation": "풀이 포인트: fp(5)는 f(5)와 같다. f(5)=5+f(3), f(3)=3+f(1), f(1)=1이므로 9다. 키워드: 함수 포인터, 재귀 종료 조건.",
    "trace": [
      {
        "step": 1,
        "line": "fp(5)",
        "variableChanges": {
          "call": "f(5)"
        },
        "outputSoFar": "",
        "note": "함수 포인터가 f를 호출"
      },
      {
        "step": 2,
        "line": "f(5) -> 5 + f(3)",
        "variableChanges": {
          "partial": "5 + 3 + f(1)"
        },
        "outputSoFar": "",
        "note": "2씩 감소"
      },
      {
        "step": 3,
        "line": "f(1)",
        "variableChanges": {
          "return": 1
        },
        "outputSoFar": "",
        "note": "종료 조건"
      },
      {
        "step": 4,
        "line": "printf",
        "variableChanges": {
          "result": 9
        },
        "outputSoFar": "9",
        "note": "5+3+1"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-006",
    "title": "C switch fall-through",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 제어문",
    "tags": [
      "switch",
      "break",
      "fall-through",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "break가 없는 case가 있을 때 출력 결과를 쓰시오.",
    "code": "#include <stdio.h>\nint main(void) {\n  int x = 2;\n  switch (x) {\n    case 1: printf(\"A\");\n    case 2: printf(\"B\");\n    case 3: printf(\"C\"); break;\n    default: printf(\"D\");\n  }\n  return 0;\n}",
    "answer": "BC",
    "aliases": [
      "BC",
      "BC\n",
      "bc"
    ],
    "explanation": "풀이 포인트: case 2로 이동한 뒤 break를 만날 때까지 case 3까지 이어서 실행된다. 키워드: switch fall-through.",
    "trace": [
      {
        "step": 1,
        "line": "switch(x), x=2",
        "variableChanges": {
          "case": 2
        },
        "outputSoFar": "",
        "note": "case 2로 진입"
      },
      {
        "step": 2,
        "line": "case 2",
        "variableChanges": {},
        "outputSoFar": "B",
        "note": "B 출력, break 없음"
      },
      {
        "step": 3,
        "line": "case 3",
        "variableChanges": {},
        "outputSoFar": "BC",
        "note": "C 출력 후 break"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-007",
    "title": "C 비트 AND와 산술 우선순위",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 연산자",
    "tags": [
      "비트연산",
      "연산자우선순위",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "비트 연산과 덧셈이 섞인 식의 결과를 쓰시오.",
    "code": "#include <stdio.h>\nint main(void) {\n  int a = 5, b = 3;\n  printf(\"%d\", a & b + 1);\n  return 0;\n}",
    "answer": "4",
    "aliases": [
      "4",
      "4\n"
    ],
    "explanation": "풀이 포인트: +가 &보다 우선순위가 높아 b+1=4를 먼저 계산한다. 5(0101) & 4(0100)=4. 키워드: 연산자 우선순위, 비트 AND.",
    "trace": [
      {
        "step": 1,
        "line": "b + 1",
        "variableChanges": {
          "b+1": 4
        },
        "outputSoFar": "",
        "note": "덧셈 먼저"
      },
      {
        "step": 2,
        "line": "a & 4",
        "variableChanges": {
          "5 & 4": 4
        },
        "outputSoFar": "",
        "note": "0101 & 0100"
      },
      {
        "step": 3,
        "line": "printf",
        "variableChanges": {},
        "outputSoFar": "4",
        "note": "결과 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-008",
    "title": "C 중첩 반복문 continue",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 제어문",
    "tags": [
      "반복문",
      "continue",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "중첩 반복문에서 continue가 누적 합계에 미치는 결과를 쓰시오.",
    "code": "#include <stdio.h>\nint main(void) {\n  int s = 0;\n  for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n      if (i == j) continue;\n      s += i + j;\n    }\n  }\n  printf(\"%d\", s);\n  return 0;\n}",
    "answer": "12",
    "aliases": [
      "12",
      "12\n"
    ],
    "explanation": "풀이 포인트: i==j인 (0,0),(1,1),(2,2)는 제외한다. 나머지 쌍의 i+j 합은 12다. 키워드: continue는 현재 반복의 나머지를 건너뛴다.",
    "trace": [
      {
        "step": 1,
        "line": "i=0",
        "variableChanges": {
          "added": "1+2",
          "s": 3
        },
        "outputSoFar": "",
        "note": "j=1,2만 더함"
      },
      {
        "step": 2,
        "line": "i=1",
        "variableChanges": {
          "added": "1+3",
          "s": 7
        },
        "outputSoFar": "",
        "note": "j=0,2"
      },
      {
        "step": 3,
        "line": "i=2",
        "variableChanges": {
          "added": "2+3",
          "s": 12
        },
        "outputSoFar": "",
        "note": "j=0,1"
      },
      {
        "step": 4,
        "line": "printf",
        "variableChanges": {},
        "outputSoFar": "12",
        "note": "합계 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-009",
    "title": "C 정수 나눗셈과 나머지",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 연산자",
    "tags": [
      "정수나눗셈",
      "나머지",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "정수형 나눗셈과 나머지 결과를 쓰시오.",
    "code": "#include <stdio.h>\nint main(void) {\n  int a = 17, b = 5;\n  printf(\"%d %d\", a / b, a % b);\n  return 0;\n}",
    "answer": "3 2",
    "aliases": [
      "32",
      "3 2\n"
    ],
    "explanation": "풀이 포인트: 정수 나눗셈은 몫만 남기므로 17/5=3, 나머지는 2다. 키워드: 정수형 /, %.",
    "trace": [
      {
        "step": 1,
        "line": "a / b",
        "variableChanges": {
          "17/5": 3
        },
        "outputSoFar": "",
        "note": "몫"
      },
      {
        "step": 2,
        "line": "a % b",
        "variableChanges": {
          "17%5": 2
        },
        "outputSoFar": "",
        "note": "나머지"
      },
      {
        "step": 3,
        "line": "printf",
        "variableChanges": {},
        "outputSoFar": "3 2",
        "note": "공백 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-010",
    "title": "C 배열 원소를 포인터로 변경",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 포인터",
    "tags": [
      "포인터",
      "배열",
      "대입",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "포인터로 배열 원소를 바꾼 뒤 출력되는 값을 쓰시오.",
    "code": "#include <stdio.h>\nint main(void) {\n  int a[] = {2, 4, 6};\n  int *p = a;\n  *(p + 2) = *p + *(p + 1);\n  printf(\"%d\", a[2]);\n  return 0;\n}",
    "answer": "6",
    "aliases": [
      "6",
      "6\n"
    ],
    "explanation": "풀이 포인트: *(p+2)는 a[2]이고, *p + *(p+1)는 2+4=6이다. 원래 값도 6이지만 대입 과정을 반드시 추적해야 한다.",
    "trace": [
      {
        "step": 1,
        "line": "int *p = a",
        "variableChanges": {
          "p": "&a[0]"
        },
        "outputSoFar": "",
        "note": "첫 원소 주소"
      },
      {
        "step": 2,
        "line": "*(p + 2) = *p + *(p + 1)",
        "variableChanges": {
          "a[2]": 6
        },
        "outputSoFar": "",
        "note": "a[2]=2+4"
      },
      {
        "step": 3,
        "line": "printf",
        "variableChanges": {},
        "outputSoFar": "6",
        "note": "a[2] 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-011",
    "title": "C 구조체 포인터 증가",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 구조체",
    "tags": [
      "구조체",
      "포인터증가",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "구조체 포인터가 다음 원소로 이동한 뒤 변경되는 값을 쓰시오.",
    "code": "#include <stdio.h>\ntypedef struct { int v; } Node;\nint main(void) {\n  Node arr[2] = {{4}, {7}};\n  Node *p = arr;\n  p++;\n  p->v += arr[0].v;\n  printf(\"%d\", arr[1].v);\n  return 0;\n}",
    "answer": "11",
    "aliases": [
      "11",
      "11\n"
    ],
    "explanation": "풀이 포인트: p++ 후 p는 arr[1]을 가리킨다. arr[1].v에 arr[0].v 4를 더해 11이 된다. 키워드: 구조체 포인터 산술.",
    "trace": [
      {
        "step": 1,
        "line": "p = arr",
        "variableChanges": {
          "p": "&arr[0]"
        },
        "outputSoFar": "",
        "note": "첫 구조체"
      },
      {
        "step": 2,
        "line": "p++",
        "variableChanges": {
          "p": "&arr[1]"
        },
        "outputSoFar": "",
        "note": "다음 구조체 원소"
      },
      {
        "step": 3,
        "line": "p->v += arr[0].v",
        "variableChanges": {
          "arr[1].v": 11
        },
        "outputSoFar": "",
        "note": "7+4"
      },
      {
        "step": 4,
        "line": "printf",
        "variableChanges": {},
        "outputSoFar": "11",
        "note": "변경된 원소 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-c-012",
    "title": "C 문자 연산과 ASCII",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "C 문자",
    "tags": [
      "char",
      "ASCII",
      "형식지정자",
      "C",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "C",
    "prompt": "문자 연산과 정수 출력 형식의 결과를 쓰시오.",
    "code": "#include <stdio.h>\nint main(void) {\n  char c = 'A';\n  printf(\"%c%d\", c + 2, c);\n  return 0;\n}",
    "answer": "C65",
    "aliases": [
      "C65",
      "C65\n",
      "c65"
    ],
    "explanation": "풀이 포인트: %c는 문자로 해석해 A+2=C를 출력하고, %d는 문자 A의 코드값 65를 출력한다. 키워드: char는 정수형처럼 연산된다.",
    "trace": [
      {
        "step": 1,
        "line": "c = 'A'",
        "variableChanges": {
          "c": "A",
          "ASCII": 65
        },
        "outputSoFar": "",
        "note": "문자 코드"
      },
      {
        "step": 2,
        "line": "%c, c + 2",
        "variableChanges": {
          "c+2": "C"
        },
        "outputSoFar": "C",
        "note": "문자로 출력"
      },
      {
        "step": 3,
        "line": "%d, c",
        "variableChanges": {
          "c": 65
        },
        "outputSoFar": "C65",
        "note": "정수로 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-code-output-heavy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-001",
    "title": "Java 부모 생성자 내부 오버라이딩 호출",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java 상속",
    "tags": [
      "생성자",
      "오버라이딩",
      "동적바인딩",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "부모 생성자에서 재정의된 메서드를 호출할 때 출력 순서를 쓰시오.",
    "code": "class A {\n  A() { System.out.print(\"A\"); m(); }\n  void m() { System.out.print(\"B\"); }\n}\nclass C extends A {\n  C() { System.out.print(\"D\"); }\n  void m() { System.out.print(\"C\"); }\n}\npublic class Main {\n  public static void main(String[] args) { new C(); }\n}",
    "answer": "ACD",
    "aliases": [
      "ACD",
      "ACD\n",
      "acd"
    ],
    "explanation": "풀이 포인트: 자식 객체 생성 시 부모 생성자가 먼저 실행되지만, m()은 실제 객체 C의 오버라이딩 메서드가 호출된다. 키워드: 생성자 순서 + 동적 바인딩.",
    "trace": [
      {
        "step": 1,
        "line": "new C()",
        "variableChanges": {
          "call": "A()"
        },
        "outputSoFar": "",
        "note": "부모 생성자 먼저"
      },
      {
        "step": 2,
        "line": "A() print A; m()",
        "variableChanges": {
          "method": "C.m()"
        },
        "outputSoFar": "AC",
        "note": "A 출력 후 오버라이딩된 C.m 호출"
      },
      {
        "step": 3,
        "line": "C()",
        "variableChanges": {},
        "outputSoFar": "ACD",
        "note": "자식 생성자 D 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-002",
    "title": "Java static 메서드와 인스턴스 메서드",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java static",
    "tags": [
      "static",
      "오버라이딩",
      "숨김",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "static 메서드와 인스턴스 메서드 호출 기준의 차이를 쓰시오.",
    "code": "class P {\n  static void s() { System.out.print(\"P\"); }\n  void m() { System.out.print(\"p\"); }\n}\nclass C extends P {\n  static void s() { System.out.print(\"C\"); }\n  void m() { System.out.print(\"c\"); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    P x = new C();\n    x.s();\n    x.m();\n  }\n}",
    "answer": "Pc",
    "aliases": [
      "Pc",
      "Pc\n",
      "pc"
    ],
    "explanation": "풀이 포인트: static 메서드는 참조 타입 P 기준으로 P.s가 선택되고, 인스턴스 메서드는 실제 객체 C 기준으로 C.m이 호출된다. 키워드: static hiding vs overriding.",
    "trace": [
      {
        "step": 1,
        "line": "P x = new C()",
        "variableChanges": {
          "referenceType": "P",
          "actualType": "C"
        },
        "outputSoFar": "",
        "note": "업캐스팅"
      },
      {
        "step": 2,
        "line": "x.s()",
        "variableChanges": {
          "selected": "P.s"
        },
        "outputSoFar": "P",
        "note": "static은 참조 타입 기준"
      },
      {
        "step": 3,
        "line": "x.m()",
        "variableChanges": {
          "selected": "C.m"
        },
        "outputSoFar": "Pc",
        "note": "인스턴스 메서드는 동적 바인딩"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-003",
    "title": "Java 오버로딩 확대 변환 우선",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java 오버로딩",
    "tags": [
      "오버로딩",
      "형변환",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "int 인자가 long과 Integer 오버로드 중 어디로 가는지 쓰시오.",
    "code": "public class Main {\n  static void f(long x) { System.out.print(\"L\"); }\n  static void f(Integer x) { System.out.print(\"I\"); }\n  public static void main(String[] args) { f(3); }\n}",
    "answer": "L",
    "aliases": [
      "L",
      "L\n",
      "l"
    ],
    "explanation": "풀이 포인트: Java 오버로딩 선택에서 int는 boxing(Integer)보다 widening(long)을 우선한다. 키워드: widening > boxing.",
    "trace": [
      {
        "step": 1,
        "line": "f(3)",
        "variableChanges": {
          "literalType": "int"
        },
        "outputSoFar": "",
        "note": "정수 리터럴은 int"
      },
      {
        "step": 2,
        "line": "overload resolution",
        "variableChanges": {
          "selected": "f(long)"
        },
        "outputSoFar": "",
        "note": "확대 변환 우선"
      },
      {
        "step": 3,
        "line": "print",
        "variableChanges": {},
        "outputSoFar": "L",
        "note": "L 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-004",
    "title": "Java 문자열 결합 왼쪽 평가",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java String",
    "tags": [
      "String",
      "연산자",
      "평가순서",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "숫자 덧셈과 문자열 결합이 섞인 출력 결과를 쓰시오.",
    "code": "public class Main {\n  public static void main(String[] args) {\n    String a = \"1\";\n    System.out.print(1 + 2 + a + 3 + 4);\n  }\n}",
    "answer": "3134",
    "aliases": [
      "3134",
      "3134\n"
    ],
    "explanation": "풀이 포인트: 1+2는 숫자 덧셈으로 3, 이후 문자열 a를 만나면 뒤의 +는 문자열 결합이다. 키워드: +는 왼쪽부터 평가.",
    "trace": [
      {
        "step": 1,
        "line": "1 + 2",
        "variableChanges": {
          "value": 3
        },
        "outputSoFar": "",
        "note": "숫자끼리 먼저 덧셈"
      },
      {
        "step": 2,
        "line": "3 + a",
        "variableChanges": {
          "value": "31"
        },
        "outputSoFar": "",
        "note": "문자열 결합 시작"
      },
      {
        "step": 3,
        "line": "+ 3 + 4",
        "variableChanges": {
          "value": "3134"
        },
        "outputSoFar": "3134",
        "note": "뒤는 모두 결합"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-005",
    "title": "Java 향상된 for와 원본 배열",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java 배열",
    "tags": [
      "배열",
      "enhanced for",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "향상된 for문에서 반복 변수만 바꿨을 때 원본 배열 값이 바뀌는지 쓰시오.",
    "code": "public class Main {\n  public static void main(String[] args) {\n    int[] a = {1, 2, 3};\n    for (int x : a) { x += 10; }\n    System.out.print(a[1]);\n  }\n}",
    "answer": "2",
    "aliases": [
      "2",
      "2\n"
    ],
    "explanation": "풀이 포인트: 향상된 for의 x는 배열 원소 값을 복사한 지역 변수다. x를 바꿔도 a[1]은 그대로 2다. 키워드: primitive 값 복사.",
    "trace": [
      {
        "step": 1,
        "line": "for (int x : a)",
        "variableChanges": {
          "x": "copy of element"
        },
        "outputSoFar": "",
        "note": "반복 변수는 복사값"
      },
      {
        "step": 2,
        "line": "x += 10",
        "variableChanges": {
          "a": "unchanged"
        },
        "outputSoFar": "",
        "note": "원본 배열 변경 없음"
      },
      {
        "step": 3,
        "line": "print a[1]",
        "variableChanges": {
          "a[1]": 2
        },
        "outputSoFar": "2",
        "note": "2 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-006",
    "title": "Java 배열 참조 공유",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java 참조",
    "tags": [
      "배열",
      "참조",
      "객체",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "두 배열 변수가 같은 배열을 참조할 때 출력 결과를 쓰시오.",
    "code": "public class Main {\n  public static void main(String[] args) {\n    int[] a = {1, 2};\n    int[] b = a;\n    b[0] = 9;\n    System.out.print(a[0] + b[1]);\n  }\n}",
    "answer": "11",
    "aliases": [
      "11",
      "11\n"
    ],
    "explanation": "풀이 포인트: b=a는 배열 복사가 아니라 같은 배열 참조 공유다. b[0]=9는 a[0]도 9로 보이게 한다. 키워드: 참조형 대입.",
    "trace": [
      {
        "step": 1,
        "line": "int[] b = a",
        "variableChanges": {
          "a,b": "same array"
        },
        "outputSoFar": "",
        "note": "참조 공유"
      },
      {
        "step": 2,
        "line": "b[0] = 9",
        "variableChanges": {
          "a[0]": 9,
          "b[1]": 2
        },
        "outputSoFar": "",
        "note": "같은 배열 수정"
      },
      {
        "step": 3,
        "line": "print",
        "variableChanges": {
          "result": 11
        },
        "outputSoFar": "11",
        "note": "9+2"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-007",
    "title": "Java 필드 숨김과 캐스팅",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java 상속",
    "tags": [
      "상속",
      "필드",
      "캐스팅",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "필드는 참조 타입 기준이라는 점을 이용해 출력 결과를 쓰시오.",
    "code": "class A { int x = 1; }\nclass B extends A { int x = 2; }\npublic class Main {\n  public static void main(String[] args) {\n    A a = new B();\n    System.out.print(a.x + \" \" + ((B) a).x);\n  }\n}",
    "answer": "1 2",
    "aliases": [
      "12",
      "1 2\n"
    ],
    "explanation": "풀이 포인트: 메서드는 동적 바인딩되지만 필드는 오버라이딩되지 않고 참조 타입 기준으로 접근된다. 캐스팅 후 B의 x를 읽는다. 키워드: field hiding.",
    "trace": [
      {
        "step": 1,
        "line": "A a = new B()",
        "variableChanges": {
          "referenceType": "A",
          "actualType": "B"
        },
        "outputSoFar": "",
        "note": "업캐스팅"
      },
      {
        "step": 2,
        "line": "a.x",
        "variableChanges": {
          "field": "A.x=1"
        },
        "outputSoFar": "1 ",
        "note": "참조 타입 A"
      },
      {
        "step": 3,
        "line": "((B)a).x",
        "variableChanges": {
          "field": "B.x=2"
        },
        "outputSoFar": "1 2",
        "note": "캐스팅 후 B 필드"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-008",
    "title": "Java finally의 return 우선",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java 예외처리",
    "tags": [
      "try",
      "finally",
      "return",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "try와 finally에 모두 return이 있을 때 출력 결과를 쓰시오.",
    "code": "public class Main {\n  static int f() {\n    try { return 1; }\n    finally { return 2; }\n  }\n  public static void main(String[] args) {\n    System.out.print(f());\n  }\n}",
    "answer": "2",
    "aliases": [
      "2",
      "2\n"
    ],
    "explanation": "풀이 포인트: finally 블록은 return 직전에도 실행되며, finally의 return이 try의 return 값을 덮는다. 키워드: finally 우선 실행.",
    "trace": [
      {
        "step": 1,
        "line": "try return 1",
        "variableChanges": {
          "pendingReturn": 1
        },
        "outputSoFar": "",
        "note": "반환 예정"
      },
      {
        "step": 2,
        "line": "finally return 2",
        "variableChanges": {
          "actualReturn": 2
        },
        "outputSoFar": "",
        "note": "finally가 덮음"
      },
      {
        "step": 3,
        "line": "print f()",
        "variableChanges": {},
        "outputSoFar": "2",
        "note": "2 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-009",
    "title": "Java 재귀 Fibonacci",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java 재귀",
    "tags": [
      "재귀",
      "함수호출",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "재귀 호출 결과를 계산하시오.",
    "code": "public class Main {\n  static int f(int n) {\n    if (n <= 1) return n;\n    return f(n - 1) + f(n - 2);\n  }\n  public static void main(String[] args) {\n    System.out.print(f(5));\n  }\n}",
    "answer": "5",
    "aliases": [
      "5",
      "5\n"
    ],
    "explanation": "풀이 포인트: f(0)=0, f(1)=1인 피보나치 형태다. f(5)=5. 키워드: 재귀 종료 조건과 중복 호출.",
    "trace": [
      {
        "step": 1,
        "line": "f(5)",
        "variableChanges": {
          "formula": "f(4)+f(3)"
        },
        "outputSoFar": "",
        "note": "재귀 분해"
      },
      {
        "step": 2,
        "line": "base",
        "variableChanges": {
          "f(0)": 0,
          "f(1)": 1
        },
        "outputSoFar": "",
        "note": "종료 조건"
      },
      {
        "step": 3,
        "line": "f(5)",
        "variableChanges": {
          "result": 5
        },
        "outputSoFar": "5",
        "note": "피보나치 결과"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-java-010",
    "title": "Java 전위 후위 증가 평가 순서",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Java 연산자",
    "tags": [
      "증감연산자",
      "평가순서",
      "Java",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Java",
    "prompt": "전위/후위 증가가 한 식에 있을 때 출력 결과를 쓰시오.",
    "code": "public class Main {\n  public static void main(String[] args) {\n    int x = 3;\n    int y = x++ + ++x;\n    System.out.print(y + \" \" + x);\n  }\n}",
    "answer": "8 5",
    "aliases": [
      "85",
      "8 5\n"
    ],
    "explanation": "풀이 포인트: Java는 왼쪽부터 평가한다. x++는 3 사용 후 4, ++x는 먼저 5가 되고 사용되어 y=8이다. 키워드: 전위/후위, 왼쪽 평가.",
    "trace": [
      {
        "step": 1,
        "line": "x++",
        "variableChanges": {
          "used": 3,
          "x": 4
        },
        "outputSoFar": "",
        "note": "후위 증가"
      },
      {
        "step": 2,
        "line": "++x",
        "variableChanges": {
          "x": 5,
          "used": 5
        },
        "outputSoFar": "",
        "note": "전위 증가"
      },
      {
        "step": 3,
        "line": "y = 3 + 5",
        "variableChanges": {
          "y": 8,
          "x": 5
        },
        "outputSoFar": "8 5",
        "note": "y와 x 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-java-binding-string-static"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-001",
    "title": "Python 음수 step 슬라이싱",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python 슬라이싱",
    "tags": [
      "슬라이싱",
      "음수인덱스",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "음수 step 슬라이싱 결과를 쓰시오.",
    "code": "a = [0, 1, 2, 3, 4, 5]\nprint(a[-2:1:-2])",
    "answer": "[4, 2]",
    "aliases": [
      "[4,2]",
      "[4, 2]\n"
    ],
    "explanation": "풀이 포인트: -2는 인덱스 4이고, stop 1은 포함하지 않는다. step -2로 4, 2가 선택된다. 키워드: stop 미포함, 음수 step.",
    "trace": [
      {
        "step": 1,
        "line": "a[-2:1:-2]",
        "variableChanges": {
          "startIndex": 4,
          "stopIndex": 1,
          "step": -2
        },
        "outputSoFar": "",
        "note": "역방향 슬라이싱"
      },
      {
        "step": 2,
        "line": "selected",
        "variableChanges": {
          "values": [
            4,
            2
          ]
        },
        "outputSoFar": "",
        "note": "인덱스 4,2"
      },
      {
        "step": 3,
        "line": "print",
        "variableChanges": {},
        "outputSoFar": "[4, 2]",
        "note": "리스트 표현"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-002",
    "title": "Python 얕은 복사 내부 리스트 공유",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python 리스트 복사",
    "tags": [
      "얕은복사",
      "list copy",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "copy 이후 내부 리스트를 수정할 때 원본 출력 결과를 쓰시오.",
    "code": "a = [[0], [1]]\nb = a.copy()\nb[1].append(2)\nprint(a)",
    "answer": "[[0], [1, 2]]",
    "aliases": [
      "[[0],[1,2]]",
      "[[0], [1, 2]]\n"
    ],
    "explanation": "풀이 포인트: copy()는 바깥 리스트만 새로 만들고 내부 리스트 객체는 공유한다. b[1].append는 a[1]에도 보인다. 키워드: shallow copy.",
    "trace": [
      {
        "step": 1,
        "line": "b = a.copy()",
        "variableChanges": {
          "copy": "outer only"
        },
        "outputSoFar": "",
        "note": "얕은 복사"
      },
      {
        "step": 2,
        "line": "b[1].append(2)",
        "variableChanges": {
          "a[1]": "[1, 2]"
        },
        "outputSoFar": "",
        "note": "내부 리스트 공유"
      },
      {
        "step": 3,
        "line": "print(a)",
        "variableChanges": {},
        "outputSoFar": "[[0], [1, 2]]",
        "note": "원본 변경처럼 보임"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-003",
    "title": "Python 기본 인자 리스트 누적",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python 함수",
    "tags": [
      "기본인자",
      "리스트",
      "참조",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "기본 인자로 리스트를 사용할 때 두 번 호출한 출력 결과를 쓰시오.",
    "code": "def f(x=[]):\n    x.append(1)\n    return len(x)\nprint(f(), f())",
    "answer": "1 2",
    "aliases": [
      "12",
      "1 2\n"
    ],
    "explanation": "풀이 포인트: 기본 인자 리스트는 함수 정의 시 한 번 만들어져 호출 간 공유된다. 첫 호출 길이 1, 두 번째 호출 길이 2다. 키워드: mutable default argument.",
    "trace": [
      {
        "step": 1,
        "line": "first f()",
        "variableChanges": {
          "x": [
            1
          ],
          "return": 1
        },
        "outputSoFar": "",
        "note": "기본 리스트에 추가"
      },
      {
        "step": 2,
        "line": "second f()",
        "variableChanges": {
          "x": [
            1,
            1
          ],
          "return": 2
        },
        "outputSoFar": "",
        "note": "같은 리스트 재사용"
      },
      {
        "step": 3,
        "line": "print",
        "variableChanges": {},
        "outputSoFar": "1 2",
        "note": "공백으로 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-004",
    "title": "Python dict setdefault",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python dict",
    "tags": [
      "dict",
      "setdefault",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "setdefault가 기존 키와 신규 키에 적용될 때 결과를 쓰시오.",
    "code": "d = {\"a\": 1}\nd.setdefault(\"b\", 2)\nd.setdefault(\"a\", 9)\nprint(d[\"a\"] + d[\"b\"])",
    "answer": "3",
    "aliases": [
      "3",
      "3\n"
    ],
    "explanation": "풀이 포인트: b는 없으므로 2가 들어가고, a는 이미 있으므로 9로 바뀌지 않는다. 1+2=3. 키워드: setdefault는 기존 값을 보존.",
    "trace": [
      {
        "step": 1,
        "line": "setdefault(\"b\", 2)",
        "variableChanges": {
          "d[\"b\"]": 2
        },
        "outputSoFar": "",
        "note": "새 키 추가"
      },
      {
        "step": 2,
        "line": "setdefault(\"a\", 9)",
        "variableChanges": {
          "d[\"a\"]": 1
        },
        "outputSoFar": "",
        "note": "기존 키 유지"
      },
      {
        "step": 3,
        "line": "print",
        "variableChanges": {
          "result": 3
        },
        "outputSoFar": "3",
        "note": "1+2"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-005",
    "title": "Python set 차집합 정렬",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python set",
    "tags": [
      "set",
      "집합연산",
      "sorted",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "set 차집합 후 정렬된 리스트 출력 결과를 쓰시오.",
    "code": "a = {1, 2, 3}\nb = {3, 4}\nprint(sorted(a - b))",
    "answer": "[1, 2]",
    "aliases": [
      "[1,2]",
      "[1, 2]\n"
    ],
    "explanation": "풀이 포인트: a-b는 a에는 있고 b에는 없는 1,2다. sorted는 리스트로 정렬해 반환한다. 키워드: set difference.",
    "trace": [
      {
        "step": 1,
        "line": "a - b",
        "variableChanges": {
          "resultSet": "{1, 2}"
        },
        "outputSoFar": "",
        "note": "3은 제거"
      },
      {
        "step": 2,
        "line": "sorted(...)",
        "variableChanges": {
          "list": "[1, 2]"
        },
        "outputSoFar": "",
        "note": "정렬 리스트"
      },
      {
        "step": 3,
        "line": "print",
        "variableChanges": {},
        "outputSoFar": "[1, 2]",
        "note": "리스트 표현 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-006",
    "title": "Python 클래스 변수와 인스턴스 변수",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python class",
    "tags": [
      "class",
      "클래스변수",
      "인스턴스변수",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "클래스 변수와 인스턴스 변수 접근 결과를 쓰시오.",
    "code": "class A:\n    x = 1\na = A()\nb = A()\na.x = 3\nprint(A.x, b.x, a.x)",
    "answer": "1 1 3",
    "aliases": [
      "113",
      "1 1 3\n"
    ],
    "explanation": "풀이 포인트: a.x=3은 a 인스턴스에 x를 새로 만든다. 클래스 변수 A.x와 b.x는 여전히 1이다. 키워드: instance attribute shadows class attribute.",
    "trace": [
      {
        "step": 1,
        "line": "A.x = 1",
        "variableChanges": {
          "A.x": 1
        },
        "outputSoFar": "",
        "note": "클래스 변수"
      },
      {
        "step": 2,
        "line": "a.x = 3",
        "variableChanges": {
          "a.x": 3,
          "b.x": "lookup A.x"
        },
        "outputSoFar": "",
        "note": "a에 인스턴스 변수 생성"
      },
      {
        "step": 3,
        "line": "print",
        "variableChanges": {},
        "outputSoFar": "1 1 3",
        "note": "A, b, a 순서"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-007",
    "title": "Python enumerate와 range 누적",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python 반복문",
    "tags": [
      "enumerate",
      "range",
      "누적",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "enumerate 인덱스와 값의 곱을 누적한 결과를 쓰시오.",
    "code": "s = 0\nfor i, v in enumerate(range(2, 7, 2)):\n    s += i * v\nprint(s)",
    "answer": "16",
    "aliases": [
      "16",
      "16\n"
    ],
    "explanation": "풀이 포인트: range는 2,4,6이고 enumerate 인덱스는 0,1,2다. 0*2 + 1*4 + 2*6 = 16. 키워드: enumerate는 0부터 시작.",
    "trace": [
      {
        "step": 1,
        "line": "i=0, v=2",
        "variableChanges": {
          "s": 0
        },
        "outputSoFar": "",
        "note": "0*2"
      },
      {
        "step": 2,
        "line": "i=1, v=4",
        "variableChanges": {
          "s": 4
        },
        "outputSoFar": "",
        "note": "1*4"
      },
      {
        "step": 3,
        "line": "i=2, v=6",
        "variableChanges": {
          "s": 16
        },
        "outputSoFar": "",
        "note": "2*6 추가"
      },
      {
        "step": 4,
        "line": "print",
        "variableChanges": {},
        "outputSoFar": "16",
        "note": "누적값"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-008",
    "title": "Python 리스트 컴프리헨션 조건",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python list comprehension",
    "tags": [
      "리스트컴프리헨션",
      "조건식",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "조건이 있는 리스트 컴프리헨션 결과를 쓰시오.",
    "code": "a = [1, 2, 3]\nprint([x * 2 for x in a if x % 2])",
    "answer": "[2, 6]",
    "aliases": [
      "[2,6]",
      "[2, 6]\n"
    ],
    "explanation": "풀이 포인트: x%2가 참인 홀수 1,3만 선택하고 각각 2배로 만든다. 키워드: if 필터가 먼저 후보를 제한한다.",
    "trace": [
      {
        "step": 1,
        "line": "x=1",
        "variableChanges": {
          "condition": true,
          "value": 2
        },
        "outputSoFar": "",
        "note": "포함"
      },
      {
        "step": 2,
        "line": "x=2",
        "variableChanges": {
          "condition": false
        },
        "outputSoFar": "",
        "note": "제외"
      },
      {
        "step": 3,
        "line": "x=3",
        "variableChanges": {
          "condition": true,
          "value": 6
        },
        "outputSoFar": "[2, 6]",
        "note": "포함"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-009",
    "title": "Python join 문자열 결합",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python 문자열",
    "tags": [
      "join",
      "문자열",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "join을 이용한 문자열 출력 결과를 쓰시오.",
    "code": "print(\"-\".join([\"SQL\", \"DB\"]))",
    "answer": "SQL-DB",
    "aliases": [
      "SQL-DB",
      "SQL-DB\n",
      "sql-db"
    ],
    "explanation": "풀이 포인트: join은 리스트 원소 사이에 구분자 \"-\"를 넣어 하나의 문자열로 만든다. 키워드: separator.join(iterable).",
    "trace": [
      {
        "step": 1,
        "line": "\"-\".join([...])",
        "variableChanges": {
          "separator": "-",
          "items": "SQL,DB"
        },
        "outputSoFar": "",
        "note": "원소 사이에 구분자 삽입"
      },
      {
        "step": 2,
        "line": "print",
        "variableChanges": {
          "result": "SQL-DB"
        },
        "outputSoFar": "SQL-DB",
        "note": "문자열 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-010",
    "title": "Python try finally 출력 순서",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python 예외처리",
    "tags": [
      "try",
      "finally",
      "return",
      "print end",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "finally에서 출력 후 반환값을 출력할 때 결과를 쓰시오.",
    "code": "def f():\n    try:\n        return \"A\"\n    finally:\n        print(\"B\", end=\"\")\nprint(f())",
    "answer": "BA",
    "aliases": [
      "BA",
      "BA\n",
      "ba"
    ],
    "explanation": "풀이 포인트: return 직전 finally가 먼저 실행되어 B를 줄바꿈 없이 출력하고, 이후 f()의 반환값 A가 print된다. 키워드: finally 실행 순서, end 옵션.",
    "trace": [
      {
        "step": 1,
        "line": "try return \"A\"",
        "variableChanges": {
          "pendingReturn": "A"
        },
        "outputSoFar": "",
        "note": "반환 예정"
      },
      {
        "step": 2,
        "line": "finally print(\"B\", end=\"\")",
        "variableChanges": {},
        "outputSoFar": "B",
        "note": "줄바꿈 없이 B 출력"
      },
      {
        "step": 3,
        "line": "print(f())",
        "variableChanges": {
          "return": "A"
        },
        "outputSoFar": "BA",
        "note": "A 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-011",
    "title": "Python map lambda 리스트화",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python lambda",
    "tags": [
      "map",
      "lambda",
      "list",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "map과 lambda 결과를 리스트로 출력하시오.",
    "code": "a = list(map(lambda x: x + 1, [1, 2]))\nprint(a)",
    "answer": "[2, 3]",
    "aliases": [
      "[2,3]",
      "[2, 3]\n"
    ],
    "explanation": "풀이 포인트: lambda가 각 원소에 1을 더하고 list가 map 객체를 리스트로 변환한다. 키워드: map은 지연 객체.",
    "trace": [
      {
        "step": 1,
        "line": "lambda x: x + 1",
        "variableChanges": {
          "1": 2,
          "2": 3
        },
        "outputSoFar": "",
        "note": "각 원소 변환"
      },
      {
        "step": 2,
        "line": "list(map(...))",
        "variableChanges": {
          "a": "[2, 3]"
        },
        "outputSoFar": "",
        "note": "리스트로 변환"
      },
      {
        "step": 3,
        "line": "print",
        "variableChanges": {},
        "outputSoFar": "[2, 3]",
        "note": "리스트 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "publisher",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-python-012",
    "title": "Python append 반환값",
    "type": "code-output",
    "chapter": "10장 프로그래밍 언어 활용",
    "topic": "Python 리스트",
    "tags": [
      "append",
      "None",
      "Python",
      "출력예측",
      "손코딩"
    ],
    "priority": "A",
    "language": "Python",
    "prompt": "append의 반환값과 변경된 리스트를 함께 출력하시오.",
    "code": "a = [1]\nprint(a.append(2), a)",
    "answer": "None [1, 2]",
    "aliases": [
      "None[1,2]",
      "None [1, 2]\n",
      "none [1, 2]"
    ],
    "explanation": "풀이 포인트: append는 리스트를 제자리에서 변경하고 반환값은 None이다. print는 None과 변경된 a를 공백으로 출력한다. 키워드: in-place mutation.",
    "trace": [
      {
        "step": 1,
        "line": "a.append(2)",
        "variableChanges": {
          "a": "[1, 2]",
          "return": "None"
        },
        "outputSoFar": "",
        "note": "제자리 변경"
      },
      {
        "step": 2,
        "line": "print(return, a)",
        "variableChanges": {},
        "outputSoFar": "None [1, 2]",
        "note": "None과 리스트 출력"
      }
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "restored",
    "sourceConfidence": "medium",
    "derivedFromTrendSignalIds": [
      "signal-python-sequence-copy"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sql-001",
    "title": "SQL GROUP BY HAVING 평균 조건",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "GROUP BY/HAVING",
    "tags": [
      "SQL",
      "GROUP BY",
      "HAVING",
      "AVG"
    ],
    "priority": "A",
    "prompt": "score(dept, point) = (A,80),(A,100),(B,60),(B,70),(C,90)일 때 결과를 쓰시오.",
    "answer": "A\nC",
    "aliases": [
      "a\nc"
    ],
    "explanation": "풀이 포인트: A 평균 90, B 평균 65, C 평균 90이다. 그룹 조건은 WHERE가 아니라 HAVING으로 판단한다. 키워드: GROUP BY 후 HAVING.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "SELECT dept\nFROM score\nGROUP BY dept\nHAVING AVG(point) >= 85\nORDER BY dept;",
    "tableAnswer": {
      "columns": [
        "dept"
      ],
      "rows": [
        [
          "A"
        ],
        [
          "C"
        ]
      ]
    }
  },
  {
    "id": "round2-2026-sql-002",
    "title": "SQL LEFT JOIN과 COUNT 컬럼",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "LEFT JOIN",
    "tags": [
      "SQL",
      "LEFT JOIN",
      "COUNT",
      "NULL"
    ],
    "priority": "A",
    "prompt": "student(id,name)=(1,A),(2,B),(3,C), submit(student_id)=(1),(1),(3)일 때 결과를 쓰시오.",
    "answer": "A 2\nB 0\nC 1",
    "aliases": [
      "a 2\nb 0\nc 1"
    ],
    "explanation": "풀이 포인트: LEFT JOIN은 제출이 없는 B도 남긴다. COUNT(t.student_id)는 NULL을 세지 않아 B는 0이다. 키워드: OUTER JOIN, COUNT(column).",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "SELECT s.name, COUNT(t.student_id) AS cnt\nFROM student s LEFT JOIN submit t ON s.id = t.student_id\nGROUP BY s.name\nORDER BY s.name;",
    "tableAnswer": {
      "columns": [
        "name",
        "cnt"
      ],
      "rows": [
        [
          "A",
          2
        ],
        [
          "B",
          0
        ],
        [
          "C",
          1
        ]
      ]
    }
  },
  {
    "id": "round2-2026-sql-003",
    "title": "SQL COUNT star와 COUNT column",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "NULL/COUNT",
    "tags": [
      "SQL",
      "COUNT",
      "NULL"
    ],
    "priority": "A",
    "prompt": "log(id, code)=(1,A),(2,NULL),(3,B)일 때 결과를 쓰시오.",
    "answer": "3 2",
    "aliases": [],
    "explanation": "풀이 포인트: COUNT(*)는 모든 행을 세고, COUNT(code)는 NULL이 아닌 code만 센다. 키워드: NULL 제외 집계.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "SELECT COUNT(*) AS c1, COUNT(code) AS c2\nFROM log;",
    "tableAnswer": {
      "columns": [
        "c1",
        "c2"
      ],
      "rows": [
        [
          3,
          2
        ]
      ]
    }
  },
  {
    "id": "round2-2026-sql-004",
    "title": "SQL UNION과 UNION ALL 차이",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "집합 연산자",
    "tags": [
      "SQL",
      "UNION",
      "UNION ALL",
      "중복"
    ],
    "priority": "A",
    "prompt": "t1(x)=(1),(2), t2(x)=(2),(3)일 때 UNION 결과를 쓰시오.",
    "answer": "1\n2\n3",
    "aliases": [],
    "explanation": "풀이 포인트: UNION은 중복을 제거한다. UNION ALL이면 2가 두 번 나온다. 키워드: 집합 연산자는 컬럼 수와 타입이 맞아야 한다.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "SELECT x FROM t1\nUNION\nSELECT x FROM t2\nORDER BY x;",
    "tableAnswer": {
      "columns": [
        "x"
      ],
      "rows": [
        [
          1
        ],
        [
          2
        ],
        [
          3
        ]
      ]
    }
  },
  {
    "id": "round2-2026-sql-005",
    "title": "SQL 서브쿼리 평균 초과",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "서브쿼리",
    "tags": [
      "SQL",
      "서브쿼리",
      "AVG"
    ],
    "priority": "A",
    "prompt": "exam(name, score)=(kim,70),(lee,90),(park,80)일 때 결과를 쓰시오.",
    "answer": "lee",
    "aliases": [],
    "explanation": "풀이 포인트: 평균은 80이다. 80보다 큰 점수는 lee의 90뿐이다. 키워드: 스칼라 서브쿼리.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "SELECT name\nFROM exam\nWHERE score > (SELECT AVG(score) FROM exam)\nORDER BY name;",
    "tableAnswer": {
      "columns": [
        "name"
      ],
      "rows": [
        [
          "lee"
        ]
      ]
    }
  },
  {
    "id": "round2-2026-sql-006",
    "title": "SQL NOT IN과 NULL 함정",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "서브쿼리",
    "tags": [
      "SQL",
      "NOT IN",
      "NULL"
    ],
    "priority": "A",
    "prompt": "a(id)=(1),(2), b(id)=(NULL)일 때 표준 SQL 기준 결과를 쓰시오.",
    "answer": "결과 없음",
    "aliases": [],
    "explanation": "풀이 포인트: NOT IN의 목록에 NULL이 있으면 비교 결과가 UNKNOWN이 되어 행이 남지 않는다. 키워드: NULL 포함 NOT IN은 NOT EXISTS로 바꾸는 풀이가 안전하다.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "SELECT id\nFROM a\nWHERE id NOT IN (SELECT id FROM b);",
    "tableAnswer": {
      "columns": [
        "id"
      ],
      "rows": []
    }
  },
  {
    "id": "round2-2026-sql-007",
    "title": "SQL INNER JOIN 결과 행 수",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "JOIN",
    "tags": [
      "SQL",
      "INNER JOIN",
      "행수"
    ],
    "priority": "A",
    "prompt": "emp(id, dept)=(1,10),(2,20),(3,30), dept(id,name)=(10,A),(20,B)일 때 결과를 쓰시오.",
    "answer": "2",
    "aliases": [],
    "explanation": "풀이 포인트: emp.dept 30은 dept에 매칭되지 않아 INNER JOIN에서 제외된다. 키워드: INNER JOIN은 교집합.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "SELECT COUNT(*)\nFROM emp e INNER JOIN dept d ON e.dept = d.id;",
    "tableAnswer": {
      "columns": [
        "count"
      ],
      "rows": [
        [
          2
        ]
      ]
    }
  },
  {
    "id": "round2-2026-sql-008",
    "title": "SQL WHERE와 HAVING 역할 구분",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "SQL 실행 순서",
    "tags": [
      "SQL",
      "WHERE",
      "HAVING",
      "GROUP BY"
    ],
    "priority": "A",
    "prompt": "그룹화 전에 개별 행을 먼저 거르는 절의 이름을 쓰시오.",
    "answer": "WHERE",
    "aliases": [
      "where"
    ],
    "explanation": "풀이 포인트: WHERE는 그룹화 전 행 조건, HAVING은 GROUP BY 이후 그룹 조건이다. 키워드: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "SELECT dept, COUNT(*)\nFROM emp\nWHERE salary >= 3000\nGROUP BY dept\nHAVING COUNT(*) >= 2;"
  },
  {
    "id": "round2-2026-sql-009",
    "title": "SQL DCL 권한 회수",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "DDL/DML/DCL",
    "tags": [
      "SQL",
      "DCL",
      "REVOKE"
    ],
    "priority": "A",
    "prompt": "사용자 U1에게 부여한 T 테이블 조회 권한을 회수하는 SQL의 핵심 명령어를 쓰시오.",
    "answer": "REVOKE",
    "aliases": [
      "revoke"
    ],
    "explanation": "풀이 포인트: GRANT는 권한 부여, REVOKE는 권한 회수다. 키워드: DCL은 COMMIT, ROLLBACK, GRANT, REVOKE.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "REVOKE SELECT ON T FROM U1;"
  },
  {
    "id": "round2-2026-sql-010",
    "title": "SQL ALTER TABLE ADD",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "DDL/DML/DCL",
    "tags": [
      "SQL",
      "DDL",
      "ALTER TABLE"
    ],
    "priority": "A",
    "prompt": "학생 테이블에 age 정수 컬럼을 추가할 때 사용하는 DDL 명령어를 쓰시오.",
    "answer": "ALTER TABLE",
    "aliases": [
      "alter table"
    ],
    "explanation": "풀이 포인트: 테이블 구조 변경은 ALTER TABLE이다. 데이터 삽입은 INSERT, 수정은 UPDATE와 구분한다. 키워드: DDL.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "ALTER TABLE 학생 ADD age INT;"
  },
  {
    "id": "round2-2026-sql-011",
    "title": "SQL DELETE와 DROP 구분",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "DDL/DML/DCL",
    "tags": [
      "SQL",
      "DELETE",
      "DROP"
    ],
    "priority": "A",
    "prompt": "테이블 구조는 남기고 모든 행만 삭제하는 명령어를 쓰시오.",
    "answer": "DELETE",
    "aliases": [
      "delete"
    ],
    "explanation": "풀이 포인트: DELETE는 행 삭제(DML), DROP은 객체 자체 삭제(DDL)다. 키워드: 구조 보존 여부.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "DELETE FROM 테이블명;"
  },
  {
    "id": "round2-2026-sql-012",
    "title": "SQL CASE 집계",
    "type": "sql-result",
    "chapter": "SQL 응용",
    "topic": "CASE/GROUP BY",
    "tags": [
      "SQL",
      "CASE",
      "SUM"
    ],
    "priority": "A",
    "prompt": "pay(name, amount)=(A,100),(B,40),(C,80)일 때 amount>=80인 행 수를 구하시오.",
    "answer": "2",
    "aliases": [],
    "explanation": "풀이 포인트: 조건을 만족하면 1, 아니면 0으로 바꾸어 SUM한다. A와 C가 조건을 만족한다. 키워드: CASE 조건 집계.",
    "language": "SQL",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-sql-aggregation-join"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "code": "SELECT SUM(CASE WHEN amount >= 80 THEN 1 ELSE 0 END) AS cnt\nFROM pay;",
    "tableAnswer": {
      "columns": [
        "cnt"
      ],
      "rows": [
        [
          2
        ]
      ]
    }
  },
  {
    "id": "round2-2026-db-001",
    "title": "DB 설계 순서",
    "type": "short-answer",
    "chapter": "데이터베이스 구축",
    "topic": "DB 설계",
    "tags": [
      "DB",
      "설계절차"
    ],
    "priority": "A",
    "prompt": "요구사항 분석 이후 데이터베이스 설계의 일반적 순서를 쓰시오.",
    "answer": "개념 설계, 논리 설계, 물리 설계",
    "aliases": [],
    "explanation": "풀이 포인트: 개념 설계는 ERD/개념 스키마, 논리 설계는 릴레이션 스키마, 물리 설계는 저장 구조와 접근 경로를 정한다. 키워드: 요구분석→개념→논리→물리→구현.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-db-002",
    "title": "스키마 3계층",
    "type": "term-matching",
    "chapter": "데이터베이스 구축",
    "topic": "스키마",
    "tags": [
      "DB",
      "스키마"
    ],
    "priority": "A",
    "prompt": "사용자 관점, 조직 전체 논리 구조, 물리 저장 구조에 대응하는 스키마 3가지를 쓰시오.",
    "answer": "외부 스키마, 개념 스키마, 내부 스키마",
    "aliases": [],
    "explanation": "풀이 포인트: 외부는 사용자별 view, 개념은 전체 논리 구조, 내부는 실제 저장 관점이다. 키워드: 외개내.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-db-003",
    "title": "릴레이션 차수와 기수",
    "type": "fill-blank",
    "chapter": "데이터베이스 구축",
    "topic": "릴레이션",
    "tags": [
      "DB",
      "릴레이션"
    ],
    "priority": "A",
    "prompt": "릴레이션에서 속성 수는 (  ), 튜플 수는 (  )라고 한다.",
    "answer": "차수, 기수",
    "aliases": [],
    "explanation": "풀이 포인트: 컬럼 수가 Degree/차수, 행 수가 Cardinality/기수다. 키워드: 열=차수, 행=기수.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-db-004",
    "title": "후보키 성질",
    "type": "keyword-check",
    "chapter": "데이터베이스 구축",
    "topic": "키",
    "tags": [
      "DB",
      "후보키",
      "키"
    ],
    "priority": "A",
    "prompt": "후보키가 만족해야 하는 두 성질을 쓰시오.",
    "answer": "유일성, 최소성",
    "aliases": [],
    "explanation": "풀이 포인트: 유일성은 튜플 식별, 최소성은 불필요한 속성 제거다. 키워드: 후보키=유일성+최소성.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-db-005",
    "title": "무결성 종류 구분",
    "type": "term-matching",
    "chapter": "데이터베이스 구축",
    "topic": "무결성",
    "tags": [
      "DB",
      "무결성"
    ],
    "priority": "A",
    "prompt": "외래키가 참조할 수 없는 값을 가져서는 안 된다는 무결성을 쓰시오.",
    "answer": "참조 무결성",
    "aliases": [],
    "explanation": "풀이 포인트: 기본키 NULL/중복 금지는 개체 무결성, 외래키 참조 일관성은 참조 무결성, 속성 값 범위는 도메인 무결성이다.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-db-006",
    "title": "관계대수 연산자",
    "type": "fill-blank",
    "chapter": "데이터베이스 구축",
    "topic": "관계대수",
    "tags": [
      "DB",
      "관계대수"
    ],
    "priority": "A",
    "prompt": "릴레이션의 행을 조건으로 고르는 연산은 (  ), 열을 고르는 연산은 (  )이다.",
    "answer": "Select, Project",
    "aliases": [
      "select, project"
    ],
    "explanation": "풀이 포인트: Select는 수평 연산, Project는 수직 연산이다. 기호는 각각 σ, π. 키워드: 행=Select, 열=Project.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-db-007",
    "title": "정규화 단계 암기",
    "type": "keyword-check",
    "chapter": "데이터베이스 구축",
    "topic": "정규화",
    "tags": [
      "DB",
      "정규화"
    ],
    "priority": "A",
    "prompt": "1NF, 2NF, 3NF, BCNF에서 제거하거나 만족해야 하는 핵심을 순서대로 쓰시오.",
    "answer": "원자값, 부분 함수 종속 제거, 이행 함수 종속 제거, 결정자가 후보키",
    "aliases": [],
    "explanation": "풀이 포인트: 1NF는 도메인 원자값, 2NF는 부분 종속 제거, 3NF는 이행 종속 제거, BCNF는 모든 결정자가 후보키다. 키워드: 도부이결.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-db-008",
    "title": "트랜잭션 ACID",
    "type": "fill-blank",
    "chapter": "데이터베이스 구축",
    "topic": "트랜잭션",
    "tags": [
      "DB",
      "트랜잭션",
      "ACID"
    ],
    "priority": "A",
    "prompt": "ACID에서 모두 반영되거나 전혀 반영되지 않는 성질은 (  ), 완료 결과가 영구 보존되는 성질은 (  )이다.",
    "answer": "원자성, 영속성",
    "aliases": [],
    "explanation": "풀이 포인트: Atomicity=all or nothing, Durability=commit 결과 영구 보존. 키워드: ACID의 A와 D.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-db-009",
    "title": "인덱스와 뷰",
    "type": "term-matching",
    "chapter": "데이터베이스 구축",
    "topic": "인덱스/뷰",
    "tags": [
      "DB",
      "인덱스",
      "뷰"
    ],
    "priority": "A",
    "prompt": "하나 이상의 기본 테이블에서 유도된 이름 있는 가상 테이블을 쓰시오.",
    "answer": "뷰",
    "aliases": [],
    "explanation": "풀이 포인트: 인덱스는 검색 성능을 위한 키-포인터 구조, 뷰는 제한적으로 보여주는 가상 테이블이다. 키워드: View=가상 테이블.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-db-010",
    "title": "트리 순회 Preorder",
    "type": "short-answer",
    "chapter": "데이터베이스 구축",
    "topic": "자료구조",
    "tags": [
      "자료구조",
      "트리순회"
    ],
    "priority": "A",
    "prompt": "이진 트리 순회에서 Root → Left → Right 순서를 무엇이라고 하는가?",
    "answer": "Preorder",
    "aliases": [
      "preorder"
    ],
    "explanation": "풀이 포인트: Preorder는 전위 순회, Inorder는 중위, Postorder는 후위다. 키워드: 전위=Root 먼저.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-db-design-transaction"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-001",
    "title": "화이트박스 커버리지",
    "type": "term-matching",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "테스트",
    "tags": [
      "테스트",
      "화이트박스",
      "커버리지"
    ],
    "priority": "A",
    "prompt": "모든 조건문의 True/False 결과가 한 번 이상 수행되도록 하는 검증 기준을 쓰시오.",
    "answer": "결정 검증 기준",
    "aliases": [],
    "explanation": "풀이 포인트: 결정/분기 커버리지는 조건문 전체 결과 T/F를 본다. 조건 커버리지는 개별 조건식 T/F를 본다. 키워드: Decision/Branch Coverage.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-002",
    "title": "블랙박스 경계값 분석",
    "type": "term-matching",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "테스트",
    "tags": [
      "테스트",
      "블랙박스"
    ],
    "priority": "A",
    "prompt": "입력 범위의 경계와 바로 주변 값에서 결함이 많다는 점을 이용하는 테스트 기법을 쓰시오.",
    "answer": "경계값 분석",
    "aliases": [],
    "explanation": "풀이 포인트: 동치 분할은 대표값, 경계값 분석은 0/1/최대/최대+1 같은 경계 주변을 고른다. 키워드: Boundary Value Analysis.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-003",
    "title": "Stub과 Driver",
    "type": "fill-blank",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "통합 테스트",
    "tags": [
      "테스트",
      "Stub",
      "Driver"
    ],
    "priority": "A",
    "prompt": "하향식 통합 테스트에서는 미완성 하위 모듈을 (  )으로 대체하고, 상향식 통합 테스트에서는 상위 호출 모듈을 (  )로 대체한다.",
    "answer": "Stub, Driver",
    "aliases": [
      "stub, driver"
    ],
    "explanation": "풀이 포인트: Stub은 아래쪽 모듈 대역, Driver는 위에서 호출해주는 테스트용 모듈이다. 키워드: 하향식=Stub, 상향식=Driver.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-004",
    "title": "결합도 순서",
    "type": "keyword-check",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "응집도/결합도",
    "tags": [
      "소프트웨어공학",
      "결합도"
    ],
    "priority": "A",
    "prompt": "결합도는 낮을수록 좋다. 가장 약한 결합도와 가장 강한 결합도를 각각 쓰시오.",
    "answer": "자료 결합도, 내용 결합도",
    "aliases": [],
    "explanation": "풀이 포인트: 약한 쪽은 자료 결합도, 강한 쪽은 내용 결합도다. 키워드: 내용-공통-외부-제어-스탬프-자료 순으로 약해진다.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-005",
    "title": "응집도 순서",
    "type": "keyword-check",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "응집도/결합도",
    "tags": [
      "소프트웨어공학",
      "응집도"
    ],
    "priority": "A",
    "prompt": "응집도는 높을수록 좋다. 가장 강한 응집도와 가장 약한 응집도를 각각 쓰시오.",
    "answer": "기능적 응집도, 우연적 응집도",
    "aliases": [],
    "explanation": "풀이 포인트: 기능적 응집도는 하나의 목적에 모인 상태라 가장 좋고, 우연적 응집도는 관련 없는 요소가 모여 가장 나쁘다.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-006",
    "title": "GOF 생성 패턴",
    "type": "multiple-choice",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "디자인 패턴",
    "tags": [
      "디자인패턴",
      "GOF"
    ],
    "priority": "A",
    "prompt": "다음 중 생성 패턴에 해당하는 것은?",
    "answer": "Factory Method",
    "aliases": [
      "factory method"
    ],
    "explanation": "풀이 포인트: Factory Method, Abstract Factory, Builder, Prototype, Singleton은 생성 패턴이다. Adapter/Decorator는 구조, Observer/Strategy는 행위다.",
    "choices": [
      "Adapter",
      "Factory Method",
      "Observer",
      "Strategy"
    ],
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-007",
    "title": "Observer 패턴",
    "type": "term-matching",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "디자인 패턴",
    "tags": [
      "디자인패턴",
      "Observer"
    ],
    "priority": "A",
    "prompt": "한 객체 상태 변화가 의존 객체들에게 자동 통지되는 일대다 의존 패턴을 쓰시오.",
    "answer": "Observer",
    "aliases": [
      "observer"
    ],
    "explanation": "풀이 포인트: 이벤트 구독/발행 느낌이면 Observer를 떠올린다. 키워드: 상태 변화 통지, Publish/Subscribe.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-008",
    "title": "Strategy 패턴",
    "type": "term-matching",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "디자인 패턴",
    "tags": [
      "디자인패턴",
      "Strategy"
    ],
    "priority": "A",
    "prompt": "알고리즘군을 캡슐화하고 실행 시점에 교체할 수 있게 하는 패턴을 쓰시오.",
    "answer": "Strategy",
    "aliases": [
      "strategy"
    ],
    "explanation": "풀이 포인트: 같은 문제를 푸는 여러 알고리즘을 바꿔 끼우면 Strategy다. 키워드: 알고리즘 교체.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-009",
    "title": "EAI 방식",
    "type": "term-matching",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "인터페이스",
    "tags": [
      "인터페이스",
      "EAI"
    ],
    "priority": "A",
    "prompt": "단일 접점인 허브 시스템을 중심으로 애플리케이션을 통합하는 EAI 방식은?",
    "answer": "Hub & Spoke",
    "aliases": [
      "hub & spoke"
    ],
    "explanation": "풀이 포인트: 허브 장애 시 전체 영향이 생기지만 확장/유지보수가 쉬운 중앙 집중형이다. 키워드: 허브 중심.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-010",
    "title": "미들웨어 WAS",
    "type": "term-matching",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "미들웨어",
    "tags": [
      "미들웨어",
      "WAS"
    ],
    "priority": "A",
    "prompt": "동적인 웹 콘텐츠와 비즈니스 로직 처리를 지원하는 미들웨어를 쓰시오.",
    "answer": "WAS",
    "aliases": [
      "was"
    ],
    "explanation": "풀이 포인트: WAS는 Web Application Server로 웹 환경에서 동적 콘텐츠와 서버 측 로직을 처리한다. 키워드: Web Application Server.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-011",
    "title": "애자일 핵심 가치",
    "type": "keyword-check",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "개발 방법론",
    "tags": [
      "애자일",
      "XP"
    ],
    "priority": "A",
    "prompt": "애자일 선언에서 문서보다 더 가치를 두는 것을 쓰시오.",
    "answer": "실행되는 소프트웨어",
    "aliases": [],
    "explanation": "풀이 포인트: 애자일은 프로세스/도구보다 개인과 상호작용, 방대한 문서보다 실행되는 SW, 계약보다 협업, 계획보다 변화 대응을 중시한다.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sw-012",
    "title": "릴리즈 노트 항목",
    "type": "term-matching",
    "chapter": "소프트웨어 공학/테스트/패턴",
    "topic": "패키징",
    "tags": [
      "패키징",
      "릴리즈노트"
    ],
    "priority": "A",
    "prompt": "릴리즈 버전에서 수정된 버그나 추가 항목을 간략히 적는 릴리즈 노트 항목을 쓰시오.",
    "answer": "문제 요약",
    "aliases": [],
    "explanation": "풀이 포인트: 문제 요약은 수정된 버그나 릴리즈 추가 항목의 요약이다. 키워드: Header/개요/목적/문제 요약/재현 항목/수정 개선.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-testing-pattern-engineering"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-001",
    "title": "SQL Injection 방어",
    "type": "keyword-check",
    "chapter": "정보보안 및 네트워크",
    "topic": "웹 보안",
    "tags": [
      "보안",
      "SQL Injection"
    ],
    "priority": "A",
    "prompt": "SQL Injection을 방어하기 위한 대표 방법 두 가지를 쓰시오.",
    "answer": "Prepared Statement, 입력값 검증",
    "aliases": [
      "prepared statement, 입력값 검증"
    ],
    "explanation": "풀이 포인트: 문자열 결합으로 SQL을 만들지 말고 파라미터 바인딩을 사용한다. 입력값의 예약어/특수문자 검증도 함께 적용한다. 키워드: Prepared Statement.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-002",
    "title": "Watering Hole 공격",
    "type": "term-matching",
    "chapter": "정보보안 및 네트워크",
    "topic": "공격 기법",
    "tags": [
      "보안",
      "Watering Hole"
    ],
    "priority": "A",
    "prompt": "표적이 자주 방문하는 웹사이트를 미리 감염시켜 표적의 방문을 기다리는 공격을 쓰시오.",
    "answer": "Watering Hole",
    "aliases": [
      "watering hole"
    ],
    "explanation": "풀이 포인트: 물웅덩이에 동물이 모이는 것처럼 표적이 자주 가는 사이트를 감염시킨다. 키워드: 표적 사이트 사전 감염.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-003",
    "title": "SYN Flooding",
    "type": "term-matching",
    "chapter": "정보보안 및 네트워크",
    "topic": "DoS",
    "tags": [
      "보안",
      "SYN Flooding",
      "TCP"
    ],
    "priority": "A",
    "prompt": "TCP 3-way handshake를 악용해 반쯤 열린 연결을 많이 만들어 서버 자원을 소모시키는 공격을 쓰시오.",
    "answer": "SYN Flooding",
    "aliases": [
      "syn flooding"
    ],
    "explanation": "풀이 포인트: SYN 요청 후 ACK를 완료하지 않아 서버가 대기 상태를 유지하게 만든다. 키워드: 3-way handshake 중단.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-004",
    "title": "ARP Spoofing",
    "type": "term-matching",
    "chapter": "정보보안 및 네트워크",
    "topic": "네트워크 공격",
    "tags": [
      "보안",
      "ARP Spoofing",
      "MAC"
    ],
    "priority": "A",
    "prompt": "자신의 MAC 주소를 다른 호스트의 MAC인 것처럼 속여 패킷을 가로채는 공격을 쓰시오.",
    "answer": "ARP Spoofing",
    "aliases": [
      "arp spoofing"
    ],
    "explanation": "풀이 포인트: ARP는 IP를 MAC으로 매핑한다. 이 매핑을 속이면 중간자 공격이 가능하다. 키워드: IP-MAC 매핑 변조.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-005",
    "title": "VPN 프로토콜 구분",
    "type": "fill-blank",
    "chapter": "정보보안 및 네트워크",
    "topic": "VPN",
    "tags": [
      "네트워크",
      "VPN",
      "IPsec",
      "SSL"
    ],
    "priority": "A",
    "prompt": "네트워크 계층에서 VPN 보안에 활용되는 프로토콜은 (  ), 클라이언트 접속형 VPN에서 자주 쓰는 보안 프로토콜은 (  )이다.",
    "answer": "IPsec, SSL",
    "aliases": [
      "ipsec, ssl"
    ],
    "explanation": "풀이 포인트: IPsec은 IP 계층 패킷 보호, SSL VPN은 사용자가 클라이언트로 접속하는 방식에서 자주 언급된다. 키워드: IPsec VPN vs SSL VPN.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-006",
    "title": "보안 3요소 CIA",
    "type": "keyword-check",
    "chapter": "정보보안 및 네트워크",
    "topic": "보안 요소",
    "tags": [
      "보안",
      "CIA"
    ],
    "priority": "A",
    "prompt": "정보보안의 3대 요소를 쓰시오.",
    "answer": "기밀성, 무결성, 가용성",
    "aliases": [],
    "explanation": "풀이 포인트: 인가된 사용자만 접근=기밀성, 인가된 사용자만 수정=무결성, 필요할 때 사용 가능=가용성. 키워드: CIA.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-007",
    "title": "OAuth 핵심 역할",
    "type": "term-matching",
    "chapter": "정보보안 및 네트워크",
    "topic": "인증/인가",
    "tags": [
      "보안",
      "OAuth"
    ],
    "priority": "A",
    "prompt": "비밀번호를 직접 제공하지 않고 제3자 애플리케이션에 접근 권한을 위임하는 표준을 쓰시오.",
    "answer": "OAuth",
    "aliases": [
      "oauth"
    ],
    "explanation": "풀이 포인트: OAuth는 인증 자체보다 권한 위임/인가 맥락으로 묻는 경우가 많다. 키워드: Authorization.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-008",
    "title": "서브넷 /27 호스트 수",
    "type": "short-answer",
    "chapter": "정보보안 및 네트워크",
    "topic": "서브넷",
    "tags": [
      "네트워크",
      "서브넷",
      "CIDR"
    ],
    "priority": "A",
    "prompt": "192.168.1.0/27 네트워크의 사용 가능한 호스트 수를 쓰시오.",
    "answer": "30",
    "aliases": [],
    "explanation": "풀이 포인트: /27은 호스트 비트 5개라 전체 주소 32개, 네트워크/브로드캐스트 2개 제외 후 30개다. 키워드: 2^호스트비트 - 2.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-009",
    "title": "서브넷 /26 블록 범위",
    "type": "short-answer",
    "chapter": "정보보안 및 네트워크",
    "topic": "서브넷",
    "tags": [
      "네트워크",
      "서브넷",
      "CIDR"
    ],
    "priority": "A",
    "prompt": "192.168.10.130/26이 속한 네트워크 주소를 쓰시오.",
    "answer": "192.168.10.128",
    "aliases": [],
    "explanation": "풀이 포인트: /26 블록 크기는 64다. 4번째 옥텟 범위는 0,64,128,192이므로 130은 128~191 블록에 속한다. 키워드: 블록 크기 256-마스크.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-010",
    "title": "OSI 계층 구분",
    "type": "term-matching",
    "chapter": "정보보안 및 네트워크",
    "topic": "OSI/TCP-IP",
    "tags": [
      "네트워크",
      "OSI"
    ],
    "priority": "A",
    "prompt": "IP 라우팅과 경로 선택이 주로 관련되는 OSI 계층을 쓰시오.",
    "answer": "네트워크 계층",
    "aliases": [],
    "explanation": "풀이 포인트: 물리=비트, 데이터링크=프레임/MAC, 네트워크=IP/라우팅, 전송=TCP/UDP다. 키워드: OSI 3계층.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-011",
    "title": "TCP 3-way handshake 순서",
    "type": "short-answer",
    "chapter": "정보보안 및 네트워크",
    "topic": "TCP/IP",
    "tags": [
      "네트워크",
      "TCP",
      "3-way handshake"
    ],
    "priority": "A",
    "prompt": "TCP 연결 설정의 3-way handshake 순서를 쓰시오.",
    "answer": "SYN, SYN+ACK, ACK",
    "aliases": [
      "syn, syn+ack, ack"
    ],
    "explanation": "풀이 포인트: 클라이언트 SYN, 서버 SYN+ACK, 클라이언트 ACK 순서다. 키워드: 신뢰성 있는 연결 설정.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2023,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-012",
    "title": "SSH 기본 포트",
    "type": "short-answer",
    "chapter": "정보보안 및 네트워크",
    "topic": "프로토콜",
    "tags": [
      "네트워크",
      "SSH"
    ],
    "priority": "A",
    "prompt": "SSH의 기본 포트 번호를 쓰시오.",
    "answer": "22",
    "aliases": [],
    "explanation": "풀이 포인트: SSH는 원격 접속을 안전하게 제공하며 기본 포트는 22번이다. 키워드: Secure Shell.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2024,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-013",
    "title": "대칭키/공개키 암호",
    "type": "keyword-check",
    "chapter": "정보보안 및 네트워크",
    "topic": "암호화",
    "tags": [
      "보안",
      "암호화"
    ],
    "priority": "A",
    "prompt": "대칭키 암호 알고리즘과 공개키 암호 알고리즘의 예를 각각 하나씩 쓰시오.",
    "answer": "AES, RSA",
    "aliases": [
      "aes, rsa"
    ],
    "explanation": "풀이 포인트: AES/DES/ARIA는 대칭키, RSA는 공개키로 자주 구분한다. 키워드: 같은 키=대칭키, 키쌍=공개키.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2025,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  },
  {
    "id": "round2-2026-sec-014",
    "title": "해시 함수 특징",
    "type": "term-matching",
    "chapter": "정보보안 및 네트워크",
    "topic": "해시",
    "tags": [
      "보안",
      "해시"
    ],
    "priority": "A",
    "prompt": "임의 길이 입력을 고정 길이 값으로 변환하는 함수 또는 기술을 쓰시오.",
    "answer": "해시",
    "aliases": [],
    "explanation": "풀이 포인트: 해시는 복호화 대상이 아니라 무결성 확인/요약값 생성에 쓴다. SHA, MD5 등이 예다. 키워드: 고정 길이 digest.",
    "trend2026Round1": true,
    "sourceNote": "2026 2회 대비 출제기준/최근 3년 패턴 기반 변형 문제(원문 아님)",
    "sourceYear": 2026,
    "sourceRound": "2-target",
    "sourceKind": "official",
    "sourceConfidence": "high",
    "derivedFromTrendSignalIds": [
      "signal-security-network-core"
    ],
    "originalIncluded": false,
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z"
  }
];
