# Openlet → 집중 회상

2026-10-20. 목요일 뉴스큐레이션 시험 준비를 위한 구조 분석과 독립 재구현.

## 분석 대상과 도구

- 원본: [ChloeVPin/Openlet](https://github.com/ChloeVPin/Openlet), MIT License.
- 고정 커밋: `ca54e718eb2aca2567daa6b4859fbf385666d558`.
- 도구: [morluto/rea](https://github.com/morluto/rea), `rea-agents@6.7.0`.
- 실행: `analyze-javascript-application <Openlet checkout> --json`.
- 93개 파일을 대상으로 정적 분석 결과를 생성하고 아래 소스를 직접 검토했다. 원본 서비스를 실행하거나 서버 동작을 검증한 결과가 아니다. 동적 연결은 정적 분석으로 확정할 수 없다.

## 학습 흐름에서 가져온 것

| 원본 소스 | 관찰 | 이 앱의 적용 |
|---|---|---|
| [learn route](https://github.com/ChloeVPin/Openlet/blob/ca54e718eb2aca2567daa6b4859fbf385666d558/src/routes/set.%24id.learn.tsx) | 복습 시각 우선 정렬, 답 공개 뒤 평가, 어려운 카드 재등장 | 약점과 복습 시각 우선, 설명 숨기기, 오답은 세션당 한 번 추가 |
| [write route](https://github.com/ChloeVPin/Openlet/blob/ca54e718eb2aca2567daa6b4859fbf385666d558/src/routes/set.%24id.write.tsx) | 입력 → 피드백 → 다음 문제 | 한국어 단답 입력과 서술형 자기 평가 |
| [study utilities](https://github.com/ChloeVPin/Openlet/blob/ca54e718eb2aca2567daa6b4859fbf385666d558/src/lib/study-utils.ts) | 정규화·유사 문자열 비교, 섞기, 복습 여부 | 단답만 공백·구두점 정규화와 별칭 비교; 서술형 유사도 자동 채점 제외 |
| test / match routes | 시험과 짝맞추기를 별도 모드로 분리 | 제출 전 정답 비공개 혼합시험, 6쌍 개념 구분 |

## 의도적인 차이

원본의 React/TanStack/Supabase 구조를 복제하지 않고 기존 정적 PWA에 맞춰 새로 구현했다. 학습 데이터와 상태 전이는 자체 작성했으며 원본 사용자 데이터는 사용하지 않았다. 원본 FSRS를 이식하지 않았다. 시험 전용 10분/30분/4시간 간격은 편의 규칙이다.

객관식 오답을 '알고 있음'으로 저장할 수 없게 하고, 오답 재등장을 한 번으로 제한했다. 짝맞추기는 회상 숙련도에 자동 반영하지 않는다. 모의시험 형식과 개수는 자체 연습 구성이다.

기존 화요일 앱과 저장 키는 보존했다. 뉴스큐레이션은 별도 저장 키를 사용한다. JSON 백업은 복습 기록을 병합하며 진행 중인 답안을 덮어쓰지 않는다.

## 학습 근거

- [Karpicke & Blunt, 2011](https://pubmed.ncbi.nlm.nih.gov/21252317/): 회상 연습.
- [Dunlosky et al., 2013](https://doi.org/10.1177/1529100612453266): 연습 시험과 분산 학습.
- [Butler & Roediger, 2008](https://pubmed.ncbi.nlm.nih.gov/18491500/): 객관식 뒤 피드백.
- [Cepeda et al., 2008](https://pubmed.ncbi.nlm.nih.gov/19076480/): 기억 유지 기간과 복습 간격의 관계.

학습 효과는 개인과 과제에 따라 달라지며 이 앱 자체에 대한 실험 결과를 의미하지 않는다.
