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
            return "Timeout"

        if result.stderr:
            return result.stderr
        else:
            return str(result.stdout.strip() == unittest_output)