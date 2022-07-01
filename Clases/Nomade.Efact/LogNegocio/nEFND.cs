using Nomade.Efact.LogDatos;
using Nomade.NB;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nomade.Efact.LogNegocio
{
	public class nEFND
	{
		private string sPath = ConfigurationManager.AppSettings["path_efact"];
		public void fnGetND(string p_CTLG_CODE, string p_ND_CODE)
		{
			try
			{
				cEFND ocEFND = new cEFND("Bn");
				DataTable oDT_Doc = ocEFND.fnListarDoc(p_CTLG_CODE, p_ND_CODE);

				if (oDT_Doc == null)
				{
					throw new ArgumentException("[Advertencia]: No se encontró el Documento en la Base de Datos");
				}

				DataRow oDR_Doc = oDT_Doc.NewRow();
				oDR_Doc = oDT_Doc.Rows[0];
				string sIndElect = oDR_Doc["FactElecInd"].ToString();
				string sSerieNro = oDR_Doc["NroSerieDoc"].ToString();

				if (!sSerieNro.Substring(0, 2).Equals("FD"))
				{
					throw new ArgumentException("[Advertencia]: La serie del documento no es válida para facturación electrónica.");
				}
				else if (sIndElect.Equals("P"))
				{
					throw new ArgumentException("[Advertencia]: El documento ya fue generado. El Documento se encuentra Pendiente de validación.");
				}
				//else if (sIndElect.Equals("X"))
				//{
				//	throw new ArgumentException("[Advertencia]: El documento ya fue generado. El Documento se encuentra tuvo errores de validación.");
				//}
				else if (sIndElect.Equals("S"))
				{
					throw new ArgumentException("[Advertencia]: El documento ya fue generado. El Documento fué validado correctamente.");
				}
				else if (sIndElect.Equals("B"))
				{
					throw new ArgumentException("[Advertencia]: El documento ya fue generado. El Documento fué comunicado para baja.");
				}


				string sMoneda = "";

				// Inicio - Datos del Documento
				DataTable oDT_DatosDoc = ocEFND.fnListarDatosDocumento(p_CTLG_CODE, p_ND_CODE);

				if (oDT_DatosDoc == null)
				{
					throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
				}

				DataRow oDR_DatosDoc = oDT_DatosDoc.NewRow();
				oDR_DatosDoc = oDT_DatosDoc.Rows[0];

				string s1A = oDR_DatosDoc["1A"].ToString(); // Fecha de Emisión
				string s1B = oDR_DatosDoc["1B"].ToString(); // Serie y Nro del Documento
				string s1C = oDR_DatosDoc["1C"].ToString(); // Tipo de Moneda (PEN, USD)
				sMoneda = (s1C.Equals("PEN") ? "SOLES" : "DOLARES");
				string s1D = oDR_DatosDoc["1D"].ToString(); // Monto Total IGV
				string s1E = oDR_DatosDoc["1E"].ToString(); // Monto Total IGV
				string s1F = oDR_DatosDoc["1F"].ToString(); // Tipo de Moneda IGV (PEN, USD)

				string s1G = ""; // Monto Total ISC
				string s1H = ""; // Monto Total ISC
				string s1I = oDR_DatosDoc["1I"].ToString(); ; // Tipo de Moneda ISC (PEN, USD)
				string s1J = ""; // Monto Total Otros Conceptos
				string s1K = ""; // Monto Total Otros Conceptos
				string s1L = ""; // Tipo de Moneda Otros Conceptos (PEN, USD)

				string s1M = oDR_DatosDoc["1M"].ToString(); // Monto Total de la Venta

				decimal nMontoDscto = Convert.ToDecimal(oDR_DatosDoc["1N"]);
				string s1N = "";
				if (nMontoDscto != 0)
					s1N = oDR_DatosDoc["1N"].ToString(); // Monto Total de Descuentos

				string s1O = ""; // Monto Total Otros Cargos

				decimal nMontoGrav = Convert.ToDecimal(oDR_DatosDoc["1P"]);
				string s1P = "";
				if (nMontoGrav != 0)
					s1P = oDR_DatosDoc["1P"].ToString(); // Monto Total Gravadas


				decimal nMontoInaf = Convert.ToDecimal(oDR_DatosDoc["1Q"]);
				string s1Q = "";
				if (nMontoInaf != 0)
					s1Q = oDR_DatosDoc["1Q"].ToString(); // Monto Total Inafectas

				decimal nMontoExon = Convert.ToDecimal(oDR_DatosDoc["1R"]);
				string s1R = "";
				if (nMontoExon != 0)
					s1R = oDR_DatosDoc["1R"].ToString(); // Monto Total Exoneradas

				decimal nMontoGrat = Convert.ToDecimal(oDR_DatosDoc["1S"]);
				string s1S = "";
				if (nMontoGrat != 0)
					s1S = oDR_DatosDoc["1S"].ToString(); // Monto Total Gratuitas

				string s1T = oDR_DatosDoc["1T"].ToString(); // Sub Total del Valor de la Venta

				decimal nBasePercep = Convert.ToDecimal(oDR_DatosDoc["1U"]);
				string s1U = "";
				if (nBasePercep != 0)
					s1U = oDR_DatosDoc["1U"].ToString(); // Base Imponible Percepción
				string s1V = "";
				if (nBasePercep != 0)
					s1V = oDR_DatosDoc["1V"].ToString(); // Monto Total de la Percepción
				string s1W = "";
				if (nBasePercep != 0)
					s1W = oDR_DatosDoc["1W"].ToString(); // Monto Total Cobrado de la Percepción

				decimal nMontoReten = Convert.ToDecimal(oDR_DatosDoc["1X"]);
				string s1X = "";
				if (nMontoReten != 0)
					s1X = oDR_DatosDoc["1X"].ToString(); // Monto Total de la Retención

				decimal nMontoDetrac = Convert.ToDecimal(oDR_DatosDoc["1Y"]);
				string s1Y = "";
				if (nMontoDetrac != 0)
					s1Y = oDR_DatosDoc["1Y"].ToString(); // Monto Total de la Detracción
				string s1Z = "";
				if (nMontoDetrac != 0)
					s1Z = oDR_DatosDoc["1Z"].ToString(); // Porcentaje de la Detracción
				string s1AA = "";
				if (nMontoDetrac != 0)
					s1AA = oDR_DatosDoc["1AA"].ToString(); // Nro del Banco de la Nación
				string s1AB = "";
				if (nMontoDetrac != 0)
					s1AB = oDR_DatosDoc["1AB"].ToString(); // Monto (Total de Venta - Monto Total de la Detracción)

				string s1AC = ""; // Monto Total de Bonificaciones              
				string s1AD = ""; // Monto Total de los Descuentos

				string sDatosDoc = s1A + "," + s1B + "," + s1C + "," + s1D + "," + s1E + "," + s1F + "," + s1G + "," +
					 s1H + "," + s1I + "," + s1J + "," + s1K + "," + s1L + "," + s1M + "," + s1N + "," + s1O + "," +
					 s1P + "," + s1Q + "," + s1R + "," + s1S + "," + s1T + "," + s1U + "," + s1V + "," + s1W + "," +
					 s1X + "," + s1Y + "," + s1Z + "," + s1AA + "," + s1AB + "," + s1AC + "," + s1AD;
				// Fin - Datos del Documento

				// Inicio - Guía de Remisión
				string s2A = "";
				string s2B = "";
				string s2C = "";
				string s2D = "";
				string s2E = "";

				string sGuiaRemision = s2A + "," + s2B + "," + s2C + "," + s2D + "," + s2E;
				// Fin - Guía de Remisión

				// Inicio - Datos de la Empresa
				DataTable oDT_DatosEmpresa = ocEFND.fnListarDatosEmpresa(p_CTLG_CODE);

				string s3A = "";
				string s3B = "";
				string s3C = "";
				string s3D = "";
				string s3E = "";
				string s3F = "";
				string s3G = "";

				string s3H = "";
				string s3I = "";
				string s3J = "";
				string s3K = "";
				string s3L = "";
				if (oDT_DatosEmpresa != null)
				{
					DataRow oDR_DatosEmpresa = oDT_DatosEmpresa.NewRow();
					oDR_DatosEmpresa = oDT_DatosEmpresa.Rows[0];

					s3A = oDR_DatosEmpresa["3A"].ToString(); // Razón Social de la Empresa
					s3A = fnCortarCadena(s3A, 100);

					s3B = oDR_DatosEmpresa["3B"].ToString(); // Nombre Comercial de la Empresa
					s3B = fnCortarCadena(s3B, 100);

					s3C = oDR_DatosEmpresa["3C"].ToString(); // Nro de RUC de la Empresa

					s3D = oDR_DatosEmpresa["3D"].ToString(); // Código Ubigeo de la Empresa

					s3E = oDR_DatosEmpresa["3E"].ToString(); // Dirección de la Empresa

					s3F = oDR_DatosEmpresa["3F"].ToString(); // Urbanización de la Empresa

					s3G = oDR_DatosEmpresa["3G"].ToString(); // Departamento de la Empresa

					s3H = oDR_DatosEmpresa["3H"].ToString(); // Provincia de la Empresa

					s3I = oDR_DatosEmpresa["3I"].ToString(); // Distrito de la Empresa

					s3J = oDR_DatosEmpresa["3J"].ToString(); // Código País de la Empresa

					s3K = oDR_DatosEmpresa["3K"].ToString(); // Usuario SOL de la Empresa

					s3L = oDR_DatosEmpresa["3L"].ToString(); // Clave SOL de la Empresa
				}
				string sDatosEmpresa = s3A + "," + s3B + "," + s3C + "," + s3D + "," + s3E + "," + s3F + "," + s3G + "," +
					s3H + "," + s3I + "," + s3J + "," + s3K + "," + s3L;
				// Fin - Datos de la Empresa

				// Inicio - Datos del Cliente
				DataTable oDT_DatosCliente = ocEFND.fnListarDatosCliente(p_CTLG_CODE, p_ND_CODE);

				string s4A = "";
				string s4B = "";
				string s4C = "";
				string s4D = "";
				string s4E = "";
				string s4F = "";
				string s4G = "";

				string s4H = "";
				string s4I = "";
				string s4J = "";
				string s4K = "";
				string s4L = "";
				if (oDT_DatosCliente != null)
				{
					DataRow oDR_DatosCliente = oDT_DatosCliente.NewRow();
					oDR_DatosCliente = oDT_DatosCliente.Rows[0];

					s4A = oDR_DatosCliente["4A"].ToString(); // Nro de RUC del Cliente
					s4A = fnCortarCadena(s4A, 15);

					s4B = oDR_DatosCliente["4B"].ToString(); // Tipo Documento del Cliente

					s4C = oDR_DatosCliente["4C"].ToString(); // Razón Social del Cliente

					s4D = oDR_DatosCliente["4D"].ToString(); // Nombre Comercial del Cliente

					s4E = oDR_DatosCliente["4E"].ToString(); // Código Ubigeo del Cliente

					s4F = oDR_DatosCliente["4F"].ToString(); // Dirección del Cliente

					s4G = ""; // Urbanización del Cliente

					s4H = oDR_DatosCliente["4H"].ToString(); // Departamento del Cliente

					s4I = oDR_DatosCliente["4I"].ToString(); // Provincia del Cliente

					s4J = oDR_DatosCliente["4J"].ToString(); // Distrito del Cliente

					s4K = oDR_DatosCliente["4K"].ToString(); // País del Cliente

					s4L = oDR_DatosCliente["4L"].ToString(); // Correo del Cliente
				}
				string sDatosCliente = s4A + "," + s4B + "," + s4C + "," + s4D + "," + s4E + "," + s4F + "," + s4G + "," +
					s4H + "," + s4I + "," + s4J + "," + s4K + "," + s4L;
				// Fin - Datos del Cliente

				// Inicio - Leyenda Sunat
				Numalet oNumalet = new Numalet(false, "00/100", "con", true);
				decimal nTotalVenta = Convert.ToDecimal(s1M);
				string sNumalet = oNumalet.ToCustomCardinal(nTotalVenta) + " " + sMoneda;
				sNumalet = sNumalet.ToUpper();

				string s5A = sNumalet; // Monto en Letras
				s5A = fnCortarCadena(s5A, 100);
				string s5B = "";
				string s5C = "";
				string s5D = "";
				string s5E = "";
				string s5F = "";
				string s5G = "";

				string s5H = "";
				string s5I = "";
				string s5J = "";
				string s5K = "";
				string s5L = "";
				string s5M = "";

				string s5N = "";
				string s5O = "";

				string s5P = "";
				string s5Q = "";
				string s5R = "";
				string s5S = "";
				string s5T = "";
				string s5U = "";

				string s5V = "";
				string s5W = "";
				string s5X = "";
				string s5Y = "";
				string s5Z = "";

				string s5AA = "";
				string s5AB = "";
				string s5AC = "";
				string s5AD = "";
				string s5AE = "";
				string s5AF = "";
				string s5AG = "";
				string s5AH = "";
				string s5AI = "";
				string s5AJ = "";
				string s5AK = "";

				string sLeyendaSunat = s5A + "," + s5B + "," + s5C + "," + s5D + "," + s5E + "," + s5F + "," + s5G + "," +
					 s5H + "," + s5I + "," + s5J + "," + s5K + "," + s5L + "," + s5M + "," + s5N + "," + s5O + "," +
					 s5P + "," + s5Q + "," + s5R + "," + s5S + "," + s5T + "," + s5U + "," + s5V + "," + s5W + "," +
					 s5X + "," + s5Y + "," + s5Z + "," + s5AA + "," + s5AB + "," + s5AC + "," + s5AD + "," + s5AE + "," +
					 s5AF + "," + s5AG + "," + s5AH + "," + s5AI + "," + s5AJ + "," + s5AK;
				// Fin - Leyenda Sunat

				// Inicio - Información Adicional
				string s6A = "";
				string s6B = "";
				string s6C = "";
				string s6D = "";
				string s6E = "";
				string s6F = "";
				string s6G = "";
				string s6H = "";
				string s6I = "";
				string s6J = "";
				string s6K = "";
				string s6L = "";
				string s6M = "";
				string s6N = "";
				string s6O = "";
				string s6P = "";
				string s6Q = "";
				string s6R = "";
				string s6S = "";
				string s6T = "";
				string s6U = "";
				string s6V = "";
				string s6W = "";
				string s6X = "";
				string s6Y = "";
				string s6Z = "";
				string s6AA = "";
				string s6AB = "";
				string s6AC = "";
				string s6AD = "";
				string s6AE = "";

				string sInfAdicional = s6A + "," + s6B + "," + s6C + "," + s6D + "," + s6E + "," + s6F + "," + s6G + "," +
					 s6H + "," + s6I + "," + s6J + "," + s6K + "," + s6L + "," + s6M + "," + s6N + "," + s6O + "," +
					 s6P + "," + s6Q + "," + s6R + "," + s6S + "," + s6T + "," + s6U + "," + s6V + "," + s6W + "," +
					 s6X + "," + s6Y + "," + s6Z + "," + s6AA + "," + s6AB + "," + s6AC + "," + s6AD + "," + s6AE;
				// Fin - Información Adicional

				// Inicio - Datos del Documento Referenciado
				DataTable oDT_DatosDocRef = ocEFND.fnListarDatosDocRef(p_CTLG_CODE, p_ND_CODE);

				string s7A = "";
				string s7B = "";
				string s7C = "";
				string s7D = "";
				string s7E = "";

				if (oDT_DatosDocRef != null)
				{
					DataRow oDR_DatosDocRef = oDT_DatosDocRef.NewRow();
					oDR_DatosDocRef = oDT_DatosDocRef.Rows[0];

					s7A = oDR_DatosDocRef["7A"].ToString(); // Serie y Nro del documento al que se hace referencia

					s7B = oDR_DatosDocRef["7B"].ToString(); // Código del Tipo de Documento Sunat al que se hace referencia

					s7C = oDR_DatosDocRef["7C"].ToString(); // Código del Tipo de Documento Sunat (Nota de Crédito: 7)
					s7C = s7C.PadLeft(2, '0');

					s7D = oDR_DatosDocRef["7D"].ToString(); // Glosa de la Nota de Crédito
					s7D = fnCortarCadena(s7D, 30);

					s7E = oDR_DatosDocRef["7E"].ToString(); // Separador
				}

				string sDatosDocRef = s7A + "," + s7B + "," + s7C + "," + s7D + "," + s7E;
				// Fin - Datos del Documento Referenciado

				// Inicio - Datos del Producto
				DataTable oDT_DatosProd = ocEFND.fnListarDatosProducto(p_CTLG_CODE, p_ND_CODE);

				if (oDT_DatosProd == null)
				{
					throw new ArgumentException("[Advertencia]: No se encontró el detalle de Productos del Documento");
				}

				bool bIndicador = false;

				string s8A = "";
				string s8B = "";
				string s8C = "";
				string s8D = "";
				string s8E = "";
				string s8F = "";
				string s8G = "";

				string s8H = "";
				string s8I = "";
				string s8J = "";
				string s8K = "";
				string s8L = "";
				string s8M = "";

				string s8N = "";
				string s8O = "";

				string s8P = "";
				string s8Q = "";
				string s8R = "";
				string s8S = "";
				string s8T = "";
				string s8U = "";

				string s8V = "";
				string s8W = "";
				string s8X = "";
				string s8Y = "";
				string s8Z = "";
				string s8AA = "";
				string s8AB = "";
				string s8AC = "";
				string s8AD = "";
				string s8AE = "";
				string s8AF = "";
				string s8AG = "";

				string sProductoDet = "";
				foreach (DataRow oDR in oDT_DatosProd.Rows)
				{
					if (bIndicador)
						sProductoDet += ((char)10);

					s8A = oDR["8A"].ToString(); // Número de Item

					s8B = oDR["8B"].ToString(); // Descripción de la Unidad
					s8B = fnCortarCadena(s8B, 100);

					s8C = oDR["8C"].ToString(); // Cantidad de Producto del Item

					s8D = oDR["8D"].ToString(); // Descripción del Producto
					s8D = fnCortarCadena(s8D, 250);

					s8E = oDR["8E"].ToString(); // Precio de Venta del Item

					s8F = oDR["8F"].ToString(); // Código Precio de Venta del Item

					s8G = ""; // Precio de Venta del Item (Referencial)
					s8H = ""; // Código Precio de Venta del Item (Referencial)

					s8I = oDR["8I"].ToString(); // Monto Total IGV del Item
					s8J = oDR["8J"].ToString(); // Monto Total IGV del Item
					s8K = oDR["8K"].ToString(); // Tipo de Afectación del IGV
					s8L = oDR["8L"].ToString(); // Tipo de Tributo
					s8M = oDR["8M"].ToString(); // Porcentaje del IGV

					s8N = ""; // oDR["8N"].ToString(); // Monto Total del ISC
					s8O = ""; // oDR["8O"].ToString(); // Monto Total del ISC
					s8P = ""; // oDR["8P"].ToString(); // Tipo de Cálculo del ISC
					s8Q = ""; // oDR["8Q"].ToString(); // Tipo Tributo ISC
					s8R = ""; // oDR["8R"].ToString(); // Precio Sugerido ISC
					s8S = oDR["8S"].ToString(); // Código Interno del Producto
					s8S = fnCortarCadena(s8S, 30);
					s8T = oDR["8T"].ToString(); // Costo de una unidad sin IGV
					s8U = oDR["8U"].ToString(); // Valor Venta del Item

					decimal nDescuento = Convert.ToDecimal(oDR["8V"]);
					s8V = (nDescuento == 0 ? "" : nDescuento.ToString()); // Descuento del Item
					s8W = oDR["8W"].ToString(); // Monto Total Item

					s8X = oDR["8X"].ToString(); // Valor Adicional
					s8Y = oDR["8Y"].ToString(); // Valor Adicional
					s8Z = oDR["8Z"].ToString(); // Valor Adicional
					s8AA = oDR["8AA"].ToString(); // Valor Adicional
					s8AB = oDR["8AB"].ToString(); // Valor Adicional
					s8AC = oDR["8AC"].ToString(); // Valor Adicional
					s8AD = oDR["8AD"].ToString(); // Valor Adicional
					s8AE = oDR["8AE"].ToString(); // Valor Adicional
					s8AF = oDR["8AF"].ToString(); // Valor Adicional
					s8AG = oDR["8AG"].ToString(); // Valor Adicional

					sProductoDet += s8A + "," + s8B + "," + s8C + "," + s8D + "," + s8E + "," + s8F + "," + s8G + "," +
						 s8H + "," + s8I + "," + s8J + "," + s8K + "," + s8L + "," + s8M + "," + s8N + "," + s8O + "," +
						 s8P + "," + s8Q + "," + s8R + "," + s8S + "," + s8T + "," + s8U + "," + s8V + "," + s8W + "," +
						 s8X + "," + s8Y + "," + s8Z + "," + s8AA + "," + s8AB + "," + s8AC + "," + s8AD + "," + s8AE + "," +
						 s8AF + "," + s8AG;

					bIndicador = true;
				}
				// Fin - Datos del Producto

				string sNombreArchivo = sPath + @"in\debitnote\" + "08" + s1B + ".csv";
				// verificar si existe archivo
				if (File.Exists(sNombreArchivo))
				{
					File.Delete(sNombreArchivo);
				}

				string sDelimitador = "FF00FF";

				string sInfoDoc = sDatosDoc + ((char)10) + sGuiaRemision + ((char)10) + sDatosEmpresa +
				   ((char)10) + sDatosCliente + ((char)10) + sLeyendaSunat + ((char)10) + sInfAdicional +
				   ((char)10) + sDatosDocRef + ((char)10) + sProductoDet + ((char)10) + sDelimitador;

				// Crear el archivo
				using (FileStream oFileStream = File.Create(sNombreArchivo))
				{
					// Add some text to file
					Byte[] abDatosDoc = new UTF8Encoding(true).GetBytes(sInfoDoc);
					oFileStream.Write(abDatosDoc, 0, abDatosDoc.Length);
				}

				string sRespuesta = ocEFND.fnActualizar_ELECT_IND_ND(p_CTLG_CODE, p_ND_CODE, "P");

			}
			catch (Exception ex)
			{
				throw (ex);
			}
		}

		// Retorna una cadena de tamaño máximo(hasta) definido por el usuario
		private string fnCortarCadena(string sCadena, int iTamMax)
		{
			try
			{
				string sResultado = sCadena;
				int iLongCadena = sCadena.Length;
				if (iLongCadena > iTamMax)
					sResultado = sCadena.Substring(0, iTamMax);
				return sResultado;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public string fnVerificarDoc(string p_CTLG_CODE, string p_ND_CODE)
		{
			string sRespuesta = "";
			try
			{
				cEFND ocEFND = new cEFND("Bn");

				DataTable oDT_Doc = ocEFND.fnListarDoc(p_CTLG_CODE, p_ND_CODE);

				if (oDT_Doc == null)
				{
					throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
				}

				DataRow oDR_DatosDoc = oDT_Doc.NewRow();
				oDR_DatosDoc = oDT_Doc.Rows[0];
				string sSerieNroDoc = oDR_DatosDoc["NroSerieDoc"].ToString(); // Serie y Nro del Documento


				string sNombreArchivo = sPath + @"out\debitnote\" + "08" + sSerieNroDoc + ".xml";
				if (File.Exists(sNombreArchivo))
				{
					string sRutaArchivo = sNombreArchivo;
					sRutaArchivo = sRutaArchivo.Replace(".xml", ".zip");
					bool bUpLoadOk = false;
					try
					{
						Nomade.Efact.Conexion.Conexion oConexion = new Nomade.Efact.Conexion.Conexion();
						oConexion.FnSubirArchivo(sRutaArchivo);
						bUpLoadOk = true;
					}
					catch (Exception)
					{

					}

					if (bUpLoadOk)
					{
						sRespuesta = ocEFND.fnActualizar_ELECT_IND_ND(p_CTLG_CODE, p_ND_CODE, "S");
                        sRespuesta = "OK";
                    }
					else
					{
						sRespuesta = ocEFND.fnActualizar_ELECT_IND_ND(p_CTLG_CODE, p_ND_CODE, "P");
					}
				}
				else
				{
					sNombreArchivo = sPath + @"in\debitnote\" + "08" + sSerieNroDoc + ".csv";
					if (File.Exists(sNombreArchivo))
					{
						sRespuesta = ocEFND.fnActualizar_ELECT_IND_ND(p_CTLG_CODE, p_ND_CODE, "P");
					}
					else
					{
						sNombreArchivo = sPath + @"err\debitnote\" + "08" + sSerieNroDoc + ".csv";
						if (File.Exists(sNombreArchivo))
						{
							sRespuesta = ocEFND.fnActualizar_ELECT_IND_ND(p_CTLG_CODE, p_ND_CODE, "X");
						}
						else
						{
							sRespuesta = "[Advertencia]: No se encontró el archivo generado";
						}
					}
				}
				return sRespuesta;

			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		
	}
}
