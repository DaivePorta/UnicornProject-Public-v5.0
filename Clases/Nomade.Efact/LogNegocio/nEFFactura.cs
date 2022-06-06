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
    public class nEFFactura
    {
        private string sPath = ConfigurationManager.AppSettings["path_efact"];
        //private string sPath_Orbitum = ConfigurationSettings.AppSettings["path_fac_orbi"];
        private string sPath_Orbitum1 = ConfigurationManager.AppSettings["path_fac_empresa1"];
        private string sPath_Orbitum2 = ConfigurationManager.AppSettings["path_fac_empresa2"];
        private string sPath_Orbitum3 = ConfigurationManager.AppSettings["path_fac_empresa3"];
        private string sPath_Orbitum4 = ConfigurationManager.AppSettings["path_fac_empresa4"];
        private string sPath_Orbitum5 = ConfigurationManager.AppSettings["path_fac_empresa5"];
        private string sPath_Orbitum = "";

        public nEFFactura()
        {
        }

        public void fnGetFactura(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                cEFFactura ocEFFactura = new cEFFactura("Bn");
                DataTable oDT_Doc = ocEFFactura.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_Doc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el Documento en la Base de Datos");
                }

                DataRow oDR_Doc = oDT_Doc.NewRow();
                oDR_Doc = oDT_Doc.Rows[0];
                string sIndElect = oDR_Doc["FactElecInd"].ToString();
                string sSerieNro = oDR_Doc["NroSerieDoc"].ToString();

                if (!sSerieNro.Substring(0, 1).Equals("F"))
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
                

                string sMoneda = "";

                // Inicio - Datos del Documento
                DataTable oDT_DatosDoc = ocEFFactura.fnListarDatosDocumento(p_CTLG_CODE, p_VTAC_CODE);

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
                string s1E = oDR_DatosDoc["1E"].ToString(); // Monto Total IGV
                string s1F = oDR_DatosDoc["1F"].ToString(); // Monto Total IGV
                string s1G = oDR_DatosDoc["1G"].ToString(); // Tipo de Moneda (PEN, USD)

                string s1H = ""; // Monto Total ISC
                string s1I = ""; // Monto Total ISC
                string s1J = ""; // Tipo de Moneda (PEN, USD)
                string s1K = ""; // Monto Total Otros Conceptos
                string s1L = ""; // Monto Total Otros Conceptos
                string s1M = ""; // Tipo de Moneda (PEN, USD)

                string s1N = oDR_DatosDoc["1N"].ToString(); // Monto Total de la Venta
                string s1O = oDR_DatosDoc["1O"].ToString(); // Monto Total de Descuentos

                string s1P = ""; // Monto Total Otros Cargos
                string s1Q = ""; // Tipo de Operación Sunat
                string s1R = ""; // Tipo de Moneda (PEN, USD)
                string s1S = ""; // Monto Total Anticipos
                string s1T = ""; // Tipo de Documento del Anticipo
                string s1U = ""; // Serie y Nro del Anticipo

                decimal nMontoGrav = Convert.ToDecimal(oDR_DatosDoc["1V"]);
                string s1V = "";
                if (nMontoGrav != 0)
                    s1V = oDR_DatosDoc["1V"].ToString(); //Monto Total Gravadas

                decimal nMontoInaf = Convert.ToDecimal(oDR_DatosDoc["1W"]);
                string s1W = "";
                if (nMontoGrav != 0)
                    s1W = oDR_DatosDoc["1W"].ToString(); // Monto Total Inafectas

                decimal nMontoExon = Convert.ToDecimal(oDR_DatosDoc["1X"]);
                string s1X = "";
                if(nMontoExon != 0)
                    s1X = oDR_DatosDoc["1X"].ToString(); // Monto Total Exoneradas

                decimal nMontoGrat = Convert.ToDecimal(oDR_DatosDoc["1Y"]);
                string s1Y = "";
                if (nMontoGrat != 0)
                    s1Y = oDR_DatosDoc["1Y"].ToString(); // Monto Total Gratuitas

                string s1Z = oDR_DatosDoc["1Z"].ToString(); // Sub Total del Valor de la Venta

                decimal nBasePercep = Convert.ToDecimal(oDR_DatosDoc["1AA"]);
                string s1AA = "";
                if(nBasePercep != 0)
                    s1AA = nBasePercep.ToString(); // Base Imponible Percepción
                string s1AB = "";
                if (nBasePercep != 0)
                    s1AB = oDR_DatosDoc["1AB"].ToString(); // Monto Total de la Percepción
                string s1AC = "";
                if (nBasePercep != 0)
                    s1AC = oDR_DatosDoc["1AC"].ToString(); // Monto Total Cobrado de la Percepción

                decimal nMontoReten = Convert.ToDecimal(oDR_DatosDoc["1AD"]);
                string s1AD = "";
                if (nMontoReten != 0)
                    s1AD = oDR_DatosDoc["1AD"].ToString(); // Monto Total de la Retención

                decimal nMontoDetrac = Convert.ToDecimal(oDR_DatosDoc["1AE"]);
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

                string s1AI = ""; // Monto Total de Bonificaciones
                string s1AJ = ""; // Monto Total de los Descuentos
                string s1AK = ""; // Monto FISE (Fondo de Inclusión Social Energético)

               string sDatosDoc = s1A + "," + s1B + "," + s1C + "," + s1D + "," + s1E + "," + s1F + "," + s1G + "," +
                    s1H + "," + s1I + "," + s1J + "," + s1K + "," + s1L + "," + s1M + "," + s1N + "," + s1O + "," +
                    s1P + "," + s1Q + "," + s1R + "," + s1S + "," + s1T + "," + s1U + "," + s1V + "," + s1W + "," +
                    s1X + "," + s1Y + "," + s1Z + "," + s1AA + "," + s1AB + "," + s1AC + "," + s1AD + "," + s1AE + "," +
                    s1AF + "," + s1AG + "," + s1AH + "," + s1AI + "," + s1AJ + "," + s1AK;
                // Fin - Datos del Documento

                // Inicio - Punto de Partida
                DataTable oDT_PuntoPartida = ocEFFactura.fnListarPuntoPartida(p_CTLG_CODE, p_VTAC_CODE);
                
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
                string s2M = "";

                string s2N = "";
                string s2O = "";

                string s2P = "";
                string s2Q = "";
                string s2R = "";
                string s2S = "";
                string s2T = "";
                string s2U = "";
                if (oDT_PuntoPartida != null)
                {
                    DataRow oDR_PtoPartida = oDT_PuntoPartida.NewRow();
                    oDR_PtoPartida = oDT_PuntoPartida.Rows[0];

                    s2A = oDR_PtoPartida["2A"].ToString(); // Código de Ubigeo del Punto de Partida
                    s2A = fnCortarCadena(s2A, 100);

                    s2B = oDR_PtoPartida["2B"].ToString(); // Dirección Completa del Punto de Partida
                    s2B = fnCortarCadena(s2B, 100);

                    s2C = oDR_PtoPartida["2C"].ToString(); // Urbanización del Punto de Partida
                    s2C = fnCortarCadena(s2C, 30);

                    s2D = oDR_PtoPartida["2D"].ToString(); // Provincia del Punto de Partida
                    s2D = fnCortarCadena(s2D, 30);

                    s2E = oDR_PtoPartida["2E"].ToString(); // Departamento del Punto de Partida
                    s2E = fnCortarCadena(s2E, 30);

                    s2F = oDR_PtoPartida["2F"].ToString(); // Distrito del Punto de Partida
                    s2F = fnCortarCadena(s2F, 30);

                    s2G = oDR_PtoPartida["2G"].ToString(); // Código de País del Punto de Partida


                    s2H = oDR_PtoPartida["2H"].ToString(); // Código de Ubigeo del Punto de Llegada
                    s2H = fnCortarCadena(s2H, 100);

                    s2I = oDR_PtoPartida["2I"].ToString(); // Dirección Completa del Punto de Llegada
                    s2I = fnCortarCadena(s2I, 100);

                    s2J = oDR_PtoPartida["2J"].ToString(); // Urbanización del Punto de Llegada
                    s2J = fnCortarCadena(s2J, 30);

                    s2K = oDR_PtoPartida["2K"].ToString(); // Provincia del Punto de Llegada
                    s2K = fnCortarCadena(s2K, 30);

                    s2L = oDR_PtoPartida["2L"].ToString(); // Departamento del Punto de Llegada
                    s2L = fnCortarCadena(s2L, 30);

                    s2M = oDR_PtoPartida["2M"].ToString(); // Distrito del Punto de Llegada
                    s2M = fnCortarCadena(s2M, 30);

                    s2N = oDR_PtoPartida["2N"].ToString(); // Código de País del Punto de Llegada


                    s2O = oDR_PtoPartida["2O"].ToString(); // Placa del Vehículo
                    s2O = fnCortarCadena(s2O, 10);

                    s2P = oDR_PtoPartida["2P"].ToString(); ; // Número de Autorización del Vehículo
                    s2P = fnCortarCadena(s2P, 100);

                    s2Q = oDR_PtoPartida["2Q"].ToString(); ; // Marca del Vehículo
                    s2Q = fnCortarCadena(s2Q, 50);

                    s2R = oDR_PtoPartida["2R"].ToString(); ; // Número de Licencia del Conductor
                    s2R = fnCortarCadena(s2R, 30);

                    s2S = oDR_PtoPartida["2S"].ToString(); ; // Número de RUC del Transportista

                    s2T = oDR_PtoPartida["2T"].ToString(); ; // Tipo de Documento de Identidad del Transportista

                    s2U = oDR_PtoPartida["2U"].ToString(); ; // Razón Social del Transportista
                    s2U = fnCortarCadena(s2U, 100);

                }
                string sPuntoPartida = s2A + "," + s2B + "," + s2C + "," + s2D + "," + s2E + "," + s2F + "," + s2G + "," +
                    s2H + "," + s2I + "," + s2J + "," + s2K + "," + s2L + "," + s2M + "," + s2N + "," + s2O + "," +
                    s2P + "," + s2Q + "," + s2R + "," + s2S + "," + s2T + "," + s2U;
                // Fin - Punto de Partida

                // Inicio - Guía de Remisión
                DataTable oDT_GuiaRemision = ocEFFactura.fnListarGuiaRemision(p_CTLG_CODE, p_VTAC_CODE);

                string s3A = "";
                string s3B = "";
                string s3C = "";
                string s3D = "";
                string s3E = "";
                if (oDT_GuiaRemision != null)
                {
                    DataRow oDR_GuiaRemision = oDT_GuiaRemision.NewRow();
                    oDR_GuiaRemision = oDT_GuiaRemision.Rows[0];

                    s3A = oDR_GuiaRemision["3A"].ToString(); // Número de la Guía de Remisión

                    s3B = oDR_GuiaRemision["3B"].ToString(); // Código Sunat del Tipo Documento (Guía de Remisión)

                    s3C = oDR_GuiaRemision["3C"].ToString(); // Número de Documento de Referencia

                    s3D = oDR_GuiaRemision["3D"].ToString(); // Código del Tipo de Operación

                    s3E = oDR_GuiaRemision["3E"].ToString(); // Documento Adjunto
                }
                string sGuiaRemision = s3A + "," + s3B + "," + s3C + "," + s3D + "," + s3E;
                // Fin - Guía de Remisión

                // Inicio - Datos de la Empresa
                DataTable oDT_DatosEmpresa = ocEFFactura.fnListarDatosEmpresa(p_CTLG_CODE);

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
                if (oDT_DatosEmpresa != null)
                {
                    DataRow oDR_DatosEmpresa = oDT_DatosEmpresa.NewRow();
                    oDR_DatosEmpresa = oDT_DatosEmpresa.Rows[0];

                    s4A = oDR_DatosEmpresa["4A"].ToString(); // Razón Social de la Empresa
                    s4A = fnCortarCadena(s4A, 100);

                    s4B = oDR_DatosEmpresa["4B"].ToString(); // Nombre Comercial de la Empresa
                    s4B = fnCortarCadena(s4B, 100);

                    s4C = oDR_DatosEmpresa["4C"].ToString(); // Nro de RUC de la Empresa

                    s4D = oDR_DatosEmpresa["4D"].ToString(); // Código Ubigeo de la Empresa

                    s4E = oDR_DatosEmpresa["4E"].ToString(); // Dirección de la Empresa

                    s4F = oDR_DatosEmpresa["4F"].ToString(); // Urbanización de la Empresa

                    s4G = oDR_DatosEmpresa["4G"].ToString(); // Departamento de la Empresa

                    s4H = oDR_DatosEmpresa["4H"].ToString(); // Provincia de la Empresa

                    s4I = oDR_DatosEmpresa["4I"].ToString(); // Distrito de la Empresa

                    s4J = oDR_DatosEmpresa["4J"].ToString(); // Código País de la Empresa

                    s4K = oDR_DatosEmpresa["4K"].ToString(); // Usuario SOL de la Empresa

                    s4L = oDR_DatosEmpresa["4L"].ToString(); // Clave SOL de la Empresa
                }
                string sDatosEmpresa = s4A + "," + s4B + "," + s4C + "," + s4D + "," + s4E + "," + s4F + "," + s4G + "," + 
                    s4H + "," + s4I + "," + s4J + "," + s4K + "," + s4L;
                // Fin - Datos de la Empresa

                // Inicio - Datos del Cliente
                DataTable oDT_DatosCliente = ocEFFactura.fnListarDatosCliente(p_CTLG_CODE, p_VTAC_CODE);

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
                string s5L = "";
                if (oDT_DatosCliente != null)
                {
                    DataRow oDR_DatosCliente = oDT_DatosCliente.NewRow();
                    oDR_DatosCliente = oDT_DatosCliente.Rows[0];

                    s5A = oDR_DatosCliente["5A"].ToString(); // Nro de RUC del Cliente
                    s5A = fnCortarCadena(s5A, 15);

                    s5B = oDR_DatosCliente["5B"].ToString(); // Tipo Documento del Cliente

                    s5C = oDR_DatosCliente["5C"].ToString(); // Razón Social del Cliente

                    s5D = oDR_DatosCliente["5D"].ToString(); // Nombre Comercial del Cliente

                    s5E = oDR_DatosCliente["5E"].ToString(); // Código Ubigeo del Cliente

                    s5F = oDR_DatosCliente["5F"].ToString(); // Dirección del Cliente

                    s5G = ""; // Urbanización del Cliente

                    s5H = oDR_DatosCliente["5H"].ToString(); // Departamento del Cliente

                    s5I = oDR_DatosCliente["5I"].ToString(); // Provincia del Cliente

                    s5J = oDR_DatosCliente["5J"].ToString(); // Distrito del Cliente

                    s5K = oDR_DatosCliente["5K"].ToString(); // País del Cliente

                    s5L = oDR_DatosCliente["5L"].ToString(); // Correo del Cliente
                }
                string sDatosCliente = s5A + "," + s5B + "," + s5C + "," + s5D + "," + s5E + "," + s5F + "," + s5G + "," +
                    s5H + "," + s5I + "," + s5J + "," + s5K + "," + s5L;
                // Fin - Datos del Cliente

                // Inicio - Leyenda Sunat
                Numalet oNumalet = new Numalet(false, "00/100", "con", true);
                decimal nTotalVenta = Convert.ToDecimal(s1N);
                string sNumalet = oNumalet.ToCustomCardinal(nTotalVenta) + " " + sMoneda;
                sNumalet = sNumalet.ToUpper();

                string s6A = sNumalet; // Monto en Letras
                s6A = fnCortarCadena(s6A, 100);
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
                string s6AF = "";
                string s6AG = "";
                string s6AH = "";
                string s6AI = "";
                string s6AJ = "";
                string s6AK = "";

                string sLeyendaSunat = s6A + "," + s6B + "," + s6C + "," + s6D + "," + s6E + "," + s6F + "," + s6G + "," +
                     s6H + "," + s6I + "," + s6J + "," + s6K + "," + s6L + "," + s6M + "," + s6N + "," + s6O + "," +
                     s6P + "," + s6Q + "," + s6R + "," + s6S + "," + s6T + "," + s6U + "," + s6V + "," + s6W + "," +
                     s6X + "," + s6Y + "," + s6Z + "," + s6AA + "," + s6AB + "," + s6AC + "," + s6AD + "," + s6AE + "," +
                     s6AF + "," + s6AG + "," + s6AH + "," + s6AI + "," + s6AJ + "," + s6AK;
                // Fin - Leyenda Sunat

                // Inicio - Información Adicional
                string s7A = "";
                string s7B = "";
                string s7C = "";
                string s7D = "";
                string s7E = "";
                string s7F = "";
                string s7G = "";

                string s7H = "";
                string s7I = "";
                string s7J = "";
                string s7K = "";
                string s7L = "";
                string s7M = "";

                string s7N = "";
                string s7O = "";

                string s7P = "";
                string s7Q = "";
                string s7R = "";
                string s7S = "";
                string s7T = "";
                string s7U = "";

                string s7V = "";
                string s7W = "";
                string s7X = "";
                string s7Y = "";
                string s7Z = "";

                string s7AA = "";
                string s7AB = "";
                string s7AC = "";
                string s7AD = "";

                string sInfAdicional = s7A + "," + s7B + "," + s7C + "," + s7D + "," + s7E + "," + s7F + "," + s7G + "," +
                     s7H + "," + s7I + "," + s7J + "," + s7K + "," + s7L + "," + s7M + "," + s7N + "," + s7O + "," +
                     s7P + "," + s7Q + "," + s7R + "," + s7S + "," + s7T + "," + s7U + "," + s7V + "," + s7W + "," +
                     s7X + "," + s7Y + "," + s7Z + "," + s7AA + "," + s7AB + "," + s7AC + "," + s7AD;
                // Fin - Información Adicional

                // Inicio - Datos del Producto
                DataTable oDT_DatosProd = ocEFFactura.fnListarDatosProducto(p_CTLG_CODE, p_VTAC_CODE);

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
                foreach(DataRow oDR in oDT_DatosProd.Rows)
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
                
                string sNombreArchivo = sPath + @"in\invoice\" + "01" +s1B + ".csv";
                // verificar si existe archivo
                if (File.Exists(sNombreArchivo))
                {
                    File.Delete(sNombreArchivo);
                }

                string sDelimitador = "FF00FF";

                string sInfoDoc = sDatosDoc + ((char)10) + sPuntoPartida + ((char)10) + sGuiaRemision + ((char)10) + sDatosEmpresa +
                    ((char)10) + sDatosCliente + ((char)10) + sLeyendaSunat + ((char)10) + sInfAdicional + ((char)10) + sProductoDet + 
                    ((char)10) + sDelimitador;


                // Crear el archivo
                using (FileStream oFileStream = File.Create(sNombreArchivo))
                {
                    // Add some text to file
                    Byte[] abDatosDoc = new UTF8Encoding(true).GetBytes(sInfoDoc);
                    oFileStream.Write(abDatosDoc, 0, abDatosDoc.Length);                    
                }

                string sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "P");
                
            }
            catch (Exception ex)
            {
                throw(ex);
            }
        }


        public void fnGetFacturaOrbitum(string p_CTLG_CODE, string p_VTAC_CODE)
        {
            try
            {
                if (p_CTLG_CODE == "N")
                {
                    sPath_Orbitum = sPath_Orbitum1;
                }
                else
                {
                    if(p_CTLG_CODE == "O")
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
                cEFFactura ocEFFactura = new cEFFactura("Bn");
                DataTable oDT_Doc = ocEFFactura.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_Doc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el Documento en la Base de Datos");
                }

                DataRow oDR_Doc = oDT_Doc.NewRow();
                oDR_Doc = oDT_Doc.Rows[0];
                string sIndElect = oDR_Doc["FactElecInd"].ToString();
                string sSerieNro = oDR_Doc["NroSerieDoc"].ToString();

                if (!sSerieNro.Substring(0, 1).Equals("F"))
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

                // Inicio - Datos del Documento Cabecera (cab)
                DataTable oDT_DatosDoc = ocEFFactura.fnListarDatosDocumentoOrbitum(p_CTLG_CODE, p_VTAC_CODE);
                
                DataRow oDR_DatosDoc = oDT_DatosDoc.Rows[0];
                
                if (oDT_DatosDoc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }
                
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
                    sNombreArchivoAnticipo = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".rel";
                }
                // Fin - Datos del Documento rel

                // Inicio - Verificar si el documento tiene anticipos y si hay crear el contenido del txt (ACV)
                string sDatosAnticipoACV = "";
                string sNombreArchivoAnticipoACV = "";
                if (oDR_DatosDoc["IND_ANTICIPO"].ToString() != "0")
                {
                    DataTable oDT_DatosAnticipoACV = ocEFFactura.fnListarDatosACVAnticipoOrbitum(p_CTLG_CODE, p_VTAC_CODE);
                    bool enterAnticipo = false;
                    foreach (DataRow oDRAnticiposACV in oDT_DatosAnticipoACV.Rows)
                    {
                        if (enterAnticipo) sDatosAnticipoACV += ((char)10);
                        string acv1 = oDRAnticiposACV["ACV1"].ToString(); 
                        string acv2 = oDRAnticiposACV["ACV2"].ToString(); 
                        string acv3 = oDRAnticiposACV["ACV3"].ToString(); 
                        string acv4 = oDRAnticiposACV["ACV4"].ToString(); 
                        string acv5 = oDRAnticiposACV["ACV5"].ToString(); 
                        string acv6 = oDRAnticiposACV["ACV6"].ToString(); 
                        string acv7 = oDRAnticiposACV["ACV7"].ToString(); 

                        sDatosAnticipoACV += acv1 + "|" + acv2 + "|" + acv3 + "|" + acv4 + "|" + acv5 + "|" + acv6 + "|" + acv7 + "|";
                    }
                    sNombreArchivoAnticipoACV = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".acv";
                }
                // Fin - Datos del Documento ACV

                // Inicio - Datos del Detalle (DET)
                DataTable oDT_DatosProd = ocEFFactura.fnListarDatosProductoOrbitum(p_CTLG_CODE, p_VTAC_CODE);

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

                string sNombreArchivo = sPath_Orbitum + @"DATA\"+ ruc + "-01-" + seriecorrelativo + ".cab";
                string sNombreArchivoDet = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".det";

                // Inicio - Datos del documento de Tributos Generales (TRI)
                string t1 = "1000"; // tipo de tributo
                string t2 = "IGV"; // IGV
                string t3 = "VAT"; // VAT
                string t4 = oDR_DatosDoc["CAB11"].ToString(); // BASE (GRAVADO)
                string t5 = oDR_DatosDoc["CAB10"].ToString(); // IGV

                string sDatosTributos = t1 + "|" + t2 + "|" + t3 + "|" + t4 + "|" + t5 + "|";
                string sNombreArchivoTri = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".tri";
                // Fin - Datos del documento de Tributos Generales (TRI)

                // Inicio - Datos del documento de Leyendas (ley)
                string sDatosLeyenda = "";
                if (oDR_DatosDoc["DETRACCION_IND"].ToString() == "SI" && oDR_DatosDoc["AUTODETRACCION"].ToString() == "NO")
                {
                    string l1 = "2006";
                    string l2 = "OPERACIÓN SUJETA A DETRACCIÓN"; // IGV

                    sDatosLeyenda = l1 + "|" + l2 + "|";
                }
                else
                {
                string l1 = "1000";
                string l2 = enletras(oDR_DatosDoc["CAB16"].ToString()) ; // IGV
                if (c9 == "PEN")
                {
                    l2 += " SOLES";
                    }
                    else
                {
                    l2 += " DOLARES AMERICANOS";
                }
                    sDatosLeyenda = l1 + "|" + l2 + "|";
                }
                //string l1 = "1000"; COMENTADO
                //string l2 = enletras(oDR_DatosDoc["CAB16"].ToString()); // IGV
                //if (c9 == "PEN")
                //{
                //    l2 += " SOLES";
                //}
                //else
                //{
                //    l2 += " DOLARES AMERICANOS";
                //}
                //sDatosLeyenda = l1 + "|" + l2 + "|";
                string sNombreArchivoLeyenda = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".ley";
                // Fin - Datos del documeento de Leyendas (ley)

                // Inicio - Datos del modo pago (pag) DPORTA 29/11/2021
                string mp1 = oDR_DatosDoc["MODO_PAGO"].ToString(); // modo de pago
                string mp2 = oDR_DatosDoc["MONTO_NETO_PENDIENTE"].ToString(); // monto pendiente, por defecto es -        
                string mp3 = oDR_DatosDoc["CAB9"].ToString(); // moneda, por defecto es -

                string sDatosModoPago = mp1 + "|" + mp2 + "|" + mp3 + "|";
                string sNombreArchivoModoPago = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".pag";
                // Fin - Datos del modo pago (pag)

                // Inicio - Datos del modo pago detalle (dpa) DPORTA 29/11/2021
                string sModoPagoDet = "";
                if (oDR_DatosDoc["MODO_PAGO"].ToString() == "Credito") 
                {
                    DataTable oDT_DatosModoPagoDet = ocEFFactura.fnListarDatosModoPagoOrbitum(p_CTLG_CODE, p_VTAC_CODE);

                    if (oDT_DatosModoPagoDet == null)
                    {
                        throw new ArgumentException("[Advertencia]: No se encontró datos del modo de pago");
                    }

                    bool bIndicadorDet = false;

                    foreach (DataRow oDR in oDT_DatosModoPagoDet.Rows)
                    {
                        if (bIndicadorDet) sModoPagoDet += ((char)10);

                        string mpd1 = oDR["MONTO"].ToString(); // CODIGO DE UNIDAD DE MEDIDA POR ITEM
                        string mpd2 = oDR["FECHA"].ToString(); // CANTIDAD POR ITEM
                        string mpd3 = oDR["MONEDA"].ToString();

                        sModoPagoDet += mpd1 + "|" + mpd2 + "|" + mpd3 + "|";

                        bIndicadorDet = true;
                    }
                }

                string sNombreArchivoModoPagoDet = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".dpa";
                // Fin - Datos del modo pago Detalle (dpa)

                // Inicio - Datos adicionales a la cabecera (aca) DPORTA 30/11/2021
                string sAdicionalCab = "";
                if (oDR_DatosDoc["DETRACCION_IND"].ToString() == "SI" && oDR_DatosDoc["AUTODETRACCION"].ToString() == "NO")
                {
                    DataTable oDT_DatosAdicionalCab = ocEFFactura.fnListarDatosAdicionalCabOrbitum(p_CTLG_CODE, p_VTAC_CODE);

                    if (oDT_DatosAdicionalCab == null)
                    {
                        throw new ArgumentException("[Advertencia]: No existe cuenta de detracción registrada");
                    }

                    bool bIndicadorAdCab = false;

                    foreach (DataRow oDR in oDT_DatosAdicionalCab.Rows)
                    {
                        if (bIndicadorAdCab) sAdicionalCab += ((char)10);

                        string mac1 = oDR["NRO_CUENTA_DETRA"].ToString(); // Cuenta del banco de la nacion (detraccion)
                        string mac2 = oDR["CODIGO_BIEN"].ToString(); // Codigo del bien o producto sujeto a detracción 
                        string mac3 = oDR["PORCENTAJE_DETRA"].ToString(); // Porcentaje de la detracción
                        string mac4 = oDR["MONTO_DETRACCION"].ToString(); // Monto de la detracción
                        string mac5 = oDR["MEDIO_PAGO"].ToString(); // Medio de pago
                        string mac6 = oDR["DIRECCION_CLIENTE"].ToString(); // Dirección del cliente (Código de país)
                        string mac7 = oDR["UBIGEO"].ToString(); // Dirección del cliente (Código de ubigeo)
                        string mac8 = oDR["DIRECCION"].ToString(); //Dirección del cliente(Dirección completa y detallada)
                        string mac9 = oDR["CODIGO_PAIS_ENTREGA_BIEN"].ToString(); //Código de país en el que se entrega el bien o se presta el servicio
                        string mac10 = oDR["UBIGEO_PAIS_ENTREGA_BIEN"].ToString(); //Código de ubigeo en el que se entrega el bien o se presta el servicio
                        string mac11 = oDR["DIRECCION_ENTREGA_BIEN"].ToString(); //Dirección completa y detallada en el que se entrega el bien o se presta el servicio

                        sAdicionalCab += mac1 + "|" + mac2 + "|" + mac3 + "|" + mac4 + "|" + mac5 + "|" + mac6 + "|" + mac7 + "|" + mac8 + "|" + mac9 + "|" + mac10 + "|" + mac11 + "|";

                        bIndicadorAdCab = true;
                    }
                }

                string sNombreArchivoAdicionalCab = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".aca";
                // Fin - Datos Adicional Cab (aca)

                // verificar si existe archivo
                if (File.Exists(sNombreArchivo))
                {
                    File.Delete(sNombreArchivo);
                }
                if (File.Exists(sNombreArchivoDet))
                {
                    File.Delete(sNombreArchivoDet);
                }
                //if (File.Exists(sNombreArchivoLeyenda)) COMENTADO
                //{
                //    File.Delete(sNombreArchivoLeyenda);
                //}
                if (File.Exists(sNombreArchivoTri))
                {
                    File.Delete(sNombreArchivoTri);
                }
                if (File.Exists(sNombreArchivoModoPago)) // pag
                {
                    File.Delete(sNombreArchivoModoPago);
                }

                string sInfoDoc = sDatosCabecera;
                string sInfoDocDet = sProductoDet;
                //tring sInfoDocLeyenda = sDatosLeyenda; COMENTADO
                string sInfoDocTributos = sDatosTributos;
                string sInfoDocModoPago = sDatosModoPago; // pag

                // Crear los archivos
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
                //using (FileStream oFileStream = File.Create(sNombreArchivoLeyenda)) COMENTADO
                //{
                //    // Add some text to file
                //    Byte[] abDatosDocLeyenda = new UTF8Encoding(true).GetBytes(sInfoDocLeyenda);
                //    oFileStream.Write(abDatosDocLeyenda, 0, abDatosDocLeyenda.Length);
                //}
                using (FileStream oFileStream = File.Create(sNombreArchivoTri))
                {
                    // Add some text to file
                    Byte[] abDatosDocTributos = new UTF8Encoding(true).GetBytes(sInfoDocTributos);
                    oFileStream.Write(abDatosDocTributos, 0, abDatosDocTributos.Length);
                }

                using (FileStream oFileStream = File.Create(sNombreArchivoModoPago)) // pag
                {
                    // Add some text to file
                    Byte[] abDatosDocModoPago = new UTF8Encoding(true).GetBytes(sInfoDocModoPago);
                    oFileStream.Write(abDatosDocModoPago, 0, abDatosDocModoPago.Length);
                }

                if (sDatosLeyenda.Length > 0 && sNombreArchivoLeyenda.Length > 0) // ley
                {
                    if (File.Exists(sNombreArchivoLeyenda))
                    {
                        File.Delete(sNombreArchivoLeyenda);
                    }
                    string sInfoLeyenda = sDatosLeyenda;
                    using (FileStream oFileStream = File.Create(sNombreArchivoLeyenda))
                    {
                        // Add some text to file
                        Byte[] abDatosLeyenda = new UTF8Encoding(true).GetBytes(sInfoLeyenda);
                        oFileStream.Write(abDatosLeyenda, 0, abDatosLeyenda.Length);
                    }
                }

                if (sModoPagoDet.Length > 0 && sNombreArchivoModoPagoDet.Length > 0) // dpa
                {
                    if (File.Exists(sNombreArchivoModoPagoDet))
                    {
                        File.Delete(sNombreArchivoModoPagoDet);
                    }
                    string sInfoModoPagoDet = sModoPagoDet;
                    using (FileStream oFileStream = File.Create(sNombreArchivoModoPagoDet))
                    {
                        // Add some text to file
                        Byte[] abDatosModoPagoDet = new UTF8Encoding(true).GetBytes(sInfoModoPagoDet);
                        oFileStream.Write(abDatosModoPagoDet, 0, abDatosModoPagoDet.Length);
                    }
                }

                //para las detracciones (ADICIONALES A CABECERA)
                if (sAdicionalCab.Length > 0 && sNombreArchivoAdicionalCab.Length > 0) // aca
                {
                    if (File.Exists(sNombreArchivoAdicionalCab))
                    {
                        File.Delete(sNombreArchivoAdicionalCab);
                    }
                    string sInfoModoAdicionalCab = sAdicionalCab;
                    using (FileStream oFileStream = File.Create(sNombreArchivoAdicionalCab))
                    {
                        // Add some text to file
                        Byte[] abDatosAdicionalCab = new UTF8Encoding(true).GetBytes(sInfoModoAdicionalCab);
                        oFileStream.Write(abDatosAdicionalCab, 0, abDatosAdicionalCab.Length);
                    }
                }

                // Crear archivo anticipo si existen
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

                if (sDatosAnticipoACV.Length > 0 && sNombreArchivoAnticipoACV.Length > 0)
                {
                    if (File.Exists(sNombreArchivoAnticipoACV))
                    {
                        File.Delete(sNombreArchivoAnticipoACV);
                    }
                    string sInfoAnticipoACV = sDatosAnticipoACV;
                    using (FileStream oFileStream = File.Create(sNombreArchivoAnticipoACV))
                    {
                        // Add some text to file
                        Byte[] abDatosAnticipoACV = new UTF8Encoding(true).GetBytes(sInfoAnticipoACV);
                        oFileStream.Write(abDatosAnticipoACV, 0, abDatosAnticipoACV.Length);
                    }
                }
                //string sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "P");
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public void fnGetFacturaAnticipoOrbitum(string p_CTLG_CODE, string P_FVRANTI_CODE)
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
                cEFFactura ocEFFactura = new cEFFactura("Bn");

                DataTable oDT_Doc = ocEFFactura.fnListarDocAnticipo(p_CTLG_CODE, P_FVRANTI_CODE);

                if (oDT_Doc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró el Documento en la Base de Datos");
                }

                DataRow oDR_Doc = oDT_Doc.Rows[0];
                string sIndElect = oDR_Doc["FactElecInd"].ToString();
                string sSerieNro = oDR_Doc["NroSerieDoc"].ToString();

                if (!sSerieNro.Substring(0, 2).Equals("FE"))
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

                // Inicio DATOS DE LA CABECERA
                DataTable oDT_DatosDoc = ocEFFactura.fnListarDatosFacturaAnticipoOrbitum(p_CTLG_CODE, P_FVRANTI_CODE);
                
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


                // Inicio - Datos del Detalle (DET)


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

                string sNombreArchivo = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".cab";
                string sNombreArchivoDet = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".det";

                // Inicio - Datos del documento de Tributos Generales (TRI)
                string t1 = "1000"; // tipo de tributo
                string t2 = "IGV"; // IGV
                string t3 = "VAT"; // VAT
                string t4 = oDR_DatosDoc["CAB11"].ToString(); // BASE (GRAVADO)
                string t5 = oDR_DatosDoc["CAB10"].ToString(); // IGV

                string sDatosTributos = t1 + "|" + t2 + "|" + t3 + "|" + t4 + "|" + t5 + "|";
                string sNombreArchivoTri = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".tri";
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
                string sNombreArchivoLeyenda = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".ley";
                // Fin - Datos del documeento de Leyendas (ley)
                // Inicio - Datos del modo pago (pag) DPORTA 29/11/2021
                string mp1 = oDR_DatosDoc["MODO_PAGO"].ToString(); // modo de pago
                string mp2 = oDR_DatosDoc["MONTO_NETO_PENDIENTE"].ToString(); // monto pendiente, por defecto es -        
                string mp3 = oDR_DatosDoc["CAB9"].ToString(); // moneda, por defecto es -

                string sDatosModoPago = mp1 + "|" + mp2 + "|" + mp3 + "|";
                string sNombreArchivoModoPago = sPath_Orbitum + @"DATA\" + ruc + "-01-" + seriecorrelativo + ".pag";
                // Fin - Datos del modo pago (pag)

                // verificar si existe archivo
                if (File.Exists(sNombreArchivo))
                {
                    File.Delete(sNombreArchivo);
                }

                if (File.Exists(sNombreArchivoDet))
                {
                    File.Delete(sNombreArchivoDet);
                }
                if (File.Exists(sNombreArchivoTri))
                {
                    File.Delete(sNombreArchivoTri);
                }
                if (File.Exists(sNombreArchivoModoPago)) // pag
                {
                    File.Delete(sNombreArchivoModoPago);
                }
                if (File.Exists(sNombreArchivoLeyenda))
                {
                    File.Delete(sNombreArchivoLeyenda);
                }

                string sInfoDoc = sDatosCabecera;
                string sInfoDocDet = sProductoDet;
                string sInfoDocModoPago = sDatosModoPago; // pag

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

                using (FileStream oFileStream = File.Create(sNombreArchivoTri))
                {
                    // Add some text to file
                    Byte[] abDatosDocDet = new UTF8Encoding(true).GetBytes(sDatosTributos);
                    oFileStream.Write(abDatosDocDet, 0, abDatosDocDet.Length);
                }

                using (FileStream oFileStream = File.Create(sNombreArchivoModoPago)) // pag
                {
                    // Add some text to file
                    Byte[] abDatosDocModoPago = new UTF8Encoding(true).GetBytes(sInfoDocModoPago);
                    oFileStream.Write(abDatosDocModoPago, 0, abDatosDocModoPago.Length);
                }

                using (FileStream oFileStream = File.Create(sNombreArchivoLeyenda))
                {
                    // Add some text to file
                    Byte[] abDatosDocDet = new UTF8Encoding(true).GetBytes(sDatosLeyenda);
                    oFileStream.Write(abDatosDocDet, 0, abDatosDocDet.Length);
                }

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
                if(iLongCadena > iTamMax)
                    sResultado = sCadena.Substring(0, iTamMax);
                return sResultado;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string fnVerificarDoc(string p_CTLG_CODE, string p_VTAC_CODE) 
        {
			string sRespuesta = "";
			try
            {
                cEFFactura ocEFFactura = new cEFFactura("Bn");
                
                DataTable oDT_Doc = ocEFFactura.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

                if (oDT_Doc == null)
                {
                    throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                }

                DataRow oDR_DatosDoc = oDT_Doc.NewRow();
                oDR_DatosDoc = oDT_Doc.Rows[0];
                string sSerieNroDoc = oDR_DatosDoc["NroSerieDoc"].ToString(); // Serie y Nro del Documento
               

                string sNombreArchivo = sPath + @"out\invoice\" + "01" + sSerieNroDoc + ".xml";
                if (File.Exists(sNombreArchivo))
				{
					string sRutaArchivo = sNombreArchivo;
					sRutaArchivo = sRutaArchivo.Replace(".xml", ".zip");
					bool bUpLoadOk = false;
					try
					{
						Nomade.Efact.Conexion.Conexion oConexion = new Nomade.Efact.Conexion.Conexion();
						oConexion.fnSubirArchivo(sRutaArchivo);
						bUpLoadOk = true;
					}
					catch (Exception)
					{

					}
					if (bUpLoadOk)
					{
						sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "S");
                        sRespuesta = "OK";
					}
					else
					{
						sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "P");
					}
				}
                else
                {
                    sNombreArchivo = sPath + @"in\invoice\" + "01" + sSerieNroDoc + ".csv";
                    if (File.Exists(sNombreArchivo))
                    {
                        sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "P");
                    }
                    else
                    {
                        sNombreArchivo = sPath + @"err\invoice\" + "01" + sSerieNroDoc + ".csv";
                        if (File.Exists(sNombreArchivo))
                        {
                            sRespuesta = ocEFFactura.fnActualizar_ELECT_IND_FACT_BOL(p_CTLG_CODE, p_VTAC_CODE, "X");
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
                cEFFactura ocEFFactura = new cEFFactura("Bn");

                string tipoDocumento = p_VTAC_CODE.Substring(0, 2);

                if (tipoDocumento == "AP"){
                    // Verificar Anticipo
                    DataTable oDT_Doc = ocEFFactura.fnListarDocAnticipo(p_CTLG_CODE, p_VTAC_CODE);
                    if (oDT_Doc == null)
                    {
                        throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                    }

                    DataRow oDR_DatosDoc = oDT_Doc.Rows[0];
                    string sucursal = oDR_DatosDoc["SUCURSAL"].ToString(); // Sucursal del documento
                    string sSerieNroDoc = oDR_DatosDoc["NroSerieDoc"].ToString(); // Serie y Nro del Documento   
                    string sRUC = oDR_DatosDoc["RUC"].ToString();

                    string sNombreArchivo = sPath_Orbitum + @"FIRMA\" + sRUC + "-01-" + sSerieNroDoc + ".xml";
                    string sNombreArchivoResp = sPath_Orbitum + @"RPTA\R" + sRUC + "-01-" + sSerieNroDoc + ".zip";
                    string sNombreArchivoRechazado = sPath_Orbitum + @"REPO\" + sRUC + "-01-" + sSerieNroDoc + ".xml"; // De baja por sunat - DPORTA 

                    if (File.Exists(sNombreArchivo) && File.Exists(sNombreArchivoResp))
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
                    else if (!File.Exists(sNombreArchivo) && !File.Exists(sNombreArchivoResp))
                    {
                        sNombreArchivo = sPath_Orbitum + @"DATA\" + sRUC + "-01-" + sSerieNroDoc + ".cab";
                        string sNombreArchivoDet = sPath_Orbitum + @"DATA\" + sRUC + "-01-" + sSerieNroDoc + ".det";

                        if (File.Exists(sNombreArchivo) && File.Exists(sNombreArchivoDet))
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
                            string sNombreArchivoArchivoTemp = sPath_Orbitum + @"TEMP\" + sRUC + "-01-" + sSerieNroDoc + ".xml";

                            if (File.Exists(sNombreArchivoArchivoTemp))
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
                    else if (File.Exists(sNombreArchivo) && !File.Exists(sNombreArchivoResp))
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
                    // Verificar Documento Venta
                    DataTable oDT_Doc = ocEFFactura.fnListarDoc(p_CTLG_CODE, p_VTAC_CODE);

                    DataTable oDT_DatosEmpresa = ocEFFactura.fnListarDatosEmpresa(p_CTLG_CODE);

                    if (oDT_Doc == null || oDT_DatosEmpresa == null)
                    {
                        throw new ArgumentException("[Advertencia]: No se encontró los datos del Documento");
                    }

                    DataRow oDR_DatosDoc = oDT_Doc.Rows[0];
                    string sSerieNroDoc = oDR_DatosDoc["NroSerieDoc"].ToString(); // Serie y Nro del Documento

                    DataRow oDR_DatosEmpresa = oDT_DatosEmpresa.Rows[0];

                    string sRUC = oDR_DatosEmpresa["4C"].ToString();

                    string sNombreArchivo = sPath_Orbitum + @"FIRMA\" + sRUC + "-01-" + sSerieNroDoc + ".xml";
                    string sNombreArchivoResp = sPath_Orbitum + @"RPTA\R" + sRUC + "-01-" + sSerieNroDoc + ".zip";
                    string sNombreArchivoRechazado = sPath_Orbitum + @"REPO\" + sRUC + "-01-" + sSerieNroDoc + ".xml"; // De baja por sunat - DPORTA 

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
                        sNombreArchivo = sPath_Orbitum + @"DATA\" + sRUC + "-01-" + sSerieNroDoc + ".cab";
                        string sNombreArchivoDet = sPath_Orbitum + @"DATA\" + sRUC + "-01-" + sSerieNroDoc + ".det";

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
                            string sNombreArchivoArchivoTemp = sPath_Orbitum + @"TEMP\" + sRUC + "-01-" + sSerieNroDoc + ".xml";

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
