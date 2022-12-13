import subprocess
import os

TIMEOUT = 10

class CodeScore:
    def check_imports(code):
        stopwords = ['itertools', 'import sys', "scipy", "numpy"]
        
        for word in stopwords:
            if word in code:
                return "Prohibited library Detected"

        return False

    def save2file(dir_path, file_path, code):
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)
        f = open(file_path, mode='w')
        f.write(code)
        f.close()

    def check_testcase(file_path, unittest_input, unittest_output):
        try:
            result = subprocess.run(
                ["python", file_path],
                capture_output=True,
                input=unittest_input,
                text=True,
                timeout=TIMEOUT,
            )
        except subprocess.TimeoutExpired:
            return [False,"Time out"]

        if result.stderr:
            return [False, "Error occur"]
        else:
            user_output=result.stdout.strip()
            return [user_output == unittest_output, "user output: {0}\n expected output: {1}".format(user_output, unittest_output)]