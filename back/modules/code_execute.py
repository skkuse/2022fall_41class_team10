import sys
from io import StringIO

# Create your views here.
class CodeExecute:
    def code_execute(code):
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