// 12개 질문 데이터
const questionsData = [
    {
        id: 1,
        type: '선호 환경',
        image: 'images/q1-team.jpg',
        title: '팀 프로젝트 과제가 주어졌을 때, 당신의 선택은?',
        choiceA: {
            text: '함께 모여서 아이디어를 나누고 협력하며 진행한다',
            value: 'S'
        },
        choiceB: {
            text: '각자 역할을 나눠 개인적으로 작업한 후 합친다',
            value: 'I'
        }
    },
    {
        id: 2,
        type: '관심 범위',
        image: 'images/q2-study.jpg',
        title: '방학 중 자기계발을 한다면?',
        choiceA: {
            text: '전공 관련 심화 강의나 자격증 공부에 집중한다',
            value: 'D'
        },
        choiceB: {
            text: '평소 관심있던 새로운 분야를 배워본다',
            value: 'W'
        }
    },
    {
        id: 3,
        type: '행동 방식',
        image: 'images/q3-event.jpg',
        title: '학교에서 새로운 공모전 소식을 접했을 때?',
        choiceA: {
            text: '바로 지원하고 준비 계획을 세운다',
            value: 'A'
        },
        choiceB: {
            text: '일정을 먼저 확인하고 여유가 있을 때 참여한다',
            value: 'R'
        }
    },
    {
        id: 4,
        type: '목표 지향',
        image: 'images/q4-goal.jpg',
        title: '동아리 활동을 선택할 때 가장 중요한 기준은?',
        choiceA: {
            text: '수상 실적이나 포트폴리오에 도움이 되는지',
            value: 'O'
        },
        choiceB: {
            text: '내가 배우고 성장할 수 있는 기회인지',
            value: 'P'
        }
    },
    {
        id: 5,
        type: '관심 범위',
        image: 'images/q5-seminar.jpg',
        title: '무료 특강이 두 개 있다면?',
        choiceA: {
            text: '전공 심화 내용을 다루는 특강을 선택한다',
            value: 'D'
        },
        choiceB: {
            text: '전공 외 실생활에 도움되는 특강을 선택한다',
            value: 'W'
        }
    },
    {
        id: 6,
        type: '선호 환경',
        image: 'images/q6-study-space.jpg',
        title: '시험 기간, 당신의 공부 스타일은?',
        choiceA: {
            text: '스터디 그룹에서 함께 공부하며 모르는 것을 물어본다',
            value: 'S'
        },
        choiceB: {
            text: '혼자 조용한 곳에서 집중해서 공부한다',
            value: 'I'
        }
    },
    {
        id: 7,
        type: '행동 방식',
        image: 'images/q7-challenge.jpg',
        title: '새로운 프로그램 신청 기회가 생겼을 때?',
        choiceA: {
            text: '일단 신청하고 어떻게든 해본다',
            value: 'A'
        },
        choiceB: {
            text: '일정과 내 상황을 충분히 고려한 후 결정한다',
            value: 'R'
        }
    },
    {
        id: 8,
        type: '목표 지향',
        image: 'images/q8-internship.jpg',
        title: '인턴십 프로그램을 선택할 때?',
        choiceA: {
            text: '취업에 유리하고 스펙이 되는 곳을 선택한다',
            value: 'O'
        },
        choiceB: {
            text: '실무 경험과 역량 개발에 집중하는 곳을 선택한다',
            value: 'P'
        }
    },
    {
        id: 9,
        type: '선호 환경',
        image: 'images/q9-networking.jpg',
        title: '학과 행사나 네트워킹 모임이 있을 때?',
        choiceA: {
            text: '적극적으로 참여해서 사람들과 교류한다',
            value: 'S'
        },
        choiceB: {
            text: '필요할 때만 참여하거나 소수와 깊게 이야기한다',
            value: 'I'
        }
    },
    {
        id: 10,
        type: '관심 범위',
        image: 'images/q10-learning.jpg',
        title: '온라인 강의를 들을 수 있는 기회가 생긴다면?',
        choiceA: {
            text: '전공 관련 고급 과정을 수강한다',
            value: 'D'
        },
        choiceB: {
            text: '언어, 디자인 등 다양한 분야를 경험해본다',
            value: 'W'
        }
    },
    {
        id: 11,
        type: '목표 지향',
        image: 'images/q11-competition.jpg',
        title: '교내 경진대회에 참가하는 이유는?',
        choiceA: {
            text: '수상을 통해 인정받고 싶어서',
            value: 'O'
        },
        choiceB: {
            text: '도전을 통해 내 능력을 키우고 싶어서',
            value: 'P'
        }
    },
    {
        id: 12,
        type: '행동 방식',
        image: 'images/q12-opportunity.jpg',
        title: '갑자기 좋은 기회가 생겼지만 일정이 빡빡할 때?',
        choiceA: {
            text: '일단 도전해본다. 기회는 다시 오지 않는다',
            value: 'A'
        },
        choiceB: {
            text: '현재 하고 있는 일들을 먼저 안정적으로 마무리한다',
            value: 'R'
        }
    }
];
