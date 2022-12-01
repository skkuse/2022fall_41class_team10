from copydetect import CopyDetector
import os
import shutil
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
    def findPlagiarismRate(classn,assignn, code):

        ##파일 저장된 부분이 통일된 후에 제거되야함
        ##
        ref_dir_name="class"+str(classn)+"assign"+str(assignn)+"_ref"
        boilerplate_dir_name = "class"+str(classn)+"assign"+str(assignn)+"_boilerplate"

        ref_dir_path = os.path.join(BASE_DIR, ref_dir_name)
        boilerplate_dir_path = os.path.join(BASE_DIR, boilerplate_dir_name)

        if not os.path.isdir(ref_dir_path):
            os.mkdir(ref_dir_path);
        if not os.path.isdir(boilerplate_dir_path):
            os.mkdir(boilerplate_dir_path);


        ##정답 코드와 스켈레톤 코드를 표절 검사에 추가/제외하기 위한 과정
        ##현재 불안하게 작동
        
        ##anwser_path = os.path.join(ref_dir_path, "anwser.py")
        ##skeleton_path = os.path.join(boilerplate_dir_path, "skeleton.py")
        
        ##assign_info=db.get_assignment_info(classn,assignn)


        ##if not os.path.isfile(anwser_path):
        ##    anwser_f=open(anwser_path,'w')
        ##    anwser_f.write(assign_info[4])
        ##    anwser_f.close()

        ##if not os.path.isfile(skeleton_path):
        ##    skeleton_f=open(skeleton_path,'w')
        ##    skeleton_f.write(assign_info[3])
        ##    skeleton_f.close()
        ##
        
        detector = CopyDetector(ref_dirs=[ref_dir_name], boilerplate_dirs=[boilerplate_dir_name], extensions=["py"],display_t=0.5)

        name=str(len(os.listdir(ref_dir_path)))+".py"
        f=open(name,'w')
        f.write(code)
        f.close()
        detector.add_file(name)
        detector.run()

        shutil.move(name,ref_dir_path)
        return detector.similarity_matrix[0][0][0]