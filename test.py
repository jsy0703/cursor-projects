# 사용자로부터 몇 단까지 출력할지 입력받기
n = int(input("몇 단까지 출력하시겠습니까? (2 이상의 숫자를 입력하세요): "))

# 입력값 검증
if n < 2:
    print("2 이상의 숫자를 입력해주세요.")
else:
    for i in range(2, n + 1):
        for j in range(1, 10):
            print(f"{i} x {j} = {i*j}")
        print()
