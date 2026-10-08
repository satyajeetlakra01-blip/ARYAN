import os
import sys
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES_DIR = os.path.join(BASE_DIR, "public", "images")

MAX_DIMENSION = 1600
QUALITY = 85

def convert_image(src_path, dst_path, is_cutout=False):
    try:
        with Image.open(src_path) as im:
            # Preserve alpha for cutouts / PNGs
            if is_cutout or im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGBA")
            else:
                im = im.convert("RGB")

            # Resize if dimensions exceed MAX_DIMENSION while keeping aspect ratio
            w, h = im.size
            if max(w, h) > MAX_DIMENSION:
                scale = MAX_DIMENSION / max(w, h)
                new_w = int(w * scale)
                new_h = int(h * scale)
                im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)

            # Save as WebP
            im.save(dst_path, "WEBP", quality=QUALITY, method=6)
            old_size = os.path.getsize(src_path) / (1024 * 1024)
            new_size = os.path.getsize(dst_path) / 1024
            savings = (1 - (new_size * 1024 / os.path.getsize(src_path))) * 100
            print(f"[OK] Converted: {os.path.basename(src_path)} -> {os.path.basename(dst_path)}")
            print(f"     Size: {old_size:.2f} MB -> {new_size:.1f} KB ({savings:.1f}% savings)")
    except Exception as e:
        print(f"[ERROR] Failed {src_path}: {e}")

def main():
    print("=" * 60)
    print("Converting Aryan Tanty Portfolio images to high-speed WebP...")
    print("=" * 60)

    # 1. Main images in public/images
    for f in os.listdir(IMAGES_DIR):
        src_path = os.path.join(IMAGES_DIR, f)
        if os.path.isfile(src_path) and f.lower().endswith((".jpg", ".jpeg", ".png")) and not f.startswith("test"):
            name, _ = os.path.splitext(f)
            dst_path = os.path.join(IMAGES_DIR, f"{name}.webp")
            convert_image(src_path, dst_path)

    # 2. Optimized folder
    opt_dir = os.path.join(IMAGES_DIR, "optimized")
    if os.path.exists(opt_dir):
        for f in os.listdir(opt_dir):
            src_path = os.path.join(opt_dir, f)
            if os.path.isfile(src_path) and f.lower().endswith((".jpg", ".jpeg", ".png")):
                name, _ = os.path.splitext(f)
                dst_path = os.path.join(opt_dir, f"{name}.webp")
                convert_image(src_path, dst_path)

    # 3. Cutouts folder
    cutouts_dir = os.path.join(IMAGES_DIR, "cutouts")
    if os.path.exists(cutouts_dir):
        for f in os.listdir(cutouts_dir):
            src_path = os.path.join(cutouts_dir, f)
            if os.path.isfile(src_path) and f.lower().endswith((".png", ".jpg")):
                name, _ = os.path.splitext(f)
                dst_path = os.path.join(cutouts_dir, f"{name}.webp")
                convert_image(src_path, dst_path, is_cutout=True)

    print("=" * 60)
    print("All images successfully converted to WebP!")

if __name__ == "__main__":
    main()
