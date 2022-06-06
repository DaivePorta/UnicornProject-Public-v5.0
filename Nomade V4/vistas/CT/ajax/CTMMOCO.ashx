<%@ WebHandler Language="VB" Class="CTMMOCO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CTMMOCO : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
    Dim sOpcion As String
    Dim p_DCTO_CODE, p_CTLG_CODE, p_SCSL_CODE, p_TIPO_ASIENTO, p_OPERACION, p_MONE_CODE, p_FECHA_INI, p_FECHA_FIN, p_DCTO_REF, p_TIPO As String ' CABECERA
    Dim p_PERIODO, p_CUO, p_TIPL As String ' DETALLE

    Dim p_CODE_TIPO_EXIST, p_CODE_MOV_ALMC, p_TIPO_MOV, p_PROD_CODE, p_CTAS_ID_DEBE, p_CUENTA_DEBE, p_CTAS_ID_HABER, p_CUENTA_HABER, p_USER, p_ESTADO_IND As String

    Dim oDT As DataTable
    Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")
    Dim sResponse As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            sOpcion = context.Request("sOpcion")
            p_DCTO_CODE = IIf(context.Request("p_DCTO_CODE") Is Nothing, "", context.Request("p_DCTO_CODE"))
            p_CTLG_CODE = IIf(context.Request("p_CTLG_CODE") Is Nothing, "", context.Request("p_CTLG_CODE"))
            p_SCSL_CODE = IIf(context.Request("p_SCSL_CODE") Is Nothing, "", context.Request("p_SCSL_CODE"))

            p_TIPO_ASIENTO = context.Request("p_TIPO_ASIENTO")
            p_OPERACION = context.Request("p_OPERACION")
            p_MONE_CODE = IIf(context.Request("p_MONE_CODE") Is Nothing, "", context.Request("p_MONE_CODE"))
            p_FECHA_INI = context.Request("p_FECHA_INI")
            p_FECHA_FIN = context.Request("p_FECHA_FIN")
            p_PERIODO = context.Request("p_PERIODO")
            p_CUO = context.Request("p_CUO")
            p_TIPL = context.Request("p_TIPL")
            p_DCTO_REF = context.Request("p_DCTO_REF")
            p_TIPO = context.Request("p_TIPO")

            If p_FECHA_INI Is Nothing Then
                p_FECHA_INI = String.Empty
            End If

            If p_FECHA_FIN Is Nothing Then
                p_FECHA_FIN = String.Empty
            End If

            If p_DCTO_REF Is Nothing Then
                p_DCTO_REF = String.Empty
            End If

            If p_TIPO Is Nothing Then
                p_TIPO = "1"
            End If

            p_CODE_TIPO_EXIST = context.Request("p_CODE_TIPO_EXIST")
            p_CODE_MOV_ALMC = context.Request("p_CODE_MOV_ALMC")
            p_TIPO_MOV = context.Request("p_TIPO_MOV")
            p_PROD_CODE = context.Request("p_PROD_CODE")
            p_CTAS_ID_DEBE = context.Request("p_CTAS_ID_DEBE")
            p_CUENTA_DEBE = context.Request("p_CUENTA_DEBE")
            p_CTAS_ID_HABER = context.Request("p_CTAS_ID_HABER")
            p_CUENTA_HABER = context.Request("p_CUENTA_HABER")
            p_USER = context.Request("p_USER")
            p_ESTADO_IND = context.Request("p_ESTADO_IND")

            context.Response.ContentType = "text/plain"
            Select Case sOpcion
                Case "LMCO" 'Lista Moviento Contable
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oCTMovimientoContable.ListaMovimientoContable(p_DCTO_CODE, p_CTLG_CODE, p_SCSL_CODE, p_MONE_CODE)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "VACO" 'VERIFICA SI TIENE ASIENTO CONTABLE
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oCTMovimientoContable.VerificarAsientoContable(p_DCTO_CODE)
                    If oDT Is Nothing Then
                        sResponse = "NAC"
                        sResponse = sResponse.ToString()
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "LDCO" 'Lista Detalle Moviento Contable
                    context.Response.ContentType = "application/json; charset=utf-8"
                    oDT = oCTMovimientoContable.SpCon_ListarMovContDet(p_DCTO_CODE)
                    If oDT Is Nothing Then
                        sResponse = "{}"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "LIST_TIPO_MOV_ALMC" 'Lista Tipo Movimientos de Almacen
                    context.Response.ContentType = "application/json; charset=utf-8"
                    p_CODE_MOV_ALMC = IIf(p_CODE_MOV_ALMC Is Nothing, "", p_CODE_MOV_ALMC)
                    p_TIPO_MOV = IIf(p_TIPO_MOV Is Nothing, "", p_TIPO_MOV)
                    p_ESTADO_IND = IIf(p_ESTADO_IND Is Nothing, "", p_ESTADO_IND)

                    oDT = oCTMovimientoContable.fnListarTipoMovAlmacen(p_CODE_MOV_ALMC, p_TIPO_MOV, p_ESTADO_IND)
                    If oDT Is Nothing Then
                        sResponse = "[]"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If
                Case "GRABAR_CTAS_TIPOMOVALMC"
                    oCTMovimientoContable.fnAgregarCtasxTipoMovAlmac(p_CODE_TIPO_EXIST, p_CODE_MOV_ALMC, p_PROD_CODE, p_CTAS_ID_DEBE, p_CUENTA_DEBE, p_CTAS_ID_HABER, p_CUENTA_HABER, p_USER)
                    sResponse = "OK"
                Case "ELIMINAR_CTAS_TIPOMOVALMC"
                    oCTMovimientoContable.fnEliminarCtasxTipoMovAlmac(p_CODE_TIPO_EXIST, p_CODE_MOV_ALMC, p_PROD_CODE)
                    sResponse = "OK"
                Case "LISTAR_CTAS_TIPOMOVALMC" 'Lista Tipo Movimientos de Almacen
                    context.Response.ContentType = "application/json; charset=utf-8"
                    p_CODE_TIPO_EXIST = IIf(p_CODE_TIPO_EXIST Is Nothing, "", p_CODE_TIPO_EXIST)
                    p_CODE_MOV_ALMC = IIf(p_CODE_MOV_ALMC Is Nothing, "", p_CODE_MOV_ALMC)
                    p_PROD_CODE = IIf(p_PROD_CODE Is Nothing, "", p_PROD_CODE)

                    oDT = oCTMovimientoContable.fnListarCtasxTipoMovAlmac(p_CODE_TIPO_EXIST, p_CODE_MOV_ALMC, p_PROD_CODE)
                    If oDT Is Nothing Then
                        sResponse = "[]"
                    Else
                        sResponse = Utilities.DataTableToJSON(oDT)
                    End If

            End Select
            context.Response.Write(sResponse)
        Catch ex As Exception
            Dim sMensaje As String = ex.Message
            If (sMensaje.IndexOf("[Advertencia]") > -1) Then
                context.Response.Write(sMensaje)
            Else
                context.Response.Write("[Error]: " & sMensaje)
            End If
        End Try
    End Sub

    Public Function GeneraTablaAsientoEspecifico(ByVal dt As DataTable) As StringBuilder
        resb.Clear()
        resb.AppendFormat("<table id=""tblListaAsientos"" border=""0"" class=""display DTTT_selectable"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<th>DETALLE</th>")
        resb.AppendFormat("<th>PERIODO</th>")
        resb.AppendFormat("<th>DESCRIPCION</th>")
        resb.AppendFormat("<th>TIPO ASIENTO</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>MONTO</th>")
        resb.AppendFormat("<th>TIPO DE CAMBIO</th>")
        resb.AppendFormat("<th>ESTADO DECLARACIÓN</th>")
        resb.AppendFormat("<th>FECHA EMISIÓN</th>")
        resb.AppendFormat("<th>FECHA REGISTRO</th>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If dt Is Nothing Then
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='10' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        Else
            'For Each midata As 

            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='41' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")

        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        Return resb
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class