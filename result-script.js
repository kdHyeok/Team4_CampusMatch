class ResultManager {
    constructor() {
        this.userName = '';
        this.resultType = '';
        this.answers = [];
        this.init();
    }
    
    init() {
        const params = new URLSearchParams(window.location.search);
        this.resultType = params.get('type') || 'ODS';
        const encodedAnswers = params.get('a');
        
        this.userName = sessionStorage.getItem('userName') || '사용자';
        this.answers = this.decodeAnswers(encodedAnswers);
        
        // 유형별 이미지 프리로드
        this.preloadCharacterImage();
        
        this.displayResult();
        this.setupEventListeners();
    }
    
    // [추가] 캐릭터 이미지 프리로드
    preloadCharacterImage() {
        const typeData = personalityTypes[this.resultType];
        if (typeData && typeData.characterImage) {
            const img = new Image();
            img.src = typeData.characterImage;
        }
    }
    
    decodeAnswers(encoded) {
        if (!encoded) return [];
        try {
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
        
        // 사용자 정보
        document.getElementById('userNameDisplay').textContent = this.userName;
        document.getElementById('typeTitle').textContent = typeData.title;
        document.getElementById('typeBadge').textContent = typeData.nickname;
        document.getElementById('typeCode').textContent = this.resultType;
        
        // [수정] 유형별 캐릭터 이미지 설정
        const characterImg = document.getElementById('resultCharacter');
        characterImg.src = typeData.characterImage;
        characterImg.alt = typeData.nickname;
        
        // 이미지 로드 에러 처리 (폴백)
        characterImg.onerror = () => {
            console.warn(`캐릭터 이미지 로드 실패: ${typeData.characterImage}`);
            // 기본 이미지로 폴백
            characterImg.src = 'images/characters/default-character.png';
        };
        
        // 설명
        document.getElementById('descriptionText').textContent = typeData.description;
        
        // 강점
        const strengthsList = document.getElementById('strengthsList');
        strengthsList.innerHTML = '';
        typeData.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });
        
        // 약점
        const weaknessesList = document.getElementById('weaknessesList');
        weaknessesList.innerHTML = '';
        typeData.weaknesses.forEach(weakness => {
            const li = document.createElement('li');
            li.textContent = weakness;
            weaknessesList.appendChild(li);
        });
        
        // 기본 프로그램
        const baseProgramList = document.getElementById('baseProgramList');
        baseProgramList.innerHTML = '';
        typeData.basePrograms.forEach(program => {
            const li = document.createElement('li');
            li.textContent = program;
            baseProgramList.appendChild(li);
        });
        
        // 대안 프로그램
        const alternativeProgramList = document.getElementById('alternativeProgramList');
        alternativeProgramList.innerHTML = '';
        typeData.alternativePrograms.forEach(program => {
            const li = document.createElement('li');
            li.textContent = program;
            alternativeProgramList.appendChild(li);
        });
    }
    
    setupEventListeners() {
        document.getElementById('viewPrograms').addEventListener('click', () => {
            alert('프로그램 상세 페이지로 이동합니다.');
        });
        
        document.getElementById('retakeTest').addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
        
        document.getElementById('shareResult').addEventListener('click', () => {
            this.shareResult();
        });
        
        document.getElementById('backButton').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    shareResult() {
        const typeData = personalityTypes[this.resultType];
        const shareText = `나는 "${typeData.nickname} (${this.resultType})"! 캠퍼스 Match에서 당신의 유형도 확인해보세요!`;
        
        if (navigator.share) {
            navigator.share({
                title: '캠퍼스 Match 결과',
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

document.addEventListener('DOMContentLoaded', () => {
    new ResultManager();
});
