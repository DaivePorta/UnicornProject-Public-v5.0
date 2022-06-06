<%@ WebHandler Language="VB" Class="AFCIPFR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class AFCIPFR : Implements IHttpHandler
    
    Dim opcion As String
    Dim res As String
    Dim resb As New StringBuilder
    
    Dim CTLG_CODE, COD_ALMC, ISAC_CODE, P_TEXTM As String
    
    Dim P_CATALOGO, P_TEXT As String
    Dim P_SUCURSAL As String
    Dim P_COD_PRD As String
    Dim P_TSIGV As Decimal
    Dim P_TIGV As Decimal
    Dim P_TSHORA As Decimal
    Dim P_THORAS_TRABAJ As Decimal
    Dim P_TOTAL_MANO As Decimal
    Dim P_TOTAL_SIN_IGV As Decimal
    Dim P_TOTAL_CON_IGV As Decimal
    
    Dim P_PROD_CODE, P_CODIGO_BARRAS As String
    Dim P_CECC_CODE, P_CECD_CODE, P_FECHA_ENSAMBLAJE, P_FECHA_MOVIMIENTO, P_NRO_SERIE, P_MCDR_CODE,
        P_PIDM_ALMACENERO, P_USUA_ID, P_USUA_PIDM, P_ALMC_CODE As String
       
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        opcion = context.Request("OPCION")
        CTLG_CODE = context.Request("CTLG_CODE")
        COD_ALMC = context.Request("COD_ALMC")
        ISAC_CODE = context.Request("ISAC_CODE")
        
        P_CATALOGO = context.Request("P_CATALOGO")
        P_SUCURSAL = context.Request("P_SUCURSAL")
        P_COD_PRD = context.Request("P_COD_PRD")
        P_TSIGV = context.Request("P_TSIGV")
        P_TIGV = context.Request("P_TIGV")
        P_TSHORA = context.Request("P_TSHORA")
        P_THORAS_TRABAJ = context.Request("P_THORAS_TRABAJ")
        P_TOTAL_MANO = context.Request("P_TOTAL_MANO")
        P_TOTAL_SIN_IGV = context.Request("P_TOTAL_SIN_IGV")
        P_TOTAL_CON_IGV = context.Request("P_TOTAL_CON_IGV")
        P_TEXT = context.Request("P_TEXT")
        P_TEXTM = context.Request("P_TEXTM")
        
        'CAMPOS PARA OBTENER DATOS DE DOCUMENTO DE COMPRA
        P_PROD_CODE = context.Request("p_PROD_CODE")
        P_CODIGO_BARRAS = context.Request("p_CODIGO_BARRAS")
        'CAMPOS ADICIONALES
        P_CECC_CODE = context.Request("P_CECC_CODE")
        P_CECD_CODE = context.Request("P_CECD_CODE")
        P_FECHA_ENSAMBLAJE = context.Request("P_FECHA_ENSAMBLAJE")
        P_FECHA_MOVIMIENTO = context.Request("P_FECHA_MOVIMIENTO")
        P_NRO_SERIE = context.Request("P_NRO_SERIE")
        P_MCDR_CODE = context.Request("P_MCDR_CODE")
        P_PIDM_ALMACENERO = context.Request("P_PIDM_ALMACENERO")
        P_USUA_ID = context.Request("P_USUA_ID")
        P_USUA_PIDM = context.Request("P_USUA_PIDM")
        P_ALMC_CODE = context.Request("P_ALMC_CODE")
        
        Try
            Select Case opcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As DataTable
                                    
                    context.Response.ContentType = "application/json"
                    dt = New Nomade.NC.NCFactura("Bn").lista_dcto_pagar("", "", "", "", "", CTLG_CODE, COD_ALMC)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            
                            If row("COMPLETO").ToString() = "COMPLETO" Then
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                resb.Append("""DESC_SUCURSAL"" :" & """" & row("DESC_SUCURSAL").ToString & """,")
                                resb.Append("""DESC_DCTO"" :" & """" & row("DESC_DCTO").ToString & """,")
                                resb.Append("""NUM_DCTO"" :" & """" & row("NUM_DCTO").ToString & """,")
                                resb.Append("""EMISION"" :" & """" & row("EMISION").ToString & """,")
                                resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                resb.Append("""SIMBOLO_MONEDA"" :" & """" & row("SIMBOLO_MONEDA").ToString & """,")
                                resb.Append("""IMPORTE"" :" & """" & row("IMPORTE").ToString & """,")
                                resb.Append("""COMPLETO"" :" & """" & row("COMPLETO").ToString & """,")
                                resb.Append("""ANULADO"" :" & """" & row("ANULADO").ToString & """,")
                                resb.Append("""EMPRESA"" :" & """" & row("EMPRESA").ToString & """,")
                                resb.Append("""SUCURSAL"" :" & """" & row("SUCURSAL").ToString & """,")
                                resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                resb.Append("""TIPO_DCTO"" :" & """" & row("TIPO_DCTO").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As DataTable
                    dt = New Nomade.NC.NCFactura("Bn").lista_detalle_alm_compra(ISAC_CODE)
                    
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            If (MiDataRow("SERIE_INDI_VENTA").ToString <> "N") Then
                                resb.Append("{")
                                resb.Append("""CODIGO_PADRE"" :" & """" & MiDataRow("CODIGO_PADRE").ToString & """,")
                                resb.Append("""CODIGO_HIJO"" :" & """" & MiDataRow("CODIGO_HIJO").ToString & """,")
                                resb.Append("""FACTURA"" :" & """" & MiDataRow("FACTURA").ToString & """,")
                                resb.Append("""GUIA_CODE"" :" & """" & MiDataRow("GUIA").ToString & """,")
                                resb.Append("""ITEM"" :" & """" & MiDataRow("ITEMS").ToString & """,")
                                resb.Append("""PRODUCTO"" :" & """" & MiDataRow("COD_PRODUCTO").ToString & """,")
                                resb.Append("""DESC_PRODUCTO"" :" & """" & MiDataRow("DES_PRODUCTO").ToString & """,")
                                resb.Append("""CANTIDAD_BASE"" :" & """" & MiDataRow("CANTIDAD_ALMACEN").ToString & """,")
                                resb.Append("""MONTO_UNID_PRODCTO"" :" & """" & MiDataRow("MONTO_UNID_PRODCTO").ToString & """,")
                                resb.Append("""CODIGO_BARRAS"" :" & """" & MiDataRow("CODIGO_BARRAS").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "3" 'CREAR PRODUCTO FABRICADO                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim arr As Array
                    Dim acf As New Nomade.AF.AFActivoFijo("Bn")
                    
                    arr = acf.CREAR_PROD_FABRICADO(P_CATALOGO, P_SUCURSAL, P_ALMC_CODE, P_COD_PRD, P_TSIGV, P_TIGV, P_TSHORA,
                                                   P_THORAS_TRABAJ, P_TOTAL_MANO, P_TOTAL_SIN_IGV, P_TOTAL_CON_IGV, P_NRO_SERIE,
                                                   If(P_FECHA_ENSAMBLAJE = "", Nothing, Utilities.fechaLocal(P_FECHA_ENSAMBLAJE)),
                                                   If(P_FECHA_MOVIMIENTO = "", Nothing, Utilities.fechaLocal(P_FECHA_MOVIMIENTO)),
                                                   P_PIDM_ALMACENERO, P_USUA_ID, P_CECC_CODE, P_CECD_CODE, P_TEXT, P_TEXTM)
                    
                    'If arr(1).ToString() = "OK" Then
                    '    If P_TEXT <> "No hay información disponible,,,,N,,undefined,,,,," Then
                    '        acf.CREAR_DETALLE_PROD_FABRI(arr(0).ToString(), P_TEXT)
                    '    End If
                        
                    '    If P_TEXTM <> "No hay información disponible," Then
                    '        acf.CREAR_DETALLE_MANO_OBRA(arr(0).ToString(), P_TEXTM)
                    '    End If
                    'End If
                    
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE"" :" & """" & arr(0).ToString & """,")
                    resb.Append("""MCDR_CODE"" :" & """" & arr(1).ToString & """,")
                    resb.Append("""RESPUESTA"" :" & """" & arr(2).ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                    
                Case "4" 'LISTAR PRODUCTOS FABRICADOS                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As DataTable
                    Dim acf As New Nomade.AF.AFActivoFijo("Bn")
                    dt = acf.Listar_Prod_fabr(P_CATALOGO, P_SUCURSAL, ISAC_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CATALOGO"" :" & """" & MiDataRow("CATALOGO").ToString & """,")
                            resb.Append("""SUCURSAL"" :" & """" & MiDataRow("SUCURSAL").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""TOTALSIGV"" :" & """" & MiDataRow("TOTALSIGV").ToString & """,")
                            resb.Append("""TOTALCIGV"" :" & """" & MiDataRow("TOTALCIGV").ToString & """,")
                            resb.Append("""SUELDO_HORA"" :" & """" & MiDataRow("SUELDO_HORA").ToString & """,")
                            resb.Append("""HORAS_TRABA"" :" & """" & MiDataRow("HORAS_TRABA").ToString & """,")
                            resb.Append("""TOTAL_MANO_OBRA"" :" & """" & MiDataRow("TOTAL_MANO_OBRA").ToString & """,")
                            resb.Append("""TOTAL_PRODSIGV"" :" & """" & MiDataRow("TOTAL_PRODSIGV").ToString & """,")
                            resb.Append("""TOTAL_PRODCIGV"" :" & """" & MiDataRow("TOTAL_PRODCIGV").ToString & """,")
                            resb.Append("""FECHA_ENSAMBLAJE"" :" & """" & MiDataRow("FECHA_ENSAMBLAJE").ToString & """,")
                            resb.Append("""FECHA_MOVIMIENTO"" :" & """" & MiDataRow("FECHA_MOVIMIENTO").ToString & """,")
                            resb.Append("""PIDM_ALMACENERO"" :" & """" & MiDataRow("PIDM_ALMACENERO").ToString & """,")
                            resb.Append("""ALMACENERO"" :" & """" & MiDataRow("ALMACENERO").ToString & """,")
                            resb.Append("""CECC_CODE"" :" & """" & MiDataRow("CECC_CODE").ToString & """,")
                            resb.Append("""CECD_CODE"" :" & """" & MiDataRow("CECD_CODE").ToString & """,")
                            resb.Append("""CENTRO_COSTOS"" :" & """" & MiDataRow("CENTRO_COSTOS").ToString & """,")
                            resb.Append("""MCDR_CODE"" :" & """" & MiDataRow("MCDR_CODE").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                            resb.Append("""NRO_SERIE"" :" & """" & MiDataRow("NRO_SERIE").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("USUA_ID").ToString & """,")
                            resb.Append("""FECHA_ACTV"" :" & """" & MiDataRow("FECHA_ACTV").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "5" ' LISTA LOS DETALLES DEL PRODUCTO FABRICADO             
                    Dim dt As DataTable
                    Dim acf As New Nomade.AF.AFActivoFijo("Bn")
                    dt = acf.Listar_Prod_detalle_fabr(ISAC_CODE)
                    GenerarTablaPro2(dt)
                    
                Case "6" ' LISTA LOS DETALLES DE LA MANO DE OBRA DEL PRODUCTO FABRICADO
                    Dim dt As DataTable
                    Dim acf As New Nomade.AF.AFActivoFijo("Bn")
                    dt = acf.EMPLE_PROD_FABRI(ISAC_CODE)
                    GenerarTablaPro3(dt)
                    
                Case "7" 'DEVUELVE DATOS DEL DOCUMENTO DE COMPRA AL CUAL PERTENECE UN PRODUCTO SERIADO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dt As DataTable
                    Dim acf As New Nomade.AF.AFActivoFijo("Bn")
                    dt = acf.ListarDocumentoCompraxCodigoBarras(P_CATALOGO, COD_ALMC, P_PROD_CODE, P_CODIGO_BARRAS)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DOCUMENTO"" :" & """" & row("DOCUMENTO").ToString & """,")
                            resb.Append("""GUIA"" :" & """" & row("GUIA").ToString & """,")
                            resb.Append("""FECHA_EMISION"" :" & """" & row("FECHA_EMISION").ToString & """,")
                            resb.Append("""IMPUESTO_IND"" :" & """" & row("IMPUESTO_IND").ToString & """,")
                            resb.Append("""BISAC_CODE"" :" & """" & row("BISAC_CODE").ToString & """,")
                            resb.Append("""RIDAD_ITEM"" :" & """" & row("RIDAD_ITEM").ToString & """,")
                            resb.Append("""MCDR_CODE"" :" & """" & row("MCDR_CODE").ToString & """,")
                            resb.Append("""CENTRO_COSTOS"" :" & """" & row("CENTRO_COSTOS").ToString & """,")
                            resb.Append("""CECC_CODE"" :" & """" & row("CECC_CODE").ToString & """,")
                            resb.Append("""CECD_CODE"" :" & """" & row("CECD_CODE").ToString & """,")
                            resb.Append("""CODIGO_BARRAS"" :" & """" & row("CODIGO_BARRAS").ToString & """,")
                            resb.Append("""MCDR_ANULADO_IND"" :" & """" & row("MCDR_ANULADO_IND").ToString & """,")
                            resb.Append("""MCDR_VENDIDO_IND"" :" & """" & row("MCDR_VENDIDO_IND").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "IMPR" 'IMPRIMIR DOCUMENTO CON COSTOS
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = GenerarDctoImprimir(ISAC_CODE)
                Case "IMPR2" 'IMPRIMIR DOCUMENTO SIN COSTOS
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = GenerarDctoImprimirSinCosto(ISAC_CODE)
                    
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
 
    Function GenerarDctoImprimir(ByVal ISAC_CODE As String) As String
        Dim tabla As New StringBuilder
        Dim dt As DataTable
        Dim dtProdFabricado As DataTable
        Dim acf As New Nomade.AF.AFActivoFijo("Bn")
        
        'DATOS DE PRODUCTO FABRICADO
        dtProdFabricado = acf.Listar_Prod_fabr("", "", ISAC_CODE)
        tabla.Append("<div class=""portlet-title""><h4><i class=""icon-reorder""></i>PRODUCTO FABRICADO</h4></div>")
        
        tabla.Append("<table style=""width:100%;"" cellpadding=""7px"" border=""0"" ><tbody>")
        tabla.Append("<tr style='vertical-align: top;'>")
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>EMPRESA:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</strong></td>", dtProdFabricado.Rows(0)("DESC_EMPRESA").ToString())
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>ESTABLECIMIENTO:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("DESC_SUCURSAL").ToString())
        tabla.Append("</tr>")
        tabla.Append("<tr style='vertical-align: top;'>")
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>PRODUCTO:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("PRODUCTO").ToString())
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>NRO SERIE:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("NRO_SERIE").ToString())
        tabla.Append("</tr>")
        tabla.Append("<tr style='vertical-align: top;'>")
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>ENSAMBLAJE:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("FECHA_ENSAMBLAJE").ToString())
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>MOVIMIENTO:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("FECHA_MOVIMIENTO").ToString())
        tabla.Append("</tr>")
        tabla.Append("<tr style='vertical-align: top;'>")
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>ALMACENERO:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("ALMACENERO").ToString())
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>CENTRO DE COSTOS:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("CENTRO_COSTOS").ToString())
        tabla.Append("</tr>")
        tabla.Append("</tbody></table>")
        
        '---DETALLES DE ENSAMBLAJE
        tabla.Append("<fieldset class=""scheduler-border ""><legend class=""scheduler-border "" id=""legend"">Detalles</legend></fieldset>")
        dt = acf.Listar_Prod_detalle_fabr(ISAC_CODE)
        res = "<table id=""tblbmodal"" class=""table display DTTT_selectable"" border=""1"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>CÓDIGO</th>"
        res += "<th>FACTURA</</th>"
        res += "<th>GUÍA</th>"
        res += "<th>ITEM</th>"
        res += "<th>SERIE PROD.</th>"
        res += "<th>PRODUCTO</th>"
        res += "<th>CANTIDAD</th>"
        res += "<th>COSTO</th>"
        res += "<th>CANTIDAD USADA</th>"
        res += "<th>TOTAL<br/>SIN IGV</th>"
        res += "<th>TOTAL<br/>CON IGV</th>"
        res += "</tr>"
        res += "</thead><tbody>"
        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"
                res += "<td align='center'>" & dt.Rows(i)("FACC").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FACTURA").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("GUIA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("ITEM").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("SERIE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PRODUCTO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CANT_COMPRA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PRE_COMPRA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CANT_USAR").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TOTALSIGV").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TOTALCIGV").ToString() & "</td>"
                res += "</tr>"
            Next
        Else
            res += "<tr><td align='center' colspan='11'> No hay Información Disponible</td></tr>"
        End If
        res += "</tbody></table>"
        tabla.Append(res)
        tabla.Append("<table style=""width:100%;"" cellpadding=""7px"" border=""0"" ><tbody>")
        tabla.Append("<tr>")
        tabla.AppendFormat("<td><strong>Total Sin IGV:</strong></td>")
        tabla.AppendFormat("<td>{0}</strong></td>", FormatNumber(CDbl(dtProdFabricado.Rows(0)("TOTALSIGV").ToString), 2))
        tabla.AppendFormat("<td><strong>Total Con IGV:</strong></td>")
        tabla.AppendFormat("<td>{0}</td>", FormatNumber(CDbl(dtProdFabricado.Rows(0)("TOTALCIGV").ToString), 2))
        tabla.Append("</tr>")
        tabla.Append("</tbody></table>")
        tabla.Append("<br/>")
        
        '------ MANO DE OBRA  
        tabla.Append("<fieldset class=""scheduler-border ""><legend class=""scheduler-border "" id=""legend"">Mano de Obra</legend></fieldset>")
        dt = acf.EMPLE_PROD_FABRI(ISAC_CODE)
        res = "<table id=""tblbmodal1"" class=""table display DTTT_selectable"" border=""1"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>EMPLEADO</th>"
        res += "<th>SUELDO X HORA</</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"
                res += "<td align='center'>" & dt.Rows(i)("EMPLEADO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("SUELDOHORA").ToString() & "</td>"
                res += "</tr>"
            Next
        Else
            res += "<tr><td align='center' colspan='2'> No hay Información Disponible</td></tr>"
        End If
        res += "</tbody>"
        res += "</table>"
        tabla.Append(res)
        tabla.Append("<table style=""width:100%;"" cellpadding=""7px"" border=""0"" ><tbody>")
        tabla.Append("<tr>")
        tabla.AppendFormat("<td><strong>Total de Sueldo x Horas:</strong></td>")
        tabla.AppendFormat("<td>{0}</strong></td>", FormatNumber(CDbl(dtProdFabricado.Rows(0)("SUELDO_HORA").ToString), 2))
        tabla.AppendFormat("<td><strong>Horas Trabajadas:</strong></td>")
        tabla.AppendFormat("<td>{0}</td>", FormatNumber(CDbl(dtProdFabricado.Rows(0)("HORAS_TRABA").ToString), 2))
        tabla.AppendFormat("<td><strong>Total de Mano de Obra:</strong></td>")
        tabla.AppendFormat("<td>{0}</td>", FormatNumber(CDbl(dtProdFabricado.Rows(0)("TOTAL_MANO_OBRA").ToString), 2))
        tabla.Append("</tr>")
        tabla.Append("</tbody></table>")
        tabla.Append("<br/>")
        
        '----- TOTALES
        tabla.Append("<fieldset class=""scheduler-border ""><legend class=""scheduler-border "" id=""legend"">Totales</legend></fieldset>")
        tabla.Append("<table style=""width:100%;"" cellpadding=""7px"" border=""0"" ><tbody>")
        tabla.Append("<tr>")
        tabla.AppendFormat("<td><strong>Total de Producto Facricado Sin IGV:</strong></td>")
        tabla.AppendFormat("<td>{0}</strong></td>", FormatNumber(CDbl(dtProdFabricado.Rows(0)("TOTAL_PRODSIGV").ToString), 2))
        tabla.AppendFormat("<td><strong>Total de Producto Facricado Con IGV:</strong></td>")
        tabla.AppendFormat("<td>{0}</td>", FormatNumber(CDbl(dtProdFabricado.Rows(0)("TOTAL_PRODCIGV").ToString), 2))
        tabla.Append("</tr>")
        tabla.Append("</tbody></table>")
        
        Return tabla.ToString
    End Function
    
    Function GenerarDctoImprimirSinCosto(ByVal ISAC_CODE As String) As String
        Dim tabla As New StringBuilder
        Dim dt As DataTable
        Dim dtProdFabricado As DataTable
        Dim acf As New Nomade.AF.AFActivoFijo("Bn")
        
        'DATOS DE PRODUCTO FABRICADO
        dtProdFabricado = acf.Listar_Prod_fabr("", "", ISAC_CODE)
        tabla.Append("<div class=""portlet-title""><h4><i class=""icon-reorder""></i>PRODUCTO FABRICADO</h4></div>")
        
        tabla.Append("<table style=""width:100%;"" cellpadding=""7px"" border=""0"" ><tbody>")
        tabla.Append("<tr style='vertical-align: top;'>")
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>EMPRESA:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</strong></td>", dtProdFabricado.Rows(0)("DESC_EMPRESA").ToString())
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>ESTABLECIMIENTO:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("DESC_SUCURSAL").ToString())
        tabla.Append("</tr>")
        tabla.Append("<tr style='vertical-align: top;'>")
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>PRODUCTO:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("PRODUCTO").ToString())
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>NRO SERIE:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("NRO_SERIE").ToString())
        tabla.Append("</tr>")
        tabla.Append("<tr style='vertical-align: top;'>")
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>ENSAMBLAJE:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("FECHA_ENSAMBLAJE").ToString())
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>MOVIMIENTO:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("FECHA_MOVIMIENTO").ToString())
        tabla.Append("</tr>")
        tabla.Append("<tr style='vertical-align: top;'>")
        tabla.AppendFormat("<td style='line-height: 19px;'><strong>ALMACENERO:</strong></td>")
        tabla.AppendFormat("<td style='line-height: 19px;'>{0}</td>", dtProdFabricado.Rows(0)("ALMACENERO").ToString())
        tabla.AppendFormat("<td></td>")
        tabla.AppendFormat("<td></td>")
        tabla.Append("</tr>")
        tabla.Append("</tbody></table>")
        
        '---DETALLES DE ENSAMBLAJE
        tabla.Append("<fieldset class=""scheduler-border ""><legend class=""scheduler-border "" id=""legend"">Detalles</legend></fieldset>")
        dt = acf.Listar_Prod_detalle_fabr(ISAC_CODE)
        res = "<table id=""tblbmodal"" class=""table display DTTT_selectable"" border=""1"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>SERIE</th>"
        res += "<th>PRODUCTO</th>"
        res += "<th>CANTIDAD</th>"
        res += "<th>GARANTÍA</th>"
        res += "</tr>"
        res += "</thead><tbody>"
        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr>"
                res += "<td align='center'>" & dt.Rows(i)("SERIE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PRODUCTO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CANT_USAR").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("GARANTIA").ToString() & "</td>"
                res += "</tr>"
            Next
        Else
            res += "<tr><td align='center' colspan='11'> No hay Información Disponible</td></tr>"
        End If
        res += "</tbody></table>"
        tabla.Append(res)
        Return tabla.ToString
    End Function
    
    
    Public Function GenerarTablaPro3(ByVal dt As DataTable) As String
        
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal1"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>EMPLEADO</th>"
            res += "<th>SUELDO X HORA</</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"
                res += "<td align='center'>" & dt.Rows(i)("EMPLEADO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("SUELDOHORA").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function
    
    Public Function GenerarTablaPro2(ByVal dt As DataTable) As String
        
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>CÓDIGO</th>"
            res += "<th>FACTURA</</th>"
            res += "<th>GUÍA</th>"
            res += "<th>ITEM</th>"
            res += "<th>SERIE PROD.</th>"
            res += "<th>PRODUCTO</th>"
            res += "<th>CANTIDAD</th>"
            res += "<th>COSTO</th>"
            res += "<th>CANTIDAD USADA</th>"
            res += "<th>TOTAL<br/>SIN IGV</th>"
            res += "<th>TOTAL<br/>CON IGV</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"
                res += "<td align='center'>" & dt.Rows(i)("FACC").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FACTURA").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("GUIA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("ITEM").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("SERIE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PRODUCTO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CANT_COMPRA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PRE_COMPRA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CANT_USAR").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TOTALSIGV").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TOTALCIGV").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function
    
    Public Function GenerarTablaProSinDatos() As String
        
        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
        res += "<tr >"
        res += "<td align='center'> </td>"
        res += "<td ></td>"
        res += "<td align='center'></td>"
        res += "<td align='center' >NO HAY DATOS DISPONIBLES</td>"
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"
        res += "</tr>"
        res += "</tbody>"
        res += "</table>"
        Return res
    End Function
    

    Function ObtenerFecha(ByVal fecha As String) As String
        Dim dia = fecha.Split(" ")(0).Split("/")(0)
        Dim mes = fecha.Split(" ")(0).Split("/")(1)
        Dim anio = fecha.Split(" ")(0).Split("/")(2)
        Dim hora = ""
        Dim min = ""
        Dim seg = ""
        If fecha.Split(" ").Length = 3 Then
            hora = fecha.Split(" ")(1).Split(":")(0)
            min = fecha.Split(" ")(1).Split(":")(1)
            seg = fecha.Split(" ")(1).Split(":")(2)
            If fecha.Split(" ")(2).Contains("p") Then
                If Integer.Parse(hora) < 12 Then
                    hora = (Integer.Parse(hora) + 12).ToString
                End If
            End If
        End If
        fecha = anio + mes + dia + hora + min + seg
        Return fecha
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class