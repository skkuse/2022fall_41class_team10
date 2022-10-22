import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY") #API 키 받아서 입력

response = openai.Completion.create(
    model="code-davinci-002",
    prompts=""+ "\n \"\"\"\n The code is doing the following:\n",
    #앞의 ""에 파이썬 코드 입력 필요
    #그리고 뒤의 부분과 합쳐야 코드가 돌아감
    temperature=0,
    max_tokens=64,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0,
    stop=["\"\"\""]
)