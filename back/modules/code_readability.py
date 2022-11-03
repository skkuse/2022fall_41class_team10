import os

class Pylama:
    def act(text):
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
                mypy -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f1.write(to_write)
            elif(word_list[-1] == "[pylint]"):
                pylint -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f2.write(to_write)
            elif(word_list[-1] == "[eradicate]"):
                eradicate -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f3.write(to_write)
            elif(word_list[-1] == "[radon]"):
                radon -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f4.write(to_write)
            elif(word_list[-1] == "[pycodestyle]"):
                pycodestyle -= 1
                for i in word_list[2:-1]:
                    to_write += (i + " ")
                to_write += "\n"
                f5.write(to_write)

        if(mypy < 0):
            mypy = 0
        if(pylint < 0):
            pylint = 0
        if(eradicate < 0):
            eradicate = 0
        if(radon < 0):
            radon = 0
        if(pycodestyle < 0):
            pycodestyle = 0

        f.close()
        os.remove("save.txt")
        f1.close()
        f2.close()
        f3.close()
        f4.close()
        f5.close()
        '''
        return "mypy: {0}, pylint: {1}, eradicate: {2}, radon: {3}, pycodestyle: {4}".format(self.mypy, self.pylint, self.eradicate, self.radon, self.pycodestyle)
        '''
        total_score = mypy + pylint + eradicate + radon + pycodestyle
        return total_score
                
