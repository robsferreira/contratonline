document.getElementById('contratoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura os valores dos inputs
    const proprietario = document.getElementById('proprietario').value;
    const cpfProprietario = document.getElementById('cpfProprietario').value;
    const rgProprietario = document.getElementById('rgProprietario').value;
    const inquilino = document.getElementById('inquilino').value;
    const cpfInquilino = document.getElementById('cpfInquilino').value;
    const rgInquilino = document.getElementById('rgInquilino').value;
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const valorAluguel = document.getElementById('valorAluguel').value;
    const prazoContrato = document.getElementById('prazoContrato').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const diaVencimento = document.getElementById('diaVencimento').value;

    // Formata a data de início
    const dataInicioFormatada = new Date(dataInicio).toLocaleDateString('pt-BR');

    // Insere os valores no contrato
    document.getElementById('nomeProprietario').textContent = proprietario;
    document.getElementById('cpfProprietarioContrato').textContent = cpfProprietario;
    document.getElementById('rgProprietarioContrato').textContent = rgProprietario;
    document.getElementById('nomeInquilino').textContent = inquilino;
    document.getElementById('cpfInquilinoContrato').textContent = cpfInquilino;
    document.getElementById('rgInquilinoContrato').textContent = rgInquilino;
    document.getElementById('enderecoImovel').textContent = endereco;
    document.getElementById('cidadeImovel').textContent = cidade;
    document.getElementById('valorAluguelContrato').textContent = valorAluguel;
    document.getElementById('prazoContratoTexto').textContent = prazoContrato;
    document.getElementById('dataInicioContrato').textContent = dataInicioFormatada;
    document.getElementById('diaVencimentoContrato').textContent = diaVencimento;
    document.getElementById('cidadeContrato').textContent = cidade;
    document.getElementById('dataContrato').textContent = new Date().toLocaleDateString('pt-BR');
    document.getElementById('assinaturaProprietario').textContent = proprietario;
    document.getElementById('assinaturaInquilino').textContent = inquilino;

    // Exibe o contrato gerado
    document.getElementById('contratoGerado').style.display = 'block';
});

// Função para gerar o PDF
document.getElementById('downloadPDF').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configurações do PDF
    const margin = 20; // Margem de 20px
    const lineHeight = 8; // Altura da linha
    const pageWidth = doc.internal.pageSize.width; // Largura da página
    const maxWidth = pageWidth - 2 * margin; // Largura máxima do texto
    let y = margin; // Posição vertical inicial

    // Função para adicionar texto com quebra de linha
    const addText = (text, fontSize = 12, isBold = false, align = 'left') => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        const splitText = doc.splitTextToSize(text, maxWidth); // Quebra o texto para caber na largura
        splitText.forEach((line) => {
            if (y + lineHeight > doc.internal.pageSize.height - margin) {
                doc.addPage(); // Adiciona uma nova página se o texto ultrapassar a margem inferior
                y = margin; // Reinicia a posição vertical
            }
            doc.text(line, margin, y, { align, maxWidth });
            y += lineHeight; // Avança para a próxima linha
        });
    };

    // Título do contrato (centralizado)
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const titulo = 'CONTRATO DE LOCAÇÃO RESIDENCIAL';
    const tituloWidth = doc.getTextWidth(titulo); // Largura do título
    const tituloX = (pageWidth - tituloWidth) / 2; // Centraliza o título
    doc.text(titulo, tituloX, y);
    y += lineHeight * 2; // Espaçamento extra após o título

    // Conteúdo do contrato
    const contratoContent = document.getElementById('contratoConteudo').innerText; // Captura apenas o conteúdo do contrato
    const paragraphs = contratoContent.split('\n');
    paragraphs.forEach((paragraph) => {
        if (paragraph.trim() !== '') {
            addText(paragraph);
        }
    });

    // Salva o PDF
    doc.save('contrato_aluguel.pdf');
});