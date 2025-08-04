# 스케줄 설정 파일
# 이 파일에서 원하는 시간과 작업을 설정할 수 있습니다

# 기본 스케줄 설정
DEFAULT_SCHEDULE = {
    # 매일 실행할 작업들
    "daily_tasks": [
        {
            "time": "09:00",
            "task": "lotto_generator",
            "description": "로또 번호 생성"
        },
        {
            "time": "14:00", 
            "task": "open_stopwatch",
            "description": "스톱워치 열기"
        },
        {
            "time": "12:00",
            "task": "lunch_reminder",
            "description": "점심 알림"
        }
    ],
    
    # 매주 실행할 작업들
    "weekly_tasks": [
        {
            "day": "monday",
            "time": "08:00",
            "task": "system_backup",
            "description": "시스템 백업"
        },
        {
            "day": "friday",
            "time": "17:00",
            "task": "weekend_reminder",
            "description": "주말 준비 알림"
        }
    ],
    
    # 특정 간격으로 실행할 작업들 (분 단위)
    "interval_tasks": [
        {
            "interval": 30,
            "task": "status_check",
            "description": "시스템 상태 체크"
        },
        {
            "interval": 60,
            "task": "memory_check",
            "description": "메모리 사용량 체크"
        }
    ]
}

# 사용자 정의 작업들
CUSTOM_TASKS = {
    "lunch_reminder": {
        "function": "print_lunch_reminder",
        "description": "점심 시간 알림"
    },
    "weekend_reminder": {
        "function": "print_weekend_reminder", 
        "description": "주말 준비 알림"
    },
    "memory_check": {
        "function": "check_memory_usage",
        "description": "메모리 사용량 확인"
    }
}

# 알림 설정
NOTIFICATION_SETTINGS = {
    "enable_sound": True,
    "enable_popup": True,
    "log_level": "INFO"  # DEBUG, INFO, WARNING, ERROR
}

# 작업 실행 설정
EXECUTION_SETTINGS = {
    "max_retry": 3,
    "retry_delay": 60,  # 초 단위
    "timeout": 300,     # 초 단위
    "parallel_execution": False
} 