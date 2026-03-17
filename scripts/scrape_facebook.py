
import asyncio
from playwright.async_api import async_playwright
import json

def get_full_res_url(url):
    """Tries to convert a Facebook image URL to a higher resolution version."""
    if "scontent" in url:
        # Remove image processing parameters
        return url.split('?')[0]
    return url

async def main():
    url = "https://www.facebook.com/profile.php?id=61565667928376"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        try:
            await page.goto(url, wait_until="networkidle")
            
            # Scroll down to load more content
            for _ in range(5):
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                await asyncio.sleep(2)
            
            # Extract image URLs
            images = await page.eval_on_selector_all("img", "elements => elements.map(el => el.src)")
            
            high_res_images = [get_full_res_url(img) for img in images if "scontent" in img]
            
            # Extract post text
            # This is a more speculative selector. It might need further refinement.
            posts = await page.eval_on_selector_all('div[dir="auto"]', "elements => elements.map(el => el.innerText)")

            scraped_data = {
                "images": high_res_images,
                "posts": posts
            }
            
            with open("facebook_data.json", "w") as f:
                json.dump(scraped_data, f, indent=4)
                
            print("Scraping complete. Data saved to facebook_data.json")
            
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
