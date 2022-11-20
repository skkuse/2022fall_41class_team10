from code_execute import CodeExecute
import unittest
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import sqlite3


code = "print(1)" # 코드 불러오기
#시도해 봤지만 어떻게 처리해야 하는지 정확한 방법을 
# 잘 몰라서 할 몰라서 간단한 코드 넣어 놓았습니다.

#어떤 결과를 가져올지 숫자 필요할 거 같습니다.
def connection():
    con = sqlite3.connect('../db.sqlite3')
    return con
def read_output(con):
    cursor_db = con.cursor()
    cursor_db.execute('SELECT output FROM testcase')
    raw_data = cursor_db.fetchall()
    output_num = 1 #정의 필요
    output = []
    for _ in raw_data:
        output.append(_[0])
    return output[output_num]
con = connection()
answer= read_output(con)


class ExecTest(unittest.TestCase):
    def test(self):
        result = CodeExecute.code_execute(code)
        self.assertEqual(result.strip(), answer)

if __name__ == "__main__":
    unittest.main()
