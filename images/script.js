// DOM 요소 선택
const nameInput = document.getElementById('nameInput');
const startButton = document.getElementById('startButton');

// 입력 유효성 검사
function validateInput() {
    const name = nameInput.value.trim();
    
    if (name.length === 0) {
        startButton.classList.add('disabled');
        return false;
    } else {
        startButton.classList.remove('disabled');
        return true;
    }
}

// 실시간 입력 검증
nameInput.addEventListener('input', validateInput);

// Enter 키 처리
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && validateInput()) {
        handleStart();
    }
});

// 시작 버튼 클릭 처리
startButton.addEventListener('click', handleStart);

function handleStart() {
    if (!validateInput()) {
        nameInput.focus();
        nameInput.classList.add('shake');
        setTimeout(() => nameInput.classList.remove('shake'), 500);
        return;
    }
    
    const userName = nameInput.value.trim();
    
    // 로딩 상태 표시
    startButton.classList.add('loading');
    startButton.innerHTML = '<span class="button-text">로딩중...</span>';
    
    // 사용자 데이터 저장
    sessionStorage.setItem('userName', userName);
    
    // 인트로 페이지로 이동 (수정됨!)
    setTimeout(() => {
        window.location.href = 'intro.html';
    }, 500);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    const savedName = sessionStorage.getItem('userName');
    if (savedName) {
        nameInput.value = savedName;
        validateInput();
    }
    
    nameInput.focus();
});

// 애니메이션 CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    .disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);
