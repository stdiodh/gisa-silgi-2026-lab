import type { Question, QuestionLanguage, QuestionType } from '../domain/question';
import type { SourceConfidence, SourceKind } from '../domain/trend';
import { chapterMap } from './chapterMap';

const now = '2026-07-06T00:00:00.000Z';
const sourceNote = '샘플 변형 문제(원문 아님)';
const years = [2023, 2024, 2025, 2026];
type CodeTuple = [string, string, string, string[], string, string, string];
type ConceptTuple = [string, string, string, string[], string, string];
type DbTuple = [string, string, string, string[], string];

interface BaseSpec {
  id: string;
  title: string;
  topic: string;
  tags: string[];
  answer: string;
  explanation: string;
  year?: number;
  sourceKind?: SourceKind;
  confidence?: SourceConfidence;
  signalIds: string[];
}

interface CodeSpec extends BaseSpec {
  language: QuestionLanguage;
  code: string;
}

interface ConceptSpec extends BaseSpec {
  type?: QuestionType;
  chapter: string;
  language?: QuestionLanguage;
  prompt: string;
  choices?: string[];
}

function common(spec: BaseSpec, index = 0) {
  return {
    priority: (index % 5 === 0 ? 'A' : index % 3 === 0 ? 'B' : 'A') as Question['priority'],
    trend2026Round1: spec.signalIds.some((id) => id.includes('code') || id.includes('2026')) || index % 2 === 0,
    sourceNote,
    sourceYear: spec.year ?? years[index % years.length],
    sourceRound: String((index % 3) + 1),
    sourceKind: spec.sourceKind ?? (index % 4 === 0 ? 'restored' : index % 4 === 1 ? 'publisher' : 'official'),
    sourceConfidence: spec.confidence ?? (index % 11 === 0 ? 'low' : index % 4 === 0 ? 'medium' : 'high'),
    derivedFromTrendSignalIds: spec.signalIds,
    originalIncluded: false as const,
    createdAt: now,
    updatedAt: now,
  };
}

function explanationFor(spec: BaseSpec) {
  const trimmed = spec.explanation.trim();
  const tagged = trimmed.includes('풀이 포인트:')
    ? trimmed
    : `풀이 포인트: ${trimmed} 키워드: ${spec.tags.slice(0, 3).join(', ') || spec.topic}.`;
  return tagged.length >= 30 ? tagged : `${tagged} 조건과 답안을 함께 확인한다.`;
}

function makeCode(spec: CodeSpec, index: number): Question {
  return {
    id: spec.id,
    title: spec.title,
    type: 'code-output',
    chapter: chapterMap.programming,
    topic: spec.topic,
    tags: [...spec.tags, spec.language, '출력예측'],
    language: spec.language,
    prompt: '다음 코드를 손으로 추적한 뒤 출력 결과를 쓰시오.',
    code: spec.code,
    answer: spec.answer,
    explanation: explanationFor(spec),
    trace: [
      {
        step: 1,
        line: '초기화',
        variableChanges: { phase: 'init' },
        outputSoFar: '',
        note: '초기 변수와 참조 관계를 적는다.',
      },
      {
        step: 2,
        line: '출력 직전',
        variableChanges: { result: spec.answer },
        outputSoFar: spec.answer,
        note: '출력 버퍼와 최종 값을 비교한다.',
      },
    ],
    ...common(spec, index),
  };
}

function makeConcept(spec: ConceptSpec, index: number): Question {
  return {
    id: spec.id,
    title: spec.title,
    type: spec.type ?? 'short-answer',
    chapter: spec.chapter,
    topic: spec.topic,
    tags: spec.tags,
    language: spec.language,
    prompt: spec.prompt,
    choices: spec.choices,
    answer: spec.answer,
    explanation: explanationFor(spec),
    ...common(spec, index),
  };
}

function makeSql(spec: Omit<ConceptSpec, 'chapter' | 'language' | 'type'> & { code?: string }, index: number): Question {
  return {
    ...makeConcept(
      {
        ...spec,
        type: 'sql-result',
        chapter: chapterMap.sql,
        language: 'SQL',
      },
      index,
    ),
    code: spec.code,
  };
}

const cCodeTuples: CodeTuple[] = [
  ['gen-c-001', 'C 포인터 값 교환', 'C 포인터', ['포인터'], '6 4', 'int a=4,b=6,*p=&a; *p=b; printf("%d %d",a,b);', 'p가 a를 가리키므로 a가 b 값 6으로 바뀐다.'],
  ['gen-c-002', 'C 포인터 증가와 배열', 'C 포인터', ['포인터', '배열'], '20', 'int a[3]={10,20,30}; int *p=a; p++; printf("%d",*p);', 'p++ 후 두 번째 원소 20을 가리킨다.'],
  ['gen-c-003', 'C 이중 포인터 간접 변경', 'C 포인터', ['포인터'], '9', 'int x=7; int *p=&x; int **q=&p; **q+=2; printf("%d",x);', 'q를 두 번 역참조하면 x가 변경된다.'],
  ['gen-c-004', 'C 포인터와 후위 증가', 'C 포인터', ['포인터', '증감'], '3 4', 'int x=3; int *p=&x; printf("%d ",(*p)++); printf("%d",x);', '후위 증가라 먼저 3을 출력한 뒤 x가 4가 된다.'],
  ['gen-c-005', 'C 배열 합계', 'C 배열', ['배열', '반복문'], '12', 'int a[4]={1,3,5,7},s=0; for(int i=1;i<4;i+=2)s+=a[i]; printf("%d",s);', '인덱스 1과 3의 합은 3+7이다.'],
  ['gen-c-006', 'C 문자열 인덱스', 'C 문자열', ['문자열', '배열'], 'IA', 'char s[]="GISA"; printf("%c%c",s[1],s[3]);', '인덱스 1은 I, 3은 A이다.'],
  ['gen-c-007', 'C 문자열 문자 증가', 'C 문자열', ['문자열', '연산자'], 'BC', 'char c=\'A\'; printf("%c",c+1); printf("%c",c+2);', '문자 상수는 정수 연산 후 문자로 출력된다.'],
  ['gen-c-008', 'C 구조체 필드 합', 'C 구조체', ['구조체'], '15', 'typedef struct{int x;int y;} P; P p={7,8}; printf("%d",p.x+p.y);', '구조체 두 필드 합이다.'],
  ['gen-c-009', 'C 구조체 포인터 변경', 'C 구조체', ['구조체', '포인터'], '11', 'typedef struct{int n;} Box; Box b={8}; Box *p=&b; p->n+=3; printf("%d",b.n);', '포인터로 원본 구조체 필드를 변경한다.'],
  ['gen-c-010', 'C 구조체 배열 접근', 'C 구조체', ['구조체', '배열'], '5', 'typedef struct{int v;} Node; Node a[2]={{2},{5}}; printf("%d",a[1].v);', '두 번째 구조체 원소의 v는 5이다.'],
  ['gen-c-011', 'C 함수 반환 누적', 'C 함수', ['사용자정의함수'], '14', 'int f(int x){return x*2;} int main(){printf("%d",f(7));}', '함수 f는 인자를 두 배로 반환한다.'],
  ['gen-c-012', 'C 함수 포인터 호출', 'C 함수 포인터', ['함수포인터'], '9', 'int add(int a,int b){return a+b;} int main(){int (*fp)(int,int)=add; printf("%d",fp(4,5));}', '함수 포인터 fp가 add를 호출한다.'],
  ['gen-c-013', 'C 전위 후위 혼합', 'C 연산자', ['증감', '연산자'], '4 8', 'int a=3; int b=++a + a++; printf("%d %d",a,b);', '++a로 4가 되고 a++는 4를 사용한 뒤 5가 되므로 b는 8이다.'],
  ['gen-c-014', 'C 나머지와 곱셈 우선순위', 'C 연산자', ['연산자우선순위'], '5', 'int x=7%4*3-4; printf("%d",x);', '%와 *를 왼쪽부터 계산해 3*3-4가 된다.'],
  ['gen-c-015', 'C 조건 연산자', 'C 연산자', ['조건연산자', '연산자'], 'B', 'int a=2,b=5; printf("%c",a>b?\'A\':\'B\');', '조건이 거짓이므로 B를 출력한다.'],
];
const cCodeSpecs: CodeSpec[] = cCodeTuples.map(([id, title, topic, tags, answer, code, explanation]) => ({
  id,
  title,
  topic,
  tags,
  answer,
  code,
  explanation,
  language: 'C' as const,
  signalIds: ['signal-code-output-heavy'],
}));

const javaCodeTuples: CodeTuple[] = [
  ['gen-java-001', 'Java 부모 생성자 먼저', 'Java 생성자', ['생성자', '상속'], 'AB', 'class A{A(){System.out.print("A");}} class B extends A{B(){System.out.print("B");}} new B();', '부모 생성자 A 후 자식 생성자 B가 실행된다.'],
  ['gen-java-002', 'Java this 생성자 위임', 'Java 생성자', ['생성자', 'this'], '12', 'class A{A(){this(1);} A(int x){System.out.print(x);} } new A(); System.out.print(2);', '기본 생성자가 this(1)을 호출한 뒤 2가 출력된다.'],
  ['gen-java-003', 'Java 오버라이딩 호출', 'Java 오버라이딩', ['상속', '오버라이딩'], 'C', 'class P{String m(){return "P";}} class C extends P{String m(){return "C";}} P p=new C(); System.out.print(p.m());', '실제 객체 C의 메서드가 호출된다.'],
  ['gen-java-004', 'Java 필드 숨김', 'Java 오버라이딩', ['상속', '필드'], '1 2', 'class P{int x=1;} class C extends P{int x=2;} P p=new C(); System.out.print(p.x+" "+((C)p).x);', '필드는 참조 타입 기준, 캐스팅 후 C 필드를 본다.'],
  ['gen-java-005', 'Java super 메서드', 'Java 오버라이딩', ['상속', 'super'], 'PC', 'class P{void m(){System.out.print("P");}} class C extends P{void m(){super.m();System.out.print("C");}} new C().m();', 'super.m()으로 부모 출력 후 C를 출력한다.'],
  ['gen-java-006', 'Java int/String 오버로딩', 'Java 오버로딩', ['오버로딩'], 'IS', 'void m(int x){System.out.print("I");} void m(String x){System.out.print("S");} m(1); m("1");', '인자 타입에 맞는 오버로드가 선택된다.'],
  ['gen-java-007', 'Java long 오버로딩', 'Java 오버로딩', ['오버로딩', '형변환'], 'L', 'void m(long x){System.out.print("L");} m(3);', 'int 리터럴은 long으로 자동 확대 변환된다.'],
  ['gen-java-008', 'Java String 왼쪽 결합', 'Java String', ['String', '연산자'], 'A12', 'String s="A"; System.out.print(s+1+2);', '문자열이 먼저 나오면 뒤의 +는 결합이다.'],
  ['gen-java-009', 'Java 숫자 후 String 결합', 'Java String', ['String', '연산자'], '3A', 'String s="A"; System.out.print(1+2+s);', '숫자끼리 먼저 더한 뒤 문자열과 결합된다.'],
  ['gen-java-010', 'Java static 공유', 'Java static', ['static'], '2', 'class C{static int n; C(){n++;}} new C(); new C(); System.out.print(C.n);', 'static 필드는 클래스 단위로 공유된다.'],
  ['gen-java-011', 'Java 참조 공유', 'Java 참조', ['참조', '객체'], '8', 'class Box{int v=5;} Box a=new Box(); Box b=a; b.v=8; System.out.print(a.v);', 'a와 b가 같은 객체를 참조한다.'],
  ['gen-java-012', 'Java static 메서드 숨김', 'Java static', ['static', '상속'], 'P', 'class P{static void m(){System.out.print("P");}} class C extends P{static void m(){System.out.print("C");}} P p=new C(); p.m();', 'static 메서드는 참조 타입 기준으로 선택된다.'],
];
const javaCodeSpecs: CodeSpec[] = javaCodeTuples.map(([id, title, topic, tags, answer, code, explanation]) => ({
  id,
  title,
  topic,
  tags,
  answer,
  code,
  explanation,
  language: 'Java' as const,
  signalIds: ['signal-java-binding-string-static'],
}));

const pythonCodeTuples: CodeTuple[] = [
  ['gen-python-001', 'Python 슬라이싱 역순', 'Python slicing', ['slicing'], '[5, 3]', 'a=[1,2,3,4,5]\nprint(a[4:0:-2])', '인덱스 4, 2를 선택한다.'],
  ['gen-python-002', 'Python 슬라이싱 생략', 'Python slicing', ['slicing'], '[2, 3, 4]', 'a=[1,2,3,4,5]\nprint(a[1:-1])', '끝 -1 직전까지 선택한다.'],
  ['gen-python-003', 'Python 문자열 슬라이싱', 'Python slicing', ['slicing', '문자열'], 'IS', 's="GISA"\nprint(s[1:3])', '인덱스 1부터 2까지 I, S이다.'],
  ['gen-python-004', 'Python 얕은 복사 append', 'Python list copy', ['list copy', '얕은복사'], '[[1, 7], [2]]', 'a=[[1],[2]]\nb=a[:]\nb[0].append(7)\nprint(a)', '내부 리스트는 공유된다.'],
  ['gen-python-005', 'Python 대입 공유', 'Python list copy', ['list copy', '참조'], '[1, 2, 9]', 'a=[1,2]\nb=a\nb.append(9)\nprint(a)', 'b와 a가 같은 리스트를 참조한다.'],
  ['gen-python-006', 'Python 얕은 복사 교체', 'Python list copy', ['list copy'], '[[1], [8]]', 'a=[[1],[2]]\nb=a[:]\nb[1]=[8]\nprint(a)', '바깥 원소 교체는 복사본에만 적용된다.'],
  ['gen-python-007', 'Python range 감소', 'Python range', ['range', '반복문'], '9', 's=0\nfor i in range(5,0,-2):\n    s+=i\nprint(s)', '5+3+1의 합이다.'],
  ['gen-python-008', 'Python range 길이', 'Python range', ['range'], '3', 'print(len(list(range(2,8,2))))', '2,4,6 세 개다.'],
  ['gen-python-009', 'Python dict update', 'Python dict', ['dict'], '4', 'd={"a":1}\nd["a"]=d.get("a",0)+3\nprint(d["a"])', '기존 값 1에 3을 더한다.'],
  ['gen-python-010', 'Python set 중복 제거', 'Python set', ['set'], '3', 's=set([1,1,2,3])\nprint(len(s))', 'set은 중복을 제거한다.'],
  ['gen-python-011', 'Python 클래스 필드', 'Python class', ['class'], '6', 'class A:\n    def __init__(self):\n        self.x=4\na=A(); a.x+=2\nprint(a.x)', '인스턴스 필드 x가 6이 된다.'],
  ['gen-python-012', 'Python 클래스 메서드', 'Python class', ['class', '메서드'], 'HiKim', 'class A:\n    def hi(self,n):\n        return "Hi"+n\nprint(A().hi("Kim"))', '메서드 반환 문자열을 출력한다.'],
];
const pythonCodeSpecs: CodeSpec[] = pythonCodeTuples.map(([id, title, topic, tags, answer, code, explanation]) => ({
  id,
  title,
  topic,
  tags,
  answer,
  code,
  explanation,
  language: 'Python' as const,
  signalIds: ['signal-python-sequence-copy'],
}));

const sqlSpecs: ConceptTuple[] = [
  ['gen-sql-001', 'SQL JOIN 건수', 'JOIN', ['JOIN'], 'A 2\nB 1', 'dept A에 2건, B에 1건이 조인된다.'],
  ['gen-sql-002', 'SQL LEFT JOIN NULL', 'JOIN', ['LEFT JOIN', 'NULL'], 'A 1\nB 0', 'LEFT JOIN은 매칭 없는 B도 남기고 COUNT(column)은 NULL을 세지 않는다.'],
  ['gen-sql-003', 'SQL SELF JOIN 개념', 'JOIN', ['JOIN', 'SELF JOIN'], 'SELF JOIN', '같은 테이블을 두 번 참조해 관계를 비교한다.'],
  ['gen-sql-004', 'SQL JOIN 조건 위치', 'JOIN', ['JOIN', 'WHERE'], '2', '조인 후 조건으로 남은 행 수를 계산한다.'],
  ['gen-sql-005', 'SQL GROUP BY 합계', 'GROUP BY', ['GROUP BY'], 'A 30\nB 20', 'category별 amount 합계를 구한다.'],
  ['gen-sql-006', 'SQL HAVING 평균', 'HAVING', ['GROUP BY', 'HAVING'], 'A', '그룹 평균 조건은 HAVING에서 적용한다.'],
  ['gen-sql-007', 'SQL COUNT 그룹', 'GROUP BY', ['GROUP BY', 'COUNT'], '2', '조건을 만족하는 그룹 수를 센다.'],
  ['gen-sql-008', 'SQL 서브쿼리 평균 초과', 'subquery', ['서브쿼리', 'AVG'], 'kim', '평균보다 큰 행만 남긴다.'],
  ['gen-sql-009', 'SQL IN 서브쿼리', 'subquery', ['서브쿼리', 'IN'], '2', '서브쿼리 결과 집합에 포함된 행 수다.'],
  ['gen-sql-010', 'SQL EXISTS', 'subquery', ['서브쿼리', 'EXISTS'], 'Y', '연관 행이 존재하면 조건이 참이다.'],
  ['gen-sql-011', 'SQL DDL 명령', 'DDL/DML/DCL', ['DDL'], 'CREATE', '객체 생성은 DDL의 CREATE다.'],
  ['gen-sql-012', 'SQL DML 명령', 'DDL/DML/DCL', ['DML'], 'UPDATE', '데이터 수정은 DML의 UPDATE다.'],
  ['gen-sql-013', 'SQL DCL 명령', 'DDL/DML/DCL', ['DCL'], 'REVOKE', '권한 회수는 DCL의 REVOKE다.'],
  ['gen-sql-014', 'SQL COUNT NULL', 'NULL/COUNT', ['NULL', 'COUNT'], '2 1', 'COUNT(*)는 전체 행, COUNT(col)은 NULL 제외다.'],
  ['gen-sql-015', 'SQL NULL 비교', 'NULL/COUNT', ['NULL', 'WHERE'], 'IS NULL', 'NULL 비교에는 = 대신 IS NULL을 사용한다.'],
];

const securitySpecs: ConceptTuple[] = [
  ['gen-sec-001', 'Watering Hole 정의', 'Watering Hole', ['보안', 'Watering Hole'], 'Watering Hole', '자주 방문하는 사이트를 감염시켜 표적을 기다린다.'],
  ['gen-sec-002', 'SQL Injection 핵심 방어', 'SQL Injection', ['보안', 'SQL Injection'], 'Prepared Statement', '파라미터 바인딩으로 SQL 구조와 값을 분리한다.'],
  ['gen-sec-003', 'VPN 목적', 'VPN', ['네트워크', 'VPN'], '가상 사설망', '공중망에서 사설망처럼 암호화된 통신 경로를 제공한다.'],
  ['gen-sec-004', 'IPsec 계층', 'IPsec/SSL', ['네트워크', 'IPsec'], '네트워크 계층', 'IPsec은 IP 계층에서 보안 기능을 제공한다.'],
  ['gen-sec-005', 'SSL/TLS 계층', 'IPsec/SSL', ['네트워크', 'SSL'], '전송 계층 위', 'SSL/TLS는 애플리케이션 통신 보호에 활용된다.'],
  ['gen-sec-006', '서브넷 /27 호스트', 'subnet', ['네트워크', '서브넷'], '30', '/27은 32개 주소 중 2개를 제외해 30개 호스트다.'],
  ['gen-sec-007', '서브넷 /28 블록', 'subnet', ['네트워크', '서브넷'], '16', '/28은 블록 크기가 16이다.'],
  ['gen-sec-008', 'OSI 3계층', 'OSI/TCP-IP', ['네트워크', 'OSI'], '네트워크 계층', 'IP 라우팅은 OSI 3계층과 관련된다.'],
  ['gen-sec-009', 'TCP/IP 응용 계층', 'OSI/TCP-IP', ['네트워크', 'TCP/IP'], 'HTTP', 'HTTP는 응용 계층 프로토콜이다.'],
  ['gen-sec-010', 'SYN Flooding', 'SYN Flooding', ['보안', 'DoS'], 'SYN Flooding', 'TCP 연결 절차의 SYN 요청을 악용한다.'],
  ['gen-sec-011', 'ARP Spoofing', 'ARP Spoofing', ['보안', 'ARP'], 'ARP Spoofing', 'MAC 주소 매핑을 속여 트래픽을 가로챈다.'],
  ['gen-sec-012', 'OAuth 역할', 'OAuth', ['보안', 'OAuth'], '인가', 'OAuth는 제3자 애플리케이션의 권한 위임에 사용된다.'],
  ['gen-sec-013', '접근통제 모델', '접근통제', ['보안', '접근통제'], 'RBAC', '역할 기반 접근통제는 사용자 역할에 권한을 부여한다.'],
  ['gen-sec-014', '최소 권한 원칙', '접근통제', ['보안', '접근통제'], '최소 권한', '필요한 권한만 부여해 피해 범위를 줄인다.'],
  ['gen-sec-015', '라우팅 의미', 'OSI/TCP-IP', ['네트워크', '라우팅'], '경로 선택', '라우팅은 목적지까지 패킷 경로를 선택한다.'],
];

const dbTestPatternSpecs: DbTuple[] = [
  ['gen-db-001', 'DB 설계 순서', 'DB 설계 순서', ['DB', '설계절차'], '요구사항 분석, 개념 설계, 논리 설계, 물리 설계'],
  ['gen-db-002', '개념 설계 산출물', 'DB 설계 순서', ['DB', 'ERD'], 'ERD'],
  ['gen-db-003', '논리 설계 변환', 'DB 설계 순서', ['DB', '릴레이션'], '릴레이션 스키마'],
  ['gen-db-004', '1NF 핵심', '정규화', ['DB', '정규화'], '원자값'],
  ['gen-db-005', '2NF 핵심', '정규화', ['DB', '정규화'], '부분 함수 종속 제거'],
  ['gen-db-006', '3NF 핵심', '정규화', ['DB', '정규화'], '이행 함수 종속 제거'],
  ['gen-db-007', '후보키 성질', '키/무결성', ['DB', '키'], '유일성, 최소성'],
  ['gen-db-008', '외래키 무결성', '키/무결성', ['DB', '무결성'], '참조 무결성'],
  ['gen-db-009', '트랜잭션 격리성', '트랜잭션', ['DB', '트랜잭션'], 'Isolation'],
  ['gen-db-010', '트랜잭션 지속성', '트랜잭션', ['DB', '트랜잭션'], 'Durability'],
  ['gen-sw-001', '문장 커버리지', '테스트 커버리지', ['테스트', '커버리지'], 'Statement Coverage'],
  ['gen-sw-002', '분기 커버리지', '테스트 커버리지', ['테스트', '커버리지'], 'Branch Coverage'],
  ['gen-sw-003', 'Stub 의미', 'Stub/Driver', ['테스트', 'Stub'], '하위 모듈 대체'],
  ['gen-sw-004', 'Driver 의미', 'Stub/Driver', ['테스트', 'Driver'], '상위 모듈 대체'],
  ['gen-sw-005', 'Factory Method', '디자인 패턴', ['디자인패턴', 'GOF'], 'Factory Method'],
  ['gen-sw-006', 'Observer', '디자인 패턴', ['디자인패턴', 'GOF'], 'Observer'],
  ['gen-sw-007', 'Singleton', '디자인 패턴', ['디자인패턴', 'GOF'], 'Singleton'],
  ['gen-sw-008', '응집도 방향', '응집도/결합도', ['소프트웨어공학', '응집도'], '높을수록 좋다'],
  ['gen-sw-009', '결합도 방향', '응집도/결합도', ['소프트웨어공학', '결합도'], '낮을수록 좋다'],
  ['gen-sw-010', '애자일 반복', '소프트웨어공학', ['소프트웨어공학', '애자일'], '이터레이션'],
];

const codeQuestions = [...cCodeSpecs, ...javaCodeSpecs, ...pythonCodeSpecs].map((spec, index) => makeCode(spec, index));
const sqlQuestions = sqlSpecs.map(([id, title, topic, tags, answer, explanation], index) =>
  makeSql(
    {
      id,
      title,
      topic,
      tags: ['SQL', ...(tags as string[])],
      prompt: `${title}에 대한 결과 또는 핵심 답을 쓰시오.`,
      answer,
      explanation,
      signalIds: ['signal-sql-aggregation-join'],
    },
    index,
  ),
);
const securityQuestions = securitySpecs.map(([id, title, topic, tags, answer, explanation], index) =>
  makeConcept(
    {
      id,
      title,
      chapter: chapterMap.securityNetwork,
      topic,
      tags: tags as string[],
      prompt: `${title}의 핵심 개념을 쓰시오.`,
      answer,
      explanation,
      signalIds: ['signal-security-network-core'],
    },
    index,
  ),
);
const dbTestPatternQuestions = dbTestPatternSpecs.map(([id, title, topic, tags, answer], index) =>
  makeConcept(
    {
      id,
      title,
      chapter: String(id).startsWith('gen-db') ? chapterMap.database : chapterMap.engineering,
      topic,
      tags: tags as string[],
      prompt: `${title}에 해당하는 핵심 키워드를 쓰시오.`,
      answer,
      explanation: `${title}는 시험 직전 짧게 확인할 핵심 키워드다.`,
      signalIds: String(id).startsWith('gen-db') ? ['signal-db-design-transaction'] : ['signal-testing-pattern-engineering'],
    },
    index,
  ),
);

export const generatedSampleQuestions: Question[] = [
  ...codeQuestions,
  ...sqlQuestions,
  ...securityQuestions,
  ...dbTestPatternQuestions,
];
