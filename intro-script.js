// 뒤로가기 버튼 처리
document.getElementById('backButton').addEventListener('click', () => {
    // index 페이지로 돌아가기
    window.location.href = 'index.html';
});

// 시작 버튼 처리
document.getElementById('startJourney').addEventListener('click', () => {
    // 사용자 이름 확인
    const userName = sessionStorage.getItem('userName');
    
    if (!userName) {
        // 이름이 없으면 index로 리다이렉트
        alert('이름을 먼저 입력해주세요.');
        window.location.href = 'index.html';
        return;
    }
    
    // 버튼 로딩 상태
    const button = document.getElementById('startJourney');
    button.innerHTML = '<span>시작하는 중...</span>';
    button.disabled = true;
    
    // 첫 번째 질문으로 이동
    setTimeout(() => {
        window.location.href = 'question.html?q=1';
    }, 500);
});

// 페이지 로드 시 사용자 이름 확인
document.addEventListener('DOMContentLoaded', () => {
    const userName = sessionStorage.getItem('userName');
    
    if (!userName) {
        // 이름이 없으면 index로 리다이렉트
        window.location.href = 'index.html';
    }
});
