using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Drawing.Printing;
using System.Runtime.InteropServices;

namespace Nomade.Impresion
{
    public class Documento
    {
       

        String[,] datos = new String[100, 3];
        String[,] items = new String[1000, 6];
        int contador_datos = 0;
        int contador_items = 0;
        int contador = 1;
        int posItemsY = 0;

        Font printFont = null;
        SolidBrush myBrush = new SolidBrush(Color.Black);
        string fontName = "Courier New";
        public int fontSize = 11;
        public int espacioEntreItems = 5;
        Graphics gfx = null;

        public Hashtable estructura_doc = new Hashtable();
        public Documento(Hashtable estructuradoc)
        {
            estructura_doc = estructuradoc;
        }

        public bool PrinterExists(string impresora)
        {
            foreach (String strPrinter in PrinterSettings.InstalledPrinters)
            {
                if (impresora == strPrinter)
                    return true;
            }
            return false;
        }

        public void PrintFactura(string impresora)
        {
            printFont = new Font(fontName, fontSize, FontStyle.Regular);
            PrintDocument pr = new PrintDocument();
            pr.PrinterSettings.PrinterName = impresora;
            pr.DocumentName = "Impresion de Comprobante";
            pr.PrintPage += new PrintPageEventHandler(pr_PrintPage);
            pr.Print();
        }

        private void pr_PrintPage(Object sender, PrintPageEventArgs e)
        {
            e.Graphics.PageUnit = GraphicsUnit.Millimeter;
            gfx = e.Graphics;
            DrawDatos();
            DrawItems();
        }

        private void DrawDatos()
        {
            for (int i = 0; i < contador_datos; i++)
            {
                int PosX = int.Parse(datos[i, 1].ToString());
                int PosY = int.Parse(datos[i, 2].ToString());
                gfx.DrawString(datos[i, 0], printFont, myBrush, PosX, PosY, new StringFormat());
            }
        }

        private void DrawItems()
        {
            for (int i = 0; i < contador_items; i++)
            {
                int PosX = int.Parse(items[i, 1]);
                int PosY = int.Parse(items[i, 2]);
                gfx.DrawString(items[i, 0], printFont, myBrush, PosX, PosY + posItemsY, new StringFormat());
                if (contador == 6)
                {
                    posItemsY += espacioEntreItems; //incremento en 4 milimitros para la proxima linea
                    contador = 0;
                }
                contador++;
            }
        }

        public void AddDatos(string datoTexto, string PosX, string PosY)
        {
            datos[contador_datos, 0] = datoTexto;
            datos[contador_datos, 1] = PosX;
            datos[contador_datos, 2] = PosY;
            contador_datos++;
        }

        public void AddItems(string AdditemTexto)
        {
            string[] itemsDatos = AdditemTexto.Split(',');
            try
            {
                items[contador_items, 0] = AlignRightText(itemsDatos[0].Length, int.Parse(estructura_doc["textBox_ImpCanMC"].ToString())) + CompletarLetras(itemsDatos[0], 6);
                items[contador_items, 1] = estructura_doc["txt_impr_cantx"].ToString();
                items[contador_items, 2] = estructura_doc["txt_impr_canty"].ToString();
                contador_items++;

                items[contador_items, 0] = AlignRightText(itemsDatos[2].Length, int.Parse(estructura_doc["textBox_ImpPreMC"].ToString())) + CompletarLetras(itemsDatos[2], 9);
                items[contador_items, 1] = estructura_doc["txt_impr_preciox"].ToString();
                items[contador_items, 2] = estructura_doc["txt_impr_precioy"].ToString();
                contador_items++;

                items[contador_items, 0] = AlignRightText(itemsDatos[3].Length, int.Parse(estructura_doc["textBox_ImpAliMC"].ToString())) + itemsDatos[3];
                items[contador_items, 1] = estructura_doc["txt_impr_ImpAlix"].ToString();
                items[contador_items, 2] = estructura_doc["txt_impr_ImpAliy"].ToString();
                contador_items++;

                items[contador_items, 0] = AlignRightText(itemsDatos[4].Length, int.Parse(estructura_doc["textBox_ImpBivMC"].ToString())) + itemsDatos[4];
                items[contador_items, 1] = estructura_doc["txt_impr_ImpBivx"].ToString();
                items[contador_items, 2] = estructura_doc["txt_impr_ImpBivy"].ToString();
                contador_items++;
                items[contador_items, 0] = AlignRightText(itemsDatos[5].Length, int.Parse(estructura_doc["textBox_ImpImpMC"].ToString())) + CompletarLetras(itemsDatos[5], 10);
                items[contador_items, 1] = estructura_doc["txt_impr_ImpImpx"].ToString();
                items[contador_items, 2] = estructura_doc["txt_impr_ImpImpy"].ToString();

                // Se evalua la Cadena para ver si es necesario hacer un salto de linea
                DivideItemDet(itemsDatos[1].Length, int.Parse(estructura_doc["textBox_ImpDetMC"].ToString()), itemsDatos[1]);
                contador_items++;
            }
            catch (Exception) { }
        }

        private string AlignRightText(int lenght, int maxChar)
        {
            string espacios = "";
            int spaces = maxChar - lenght;
            for (int x = 0; x < spaces; x++)
                espacios += " ";
            return espacios;
        }

        private string CompletarLetras(string item, int maxChar)
        {
            int spaces = maxChar - item.Count();
            for (int x = 0; x < spaces; x++)
                item = " " + item;
            return item;
        }

        private void DivideItemDet(int lenghtDet, int maxCharDet, string detalleText)
        {
            if (lenghtDet > maxCharDet)
            {
                string[] splitDetalle = detalleText.Split(' ');
                string linea = "";
                int i = 0;
                int contador_lineas = 0;
                string cadena_compara = "";
                while (i < splitDetalle.Length)
                {
                    while ((cadena_compara.Length <= maxCharDet) && (i < splitDetalle.Length))
                    {
                        cadena_compara = linea;
                        cadena_compara += splitDetalle[i];
                        if (cadena_compara.Length <= maxCharDet)
                        {
                            linea += splitDetalle[i] + " ";
                            i++;
                        }
                    }
                    
                    if (contador_lineas < 1)
                    {
                        contador_items++;
                        items[contador_items, 0] = linea;
                        items[contador_items, 1] = estructura_doc["txt_impr_ImpDetx"].ToString();
                        items[contador_items, 2] = estructura_doc["txt_impr_ImpDety"].ToString();
                        contador_lineas++;
                        linea = "";
                        cadena_compara = "";
                    }
                    else
                    {
                        contador_items++;
                        items[contador_items, 0] = "";
                        items[contador_items, 1] = estructura_doc["txt_impr_cantx"].ToString();
                        items[contador_items, 2] = estructura_doc["txt_impr_canty"].ToString();
                        contador_items++;
                        items[contador_items, 0] = linea;
                        items[contador_items, 1] = estructura_doc["txt_impr_ImpDetx"].ToString();
                        items[contador_items, 2] = estructura_doc["txt_impr_ImpDety"].ToString();
                        contador_items++;
                        items[contador_items, 0] = "";
                        items[contador_items, 1] = estructura_doc["txt_impr_preciox"].ToString();
                        items[contador_items, 2] = estructura_doc["txt_impr_precioy"].ToString();
                        contador_items++;
                        items[contador_items, 0] = "";
                        items[contador_items, 1] = estructura_doc["txt_impr_ImpAlix"].ToString();
                        items[contador_items, 2] = estructura_doc["txt_impr_ImpAliy"].ToString();
                        contador_items++;
                        items[contador_items, 0] = "";
                        items[contador_items, 1] = estructura_doc["txt_impr_ImpBivx"].ToString();
                        items[contador_items, 2] = estructura_doc["txt_impr_ImpBivy"].ToString();
                        contador_items++;
                        items[contador_items, 0] = "";
                        items[contador_items, 1] = estructura_doc["txt_impr_ImpImpx"].ToString();
                        items[contador_items, 2] = estructura_doc["txt_impr_ImpImpy"].ToString();
                        linea = "";
                        cadena_compara = "";
                    }
                }
            }
            else
            {
                contador_items++;
                items[contador_items, 0] = detalleText;
                items[contador_items, 1] = estructura_doc["txt_impr_ImpDetx"].ToString();
                items[contador_items, 2] = estructura_doc["txt_impr_ImpDety"].ToString();
            }
        
    }
    }
}
