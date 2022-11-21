import sys
from io import StringIO
import sqlite3
import unittest

# Create your views here.
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

code1 = ""

class CodeExecute(unittest.TestCase):

    @unittest.skip("demonstrate skipping")
    def code_execute(code):
        global code1
        code1 = code
        old_stdout = sys.stdout
        redirected_output = sys.stdout = StringIO()

        old_stderr = sys.stderr
        codeErr = sys.stderr = StringIO()
        
        result = ""

        try:
            exec(code)
            sys.stdout = old_stdout
            result = redirected_output.getvalue()
        except:
            result = "Failed to execute command"
        
        return result

    def test(self):
        result = CodeExecute.code_execute(code1)
        self.assertEqual(result.strip(), answer)

if __name__ == "__main__":
    unittest.main()
