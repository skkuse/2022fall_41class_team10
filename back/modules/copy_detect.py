from copydetect import CopyDetector
import os

"""
표절률을 계산하기 위한 함수

문제 번호로 문제를 식별하며
표절률을 계산하기 위해 제출된 코드과 스켈레톤 코드가 필요함

*논의 필요*
현재는 두 종류의 코드 모두 폴더에 저장되어 있다고 가정
폴더는 ref_{문제 번호}, boilerplate_{문제 번호}
추후에 변경 가능

*논의 필요*
입력은 string 형태로 전달되기 때문에 py 파일로 작성해야 API 사용 가능
"""

class CopyDetect:
    def findPlagiarismRate(Qnumber, code):
        ref_dir_name="ref_"+str(Qnumber)
        boilerplate_dir_name = "boilerplate_"+str(Qnumber)
        detector = CopyDetector(ref_dirs=[ref_dir_name], boilerplate_dirs=[boilerplate_dir_name], extensions=["py"],display_t=0.5)
        f=open("test.py",'w')
        f.write(code)
        f.close()
        detector.add_file("test.py")
        detector.run()
        os.remove("test.py")
        return detector.similarity_matrix[0][0][0]
        