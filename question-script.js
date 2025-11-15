// URL 파라미터 인코딩/디코딩 함수
class AnswerManager {
    static encode(answers) {
        const jsonStr = JSON.stringify(answers);
        return btoa(encodeURIComponent(jsonStr))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
    
    static decode(encoded) {
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
        this.answers = AnswerManager.decode(encodedAnswers);
        
        this.loadQuestion();
        this.updateProgress();
        this.setupEventListeners();
    }
    
    loadQuestion() {
        const question = questionsData[this.currentQuestion - 1];
        
        // 질문 내용 표시
        document.getElementById('questionImg').src = question.image;
        document.getElementById('questionImg').alt = question.title;
        document.getElementById('questionTitle').textContent = question.title;
        
        // 선택지 설정
        const choiceA = document.getElementById('choiceA');
        const choiceB = document.getElementById('choiceB');
        
        choiceA.querySelector('.choice-text').textContent = question.choiceA.text;
        choiceA.dataset.value = question.choiceA.value;
        
        choiceB.querySelector('.choice-text').textContent = question.choiceB.text;
        choiceB.dataset.value = question.choiceB.value;
    }
    
    updateProgress() {
        const progress = (this.currentQuestion / 12) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        document.getElementById('progressCharacter').style.left = `${progress}%`;
        document.getElementById('progressText').textContent = `${this.currentQuestion} / 12`;
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
            if (this.currentQuestion < 12) {
                this.goToNext(currentAnswers);
            } else {
                this.completeTest(currentAnswers);
            }
        }, 300);
    }
    
    goToNext(answers) {
        const nextQuestion = this.currentQuestion + 1;
        const encoded = AnswerManager.encode(answers);
        window.location.href = `question.html?q=${nextQuestion}&a=${encoded}`;
    }
    
    goBack() {
        if (this.currentQuestion === 1) {
            // 첫 페이지면 시작 페이지로
            window.location.href = 'index.html';
        } else {
            // 이전 질문으로
            const prevQuestion = this.currentQuestion - 1;
            const encoded = AnswerManager.encode(this.answers);
            window.location.href = `question.html?q=${prevQuestion}&a=${encoded}`;
        }
    }
    
    completeTest(answers) {
        // 결과 계산
        const result = this.calculateResult(answers);
        const encoded = AnswerManager.encode(answers);
        
        // 답변 데이터를 sessionStorage에도 저장
        sessionStorage.setItem('testAnswers', JSON.stringify(answers));
        sessionStorage.setItem('testResult', result);
        
        // 결과 페이지로 이동
        window.location.href = `result.html?type=${result}&a=${encoded}`;
    }
    
    calculateResult(answers) {
        const counts = {};
        
        answers.forEach(answer => {
            counts[answer] = (counts[answer] || 0) + 1;
        });
        
        // 각 카테고리별 최다 선택 찾기
        const categories = {
            environment: counts['S'] >= counts['I'] ? 'S' : 'I',
            scope: counts['D'] >= counts['W'] ? 'D' : 'W',
            action: counts['A'] >= counts['R'] ? 'A' : 'R',
            goal: counts['O'] >= counts['P'] ? 'O' : 'P'
        };
        
        // 결과 타입 조합
        return `${categories.environment}${categories.scope}${categories.action}${categories.goal}`;
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new QuestionManager();
});
