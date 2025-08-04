class Stopwatch {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.laps = [];
        this.lapCount = 0;
        
        // DOM 요소들
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.millisecondsDisplay = document.getElementById('milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapsList = document.getElementById('lapsList');
        this.display = document.querySelector('.display');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.lap());
        
        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    if (this.isRunning) {
                        this.stop();
                    } else {
                        this.start();
                    }
                    break;
                case 'KeyL':
                    if (this.isRunning) {
                        this.lap();
                    }
                    break;
                case 'KeyR':
                    this.reset();
                    break;
            }
        });
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.updateDisplay();
            this.updateButtons();
            this.display.classList.add('running');
            
            // 10ms마다 업데이트
            this.interval = setInterval(() => {
                this.updateDisplay();
            }, 10);
        }
    }
    
    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            this.elapsedTime = Date.now() - this.startTime;
            clearInterval(this.interval);
            this.updateButtons();
            this.display.classList.remove('running');
        }
    }
    
    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.laps = [];
        this.lapCount = 0;
        this.updateDisplay();
        this.updateButtons();
        this.updateLapsList();
    }
    
    lap() {
        if (this.isRunning) {
            this.lapCount++;
            const currentTime = Date.now() - this.startTime;
            const lapTime = currentTime - this.elapsedTime;
            
            this.laps.push({
                number: this.lapCount,
                time: lapTime,
                totalTime: currentTime
            });
            
            this.updateLapsList();
        }
    }
    
    updateDisplay() {
        const currentTime = this.isRunning ? Date.now() - this.startTime : this.elapsedTime;
        
        const minutes = Math.floor(currentTime / 60000);
        const seconds = Math.floor((currentTime % 60000) / 1000);
        const milliseconds = Math.floor((currentTime % 1000) / 10);
        
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        this.millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
    }
    
    updateButtons() {
        this.startBtn.disabled = this.isRunning;
        this.stopBtn.disabled = !this.isRunning;
        this.resetBtn.disabled = this.isRunning && this.elapsedTime === 0;
        this.lapBtn.disabled = !this.isRunning;
    }
    
    updateLapsList() {
        this.lapsList.innerHTML = '';
        
        if (this.laps.length === 0) {
            this.lapsList.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">랩 기록이 없습니다</p>';
            return;
        }
        
        this.laps.forEach((lap, index) => {
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            
            const minutes = Math.floor(lap.time / 60000);
            const seconds = Math.floor((lap.time % 60000) / 1000);
            const milliseconds = Math.floor((lap.time % 1000) / 10);
            
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
            
            lapItem.innerHTML = `
                <span class="lap-number">랩 ${lap.number}</span>
                <span class="lap-time">${timeString}</span>
            `;
            
            this.lapsList.appendChild(lapItem);
        });
    }
    
    formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
    }
}

// 스톱워치 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
    
    // 사용법 안내
    console.log('스톱워치 사용법:');
    console.log('- 스페이스바: 시작/정지');
    console.log('- L 키: 랩 기록');
    console.log('- R 키: 리셋');
}); 