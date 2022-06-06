<%@ WebHandler Language="VB" Class="NVMRANG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVMRANG : Implements IHttpHandler
    Dim OPCION As String
    Dim p_USUA_ID, p_CODE, p_NOMBRE, p_RANGO_FIN As String
  
  
    Dim nmGestionPrecios As New Nomade.NM.NMGestionPrecios("Bn")
   
    
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
     
        p_USUA_ID = context.Request("p_USUA_ID")
        p_NOMBRE = context.Request("p_NOMBRE")
        p_RANGO_FIN = context.Request("p_RANGO_FIN")
        p_CODE = context.Request("p_CODE")
          
        
        Try
            Select Case OPCION
            
                Case "1" 'listar rangos
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmGestionPrecios.ListarRangoPrecioCantidad("")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                            resb.Append("""RANGO_FIN"" :" & """" & MiDataRow("RANGO_FIN").ToString & """,")
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
                Case "2"
                    Try
                        res = nmGestionPrecios.RegistrarRangoPrecioCantidad(p_NOMBRE, p_RANGO_FIN, p_USUA_ID)
                    Catch ex As Exception
                        context.Response.Write(ex.ToString)
                    End Try
                Case "3"
                    Try
                        res = nmGestionPrecios.EliminarRangoPrecioCantidad(p_CODE)
                    Catch ex As Exception
                        context.Response.Write(ex.ToString)
                    End Try
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