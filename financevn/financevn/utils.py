import re

def convert_to_camel(string: str) -> str:
    # Remove the number and dot at the beginning
    string = re.sub(r'^\d+\.\s*', '', string)

    # Remove spaces and convert to lowercase
    string = re.sub(r'\s+', '', string).lower()

    # Convert to camel case
    string = re.sub(r'[^a-zA-Z0-9]', ' ', string).title().replace(' ', '')
    
    return string