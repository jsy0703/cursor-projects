import schedule
import time
import datetime
import subprocess
import os
import sys
from pathlib import Path

class AutoScheduler:
    def __init__(self):
        self.tasks = []
        self.log_file = "scheduler_log.txt"
    
    def log_message(self, message):
        """로그 메시지를 파일에 기록"""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] {message}\n"
        
        with open(self.log_file, "a", encoding="utf-8") as f:
            f.write(log_entry)
        
        print(log_entry.strip())
    
    def run_lotto_generator(self):
        """로또 번호 생성기 실행"""
        try:
            self.log_message("로또 번호 생성기 실행 중...")
            result = subprocess.run([sys.executable, "lotto.py"], 
                                  capture_output=True, text=True, encoding="utf-8")
            
            if result.returncode == 0:
                self.log_message("로또 번호 생성 완료")
                self.log_message(f"생성된 번호: {result.stdout.strip()}")
            else:
                self.log_message(f"로또 번호 생성 실패: {result.stderr}")
                
        except Exception as e:
            self.log_message(f"로또 번호 생성 중 오류 발생: {str(e)}")
    
    def open_stopwatch(self):
        """스톱워치 웹 애플리케이션 열기"""
        try:
            self.log_message("스톱워치 애플리케이션 열기 중...")
            stopwatch_path = Path("stopwatch.html").absolute()
            
            # Windows에서 기본 브라우저로 열기
            os.startfile(str(stopwatch_path))
            self.log_message("스톱워치 애플리케이션이 브라우저에서 열렸습니다.")
            
        except Exception as e:
            self.log_message(f"스톱워치 열기 중 오류 발생: {str(e)}")
    
    def system_backup(self):
        """시스템 백업 작업 (예시)"""
        try:
            self.log_message("시스템 백업 작업 시작...")
            # 여기에 실제 백업 로직을 추가할 수 있습니다
            self.log_message("시스템 백업 작업 완료")
            
        except Exception as e:
            self.log_message(f"백업 작업 중 오류 발생: {str(e)}")
    
    def custom_task(self, task_name, task_function):
        """사용자 정의 작업 추가"""
        def wrapper():
            self.log_message(f"사용자 정의 작업 '{task_name}' 실행 중...")
            try:
                task_function()
                self.log_message(f"사용자 정의 작업 '{task_name}' 완료")
            except Exception as e:
                self.log_message(f"사용자 정의 작업 '{task_name}' 중 오류: {str(e)}")
        
        return wrapper
    
    def add_daily_task(self, time_str, task_func, task_name="작업"):
        """매일 특정 시간에 실행될 작업 추가"""
        schedule.every().day.at(time_str).do(task_func)
        self.log_message(f"매일 {time_str}에 실행될 '{task_name}' 작업이 스케줄에 추가되었습니다.")
    
    def add_weekly_task(self, day, time_str, task_func, task_name="작업"):
        """매주 특정 요일과 시간에 실행될 작업 추가"""
        getattr(schedule.every(), day).at(time_str).do(task_func)
        self.log_message(f"매주 {day} {time_str}에 실행될 '{task_name}' 작업이 스케줄에 추가되었습니다.")
    
    def add_interval_task(self, interval_minutes, task_func, task_name="작업"):
        """특정 간격으로 실행될 작업 추가"""
        schedule.every(interval_minutes).minutes.do(task_func)
        self.log_message(f"{interval_minutes}분마다 실행될 '{task_name}' 작업이 스케줄에 추가되었습니다.")
    
    def setup_default_schedule(self):
        """기본 스케줄 설정"""
        # 매일 오전 9시에 로또 번호 생성
        self.add_daily_task("09:00", self.run_lotto_generator, "로또 번호 생성")
        
        # 매일 오후 2시에 스톱워치 열기
        self.add_daily_task("14:00", self.open_stopwatch, "스톱워치 열기")
        
        # 매주 월요일 오전 8시에 시스템 백업
        self.add_weekly_task("monday", "08:00", self.system_backup, "시스템 백업")
        
        # 30분마다 상태 체크
        self.add_interval_task(30, self.status_check, "상태 체크")
    
    def status_check(self):
        """시스템 상태 체크"""
        self.log_message("시스템 상태 체크 중...")
        # 여기에 시스템 상태 확인 로직을 추가할 수 있습니다
        self.log_message("시스템 상태 정상")
    
    def run(self):
        """스케줄러 실행"""
        self.log_message("자동 스케줄러가 시작되었습니다.")
        self.log_message("Ctrl+C를 눌러서 종료할 수 있습니다.")
        
        try:
            while True:
                schedule.run_pending()
                time.sleep(1)
        except KeyboardInterrupt:
            self.log_message("사용자에 의해 스케줄러가 종료되었습니다.")
        except Exception as e:
            self.log_message(f"스케줄러 실행 중 오류 발생: {str(e)}")

def main():
    scheduler = AutoScheduler()
    
    # 기본 스케줄 설정
    scheduler.setup_default_schedule()
    
    # 사용자 정의 작업 예시
    def custom_example():
        print("사용자 정의 작업이 실행되었습니다!")
    
    scheduler.add_daily_task("12:00", scheduler.custom_task("점심 알림", custom_example), "점심 알림")
    
    # 스케줄러 실행
    scheduler.run()

if __name__ == "__main__":
    main() 