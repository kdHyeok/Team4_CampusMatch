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
        
        this.preloadCharacterImage();
        this.displayResult();
        this.setupEventListeners();
    }
    
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
        
        document.getElementById('userNameDisplay').textContent = this.userName;
        document.getElementById('typeTitle').textContent = typeData.title;
        document.getElementById('typeBadge').textContent = typeData.nickname;
        document.getElementById('typeCode').textContent = this.resultType;
        
        const characterImg = document.getElementById('resultCharacter');
        characterImg.src = typeData.characterImage;
        characterImg.alt = typeData.nickname;
        
        characterImg.onerror = () => {
            console.warn(`캐릭터 이미지 로드 실패: ${typeData.characterImage}`);
            characterImg.src = 'images/characters/default-character.png';
        };
        
        document.getElementById('descriptionText').textContent = typeData.description;
        
        const strengthsList = document.getElementById('strengthsList');
        strengthsList.innerHTML = '';
        typeData.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });
        
        const weaknessesList = document.getElementById('weaknessesList');
        weaknessesList.innerHTML = '';
        typeData.weaknesses.forEach(weakness => {
            const li = document.createElement('li');
            li.textContent = weakness;
            weaknessesList.appendChild(li);
        });
        
        const baseProgramList = document.getElementById('baseProgramList');
        baseProgramList.innerHTML = '';
        typeData.basePrograms.forEach(program => {
            const li = document.createElement('li');
            li.textContent = program;
            baseProgramList.appendChild(li);
        });
        
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
        
        // 스크린샷 공유 기능으로 변경
        document.getElementById('shareResult').addEventListener('click', () => {
            this.captureAndShare();
        });
        
        document.getElementById('backButton').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    async captureAndShare() {
        const loadingEl = document.getElementById('screenshotLoading');
        const captureArea = document.getElementById('captureArea');
        const typeData = personalityTypes[this.resultType];
        
        // 애니메이션이 있는 요소 가져오기
        const characterImg = document.getElementById('resultCharacter');
        
        try {
            // 1. 로딩 표시
            loadingEl.style.display = 'flex';
            
            // 2. 캡처 준비: 버튼 숨기기 및 애니메이션 정지
            captureArea.classList.add('capturing');
            if (characterImg) {
                characterImg.style.animation = 'none'; // 캡처 중 흔들림 방지
                characterImg.style.transform = 'translateY(0)'; // 정위치 고정
            }
            
            // 3. 렌더링 안정화를 위한 대기 (시간을 조금 늘림)
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // 4. html2canvas로 캡처
            const canvas = await html2canvas(captureArea, {
                backgroundColor: '#4A90FF', // 배경색 강제 지정 (투명 방지)
                scale: 2,
                useCORS: true, // 서버 환경 필수
                allowTaint: true, // 로컬 환경에서 도움이 될 수 있음
                logging: true, // 디버깅을 위해 true로 변경하여 콘솔 확인
                width: captureArea.offsetWidth,
                height: captureArea.offsetHeight,
                // 캡처 시 제외할 요소들을 확실하게 무시
                ignoreElements: (element) => {
                    if (element.id === 'screenshotLoading') return true;
                    return false;
                }
            });
            
            // 5. 복구: 버튼 다시 표시 및 애니메이션 재개
            captureArea.classList.remove('capturing');
            if (characterImg) {
                characterImg.style.animation = ''; // 스타일 제거하여 CSS 애니메이션 복구
            }
            
            // 6. 결과 처리
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    throw new Error('Blob 생성 실패');
                }
            
                const fileName = `CampusMatch_${typeData.nickname}_${this.userName}.png`;
                
                // Web Share API 시도
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], fileName, { type: 'image/png' })] })) {
                    try {
                        const file = new File([blob], fileName, { type: 'image/png' });
                        await navigator.share({
                            title: '캠퍼스 Match 결과',
                            text: `나는 "${typeData.nickname} (${this.resultType})"!`,
                            files: [file]
                        });
                    } catch (err) {
                        if (err.name !== 'AbortError') {
                            this.downloadImage(blob, fileName);
                        }
                    }
                } else {
                    this.downloadImage(blob, fileName);
                }
                
                loadingEl.style.display = 'none';
            }, 'image/png');
            
        } catch (error) {
            console.error('상세 에러 로그:', error); // 콘솔에서 에러 확인
            alert('이미지 생성에 실패했습니다. (서버에서 실행 중인지 확인해주세요)');
            
            // 에러 발생 시에도 UI 복구
            captureArea.classList.remove('capturing');
            if (characterImg) characterImg.style.animation = '';
            loadingEl.style.display = 'none';
        }
    }
    
    // 이미지 다운로드 함수
    downloadImage(blob, fileName) {
        // IE 10, 11 지원
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            // 현대 브라우저
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            // 다운로드 완료 알림
            alert('결과 이미지가 다운로드되었습니다!');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ResultManager();
});
