<%@ WebHandler Language="VB" Class="NPLFPRO" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NPLFPRO : Implements IHttpHandler
    
    Dim res As String
    Dim resb As New StringBuilder
    Dim opcion As String
    Dim p As New Nomade.MP.MPOrdenFabricacion("BN")
    Dim dt As DataTable
    Dim ddt As DataTable
    Dim p_ctlg As String
    Dim p_prod As String
    Dim p_cant As String
    Dim resb1 As New StringBuilder
    Dim condicion, p_almacen As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        
        opcion = context.Request("opcion")
        p_ctlg = context.Request("p_ctlg")
        p_prod = context.Request("p_prod")
        p_cant = context.Request("p_cant")
        p_almacen = context.Request("p_almacen")
        Try
            
            Select Case opcion
                
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarFormulacionProducto(p_ctlg, p_prod, p_cant)
                    
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & MiDataRow("UND").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """,")
                            resb.Append("""CANTIDADALMACEN"" :" & """" & MiDataRow("CANT_ALMAC").ToString & """,")
                            resb.Append("""ALMACEN"" :" & """" & MiDataRow("ALMACEN").ToString & """,")
                            resb.Append("""INDICADOR"" :" & """" & MiDataRow("INDICADOR").ToString & """")
                            
                            
                            resb.Append("}")
                            resb.Append(",")
                            
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        
                    End If
                    res = resb.ToString()
                    
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListaCabeceraFormulacion(p_prod, p_cant, p_ctlg)
                    
                    Dim cantidadTotal As Decimal = 0
                    If Not dt Is Nothing Then
                        
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""Producto"" :" & """" & MiDataRow("Producto").ToString & """,")
                            resb.Append("""Cantidad"" :" & """" & MiDataRow("Cantidad").ToString & """,")
                            
                            ddt = p.ListarDetalleFormulacion(MiDataRow("Cantidad"), p_ctlg, MiDataRow("Codigo"), p_almacen)
                            resb1 = New StringBuilder
                            If Not ddt Is Nothing Then
                               
                                resb1.Append("[")
                                For Each nrow As DataRow In ddt.Rows
                                    
                                    resb1.Append("{")
                                    resb1.Append("""Almacen"" :" & """" & nrow("Almacen").ToString & """,")
                                    resb1.Append("""Cantidad"" :" & """" & nrow("Cantidad").ToString & """,")
                                    cantidadTotal = cantidadTotal + Convert.ToDecimal(nrow("Cantidad").ToString)
                                    If nrow("Condicion") = 3 Then
                                        condicion = "<i class=icon-ok style=color:green></i>"
                                    End If
                                    
                                    If nrow("Condicion") = 2 Then
                                        condicion = "<i class=icon-ok style=color:green></i>"
                                    End If
                                    
                                    If nrow("Condicion") = 1 Then
                                        condicion = "<i class=icon-remove style=color:red></i>"
                                    End If
                                    
                                    resb1.Append("""Condicion"" :" & """" & condicion & """")
                                    
                                    resb1.Append("}")
                                    resb1.Append(",")
                                Next
                                resb1.Append("{}")
                                resb1 = resb1.Replace(",{}", String.Empty)
                                resb1.Append("]")
                            End If
                            resb.Append("""CantidadTotal"" :" & """" & cantidadTotal & """,")
                            resb.Append("""detalle"" :" & resb1.ToString)
                            
                            
                            resb.Append("}")
                            resb.Append(",")
                            cantidadTotal = 0
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
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

End Class