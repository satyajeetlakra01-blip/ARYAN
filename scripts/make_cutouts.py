import os
import sys
from PIL import Image

def process_cutouts():
    try:
        from rembg import remove, new_session
        session = new_session("u2netp") # lighter/faster u2netp or default
    except Exception as e:
        print(f"Error loading rembg session: {e}")
        from rembg import remove
        session = None

    base_dir = r"c:\Users\SATYAJEET LAKRA\Documents\ARYAN"
    src_dir = os.path.join(base_dir, "public", "images", "optimized")
    out_dir = os.path.join(base_dir, "public", "images", "cutouts")
    os.makedirs(out_dir, exist_ok=True)

    targets = [
        ("aryan-hero.jpg", "aryan-hero-cutout.png"),
        ("aryan-portrait-standing.jpg", "aryan-portrait-standing-cutout.png"),
        ("aryan-sitting-rock-focused.jpg", "aryan-sitting-rock-cutout.png"),
        ("aryan-stream-log-poised.jpg", "aryan-stream-log-cutout.png"),
    ]

    for src_name, out_name in targets:
        src_path = os.path.join(src_dir, src_name)
        out_path = os.path.join(out_dir, out_name)
        if not os.path.exists(src_path):
            print(f"Source not found: {src_path}")
            continue
        print(f"Processing cutout: {src_name} -> {out_name}...")
        try:
            with Image.open(src_path) as img:
                # Resize if excessively large to keep fast
                img.thumbnail((1200, 1600), Image.Resampling.LANCZOS)
                if session:
                    output = remove(img, session=session)
                else:
                    output = remove(img)
                output.save(out_path, "PNG", optimize=True)
                print(f"Saved: {out_path} ({os.path.getsize(out_path)} bytes)")
        except Exception as e:
            print(f"Failed to process {src_name}: {e}")

if __name__ == "__main__":
    process_cutouts()
