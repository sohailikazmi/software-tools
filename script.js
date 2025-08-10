// script.js
document.getElementById('generatePdf').addEventListener('click', async () => {
  const images = document.getElementById('imageInput').files;
  const animationLevel = document.getElementById('animationLevel').value;
  const borderWidth = document.getElementById('borderWidth').value;
  const borderColor = document.getElementById('borderColor').value;

  const preview = document.getElementById('preview');
  preview.innerHTML = '';

  const jsPDF = await import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js');
  const pdf = new jsPDF.jsPDF();

  Array.from(images).forEach((image, index) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(image);
    img.style.border = `${borderWidth}px solid ${borderColor}`;
    img.className = animationLevel;
    preview.appendChild(img);

    img.onload = () => {
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (img.naturalHeight / img.naturalWidth) * imgWidth;
      if (index > 0) pdf.addPage();
      pdf.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
    };
  });

  setTimeout(() => {
    pdf.save('animated.pdf');
  }, 2000); // Allow animations to complete
});
