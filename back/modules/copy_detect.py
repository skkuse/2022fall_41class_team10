from copydetect import CopyDetector
import os
from modules.db import db
from pathlib import Path

"""
표절률을 계산하기 위한 함수

문제 번호로 문제를 식별하며
표절률을 계산하기 위해 제출된 코드과 스켈레톤 코드가 필요함
"""
BASE_DIR = Path(__file__).resolve().parent.parent

class CopyDetect:
    def prepareCopyDetect(class_id, assign_id):
        info=db.get_assignment_info(class_id,assign_id)

        dir_path = "./data/class_%d/assign_%d" % (class_id, assign_id)

        #prepare answer file
        answer_path = "%s/answer.py" % (dir_path)
        if not os.path.isfile(answer_path):
            anwser_f=open(answer_path,"w")
            anwser=info[0][4]
            anwser_f.write(anwser)
            anwser_f.close()
        
        #prepare boilerplate file
        skeleton_path=dir_path+"/skeleton.py"
        if not os.path.isfile(skeleton_path):
            boil_f=open(skeleton_path,"w")
            skeleton=info[0][3]
            boil_f.write(skeleton)
            boil_f.close()

    def findPlagiarismRate(class_id,assign_id, file_path):

        dir_path = "./data/class_%d/assign_%d" % (class_id, assign_id)
        skeleton_path=dir_path+"/skeleton.py"

        detector = CopyDetector(extensions=["py"],display_t=0.5)
        file_list = os.listdir(dir_path)
        for ref in file_list:
            ref_name=dir_path+"/"+ ref
            if ref_name==file_path:
                detector.add_file(ref_name,"test")
            elif ref_name==skeleton_path:
                detector.add_file(ref_name,"boilerplate")
            else:
                detector.add_file(ref_name,"ref")
        detector.run()

        return detector.similarity_matrix[0][0][0]