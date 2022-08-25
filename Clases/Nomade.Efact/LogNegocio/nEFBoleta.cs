using Newtonsoft.Json;
using Nomade.Efact.Conexion;
using Nomade.Efact.LogDatos;
using Nomade.Efact.Models;
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
    public class nEFBoleta
    {
        private readonly string In_LocalPathEfact = ConfigurationManager.AppSettings["LocalPathEfact"] + @"in\boleta\";
        private readonly string Out_LocalPathEfact = ConfigurationManager.AppSettings["LocalPathEfact"] + @"out\boleta\";
        private readonly string Error_LocalPathEfact = ConfigurationManager.AppSettings["LocalPathEfact"] + @"err\boleta\";

        private string sPath = ConfigurationManager.AppSettings["path_efact"];
        private string sPath_Orbitum1 = ConfigurationManager.AppSettings["path_fac_empresa1"];
        private string sPath_Orbitum2 = ConfigurationManager.AppSettings["path_fac_empresa2"];
        private string sPath_Orbitum3 = ConfigurationManager.AppSettings["path_fac_empresa3"];
        private string sPath_Orbitum4 = ConfigurationManager.AppSettings["path_fac_empresa4"];
        private string sPath_Orbitum5 = ConfigurationManager.AppSettings["path_fac_empresa5"];
        private string sPath_Orbitum = "";

        private readonly string Delimitador = "FF00FF";
        private readonly string RucEmpresa = "";

        private const string EXTENSION_CSV = "csv";
        private const string EXTENSION_XML = "xml";
        private const string EXTENSION_JSON = "json";
        private const string POR_PROCESAR_IND = "N";
        private const string CSV_GENERADO_IND = "G";
        private const string CSV_ENVIADO_IND = "E";
        private const string PROCESADO_IND = "S";
        private const string CSV_CON_ERROR_IND = "X";
        private const string CODIGO_SUNAT_BOLETA = "03";

        public nEFBoleta() { }
        public nEFBoleta(string p_CTLG_CODE)
        {
            if (!Directory.Exists(In_LocalPathEfact)) Directory.CreateDirectory(In_LocalPathEfact);
            if (!Directory.Exists(Out_LocalPathEfact)) Directory.CreateDirectory(Out_LocalPathEfact);
            if (!Directory.Exists(Error_LocalPathEfact)) Directory.CreateDirectory(Error_LocalPathEfact);
            RucEmpresa = ObtenerRucEmpresa(p_CTLG_CODE);
        }

        private void FnGetBoleta(string p_CTLG_CODE, string p_VTAC_CODE)
                {
            try
                    {
                cEFBoleta ocEFBoleta = new cEFBoleta("Bn");
                DataTable oDT_Doc = ocEFBoleta.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_Doc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el Documento en la Base de Datos");
                }

                DataRow oDR_Doc = oDT_Doc.NewRow();
                oDR_Doc = oDT_Doc.Rows[0];
                string sIndElect = oDR_Doc["FactElecInd"].ToString();
                string sSerieNro = oDR_Doc["NroSerieDoc"].ToString();

                if (!sSerieNro.Substring(0, 1).Equals("B"))
                {
                    throw new ArgumentException("[Advertencia]: La serie del documento no es válida para facturación electrónica.");
                }
                else if (sIndElect.Equals(PROCESADO_IND))
                {
                    throw new ArgumentException("[Advertencia]: El documento ya fue procesado.");
                }
                //else if (sIndElect.Equals("B"))
                //{
                //    throw new ArgumentException("[Advertencia]: El documento ya fue generado. El Documento fué comunicado para baja.");
                //}

                string sMoneda = "";

                // Inicio: FILA 1 - DATOS DEL DOCUMENTO
                DataTable oDT_DatosDoc = ocEFBoleta.fnListarDatosDocumento(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_DatosDoc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }

                DataRow oDR_DatosDoc = oDT_DatosDoc.NewRow();
                oDR_DatosDoc = oDT_DatosDoc.Rows[0];

                string s1A = oDR_DatosDoc["1A"].ToString(); // Fecha de Emisión
                string s1B = oDR_DatosDoc["1B"].ToString(); // Serie y Nro del Documento
                string s1C = oDR_DatosDoc["1C"].ToString(); // Código Sunat del Tipo de Documento
                string s1D = oDR_DatosDoc["1D"].ToString(); // Tipo de Moneda (PEN, USD)
                sMoneda = (s1D.Equals("PEN") ? "SOLES" : "DOLARES");
                string s1E = oDR_DatosDoc["1E"].ToString(); // Sumatoria monto base IGV o IVAP
                string s1F = oDR_DatosDoc["1F"].ToString(); // Total IGV o IVAP
                string s1G = oDR_DatosDoc["1G"].ToString(); // Tipo de Moneda (PEN, USD)

                string s1H = ""; // Monto Total ISC
                string s1I = ""; // Monto Total ISC
                string s1J = ""; // Tipo de Moneda (PEN, USD)
                string s1K = ""; // Monto Total Otros Conceptos
                string s1L = ""; // Monto Total Otros Conceptos
                string s1M = ""; // Tipo de Moneda (PEN, USD)

                string s1N = oDR_DatosDoc["1N"].ToString(); // Monto Total de la Venta

                string s1O = ""; // Campo gris, en blanco
                string s1P = ""; // Campo gris, en blanco

                string s1Q = oDR_DatosDoc["1Q"].ToString(); // Tipo de Operación Sunat

                string s1R = ""; // Campo gris, en blanco

                string s1S = ""; // Sumatoria monto total ICBPER
                string s1T = ""; // Sumatoria de impuestos de operaciones gratuitas
                string s1U = ""; // Total operaciones Exportación

                decimal nMontoGrav = Convert.ToDecimal(oDR_DatosDoc["1V"]);
                string s1V = "";
                if (nMontoGrav != 0)
                    s1V = oDR_DatosDoc["1V"].ToString(); // Monto Total Gravadas

                decimal nMontoInaf = Convert.ToDecimal(oDR_DatosDoc["1W"]);
                string s1W = "";
                if (nMontoInaf != 0)
                    s1W = oDR_DatosDoc["1W"].ToString(); // Monto Total Inafectas

                decimal nMontoExon = Convert.ToDecimal(oDR_DatosDoc["1X"]);
                string s1X = "";
                if (nMontoExon != 0)
                    s1X = oDR_DatosDoc["1X"].ToString(); // Monto Total Exoneradas

                decimal nMontoGrat = Convert.ToDecimal(oDR_DatosDoc["1Y"]);
                string s1Y = "";
                if (nMontoGrat != 0)
                    s1Y = oDR_DatosDoc["1Y"].ToString(); // Monto Total Gratuitas

                string s1Z = ""; // Campo gris, en blanco

                decimal nBasePercep = Convert.ToDecimal(oDR_DatosDoc["1AA"]);
                string s1AA = "";
                if (nBasePercep != 0)
                    s1AA = nBasePercep.ToString(); // Base Imponible Percepción
                string s1AB = "";
                if (nBasePercep != 0)
                    s1AB = oDR_DatosDoc["1AB"].ToString(); // Monto Total de la Percepción
                string s1AC = "";
                if (nBasePercep != 0)
                    s1AC = oDR_DatosDoc["1AC"].ToString(); // Monto Total Cobrado de la Percepción

                decimal nMontoDetrac = Convert.ToDecimal(oDR_DatosDoc["1AE"]);

                string s1AD = "";
                if (nMontoDetrac != 0)
                    s1AD = oDR_DatosDoc["1AD"].ToString(); // Código de bien o servicio de la detracción

                string s1AE = "";
                if (nMontoDetrac != 0)
                    s1AE = oDR_DatosDoc["1AE"].ToString(); // Monto Total de la Detracción
                string s1AF = "";
                if (nMontoDetrac != 0)
                    s1AF = oDR_DatosDoc["1AF"].ToString(); // Porcentaje de la Detracción
                string s1AG = "";
                if (nMontoDetrac != 0)
                    s1AG = oDR_DatosDoc["1AG"].ToString(); // Nro del Banco de la Nación Detracción
                string s1AH = "";
                if (nMontoDetrac != 0)
                    s1AH = oDR_DatosDoc["1AH"].ToString(); // Monto (Total de Venta - Monto Total de la Detracción)

                string s1AI = ""; // Campo gris, en blanco
                string s1AJ = ""; // Campo gris, en blanco
                string s1AK = ""; // Campo gris, en blanco

                string s1AL = oDR_DatosDoc["1AL"].ToString(); // Cantidad de Líneas del documento
                string s1AM = ""; // Código del régimen de la percepción
                string s1AN = ""; // Cantidad guías, otros documentos y pago único o cuotas relacionadas
                string s1AO = ""; // Cantidad de anticipos asociados
                string s1AP = ""; // Total anticipos
                string s1AQ = ""; // Cantidad de punto de partida y llegada
                string s1AR = ""; // Monto descuento global AB
                string s1AS = ""; // Monto descuento global no AB
                string s1AT = ""; // Monto anticipo gravado IGV o IVAP
                string s1AU = ""; // Monto anticipo exonerado
                string s1AV = ""; // Monto anticipo inafecto
                string s1AW = ""; // Monto base FISE
                string s1AX = ""; // Monto total FISE
                string s1AY = ""; // Recargo al consumo y/o propinas
                string s1AZ = ""; // Monto cargo global AB
                string s1BA = ""; // Monto cargo global no AB
                string s1BB = oDR_DatosDoc["1BB"].ToString(); // Monto total de impuestos
                string s1BC = oDR_DatosDoc["1BC"].ToString(); // Total Valor de Venta
                string s1BD = oDR_DatosDoc["1BD"].ToString(); // Total precio de venta
                string s1BE = ""; // Total descuentos no AB
                string s1BF = ""; // Total cargos no AB
                string s1BG = ""; // Monto para Redondeo del Importe Total
                string s1BH = ""; // Total descuentos AB

                string fila1_DatosDoc = s1A + "," + s1B + "," + s1C + "," + s1D + "," + s1E + "," + s1F + "," + s1G + "," +
                     s1H + "," + s1I + "," + s1J + "," + s1K + "," + s1L + "," + s1M + "," + s1N + "," + s1O + "," +
                     s1P + "," + s1Q + "," + s1R + "," + s1S + "," + s1T + "," + s1U + "," + s1V + "," + s1W + "," +
                     s1X + "," + s1Y + "," + s1Z + "," + s1AA + "," + s1AB + "," + s1AC + "," + s1AD + "," + s1AE + "," +
                    s1AF + "," + s1AG + "," + s1AH + "," + s1AI + "," + s1AJ + "," + s1AK + "," + s1AL + "," + s1AM + "," +
                    s1AN + "," + s1AO + "," + s1AP + "," + s1AQ + "," + s1AR + "," + s1AS + "," + s1AT + "," + s1AU + "," +
                    s1AV + "," + s1AW + "," + s1AX + "," + s1AY + "," + s1AZ + "," + s1BA + "," + s1BB + "," + s1BC + "," +
                    s1BD + "," + s1BE + "," + s1BF + "," + s1BG + "," + s1BH;
                // Fin: FILA 1 - DATOS DEL DOCUMENTO

                // Inicio: FILA 2 - SUSTENTO DE TRASLADO DE MERCADERÍA (Dato exclusivo para la Factura Guía Remitente)
                DataTable oDT_PuntoPartida = ocEFBoleta.fnListarPuntoPartida(p_CTLG_CODE, p_VTAC_CODE);

                string s2A = "";
                string s2B = "";
                string s2C = "";
                string s2D = "";
                string s2E = "";
                string s2F = "";
                string s2G = "";
                if (oDT_PuntoPartida != null)
                {
                    DataRow oDR_PtoPartida = oDT_PuntoPartida.NewRow();
                    oDR_PtoPartida = oDT_PuntoPartida.Rows[0];

                    s2A = oDR_PtoPartida["2A"].ToString(); // Código de Ubigeo del Punto de Llegada
                    s2A = fnCortarCadena(s2A, 6);

                    s2B = oDR_PtoPartida["2B"].ToString(); // Dirección Completa del Punto de Llegada
                    s2B = fnCortarCadena(s2B, 100);

                    s2C = oDR_PtoPartida["2C"].ToString(); // Urbanización del Punto de Llegada
                    s2C = fnCortarCadena(s2C, 30);

                    s2D = oDR_PtoPartida["2D"].ToString(); // Provincia del Punto de Llegada
                    s2D = fnCortarCadena(s2D, 30);

                    s2E = oDR_PtoPartida["2E"].ToString(); // Departamento del Punto de Llegada
                    s2E = fnCortarCadena(s2E, 30);

                    s2F = oDR_PtoPartida["2F"].ToString(); // Distrito del Punto de Llegada
                    s2F = fnCortarCadena(s2F, 30);

                    s2G = oDR_PtoPartida["2G"].ToString(); // Código de País del Punto de Llegada
                }
                string fila2_SustentoTrasladoMercaderia = s2A + "," + s2B + "," + s2C + "," + s2D + "," + s2E + "," + s2F + "," + s2G;
                // Fin: FILA 2 - SUSTENTO DE TRASLADO DE MERCADERÍA (Dato exclusivo para la Factura Guía Remitente)

                // Inicio: FILA 3 - INFORMACIÓN ANTICIPOS ASOCIADOS
                string s3A = "";
                string s3B = "";
                string s3C = "";
                string s3D = "";
                string s3E = "";
                string s3F = "";
                string fila3_InformacionAnticipos = s3A + "," + s3B + "," + s3C + "," + s3D + "," + s3E + "," + s3F;
                // Fin: FILA 3 - INFORMACIÓN ANTICIPOS ASOCIADOS

                // Inicio: FILA 4 - INFORMACION GUIAS, OTROS DOCUMENTOS Y PAGO ÚNICO O CUOTAS RELACIONADOS
                DataTable oDT_GuiaRemision = ocEFBoleta.fnListarGuiaRemision(p_CTLG_CODE, p_VTAC_CODE);

                string s4A = "";
                string s4B = "";
                string s4C = "";
                string s4D = "";
                string s4E = "";
                if (oDT_GuiaRemision != null)
                {
                    DataRow oDR_GuiaRemision = oDT_GuiaRemision.NewRow();
                    oDR_GuiaRemision = oDT_GuiaRemision.Rows[0];

                    s4A = oDR_GuiaRemision["4A"].ToString(); // Número de la Guía de Remisión

                    s4B = oDR_GuiaRemision["4B"].ToString(); // Código Sunat del Tipo Documento (Guía de Remisión)

                    s4C = oDR_GuiaRemision["4C"].ToString(); // Número de Documento de Referencia

                    s4D = oDR_GuiaRemision["4D"].ToString(); // Código del Tipo otro documento

                    s4E = oDR_GuiaRemision["4E"].ToString(); // ATTACH_DOC
                }
                string fila4_InformacionGuias = s4A + "," + s4B + "," + s4C + "," + s4D + "," + s4E;
                // Fin: FILA 4 - INFORMACION GUIAS, OTROS DOCUMENTOS Y PAGO ÚNICO O CUOTAS RELACIONADOS

                // Inicio: FILA 5 - INFORMACIÓN DEL EMISOR
                DataTable oDT_DatosEmpresa = ocEFBoleta.fnListarDatosEmpresa(p_CTLG_CODE);

                string s5A = "";
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
                if (oDT_DatosEmpresa != null)
                {
                    DataRow oDR_DatosEmpresa = oDT_DatosEmpresa.NewRow();
                    oDR_DatosEmpresa = oDT_DatosEmpresa.Rows[0];

                    s5A = oDR_DatosEmpresa["5A"].ToString(); // Razón Social de la Empresa
                    s5A = fnCortarCadena(s5A, 1500);

                    s5B = oDR_DatosEmpresa["5B"].ToString(); // Nombre Comercial de la Empresa
                    s5B = fnCortarCadena(s5B, 1500);

                    s5C = oDR_DatosEmpresa["5C"].ToString(); // Nro de RUC de la Empresa

                    s5D = oDR_DatosEmpresa["5D"].ToString(); // Código Ubigeo de la Empresa

                    s5E = oDR_DatosEmpresa["5E"].ToString(); // Dirección de la Empresa

                    s5F = oDR_DatosEmpresa["5F"].ToString(); // Urbanización de la Empresa

                    s5G = oDR_DatosEmpresa["5G"].ToString(); // Departamento de la Empresa

                    s5H = oDR_DatosEmpresa["5H"].ToString(); // Provincia de la Empresa

                    s5I = oDR_DatosEmpresa["5I"].ToString(); // Distrito de la Empresa

                    s5J = oDR_DatosEmpresa["5J"].ToString(); // Código País de la Empresa

                    s5K = oDR_DatosEmpresa["5K"].ToString(); // El código del establecimiento del emisor según SUNAT
                }
                string fila5_InformacionEmisor = s5A + "," + s5B + "," + s5C + "," + s5D + "," + s5E + "," + s5F + "," + s5G + "," + 
                    s5H + "," + s5I + "," + s5J + "," + s5K;
                // Fin: FILA 5 - INFORMACIÓN DEL EMISOR

                // Inicio: FILA 6 - INFORMACIÓN DEL RECEPTOR
                DataTable oDT_DatosCliente = ocEFBoleta.fnListarDatosCliente(p_CTLG_CODE, p_VTAC_CODE);

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
                if (oDT_DatosCliente != null)
                {
                    DataRow oDR_DatosCliente = oDT_DatosCliente.NewRow();
                    oDR_DatosCliente = oDT_DatosCliente.Rows[0];

                    s6A = oDR_DatosCliente["6A"].ToString(); // Nro de RUC del Cliente
                    s6A = fnCortarCadena(s6A, 15);

                    s6B = oDR_DatosCliente["6B"].ToString(); // Tipo Documento del Cliente

                    s6C = oDR_DatosCliente["6C"].ToString(); // Razón Social del Cliente
                    s6C = fnCortarCadena(s6C, 1500);

                    s6D = oDR_DatosCliente["6D"].ToString(); // Nombre Comercial del Cliente
                    s6D = fnCortarCadena(s6D, 1500);

                    s6E = oDR_DatosCliente["6E"].ToString(); // Código Ubigeo del Cliente

                    s6F = oDR_DatosCliente["6F"].ToString(); // Dirección del Cliente

                    s6G = ""; // Urbanización del Cliente

                    s6H = oDR_DatosCliente["6H"].ToString(); // Departamento del Cliente

                    s6I = oDR_DatosCliente["6I"].ToString(); // Provincia del Cliente

                    s6J = oDR_DatosCliente["6J"].ToString(); // Distrito del Cliente

                    s6K = oDR_DatosCliente["6K"].ToString(); // País del Cliente

                    s6L = oDR_DatosCliente["6L"].ToString(); // Correo del Cliente
                }
                string fila6_InformacionReceptor = s6A + "," + s6B + "," + s6C + "," + s6D + "," + s6E + "," + s6F + "," + s6G + "," +
                    s6H + "," + s6I + "," + s6J + "," + s6K + "," + s6L;
                // Fin: FILA 6 - INFORMACIÓN DEL RECEPTOR

                // Inicio - FILA 7 - LEYENDAS
                Numalet oNumalet = new Numalet(false, "00/100", "con", true);
                decimal nTotalVenta = Convert.ToDecimal(s1N);
                string sNumalet = oNumalet.ToCustomCardinal(nTotalVenta) + " " + sMoneda;
                sNumalet = sNumalet.ToUpper();

                string s7A = sNumalet; // Monto en Letras
                s7A = fnCortarCadena(s7A, 100);
                string s7B = "";
                string s7C = "";
                string s7D = "";
                string s7E = "";
                string s7F = "";
                string s7G = "";
                string s7H = "";
                string s7I = "";
                if (nMontoDetrac != 0)
                    s7I = "Operación sujeta a detracción";
                string s7J = "";
                string s7K = "";
                string s7L = "";
                string s7M = "";

                string fila7_Leyendas = s7A + "," + s7B + "," + s7C + "," + s7D + "," + s7E + "," + s7F + "," + s7G + "," +
                     s7H + "," + s7I + "," + s7J + "," + s7K + "," + s7L + "," + s7M;
                // Fin - FILA 7 - LEYENDAS

                // Inicio - FILA 8 - ADICIONALES GLOBALES
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
                string s8AH = "";
                string s8AI = "";
                string s8AJ = "";
                string s8AK = "";
                string s8AL = "";
                string s8AM = "";
                string s8AN = "";
                string s8AO = "";
                string s8AP = "";
                string s8AQ = "";
                string s8AR = "";
                string s8AS = "";
                string s8AT = "";
                string s8AU = "";
                string s8AV = "";
                string s8AW = "";
                string s8AX = "";
                string s8AY = "";
                string s8AZ = "";

                string s8BA = "";
                string s8BB = "";
                string s8BC = "";
                string s8BD = "";
                string s8BE = "";
                string s8BF = "";
                string s8BG = "";
                string s8BH = "";
                string s8BI = "";
                string s8BJ = "";
                string s8BK = "";
                string s8BL = "";
                string s8BM = "";
                string s8BN = "";
                string s8BO = "";
                string s8BP = "";
                string s8BQ = "";
                string s8BR = "";
                string s8BS = "";
                string s8BT = "";
                string s8BU = "";
                string s8BV = "";
                string s8BW = "";
                string s8BX = "";
                string s8BY = "";
                string s8BZ = "";

                string s8CA = "";
                string s8CB = "";
                string s8CC = "";
                string s8CD = "";
                string s8CE = "";
                string s8CF = "";
                string s8CG = "";
                string s8CH = "";
                string s8CI = "";

                string fila8_AdicionalesGlobales = s8A + "," + s8B + "," + s8C + "," + s8D + "," + s8E + "," + s8F + "," + s8G + "," + s8H + "," + 
                    s8I + "," + s8J + "," + s8K + "," + s8L + "," + s8M + "," + s8N + "," + s8O + "," + s8P + "," + s8Q + "," + 
                    s8R + "," + s8S + "," + s8T + "," + s8U + "," + s8V + "," + s8W + "," +s8X + "," + s8Y + "," + s8Z + ","  + 

                    s8AA + "," + s8AB + "," + s8AC + "," + s8AD + "," + s8AE + "," + s8AF + "," + s8AG + "," + s8AH + "," +
                    s8AI + "," + s8AJ + "," + s8AK + "," + s8AL + "," + s8AM + "," + s8AN + "," + s8AO + "," + s8AP + "," + s8AQ + "," +
                    s8AR + "," + s8AS + "," + s8AT + "," + s8AU + "," + s8AV + "," + s8AW + "," + s8AX + "," + s8AY + "," + s8AZ + "," +

                    s8BA + "," + s8BB + "," + s8BC + "," + s8BD + "," + s8BE + "," + s8BF + "," + s8BG + "," + s8BH + "," +
                    s8BI + "," + s8BJ + "," + s8BK + "," + s8BL + "," + s8BM + "," + s8BN + "," + s8BO + "," + s8BP + "," + s8BQ + "," +
                    s8BR + "," + s8BS + "," + s8BT + "," + s8BU + "," + s8BV + "," + s8BW + "," + s8BX + "," + s8BY + "," + s8BZ + "," +

                    s8CA + "," + s8CB + "," + s8CC + "," + s8CD + "," + s8CE + "," + s8CF + "," + s8CG + "," + s8CH + "," + s8CI;
                // Fin - FILA 8 - ADICIONALES GLOBALES

                // Inicio: FILA 9 - DATOS DE LA LÍNEA
                DataTable oDT_DatosProd = ocEFBoleta.fnListarDatosProducto(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_DatosProd == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el detalle de Productos del Documento");
                }

                bool bIndicador = false;

                string s9A = "";
                string s9B = "";
                string s9C = "";
                string s9D = "";
                string s9E = "";
                string s9F = "";
                string s9G = "";
                string s9H = "";
                string s9I = "";
                string s9J = "";
                string s9K = "";
                string s9L = "";
                string s9M = "";
                string s9N = "";
                string s9O = "";
                string s9P = "";
                string s9Q = "";
                string s9R = "";
                string s9S = "";
                string s9T = "";
                string s9U = "";
                string s9V = "";
                string s9W = "";
                string s9X = "";
                string s9Y = "";
                string s9Z = "";

                string s9AA = "";
                string s9AB = "";
                string s9AC = "";
                string s9AD = "";
                string s9AE = "";
                string s9AF = "";
                string s9AG = "";
                string s9AH = "";
                string s9AI = "";
                string s9AJ = "";
                string s9AK = "";
                string s9AL = "";
                string s9AM = "";
                string s9AN = "";
                string s9AO = "";
                string s9AP = "";
                string s9AQ = "";
                string s9AR = "";
                string s9AS = "";
                string s9AT = "";
                string s9AU = "";
                string s9AV = "";
                string s9AW = "";
                string s9AX = "";
                string s9AY = "";
                string s9AZ = "";

                string s9BA = "";
                string s9BB = "";
                string s9BC = "";
                string s9BD = "";
                string s9BE = "";
                string s9BF = "";
                string s9BG = "";
                string s9BH = "";
                string s9BI = "";
                string s9BJ = "";
                string s9BK = "";
                string s9BL = "";
                string s9BM = "";
                string s9BN = "";
                string s9BO = "";
                string s9BP = "";
                string s9BQ = "";
                string s9BR = "";
                string s9BS = "";
                string s9BT = "";
                string s9BU = "";
                string s9BV = "";
                string s9BW = "";
                string s9BX = "";
                string s9BY = "";
                string s9BZ = "";

                string s9CA = "";
                string s9CB = "";
                string s9CC = "";
                string s9CD = "";
                string s9CE = "";
                string s9CF = "";
                string s9CG = "";
                string s9CH = "";
                string s9CI = "";
                string s9CJ = "";
                string s9CK = "";
                string s9CL = "";
                string s9CM = "";
                string s9CN = "";
                string s9CO = "";
                string s9CP = "";
                string s9CQ = "";
                string s9CR = "";
                string s9CS = "";
                string s9CT = "";
                string s9CU = "";
                string s9CV = "";
                string s9CW = "";
                string s9CX = "";
                string s9CY = "";
                string s9CZ = "";

                string s9DA = "";
                string s9DB = "";
                string s9DC = "";
                string s9DD = "";
                string s9DE = "";
                string s9DF = "";
                string s9DG = "";
                string s9DH = "";
                string s9DI = "";
                string s9DJ = "";
                string s9DK = "";
                string s9DL = "";
                string s9DM = "";
                string s9DN = "";
                string s9DO = "";
                string s9DP = "";
                string s9DQ = "";
                string s9DR = "";
                string s9DS = "";
                string s9DT = "";
                string s9DU = "";
                string s9DV = "";
                string s9DW = "";
                string s9DX = "";
                string s9DY = "";
                string s9DZ = "";

                string s9EA = "";
                string s9EB = "";
                string s9EC = "";
                string s9ED = "";
                string s9EE = "";
                string s9EF = "";
                string s9EG = "";
                string s9EH = "";
                string s9EI = "";
                string s9EJ = "";
                string s9EK = "";
                string s9EL = "";
                string s9EM = "";
                string s9EN = "";
                string s9EO = "";
                string s9EP = "";
                string s9EQ = "";
                string s9ER = "";
                string s9ES = "";
                string s9ET = "";
                string s9EU = "";
                string s9EV = "";
                string s9EW = "";

                string fila9_DatosLinea = "";
                foreach (DataRow oDR in oDT_DatosProd.Rows)
                {
                    if (bIndicador) fila9_DatosLinea += ((char)10);

                    s9A = oDR["9A"].ToString(); // Número de orden
                    s9B = oDR["9B"].ToString(); // Código de unidad de medida
                    s9B = fnCortarCadena(s9B, 3);
                    s9C = oDR["9C"].ToString(); // Cantidad de unidades
                    s9D = oDR["9D"].ToString(); // Descripción del Producto
                    s9D = fnCortarCadena(s9D, 500);
                    s9E = oDR["9E"].ToString(); // Precio de Venta del Item
                    s9F = oDR["9F"].ToString(); // Código Precio de Venta del Item
                    s9G = oDR["9G"].ToString(); // Precio de Venta del Item (Referencial)
                    s9H = oDR["9H"].ToString(); // Código Precio de Venta del Item (Referencial)
                    s9I = oDR["9I"].ToString(); // Monto Total IGV del Item
                    s9J = oDR["9J"].ToString(); // Monto Total IGV del Item
                    s9K = oDR["9K"].ToString(); // Tipo de Afectación del IGV
                    s9L = oDR["9L"].ToString(); // Tipo de Tributo
                    s9M = oDR["9M"].ToString(); // Porcentaje del IGV
                    s9N = oDR["9N"].ToString(); // Monto base ISC
                    s9O = oDR["9O"].ToString(); // Monto total ISC
                    s9P = oDR["9P"].ToString(); // Código de tipos de sistema de cálculo ISC
                    s9Q = oDR["9Q"].ToString(); // Código tributo ISC
                    s9R = oDR["9R"].ToString(); // Código de Producto SUNAT
                    s9S = oDR["9S"].ToString(); // Código Interno del Producto
                    s9S = fnCortarCadena(s9S, 30);
                    s9T = oDR["9T"].ToString(); // Costo de una unidad sin IGV
                    s9U = oDR["9U"].ToString(); // Valor Venta del Item
                    s9V = oDR["9V"].ToString(); // Monto base Otros tributos
                    s9W = oDR["9W"].ToString(); // Porcentaje Otros tributos
                    s9X = oDR["9X"].ToString(); // Monto total Otros tributos
                    s9Y = oDR["9Y"].ToString(); // Monto base descuento AB
                    s9Z = oDR["9Z"].ToString(); // Factor descuento AB

                    s9AA = oDR["9AA"].ToString(); // Monto total descuento AB
                    s9AB = oDR["9AB"].ToString(); // Monto base descuento no AB
                    s9AC = oDR["9AC"].ToString(); // Factor descuento no AB
                    s9AD = oDR["9AD"].ToString(); // Monto total descuento no AB
                    s9AE = oDR["9AE"].ToString(); // Monto base del cargo AB
                    s9AF = oDR["9AF"].ToString(); // Factor del cargo AB
                    s9AG = oDR["9AG"].ToString(); // Monto total del cargo AB
                    s9AH = oDR["9AH"].ToString(); // Monto base del cargo no AB
                    s9AI = oDR["9AI"].ToString(); // Factor del cargo no AB
                    s9AJ = oDR["9AJ"].ToString(); // Monto total del cargo no AB
                    s9AK = oDR["9AK"].ToString(); // Monto total impuestos
                    s9AL = oDR["9AL"].ToString(); // Total de la Línea
                    s9AM = oDR["9AM"].ToString(); // Número de placa del vehículo
                    s9AN = oDR["9AN"].ToString(); // Cantidad Und Emp
                    s9AO = oDR["9AO"].ToString(); // Cantidad total und
                    s9AP = oDR["9AP"].ToString(); // Descuento %
                    s9AQ = oDR["9AQ"].ToString(); // Descuento importe
                    s9AR = oDR["9AR"].ToString(); // Descuento 1
                    s9AS = oDR["9AS"].ToString(); // Descuento 2
                    s9AT = oDR["9AT"].ToString(); // Descuento 3
                    s9AU = oDR["9AU"].ToString(); // Código cliente
                    s9AV = oDR["9AV"].ToString(); // Lote
                    s9AW = oDR["9AW"].ToString(); // Peso total
                    s9AX = oDR["9AX"].ToString(); // Numero guia
                    s9AY = oDR["9AY"].ToString(); // Campo adicional
                    s9AZ = oDR["9AZ"].ToString(); // Código país de residencia del sujeto no domiciliado

                    s9BA = oDR["9BA"].ToString(); // Fecha ingreso al país
                    s9BB = oDR["9BB"].ToString(); // Fecha ingreso al establecimiento
                    s9BC = oDR["9BC"].ToString(); // Fecha salida del establecimiento
                    s9BD = oDR["9BD"].ToString(); // Número de días de permanencia
                    s9BE = oDR["9BE"].ToString(); // Fecha de consumo
                    s9BF = oDR["9BF"].ToString(); // Código país de emisión del pasaporte
                    s9BG = oDR["9BG"].ToString(); // Apellidos y nombres o razón social del huésped
                    s9BH = oDR["9BH"].ToString(); // Tipo de documento del huésped
                    s9BI = oDR["9BI"].ToString(); // Número documento del huésped
                    s9BJ = oDR["9BJ"].ToString(); // N° de expediente: Ventas sector público
                    s9BK = oDR["9BK"].ToString(); // Código unidad ejecutora: Ventas sector público
                    s9BL = oDR["9BL"].ToString(); // N° de contrato: Ventas sector público
                    s9BM = oDR["9BM"].ToString(); // N° de proceso de selección: Ventas sector público
                    s9BN = oDR["9BN"].ToString(); // N° de contrato: Ventas sector público
                    s9BO = oDR["9BO"].ToString(); // Fecha de otorgamiento del crédito
                    s9BP = oDR["9BP"].ToString(); // Código del tipo de préstamo
                    s9BQ = oDR["9BQ"].ToString(); // Número de la partida registral
                    s9BR = oDR["9BR"].ToString(); // Código de indicador de primera vivienda
                    s9BS = oDR["9BS"].ToString(); // Predio: Código de ubigeo
                    s9BT = oDR["9BT"].ToString(); // Predio: Dirección completa y detallada
                    s9BU = oDR["9BU"].ToString(); // Predio: Urbanización
                    s9BV = oDR["9BV"].ToString(); // Predio: Provincia
                    s9BW = oDR["9BW"].ToString(); // Predio: Distrito
                    s9BX = oDR["9BX"].ToString(); // Predio: Departamento
                    s9BY = oDR["9BY"].ToString(); // Origen código ubigeo
                    s9BZ = oDR["9BZ"].ToString(); // Origen dirección

                    s9CA = oDR["9CA"].ToString(); // Destino código ubigeo
                    s9CB = oDR["9CB"].ToString(); // Destino dirección
                    s9CC = oDR["9CC"].ToString(); // Pasajero: Apellidos y nombres
                    s9CD = oDR["9CD"].ToString(); // Pasajero: Numero documentos identidad
                    s9CE = oDR["9CE"].ToString(); // Pasajero: Tipo documento identidad
                    s9CF = oDR["9CF"].ToString(); // Origen código ubigeo
                    s9CG = oDR["9CG"].ToString(); // Origen dirección
                    s9CH = oDR["9CH"].ToString(); // Destino código ubigeo
                    s9CI = oDR["9CI"].ToString(); // Destino dirección
                    s9CJ = oDR["9CJ"].ToString(); // Servicio de transporte: Número de asiento
                    s9CK = oDR["9CK"].ToString(); // Servicio de transporte: Fecha programada de inicio de viaje
                    s9CL = oDR["9CL"].ToString(); // Servicio de transporte: Hora programada de inicio de viaje
                    s9CM = oDR["9CM"].ToString(); // Decreto supremo de aprobación del contrato
                    s9CN = oDR["9CN"].ToString(); // Área de contrato - Lote
                    s9CO = oDR["9CO"].ToString(); // Periodo de pago Fecha de inicio
                    s9CP = oDR["9CP"].ToString(); // Periodo de pago Fecha de fin
                    s9CQ = oDR["9CQ"].ToString(); // Partida arancelaria
                    s9CR = oDR["9CR"].ToString(); // Número de placa
                    s9CS = oDR["9CS"].ToString(); // Categoría
                    s9CT = oDR["9CT"].ToString(); // Marca
                    s9CU = oDR["9CU"].ToString(); // Modelo
                    s9CV = oDR["9CV"].ToString(); // Color
                    s9CW = oDR["9CW"].ToString(); // Motor
                    s9CX = oDR["9CX"].ToString(); // Combustible
                    s9CY = oDR["9CY"].ToString(); // Form. Rodante
                    s9CZ = oDR["9CZ"].ToString(); // VIN

                    s9DA = oDR["9DA"].ToString(); // Serie / Chasis
                    s9DB = oDR["9DB"].ToString(); // Año de fabricación
                    s9DC = oDR["9DC"].ToString(); // Año modelo
                    s9DD = oDR["9DD"].ToString(); // Versión
                    s9DE = oDR["9DE"].ToString(); // Ejes
                    s9DF = oDR["9DF"].ToString(); // Asientos
                    s9DG = oDR["9DG"].ToString(); // Pasajeros
                    s9DH = oDR["9DH"].ToString(); // Ruedas
                    s9DI = oDR["9DI"].ToString(); // Carrocería
                    s9DJ = oDR["9DJ"].ToString(); // Potencia
                    s9DK = oDR["9DK"].ToString(); // Cilindros
                    s9DL = oDR["9DL"].ToString(); // Cilindrada
                    s9DM = oDR["9DM"].ToString(); // Peso bruto
                    s9DN = oDR["9DN"].ToString(); // Peso Neto
                    s9DO = oDR["9DO"].ToString(); // Carga útil
                    s9DP = oDR["9DP"].ToString(); // Longitud
                    s9DQ = oDR["9DQ"].ToString(); // Altura
                    s9DR = oDR["9DR"].ToString(); // Ancho
                    s9DS = oDR["9DS"].ToString(); // Número de asiento
                    s9DT = oDR["9DT"].ToString(); // Información del manifiesto de pasajeros
                    s9DU = oDR["9DU"].ToString(); // Número de documento del pasajero
                    s9DV = oDR["9DV"].ToString(); // Tipo de documento del pasajero
                    s9DW = oDR["9DW"].ToString(); // Nombres y apellidos del pasajero
                    s9DX = oDR["9DX"].ToString(); // Código de ubigeo origen del pasajero
                    s9DY = oDR["9DY"].ToString(); // Dirección de origen del pasajero
                    s9DZ = oDR["9DZ"].ToString(); // Código de ubigeo destino del pasajero

                    s9EA = oDR["9EA"].ToString(); // Dirección del destino del pasajero
                    s9EB = oDR["9EB"].ToString(); // Fecha inicio programado
                    s9EC = oDR["9EC"].ToString(); // Hora de inicio programado
                    s9ED = oDR["9ED"].ToString(); // Detracción: Matrícula de la embarcación pesquera
                    s9EE = oDR["9EE"].ToString(); // Detracción: Nombre de la embarcación pesquera
                    s9EF = oDR["9EF"].ToString(); // Detracción: Descripción del tipo de la especie vendida
                    s9EG = oDR["9EG"].ToString(); // Detracción: Lugar de descarga
                    s9EH = oDR["9EH"].ToString(); // Detracción: Cantidad de la especie vendida
                    s9EI = oDR["9EI"].ToString(); // Detracción: Fecha de descarga
                    s9EJ = oDR["9EJ"].ToString(); // Detracción: Código ubigeo origen
                    s9EK = oDR["9EK"].ToString(); // Detracción: Dirección de origen
                    s9EL = oDR["9EL"].ToString(); // Detracción: Código ubigeo destino
                    s9EM = oDR["9EM"].ToString(); // Detracción: Dirección de destino
                    s9EN = oDR["9EN"].ToString(); // Detracción: Detalle del viaje
                    s9EO = oDR["9EO"].ToString(); // Detracción: Valor referencia del servicio de transporte
                    s9EP = oDR["9EP"].ToString(); // Detracción: Valor referencial sobre la carga afectiva
                    s9EQ = oDR["9EQ"].ToString(); // Detracción: Valor referencial sobre la carga útil nominal
                    s9ER = oDR["9ER"].ToString(); // Código de producto GS1
                    s9ES = oDR["9ES"].ToString(); // Tipo de estructura GTIN del código de producto GS1
                    s9ET = oDR["9ET"].ToString(); // Porcentaje del ISC
                    s9EU = oDR["9EU"].ToString(); // Cantidad de bolsas plastico
                    s9EV = oDR["9EV"].ToString(); // Monto unitario de la bolsa de plástico
                    s9EW = oDR["9EW"].ToString(); // Monto total ICBPER

                    fila9_DatosLinea += s9A + "," + s9B + "," + s9C + "," + s9D + "," + s9E + "," + s9F + "," + s9G + "," + s9H + "," + 
                        s9I + "," + s9J + "," + s9K + "," + s9L + "," + s9M + "," + s9N + "," + s9O + "," + s9P + "," + s9Q + "," + 
                        s9R + "," + s9S + "," + s9T + "," + s9U + "," + s9V + "," + s9W + "," + s9X + "," + s9Y + "," + s9Z + "," +

                        s9AA + "," + s9AB + "," + s9AC + "," + s9AD + "," + s9AE + "," + s9AF + "," + s9AG + "," + s9AH + "," +
                        s9AI + "," + s9AJ + "," + s9AK + "," + s9AL + "," + s9AM + "," + s9AN + "," + s9AO + "," + s9AP + "," + s9AQ + "," +
                        s9AR + "," + s9AS + "," + s9AT + "," + s9AU + "," + s9AV + "," + s9AW + "," + s9AX + "," + s9AY + "," + s9AZ + "," +

                        s9BA + "," + s9BB + "," + s9BC + "," + s9BD + "," + s9BE + "," + s9BF + "," + s9BG + "," + s9BH + "," +
                        s9BI + "," + s9BJ + "," + s9BK + "," + s9BL + "," + s9BM + "," + s9BN + "," + s9BO + "," + s9BP + "," + s9BQ + "," +
                        s9BR + "," + s9BS + "," + s9BT + "," + s9BU + "," + s9BV + "," + s9BW + "," + s9BX + "," + s9BY + "," + s9BZ + "," +

                        s9CA + "," + s9CB + "," + s9CC + "," + s9CD + "," + s9CE + "," + s9CF + "," + s9CG + "," + s9CH + "," +
                        s9CI + "," + s9CJ + "," + s9CK + "," + s9CL + "," + s9CM + "," + s9CN + "," + s9CO + "," + s9CP + "," + s9CQ + "," +
                        s9CR + "," + s9CS + "," + s9CT + "," + s9CU + "," + s9CV + "," + s9CW + "," + s9CX + "," + s9CY + "," + s9CZ + "," +

                        s9DA + "," + s9DB + "," + s9DC + "," + s9DD + "," + s9DE + "," + s9DF + "," + s9DG + "," + s9DH + "," +
                        s9DI + "," + s9DJ + "," + s9DK + "," + s9DL + "," + s9DM + "," + s9DN + "," + s9DO + "," + s9DP + "," + s9DQ + "," +
                        s9DR + "," + s9DS + "," + s9DT + "," + s9DU + "," + s9DV + "," + s9DW + "," + s9DX + "," + s9DY + "," + s9DZ + "," +

                        s9EA + "," + s9EB + "," + s9EC + "," + s9ED + "," + s9EE + "," + s9EF + "," + s9EG + "," + s9EH + "," +
                        s9EI + "," + s9EJ + "," + s9EK + "," + s9EL + "," + s9EM + "," + s9EN + "," + s9EO + "," + s9EP + "," + s9EQ + "," +
                        s9ER + "," + s9ES + "," + s9ET + "," + s9EU + "," + s9EV + "," + s9EW;

                    bIndicador = true;
                }
                // Fin: FILA 9 - DATOS DE LA LÍNEA

                //string sNombreArchivo = sPath + @"in\boleta\" + "03" + s1B + ".csv";
                string sNombreArchivo = In_LocalPathEfact + FnGetNombreArchivo(CODIGO_SUNAT_BOLETA, s1B, EXTENSION_CSV);
                // verificar si existe archivo
                if (File.Exists(sNombreArchivo))
                {
                    File.Delete(sNombreArchivo);
                }

                string sInfoDoc = 
                    fila1_DatosDoc + ((char)10) + 
                    fila2_SustentoTrasladoMercaderia + ((char)10) + 
                    fila3_InformacionAnticipos + ((char)10) + 
                    fila4_InformacionGuias + ((char)10) + 
                    fila5_InformacionEmisor + ((char)10) + 
                    fila6_InformacionReceptor + ((char)10) + 
                    fila7_Leyendas + ((char)10) + 
                    fila8_AdicionalesGlobales + ((char)10) + 
                    fila9_DatosLinea + ((char)10) + 
                    Delimitador;


                // Crear el archivo
                using (FileStream oFileStream = File.Create(sNombreArchivo))
                {
                    // Add some text to file
                    Byte[] abDatosDoc = new UTF8Encoding(true).GetBytes(sInfoDoc);
                    oFileStream.Write(abDatosDoc, 0, abDatosDoc.Length);                    
                }

                cEFFactura ocEFFactura = new cEFFactura("Bn");
                string sRespuesta = ocEFFactura.Actualizar_ELECT_IND_FACT_BOL_EFACT(p_CTLG_CODE, p_VTAC_CODE, CSV_GENERADO_IND);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        private string FnGetNombreArchivo(string p_Tipo_Doc, string p_Serie_Y_Numero, string p_Extension_Sin_Punto)
        {
            return RucEmpresa + "-" + p_Tipo_Doc + "-" + p_Serie_Y_Numero + "." + p_Extension_Sin_Punto;
        }

        private string ObtenerRucEmpresa(string p_CTLG_CODE)
        {
            cEFFactura ocEFFactura = new cEFFactura("Bn");
            DataTable oDT_DatosEmpresa = ocEFFactura.fnListarDatosEmpresa(p_CTLG_CODE);
            if (oDT_DatosEmpresa != null)
            {
                DataRow oDR_DatosEmpresa = oDT_DatosEmpresa.NewRow();
                oDR_DatosEmpresa = oDT_DatosEmpresa.Rows[0];
                return oDR_DatosEmpresa["5C"].ToString(); // Nro de RUC de la Empresa   
            }
            return "";
        }

        public void fnGetBoletaOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
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
                cEFBoleta ocEFBoleta = new cEFBoleta("Bn");
                cEFFactura ocEFFactura = new cEFFactura("Bn");

                DataTable oDT_Doc = ocEFBoleta.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_Doc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el Documento en la Base de Datos");
                }

                DataRow oDR_Doc = oDT_Doc.NewRow();
                oDR_Doc = oDT_Doc.Rows[0];
                string sIndElect = oDR_Doc["FactElecInd"].ToString();
                string sSerieNro = oDR_Doc["NroSerieDoc"].ToString();

                if (!sSerieNro.Substring(0, 1).Equals("B"))
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

                // Inicio - Datos del Documento
                DataTable oDT_DatosDoc = ocEFBoleta.fnListarDatosDocumentoOrbitum(p_CTLG_CODE, p_VTAC_CODE);
                if (oDT_DatosDoc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }
                DataRow oDR_DatosDoc = oDT_DatosDoc.Rows[0];



                string c1 = oDR_DatosDoc["CAB1"].ToString(); // TIPO DE OPERACION 0101
                string c2 = oDR_DatosDoc["CAB2"].ToString(); // Fecha de Emisión            
                string c3 = oDR_DatosDoc["CAB3"].ToString(); // Hora de emisión
                string c4 = oDR_DatosDoc["CAB4"].ToString(); // Fecha vencimiento
                string c5 = oDR_DatosDoc["CAB5"].ToString(); // Código de Establecimiento anexo SUNAT                
                string c6 = oDR_DatosDoc["CAB6"].ToString(); // Codigo Tipo de documento cliente
                string c7 = oDR_DatosDoc["CAB7"].ToString(); // Nro de documento del Cliente
                c7 = fnCortarCadena(c7, 15); // validar que no pase de 15 caracteres
                string c8 = oDR_DatosDoc["CAB8"].ToString(); // razon social del cliente
                string c9 = oDR_DatosDoc["CAB9"].ToString(); // tipo de moneda (PEN, USD)
                string c10 = oDR_DatosDoc["CAB10"].ToString(); // sumatoria de tributos
                string c11 = oDR_DatosDoc["CAB11"].ToString(); // total valor venta (gravado)
                string c12 = oDR_DatosDoc["CAB12"].ToString(); // total precio venta (monto total)
                string c13 = oDR_DatosDoc["CAB13"].ToString(); // total descuentos 
                string c14 = oDR_DatosDoc["CAB14"].ToString(); // sumatoria otros cargos (0.00 en todos, no se que es)
                string c15 = oDR_DatosDoc["CAB15"].ToString(); // total anticipos (0.00 en todos, no se que es)
                string c16 = oDR_DatosDoc["CAB16"].ToString(); // importe total de la venta (monto total)
                string c17 = oDR_DatosDoc["CAB17"].ToString(); // version ubl (2.1)
                string c18 = oDR_DatosDoc["CAB18"].ToString(); // Customizacion documento (2.0)

                string seriecorrelativo = oDR_DatosDoc["SERIECORRELATIVO"].ToString(); // serie y correlativo de la venta
                string ruc = oDR_DatosDoc["RUC"].ToString(); // ruc de la empresa

                string sDatosCabecera = c1 + "|" + c2 + "|" + c3 + "|" + c4 + "|" + c5 + "|" + c6 + "|" + c7 + "|" +
                     c8 + "|" + c9 + "|" + c10 + "|" + c11 + "|" + c12 + "|" + c13 + "|" + c14 + "|" + c15 + "|" +
                     c16 + "|" + c17 + "|" + c18 + "|";
                // Fin - Datos del Documento Cabecera

                // Inicio - Verificar si el documento tiene anticipos y si hay crear el contenido del txt (REL)
                string sDatosAnticipo = "";
                string sNombreArchivoAnticipo = "";
                if (oDR_DatosDoc["IND_ANTICIPO"].ToString() != "0")
                {
                    DataTable oDT_DatosAnticipo = ocEFFactura.fnListarDatosAnticipoOrbitum(p_CTLG_CODE, p_VTAC_CODE, "");
                    bool enterAnticipo = false;
                    foreach (DataRow oDRAnticipos in oDT_DatosAnticipo.Rows)
                    {
                        if (enterAnticipo) sDatosAnticipo += ((char)10);
                        string r1 = oDRAnticipos["REL1"].ToString(); // Indicador de documento relacionado
                        string r2 = oDRAnticipos["REL2"].ToString(); // Correlativo
                        string r3 = oDRAnticipos["REL3"].ToString(); // Tipo de documento relacionado
                        string r4 = oDRAnticipos["REL4"].ToString(); // Numero de documento relacionado
                        string r5 = oDRAnticipos["REL5"].ToString(); // Tipo de documento del emisor del documento relacionado
                        string r6 = oDRAnticipos["REL6"].ToString(); // Número de documento del emisor del documento relacionado
                        string r7 = oDRAnticipos["REL7"].ToString(); // Monto del documento relacionado

                        sDatosAnticipo += r1 + "|" + r2 + "|" + r3 + "|" + r4 + "|" + r5 + "|" + r6 + "|" + r7 + "|";
                    }
                    sNombreArchivoAnticipo = sPath_Orbitum + @"DATA\" + ruc + "-03-" + seriecorrelativo + ".rel";
                }
                // Fin - Datos del Documento rel

                // Inicio - Datos del Producto
                DataTable oDT_DatosProd = ocEFBoleta.fnListarDatosProductoOrbitum(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_DatosProd == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el detalle de Productos del Documento");
                }

                bool bIndicador = false;

                string sProductoDet = "";
                foreach (DataRow oDR in oDT_DatosProd.Rows)
                {
                    if (bIndicador) sProductoDet += ((char)10);

                    string d1 = oDR["DET1"].ToString(); // CODIGO DE UNIDAD DE MEDIDA POR ITEM
                    string d2 = oDR["DET2"].ToString(); // CANTIDAD POR ITEM
                    string d3 = oDR["DET3"].ToString(); // CODIGO PRODUCTO
                    string d4 = oDR["DET4"].ToString(); // CODIGO PRODUCTO SUNAT (-)
                    string d5 = oDR["DET5"].ToString(); // DESCRIPCION DE PRODUCTO
                    string d6 = oDR["DET6"].ToString(); // VALOR UNITARI SIN IGV
                    string d7 = oDR["DET7"].ToString(); // SUMATORIA DE TRIBUTOS
                    string d8 = oDR["DET8"].ToString(); // CODIGO DE IGV (1000)
                    string d9 = oDR["DET9"].ToString(); //
                    string d10 = oDR["DET10"].ToString(); // 
                    string d11 = oDR["DET11"].ToString(); // 
                    string d12 = oDR["DET12"].ToString(); // 
                    string d13 = oDR["DET13"].ToString(); // 
                    string d14 = oDR["DET14"].ToString(); // 
                    string d15 = oDR["DET15"].ToString(); // 
                    string d16 = oDR["DET16"].ToString(); // 
                    string d17 = oDR["DET17"].ToString(); // 
                    string d18 = oDR["DET18"].ToString(); // 
                    string d19 = oDR["DET19"].ToString(); // 
                    string d20 = oDR["DET20"].ToString(); // 
                    string d21 = oDR["DET21"].ToString(); // 
                    string d22 = oDR["DET22"].ToString(); // 
                    //NUEVOS CAMPOS AÑADIDOS PARA LA VERSIÓN 1.3.2
                    string d23 = oDR["DET23"].ToString(); // 
                    string d24 = oDR["DET24"].ToString(); // 
                    string d25 = oDR["DET25"].ToString(); // 
                    string d26 = oDR["DET26"].ToString(); // 
                    string d27 = oDR["DET27"].ToString(); // 
                    string d28 = oDR["DET28"].ToString(); // 
                    string d29 = oDR["DET29"].ToString(); // 
                    string d30 = oDR["DET30"].ToString(); // 
                    string d31 = oDR["DET31"].ToString(); // 
                    string d32 = oDR["DET32"].ToString(); // 
                    string d33 = oDR["DET33"].ToString(); // 
                    string d34 = oDR["DET34"].ToString(); // 
                    string d35 = oDR["DET35"].ToString(); // 
                    string d36 = oDR["DET36"].ToString(); // 

                    sProductoDet += d1 + "|" + d2 + "|" + d3 + "|" + d4 + "|" + d5 + "|" + d6 + "|" + d7 + "|" + d8 + "|" + d9 + "|" + d10 + "|" +
                                    d11 + "|" + d12 + "|" + d13 + "|" + d14 + "|" + d15 + "|" + d16 + "|" + d17 + "|" + d18 + "|" + d19 + "|" + d20 + "|" +
                                    d21 + "|" + d22 + "|" + d23 + "|" + d24 + "|" + d25 + "|" + d26 + "|" + d27 + "|" + d28 + "|" + d29 + "|" + d30 + "|" +
                                    d31 + "|" + d32 + "|" + d33 + "|" + d34 + "|" + d35 + "|" + d36 + "|";

                    bIndicador = true;
                }
                // Fin - Datos del Documento Detalle (DET)

                string sNombreArchivo = sPath_Orbitum + @"DATA\" + ruc + "-03-" + seriecorrelativo + ".cab";
                string sNombreArchivoDet = sPath_Orbitum + @"DATA\" + ruc + "-03-" + seriecorrelativo + ".det";

                // Inicio - Datos del documento de Tributos Generales (TRI)
                string t1 = "1000"; // tipo de tributo
                string t2 = "IGV"; // IGV
                string t3 = "VAT"; // VAT
                string t4 = oDR_DatosDoc["CAB11"].ToString(); // BASE (GRAVADO)
                string t5 = oDR_DatosDoc["CAB10"].ToString(); // IGV

                string sDatosTributos = t1 + "|" + t2 + "|" + t3 + "|" + t4 + "|" + t5 + "|";
                string sNombreArchivoTri = sPath_Orbitum + @"DATA\" + ruc + "-03-" + seriecorrelativo + ".tri";
                // Fin - Datos del documento de Tributos Generales (TRI)

                // Inicio - Datos del documento de Leyendas (ley)
                string l1 = "1000";
                string l2 = enletras(oDR_DatosDoc["CAB16"].ToString()); // IGV
                if (c9 == "PEN")
                {
                    l2 += " SOLES";
                }
                else
                {
                    l2 += " DOLARES AMERICANOS";
                }
                string sDatosLeyenda = l1 + "|" + l2 + "|";
                string sNombreArchivoLeyenda = sPath_Orbitum + @"DATA\" + ruc + "-03-" + seriecorrelativo + ".ley";
                // Fin - Datos del documeento de Leyendas (ley)

                // verificar si existe archivo
                if (File.Exists(sNombreArchivo))
                {
                    File.Delete(sNombreArchivo);
                }
                if (File.Exists(sNombreArchivoDet))
                {
                    File.Delete(sNombreArchivoDet);
                }
                if (File.Exists(sNombreArchivoLeyenda))
                {
                    File.Delete(sNombreArchivoLeyenda);
                }
                if (File.Exists(sNombreArchivoTri))
                {
                    File.Delete(sNombreArchivoTri);
                }

                string sInfoDoc = sDatosCabecera;
                string sInfoDocDet = sProductoDet;
                string sInfoDocLeyenda = sDatosLeyenda;
                string sInfoDocTributos = sDatosTributos;


                // Crear el archivo
                using (FileStream oFileStream = File.Create(sNombreArchivo))
                {
                    // Add some text to file
                    Byte[] abDatosDoc = new UTF8Encoding(true).GetBytes(sInfoDoc);
                    oFileStream.Write(abDatosDoc, 0, abDatosDoc.Length);
                }

                using (FileStream oFileStream = File.Create(sNombreArchivoDet))
                {
                    // Add some text to file
                    Byte[] abDatosDocDet = new UTF8Encoding(true).GetBytes(sInfoDocDet);
                    oFileStream.Write(abDatosDocDet, 0, abDatosDocDet.Length);
                }
                using (FileStream oFileStream = File.Create(sNombreArchivoLeyenda))
                {
                    // Add some text to file
                    Byte[] abDatosDocLeyenda = new UTF8Encoding(true).GetBytes(sInfoDocLeyenda);
                    oFileStream.Write(abDatosDocLeyenda, 0, abDatosDocLeyenda.Length);
                }
                using (FileStream oFileStream = File.Create(sNombreArchivoTri))
                {
                    // Add some text to file
                    Byte[] abDatosDocTributos = new UTF8Encoding(true).GetBytes(sInfoDocTributos);
                    oFileStream.Write(abDatosDocTributos, 0, abDatosDocTributos.Length);
                }

                // Crear archivo anticipo
                if (sDatosAnticipo.Length > 0 && sNombreArchivoAnticipo.Length > 0)
                {
                    if (File.Exists(sNombreArchivoAnticipo))
                    {
                        File.Delete(sNombreArchivoAnticipo);
                    }
                    string sInfoAnticipo = sDatosAnticipo;
                    using (FileStream oFileStream = File.Create(sNombreArchivoAnticipo))
                    {
                        // Add some text to file
                        Byte[] abDatosAnticipo = new UTF8Encoding(true).GetBytes(sInfoAnticipo);
                        oFileStream.Write(abDatosAnticipo, 0, abDatosAnticipo.Length);
                    }
                }

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public void fnGetBoletaAnticipoOrbitum(string p_CTLG_CODE, string P_FVRANTI_CODE)
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
                cEFBoleta ocEFBoleta = new cEFBoleta("Bn");
                DataTable oDT_Doc = ocEFBoleta.fnListarDocAnticipo(p_CTLG_CODE, P_FVRANTI_CODE);

                if (oDT_Doc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el Documento en la Base de Datos");
                }

                DataRow oDR_Doc = oDT_Doc.Rows[0];
                string sIndElect = oDR_Doc["FactElecInd"].ToString();
                string sSerieNro = oDR_Doc["NroSerieDoc"].ToString();

                if (!sSerieNro.Substring(0, 2).Equals("BE"))
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



                // Inicio - Datos del Documento
                DataTable oDT_DatosDoc = ocEFBoleta.fnListarDatosBoletaAnticipoOrbitum(p_CTLG_CODE, P_FVRANTI_CODE);
                if (oDT_DatosDoc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }

                DataRow oDR_DatosDoc = oDT_DatosDoc.Rows[0];

                string c1 = oDR_DatosDoc["CAB1"].ToString(); // TIPO DE OPERACION 0101
                string c2 = oDR_DatosDoc["CAB2"].ToString(); // Fecha de Emisión            
                string c3 = oDR_DatosDoc["CAB3"].ToString(); // Hora de emisión
                string c4 = oDR_DatosDoc["CAB4"].ToString(); // Fecha vencimiento
                string c5 = oDR_DatosDoc["CAB5"].ToString(); // Código de Establecimiento anexo SUNAT                
                string c6 = oDR_DatosDoc["CAB6"].ToString(); // Codigo Tipo de documento cliente
                string c7 = oDR_DatosDoc["CAB7"].ToString(); // Nro de documento del Cliente
                c7 = fnCortarCadena(c7, 15); // validar que no pase de 15 caracteres
                string c8 = oDR_DatosDoc["CAB8"].ToString(); // razon social del cliente
                string c9 = oDR_DatosDoc["CAB9"].ToString(); // tipo de moneda (PEN, USD)
                string c10 = oDR_DatosDoc["CAB10"].ToString(); // sumatoria de tributos
                string c11 = oDR_DatosDoc["CAB11"].ToString(); // total valor venta (gravado)
                string c12 = oDR_DatosDoc["CAB12"].ToString(); // total precio venta (monto total)
                string c13 = oDR_DatosDoc["CAB13"].ToString(); // total descuentos 
                string c14 = oDR_DatosDoc["CAB14"].ToString(); // sumatoria otros cargos (0.00 en todos, no se que es)
                string c15 = oDR_DatosDoc["CAB15"].ToString(); // total anticipos (0.00 en todos, no se que es)
                string c16 = oDR_DatosDoc["CAB16"].ToString(); // importe total de la venta (monto total)
                string c17 = oDR_DatosDoc["CAB17"].ToString(); // version ubl (2.1)
                string c18 = oDR_DatosDoc["CAB18"].ToString(); // Customizacion documento (2.0)

                string seriecorrelativo = oDR_DatosDoc["SERIECORRELATIVO"].ToString(); // serie y correlativo de la venta
                string ruc = oDR_DatosDoc["RUC"].ToString(); // ruc de la empresa

                string sDatosCabecera = c1 + "|" + c2 + "|" + c3 + "|" + c4 + "|" + c5 + "|" + c6 + "|" + c7 + "|" +
                     c8 + "|" + c9 + "|" + c10 + "|" + c11 + "|" + c12 + "|" + c13 + "|" + c14 + "|" + c15 + "|" +
                     c16 + "|" + c17 + "|" + c18 + "|";
                // Fin - Datos del Documento Cabecera


                // Inicio - Datos del Producto
                string d1 = "EA"; // CODIGO DE UNIDAD DE MEDIDA POR ITEM
                string d2 = "1.0000000000"; // CANTIDAD POR ITEM
                string d3 = "12345678"; // CODIGO PRODUCTO
                string d4 = "-"; // CODIGO PRODUCTO SUNAT (-)
                string d5 = oDR_DatosDoc["DESCRIPCION"].ToString(); // DESCRIPCION DE PRODUCTO
                string d6 = oDR_DatosDoc["DET6"].ToString(); // VALOR UNITARI SIN IGV
                string d7 = oDR_DatosDoc["DET7"].ToString(); // SUMATORIA DE TRIBUTOS
                string d8 = "1000"; // CODIGO DE IGV (1000)
                string d9 = oDR_DatosDoc["DET9"].ToString(); //
                string d10 = oDR_DatosDoc["DET10"].ToString(); // 
                string d11 = "IGV"; // 
                string d12 = "VAT"; // 
                string d13 = "10"; // 
                string d14 = "18.00"; // 
                string d15 = "-"; // 
                string d16 = "0.00"; // 
                string d17 = "0.00"; // 
                string d18 = "ISC"; // 
                string d19 = "EXC"; // 
                string d20 = "01"; // 
                string d21 = "0.00"; // 
                string d22 = "-"; // 
                //1.3.2 DPORTA 29/11/2021
                string d23 = "0.00"; // 
                string d24 = "0.00"; // 
                string d25 = "OTROS"; // 
                string d26 = "OTH"; // 
                string d27 = "0.00"; // 
                string d28 = ""; // 
                string d29 = ""; // 
                string d30 = ""; // 
                string d31 = ""; // 
                string d32 = ""; // 
                string d33 = ""; // 
                string d34 = oDR_DatosDoc["DET34"].ToString(); // 
                string d35 = oDR_DatosDoc["DET35"].ToString(); // 
                string d36 = "0.0000000000"; // 

                string sProductoDet = d1 + "|" + d2 + "|" + d3 + "|" + d4 + "|" + d5 + "|" + d6 + "|" + d7 + "|" + d8 + "|" + d9 + "|" + d10 + "|" +
                                d11 + "|" + d12 + "|" + d13 + "|" + d14 + "|" + d15 + "|" + d16 + "|" + d17 + "|" + d18 + "|" + d19 + "|" + d20 + "|" +
                                d21 + "|" + d22 + "|" + d23 + "|" + d24 + "|" + d25 + "|" + d26 + "|" + d27 + "|" + d28 + "|" + d29 + "|" + d30 + "|" +
                                d31 + "|" + d32 + "|" + d33 + "|" + d34 + "|" + d35 + "|" + d36 + "|";
                // Fin - Datos del Documento Detalle (DET)

                string sNombreArchivo = sPath_Orbitum + @"DATA\" + ruc + "-03-" + seriecorrelativo + ".cab";
                string sNombreArchivoDet = sPath_Orbitum + @"DATA\" + ruc + "-03-" + seriecorrelativo + ".det";


                // Inicio - Datos del documento de Tributos Generales (TRI)
                string t1 = "1000"; // tipo de tributo
                string t2 = "IGV"; // IGV
                string t3 = "VAT"; // VAT
                string t4 = oDR_DatosDoc["CAB11"].ToString(); // BASE (GRAVADO)
                string t5 = oDR_DatosDoc["CAB10"].ToString(); // IGV

                string sDatosTributos = t1 + "|" + t2 + "|" + t3 + "|" + t4 + "|" + t5 + "|";
                string sNombreArchivoTri = sPath_Orbitum + @"DATA\" + ruc + "-03-" + seriecorrelativo + ".tri";
                // Fin - Datos del documento de Tributos Generales (TRI)

                // Inicio - Datos del documento de Leyendas (ley)
                string l1 = "1000";
                string l2 = enletras(oDR_DatosDoc["CAB16"].ToString()); // IGV
                if (c9 == "PEN")
                {
                    l2 += " SOLES";
                }
                else
                {
                    l2 += " DOLARES AMERICANOS";
                }
                string sDatosLeyenda = l1 + "|" + l2 + "|";
                string sNombreArchivoLeyenda = sPath_Orbitum + @"DATA\" + ruc + "-03-" + seriecorrelativo + ".ley";
                // Fin - Datos del documeento de Leyendas (ley)

                // verificar si existe archivo
                if (File.Exists(sNombreArchivo))
                {
                    File.Delete(sNombreArchivo);
                }
                if (File.Exists(sNombreArchivoDet))
                {
                    File.Delete(sNombreArchivoDet);
                }
                if (File.Exists(sNombreArchivoLeyenda))
                {
                    File.Delete(sNombreArchivoLeyenda);
                }
                if (File.Exists(sNombreArchivoTri))
                {
                    File.Delete(sNombreArchivoTri);
                }

                string sInfoDoc = sDatosCabecera;
                string sInfoDocDet = sProductoDet;
                string sInfoDocLeyenda = sDatosLeyenda;
                string sInfoDocTributos = sDatosTributos;


                // Crear el archivo
                using (FileStream oFileStream = File.Create(sNombreArchivo))
                {
                    // Add some text to file
                    Byte[] abDatosDoc = new UTF8Encoding(true).GetBytes(sInfoDoc);
                    oFileStream.Write(abDatosDoc, 0, abDatosDoc.Length);
                }

                using (FileStream oFileStream = File.Create(sNombreArchivoDet))
                {
                    // Add some text to file
                    Byte[] abDatosDocDet = new UTF8Encoding(true).GetBytes(sInfoDocDet);
                    oFileStream.Write(abDatosDocDet, 0, abDatosDocDet.Length);
                }
                using (FileStream oFileStream = File.Create(sNombreArchivoLeyenda))
                {
                    // Add some text to file
                    Byte[] abDatosDocLeyenda = new UTF8Encoding(true).GetBytes(sInfoDocLeyenda);
                    oFileStream.Write(abDatosDocLeyenda, 0, abDatosDocLeyenda.Length);
                }
                using (FileStream oFileStream = File.Create(sNombreArchivoTri))
                {
                    // Add some text to file
                    Byte[] abDatosDocTributos = new UTF8Encoding(true).GetBytes(sInfoDocTributos);
                    oFileStream.Write(abDatosDocTributos, 0, abDatosDocTributos.Length);
                }


                cEFFactura ocEFFactura = new cEFFactura("Bn");
                string sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_ANTI_FACT_BOL(p_CTLG_CODE, P_FVRANTI_CODE, "P");

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

        public void ProcesarListDoc(string p_CTLG_CODE, List<string> listDocumentos)
        {
            try
            {
                foreach (var item in listDocumentos)
                {
                    ProcesarDoc(p_CTLG_CODE, item);
                }
            }
            catch (Exception)
            {

            }
        }

        public string ProcesarDoc(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                cEFBoleta ocEFBoleta = new cEFBoleta("Bn");
                cEFFactura ocEFFactura = new cEFFactura("Bn");

                DataTable oDT_Doc = ocEFBoleta.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_Doc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }

                DataRow oDR_DatosDoc = oDT_Doc.NewRow();
                oDR_DatosDoc = oDT_Doc.Rows[0];
                string sSerieNroDoc = oDR_DatosDoc["NroSerieDoc"].ToString(); // Serie y Nro del Documento
                string factElectInd = oDR_DatosDoc["FactElecInd"].ToString();

                string rutaArchivoCSV = In_LocalPathEfact + FnGetNombreArchivo(CODIGO_SUNAT_BOLETA, sSerieNroDoc, EXTENSION_CSV);
                string rutaArchivoJSON = rutaArchivoCSV.Replace("." + EXTENSION_CSV, "." + EXTENSION_JSON);

                ConnectionSFTP connectionSFTP = new ConnectionSFTP();

                if (!string.IsNullOrEmpty(factElectInd)
                    && (factElectInd.Equals(POR_PROCESAR_IND) || factElectInd.Equals(CSV_CON_ERROR_IND) || factElectInd.Equals(CSV_GENERADO_IND) || factElectInd.Equals(CSV_ENVIADO_IND)))
                {
                    if (factElectInd.Equals(POR_PROCESAR_IND) || factElectInd.Equals(CSV_CON_ERROR_IND) || factElectInd.Equals(CSV_GENERADO_IND))
                    {
                        if (factElectInd.Equals(POR_PROCESAR_IND) || factElectInd.Equals(CSV_CON_ERROR_IND) || !File.Exists(rutaArchivoCSV))
                        {
                            FnGetBoleta(p_CTLG_CODE, p_VTAC_CODE);
                        }
                        connectionSFTP.FnSubirArchivo(rutaArchivoCSV);
                        ocEFFactura.Actualizar_ELECT_IND_FACT_BOL_EFACT(p_CTLG_CODE, p_VTAC_CODE, CSV_ENVIADO_IND);
                    }
                    if (connectionSFTP.FnExisteArchivo(Path.GetFileName(rutaArchivoJSON)))
                    {
                        var responseEFact = JsonConvert.DeserializeObject<ResponseEfact>(connectionSFTP.FnObtenerContenidoArchivo(Path.GetFileName(rutaArchivoJSON)));
                        if (responseEFact.Code.Equals("0")) ocEFFactura.Actualizar_ELECT_IND_FACT_BOL_EFACT(p_CTLG_CODE, p_VTAC_CODE, PROCESADO_IND);
                        else ocEFFactura.Actualizar_ELECT_IND_FACT_BOL_EFACT(p_CTLG_CODE, p_VTAC_CODE, CSV_CON_ERROR_IND);
                    }
                    else
                    {
                        return "[Advertencia]: El documento " + sSerieNroDoc + " ha sido enviado a EFact pero aún no es procesado.";
                    }
                }
                return "OK";
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
                cEFBoleta ocEFBoleta = new cEFBoleta("Bn");
                cEFFactura ocEFFactura = new cEFFactura("Bn");

                string tipoDocumento = p_VTAC_CODE.Substring(0, 2);

                if (tipoDocumento == "AP")
                {
                    DataTable oDT_Doc = ocEFBoleta.fnListarDocAnticipo(p_CTLG_CODE, p_VTAC_CODE);

                    DataRow oDR_DatosDoc = oDT_Doc.Rows[0];
                    string sucursal = oDR_DatosDoc["SUCURSAL"].ToString(); // Sucursal del documento
                    string sSerieNroDoc = oDR_DatosDoc["NroSerieDoc"].ToString(); // Serie y Nro del Documento   
                    string sRUC = oDR_DatosDoc["RUC"].ToString();

                    string sNombreArchivoEnvio = sPath_Orbitum + @"ENVIO\" + sRUC + "-03-" + sSerieNroDoc + ".zip";
                    string sNombreArchivoResp = sPath_Orbitum + @"RPTA\R" + sRUC + "-03-" + sSerieNroDoc + ".zip";
                    string sNombreArchivoRechazado = sPath_Orbitum + @"REPO\" + sRUC + "-03-" + sSerieNroDoc + ".xml"; // De baja por sunat - DPORTA 

                    if (File.Exists(sNombreArchivoEnvio) && File.Exists(sNombreArchivoResp))
                    {
                        sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_ANTI_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "A");

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
                        sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_ANTI_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "B"); // De baja por sunat

                        if (sRespuesta == "S")
                        {
                            sRespuesta = "RECHAZADO_SUNAT";
                        }
                        else
                        {
                            sRespuesta = "ERROR";
                        }
                    }
                    else if (!File.Exists(sNombreArchivoEnvio) && !File.Exists(sNombreArchivoResp))
                    {
                        string sNombreArchivoCab = sPath_Orbitum + @"DATA\" + sRUC + "-03-" + sSerieNroDoc + ".cab";
                        string sNombreArchivoDet = sPath_Orbitum + @"DATA\" + sRUC + "-03-" + sSerieNroDoc + ".det";

                        if (File.Exists(sNombreArchivoCab) && File.Exists(sNombreArchivoDet))
                        {
                            sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_ANTI_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "P");
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
                            string sNombreArchivoArchivoTemp = sPath_Orbitum + @"TEMP\" + sRUC + "-03-" + sSerieNroDoc + ".xml";

                            if (!File.Exists(sNombreArchivoCab) && !File.Exists(sNombreArchivoDet) && !File.Exists(sNombreArchivoResp) && !File.Exists(sNombreArchivoArchivoTemp))
                            {
                                sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_ANTI_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "X");
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
                        sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_ANTI_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "S");
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
                else
                {
                    DataTable oDT_Doc = ocEFBoleta.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);
                    DataTable oDT_DatosEmpresa = ocEFBoleta.fnListarDatosEmpresa(p_CTLG_CODE);

                    if (oDT_Doc == null)
                    {
                        throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                    }

                    DataRow oDR_DatosDoc = oDT_Doc.NewRow();
                    oDR_DatosDoc = oDT_Doc.Rows[0];
                    string sSerieNroDoc = oDR_DatosDoc["NroSerieDoc"].ToString(); // Serie y Nro del Documento

                    DataRow oDR_DatosEmpresa = oDT_DatosEmpresa.NewRow();
                    oDR_DatosEmpresa = oDT_DatosEmpresa.Rows[0];

                    string sRUC = oDR_DatosEmpresa["4C"].ToString(); // RUC DE LA EMPRESA

                    string sNombreArchivo = sPath_Orbitum + @"FIRMA\" + sRUC + "-03-" + sSerieNroDoc + ".xml";
                    string sNombreArchivoResp = sPath_Orbitum + @"RPTA\R" + sRUC + "-03-" + sSerieNroDoc + ".zip";
                    string sNombreArchivoRechazado = sPath_Orbitum + @"REPO\" + sRUC + "-03-" + sSerieNroDoc + ".xml"; // De baja por sunat - DPORTA 

                    if (File.Exists(sNombreArchivo) && File.Exists(sNombreArchivoResp))
                    {
                        sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "A");

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
                        sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "B"); // De baja por sunat

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
                        sNombreArchivo = sPath_Orbitum + @"DATA\" + sRUC + "-03-" + sSerieNroDoc + ".cab";
                        string sNombreArchivoDet = sPath_Orbitum + @"DATA\" + sRUC + "-03-" + sSerieNroDoc + ".det";

                        if (File.Exists(sNombreArchivo) && File.Exists(sNombreArchivoDet))
                        {
                            sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "P");
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

                            string sNombreArchivoArchivoTemp = sPath_Orbitum + @"TEMP\" + sRUC + "-03-" + sSerieNroDoc + ".xml";

                            if (File.Exists(sNombreArchivoArchivoTemp))
                            {
                                sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "X");
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
                        sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "S");
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


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string enletras(string num)
        {
            string res, dec = "";
            Int64 entero;
            int decimales;
            double nro;
            try
            {
                nro = Convert.ToDouble(num);
            }
            catch
            {
                return "";
            }
            entero = Convert.ToInt64(Math.Truncate(nro));
            decimales = Convert.ToInt32(Math.Round((nro - entero) * 100, 2));
            if (decimales >= 0)
            {
                dec = " CON " + decimales.ToString() + "/100";
            }

            res = toText(Convert.ToDouble(entero)) + dec;
            return res;
        }

        private string toText(double value)
        {
            string Num2Text = "";
            value = Math.Truncate(value);
            if (value == 0) Num2Text = "CERO";
            else if (value == 1) Num2Text = "UNO";
            else if (value == 2) Num2Text = "DOS";
            else if (value == 3) Num2Text = "TRES";
            else if (value == 4) Num2Text = "CUATRO";
            else if (value == 5) Num2Text = "CINCO";
            else if (value == 6) Num2Text = "SEIS";
            else if (value == 7) Num2Text = "SIETE";
            else if (value == 8) Num2Text = "OCHO";
            else if (value == 9) Num2Text = "NUEVE";
            else if (value == 10) Num2Text = "DIEZ";
            else if (value == 11) Num2Text = "ONCE";
            else if (value == 12) Num2Text = "DOCE";
            else if (value == 13) Num2Text = "TRECE";
            else if (value == 14) Num2Text = "CATORCE";
            else if (value == 15) Num2Text = "QUINCE";
            else if (value < 20) Num2Text = "DIECI" + toText(value - 10);
            else if (value == 20) Num2Text = "VEINTE";
            else if (value < 30) Num2Text = "VEINTI" + toText(value - 20);
            else if (value == 30) Num2Text = "TREINTA";
            else if (value == 40) Num2Text = "CUARENTA";
            else if (value == 50) Num2Text = "CINCUENTA";
            else if (value == 60) Num2Text = "SESENTA";
            else if (value == 70) Num2Text = "SETENTA";
            else if (value == 80) Num2Text = "OCHENTA";
            else if (value == 90) Num2Text = "NOVENTA";
            else if (value < 100) Num2Text = toText(Math.Truncate(value / 10) * 10) + " Y " + toText(value % 10);
            else if (value == 100) Num2Text = "CIEN";
            else if (value < 200) Num2Text = "CIENTO " + toText(value - 100);
            else if ((value == 200) || (value == 300) || (value == 400) || (value == 600) || (value == 800)) Num2Text = toText(Math.Truncate(value / 100)) + "CIENTOS";
            else if (value == 500) Num2Text = "QUINIENTOS";
            else if (value == 700) Num2Text = "SETECIENTOS";
            else if (value == 900) Num2Text = "NOVECIENTOS";
            else if (value < 1000) Num2Text = toText(Math.Truncate(value / 100) * 100) + " " + toText(value % 100);
            else if (value == 1000) Num2Text = "MIL";
            else if (value < 2000) Num2Text = "MIL " + toText(value % 1000);
            else if (value < 1000000)
            {
                Num2Text = toText(Math.Truncate(value / 1000)) + " MIL";
                if ((value % 1000) > 0) Num2Text = Num2Text + " " + toText(value % 1000);
            }

            else if (value == 1000000) Num2Text = "UN MILLON";
            else if (value < 2000000) Num2Text = "UN MILLON " + toText(value % 1000000);
            else if (value < 1000000000000)
            {
                Num2Text = toText(Math.Truncate(value / 1000000)) + " MILLONES ";
                if ((value - Math.Truncate(value / 1000000) * 1000000) > 0) Num2Text = Num2Text + " " + toText(value - Math.Truncate(value / 1000000) * 1000000);
            }

            else if (value == 1000000000000) Num2Text = "UN BILLON";
            else if (value < 2000000000000) Num2Text = "UN BILLON " + toText(value - Math.Truncate(value / 1000000000000) * 1000000000000);

            else
            {
                Num2Text = toText(Math.Truncate(value / 1000000000000)) + " BILLONES";
                if ((value - Math.Truncate(value / 1000000000000) * 1000000000000) > 0) Num2Text = Num2Text + " " + toText(value - Math.Truncate(value / 1000000000000) * 1000000000000);
            }
            return Num2Text;

        }


    }
}
