using Nomade.Efact.LogDatos;
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
    public class nEFBajaBoleta
    {
		private string sPath = ConfigurationManager.AppSettings["path_efact"];
        private string sPath_Orbitum = ConfigurationManager.AppSettings["path_fac_orbi"];

        public string fnGetBoleta(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                cEFBajaBoleta ocEFBajaBoleta = new cEFBajaBoleta("Bn");

                // Inicio - ID del Documento
                DataTable oDT_IdDoc = ocEFBajaBoleta.fnListarID(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_IdDoc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }

                DataRow oDR_IdDoc = oDT_IdDoc.NewRow();
                oDR_IdDoc = oDT_IdDoc.Rows[0];

                string s1A = oDR_IdDoc["1A"].ToString(); // Fecha de Baja
                string s1B = oDR_IdDoc["1B"].ToString(); // Fecha de Emisión del Documento
                string s1C = oDR_IdDoc["1C"].ToString(); // ID
				//s1C = p_VTAC_CODE;
                string sIdDoc = s1A + "," + s1B + "," + s1C;
                // Fin - ID del Documento
                                
                // Inicio - Datos de la Empresa
                DataTable oDT_DatosEmpresa = ocEFBajaBoleta.fnListarDatosEmpresa(p_CTLG_CODE);

                string s2A = "";
                string s2B = "";
                string s2C = "";
                string s2D = "";
                string s2E = "";
                string s2F = "";
                string s2G = "";

                string s2H = "";
                string s2I = "";
                string s2J = "";
                string s2K = "";
                string s2L = "";

                if (oDT_DatosEmpresa == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos de la Empresa");
                }
                
                DataRow oDR_DatosEmpresa = oDT_DatosEmpresa.NewRow();
                oDR_DatosEmpresa = oDT_DatosEmpresa.Rows[0];

                s2A = oDR_DatosEmpresa["2A"].ToString(); // Razón Social de la Empresa
                s2A = fnCortarCadena(s2A, 100);

                s2B = oDR_DatosEmpresa["2B"].ToString(); // Nombre Comercial de la Empresa
                s2B = fnCortarCadena(s2B, 100);

                s2C = oDR_DatosEmpresa["2C"].ToString(); // Nro de RUC de la Empresa

                s2D = ""; // Código Ubigeo de la Empresa

                s2E = oDR_DatosEmpresa["2E"].ToString();  // Dirección de la Empresa

                s2F = ""; // Urbanización de la Empresa

                s2G = ""; // Departamento de la Empresa

                s2H = ""; // Provincia de la Empresa

                s2I = ""; // Distrito de la Empresa

                s2J = oDR_DatosEmpresa["2J"].ToString();  // Código País de la Empresa

                s2K = oDR_DatosEmpresa["2K"].ToString(); // Usuario SOL de la Empresa

                s2L = oDR_DatosEmpresa["2L"].ToString(); // Clave SOL de la Empresa
                
                string sDatosEmpresa = s2A + "," + s2B + "," + s2C + "," + s2D + "," + s2E + "," + s2F + "," + s2G + "," +
                    s2H + "," + s2I + "," + s2J + "," + s2K + "," + s2L;
                // Fin - Datos de la Empresa

                // Inicio - Datos del Documento
                DataTable oDT_DatosDoc = ocEFBajaBoleta.fnListarDatosDoc(p_CTLG_CODE, p_VTAC_CODE);

                string s3A = "";
                string s3B = "";
                string s3C = "";
                string s3D = "";
                string s3E = "";

                if (oDT_DatosDoc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }
                
                DataRow oDR_DatosDoc = oDT_DatosDoc.NewRow();
                oDR_DatosDoc = oDT_DatosDoc.Rows[0];

                s3A = oDR_DatosDoc["3A"].ToString(); // Nro de Linea

                s3B = oDR_DatosDoc["3B"].ToString(); // Tipo Documento

                s3C = oDR_DatosDoc["3C"].ToString(); // Serie

                s3D = oDR_DatosDoc["3D"].ToString(); // Correlativo

                s3E = oDR_DatosDoc["3E"].ToString(); // Motivo
                
                string sDatosDoc = s3A + "," + s3B + "," + s3C + "," + s3D + "," + s3E;
				// Fin - Datos del Documento

				string sNombreArchivo = sPath + @"baja\boleta\" + "17" + p_VTAC_CODE + ".csv";
				//string sNombreArchivo = @"D:\Temp\" + s1C + ".csv";
                // verificar si existe archivo
                if (File.Exists(sNombreArchivo))
                {
                    File.Delete(sNombreArchivo);
                }

                string sInfoDocumento = sIdDoc + ((char)10) + sDatosEmpresa + ((char)10) + sDatosDoc;

                // Crear el archivo
                using (FileStream oFileStream = File.Create(sNombreArchivo))
                {
                    // Add some text to file
                    Byte[] abInfoDoc = new UTF8Encoding(true).GetBytes(sInfoDocumento);
                    oFileStream.Write(abInfoDoc, 0, abInfoDoc.Length);
                }

				var sRespuesta = "";
				sRespuesta = fnVerificarBajaDoc(p_CTLG_CODE, p_VTAC_CODE);

				return sNombreArchivo;

			}
            catch (Exception ex)
            {
                throw (ex);
            }
		}

        public string fnInsertarDocBaja(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                cEFBajaBoleta ocEFBajaBoleta = new cEFBajaBoleta("Bn");

                DataTable oDT_IdDoc = ocEFBajaBoleta.fnInsertarBaja(p_CTLG_CODE, p_VTAC_CODE);
                DataRow oDR_DatosDoc = oDT_IdDoc.NewRow();
                oDR_DatosDoc = oDT_IdDoc.Rows[0];

                string rpta = oDR_DatosDoc["RPTA"].ToString();


                return rpta;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public string fnGetBoletaOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                cEFBajaBoleta ocEFBajaBoleta = new cEFBajaBoleta("Bn");

                // Inicio - Datos del Documento
                // Inicio - Datos del Documento
                DataTable oDT_DatosDoc = ocEFBajaBoleta.fnListarDatosComBaja(p_CTLG_CODE, p_VTAC_CODE);

                string s3A = "";
                string s3B = "";
                string s3C = "";
                string s3D = "";
                string s3E = "";
                string s3F = "";
                string s3G = "";
                string s3H = "";
                string s3I = "";

                if (oDT_DatosDoc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }

                DataRow oDR_DatosDoc = oDT_DatosDoc.NewRow();
                oDR_DatosDoc = oDT_DatosDoc.Rows[0];

                s3A = oDR_DatosDoc["3A"].ToString(); // FECHA DE EMISION 

                s3B = oDR_DatosDoc["3B"].ToString(); // FECHA DE ENVIO SIN RAYITAS

                s3C = oDR_DatosDoc["3C"].ToString(); // FECHA DE ENVIO

                s3D = oDR_DatosDoc["3D"].ToString(); // TIPO DOCUMENTO

                s3E = oDR_DatosDoc["3E"].ToString(); // SERIE

                s3F = oDR_DatosDoc["3F"].ToString(); // DOC

                s3G = oDR_DatosDoc["3G"].ToString(); // Motivo

                s3H = oDR_DatosDoc["3H"].ToString(); // FECHA CORRELATIVO

                s3I = oDR_DatosDoc["3I"].ToString(); // RUC EMPRESA

                string sDatosDoc = s3A + "|" + s3C + "|" + s3D + "|" + s3E + "-" + s3F + "|" + s3G + "|";
                // Fin - Datos del Documento

                string sNombreArchivo = sPath_Orbitum + @"DATA\" + s3I + "-RA-" + s3B + "-" + s3H + ".cba";
                // verificar si existe archivo
                if (File.Exists(sNombreArchivo))
                {
                    File.Delete(sNombreArchivo);
                }

                string sInfoDocumento = sDatosDoc;

                // Crear el archivo
                using (FileStream oFileStream = File.Create(sNombreArchivo))
                {
                    // Add some text to file
                    Byte[] abInfoDoc = new UTF8Encoding(true).GetBytes(sInfoDocumento);
                    oFileStream.Write(abInfoDoc, 0, abInfoDoc.Length);
                }

                var sRespuesta = "";
                sRespuesta = fnVerificarBajaDocOrbitum(p_CTLG_CODE, p_VTAC_CODE);

                return sNombreArchivo;

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public string fnVerificarBajaDocOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            string sRespuesta = "";
            try
            {
                cEFBajaBoleta ocEFBajaBoleta = new cEFBajaBoleta("Bn");

                DataTable oDT_DatosDoc = ocEFBajaBoleta.fnListarDatosComBaja(p_CTLG_CODE, p_VTAC_CODE);

                string s3A = "";
                string s3B = "";
                string s3C = "";
                string s3D = "";
                string s3E = "";
                string s3F = "";
                string s3G = "";
                string s3H = "";
                string s3I = "";

                if (oDT_DatosDoc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }

                DataRow oDR_DatosDoc = oDT_DatosDoc.NewRow();
                oDR_DatosDoc = oDT_DatosDoc.Rows[0];

                s3A = oDR_DatosDoc["3A"].ToString(); // FECHA DE EMISION 

                s3B = oDR_DatosDoc["3B"].ToString(); // FECHA DE ENVIO SIN RAYITAS

                s3C = oDR_DatosDoc["3C"].ToString(); // FECHA DE ENVIO

                s3D = oDR_DatosDoc["3D"].ToString(); // TIPO DOCUMENTO

                s3E = oDR_DatosDoc["3E"].ToString(); // SERIE

                s3F = oDR_DatosDoc["3F"].ToString(); // DOC

                s3G = oDR_DatosDoc["3G"].ToString(); // Motivo

                s3H = oDR_DatosDoc["3H"].ToString(); // FECHA CORRELATIVO

                s3I = oDR_DatosDoc["3I"].ToString(); // RUC EMPRESA

                string sNombreArchivoEnvio = sPath_Orbitum + @"ENVIO\" + s3I + "-RA-" + s3B + "-" + s3H + ".zip";
                string sNombreArchivoResp = sPath_Orbitum + @"RPTA\R" + s3I + "-RA-" + s3B + "-" + s3H + ".zip";

                if (File.Exists(sNombreArchivoEnvio) && File.Exists(sNombreArchivoResp))
                {
                    sRespuesta = ocEFBajaBoleta.fnActualizar_ELECT_IND_VTA(p_CTLG_CODE, p_VTAC_CODE, "B");
                    if (sRespuesta == "S")
                    {
                        sRespuesta = "EXITO_SUNAT";
                    }
                    else
                    {
                        sRespuesta = "ERROR";
                    }

                }
                else if (!File.Exists(sNombreArchivoEnvio) && !File.Exists(sNombreArchivoResp))
                {
                    string sNombreCabecera = sPath_Orbitum + @"DATA\" + s3I + "-RA-" + s3B + "-" + s3H + ".cba";


                    if (File.Exists(sNombreCabecera))
                    {
                        sRespuesta = ocEFBajaBoleta.fnActualizar_ELECT_IND_VTA(p_CTLG_CODE, p_VTAC_CODE, "Q");
                        if (sRespuesta == "S")
                        {
                            sRespuesta = "PENDIENTE_SUNAT";
                        }
                        else
                        {
                            sRespuesta = "ERROR";
                        }
                    }
                    else
                    {
                        string sNombreArchivoArchivoTemp = sPath_Orbitum + @"TEMP\" + s3I + "-RA-" + s3B + "-" + s3H + ".xml";

                        if (File.Exists(sNombreArchivoArchivoTemp))
                        {
                            sRespuesta = ocEFBajaBoleta.fnActualizar_ELECT_IND_VTA(p_CTLG_CODE, p_VTAC_CODE, "X");
                            if (sRespuesta == "S")
                            {
                                sRespuesta = "ERROR_SUNAT";
                            }
                            else
                            {
                                sRespuesta = "ERROR";
                            }
                        }
                        else
                        {
                            sRespuesta = "[Advertencia]: No se encontró el archivo generado";
                        }

                    }
                }
                else if (File.Exists(sNombreArchivoEnvio) && !File.Exists(sNombreArchivoResp))
                {
                    sRespuesta = ocEFBajaBoleta.fnActualizar_ELECT_IND_VTA(p_CTLG_CODE, p_VTAC_CODE, "S");
                    if (sRespuesta == "S")
                    {
                        sRespuesta = "ENVIADO_SUNAT";
                    }
                    else
                    {
                        sRespuesta = "ERROR";
                    }
                }
                else
                {
                    sRespuesta = "PENDIENTE_SUNAT";
                }

                return sRespuesta;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    
        public string fnVerificarBajaDoc(string p_CTLG_CODE, string p_VTAC_CODE)
		{
			string sRespuesta = "";
			try
			{

                cEFBoleta ocEFBoleta = new cEFBoleta("Bn");
                DataTable oDT_Doc = ocEFBoleta.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

				if (oDT_Doc == null)
				{
					throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
				}

				string sNombreArchivo = sPath + @"baja\boleta\" + "17" + p_VTAC_CODE + ".csv";
				if (File.Exists(sNombreArchivo))
				{
					string sRutaArchivo = sNombreArchivo;
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

                    cEFFactura ocEFFactura = new cEFFactura("Bn");
                    if (bUpLoadOk)
					{
						sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "B");
                        sRespuesta = "OK";
                    }
					else
					{
						sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "Q");
					}
				}
				else
				{
					sRespuesta = "[Advertencia]: No se encontró el archivo generado";
				}
				return sRespuesta;
			}
			catch (Exception ex)
			{
				throw ex;
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
    }
}
