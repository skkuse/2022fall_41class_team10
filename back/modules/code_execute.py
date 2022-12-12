import sys
from io import StringIO
import sqlite3
import unittest
import os
from pathlib import Path
import time
import subprocess
import json

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

    def save2file(dir_path, file_path, code):
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)
        f = open(file_path, mode='w')
        f.write(code)
        f.close()

    def code_execute(file_path):
        # RETURN : stdout, stderr
        try:
            result = subprocess.run(
                ["python", file_path],
                capture_output=True,
                text=True,
                timeout = 10,
            )
        except subprocess.TimeoutExpired:
            return None, "Timeout"

        if result.stderr:
            return None, result.stderr
        else:
            return result.stdout.strip(), None
