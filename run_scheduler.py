#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
자동 스케줄러 실행 스크립트
사용법: python run_scheduler.py
"""

import sys
import os
import subprocess

def check_dependencies():
    """필요한 라이브러리가 설치되어 있는지 확인"""
    try:
        import schedule
        print("✅ schedule 라이브러리가 설치되어 있습니다.")
        return True
    except ImportError:
        print("❌ schedule 라이브러리가 설치되어 있지 않습니다.")
        print("다음 명령어로 설치해주세요:")
        print("pip install -r requirements.txt")
        return False

def install_dependencies():
    """필요한 라이브러리 설치"""
    print("필요한 라이브러리를 설치합니다...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ 라이브러리 설치가 완료되었습니다.")
        return True
    except subprocess.CalledProcessError:
        print("❌ 라이브러리 설치에 실패했습니다.")
        return False

def main():
    print("=" * 50)
    print("🕐 자동 스케줄러 시작")
    print("=" * 50)
    
    # 의존성 확인
    if not check_dependencies():
        print("\n라이브러리를 설치하시겠습니까? (y/n): ", end="")
        choice = input().lower().strip()
        if choice == 'y':
            if not install_dependencies():
                print("라이브러리 설치에 실패했습니다. 프로그램을 종료합니다.")
                return
        else:
            print("라이브러리가 필요합니다. 프로그램을 종료합니다.")
            return
    
    # 스케줄러 실행
    try:
        from scheduler import main as run_scheduler
        print("\n🚀 스케줄러를 시작합니다...")
        print("📋 설정된 작업들:")
        print("  • 매일 09:00 - 로또 번호 생성")
        print("  • 매일 12:00 - 점심 알림")
        print("  • 매일 14:00 - 스톱워치 열기")
        print("  • 매주 월요일 08:00 - 시스템 백업")
        print("  • 30분마다 - 시스템 상태 체크")
        print("\n⏹️  종료하려면 Ctrl+C를 누르세요.")
        print("-" * 50)
        
        run_scheduler()
        
    except ImportError as e:
        print(f"❌ 스케줄러 모듈을 불러올 수 없습니다: {e}")
    except KeyboardInterrupt:
        print("\n\n👋 스케줄러가 종료되었습니다.")
    except Exception as e:
        print(f"\n❌ 오류가 발생했습니다: {e}")

if __name__ == "__main__":
    main() 