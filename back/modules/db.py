import sqlite3
import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = os.path.join(BASE_DIR, 'db.sqlite3')

class db:
    def get_class_list():
        con = sqlite3.connect(DB_PATH)
        cur = con.cursor()
        data=cur.execute('SELECT * FROM class ORDER BY class_id').fetchall()
        cur.close()
        con.close()
        return data

    def get_assignment_list(class_id):
        con = sqlite3.connect(DB_PATH)
        cur = con.cursor()
        data=cur.execute('SELECT assign_id, name FROM assignment WHERE class_id={0} ORDER BY assign_id'.format(class_id)).fetchall()
        cur.close()
        con.close()
        return data

    def get_assignment_info(class_id, assign_id):
        con = sqlite3.connect(DB_PATH)
        cur = con.cursor()
        data=cur.execute('SELECT content, restriction, due_date, skeleton_code, answer_code FROM assignment WHERE class_id={0} AND assign_id={1} ORDER BY assign_id'.format(class_id, assign_id)).fetchall()
        cur.close()
        con.close()
        return data

    def get_testcase_list(class_id, assign_id):
        con = sqlite3.connect(DB_PATH)
        cur = con.cursor()
        data=cur.execute('SELECT testcase_id, input, output, isHidden FROM testcase WHERE class_id={0} AND assign_id={1}'.format(class_id,assign_id)).fetchall()
        cur.close()
        con.close()
        return data

    def save_user_code(class_id, assign_id, code_id, content):
        con = sqlite3.connect(DB_PATH)
        cur = con.cursor()
        cur.execute('INSERT INTO code VALUES ({0},{1},{2},{3})'.format(class_id, assign_id, code_id, content))
        con.commit()
        cur.close()
        con.close()

    def get_user_code(class_id, assign_id, code_id):
        con = sqlite3.connect(DB_PATH)
        cur = con.cursor()
        data=cur.execute('SELECT content FROM code WHERE class_id={0} AND assign_id={1} AND code_id={2}'.format(class_id,assign_id,code_id)).fetchall()
        cur.close()
        con.close()
        return data

 