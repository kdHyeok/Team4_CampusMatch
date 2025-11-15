class ResultManager {
    constructor() {
        this.userName = '';
        this.resultType = '';
        this.answers = [];
        this.init();
    }
    
    init() {
        // URL 파라미터에서 데이터 가져오기
        const params = new URLSearchParams(window.location.search);
        this.resultType = params.get('type') || 'SDAO';
        const encodedAnswers = params.get('a');
        
        // sessionStorage에서 사용자 이름 가져오기
        this.userName = sessionStorage.getItem('userName') || '사용자';
        
        // 답변 디코딩
        this.answers = this.decodeAnswers(encodedAnswers);
        
        // 결과 표시
        this.displayResult();
        this.displayAnswerStats();
        this.setupEventListeners();
    }
    
    decodeAnswers(encoded) {
        if (!encoded) return [];
        try {
            const base64 = encoded
                .replace(/-/g, '+')
                .replace(/_/g, '/');
            const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
            const jsonStr = decodeURIComponent(atob(padded));
            return JSON.parse(jsonStr);
        } catch (e) {
            console.error('Decode error:', e);
            return [];
        }
    }
    
    displayResult() {
        const typeData = personalityTypes[this.resultType];
        
        // 사용자 이름 표시
        document.getElementById('userName').textContent = this.userName;
        
        // 결과 타입 표시
        document.getElementById('resultType').textContent = this.resultType;
        document.getElementById('typeName').textContent = typeData.name;
        
        // 설명 표시
        document.getElementById('typeDescription').textContent = typeData.description;
        
        // 추천 활동 표시
        const activitiesList = document.getElementById('recommendedActivities');
        typeData.activities.forEach(activity => {
            const li = document.createElement('li');
            li.textContent = activity;
            activitiesList.appendChild(li);
        });
    }
    
    displayAnswerStats() {
        // 각 선택지별 카운트
        const counts = {
            'S': 0, 'I': 0,
            'D': 0, 'W': 0,
            'A': 0, 'R': 0,
            'O': 0, 'P': 0
        };
        
        this.answers.forEach(answer => {
            if (counts.hasOwnProperty(answer)) {
                counts[answer]++;
            }
        });
        
        // 각 항목별 표시
        Object.keys(counts).forEach(key => {
            const count = counts[key];
            const percentage = (count / 12) * 100;
            
            // 카운트 표시
            const countElement = document.getElementById(`count${key}`);
            if (countElement) {
                countElement.textContent = count;
            }
            
            // 바 애니메이션
            const barElement = document.getElementById(`bar${key}`);
            if (barElement) {
                setTimeout(() => {
                    barElement.style.width = `${percentage}%`;
                }, 100);
            }
        });
    }
    
    setupEventListeners() {
        // 맞춤 프로그램 보기
        document.getElementById('viewRecommendations').addEventListener('click', () => {
            // 추천 페이지로 이동 (추후 구현)
            alert('맞춤 프로그램 페이지로 이동합니다.');
            // window.location.href = `recommendations.html?type=${this.resultType}`;
        });
        
        // 다시 테스트하기
        document.getElementById('retakeTest').addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
        
        // 결과 공유하기
        document.getElementById('shareResult').addEventListener('click', () => {
            this.shareResult();
        });
    }
    
    shareResult() {
        const typeData = personalityTypes[this.resultType];
        const shareText = `나의 대학생 유형은 "${typeData.name} (${this.resultType})"입니다! 팀즈 Match에서 당신의 유형도 확인해보세요!`;
        
        if (navigator.share) {
            navigator.share({
                title: '팀즈 Match 결과',
                text: shareText,
                url: window.location.href
            }).catch(err => console.log('공유 취소:', err));
        } else {
            // 클립보드 복사
            navigator.clipboard.writeText(shareText + ' ' + window.location.href)
                .then(() => alert('결과가 클립보드에 복사되었습니다!'))
                .catch(err => console.error('복사 실패:', err));
        }
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new ResultManager();
});
