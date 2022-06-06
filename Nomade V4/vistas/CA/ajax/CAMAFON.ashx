<%@ WebHandler Language="VB" Class="CAMAFON" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CAMAFON : Implements IHttpHandler
    
    Dim res, opcion, usua_id, ctlg_code, scsl_code, descripcion,
        moneda, monto, caja_code, cajac_code, usua_pidm As String
    
    Dim dt As DataTable
    Dim p As New Nomade.CA.AsignacionFondo("Bn")

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        opcion = context.Request("opcion")
        ctlg_code = context.Request("ctlg_code")
        scsl_code = context.Request("scsl_code")
        descripcion = context.Request("descripcion")
        moneda = context.Request("moneda")
        monto = context.Request("monto")
        caja_code = context.Request("caja_code")
        cajac_code = context.Request("cajac_code")
        usua_id = context.Request("usua_id")
        usua_pidm = context.Request("usua_pidm")

        Try
            Select Case opcion
                Case "1"
                    res = p.CREAR_ASIGNACIONES(ctlg_code, scsl_code, caja_code, "A", "", "", cajac_code, _
                                                    "", descripcion.ToUpper, Nothing, _
                                                     moneda, monto, "E", usua_id)
                Case "2"
                    Dim dt As New DataTable
                    dt = p.LISTAR_INGRESO_EGRESO_CAJA("", ctlg_code, scsl_code, caja_code, "", "", "B")
                    res = ListaProductosHtml(dt)
            End Select
            
            p = Nothing
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
 
    Public Function ListaProductosHtml(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id='tblAsignacion' cellspacing='0' class='display DTTT_selectable table-bordered'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center'>CAJA</th>"
            res += "<th align='center'>TIPO MOVIMIENTO</th>"
            res += "<th align='center'>DESCRIPCION</th>"
            res += "<th align='center'>MONEDA</th>"
            res += "<th align='center'>MONTO</th>"
            res += "<th align='center'>ESTADO</th>"
            res += "<th align='center'>FECHA</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<td align='left'>" & dt.Rows(i)("DESCRIPCION_CAJA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TIPO_MOVIMIENTO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("DESC_MONEDA").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("MONTO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                res += "<td align='left'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "<table id='tblAsignacion' class='display DTTT_selectable bordered' style='display: none;'><thead>" &
                "<tr><thCAJA</th><th>TIPO MOVIMIENTO</th><th>DESCRIPCION</th>" &
                "<th>MONEDA</th><th>MONTO</th><th>ESTADO</th><th>FECHA</th></tr>" &
                    "</thead></table>"
        End If
        Return res
    End Function

    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class