import sys
try:
    import PyPDF2
except ImportError:
    print("PyPDF2 not installed")
    sys.exit(1)

text = ""
with open(r"..\AVATAR 26 UPDATED EVENTS LIST (3) (2).pdf", "rb") as f:
    reader = PyPDF2.PdfReader(f)
    for page in reader.pages:
        text += page.extract_text() + "\n"

with open("events_extracted.txt", "w", encoding="utf-8", errors="ignore") as out:
    out.write(text)
