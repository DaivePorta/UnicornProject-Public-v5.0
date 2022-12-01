<%@ WebHandler Language="VB" Class="NALGR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NALGR : Implements IHttpHandler
    Dim opcion As String
    Dim p_almacen, p_fechainicial, p_fechafinal As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim p As New Nomade.NA.NAConfAlmacenes("bn")
    Dim dt As DataTable

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        opcion = context.Request("opcion")
        p_almacen = context.Request("p_almacen")
        p_fechainicial = context.Request("p_fechainicial")
        p_fechafinal = context.Request("p_fechafinal")

        Try
            Select Case opcion
                Case "1"
                    dt = p.fVisuaiizaGR(p_almacen, Utilities.fechaLocal(p_fechainicial), Utilities.fechaLocal(p_fechafinal))
                    GenerarTabla(dt)

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try


    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Public Function GenerarTabla(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>NRO GUIA</th>"
            res += "<th>NOMBRE DESTINO</th>"
            res += "<th>FECHA EMISION</th>"
            res += "<th>MOVIMIENTO</th>"
            res += "<th>OPERACION</th>"
            res += "<th>ALMACEN</th>"
            res += "<th>TRANSPORTISTA</th>"
            res += "<th>DESPACHO</th>"
            res += "<th>GLOSA</th>"
            res += "<th>#</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"
                res += "<td align='center'>" & dt.Rows(i)("NRO_DOC").ToString() & "</td>"
                res += "<td >" & dt.Rows(i)("NOMBREDESTINO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString.Substring(0, 10) & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("MOVIMIENTO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("OPERACION").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("ALMACEN").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("TRANSPORTISTA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESPACHA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                res += "<td align='center'><a class='btn red' style='margin-bottom:2px' id='btnPdf' onclick='descargarPDF(""" &
                        dt.Rows(i)("CODIGO").ToString() & """,""" & dt.Rows(i)("COD_EMPRESA").ToString() & """)'>PDF</a>" &
                        "<a class='btn green' style='margin-bottom:2px' id='btnXML' onclick='descargarXML(""" &
                        dt.Rows(i)("RUC").ToString() & """,""" & dt.Rows(i)("SERIE").ToString() & """,""" &
                        dt.Rows(i)("CORRELATIVO").ToString() & """)'>XML</a></td>"
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

        res = "<table id=""tblbmodal"" Class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>NRO DOC</th>"
        res += "<th>NOMBRE DESTINO</th>"
        res += "<th>FECHA EMISION</th>"
        res += "<th>MOVIMIENTO</th>"
        res += "<th>OPERACION</th>"
        res += "<th>ALMACEN</th>"
        res += "<th>TRANSPORTISTA</th>"
        res += "<th>DESPACHO</th>"
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
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"

        res += "</tr>"

        res += "</tbody>"
        res += "</table>"

        Return res
    End Function
End Class