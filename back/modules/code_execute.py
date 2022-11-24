import sys
from io import StringIO
import sqlite3
import unittest
import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = os.path.join(BASE_DIR, 'db.sqlite3')

# Create your views here.
def connection():
    print(BASE_DIR)
    con = sqlite3.connect(DB_PATH)
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

    def code_execute(code):
        #code = "a = 2\nprint(b)" #일단 임의로 지정함
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
            sys.stderr = old_stderr
            result = redirected_output.getvalue()
        except:
            sys.stdout = old_stdout
            sys.stderr = old_stderr
            result = "Failed to execute command"
        
        return result

    def test(self):
        result = CodeExecute.code_execute(code1)
        if result == "Failed to execute command":
            with self.assertRaises(IOError):
                exec(code1)
        else:
            self.assertEqual(result.strip(), answer)

'''
def makeSuite(testcase, tests):
    return unittest.TestSuite(map(testcase, tests))
'''

if __name__ == "__main__":
    '''
    suite = makeSuite(CodeExecute,['test'])

    allsuites = unittest.TestSuite([suite])
    redirected_result = StringIO()
    unittest.TextTestRunner(verbosity = 2).run(allsuites)
    result = redirected_result.getvalue()
    '''
    path = "./save.txt"
    old_stderr = sys.stderr
    with open(path,'w') as sys.stderr:
        unittest.main()