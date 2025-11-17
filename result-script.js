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
        this.resultType = params.get('type') || 'ODS';
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
            // 36진수를 이진 문자열로 변환
            let binaryStr = parseInt(encoded, 36).toString(2);
            binaryStr = binaryStr.padStart(15, '0');
            
            const types = ['S/I', 'O/P', 'D/W', 'S/I', 'D/W', 'S/I', 'O/P', 'S/I', 'D/W', 'O/P', 'O/P', 'D/W', 'S/I', 'O/P', 'D/W'];
            const answers = [];
            
            for (let i = 0; i < 15; i++) {
                const bit = binaryStr[i];
                const type = types[i];
                
                if (type === 'S/I') {
                    answers.push(bit === '0' ? 'S' : 'I');
                } else if (type === 'D/W') {
                    answers.push(bit === '0' ? 'D' : 'W');
                } else if (type === 'O/P') {
                    answers.push(bit === '0' ? 'O' : 'P');
                }
            }
            
            return answers;
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
        document.getElementById('typeNickname').textContent = typeData.nickname;
        
        // 설명 표시
        document.getElementById('typeDescription').textContent = typeData.description;
        
        // 강점 표시
        const strengthsList = document.getElementById('strengthsList');
        strengthsList.innerHTML = '';
        typeData.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });
        
        // 약점 표시
        const weaknessesList = document.getElementById('weaknessesList');
        weaknessesList.innerHTML = '';
        typeData.weaknesses.forEach(weakness => {
            const li = document.createElement('li');
            li.textContent = weakness;
            weaknessesList.appendChild(li);
        });
        
        // 기본 추천 프로그램
        const baseList = document.getElementById('basePrograms');
        baseList.innerHTML = '';
        typeData.basePrograms.forEach(program => {
            const li = document.createElement('li');
            li.textContent = program;
            baseList.appendChild(li);
        });
        
        // 접근 추천 프로그램
        const approachList = document.getElementById('approachPrograms');
        approachList.innerHTML = '';
        typeData.approachPrograms.forEach(program => {
            const li = document.createElement('li');
            li.textContent = program;
            approachList.appendChild(li);
        });
        
        // 회피 추천 프로그램
        const avoidList = document.getElementById('avoidancePrograms');
        avoidList.innerHTML = '';
        typeData.avoidancePrograms.forEach(program => {
            const li = document.createElement('li');
            li.textContent = program;
            avoidList.appendChild(li);
        });
    }
    
    displayAnswerStats() {
        // 각 선택지별 카운트
        const counts = {
            'S': 0, 'I': 0,
            'D': 0, 'W': 0,
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
            const percentage = (count / 15) * 100;
            
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
            navigator.clipboard.writeText(shareText + '\n' + window.location.href)
                .then(() => alert('결과가 클립보드에 복사되었습니다!'))
                .catch(err => console.error('복사 실패:', err));
        }
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new ResultManager();
});
