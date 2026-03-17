
import json
import os
import subprocess

def download_images():
    with open("facebook_data.json", "r") as f:
        data = json.load(f)
    
    image_urls = data.get("images", [])
    
    output_dir = "public/images/from_facebook"
    os.makedirs(output_dir, exist_ok=True)
    
    for i, url in enumerate(image_urls):
        try:
            filename = f"image_{i}.jpg"
            filepath = os.path.join(output_dir, filename)
            subprocess.run(["curl", "-o", filepath, url], check=True)
            print(f"Downloaded {url} to {filepath}")
        except subprocess.CalledProcessError as e:
            print(f"Failed to download {url}: {e}")

if __name__ == "__main__":
    download_images()
