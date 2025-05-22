const PDFDocument = require("pdfkit");
const Proyecto = require("../models/proyecto.model");

const generarReporteProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find().populate("creador", "nombre apellido");

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=proyectos_reporte.pdf");

    doc.pipe(res);

    doc.fontSize(18).text("Reporte de Proyectos Escolares", { align: "center" });
    doc.moveDown();

    proyectos.forEach((p, i) => {
      doc.fontSize(12).text(`${i + 1}. Título: ${p.titulo}`);
      doc.text(`   Área: ${p.area}`);
      doc.text(`   Institución: ${p.institucion}`);
      doc.text(`   Estado: ${p.estado}`);
      doc.text(`   Docente Responsable: ${p.creador.nombre} ${p.creador.apellido}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error al generar reporte PDF", error });
  }
};

module.exports = { generarReporteProyectos };
