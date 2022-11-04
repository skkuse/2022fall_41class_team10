import os
import openai

class Explain:
    def act(text):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        #이거 key를 openai에서 받아와야 하는데 방법을 모르겠음.
        #API 키 받아서 입력

        response = openai.Completion.create(
            model="code-davinci-002",
            prompt=text+ "\n\"\"\"\nThe code is doing the following:\n",
            #앞의 file에 파이썬 코드 입력 필요
            #그리고 뒤의 부분과 합쳐야 코드가 돌아감
            temperature=0,
            max_tokens=64,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            stop=["\"\"\""]
        )
        return response
        

#From example of openai(openai.com)