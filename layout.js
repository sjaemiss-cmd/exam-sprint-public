'use strict';
const friday=location.pathname.endsWith('/friday.html');
const subject=friday?'데이터분석개론':'뉴스큐레이션';
const originalRender=render;
function progressFor(key){try{return Object.values(JSON.parse(localStorage.getItem(key)||'{}').records||{}).filter(r=>r.grade===2).length}catch{return 0}}
function compactHome(){
 const unfinished=state.session&&state.session.index<state.session.queue.length;
 const weak=Object.values(state.records).filter(r=>r.grade<2).length;
 const total=N.cards.length;
 el.innerHTML=`<section class="welcome"><div><div class="eyebrow">${friday?'FRIDAY · 10.23':'THURSDAY · 10.22'}</div><h1>${subject}</h1><p>${friday?'개념을 이해하고, 코드를 손으로 써보는 공부':'핵심 개념을 이해하고, 내 말로 설명하는 공부'}</p></div><div class="progress-summary"><b>${count()}<small> / ${total}</small></b><span>설명할 수 있는 문제</span></div></section>
 <div class="focus-grid"><section class="focus-card"><span class="tiny-label">지금 시작할 학습</span><h2>${unfinished?'하던 곳부터 이어서.':friday?'추천문제 9개부터.':'가볍게 6문제부터.'}</h2><p>${unfinished?'입력한 답과 진행 위치가 저장돼 있어요.':friday?'출제 범위에 명시된 7주차 추천문제를 먼저 복습하세요.':'핵심을 읽고, 가린 뒤 직접 답해 보세요.'}</p><div class="focus-actions">${unfinished?btn('이어서 공부하기 →','resume','','primary'):btn(friday?'추천문제 시작 →':'기초 학습 시작 →','start',friday?'official':'learn','primary')}${unfinished?btn('새 학습','start','learn'):''}</div><div class="focus-foot"><span>12개 단원</span><span>${friday?'코드 연습 12개':'단답 · 객관식 · 서술형'}</span><span>진도 자동 저장</span></div></section>
 <section class="exam-card"><span class="tiny-label">시험 일정</span><h2>${friday?'10월 23일 <em>금요일</em>':'10월 22일 <em>목요일</em>'}</h2><dl><div><dt>시간</dt><dd>${friday?'19:00–20:30 · 90분':'60분 · 시작 시각 공지 없음'}</dd></div><div><dt>장소</dt><dd>${friday?'광개토관 204호':'정규 강의실 집현관 308 참고'}</dd></div><div><dt>방식</dt><dd>${friday?'대면 지필시험':'강의실 온라인 · 노트북 지참'}</dd></div></dl><details><summary>범위와 공지 확인</summary><p>${friday?'1~7주차와 5주차 추가영상. 개념·단답·객관식 및 코드 빈칸·해석·간단한 작성.':'PPT·업로드 자료·수업에서 언급한 내용 전체. 문항 형식·개수는 미공개입니다. 정규 수업은 12:00–13:30이며 시험 시각·호실은 별도 확정되지 않았습니다.'}</p><a href="${esc(N.schedule.notice)}" target="_blank" rel="noopener">학교 공지 열기 ↗</a></details></section></div>
 <section class="practice-section"><div class="section-heading"><h2>어떻게 공부할까요?</h2><span>답을 보기 전에 먼저 떠올리기</span></div><div class="practice-grid">
 ${[[friday?'code':'learn',friday?'01':'01',friday?'코드 연습':'배우기',friday?'빈칸·실행 결과·짧은 작성':'핵심을 읽고 가린 뒤 회상','start'],['write','02','직접 쓰기','개념 이름을 기억에서 꺼내기','start'],['test','03','모의시험',friday?'90분 · 개념과 코드 12문제':'60분 · 혼합 연습 12문제','test'],['match','04','짝맞추기','헷갈리는 개념 6쌍 구분','match']].map(([id,no,title,desc,act])=>`<button class="practice-tile" data-act="${act}" data-arg="${id}"><span>${no}<i>↗</i></span><b>${title}</b><small>${desc}</small></button>`).join('')}</div></section>
 <div class="bottom-links"><button data-view="notes"><span><b>전체 개념 정리</b><small>12개 단원 · 검색 · 한 줄 요약</small></span><i>→</i></button><button data-view="review"><span><b>약점 다시 보기 <em>${weak}</em></b><small>틀린 문제와 표시한 문제</small></span><i>→</i></button></div>
 <div class="extra-practice">${btn('서술형 연습','start','essay','small')}${friday?btn('기초 6문제','start','learn','small')+btn('추천문제 9개','start','official','small'):''}<button class="text-button" data-view="methods">학습 방법과 근거 ↗</button></div>`;
}
render=function(){
 if(view==='home')compactHome();else originalRender();
 document.querySelectorAll('.subject-nav [data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
 document.querySelector('#breadcrumb').textContent=({home:'학습 홈',notes:'개념 정리',review:'오답 복습',methods:'학습 방법',session:'회상 연습',test:'모의시험',match:'짝맞추기'})[view]||'학습';
 document.body.classList.toggle('in-session',['session','test','match'].includes(view));
 document.querySelector('#thursday-progress').textContent=`${progressFor('exam-news-v2')}/48`;
 document.querySelector('#friday-progress').textContent=`${progressFor('exam-data-friday-v1')}/69`;
};
document.addEventListener('click',e=>{if(e.target.closest('[data-view],[data-act="start"],[data-act="test"],[data-act="match"],[data-act="resume"],[data-act="unit"]'))window.scrollTo({top:0,behavior:'instant'})});
render();
