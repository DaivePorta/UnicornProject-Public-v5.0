<%@ WebHandler Language="VB" Class="NOLRPPFA" %>

Imports System
Imports System.Web
Imports System.Data


Public Class NOLRPPFA : Implements IHttpHandler
    
    Dim opcion As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim p As New Nomade.NA.NAReportes("bn")
    
    Dim p_FechaInicial As String
    Dim p_FechaFinal As String
    Dim p_Proveedor As String
    
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        opcion = context.Request("opcion")
        p_Proveedor = context.Request("proveedor")
        p_FechaInicial = context.Request("fechainicial")
        p_FechaFinal = context.Request("fechafinal")
        
        Try
            Select Case opcion
                Case "1"
                    dt = p.LISTAR_REPORTE_COMPRAS_PROVEEDOR_RESUMEN(p_Proveedor, Utilities.fechaLocal(p_FechaInicial), Utilities.fechaLocal(p_FechaFinal))
                    GeneraTable(dt)
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

    Public Function GeneraTable(ByVal dt As DataTable) As String
        Dim dt_det As DataTable
        Dim j As Integer
        
        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" width=""100%"" class=""display DTTT_selectable"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th style=""border:1px solid black;"">Documento</th>"
            res += "<th style=""border:1px solid black;"">F.Emision</th>"
            res += "<th style=""border:1px solid black;"">F.Vencimiento</th>"
            res += "<th style=""border:1px solid black;"">Base Imponible</th>"
            res += "<th style=""border:1px solid black;"">Precio Total</th>"
            res += "<th style=""border:1px solid black;"">Percepcion</th>"
            res += "<th style=""border:1px solid black;"">Monto Total</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr  style=""background-color: rgba(128, 128, 128, 0.23);"">"
                res += "<td align='center' style=""border:1px solid black;"">" & dt.Rows(i)("DOCUMENTO").ToString() & "</td>"
                res += "<td align='center' style=""border:1px solid black;"">" & dt.Rows(i)("EMISION").ToString() & "</td>"
                res += "<td align='center' style=""border:1px solid black;"">" & dt.Rows(i)("VENCIMIENTO").ToString() & "</td>"
                res += "<td align='center' style=""border:1px solid black;"">" & dt.Rows(i)("BASE_IMPONIBLE").ToString() & "</td>"
                res += "<td align='center' style=""border:1px solid black;"">" & dt.Rows(i)("PRECIO_TOTAL").ToString() & "</td>"
                res += "<td align='center' style=""border:1px solid black;"">" & dt.Rows(i)("PERCEPCION").ToString() & "</td>"
                res += "<td align='center' style=""border:1px solid black;"">" & dt.Rows(i)("MONTO_TOTAL").ToString() & "</td>"
                res += "</tr>"
                
                dt_det = p.fListarDetalleFacturas(dt.Rows(i)("CODIGO"))
                If Not dt_det Is Nothing Then
                    res += "<tr >"
                    res += "<td style=""border:1px solid black;""align='left' colspan='3'>Producto</td>"
                    ' res += "<td ></td>"
                    res += "<td style=""border:1px solid black;"" align='Left'>Cant</td>"
                    res += "<td style=""border:1px solid black;"" align='Left'>Precio.Unit</td>"
                    res += "<td style=""border:1px solid black;"" align='Left' colspan='2'>Total</td>"
                    res += "</tr>"
                    
                    For j = 0 To dt_det.Rows.Count - 1
                        res += "<tr >"
                        res += "<td style=""border:1px solid black;""align=""left"" colspan=""2"">" & dt_det.Rows(j)("PRODUCTO").ToString() & "</td>"
                        res += "<td style=""border:1px solid black;""></td>"
                        res += "<td style=""border:1px solid black;""align=""left"">" & dt_det.Rows(j)("CANTIDAD").ToString() & "</td>"
                        res += "<td style=""border:1px solid black;""align=""left"">" & dt_det.Rows(j)("PRECIO_UNITARIO").ToString() & "</td>"
                        res += "<td style=""border:1px solid black;""align=""left"" colspan=""2"">" & dt_det.Rows(j)("PRECIO_TOTAL").ToString() & "</td>"
                        res += "</tr>"
                        
                    Next
                    
                Else
                    res += "<tr >"
                    res += "<td style=""border:1px solid black;"" align='left' colspan='3'>Producto</td>"
                    'res += "<td style=""border:1px solid black;""></td>"
                    res += "<td style=""border:1px solid black;"" align='Left'>Cant</td>"
                    res += "<td style=""border:1px solid black;"" align='Left'>Precio.Unit</td>"
                    res += "<td  style=""border:1px solid black;"" align='Left' colspan='2'>Total</td>"
                    res += "</tr>"
                    
                    res += "<tr style=""border:1px solid black;"">"
                    res += "<td  align=""center"" colspan='7'>No hay Informacion</td>"
                    res += "</tr>"
                End If
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
        res += "<th>Documento</th>"
        res += "<th>F.Emision</th>"
        res += "<th>F.Vencimiento</th>"
        res += "<th>Base Imponible</th>"
        res += "<th>Precio Total</th>"
        res += "<th>Percepcion</th>"
        res += "<th>Monto Total</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"
        
        res += "<tr align=""center"">"
        res += "<td></td>"
        res += "<td></td>"
        res += "<td>NO HAY DATOS DISPONIBLES</td>"
        res += "<td></td>"
        res += "<td></td>"
        res += "<td></td>"
        res += "<td></td>"
        res += "</tr>"
        
        res += "</tbody>"
        res += "</table>"
        
        Return res
    End Function
End Class