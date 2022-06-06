<%@ WebHandler Language="VB" Class="NAMDTLG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NAMDTLG : Implements IHttpHandler
    'Mantenimineto de datos Logisticos de Productos

    Dim code As String
    Dim opcion As String
    Dim p_almacen, p_grupo, p_scl As String

    Dim CODIGO, EMPRESA, ALMACEN, DESCRIPCION, TIPO_ALMACEN,
   TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE As String

    Dim punto_retorno, stock_minimo, stock_maximo As String
    Dim code_almc, code_prod, p_CTLG_CODE, p_ESTADO_IND, p_ROTACION_MENS As String
    'Dim punto_retorno_dec, stock_minimo_dec, stock_maximo_dec As String

    Dim dt As New DataTable


    Dim res As String
    Dim resb As New StringBuilder

    'Instanciamos las clases de Persona
    Dim gesAlm As New Nomade.NA.NASeccionesAlmacen("bn")
    Dim gesPro As New Nomade.NM.NMGestionProductos("Bn")


    Dim codempr As String
    Dim usua, p_CADENA As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest


        opcion = context.Request("OPCION")
        p_almacen = context.Request("p_almacen")
        p_CTLG_CODE = context.Request("p_scl")
        p_CADENA = context.Request("CADENA")

        code_prod = context.Request("codProd")
        code_almc = context.Request("codAlmc")

        punto_retorno = context.Request("pr")
        stock_minimo = context.Request("smin")
        stock_maximo = context.Request("smax")
        p_ESTADO_IND = context.Request("ESTADO_IND")

        p_ROTACION_MENS = context.Request("p_ROTACION_MENS")

        Try

            Select Case opcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    oDT = gesPro.LISTAR_DATOS_LOGISTICOS(p_almacen, p_CTLG_CODE, p_ROTACION_MENS, p_ESTADO_IND)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                    'Genera la tabla con los codigos de almacen
                    'res = GenerarTablaDatosLogisticos(p_almacen)
                Case "2"
                    'Actualiza los datos logisticos de un producto en inventario
                    res = gesPro.ACTUALIZAR_DATOS_LOGISTICOS(punto_retorno, stock_minimo, stock_maximo, code_almc, code_prod)

                Case "AB"
                    'Actualiza los datos logisticos de un producto en inventario
                    res = gesPro.ACTUALIZAR_DATOS_LOGISTICOS_BLOQUE(p_CADENA)

            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try
    End Sub



    Public Function GenerarTablaDatosLogisticos(ByVal codigosAlmacen As String) As String

        Dim grupoCodigos As String() = codigosAlmacen.Split(New Char() {","})
        Dim inicio As Integer = 0
        res = ""

        'Dim glLetras As New Nomade.GL.GLLetras("Bn")
        'Dim dtMonedas As New DataTable
        'dtMonedas = glLetras.ListarMoneda("")
        'Dim moba As String = ""
        'For Each row In dtMonedas.Rows
        '    If row("TIPO") = "MOBA" Then
        '        moba = row("CODIGO")
        '    End If
        'Next

        '------
        resb.AppendFormat("<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>COD. PROD.</th>")
        resb.AppendFormat("<th>PRODUCTO</th>")
        resb.AppendFormat("<th>EMPRESA</th>")
        resb.AppendFormat("<th>ALMACÉN</th>")
        resb.AppendFormat("<th>Unidad<br/>Medida</th>")
        resb.AppendFormat("<th>Punto<br/>Reorden</th>")
        resb.AppendFormat("<th>Stock<br/>Mínimo</th>")
        resb.AppendFormat("<th>Stock<br/>Máximo</th>")
        resb.AppendFormat("<th>Stock<br/>Actual</th>")
        resb.AppendFormat("<th>Costo<br/>Unitario</th>")
        resb.AppendFormat("<th>Acciones</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        Dim vacio As Boolean = True

        For Each codigoAlmacen As String In grupoCodigos
            dt = New DataTable
            dt = gesPro.LISTAR_DATOS_LOGISTICOS(codigoAlmacen, p_CTLG_CODE, p_ROTACION_MENS, p_ESTADO_IND)

            If Not (dt Is Nothing) Then
                For i As Integer = 0 To dt.Rows.Count - 1
                    If dt.Rows(i)("ESTADO_IND") = "I" Then
                        resb.AppendFormat("<tr style='color:gray;'>")
                    Else
                        resb.AppendFormat("<tr>")
                    End If
                    resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CODIGO_PROD_ANTIGUO").ToString())
                    resb.AppendFormat("<td >{0}</td>", dt.Rows(i)("PRODUCTO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("EMPRESA").ToString())
                    resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("ALMACEN").ToString())
                    resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("UNIDAD_MEDIDA").ToString())
                    resb.AppendFormat("<td align='center'><input id='pr_{0}_{1}' type='text' value='{2}' style='max-width:50px;' onkeypress='return ValidaDecimales(event,this)'/></td>", dt.Rows(i)("CODIGO_PROD").ToString(), dt.Rows(i)("CODIGO_ALMC").ToString(), dt.Rows(i)("PUNTO_REORDEN").ToString())
                    resb.AppendFormat("<td align='center'><input id='smin_{0}_{1}' type='text' value='{2}' style='max-width:50px;' onkeypress='return ValidaDecimales(event,this)'/></td>", dt.Rows(i)("CODIGO_PROD").ToString(), dt.Rows(i)("CODIGO_ALMC").ToString(), dt.Rows(i)("STOCK_MINIMO").ToString())
                    resb.AppendFormat("<td align='center'><input id='smax_{0}_{1}' type='text' value='{2}' style='max-width:50px;' onkeypress='return ValidaDecimales(event,this)'/></td>", dt.Rows(i)("CODIGO_PROD").ToString(), dt.Rows(i)("CODIGO_ALMC").ToString(), dt.Rows(i)("STOCK_MAXIMO").ToString())
                    resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("STOCK_ACTUAL").ToString())
                    If dt.Rows(i)("COSTO").ToString() <> "0.00" Then
                        resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("COSTO").ToString())
                    Else
                        resb.AppendFormat("<td align='center'>Sin Datos</td>")

                    End If

                    resb.AppendFormat("<td align='center'> <a class='btn green cambiarbt' tooltip='Modificar' onclick=""modificarDatosLogisticos('{0}','{1}')""><i class='icon-refresh'></i></a></td>", dt.Rows(i)("CODIGO_PROD").ToString(), dt.Rows(i)("CODIGO_ALMC").ToString())
                    resb.AppendFormat("</tr>")
                Next
            End If
        Next
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()

        Return res


    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property



End Class