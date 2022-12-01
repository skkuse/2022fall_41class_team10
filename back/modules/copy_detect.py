from copydetect import CopyDetector
import os
from modules.db import db
from pathlib import Path

"""
표절률을 계산하기 위한 함수

문제 번호로 문제를 식별하며
표절률을 계산하기 위해 제출된 코드과 스켈레톤 코드가 필요함

현재는 두 종류의 코드 모두 폴더에 저장되어 있다고 가정
폴더는 ref_{문제 번호}, boilerplate_{문제 번호}
추후에 변경 가능

"""
BASE_DIR = Path(__file__).resolve().parent.parent

class CopyDetect:
    def findPlagiarismRate(class_id,assign_id, file_path):

        
        dir_path = "./data/class_%d/assign_%d" % (class_id, assign_id)
        boil_path = dir_path+"/boil"

        if not os.path.isdir(boil_path):
            os.mkdir(boil_path)
        
        detector = CopyDetector(ref_dirs=[dir_path], boilerplate_dirs=[boil_path], extensions=["py"],display_t=0.5)
        detector.add_file(file_path)
        detector.run()

        return detector.similarity_matrix[0][0][0]