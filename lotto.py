import random

def generate_lotto_numbers():
    """로또 번호 6개를 생성하는 함수"""
    # 1부터 45까지의 숫자 중에서 중복 없이 6개를 랜덤하게 선택
    lotto_numbers = random.sample(range(1, 46), 6)
    # 오름차순으로 정렬
    lotto_numbers.sort()
    return lotto_numbers

def main():
    print("=== 로또 번호 생성기 ===")
    
    while True:
        try:
            # 사용자로부터 몇 개의 로또 번호 조합을 생성할지 입력받기
            count = int(input("몇 개의 로또 번호 조합을 생성하시겠습니까? (1-10): "))
            
            # 입력값 검증
            if count < 1 or count > 10:
                print("1부터 10 사이의 숫자를 입력해주세요.")
                continue
                
            print(f"\n{count}개의 로또 번호 조합을 생성합니다:")
            print("-" * 40)
            
            # 지정된 개수만큼 로또 번호 생성
            for i in range(count):
                numbers = generate_lotto_numbers()
                print(f"조합 {i+1:2d}: {numbers}")
            
            print("-" * 40)
            
            # 계속할지 묻기
            again = input("다시 생성하시겠습니까? (y/n): ").lower()
            if again != 'y':
                print("로또 번호 생성기를 종료합니다. 행운을 빕니다!")
                break
                
        except ValueError:
            print("올바른 숫자를 입력해주세요.")
        except KeyboardInterrupt:
            print("\n프로그램을 종료합니다.")
            break

if __name__ == "__main__":
    main() 