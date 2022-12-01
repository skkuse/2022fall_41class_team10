import sys
from io import StringIO
import sqlite3
import unittest
import os
from pathlib import Path
import time

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
