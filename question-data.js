// 15개 질문 데이터 - 공제이 버전
const questionsData = [
    {
        id: 1,
        type: 'S/I',
        image: 'images/questions/q1-classroom.webp',
        gongjay: '드디어 첫 수업! 강의실에 도착했는데 아는 사람이 한 명도 없네. 넌 어떡할래?',
        choiceA: {
            text: '일단 맨 앞자리는 부담스럽고... 조용히 구석 자리에 앉아 폰을 본다.',
            value: 'I'
        },
        choiceB: {
            text: '용기 내서 "안녕하세요!" 먼저 말을 걸며 빈자리에 합석한다.',
            value: 'S'
        }
    },
    {
        id: 2,
        type: 'O/P',
        image: 'images/questions/q2-assignment.webp',
        gongjay: '교양 수업에서 "자유 주제" 리포트 과제가 나왔어. 어떤 주제를 고를래?',
        choiceA: {
            text: '무조건 A+ 받기 좋은 주제. 쉬우면서 그럴듯한 주제를 찾아본다.',
            value: 'O'
        },
        choiceB: {
            text: '성적은 몰라도... 평소 내가 진짜 궁금했던 거! 재밌게 탐구해 보고 싶다.',
            value: 'P'
        }
    },
    {
        id: 3,
        type: 'D/W',
        image: 'images/questions/q3-library.webp',
        gongjay: '도서관에서 책을 빌리려고 하는데... 뭘 고를까?',
        choiceA: {
            text: '내 전공 분야의 심화 서적이나 교수님이 추천하신 입문 도서!',
            value: 'D'
        },
        choiceB: {
            text: '평소 궁금했던 다른 분야 책! 심리학, 경제학, 역사, 에세이... 다양하게 읽고 싶어.',
            value: 'W'
        }
    },
    {
        id: 4,
        type: 'S/I',
        image: 'images/questions/q4-lunch.webp',
        gongjay: '수업이 끝나고 배가 고픈데... 복도에서 마주친 과 선배가 "신입생이구나? 밥 사줄게!"라고 하네?',
        choiceA: {
            text: '감사합니다! 밥 먹으면서 학교 꿀팁이나 동아리 정보를 물어봐야지.',
            value: 'S'
        },
        choiceB: {
            text: '아... 갑작스러운 약속은 부담스러운데. 정중히 거절하고 혼자 밥 먹으러 간다.',
            value: 'I'
        }
    },
    {
        id: 5,
        type: 'O/P',
        image: 'images/questions/q5-meeting.webp',
        gongjay: '드디어 개강총회! 처음으로 과 동기, 선배들과 술을 마시게 됐는데, 앞에 앉은 선배가 궁금한 거 있으면 뭐든지 물어보래. 넌 어떤 걸 물어볼래?',
        choiceA: {
            text: '이때다! "선배님, 족보 좀..." 꿀팁, 학점 정보, 스펙 쌓는법 같이 정보 위주로 물어본다.',
            value: 'O'
        },
        choiceB: {
            text: '선배의 대학 생활 썰, 연애 썰, 재밌었던 경험... "과정"이 궁금하다.',
            value: 'P'
        }
    },
    {
        id: 6,
        type: 'D/W',
        image: 'images/questions/q6-club.webp',
        gongjay: '학생회관 앞이 시끌벅적! 동아리 박람회구나. 넌 어디부터 가볼래?',
        choiceA: {
            text: '무조건 학술 동아리나 공모전 동아리! 내 전공에 도움 될만한 곳으로 들어갈래.',
            value: 'D'
        },
        choiceB: {
            text: '일단 재밌어 보이는 곳! 기타, 댄스, 봉사 동아리... 다양한 경험이 중요해!',
            value: 'W'
        }
    },
    {
        id: 7,
        type: 'S/I',
        image: 'images/questions/q7-study.webp',
        gongjay: '첫 중간고사 D-7! 공부 시작해야 하는데... 넌 어떤 스타일이야?',
        choiceA: {
            text: '무조건 도서관 1인석. 혼자 공부하는 게 좋아. 초집중 모드!',
            value: 'I'
        },
        choiceB: {
            text: '동기들 모아서 스터디 그룹 결성! 족보도 교환하고, 서로 질문도 하고.',
            value: 'S'
        }
    },
    {
        id: 8,
        type: 'O/P',
        image: 'images/questions/q8-festival.webp',
        gongjay: '드디어 봄 축제! 친구가 "같이 놀러 가자!"고 하는데, 마침 내일 전공 중간고사가 있어. 어떡할래?',
        choiceA: {
            text: '미안, 나 내일 시험이라... 오늘은 복습 좀 더 하고 일찍 자야겠어.',
            value: 'O'
        },
        choiceB: {
            text: '에이, 한 시간만! 분위기 전환도 되고 스트레스도 풀리면 공부가 더 잘될걸?',
            value: 'P'
        }
    },
    {
        id: 9,
        type: 'D/W',
        image: 'images/questions/q9-seminar.webp',
        gongjay: '학교 홈페이지에 "신입생 대상 비전공자 코딩 특강" 공지가 떴어.',
        choiceA: {
            text: '내 전공이랑은 별로 상관없네. 그 시간에 과 톡방에 올라온 전공관련 특강 들으러 갈래.',
            value: 'D'
        },
        choiceB: {
            text: '오! 비전공자도 들을 수 있어? 코딩을 할 줄 알면 나중에 도움 되겠지.',
            value: 'W'
        }
    },
    {
        id: 10,
        type: 'S/I',
        image: 'images/questions/q10-team.webp',
        gongjay: '악명 높은 조별과제... 교수님이 "자, 4인 1조!"를 외쳤어. 가위바위보에 이긴 너는 2개의 역할 중 뭘 할래?',
        choiceA: {
            text: '자료 조사는 제가 맡을게요. 제가 혼자서 깔끔하게 정리할 수 있어요!',
            value: 'I'
        },
        choiceB: {
            text: '제가 조장 할게요! 일정 조율하고, 의견 모으고, 정리하는 건 제가 잘해요!',
            value: 'S'
        }
    },
    {
        id: 11,
        type: 'S/I',
        image: 'images/questions/q11-meeting2.webp',
        gongjay: '조별과제 회의! 팀원들이 "우리 대면으로 만나서 회의할까? 아니면 단톡으로 할까?" 물어봐. 넌 어떤 게 편해?',
        choiceA: {
            text: '단톡이나 줌으로 하면 안 돼? 굳이 만나는 건 귀찮아...',
            value: 'I'
        },
        choiceB: {
            text: '당연히 만나야지! 얼굴 보면서 이야기하는 게 훨씬 효율적이야.',
            value: 'S'
        }
    },
    {
        id: 12,
        type: 'O/P',
        image: 'images/questions/q12-evaluation.webp',
        gongjay: '조별과제가 끝나고 "팀원 기여도 평가"를 제출해야 해. 솔직히 한 명이 거의 안 했는데... 어떻게 평가할래?',
        choiceA: {
            text: '정확하게 평가해야지. 안 한 사람은 낮은 점수 줘야 공평해. 우리 점수에도 영향 있어.',
            value: 'O'
        },
        choiceB: {
            text: '음... 그래도 같은 팀이었잖아. 다 비슷하게 점수 주는 게 낫지 않을까? 너무 박하면 그 친구 곤란해질 거야.',
            value: 'P'
        }
    },
    {
        id: 13,
        type: 'O/P',
        image: 'images/questions/q13-grade.webp',
        gongjay: '교수님께서 기말고사 성적을 공개하시면서, 틀린 문제가 궁금하면 수업 끝나고 찾아오라고 하신다.',
        choiceA: {
            text: '생각하던 점수보다 더 낮게 나왔네.. 뭐가 문제였지? 틀린 부분을 여쭤보러 간다.',
            value: 'O'
        },
        choiceB: {
            text: '내가 노력한 과정이 중요하지, 점수는 그저 결과일 뿐이야! 일찍 가서 쉬자.',
            value: 'P'
        }
    },
    {
        id: 14,
        type: 'D/W',
        image: 'images/questions/q14-certificate.webp',
        gongjay: '방학 동안 자격증을 하나 따려고 하는데... 뭘 딸까?',
        choiceA: {
            text: '내 전공과 직접 관련된 자격증! (예: 컴활, 리눅스마스터2급, 검색광고마케터 등)',
            value: 'D'
        },
        choiceB: {
            text: '전공 말고 실생활에 유용한 거! 포토샵, 한국사, 운전면허... 폭넓게 쌓아야지!',
            value: 'W'
        }
    },
    {
        id: 15,
        type: 'D/W',
        image: 'images/questions/q15-program.webp',
        gongjay: '학교 홈페이지에 두 가지 공지가 올라왔어! 둘 다 좋아 보이는데... 넌 어떤 걸 신청할래?',
        choiceA: {
            text: '"전공 관련 체험형 인턴십" – 교수님 연구실이나 관련 기업에서 실무 경험을 쌓을 수 있대!',
            value: 'D'
        },
        choiceB: {
            text: '"대학생 축제 기획단" – 지역 축제 기획, 마케팅, SNS 운영... 다양한 경험을 할 수 있어!',
            value: 'W'
        }
    }
];
