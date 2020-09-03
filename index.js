const express = require('express');
const pdf = require('html-pdf');
const fs = require('fs');
const ejs = require('ejs');
const app = express();

app.get('/pdf-create', async (request, response)=> {

    const file_name = "meu_primeiro"
    const mensagem = "Documento de teste de PDF - Bruno Pinheiro Iglesias";

    ejs.renderFile("./modules/GeneratorPDF/pdf_templates/template.ejs", { mensagem: mensagem},async (err, html) => {
        if(err){
            console.log("um erro aconteceu ao renderizar o template");
            console.log(err);
        }
        else
        {
            await pdf.create(html, {}).toFile("./modules/GeneratorPDF/generated_files/"+file_name+".pdf", (err, res) => {
                if(err){
                    console.log("um erro aconteceu ao gerar o PDF");
                    console.log(err);
                }
                else
                {
                    console.log(res);
                    var data = fs.readFileSync("./modules/GeneratorPDF/generated_files/"+file_name+".pdf");
                    response.contentType("application/pdf");
                    response.send(data);
                }
            });
        }
    });
    
});

app.listen(3000);
