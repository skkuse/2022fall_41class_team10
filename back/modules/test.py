import os
import openai
from dotenv import load_dotenv
# Openai test용 코드입니다.


load_dotenv()
openai.api_key = os.getenv("API_KEY")
response = openai.Completion.create(
    model="code-davinci-002",
    prompt="class Log:\nimport os\na = 1\nb = 2\nprint(a + b)\n" + "\"\"\"\nHere's what the above class is doing:\n",
    temperature=0,
    max_tokens=64,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0,
    stop=["\"\"\""]
)
print(response["choices"][0]["text"])