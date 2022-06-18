using Nomade.NB;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
//DPORTA 07/05/2022
namespace Nomade.Efact.LogNegocio
{
    //INICIO DEL OBEJETO
    public class EstructuraGuiaRemision
    {
        public CabeceraGuia cabecera { get; set; }
        public List<DetalleGuia> detalle { get; set; }

        public EstructuraGuiaRemision()
        {
        }
    }
    public class CabeceraGuia
    {
        public string fecEmision { get; set; }
        public string horEmision { get; set; }
        public string tipDocGuia { get; set; }
        public string serNumDocGuia { get; set; }
        public string numDocDestinatario { get; set; }
        public string tipDocDestinatario { get; set; }
        public string rznSocialDestinatario { get; set; }
        public string motTrasladoDatosEnvio { get; set; }
        public string desMotivoTrasladoDatosEnvio { get; set; }
        public string indTransbordoProgDatosEnvio { get; set; }
        public string psoBrutoTotalBienesDatosEnvio { get; set; }
        public string uniMedidaPesoBrutoDatosEnvio { get; set; }
        public string numBultosDatosEnvio { get; set; }
        public string modTrasladoDatosEnvio { get; set; }
        public string fecInicioTrasladoDatosEnvio { get; set; }
        public string numDocTransportista { get; set; }
        public string tipDocTransportista { get; set; }
        public string nomTransportista { get; set; }
        public string numPlacaTransPrivado { get; set; }
        public string numDocIdeConductorTransPrivado { get; set; }
        public string tipDocIdeConductorTransPrivado { get; set; }
        public string nomConductorTransPrivado { get; set; }
        public string ubiLlegada { get; set; }
        public string dirLlegada { get; set; }
        public string ubiPartida { get; set; }
        public string dirPartida { get; set; }
        public string ublVersionId { get; set; }
        public string customizationId { get; set; }

        public CabeceraGuia()
        {
        }

    }
    public class DetalleGuia
    {
        public string uniMedidaItem { get; set; }
        public string canItem { get; set; }
        public string desItem { get; set; }
        public string codItem { get; set; }

        public DetalleGuia()
        {
        }
    }
    //FIN DEL OBJETO 

    public class nEFGuiaRemision
    {
        //private string sPath = ConfigurationManager.AppSettings["path_efact"];
        //private string sPath_Orbitum = ConfigurationSettings.AppSettings["path_fac_orbi"];
        private string sPath_Orbitum1 = ConfigurationManager.AppSettings["path_fac_empresa_gr_1"];
        private string sPath_Orbitum2 = ConfigurationManager.AppSettings["path_fac_empresa_gr_2"];
        private string sPath_Orbitum3 = ConfigurationManager.AppSettings["path_fac_empresa_gr_3"];
        private string sPath_Orbitum4 = ConfigurationManager.AppSettings["path_fac_empresa_gr_4"];
        private string sPath_Orbitum5 = ConfigurationManager.AppSettings["path_fac_empresa_gr_5"];
        private string sPath_Orbitum = "";

        public nEFGuiaRemision()
        {
        }

        public void fnGetGuiaRemisionOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                if (p_CTLG_CODE == "N")
                {
                    sPath_Orbitum = sPath_Orbitum1;
                }
                else
                {
                    if (p_CTLG_CODE == "O")
                    {
                        sPath_Orbitum = sPath_Orbitum2;
                    }
                    else if (p_CTLG_CODE == "P")
                    {
                        sPath_Orbitum = sPath_Orbitum3;
                    }
                    else if (p_CTLG_CODE == "Q")
                    {
                        sPath_Orbitum = sPath_Orbitum4;
                    }
                    else
                    {
                        sPath_Orbitum = sPath_Orbitum5;
                    }
                }
                cEFGuiaRemision ocEFGuiaRemision = new cEFGuiaRemision("Bn");
                DataTable oDT_Doc = ocEFGuiaRemision.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_Doc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el Documento en la Base de Datos");
                }

                DataRow oDR_Doc = oDT_Doc.NewRow();
                oDR_Doc = oDT_Doc.Rows[0];
                string sIndElect = oDR_Doc["GuiaElecInd"].ToString();
                string sSerieNro = oDR_Doc["NroSerieDoc"].ToString();

                if (!sSerieNro.Substring(0, 2).Equals("TE"))
                {
                    throw new ArgumentException("[Advertencia]: La serie del documento no es válida para facturación electrónica.");
                }
                else if (sIndElect.Equals("P"))
                {
                    throw new ArgumentException("[Advertencia]: El documento ya fue generado. El Documento se encuentra Pendiente de validación.");
                }
                //else if (sIndElect.Equals("X"))
                //{
                //    throw new ArgumentException("[Advertencia]: El documento ya fue generado. El Documento se encuentra tuvo errores de validación.");
                //}
                else if (sIndElect.Equals("S"))
                {
                    throw new ArgumentException("[Advertencia]: El documento ya fue generado. El Documento fué validado correctamente.");
                }
                else if (sIndElect.Equals("B"))
                {
                    throw new ArgumentException("[Advertencia]: El documento ya fue generado. El Documento fué comunicado para baja.");
                }

                // Inicio - Datos de la Cabecera
                DataTable oDT_DatosDoc = ocEFGuiaRemision.fnListarDatosGuiaElectDocumentoOrbitum(p_CTLG_CODE, p_VTAC_CODE);

                DataRow oDR_DatosDoc = oDT_DatosDoc.Rows[0];

                if (oDT_DatosDoc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }

                string seriecorrelativo = oDR_DatosDoc["serNumDocGuia"].ToString(); // serie y correlativo de la guia
                string ruc = oDR_DatosDoc["RUC_EMPRESA"].ToString(); // ruc de la empresa

                string c1 = oDR_DatosDoc["fecEmision"].ToString();
                string c2 = oDR_DatosDoc["horEmision"].ToString();
                string c3 = oDR_DatosDoc["tipDocGuia"].ToString();
                string c4 = oDR_DatosDoc["serNumDocGuia"].ToString();
                string c5 = oDR_DatosDoc["numDocDestinatario"].ToString();
                string c6 = oDR_DatosDoc["tipDocDestinatario"].ToString();
                string c7 = oDR_DatosDoc["rznSocialDestinatario"].ToString();
                string c8 = oDR_DatosDoc["motTrasladoDatosEnvio"].ToString();
                string c9 = oDR_DatosDoc["desMotivoTrasladoDatosEnvio"].ToString();
                string c10 = oDR_DatosDoc["indTransbordoProgDatosEnvio"].ToString();
                string c11 = oDR_DatosDoc["psoBrutoTotalBienesDatosEnvio"].ToString();
                string c12 = oDR_DatosDoc["uniMedidaPesoBrutoDatosEnvio"].ToString();
                string c13 = oDR_DatosDoc["numBultosDatosEnvio"].ToString();
                string c14 = oDR_DatosDoc["modTrasladoDatosEnvio"].ToString();
                string c15 = oDR_DatosDoc["fecInicioTrasladoDatosEnvio"].ToString();
                string c16 = oDR_DatosDoc["numDocTransportista"].ToString();
                string c17 = oDR_DatosDoc["tipDocTransportista"].ToString();
                string c18 = oDR_DatosDoc["nomTransportista"].ToString();

                string c19 = oDR_DatosDoc["numPlacaTransPrivado"].ToString();
                string c20 = oDR_DatosDoc["numDocIdeConductorTransPrivado"].ToString();
                string c21 = oDR_DatosDoc["tipDocIdeConductorTransPrivado"].ToString();
                string c22 = oDR_DatosDoc["nomConductorTransPrivado"].ToString();
                string c23 = oDR_DatosDoc["ubiLlegada"].ToString();
                string c24 = oDR_DatosDoc["dirLlegada"].ToString();
                string c25 = oDR_DatosDoc["ubiPartida"].ToString();
                string c26 = oDR_DatosDoc["dirPartida"].ToString();
                string c27 = oDR_DatosDoc["ublVersionId"].ToString();
                string c28 = oDR_DatosDoc["customizationId"].ToString();
                //Fin - Datos de la Cabecera

                EstructuraGuiaRemision ObjetoGuiaRemision = new EstructuraGuiaRemision
                {
                    cabecera = new CabeceraGuia
                    {
                        fecEmision = c1,
                        horEmision = c2,
                        tipDocGuia = c3,
                        serNumDocGuia = c4,
                        numDocDestinatario = c5,
                        tipDocDestinatario = c6,
                        rznSocialDestinatario = c7,
                        motTrasladoDatosEnvio = c8,
                        desMotivoTrasladoDatosEnvio = c9,
                        indTransbordoProgDatosEnvio = c10,
                        psoBrutoTotalBienesDatosEnvio = c11,
                        uniMedidaPesoBrutoDatosEnvio = c12,
                        numBultosDatosEnvio = c13,
                        modTrasladoDatosEnvio = c14,
                        fecInicioTrasladoDatosEnvio = c15,
                        numDocTransportista = c16,
                        tipDocTransportista = c17,
                        nomTransportista = c18,
                        numPlacaTransPrivado = c19,
                        numDocIdeConductorTransPrivado = c20,
                        tipDocIdeConductorTransPrivado = c21,
                        nomConductorTransPrivado = c22,
                        ubiLlegada = c23,
                        dirLlegada = c24,
                        ubiPartida = c25,
                        dirPartida = c26,
                        ublVersionId = c27,
                        customizationId = c28,

                    },
                    detalle = new List<DetalleGuia>
                        {
                            new DetalleGuia
                            {
                            }
                        }
                };

                // Inicio - Datos del Detalle
                DataTable oDT_DatosDocDet = ocEFGuiaRemision.fnListarDatosGuiaElectDetOrbitum(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_DatosDocDet == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el detalle de Productos del Documento");
                }

                bool bIndicador = false;
                string sProductoDet = "";

                foreach (DataRow oDR in oDT_DatosDocDet.Rows)
                {
                    if (bIndicador) sProductoDet += ((char)10);

                    string d1 = oDR["uniMedidaItem"].ToString();
                    string d2 = oDR["canItem"].ToString();
                    string d3 = oDR["desItem"].ToString();
                    string d4 = oDR["codItem"].ToString();

                    sProductoDet += d1 + "," + d2 + "," + d3 + "," + d4;

                    bIndicador = true;
                }

                string[] strArrayOne = new string[] { "" };
                strArrayOne = sProductoDet.Split('\n');

                List<DetalleGuia> detalles = new List<DetalleGuia>();
                for (int i = 0; i < strArrayOne.Count(); i++)
                {
                    var cadena = strArrayOne[i];
                    var dj1 = cadena.Split(',')[0];
                    var dj2 = cadena.Split(',')[1];
                    var dj3 = cadena.Split(',')[2];
                    var dj4 = cadena.Split(',')[3];

                    detalles.Add(AgregarDetalle(dj1, dj2, dj3, dj4));

                    ObjetoGuiaRemision.detalle = detalles;
                }
                //Fin del Detalle 

                string sGuiaRemision = JsonConvert.SerializeObject(ObjetoGuiaRemision, Formatting.Indented);

                string sNombreArchivoJson = sPath_Orbitum + @"DATA\" + ruc + "-09-" + seriecorrelativo + ".json";

                if (File.Exists(sNombreArchivoJson))
                {
                    File.Delete(sNombreArchivoJson);
                }

                using (FileStream oFileStream = File.Create(sNombreArchivoJson))
                {
                    Byte[] abDatosDocDet = new UTF8Encoding(true).GetBytes(sGuiaRemision);
                    oFileStream.Write(abDatosDocDet, 0, abDatosDocDet.Length);
                }

                //DataTableToJSONWithStringBuilder(seriecorrelativo, ruc, oDT_DatosDoc, oDT_DatosDocDet);

                //DataTableToJSONWithJavaScriptSerializer(seriecorrelativo, ruc, oDT_DatosDoc);

                //DataTableToJSONWithJSONNet(seriecorrelativo, ruc, oDT_DatosDoc);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        private DetalleGuia AgregarDetalle(string uniMedidaItem, string canItem, string desItem, string codItem) //Funcion que agrega los detalles al objeto JSON
        {
            DetalleGuia detalles = new DetalleGuia();

            detalles.uniMedidaItem = uniMedidaItem;
            detalles.canItem = canItem;
            detalles.desItem = desItem;
            detalles.codItem = codItem;

            return detalles;
        }
        public string fnVerificarDocOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            string sRespuesta = "";
            try
            {
                if (p_CTLG_CODE == "N")
                {
                    sPath_Orbitum = sPath_Orbitum1;
                }
                else
                {
                    if (p_CTLG_CODE == "O")
                    {
                        sPath_Orbitum = sPath_Orbitum2;
                    }
                    else if (p_CTLG_CODE == "P")
                    {
                        sPath_Orbitum = sPath_Orbitum3;
                    }
                    else if (p_CTLG_CODE == "Q")
                    {
                        sPath_Orbitum = sPath_Orbitum4;
                    }
                    else
                    {
                        sPath_Orbitum = sPath_Orbitum5;
                    }
                }
                cEFGuiaRemision ocEFGuiaRemision = new cEFGuiaRemision("Bn");

                // Verificar Documento Venta
                DataTable oDT_Doc = ocEFGuiaRemision.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

                DataTable oDT_DatosEmpresa = ocEFGuiaRemision.fnListarDatosEmpresa(p_CTLG_CODE);

                if (oDT_Doc == null || oDT_DatosEmpresa == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }

                DataRow oDR_DatosDoc = oDT_Doc.Rows[0];
                string sSerieNroDoc = oDR_DatosDoc["NroSerieDoc"].ToString(); // Serie y Nro del Documento

                DataRow oDR_DatosEmpresa = oDT_DatosEmpresa.Rows[0];

                string sRUC = oDR_DatosEmpresa["4C"].ToString();

                string sNombreArchivo = sPath_Orbitum + @"FIRMA\" + sRUC + "-09-" + sSerieNroDoc + ".xml";
                string sNombreArchivoResp = sPath_Orbitum + @"RPTA\R" + sRUC + "-09-" + sSerieNroDoc + ".zip";
                string sNombreArchivoRechazado = sPath_Orbitum + @"REPO\" + sRUC + "-09-" + sSerieNroDoc + ".xml"; // De baja por sunat - DPORTA 

                if (File.Exists(sNombreArchivo) && File.Exists(sNombreArchivoResp))
                {
                    sRespuesta = ocEFGuiaRemision.fnActualizar_ELECT_IND_GUIA_REMI(p_CTLG_CODE, p_VTAC_CODE, "A");

                    if (sRespuesta == "S")
                    {
                        sRespuesta = "EXITO_SUNAT";
                    }
                    else
                    {
                        sRespuesta = "ERROR";
                    }
                }
                else if (File.Exists(sNombreArchivoRechazado)) // DPORTA
                {
                    sRespuesta = ocEFGuiaRemision.fnActualizar_ELECT_IND_GUIA_REMI(p_CTLG_CODE, p_VTAC_CODE, "B"); // De baja por sunat

                    if (sRespuesta == "S")
                    {
                        sRespuesta = "RECHAZADO_SUNAT";
                    }
                    else
                    {
                        sRespuesta = "ERROR";
                    }
                }
                else if (!File.Exists(sNombreArchivo) && !File.Exists(sNombreArchivoResp))
                {
                    sNombreArchivo = sPath_Orbitum + @"DATA\" + sRUC + "-09-" + sSerieNroDoc + ".json";

                    if (File.Exists(sNombreArchivo))
                    {
                        sRespuesta = ocEFGuiaRemision.fnActualizar_ELECT_IND_GUIA_REMI(p_CTLG_CODE, p_VTAC_CODE, "P");
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
                        string sNombreArchivoArchivoTemp = sPath_Orbitum + @"TEMP\" + sRUC + "-09-" + sSerieNroDoc + ".xml";

                        if (File.Exists(sNombreArchivoArchivoTemp))
                        {
                            sRespuesta = ocEFGuiaRemision.fnActualizar_ELECT_IND_GUIA_REMI(p_CTLG_CODE, p_VTAC_CODE, "X");
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
                else if (File.Exists(sNombreArchivo) && !File.Exists(sNombreArchivoResp))
                {
                    sRespuesta = ocEFGuiaRemision.fnActualizar_ELECT_IND_GUIA_REMI(p_CTLG_CODE, p_VTAC_CODE, "S");
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

        //public string DataTableToJSONWithStringBuilder(string seriecorrelativo , string ruc, DataTable oDT_DatosDoc, DataTable oDT_DatosDocDet)
        //{
        //    var JSONString = new StringBuilder();
        //    if (oDT_DatosDoc.Rows.Count > 0)
        //    {
        //        //JSONString.Append("[");
        //        for (int i = 0; i < oDT_DatosDoc.Rows.Count; i++)
        //        {
        //            //JSONString.Append("{");
        //            for (int j = 0; j < oDT_DatosDoc.Columns.Count; j++)
        //            {
        //                if (oDT_DatosDoc.Columns[j].ColumnName.ToString() != "RUC_EMPRESA")
        //                {
        //                    if (j < oDT_DatosDoc.Columns.Count - 1)
        //                    {
        //                        JSONString.Append("\"" + oDT_DatosDoc.Columns[j].ColumnName.ToString() + "\":" + "\"" + oDT_DatosDoc.Rows[i][j].ToString() + "\",");
        //                    }
        //                    else if (j == oDT_DatosDoc.Columns.Count - 1)
        //                    {
        //                        JSONString.Append("\"" + oDT_DatosDoc.Columns[j].ColumnName.ToString() + "\":" + "\"" + oDT_DatosDoc.Rows[i][j].ToString() + "\"");
        //                    }
        //                }

        //            }
        //            //if (i == oDT_DatosDoc.Rows.Count - 1)
        //            //{
        //            //    JSONString.Append("}");
        //            //}
        //            //else
        //            //{
        //            //    JSONString.Append("},");
        //            //}
        //        }
        //        //JSONString.Append("]");
        //    }

        //    string sNombreArchivoJson = sPath_Orbitum + @"DATA\" + ruc + "-09-" + seriecorrelativo + ".json";

        //    if (File.Exists(sNombreArchivoJson))
        //    {
        //        File.Delete(sNombreArchivoJson);
        //    }

        //    string sInfoDocDet = JsonConvert.SerializeObject(JSONString);


        //    using (FileStream oFileStream = File.Create(sNombreArchivoJson))
        //    {
        //        // Add some text to file
        //        Byte[] abDatosDocDet = new UTF8Encoding(true).GetBytes(sInfoDocDet);
        //        oFileStream.Write(abDatosDocDet, 0, abDatosDocDet.Length);
        //    }

        //    return JSONString.ToString();
        //}


        //public string DataTableToJSONWithJavaScriptSerializer(string seriecorrelativo, string ruc, DataTable table)
        //{
        //    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
        //    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
        //    Dictionary<string, object> childRow;
        //    foreach (DataRow row in table.Rows)
        //    {
        //        childRow = new Dictionary<string, object>();
        //        foreach (DataColumn col in table.Columns)
        //        {
        //            childRow.Add(col.ColumnName, row[col]);
        //        }
        //        parentRow.Add(childRow);
        //    }

        //    string sNombreArchivoJson = sPath_Orbitum + @"DATA\" + ruc + "-09-" + seriecorrelativo + ".json";

        //    if (File.Exists(sNombreArchivoJson))
        //    {
        //        File.Delete(sNombreArchivoJson);
        //    }

        //    string sInfoDocDet = jsSerializer.Serialize(parentRow);


        //    using (FileStream oFileStream = File.Create(sNombreArchivoJson))
        //    {
        //        // Add some text to file
        //        Byte[] abDatosDocDet = new UTF8Encoding(true).GetBytes(sInfoDocDet);
        //        oFileStream.Write(abDatosDocDet, 0, abDatosDocDet.Length);
        //    }

        //    return jsSerializer.Serialize(parentRow);
        //}


        //public string DataTableToJSONWithJSONNet(string seriecorrelativo, string ruc, DataTable table)
        //{

        //    string sNombreArchivoJson = sPath_Orbitum + @"DATA\" + ruc + "-09-" + seriecorrelativo + ".json";

        //    if (File.Exists(sNombreArchivoJson))
        //    {
        //        File.Delete(sNombreArchivoJson);
        //    }

        //    string JSONString = string.Empty;
        //    JSONString = JsonConvert.SerializeObject(table);
        //    string sInfoDocDet = JSONString;


        //    using (FileStream oFileStream = File.Create(sNombreArchivoJson))
        //    {
        //        // Add some text to file
        //        Byte[] abDatosDocDet = new UTF8Encoding(true).GetBytes(sInfoDocDet);
        //        oFileStream.Write(abDatosDocDet, 0, abDatosDocDet.Length);
        //    }

        //    return JSONString;
        //}        
    }
}
