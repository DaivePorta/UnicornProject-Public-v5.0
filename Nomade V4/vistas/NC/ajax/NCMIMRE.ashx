<%@ WebHandler Language="VB" Class="NCMIMRE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMIMRE : Implements IHttpHandler
    
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim OPCION, p_USUA_ID As String
    Dim p_CODE, p_FECHA_TRANSACCION, p_FECHA_APLICACION, p_FACTOR, p_IMPUESTO_RENTA, p_INGRESO, p_DIFERENCIA, p_COEFICIENTE, p_FECHA_BUSQUEDA As String
  
    Dim fiIgv As New Nomade.FI.FIIgv("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        p_USUA_ID = context.Request("p_USUA_ID")
        
        p_CODE = context.Request("p_CODE")
        p_FECHA_TRANSACCION = context.Request("p_FECHA_TRANSACCION")
        p_FECHA_APLICACION = context.Request("p_FECHA_APLICACION")
        p_FACTOR = context.Request("p_FACTOR")
        p_IMPUESTO_RENTA = context.Request("p_IMPUESTO_RENTA")
        p_INGRESO = context.Request("p_INGRESO")
        p_DIFERENCIA = context.Request("p_DIFERENCIA")
        p_COEFICIENTE = context.Request("p_COEFICIENTE")
        'Parametro para obtener el registro según la fecha de emision de algún documento
        p_FECHA_BUSQUEDA = context.Request("p_FECHA_BUSQUEDA")
        
        Try
            Select Case OPCION
            
                Case "1" 'Lista impuesto a la renta
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = fiIgv.ListarImpuestoRenta(If(p_CODE = "", "", p_CODE), If(p_FECHA_TRANSACCION = "", Nothing, Utilities.fechaLocal(p_FECHA_TRANSACCION)),
                                                  If(p_FECHA_APLICACION = "", Nothing, Utilities.fechaLocal(p_FECHA_APLICACION)),
                                                  If(p_FECHA_BUSQUEDA = "", Nothing, Utilities.fechaLocal(p_FECHA_BUSQUEDA)))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""FECHA_TRANSACCION_2"":{""display"":""" & MiDataRow("FECHA_TRANSACCION").ToString & """,""order"":""" & String.Join("", MiDataRow("FECHA_TRANSACCION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""FECHA_APLICACION_2"":{""display"":""" & MiDataRow("FECHA_APLICACION").ToString & """,""order"":""" & String.Join("", MiDataRow("FECHA_APLICACION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""FECHA_TRANSACCION"" :" & """" & MiDataRow("FECHA_TRANSACCION").ToString & """,")
                            resb.Append("""FECHA_APLICACION"" :" & """" & MiDataRow("FECHA_APLICACION").ToString & """,")
                            resb.Append("""FACTOR"" :" & """" & MiDataRow("FACTOR").ToString & """,")
                            resb.Append("""IMPUESTO_RENTA"" :" & """" & MiDataRow("IMPUESTO_RENTA").ToString & """,")
                            resb.Append("""INGRESO"" :" & """" & MiDataRow("INGRESO").ToString & """,")
                            resb.Append("""DIFERENCIA"" :" & """" & MiDataRow("DIFERENCIA").ToString & """,")
                            resb.Append("""COEFICIENTE"" :" & """" & MiDataRow("COEFICIENTE").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("USUA_ID").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2" ' Registrar impuesto a la renta
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = fiIgv.CrearImpuestoRenta(Utilities.fechaLocal(p_FECHA_APLICACION),
                                                     p_FACTOR, p_IMPUESTO_RENTA, p_INGRESO, p_DIFERENCIA, p_COEFICIENTE, p_USUA_ID)
                  
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "3" ' Actualizar impuesto a la renta
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = fiIgv.ActualizarImpuestoRenta(p_CODE, Utilities.fechaLocal(p_FECHA_APLICACION),
                                                          p_FACTOR, p_IMPUESTO_RENTA, p_INGRESO, p_DIFERENCIA, p_COEFICIENTE, p_USUA_ID)
                  
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
   
    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class