import os
import openai
from dotenv import load_dotenv

class Explain:
    def act(text):
        load_dotenv()
        openai.api_key = os.getenv("API_KEY")
        response = openai.Completion.create(
            model="code-davinci-002",
            prompt=text+ "\n\"\"\"\nHere's what the above class is doing:\n",
            temperature=0,
            max_tokens=64,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            stop=["\"\"\""]
        )
        return response["choices"][0]["text"]
        

#From example of openai(openai.com)