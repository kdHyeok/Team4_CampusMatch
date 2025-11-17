// 간단한 압축 인코딩/디코딩 클래스
class CompactEncoder {
    // 15개 답변을 비트로 압축 (각 답변은 0 또는 1)
    static encode(answers) {
        // 15개 답변을 이진 문자열로 변환
        const mapping = {
            'S': '0', 'I': '1',
            'D': '0', 'W': '1',
            'O': '0', 'P': '1'
        };
        
        let binaryStr = '';
        answers.forEach(answer => {
            binaryStr += mapping[answer] || '0';
        });
        
        // 이진 문자열을 16진수로 변환 (더 짧음)
        let hex = parseInt(binaryStr, 2).toString(36); // 36진수 사용 (0-9, a-z)
        return hex;
    }
    
    static decode(encoded) {
        if (!encoded) return [];
        
        try {
            // 36진수를 이진 문자열로 변환
            let binaryStr = parseInt(encoded, 36).toString(2);
            
            // 15자리로 패딩
            binaryStr = binaryStr.padStart(15, '0');
            
            // 각 질문의 타입에 맞게 변환
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
}

// 현재 상태 관리
class QuestionManager {
    constructor() {
        this.currentQuestion = 1;
        this.answers = [];
        this.userName = '';
        this.init();
    }
    
    init() {
        // 사용자 이름 가져오기
        this.userName = sessionStorage.getItem('userName') || '사용자';
        
        // URL에서 현재 질문 번호와 이전 답변 가져오기
        const params = new URLSearchParams(window.location.search);
        const questionNum = parseInt(params.get('q')) || 1;
        const encodedAnswers = params.get('a');
        
        this.currentQuestion = questionNum;
        this.answers = CompactEncoder.decode(encodedAnswers);
        
        this.loadQuestion();
        this.updateProgress();
        this.setupEventListeners();
    }
    
    loadQuestion() {
        const question = questionsData[this.currentQuestion - 1];
        
        // 공제이 메시지 표시
        document.getElementById('gongjayMessage').textContent = question.gongjay;
        
        // 질문 이미지 표시
        document.getElementById('questionImg').src = question.image;
        document.getElementById('questionImg').alt = question.gongjay;
        
        // 선택지 설정
        const choiceA = document.getElementById('choiceA');
        const choiceB = document.getElementById('choiceB');
        
        choiceA.querySelector('.choice-text').textContent = question.choiceA.text;
        choiceA.dataset.value = question.choiceA.value;
        
        choiceB.querySelector('.choice-text').textContent = question.choiceB.text;
        choiceB.dataset.value = question.choiceB.value;
    }
    
    updateProgress() {
        const progress = (this.currentQuestion / 15) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        document.getElementById('progressCharacter').style.left = `${progress}%`;
        document.getElementById('progressText').textContent = `${this.currentQuestion} / 15`;
    }
    
    setupEventListeners() {
        // 뒤로가기 버튼
        document.getElementById('backButton').addEventListener('click', () => {
            this.goBack();
        });
        
        // 선택지 버튼
        document.querySelectorAll('.choice-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.selectAnswer(e.currentTarget);
            });
        });
    }
    
    selectAnswer(button) {
        // 선택 애니메이션
        button.classList.add('selected');
        
        const value = button.dataset.value;
        const currentAnswers = [...this.answers];
        
        // 현재 질문의 답변 저장
        currentAnswers[this.currentQuestion - 1] = value;
        
        // 다음 페이지로 이동
        setTimeout(() => {
            if (this.currentQuestion < 15) {
                this.goToNext(currentAnswers);
            } else {
                this.completeTest(currentAnswers);
            }
        }, 300);
    }
    
    goToNext(answers) {
        const nextQuestion = this.currentQuestion + 1;
        const encoded = CompactEncoder.encode(answers);
        window.location.href = `question.html?q=${nextQuestion}&a=${encoded}`;
    }
    
    goBack() {
        if (this.currentQuestion === 1) {
            // 첫 페이지면 시작 페이지로
            window.location.href = 'intro.html';
        } else {
            // 이전 질문으로
            const prevQuestion = this.currentQuestion - 1;
            const encoded = CompactEncoder.encode(this.answers);
            window.location.href = `question.html?q=${prevQuestion}&a=${encoded}`;
        }
    }
    
    completeTest(answers) {
        // 결과 계산
        const result = this.calculateResult(answers);
        const encoded = CompactEncoder.encode(answers);
        
        // 답변 데이터를 sessionStorage에도 저장
        sessionStorage.setItem('testAnswers', JSON.stringify(answers));
        sessionStorage.setItem('testResult', result);
        
        // 결과 페이지로 이동
        window.location.href = `result.html?type=${result}&a=${encoded}`;
    }
    
    calculateResult(answers) {
        const counts = {
            'S': 0, 'I': 0,
            'D': 0, 'W': 0,
            'O': 0, 'P': 0
        };
        
        answers.forEach(answer => {
            if (counts.hasOwnProperty(answer)) {
                counts[answer]++;
            }
        });
        
        // 각 카테고리별 최다 선택 찾기 (3개 차원)
        const outcome = counts['O'] >= counts['P'] ? 'O' : 'P';  // 성과 vs 성장
        const depth = counts['D'] >= counts['W'] ? 'D' : 'W';    // 전공 vs 경험
        const social = counts['S'] >= counts['I'] ? 'S' : 'I';   // 관계 vs 개인
        
        // 결과 타입 조합 (ODS, ODI, OWS, OWI, PDS, PDI, PWS, PWI)
        return `${outcome}${depth}${social}`;
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new QuestionManager();
});
