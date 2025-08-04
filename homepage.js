// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 바 스크롤 효과
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // 스크롤 시 네비게이션 바 스타일 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 모바일 햄버거 메뉴 토글
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 모달 기능
    setupModals();

    // 로또 번호 생성기 초기화
    setupLottoGenerator();

    // 애니메이션 효과
    setupAnimations();
});

// 모달 설정
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // 모달 닫기
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // 모달 외부 클릭 시 닫기
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

// 로또 번호 생성기 설정
function setupLottoGenerator() {
    const lottoResult = document.getElementById('lottoResult');
    const lottoNumbers = lottoResult.querySelectorAll('.lotto-number');

    // 로또 번호 생성 함수
    window.generateLotto = function() {
        const numbers = [];
        
        // 1-45에서 6개 번호 무작위 선택
        while (numbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        
        // 번호 정렬
        numbers.sort((a, b) => a - b);
        
        // 번호 표시
        lottoNumbers.forEach((span, index) => {
            span.textContent = numbers[index];
            span.style.animation = 'none';
            span.offsetHeight; // 리플로우 트리거
            span.style.animation = 'numberPop 0.5s ease';
        });
        
        // 결과 표시
        lottoResult.style.display = 'block';
        
        // 3초 후 자동으로 숨기기
        setTimeout(() => {
            lottoResult.style.display = 'none';
        }, 5000);
    };
}

// 스케줄러 정보 표시
window.showSchedulerInfo = function() {
    const modal = document.getElementById('schedulerModal');
    modal.style.display = 'block';
};

// 프로젝트 상세 정보 표시
window.showProjectDetails = function(projectType) {
    const modal = document.getElementById('projectModal');
    const detailsContainer = document.getElementById('projectDetails');
    
    let content = '';
    
    switch(projectType) {
        case 'stopwatch':
            content = `
                <h2>스톱워치 애플리케이션</h2>
                <div class="project-detail-content">
                    <h3>주요 기능</h3>
                    <ul>
                        <li>밀리초 단위 정확한 시간 측정</li>
                        <li>랩 기능으로 중간 기록 저장</li>
                        <li>키보드 단축키 지원 (스페이스바, L, R)</li>
                        <li>반응형 디자인으로 모든 기기 지원</li>
                        <li>아름다운 그라데이션 UI</li>
                    </ul>
                    
                    <h3>사용법</h3>
                    <ul>
                        <li><strong>시작/정지</strong>: 스페이스바 또는 시작 버튼</li>
                        <li><strong>랩 기록</strong>: L 키 또는 랩 버튼 (실행 중일 때만)</li>
                        <li><strong>리셋</strong>: R 키 또는 리셋 버튼</li>
                    </ul>
                    
                    <h3>기술 스택</h3>
                    <p>HTML5, CSS3, JavaScript (ES6+)</p>
                    
                    <div class="project-links">
                        <a href="stopwatch.html" class="btn btn-primary" target="_blank">
                            <i class="fas fa-play"></i>
                            실행하기
                        </a>
                    </div>
                </div>
            `;
            break;
            
        case 'lotto':
            content = `
                <h2>로또 번호 생성기</h2>
                <div class="project-detail-content">
                    <h3>주요 기능</h3>
                    <ul>
                        <li>1-45 범위에서 6개 번호 무작위 생성</li>
                        <li>중복 번호 자동 방지</li>
                        <li>생성된 번호 자동 정렬</li>
                        <li>Python 기반 안정적인 알고리즘</li>
                    </ul>
                    
                    <h3>사용법</h3>
                    <p>터미널에서 다음 명령어를 실행하세요:</p>
                    <code>python lotto.py</code>
                    
                    <h3>출력 예시</h3>
                    <div class="code-example">
                        <p>생성된 로또 번호: [7, 12, 23, 31, 38, 44]</p>
                    </div>
                    
                    <h3>기술 스택</h3>
                    <p>Python 3.x</p>
                    
                    <div class="project-links">
                        <button class="btn btn-primary" onclick="generateLotto()">
                            <i class="fas fa-magic"></i>
                            번호 생성
                        </button>
                    </div>
                </div>
            `;
            break;
            
        case 'scheduler':
            content = `
                <h2>자동 스케줄러</h2>
                <div class="project-detail-content">
                    <h3>주요 기능</h3>
                    <ul>
                        <li>매일/매주/특정 간격으로 작업 자동 실행</li>
                        <li>로또 번호 자동 생성</li>
                        <li>스톱워치 자동 실행</li>
                        <li>시스템 백업 및 상태 체크</li>
                        <li>사용자 정의 작업 추가 가능</li>
                        <li>상세한 로그 기록</li>
                    </ul>
                    
                    <h3>기본 스케줄</h3>
                    <ul>
                        <li><strong>매일 09:00</strong> - 로또 번호 생성</li>
                        <li><strong>매일 12:00</strong> - 점심 알림</li>
                        <li><strong>매일 14:00</strong> - 스톱워치 열기</li>
                        <li><strong>매주 월요일 08:00</strong> - 시스템 백업</li>
                        <li><strong>30분마다</strong> - 시스템 상태 체크</li>
                    </ul>
                    
                    <h3>실행 방법</h3>
                    <div class="code-example">
                        <h4>1. 라이브러리 설치:</h4>
                        <code>pip install -r requirements.txt</code>
                        
                        <h4>2. 스케줄러 실행:</h4>
                        <code>python run_scheduler.py</code>
                    </div>
                    
                    <h3>기술 스택</h3>
                    <p>Python, schedule 라이브러리</p>
                    
                    <div class="project-links">
                        <button class="btn btn-primary" onclick="showSchedulerInfo()">
                            <i class="fas fa-cog"></i>
                            설정 보기
                        </button>
                    </div>
                </div>
            `;
            break;
    }
    
    detailsContainer.innerHTML = content;
    modal.style.display = 'block';
};

// 애니메이션 효과 설정
function setupAnimations() {
    // Intersection Observer로 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 페이지 로드 시 초기 애니메이션
window.addEventListener('load', function() {
    // 히어로 섹션 애니메이션
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateX(0)';
    }, 300);
    
    setTimeout(() => {
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateX(0)';
    }, 600);
});

// 추가 CSS 스타일 동적 적용
const additionalStyles = `
    .project-detail-content {
        line-height: 1.8;
    }
    
    .project-detail-content h3 {
        color: #1f2937;
        margin: 1.5rem 0 1rem 0;
        font-size: 1.2rem;
    }
    
    .project-detail-content ul {
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
    }
    
    .project-detail-content li {
        margin-bottom: 0.5rem;
        color: #6b7280;
    }
    
    .project-detail-content p {
        color: #6b7280;
        margin-bottom: 1rem;
    }
    
    .project-links {
        margin-top: 2rem;
        text-align: center;
    }
    
    .hero-content {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .hero-image {
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
`;

// 스타일 태그 생성 및 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 