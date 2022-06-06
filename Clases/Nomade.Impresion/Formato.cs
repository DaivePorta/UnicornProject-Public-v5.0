using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Text.RegularExpressions;
using System.Drawing.Printing;
using System.Net.Mail;
using Microsoft.VisualBasic.CompilerServices;
namespace Nomade.Impresion
{
    public class Formato
    {
        private Connection cn;
        Hashtable estructura;
        public Formato(String str)
        {
             this.cn = new Connection(str);
            estructura = new Hashtable();
        }

        public Hashtable generarEstructura(string catalogo, string tipo)
        {
            try
            {
                estructura = new Hashtable();
                int margen_vertical = -98;
                int margen_horizontal = -86;

                if (catalogo.Equals("N"))
                {
                    if (tipo.Equals("GUIA_REMISION"))
                    {
                        estructura.Add("txt_impr_fecha1x", '"' + (margen_horizontal + 63) + '"');//fecha de emicion
                        estructura.Add("txt_impr_fecha1y", '"' + (margen_vertical + 60) + '"');//60

                        estructura.Add("txt_impr_fecha2x", '"' + (margen_horizontal + 103) + '"');//fecha transaccion
                        estructura.Add("txt_impr_fecha2y", '"' + (margen_vertical + 60) + '"');

                        estructura.Add("txt_impr_dir_partx_1", '"' + (margen_horizontal + 40) + '"');//direcion partida
                        estructura.Add("txt_impr_dir_party_1", '"' + (margen_vertical + 72) + '"');
                        estructura.Add("txt_impr_dir_partx_2", '"' + (margen_horizontal + 40) + '"');//direcion partida segunda Linea
                        estructura.Add("txt_impr_dir_party_2", '"' + (margen_vertical + 72) + '"');

                        estructura.Add("txt_impr_dir_llegx_1", '"' + (margen_horizontal + 40) + '"');//direcion de llegada
                        estructura.Add("txt_impr_dir_llegy_1", '"' + (margen_vertical + 77) + '"');
                        estructura.Add("txt_impr_dir_llegx_2", '"' + (margen_horizontal + 40) + '"');//direcion de llegada segunda linea
                        estructura.Add("txt_impr_dir_llegy_2", '"' + (margen_vertical + 80) + '"');

                        estructura.Add("txt_impr_marplacax", '"' + (margen_horizontal + 35) + '"');//marca -nro
                        estructura.Add("txt_impr_marplacay", '"' + (margen_vertical + 60) + '"');

                        estructura.Add("txt_impr_nroinscrpx", '"' + (margen_horizontal + 10) + '"');//nro  inscripcion
                        estructura.Add("txt_impr_nroinscrpy", '"' + (margen_vertical + 90) + '"');

                        estructura.Add("txt_impr_nrolicodx", '"' + (margen_horizontal + 70) + '"');//nro licencia conductor
                        estructura.Add("txt_impr_nrolicody", '"' + (margen_vertical + 20) + '"');

                        estructura.Add("txt_impr_choferx", '"' + (margen_horizontal + 20) + '"');//nombre chofer
                        estructura.Add("txt_impr_chofery", '"' + (margen_vertical + 100) + '"');

                        estructura.Add("txt_impr_nomrazdestx_1", '"' + (margen_horizontal + 26) + '"');//nombre razon social destino
                        estructura.Add("txt_impr_nomrazdesty_1", '"' + (margen_vertical + 65) + '"');
                        estructura.Add("txt_impr_nomrazdestx_2", '"' + (margen_horizontal + 26) + '"');//nombre razon social destino segunda linea
                        estructura.Add("txt_impr_nomrazdesty_2", '"' + (margen_vertical + 68) + '"');

                        estructura.Add("txt_impr_tiponumdocdesx", '"' + (margen_horizontal + 100) + '"');// tipo -
                        estructura.Add("txt_impr_tiponumdocdesy", '"' + (margen_vertical + 100) + '"');

                        estructura.Add("txt_impr_nomraztranspx", '"' + (margen_horizontal + 100) + '"');//nombre razon social transportista
                        estructura.Add("txt_impr_nomraztranspy", '"' + (margen_vertical + 120) + '"');

                        estructura.Add("txt_impr_nrorucx", '"' + (margen_horizontal + 103) + '"');// nro ruc llegada
                        estructura.Add("txt_impr_nrorucy", '"' + (margen_vertical + 66) + '"');

                        estructura.Add("textBox_ImpCanMC", "0");
                        estructura.Add("textBox_ImpPreMC", "0");
                        estructura.Add("textBox_ImpAliMC", "0");
                        estructura.Add("textBox_ImpBivMC", "0");
                        estructura.Add("textBox_ImpImpMC", "0");
                        estructura.Add("textBox_ImpDetMC", "50");

                        estructura.Add("txt_impr_cantx", '"' + (margen_horizontal + 30) + '"');//cantidad
                        estructura.Add("txt_impr_canty", '"' + (margen_vertical + 105) + '"');

                        estructura.Add("txt_impr_ImpDetx", '"' + (margen_horizontal + 88) + '"');//descripcion producto
                        estructura.Add("txt_impr_ImpDety", '"' + (margen_vertical + 105) + '"');

                        estructura.Add("txt_impr_preciox", '"' + (margen_horizontal + 60) + '"');//precio /// unidades
                        estructura.Add("txt_impr_precioy", '"' + (margen_vertical + 105) + '"');
                        estructura.Add("txt_impr_ImpAlix", '"' + (margen_horizontal + 0) + '"');
                        estructura.Add("txt_impr_ImpAliy", '"' + (margen_vertical + 0) + '"');
                        estructura.Add("txt_impr_ImpBivx", '"' + (margen_horizontal + 0) + '"');
                        estructura.Add("txt_impr_ImpBivy", '"' + (margen_vertical + 0) + '"');
                        estructura.Add("txt_impr_ImpImpx", '"' + (margen_horizontal + 140) + '"');//impórte total 
                        estructura.Add("txt_impr_ImpImpy", '"' + (margen_vertical + 105) + '"');


                        estructura.Add("txt_impr_tipo_docx", '"' + (margen_horizontal + 140) + '"');//boleta - factura
                        estructura.Add("txt_impr_tipo_docy", '"' + (margen_vertical + 140) + '"');

                        estructura.Add("txt_impr_nro_docx", '"' + (margen_horizontal + 173) + '"');//nro-doc
                        estructura.Add("txt_impr_nro_docy", '"' + (margen_vertical + 77) + '"');

                        estructura.Add("txt_impr_nro_docguix", '"' + (margen_horizontal + 145) + '"');//nro-doc
                        estructura.Add("txt_impr_nro_docguiy", '"' + (margen_vertical + 68) + '"');
                    }
                }
                if (catalogo.Equals("O"))
                {
                    if (tipo.Equals("GUIA_REMISION"))
                    {
                        estructura.Add("txt_impr_fecha1x", '"' + (margen_horizontal + 63) + '"');//fecha de emicion
                        estructura.Add("txt_impr_fecha1y", '"' + (margen_vertical + 60) + '"');//60

                        estructura.Add("txt_impr_fecha2x", '"' + (margen_horizontal + 103) + '"');//fecha transaccion
                        estructura.Add("txt_impr_fecha2y", '"' + (margen_vertical + 60) + '"');

                        estructura.Add("txt_impr_dir_partx_1", '"' + (margen_horizontal + 40) + '"');//direcion partida
                        estructura.Add("txt_impr_dir_party_1", '"' + (margen_vertical + 72) + '"');
                        estructura.Add("txt_impr_dir_partx_2", '"' + (margen_horizontal + 40) + '"');//direcion partida segunda Linea
                        estructura.Add("txt_impr_dir_party_2", '"' + (margen_vertical + 72) + '"');

                        estructura.Add("txt_impr_dir_llegx_1", '"' + (margen_horizontal + 40) + '"');//direcion de llegada
                        estructura.Add("txt_impr_dir_llegy_1", '"' + (margen_vertical + 77) + '"');
                        estructura.Add("txt_impr_dir_llegx_2", '"' + (margen_horizontal + 40) + '"');//direcion de llegada segunda linea
                        estructura.Add("txt_impr_dir_llegy_2", '"' + (margen_vertical + 80) + '"');

                        estructura.Add("txt_impr_marplacax", '"' + (margen_horizontal + 35) + '"');//marca -nro
                        estructura.Add("txt_impr_marplacay", '"' + (margen_vertical + 60) + '"');

                        estructura.Add("txt_impr_nroinscrpx", '"' + (margen_horizontal + 10) + '"');//nro  inscripcion
                        estructura.Add("txt_impr_nroinscrpy", '"' + (margen_vertical + 90) + '"');

                        estructura.Add("txt_impr_nrolicodx", '"' + (margen_horizontal + 70) + '"');//nro licencia conductor
                        estructura.Add("txt_impr_nrolicody", '"' + (margen_vertical + 20) + '"');

                        estructura.Add("txt_impr_choferx", '"' + (margen_horizontal + 20) + '"');//nombre chofer
                        estructura.Add("txt_impr_chofery", '"' + (margen_vertical + 100) + '"');

                        estructura.Add("txt_impr_nomrazdestx_1", '"' + (margen_horizontal + 25) + '"');//nombre razon social destino
                        estructura.Add("txt_impr_nomrazdesty_1", '"' + (margen_vertical + 65) + '"');
                        estructura.Add("txt_impr_nomrazdestx_2", '"' + (margen_horizontal + 25) + '"');//nombre razon social destino segunda linea
                        estructura.Add("txt_impr_nomrazdesty_2", '"' + (margen_vertical + 68) + '"');

                        estructura.Add("txt_impr_tiponumdocdesx", '"' + (margen_horizontal + 100) + '"');// tipo -
                        estructura.Add("txt_impr_tiponumdocdesy", '"' + (margen_vertical + 100) + '"');

                        estructura.Add("txt_impr_nomraztranspx", '"' + (margen_horizontal + 100) + '"');//nombre razon social transportista
                        estructura.Add("txt_impr_nomraztranspy", '"' + (margen_vertical + 120) + '"');

                        estructura.Add("txt_impr_nrorucx", '"' + (margen_horizontal + 103) + '"');// nro ruc llegada
                        estructura.Add("txt_impr_nrorucy", '"' + (margen_vertical + 66) + '"');

                        estructura.Add("textBox_ImpCanMC", "0");
                        estructura.Add("textBox_ImpPreMC", "0");
                        estructura.Add("textBox_ImpAliMC", "0");
                        estructura.Add("textBox_ImpBivMC", "0");
                        estructura.Add("textBox_ImpImpMC", "0");
                        estructura.Add("textBox_ImpDetMC", "50");

                        estructura.Add("txt_impr_cantx", '"' + (margen_horizontal + 30) + '"');//cantidad
                        estructura.Add("txt_impr_canty", '"' + (margen_vertical + 105) + '"');

                        estructura.Add("txt_impr_ImpDetx", '"' + (margen_horizontal + 88) + '"');//descripcion producto
                        estructura.Add("txt_impr_ImpDety", '"' + (margen_vertical + 105) + '"');

                        estructura.Add("txt_impr_preciox", '"' + (margen_horizontal + 60) + '"');//precio /// unidades
                        estructura.Add("txt_impr_precioy", '"' + (margen_vertical + 105) + '"');
                        estructura.Add("txt_impr_ImpAlix", '"' + (margen_horizontal + 0) + '"');
                        estructura.Add("txt_impr_ImpAliy", '"' + (margen_vertical + 0) + '"');
                        estructura.Add("txt_impr_ImpBivx", '"' + (margen_horizontal + 0) + '"');
                        estructura.Add("txt_impr_ImpBivy", '"' + (margen_vertical + 0) + '"');
                        estructura.Add("txt_impr_ImpImpx", '"' + (margen_horizontal + 140) + '"');//impórte total 
                        estructura.Add("txt_impr_ImpImpy", '"' + (margen_vertical + 105) + '"');


                        estructura.Add("txt_impr_tipo_docx", '"' + (margen_horizontal + 140) + '"');//boleta - factura
                        estructura.Add("txt_impr_tipo_docy", '"' + (margen_vertical + 140) + '"');

                        estructura.Add("txt_impr_nro_docx", '"' + (margen_horizontal + 173) + '"');//nro-doc
                        estructura.Add("txt_impr_nro_docy", '"' + (margen_vertical + 77) + '"');

                        estructura.Add("txt_impr_nro_docguix", '"' + (margen_horizontal + 145) + '"');//nro-doc
                        estructura.Add("txt_impr_nro_docguiy", '"' + (margen_vertical + 68) + '"');
                    }
                }
            }
            catch (Exception)
            {
                estructura = null;
            }
            return estructura;
        
        }

        public Array RegistraFormatoimp(string p_CTLG_CODE, string p_SCSL_CODE, string p_DCTO_CODE, string p_IMPR_CODE, string p_DESCRIPCION,
       string p_NRO_ITEMS, string p_ESPACIO_ITEMS, string p_MARG_X, string p_MARG_Y, string P_ANCHO = "0", string P_ALTO = "0", string P_UNME = "", string P_IMAG = "")
        {
            string[] strArray = new string[3];
            try
            {

                IDbCommand newCommand = this.cn.GetNewCommand("GTF_CREAR_FORMATO_DCTO", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NRO_ITEMS", p_NRO_ITEMS, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_ESPACIO_ITEMS", p_ESPACIO_ITEMS, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_MARGENX", p_MARG_X, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_MARGENY", p_MARG_Y, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CODE_AUTOG", string.Empty, ParameterDirection.Output, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@P_IMAG", P_IMAG, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@P_ALTO", P_ALTO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@P_ANCHO", P_ANCHO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@P_UNME", P_UNME, ParameterDirection.Input, (DbType)253, 0));
                IDbCommand dbCommand = this.cn.Ejecuta_parms(newCommand);
                strArray[0] = Conversions.ToString(NewLateBinding.LateGet(dbCommand.Parameters["@p_CODE_AUTOG"], null, "Value", new object[0], (string[])null, (Type[])null, (bool[])null));
                strArray[1] = "OK";
            }
            catch (Exception ex)
            {
                strArray[0] = "FALLO";
                throw ex;                
            }
            return strArray;
        }

        public Array ActualizarFormatoimp(string p_CODE, string p_CTLG_CODE, string p_SCSL_CODE, string p_DCTO_CODE, string p_IMPR_CODE, string p_DESCRIPCION,
       string p_NRO_ITEMS, string p_ESPACIO_ITEMS, string p_MARG_X, string p_MARG_Y, string p_ESTADO_IND, string P_ANCHO = "0", string P_ALTO = "0", string P_UNME = "", string P_IMAG = "")
        {
            string[] strArray = new string[3];
            try
            {

                IDbCommand newCommand = this.cn.GetNewCommand("GTF_ACTUALIZAR_CONFIGURACION_DCTO", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NRO_ITEMS", p_NRO_ITEMS, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_ESPACIO_ITEMS", p_ESPACIO_ITEMS, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_MARGENX", p_MARG_X, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_MARGENY", p_MARG_Y, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@P_IMAG", P_IMAG, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@P_ALTO", P_ALTO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@P_ANCHO", P_ANCHO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@P_UNME", P_UNME, ParameterDirection.Input, (DbType)253, 0));
                IDbCommand dbCommand = this.cn.Ejecuta_parms(newCommand);
                strArray[0] = "OK";

            }
            catch (Exception ex)
            {
                strArray[0] = "FALLO";
                throw ex;
                
            }
            return strArray;
        }

        public Array RegistraDetalleFormatoimp(string p_GTFMDOC_CODE, string p_NOMBRE_CAMPO, string p_VALOR_X, string p_VALOR_Y, string p_LONG_MAXIMA,
        string p_DESCRIPCION, string p_TIPO_LETRA, string p_TAMANIO_LETRA, string p_TIPO, string p_CAMPO_ASOCIADO, string p_VALOR, string p_ESTILO_LETRA, string p_RED, string p_GREEN, string p_BLUE, string p_ALIGN_LETRA, string p_CONV_LETRAS_IND)
        {
            string[] strArray = new string[2];
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("GTF_CREAR_DETALLE_CONFIGURACION_DCTO", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_GTFMDOC_CODE", p_GTFMDOC_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NOMBRE_CAMPO", p_NOMBRE_CAMPO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VALOR_X", p_VALOR_X, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VALOR_Y", p_VALOR_Y, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_LONG_MAXIMA", p_LONG_MAXIMA, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_TIPO_LETRA", p_TIPO_LETRA, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_TAMANIO_LETRA", p_TAMANIO_LETRA, ParameterDirection.Input, (DbType)253, 0));
                //
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CAMPO_ASOCIADO", p_CAMPO_ASOCIADO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_ESTILO_LETRA", p_ESTILO_LETRA, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_RED", p_RED, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_GREEN", p_GREEN, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_BLUE", p_BLUE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_ALIGN_LETRA", p_ALIGN_LETRA, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CONV_LETRAS_IND", p_CONV_LETRAS_IND, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_RESPUESTA", string.Empty, ParameterDirection.Output, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CODIGO", string.Empty, ParameterDirection.Output, (DbType)253, 0));

                IDbCommand dbCommand = this.cn.Ejecuta_parms(newCommand);
                strArray[0] =((IDataParameter) newCommand.Parameters["@p_RESPUESTA"]).Value.ToString();
                strArray[1] =((IDataParameter)newCommand.Parameters["@p_CODIGO"]).Value.ToString(); 
            }
            catch (Exception ex)
            {
                strArray[0] = "FALLO";
                strArray[1] = ex.Message;
            }
            return strArray;
        }

        public Array ActualizarDetalleFormatoimp(string p_CODE, string p_GTFMDOC_CODE, string p_NOMBRE_CAMPO, string p_VALOR_X, string p_VALOR_Y,
        string p_LONG_MAXIMA, string p_DESCRIPCION, string p_TIPO_LETRA, string p_TAMANIO_LETRA, string p_ESTADO_IND, string p_TIPO, string p_CAMPO_ASOCIADO, string p_VALOR, string p_ESTILO_LETRA, string p_RED, string p_GREEN, string p_BLUE, string p_ALIGN_LETRA)
        {
            string[] strArray = new string[2];
            try
            {

                IDbCommand newCommand = this.cn.GetNewCommand("GTF_ACTUALIZAR_DETALLE_CONFIGURACION", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_GTFMDOC_CODE", p_GTFMDOC_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_NOMBRE_CAMPO", p_NOMBRE_CAMPO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VALOR_X", p_VALOR_X, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VALOR_Y", p_VALOR_Y, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_LONG_MAXIMA", p_LONG_MAXIMA, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_TIPO_LETRA", p_TIPO_LETRA, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_TAMANIO_LETRA", p_TAMANIO_LETRA, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, (DbType)253, 0));
                //
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CAMPO_ASOCIADO", p_CAMPO_ASOCIADO, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_ESTILO_LETRA", p_ESTILO_LETRA, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_RED", p_RED, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_GREEN", p_GREEN, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_BLUE", p_BLUE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_ALIGN_LETRA", p_ALIGN_LETRA, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_RESPUESTA", string.Empty, ParameterDirection.Output, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CODIGO", string.Empty, ParameterDirection.Output, (DbType)253, 0));


                IDbCommand dbCommand = this.cn.Ejecuta_parms(newCommand);
                strArray[0] = ((IDataParameter)newCommand.Parameters["@p_RESPUESTA"]).Value.ToString();
                strArray[1] = ((IDataParameter)newCommand.Parameters["@p_CODIGO"]).Value.ToString(); 

            }
            catch (Exception ex)
            {
                strArray[0] = "FALLO";
                strArray[1] = ex.Message;
            }
            return strArray;
        }

        public Array EliminarDetalleFormatoimp(string p_CODE)
        {
            string[] strArray = new string[3];
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("GTF_ELIMINAR_DETALLE_FORMATO", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, (DbType)253, 0));
                IDbCommand dbCommand = this.cn.Ejecuta_parms(newCommand);
                strArray[0] = "OK";

            }
            catch (Exception ex)
            {
                strArray[0] = "FALLO";
                throw ex;                
            }
            return strArray;
        }

        public DataTable ListarDetalleFormato(string p_CODE, string p_CODE_CAB, string p_tipo = "")
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("GTF_LISTAR_DETALLE_FORMATO_DCTO", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_GTFMDOC_CODE", p_CODE_CAB, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_TIPO_CAMPO", p_tipo, ParameterDirection.Input, (DbType)253, 0));
                return this.cn.Consulta(newCommand) ?? (DataTable)null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable ListarFormatoDcto(string p_CODE, string p_CTLG_CODE, string p_SCSL_CODE, string p_DCTO_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("GTF_LISTAR_FORMATO_DCTO", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, (DbType)253, 0));
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, (DbType)253, 0));
                return this.cn.Consulta(newCommand) ?? (DataTable)null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable ListarProcedimientosFormatoDcto(string p_DCTO_CODE)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("GTF_LISTAR_PROCEDIMIENTOS_FORMATO_DCTO", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, (DbType)253, 0));
                return this.cn.Consulta(newCommand) ?? (DataTable)null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable EjecutarProcedimientoFormatoDcto(string p_PROCEDIMIENTO)
        {
            try
            {
                IDbCommand newCommand = this.cn.GetNewCommand("GTF_EJECUTAR_PROCEDIMIENTOS_FORMATOS", CommandType.StoredProcedure);
                newCommand.Parameters.Add(this.cn.GetNewParameter("@p_PROCEDURE", p_PROCEDIMIENTO, ParameterDirection.Input, (DbType)253, 0));
                return this.cn.Consulta(newCommand) ?? (DataTable)null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
