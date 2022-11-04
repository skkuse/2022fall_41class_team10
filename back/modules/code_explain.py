import os
import openai
from dotenv import load_dotenv

class Explain:
    def act(text):
        load_dotenv()
        openai.api_key = os.getenv("API_KEY")
        response = openai.Completion.create(
            model="code-davinci-002",
            prompt=text+ "\n\"\"\"\nThe code is doing the following:\n1:",
            temperature=0,
            max_tokens=64,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            stop=["\"\"\""]
        )
        result = "" + response
        return result
        

#From example of openai(openai.com)