import os

class CodeDiff:
    def MakeDiffStr(class_id, assign_id, file_path):
        dir_path = "./data/class_%d/assign_%d" % (class_id, assign_id)
        aws_path = dir_path +"/anwser.py"
        command='git diff --no-index --output=diffstr.txt {0} {1}'.format(file_path, aws_path)
        os.system(command)
        output_file=open("diffstr.txt","r")
        output=output_file.read()
        output_file.close()
        os.remove('diffstr.txt')
        return(output)