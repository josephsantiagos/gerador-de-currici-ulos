function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const summary = document.getElementById('summary').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const photo = document.getElementById('photo').files[0];
    const borderColor = document.getElementById('borderColor').value;

    // Adicionar a borda
    doc.setDrawColor(borderColor);
    doc.setLineWidth(1); // Borda mais fina
    doc.rect(5, 5, 200, 287);

    // Adicionar fundo bonito
    const backgroundImg = new Image();
    backgroundImg.src = 'background-image.jpg'; // Imagem de fundo local

    backgroundImg.onload = function () {
        doc.addImage(backgroundImg, 'JPEG', 0, 0, 210, 297); // Ajuste a imagem para cobrir o PDF

        doc.setFontSize(22);
        doc.setTextColor(borderColor);
        doc.text(105, 20, 'Currículo Profissional', null, null, 'center');

        doc.setFontSize(12);
        doc.setTextColor('#000');

        const addText = () => {
            doc.text(20, 40, `Nome: ${name}`);
            doc.text(20, 50, `Email: ${email}`);
            doc.text(20, 60, `Telefone: ${phone}`);
            doc.text(20, 70, `Endereço: ${address}`);

            doc.text(20, 80, 'Objetivo:');
            doc.text(20, 90, summary.split('\n'));

            doc.text(20, 120, 'Experiência Profissional:');
            doc.text(20, 130, experience.split('\n'));

            doc.text(20, 160, 'Cursos/Faculdade/Especialização:');
            doc.text(20, 170, education.split('\n'));

            // Adicionar a linha e a assinatura no final da página
            doc.line(20, 260, 190, 260); // Linha horizontal
            doc.text(105, 270, 'Assinatura', null, null, 'center'); // Texto centralizado

            doc.save('curriculo.pdf');
        };

        if (photo) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imgData = event.target.result;
                doc.addImage(imgData, 'JPEG', 160, 40, 40, 40);
                addText();
            };
            reader.readAsDataURL(photo);
        } else {
            addText();
        }
    };
}
