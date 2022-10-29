import os

class Pylama:
    def __init__(self):
        # 각각의 점수
        self.mypy = 20
        self.pylint = 20
        self.eradicate = 20
        self.radon = 20
        self.pycodestyle = 20
    
    def act(self, text):
        temp = open('./test.py', mode='w')
        temp.write(text)
        temp.close()
        os.system("pylama " +"./test.py" + " > save.txt")
        #file 자리에 해당 파이썬 코드의 파일이름 입력
        f = open('./save.txt', mode = 'r', encoding='utf-8')
        f1 = open('./mypy.txt', mode = 'w')
        f2 = open('./pylint.txt', mode = 'w')
        f3 = open('./eradicate.txt', mode = 'w')
        f4 = open('./radon.txt', mode = 'w')
        f5 = open('./pycodestyle.txt', mode = 'w')

        lines= f.readlines()
        for line in lines:
            to_write = ""
            word_list = line.split()
            if(word_list[-1] == "[mypy]"):
                self.mypy -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f1.write(to_write)
            elif(word_list[-1] == "[pylint]"):
                self.pylint -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f2.write(to_write)
            elif(word_list[-1] == "[eradicate]"):
                self.eradicate -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f3.write(to_write)
            elif(word_list[-1] == "[radon]"):
                self.radon -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f4.write(to_write)
            elif(word_list[-1] == "[pycodestyle]"):
                self.pycodestyle -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f5.write(to_write)

        if(self.mypy < 0):
            self.mypy = 0
        if(self.pylint < 0):
            self.pylint = 0
        if(self.eradicate < 0):
            self.eradicate = 0
        if(self.radon < 0):
            self.radon = 0
        if(self.pycodestyle < 0):
            self.pycodestyle = 0

        f.close()
        f1.close()
        f2.close()
        f3.close()
        f4.close()
        f5.close()
        return "mypy: {0}, pylint: {1}, eradicate: {2}, radon: {3}, pycodestyle: {4}".format(self.mypy, self.pylint, self.eradicate, self.radon, self.pycodestyle)
        '''
        total_score = mypy + pylint + eradicate + radon + pycodestyle
        print(total_score)
        '''
                
