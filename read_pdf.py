import PyPDF2

def read_pdf(file_path, output_path):
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for i, page in enumerate(reader.pages):
                text += f"\n--- Page {i + 1} ---\n"
                text += page.extract_text() + "\n"
        with open(output_path, 'w', encoding='utf-8') as out_file:
            out_file.write(text)
        print("Success")
    except Exception as e:
        print(f"Error reading PDF: {e}")

if __name__ == "__main__":
    pdf_path = r"C:\Users\chait\Desktop\Tiles_Showroom_Website_Documentation (1).pdf"
    out_path = r"C:\Users\chait\Desktop\MH Marbles\marble-vision\pdf_output.txt"
    read_pdf(pdf_path, out_path)
