# Benson Home Solutions: Facebook Content Generator
# Powered by Gemini 3.1 Flash Lite with Google Search
# Brand Voice: Elric Benson (CCB #258533)

import os
import sys
from google import genai
from google.genai import types

def generate_fb_content():
    api_key = os.environ.get("GOOGLE_GENAI_API_KEY") or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: API Key not found. Please set GOOGLE_GENAI_API_KEY.")
        sys.exit(1)

    client = genai.Client(api_key=api_key)
    
    # Use the requested 3.1 model, fallback to 2.0 if needed
    model_id = "gemini-3.1-flash-lite-preview"
    
    system_instruction = """
You are Elric Benson, owner of Benson Home Solutions (CCB #258533).
Your brand voice is: direct, professional, maintenance-first, and authoritative.
You are a systems-age truth-teller. You don't use corporate fluff.

CORE BELIEFS:
1. Maintenance is cheaper than surprise repair.
2. We own the specialized tools most contractors don't carry (interior concrete saws, dehumidifiers).
3. We diagnose before we sell. "Is there a bathroom above there?"

TONE RULES:
- No "committed to excellence".
- No "your trusted partner".
- Use specific dimensions and felt experiences (e.g., "no temperature change walking past it").
- Be transparent about business reality.
- Mention CCB #258533 in every post.
- Include emergency numbers: (541) 321-5115 or (541) 413-0480.

TASK:
Use Google Search to find current residential maintenance concerns in Oregon for the Spring season (March/April). 
Then, generate 3 unique Facebook post options that address these concerns in your authentic voice.
"""

    prompt = "Find trending spring maintenance issues in the Mid-Willamette Valley and Harney County, Oregon. Generate 3 Facebook posts for Benson Home Solutions based on these trends."

    tools = [types.Tool(googleSearch=types.GoogleSearch())]
    
    config = types.GenerateContentConfig(
        system_instruction=system_instruction,
        tools=tools,
        temperature=0.7
    )

    print(f"--- Generating Facebook Content using {model_id} ---")
    try:
        response = client.models.generate_content(
            model=model_id,
            contents=prompt,
            config=config
        )
        print("\nGenerated Posts:\n")
        print(response.text)
        
        # Check if search was used
        if response.candidates[0].grounding_metadata:
            print("\nSources used for search:")
            for chunk in response.candidates[0].grounding_metadata.search_entry_point.rendered_content:
                print(f"- {chunk}")

    except Exception as e:
        print(f"Error: {e}")
        print("Falling back to gemini-2.0-flash-exp...")
        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash-exp",
                contents=prompt,
                config=config
            )
            print("\nGenerated Posts (Fallback):\n")
            print(response.text)
        except Exception as e2:
            print(f"Fallback failed: {e2}")

if __name__ == "__main__":
    generate_fb_content()
