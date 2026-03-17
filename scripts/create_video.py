
import os
import subprocess
import argparse

def create_video(image_folder, output_video, image_list_file):
    os.makedirs(os.path.dirname(output_video), exist_ok=True)
    
    images = [img for img in os.listdir(image_folder) if img.endswith(".jpg") or img.endswith(".png")]
    
    if not images:
        print(f"No images found in the {image_folder} directory.")
        return
        
    # Create a text file with the list of images
    with open(image_list_file, "w") as f:
        for image in images:
            f.write(f"file '{os.path.join(image_folder, image)}'\n")
            f.write("duration 3\n")
            
    # Use ffmpeg to create the video
    try:
        command = [
            "ffmpeg",
            "-y",
            "-f", "concat",
            "-safe", "0",
            "-i", image_list_file,
            "-vf", "zoompan=z='min(zoom+0.0015,1.5)':d=125,framerate=25,format=yuv420p",
            "-c:v", "libx264",
            "-t", str(len(images) * 3),
            output_video
        ]
        subprocess.run(command, check=True)
        print(f"Video created successfully: {output_video}")
    except subprocess.CalledProcessError as e:
        print(f"Error creating video: {e}")
    finally:
        os.remove(image_list_file)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a video from a folder of images.")
    parser.add_argument("image_folder", help="The folder containing the images.")
    parser.add_argument("output_video", help="The path to the output video file.")
    parser.add_argument("image_list_file", help="The path to the temporary image list file.")
    args = parser.parse_args()
    
    create_video(args.image_folder, args.output_video, args.image_list_file)
