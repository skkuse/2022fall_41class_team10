import os
import openai

class explain:
    def __init__(self):
        self.response = ""

    def act1(self, file):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        #API 키 받아서 입력

        self.response = openai.Completion.create(
            model="code-davinci-002",
            prompts=file+ "\n \"\"\"\n The code is doing the following:\n",
            #앞의 file에 파이썬 코드 입력 필요
            #그리고 뒤의 부분과 합쳐야 코드가 돌아감
            temperature=0,
            max_tokens=64,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            stop=["\"\"\""]
        )
        print(self.response)
        

#From example of openai(openai.com)