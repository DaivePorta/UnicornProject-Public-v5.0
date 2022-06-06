<%@ WebHandler Language="VB" Class="NALRTRA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NALRTRA : Implements IHttpHandler

    Dim resb As StringBuilder
    Dim opcion, res As String
    Dim orgien, destino As String
    Dim fecha, p_DESDE, p_HASTA As String
    Dim dt As DataTable
    Dim gPro As New Nomade.NA.NAReportes("BN")
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        opcion = context.Request("OPCION")
        orgien = context.Request("orgien")
        destino = context.Request("destino")
        fecha = context.Request("fecha")
        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")


        Try
            Select Case opcion
                Case "1"
                    dt = gPro.LISTAR_TRANSFERENCIA_ALMACEN(orgien, destino, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    res = GenerarTablaPro(dt)
                Case "2"

                Case "3"

                Case "4"

                Case "5"
            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try
    End Sub

    Public Function GenerarTablaPro(ByVal dt As DataTable) As String

        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            'res += "<th>CODIGO_SALIDA</th>"
            'res += "<th>CODIGO_ENTRADA</th>"
            res += "<th>FECHA  SALIDA</th>"
            res += "<th>FECHA  ENTRADA</th>"
            res += "<th>ALMACEN  ORIGEN</th>"
            res += "<th>ALMACEN DESTINO</th>"
            res += "<th>TIPO DE DOCUMENTO</th>"
            res += "<th>NOR. DOC. DE SALIDA</th>"
            res += "<th>ESTADO</th>"
            res += "<th>GLOSARIO SALIDA</th>"
            res += "<th>GLOSARIO  ENTRADA</th>"

            res += "<th>VER SALIDA </th>"
            res += "<th>VER ENTRADA </th>"

            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr >"
                'res += "<td align='center'>" & dt.Rows(i)("CODIGO_SALIDA").ToString() & "</td>"
                'res += "<td align='center'>" & dt.Rows(i)("CODIGO_ENTRADA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FECHA_SALIDA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FECHA_ENTRADA").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("ALM_ORI").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("ALM_DEST").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("TIPO_DOC").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("NUM_DOC").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("GLOSARIO_SALIDA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("GLOSARIO_ENTRADA").ToString() & "</td>"

                res += "<td style='text-align:center;'>"
                res += "<span title='Transferencia entre almacenes'><a class='btn blue'  tooltip='Ver detalles' id='buscar1' href='?f=NAMINSA&codigo=" + dt.Rows(i)("CODIGO_SALIDA").ToString() + "' target='_blank'><i class='icon-search'></i></a></span>"
                res += "</td>"



                res += "<td style='text-align:center;'>"
                If dt.Rows(i)("CODIGO_ENTRADA").ToString() <> "" Then
                    res += "<span title='Transferencia entre almacenes'><a class='btn blue'  tooltip='Ver detalles' id='buscar1' href='?f=NAMINSA&codigo=" + dt.Rows(i)("CODIGO_ENTRADA").ToString() + "' target='_blank'><i class='icon-search'></i></a></span>"
                End If

                res += "</td>"


                res += "</tr>"
                'total = total + Convert.ToDecimal(dt.Rows(i)("TOTAL").ToString())
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

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class