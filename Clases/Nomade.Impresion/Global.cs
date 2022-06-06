using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Text.RegularExpressions;
using System.Drawing.Printing;
using System.Net.Mail;
using Microsoft.VisualBasic.CompilerServices;
using System.Drawing;
using Nomade.NB;
using System.Runtime.InteropServices;

namespace Nomade.Impresion
{
   

    public class Global
    {
 
        [DllImport("Winspool.drv")]
        private static extern bool SetDefaultPrinter(string printerName);

        private Connection cn;


        //Formato formato ;
        public static Graphics gfx = null;
        Formato formato = new Formato("");
        public static List<CampoImprimir> camposImpresion = new List<CampoImprimir>();

        private List<CampoImprimir> lstEstaticoCabecera;
        private List<CampoImprimir> lstDinamicoCabecera;
        private List<CampoImprimir> lstDinamicoItem;
        private List<CampoImprimir> lstEstaticoFooter;
        private List<CampoImprimir> lstDinamicoFooter;

        public Global(string str)
        {
            this.cn = new Connection(str);
        }
        public Global()
        {
        }
        public static string GetImpresoraDefecto()
        {
            for (int i = 0; i < PrinterSettings.InstalledPrinters.Count; i++)
            {
                PrinterSettings a = new PrinterSettings();
                a.PrinterName = PrinterSettings.InstalledPrinters[i].ToString();
                if (a.IsDefaultPrinter)
                {
                    return PrinterSettings.InstalledPrinters[i].ToString();
                }
            }
            return "";
        }


        public DataTable ListarDatosImpresora(string p_DCTO_CODE, string p_CTLG_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("PFS_LISTAR_IMPRESORA_TIPO_DOCUMENTO", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                return this.cn.Consulta(newCommand) ?? (DataTable)null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        /// <summary>
        /// Agrega los datos de para impresion a la estructura lista para mandar a la impresora
        /// </summary>
        /// <param name="dtCabecera"></param>
        /// <param name="dtDetalles"></param>
        /// <param name="cltg"></param>
        /// <param name="tipoDcto"></param>
        /// <param name="impresora"></param>
        public void AgregarDetallesFormato(DataTable dtCabecera, DataTable dtDetalles, string cltg, string scsl, string tipoDcto, string impresora)
        {
            camposImpresion = new List<CampoImprimir>();
            DataTable dtFormato = new DataTable();
            //TO DO: Implementar
            //dtFormato = ObtenerFormatoDcto(cltg, tipoDcto, impresora);//Cabecera
            dtFormato = formato.ListarFormatoDcto("", cltg, scsl, tipoDcto);

            //TO DO: Validar vacio
            //Obtener campos de formato globales:
            float margenX = float.Parse(dtFormato.Rows[0]["MARGEN_X"].ToString());
            float margenY = float.Parse(dtFormato.Rows[0]["MARGEN_Y"].ToString());
            int nroItems = int.Parse(dtFormato.Rows[0]["NRO_ITEMS"].ToString());
            float espacioEntreItems = float.Parse(dtFormato.Rows[0]["ESPACIO_ITEMS"].ToString());

            //TO DO: Obtener campos a imprimir en listas separadas // DETALLES          
            CargarDetallesFormatoDcto(dtFormato);

            if (dtCabecera.Rows.Count > 0)
            {
                #region AGREGAR CAMPOS ESTÁTICOS CABECERA
                //AGREGAR CAMPOS ESTATICOS CABECERA                
                foreach (CampoImprimir ec in lstEstaticoCabecera)
                {
                    AgregarCampoAImpresion(ec);
                }
                #endregion

                #region AGREGAR CAMPOS DINÁMICOS CABECERA
                //AGREGAR CAMPOS DINAMICOS CABECERA
                foreach (DataColumn column in dtCabecera.Columns)
                {
                    foreach (CampoImprimir dc in lstDinamicoCabecera)
                    {
                        if (column.ColumnName == dc.Nombre )
                        {
                            dc.Valor = dtCabecera.Rows[0][column.ColumnName].ToString();
                            if (dc.Valor != "NO_MOSTRAR")
                            {
                                AgregarCampoAImpresion(dc);
                            }    
                            if (dc.ConvLetInd.Equals("S")) {
                                foreach (CampoImprimir dx in lstEstaticoCabecera)
                                {
                                    if ( dc.CodigoAsoc == dx.Codigo) {
                                        Numalet nm = new Numalet(false, "00/100", "con", true);
                                        string texto = (nm.ToCustomCardinal(dc.Valor)).ToUpper();
                                        dx.Valor = texto.Replace(".-", "");
                                        AgregarCampoAImpresion(dx);
                                    }
                                }
                            }
                                                 
                            break;
                        }
                    }
                }
                #endregion

                #region AGREGAR ITEMS
                //AGREGAR ITEMS
                float YActual = 0;
                float YSumaSalto = 0;
                float YSumaSaltoMaximoItem = 0;
                if (dtDetalles.Rows.Count > 0)
                {
                    for (int i = 0; i < dtDetalles.Rows.Count ; i++)
                    {
                        foreach (DataColumn column in dtDetalles.Columns)
                        {

                            foreach (CampoImprimir di in lstDinamicoItem)
                            {
                                CampoImprimir campo = new CampoImprimir();
                                campo = di.ObtenerCopia(); 
                                if (column.ColumnName == campo.Nombre )
                                {
                                    campo.Valor = dtDetalles.Rows[i][column.ColumnName].ToString();
                                    if (campo.Valor != "NO_MOSTRAR")
                                    {
                                        if (campo.Valor.Length > campo.MaximoCaracteres)
                                        {

                                            float razon = ((float)campo.Valor.Length / (float)campo.MaximoCaracteres);
                                            int nroFilas = int.Parse(Math.Ceiling(razon).ToString());
                                            string valorDividir = campo.Valor;
                                                                                        
                                            for (int k = 0; k < nroFilas; k++)
                                            {
                                                int max;
                                                if (k != nroFilas - 1)
                                                {
                                                    max = campo.MaximoCaracteres;
                                                }
                                                else
                                                {
                                                    max = valorDividir.Length;
                                                }
                                                //------------
                                                CampoImprimir c = new CampoImprimir();
                                                c = di.ObtenerCopia();
                                                c.Y =c.Y+ YActual+ YSumaSalto;
                                                c.Valor = valorDividir.Substring(0, max);
                                                AgregarCampoAImpresion(c);
                                                //------------
                                                valorDividir = valorDividir.Substring(max);
                                                YSumaSalto += espacioEntreItems;
                                                if (YSumaSalto > YSumaSaltoMaximoItem && k != 0)
                                                {
                                                    YSumaSaltoMaximoItem = YSumaSalto - espacioEntreItems;
                                                }                                               
                                            }
                                            //Agregar varios campos mientras se exceda el máximo de caracteres
                                        }
                                        else
                                        {
                                            campo.Y += YActual;
                                            AgregarCampoAImpresion(campo);
                                        }
                                    }                                  
                                    break;
                                }
                                //Resetear valores para nuevo campo del mismo detalle
                                YSumaSalto = 0;
                            }
                        }
                        //Saltos para nuevo detalle
                        YActual += espacioEntreItems+ YSumaSaltoMaximoItem;
                        YSumaSaltoMaximoItem = 0;
                    }
                   

                }
                #endregion

                //TO DO:Calcular 'Y' para sumar para filas luego de items
                float YSumar = YActual - espacioEntreItems;
                if (nroItems > 0) //Existe limitante de items
                {
                    //YSumar = YActual + espacioEntreItems;
                }
                else // No hay limite de items
                {
                    //YSumar = YActual + espacioEntreItems;
                }

                #region AGREGAR CAMPOS ESTÁTICOS FOOTER
                //AGREGAR CAMPOS ESTATICOS FOOTER
                foreach (CampoImprimir ef in lstEstaticoFooter)
                {
                    ef.Y += YSumar;
                    AgregarCampoAImpresion(ef);
                }
                #endregion

                #region AGREGAR CAMPOS DINÁMICOS FOOTER
                //AGREGAR CAMPOS DINAMICOS FOOTER
                foreach (DataColumn column in dtCabecera.Columns)
                {
                    foreach (CampoImprimir df in lstDinamicoFooter)
                    {
                        if (column.ColumnName == df.Nombre  )
                        {
                            df.Valor = dtCabecera.Rows[0][column.ColumnName].ToString();
                            if (df.Valor != "NO_MOSTRAR")
                            {
                                df.Y += YSumar;
                                AgregarCampoAImpresion(df);

                                if (df.ConvLetInd.Equals("S"))
                                {
                                    foreach (CampoImprimir dx in lstEstaticoFooter)
                                    {
                                        if (df.CodigoAsoc == dx.Codigo)
                                        {
                                            Numalet nm = new Numalet(false, "00/100", "con", true);
                                            string texto = (nm.ToCustomCardinal(df.Valor)).ToUpper();
                                            dx.Valor = texto.Replace(".-", "");
                                            AgregarCampoAImpresion(dx);
                                        }
                                    }
                                }
                            }                          
                            break;
                        }
                    }
                }
                #endregion


                ImprimirDocumento(GetImpresoraDefecto());
            }
        }

        
        public static void ImprimirDocumento(string nombreImpresora)
        {
            PrintDocument pr = new PrintDocument();
            pr.PrintController = new StandardPrintController();
            pr.PrinterSettings.PrinterName = nombreImpresora;
            pr.DocumentName = "Impresión de Comprobante";
            pr.PrintPage += new PrintPageEventHandler(pr_PrintPage);
            pr.Print();
        }

        private static void pr_PrintPage(object sender, PrintPageEventArgs e)
        {
            foreach (CampoImprimir c in camposImpresion)
            {
                e.Graphics.PageUnit = GraphicsUnit.Millimeter;
                gfx = e.Graphics;

                SolidBrush myBrush;
                try
                {
                    myBrush = new SolidBrush(Color.FromArgb(c.R, c.G, c.B));
                }
                catch (Exception)
                {
                    myBrush = new SolidBrush(Color.Black);
                }

                FontStyle font = FontStyle.Regular; 
                switch (c.FontStyle)
                {
                    case "0":
                        font = FontStyle.Regular;
                        break;
                    case "1":
                        font = FontStyle.Bold;
                        break;
                    case "2":
                        font = FontStyle.Italic;
                        break;
                    case "4":
                        font = FontStyle.Underline;
                        break;
                    case "8":
                        font = FontStyle.Strikeout;
                        break;
                    default:
                        break;
                }

                gfx.DrawString(c.Valor, new Font(c.FontFamily, c.FontSize, font), myBrush, c.X, c.Y, new StringFormat());
            }
        }

        private void AgregarCampoAImpresion(CampoImprimir c)
        {
            if (c.MaximoCaracteres > 0)
            {
                if (c.Align == "right")
                {
                    string espacios = "";
                    int spaces = c.MaximoCaracteres - c.Valor.Length;
                    for (int x = 0; x < spaces; x++)
                        espacios += " ";
                    c.Valor = espacios + c.Valor;
                }
                else if (c.Align == "center")
                {
                    string espacios = "";
                    int spaces = c.MaximoCaracteres - c.Valor.Length;
                    for (int x = 0; x < spaces/2; x++)
                        espacios += " ";                   
                    c.Valor = espacios + c.Valor + espacios;
                    if (spaces % 2 != 0)
                        c.Valor += "";
                  }
            }
            camposImpresion.Add(c);
        }

        private void CargarDetallesFormatoDcto(DataTable dtFormato)
        {
            lstEstaticoCabecera = new List<CampoImprimir>();
            lstDinamicoCabecera = new List<CampoImprimir>();
            lstDinamicoItem = new List<CampoImprimir>();
            lstEstaticoFooter = new List<CampoImprimir>();
            lstDinamicoFooter = new List<CampoImprimir>();

            DataTable dtDetalles = formato.ListarDetalleFormato("",dtFormato.Rows[0]["CODE"].ToString());

            foreach (DataRow row in dtDetalles.Rows)
            {
               
                CampoImprimir campo = new CampoImprimir();
                campo.Codigo = row["CODE"].ToString();
                campo.FontFamily = row["TIPO_LETRA"].ToString();
                campo.FontSize = float.Parse(row["TAMANIO_LETRA"].ToString());
                campo.MaximoCaracteres = int.Parse(row["LONG_MAXIMA"].ToString());
                campo.Nombre = row["NOMBRE_CAMPO"].ToString();
                campo.Tipo = row["TIPO"].ToString();
                campo.Valor = row["VALOR"].ToString();
                campo.X = float.Parse(row["VALOR_X"].ToString());
                campo.Y = float.Parse(row["VALOR_Y"].ToString());
                campo.R = int.Parse(row["RED"].ToString());
                campo.G = int.Parse(row["GREEN"].ToString());
                campo.B = int.Parse(row["BLUE"].ToString());
                campo.FontStyle = row["ESTILO_LETRA"].ToString();
                campo.Align = row["ALIGN_LETRA"].ToString();
                campo.CodigoAsoc = row["CAMPO_ASOCIADO"].ToString();
                campo.ConvLetInd = row["CONV_LET_IND"].ToString();

                switch (row["TIPO"].ToString())
                {
                    case "EC":
                        lstEstaticoCabecera.Add(campo);
                        break;
                    case "DC":
                        lstDinamicoCabecera.Add(campo);
                        break;
                    case "DI":
                        lstDinamicoItem.Add(campo);
                        break;
                    case "EF":
                        lstEstaticoFooter.Add(campo);
                        break;
                    case "DF":
                        lstDinamicoFooter.Add(campo);
                        break;
                    default:
                        break;
                }


                if (row["CONV_LET_IND"].ToString().Equals("S"))
                {
                    DataTable dt = formato.ListarDetalleFormato(row["CAMPO_ASOCIADO"].ToString(), "");
                    if (dt!= null && dt.Rows.Count > 0)
                    {
                        CampoImprimir campo2 = new CampoImprimir();
                        campo2.Codigo = dt.Rows[0]["CODE"].ToString();
                        campo2.FontFamily = dt.Rows[0]["TIPO_LETRA"].ToString();
                        campo2.FontSize = float.Parse(dt.Rows[0]["TAMANIO_LETRA"].ToString());
                        campo2.MaximoCaracteres = int.Parse(dt.Rows[0]["LONG_MAXIMA"].ToString());
                        campo2.Nombre = dt.Rows[0]["NOMBRE_CAMPO"].ToString();
                        campo2.Tipo = dt.Rows[0]["TIPO"].ToString();
                        campo2.Valor = dt.Rows[0]["VALOR"].ToString();
                        campo2.X = float.Parse(dt.Rows[0]["VALOR_X"].ToString());
                        campo2.Y = float.Parse(dt.Rows[0]["VALOR_Y"].ToString());
                        campo2.R = int.Parse(dt.Rows[0]["RED"].ToString());
                        campo2.G = int.Parse(dt.Rows[0]["GREEN"].ToString());
                        campo2.B = int.Parse(dt.Rows[0]["BLUE"].ToString());
                        campo2.FontStyle = dt.Rows[0]["ESTILO_LETRA"].ToString();
                        campo2.Align = dt.Rows[0]["ALIGN_LETRA"].ToString();
                        campo2.CodigoAsoc = dt.Rows[0]["CAMPO_ASOCIADO"].ToString();
                        campo2.ConvLetInd = dt.Rows[0]["CONV_LET_IND"].ToString();

                        switch (dt.Rows[0]["TIPO"].ToString())
                        {
                            case "EC":
                                lstEstaticoCabecera.Add(campo2);
                                break;
                            case "DC":
                                lstDinamicoCabecera.Add(campo2);
                                break;
                            case "DI":
                                lstDinamicoItem.Add(campo2);
                                break;
                            case "EF":
                                lstEstaticoFooter.Add(campo2);
                                break;
                            case "DF":
                                lstDinamicoFooter.Add(campo2);
                                break;
                            default:
                                break;
                        }
                    }
                    
                }
            }
        }
    }

    public class CampoImprimir
    {
        public string Codigo { get; set; }
        public string CodigoAsoc { get; set; }
        public string ConvLetInd { get; set; }
        public string Nombre { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
        public float FontSize { get; set; }
        public string FontFamily { get; set; } //px
        public int MaximoCaracteres { get; set; }
        public string Tipo { get; set; } //EC EstaticoCabecera, DC DinamicoCabeceram, DI DinamicoItem, EF EstaticoFooter, DF DinamicoFooter
        public string Valor { get; set; }
        //OTROS
        public string FontStyle { get; set; }
        public int R { get; set; }//RED
        public int G { get; set; }//GREEN
        public int B { get; set; }//BLUE
        public string Align { get; set; } //center,right,left

        public CampoImprimir ObtenerCopia()
        {
            CampoImprimir campo = new CampoImprimir();
            campo.Codigo = this.Codigo;
            campo.CodigoAsoc = this.CodigoAsoc;
            campo.ConvLetInd = this.ConvLetInd;
            campo.Nombre = this.Nombre;
            campo.X = this.X;
            campo.Y = this.Y;
            campo.FontSize = this.FontSize;
            campo.FontFamily = this.FontFamily;
            campo.MaximoCaracteres = this.MaximoCaracteres;
            campo.Tipo = this.Tipo;
            campo.Valor = this.Valor;
            campo.FontStyle = this.FontStyle;
            campo.R = this.R;
            campo.G = this.G;
            campo.B = this.B;
            campo.Align = this.Align;
            return campo;
        }

    }




}